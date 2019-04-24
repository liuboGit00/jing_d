/**
 * Created by tanglinhai on 2016/9/16.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'

class TaskDetail extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {item} = this.props;
        return (
            <Row className="taskDetail">
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="clock-circle-o" />任务详情</label>
                </Row>
                <Row>
                    <Col className="col_left" span="5">任务ID</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.task_id}</Col>
                </Row>
                <Row>
                    <Col className="col_left" span="5">任务名称</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.task}</Col>
                </Row>
                <Row>
                    <Col className="col_left" span="5">任务状态</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.status == 'SUCCESS' ? '成功' : "失败"}</Col>
                </Row>
                <Row>
                    <Col className="col_left" span="5">任务参数</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.native ? item.native.args : ''}</Col>
                </Row>
                <Row>
                    <Col className="col_left" span="5">执行结果</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.native ? item.native.result : ''}</Col>
                </Row>
                <Row>
                    <Col className="col_left" span="5">提交时间</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.native ? item.native.submit_at : ''}</Col>
                </Row>
                <Row>
                    <Col className="col_left" span="5">结束时间</Col>
                    <Col className="col_dot" span="1">：</Col>
                    <Col className="col_right" span="10">{item.native ? item.native.done_at : ''}</Col>
                </Row>
            </Row>
        )

    }
}

/*TaskDetail.propTypes = {
    item: PropTypes.object.isR,
};*/

export default TaskDetail;