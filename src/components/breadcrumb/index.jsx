import React from 'react'
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

class breadcrum extends React.Component {
    componentDidMount() {
        this.props.history.listen((path) => {
            console.log('watch', path)
        })
    }
    render() {
        let { history } = this.props;
        let lists = history.location.pathname.split('/');

        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={'/'}>home</Link>
                </Breadcrumb.Item>
                {
                    lists && lists.map((v, index) => v && <Breadcrumb.Item key={index}>
                        {index < lists.length-1 ? <Link to={'/'+v}>{`${v}`}</Link> : <span >{`${v}`}</span>}
                    </Breadcrumb.Item>)
                }
            </Breadcrumb>
        )
    }
}
export default breadcrum
