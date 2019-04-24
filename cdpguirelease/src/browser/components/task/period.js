import React, {Component, PropTypes} from 'react';
import { Steps,Radio,Button,Input,Form,Row,Col } from 'antd'
import {Link} from 'react-router'
const Step = Steps.Step
const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
const createForm = Form.create;
const FormItem = Form.Item
/*const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        };*/

class Period extends Component {
    handleSubmit() {
        this.props.onOk(
            {
                'period': this.props.form.getFieldsValue().period,
                'every': this.props.form.getFieldsValue().every,
                'copyIp':this.props.form.getFieldsValue().copyIp,
                'copyPool':this.props.form.getFieldsValue().copyPool
            })
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {copy} = this.props
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return (
            <div>
                
                <Steps current={2}>
                    <Step title="任务类型" key='1' />
                    <Step title="任务参数" key='2' />
                    <Step title="调度时间" key='3' />
                </Steps>
                <br/><br/>
                <Col sm={20}>
                    <Form layout='horizontal'>
                        <FormItem label="时间调度" {...formItemLayout}>
                            <RadioGroup {...getFieldProps('period', {}) }>
                                <Radio style={radioStyle} key="1" value="days">天</Radio>
                                <Radio style={radioStyle} key="2" value="hours">小时</Radio>
                                <Radio style={radioStyle} key="3" value="minutes">分钟</Radio>
                                <Radio style={radioStyle} key="4" value="seconds">秒</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="单位时间" {...formItemLayout}>
                            <Input type="text" {...getFieldProps('every', {}) }/>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={5} offset={10} style={{ textAlign: 'right' }}>
                    <Link to='schedules' style={{marginRight:10}}><Button>取消</Button></Link>
                    <Link to={`/taskarg`}><Button type="primary" className="cdp_button_left">上一步</Button></Link>&nbsp;&nbsp;&nbsp;
                    {this.props.form.getFieldsValue().every && this.props.form.getFieldsValue().period?<Link to="schedules"><Button type="primary" className="cdp_button_left" onClick={this.handleSubmit.bind(this) }>提交</Button></Link>:<Button type="primary" className="cdp_button_left" onClick={this.handleSubmit.bind(this) }>提交</Button>}
                    
                </Col>
            </div>
        );
    }
}

Period.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            period: {name: 'period'},
            every: {name: 'every'},
            copyIp: {name: 'copyIp'},
            copyPool: {name: 'copyPool'},
        }
    }
})(Period);