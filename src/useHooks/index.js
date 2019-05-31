
import React, {useCallback, useEffect, useContext, useMemo, useState, useReducer, useRef} from 'react'

//input的双向绑定
export const useInputValue = (initialValue) => {
    let [value, setValue] = useState(initialValue);
    let onChange = useCallback(function(event) {
        setValue(event.currentTarget.value);
    }, []);
    return {
        value,
        onChange,
    };
}


export const useMount = (mount) => useEffect(mount, []);

// 定时器的的组件销毁时同步销毁
/**
 *
 * @param callback
 * @param delay
 */
export const useInterVal = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    useEffect( () => {
        function tick() {
            savedCallback.current();
            console.log(id,'id')
        }
        let id;
        if(delay != null) {
            id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    },[delay])
}

//useReducer用法类似reducer
export const useCounter = () => {
    const initailState = {count: 0};

    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1}
            case 'decrement':
                return {count: state.count - 1}
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, initailState)
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </div>
    );

}


// 一个常见的用例便是命令式地访问子组件
// 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。
// 如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。
function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
