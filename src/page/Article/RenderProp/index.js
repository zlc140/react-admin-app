import React from 'react'
import Mouse from '@components/mouse'
import TitlePopover from '@components/titlePopover'
const Hello = (props) => {
    return (
        <div style={{height: '100px',lineHeight: '100px'}}> clientX: {props.mouse.x} --- clientY: {props.mouse.y}</div>
    )
}

const MouseTracker = () => {
    return (
        <div>
            <TitlePopover title='提示' content={<span>React 组件之间使用一个值为函数的 prop 共享代码的简单技术，使用该技术的库有 react-router</span>}>
                <span>Render Props</span>
            </TitlePopover>
            <Mouse
                /*这里的render可以任意命名，他只是方法的名称*/
                render={mouse => (
                    <Hello mouse={mouse} />
                )}
            />
        </div>
    )
}

export default MouseTracker;
