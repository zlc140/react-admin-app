import React, {Component, useState} from 'react'
import { Input, Popover } from 'antd'

const TitlePopover = (props) => {
    const [visible, setVisible] = useState(false)
    const hide = () => {
        setVisible(false)
    }

    const handleVisibleChange = (value) => {
        setVisible(value)
    }
    return (
            <Popover
                content={<span onClick={hide}>{props.content}</span>}
                title={props.title || '提示'}
                visible={visible}
                onVisibleChange={handleVisibleChange}
            >
                {props.children}
            </Popover>
    )
}
export default TitlePopover
