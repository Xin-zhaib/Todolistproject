import React, { useRef } from 'react'
import _ from 'loadsh'
import { List, Checkbox, Button, Space, Tag, Modal } from 'antd-mobile'
import Styles from './index.module.scss'

function Item(props) {
  // eslint-disable-next-line react/prop-types
  const { id, task_name, onDelete, onEdit, state, picture } = props
  const checkboxRef = useRef(null)
  console.log(props);

  return (
    <List.Item
      arrow={false}
      prefix={
        <Checkbox
          value={id}
          onClick={() => {
            checkboxRef.current?.toggle()
          }}
        />
      }
    >
      <div className={Styles['item-header']}>
        <h4>{task_name}</h4>
        <Tag color={state === "Completed" ? "success" : "primary"}>{state}</Tag>
      </div>
      <Space direction="horizontal">
        <Button
          color='success'
          size='mini'
          onClick={() =>
            Modal.show({
              content: (
                <div className={Styles['modal-content']}>
                  <p><span>task name:</span> {task_name}</p>
                  <p><span>state:</span> {state}</p>
                  <p>
                    <span>location:</span>
                    <a href={`https://www.openstreetmap.org/#map=18/${location?.latitude}/${location?.longitude}`} style={{ marginRight: 16 }}>map</a>
                    <a href={`sms://00447700900xxxx?body=https://maps.google.com/?q=${location?.latitude},${location?.longitude}`}>sms</a>
                  </p>
                  <p>
                    <span>picture:</span>
                    <img src={picture} alt="image" />
                  </p>
                </div>
              ),
              showCloseButton: true,
              closeOnMaskClick: true,
            })
          }
        >
          Details
        </Button>
        <Button color='primary' size='mini' onClick={() => onEdit(_.omit(props, ['onDelete', 'onEdit']))}>Edit</Button>
        <Button color='danger' size='mini' onClick={() => onDelete(id)}>Delete</Button>
      </Space>
    </List.Item>
  )
}

export default Item