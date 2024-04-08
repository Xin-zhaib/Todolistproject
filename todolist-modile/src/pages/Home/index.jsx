import React, { useEffect, useState } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Tabs,
  List,
  Modal,
  Form,
  Input,
  Empty,
  Checkbox,
  Space,
  Radio,
} from "antd-mobile";
import {
  deleteValue,
  saveValue,
  editValue,
  batcheDelete,
} from "../../store/home";
import Styles from "./index.module.scss";
import WebcamBox from "../WebcamBox";
import Item from "../Item";

const TabsValue = [
  {
    name: "ALL",
    value: "ALL",
  },
  {
    name: "Active",
    value: "Active",
  },
  {
    name: "Completed",
    value: "Completed",
  },
];

function Home() {
  const time = moment().format("MMM Do YY");

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeKey, setActiveKey] = useState("ALL");
  const [location, setLocation] = useState();
  const [checkValue, setCheckValue] = useState([]);

  const { res } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const onOpne = async (bol) => {
    setOpen(bol);
    setIsEdit(false);
    console.log(location);
    await form.setFieldsValue({
      state: "Active",
      location,
    });
  };

  const onSubmit = () => {
    form.validateFields().then((r) => {
      setOpen(false);
      if (isEdit) {
        dispatch(editValue(form.getFieldsValue(true)));
      } else {
        dispatch(saveValue({ ...r, id: res.length }));
      }
      form.resetFields();
    });
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onTabsChange = (value) => {
    setActiveKey(value);
    setCheckValue([]);
  };

  const onDelete = (id) => {
    Modal.confirm({
      content: "Are you sure you want to delete it?",
      onConfirm: async () => {
        dispatch(deleteValue(id));
      },
    });
  };

  const onEdit = (editData) => {
    console.log(editData);
    form.setFieldsValue({ ...editData, location });
    setOpen(true);
    setIsEdit(true);
  };

  const allItems = () => {
    if (activeKey === "ALL") {
      return res;
    }

    return res.filter((v) => {
      return v.state === activeKey;
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({
        latitude,
        longitude,
      });
    });
  }, []);

  return (
    <div className={Styles["page"]}>
      <h3>{time}</h3>

      <section className={Styles["page-main-box"]}>
        <header>
          <p>What needs to be done?</p>
          <Button
            color="primary"
            fill="solid"
            size="small"
            onClick={() => onOpne(true)}
          >
            add
          </Button>
        </header>

        <Tabs
          className={Styles["main-tabs"]}
          onChange={onTabsChange}
          activeKey={activeKey}
        >
          {TabsValue.map((item) => {
            return (
              <Tabs.Tab title={item.name} key={item.value}>
                {allItems()?.length > 0 ? (
                  <div className={Styles["partial-select"]}>
                    <Checkbox
                      indeterminate={
                        checkValue.length > 0 &&
                        checkValue.length < allItems().length
                      }
                      checked={checkValue.length === allItems().length}
                      onChange={(checked) => {
                        console.log(allItems());
                        if (checked) {
                          setCheckValue(allItems().map((v) => v.id));
                        } else {
                          setCheckValue([]);
                        }
                      }}
                    >
                      partial-select
                    </Checkbox>

                    <Button
                      color="danger"
                      size="mini"
                      onClick={() =>
                        checkValue.length > 0 &&
                        dispatch(batcheDelete(checkValue))
                      }
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  ""
                )}

                <Checkbox.Group
                  onChange={(v) => setCheckValue(v)}
                  value={checkValue}
                >
                  <List>
                    {allItems().length > 0 ? (
                      allItems().map((data, key) => {
                        return (
                          <Item
                            key={key}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            {...data}
                          />
                        );
                      })
                    ) : (
                      <Empty description="no data" />
                    )}
                  </List>
                </Checkbox.Group>
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </section>

      <Modal
        visible={open}
        className={Styles["modal-box"]}
        header={isEdit ? "Edit task" : "Add task"}
        content={
          <Form form={form} layout="vertical" className={Styles["from-box"]}>
            <Form.Item
              name="task_name"
              label="task name"
              rules={[
                { required: true, message: "The task name cannot be empty!" },
              ]}
            >
              <Input placeholder="Please enter a task name!" />
            </Form.Item>
            <Form.Item name="state" label="state">
              <Radio.Group>
                <Space direction="horizontal">
                  <Radio value="Active">Active</Radio>
                  <Radio value="Completed">Completed</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="location" label="location">
              {location ? (
                <>
                  <a
                    href={`https://www.openstreetmap.org/#map=18/${location?.latitude}/${location?.longitude}`}
                    style={{ marginRight: 16 }}
                  >
                    map
                  </a>
                  <a
                    href={`sms://00447700900xxxx?body=https://maps.google.com/?q=${location?.latitude},${location?.longitude}`}
                  >
                    sms
                  </a>
                </>
              ) : (
                "Location not obtained"
              )}
            </Form.Item>
            <Form.Item
              name="picture"
              label="picture"
              rules={[
                {
                  required: true,
                  message: "The photo content cannot be empty!",
                },
              ]}
            >
              <WebcamBox />
            </Form.Item>
          </Form>
        }
        actions={[
          {
            key: "OK",
            text: "Ok",
            primary: true,
            onClick: () => onSubmit(),
          },
          {
            key: "Cancel",
            text: "Cancel",
            onClick: () => onCancel(),
          },
        ]}
      />
    </div>
  );
}

export default Home;
