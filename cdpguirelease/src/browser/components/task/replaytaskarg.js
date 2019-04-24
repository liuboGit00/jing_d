import React, {Component, PropTypes} from 'react';
import { Steps, Radio, Button, Form,Row} from 'antd'
import {Link} from 'react-router'
const Step = Steps.Step

class ReplayTaskArg extends Component {
    render() {
        return (
            <div>
                <Steps current={1}>
                    <Step title="任务类型" key='1' />
                    <Step title="任务参数" key='2' />
                    <Step title="调度时间" key='3' />
                </Steps>
                回放
                <Row className="table_toolbar">
                <Button type="primary" className="cdp_button_left"><Link to={`/createtask`}>上一步</Link></Button>
                <Button type="primary" className="cdp_button_left"><Link to={`/period`}>下一步</Link></Button>
                </Row>
            </div>
        );
    }
}

ReplayTaskArg.propTypes = {

};

export default ReplayTaskArg;