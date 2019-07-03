import React, { Component }  from 'react'
import { Input, } from 'antd';
import TitlePopover from '@components/titlePopover'

const scaleNames = {
    c: '摄氏温度',
    f: '华氏温度'
}

function toCelsius(fahrenheit) { //摄氏温度
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) { //华氏温度
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }
    render() {
        const temperature = this.props.temperature
        const scale = this.props.scale
        return (
            <fieldset style={{padding: '10px'}}>
                <Input type="text"
                       value={temperature}
                       onChange={this.handleChange}
                       addonBefore={scaleNames[scale]}
                       style={{width: '200px'}}/>
            </fieldset>
        )
    }
}

class StateProvance extends Component {
    constructor (props) {
        super(props)
        this.state = {
            scale: '',
            temperature: ''
        }
    }

    handleCelsiusChange(temperature) {
        this.setState({scale:'c', temperature})
    }
    handleFahrenheitChange(temperature) {
        this.setState({scale:'f', temperature})
    }

    render(){
        const temperature = this.state.temperature;
        const scale = this.state.scale;
        const celsius = scale === 'f' ? tryConvert(temperature,toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
        return (
            <div>
                <TitlePopover title='提示' content={<span>多个组件需要公用相同的变化数据，<br/>这个时候可以将共享状态提升到父组件中</span>}>
                    <span>变量提升</span>
                </TitlePopover>
                <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange.bind(this)} />
                <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={(e) => this.handleFahrenheitChange(e)} />

                <BoilingVerdict
                    celsius={parseFloat(celsius)} />

            </div>
        )
    }


}

export default StateProvance
