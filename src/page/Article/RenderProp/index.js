import React from 'react'
import Mouse from '@components/mouse'

const Hello = (props) => {
    return (
        <div> clientX: {props.mouse.x} --- clientY: {props.mouse.y}</div>
    )
}

const MouseTracker = () => {
    return (
        <div>
            <h1>Render Props</h1>
            <Mouse
                render={mouse => (
                    <Hello mouse={mouse} />
                )}
            />
        </div>
    )
}

export default MouseTracker;
