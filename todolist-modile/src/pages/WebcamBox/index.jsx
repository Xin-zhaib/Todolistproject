import React, { useCallback, useState, useRef, useEffect } from 'react'

import Webcam from "react-webcam";
import { Button, Space } from 'antd-mobile'

import Styles from './index.module.scss'

function WebcamBox(props) {
  const { value, onChange } = props

  const webcamRef = useRef(null);
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      onChange(imageSrc);
    },
    [webcamRef, onChange]
  );

  useEffect(() => {
    if (value) {
      setCaptureEnable(true)
    }
  }, [value])

  return (
    !isCaptureEnable ?
      <Button color="primary" size="mini" onClick={() => setCaptureEnable(true)} className={Styles['operation-btn']}>Take pictures</Button>
      :
      <>
        {
          value ?
            (
              <>
                <img src={value} alt="" style={{marginTop:8}}/>
                <Button className={Styles['operation-btn']} color="primary" size="mini" onClick={() => onChange(null)}>rephotography</Button>
              </>
            )
            : (
              <>
                <Webcam
                  audio={false}
                  className={Styles['webcam-box']}
                  ref={webcamRef}
                  style={{marginTop:8}}
                  screenshotFormat="image/jpeg"
                />
                <Button color="primary" size="mini" onClick={capture} className={Styles['operation-btn']}>save</Button>
              </>
            )
        }

      </>
  )
}

export default WebcamBox