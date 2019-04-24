/**
 * Created by tanglinhai on 2016/8/30.
 */
import React, { Component,PropTypes } from 'react'
import { Alert } from 'antd';

class NotFound extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Alert
                message="CDP系统提示！"
                description="对不起，找不到相关信息！"
                type="warning"
            />
        );
    }
};
export default NotFound;