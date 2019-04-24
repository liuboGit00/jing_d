import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'

class HostgroupProperty extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {property} = this.props;
        let aa = JSON.stringify(property).split('"')[1]
        let prop = aa.split('\\n')
        let arr =[];
        for(let i=0;i<prop.length-1;i++){
            arr.push(<Row key={i+''}>
                    <Col className="col_left" span="5">{prop[i].split(':')[0]}</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="8">{prop[i].split(':')[1]}</Col>
                </Row>)
        }
        return (
            <Row className="taskDetail">
                {arr}
            </Row>
        )

    }
}

export default HostgroupProperty;