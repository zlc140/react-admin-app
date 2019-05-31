import  React, { Component } from 'react';
import { Button, message} from 'antd';
import $service from '@service/index'

class SendCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voiceTip : '发送验证码',
            isSms : false,
            intervalId: null
        }
    }
    getCode = () => {
        if(!this.props.mobile) {
            message.error('手机号不合法', 3)
            return;
        }
        if(this.state.isSms){
            return false;
        }
        $service('user/getCode').then(res => {
             this.setState({
                 isSms: true
             })
            this.handleVoiceCode();
        })
    }
    componentWillUnmount() {
        this.state.intervalId && clearInterval(this.state.intervalId)
    }

    handleVoiceCode = () => {
        let time = 59;
        this.state.intervalId = setInterval( () => {
            time--
            if (time === 0) {
                clearInterval(this.state.intervalId);
                this.setState({
                    isSms: false,
                    voiceTip: '重新发送'
                })
            } else {
                this.setState({
                    voiceTip: time + '秒后重试'
                })
            }
        }, 1000)
    }
    render() {
        return (
            <Button style={{width: '100%'}} onClick={this.getCode}>{this.state.voiceTip}</Button>
        )
    }
}

export default SendCode
