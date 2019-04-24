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

class Crontab extends Component {
    handleSubmit() {
        // console.log(this.props.form.getFieldsValue().week)
        if(this.props.form.getFieldsValue().hour!=undefined ||this.props.form.getFieldsValue().day!=undefined ||this.props.form.getFieldsValue().week ||this.props.form.getFieldsValue().month!=undefined || this.props.form.getFieldsValue().minute!=undefined){
            this.props.onOk(
                {
                    'month':this.props.form.getFieldsValue().month==undefined?'*':this.props.form.getFieldsValue().month,
                    'week':this.props.form.getFieldsValue().week==undefined?'*':this.props.form.getFieldsValue().week,
                    'day':this.props.form.getFieldsValue().day==undefined?'*':this.props.form.getFieldsValue().day,
                    'hour':this.props.form.getFieldsValue().hour==undefined?'*':this.props.form.getFieldsValue().hour,
                    'minute':this.props.form.getFieldsValue().minute==undefined?'*':this.props.form.getFieldsValue().minute,
            })
        }
       
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
                        <FormItem label="月" {...formItemLayout}>
                            <Input type="text" {...getFieldProps('month') }/>
                        </FormItem>
                        <FormItem label="星期" {...formItemLayout}>
                            <Input type="text" {...getFieldProps('week') }/>
                        </FormItem>
                        <FormItem label="天" {...formItemLayout}>
                            <Input type="text" {...getFieldProps('day') }/>
                        </FormItem>
                        <FormItem label="小时" {...formItemLayout}>
                            <Input type="text" {...getFieldProps('hour') }/>
                        </FormItem>
                        <FormItem label="分钟" {...formItemLayout}>
                            <Input type="text" {...getFieldProps('minute') }/>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={5} offset={10} style={{ textAlign: 'right' }}>
                    <Link to='schedules' style={{marginRight:10}}><Button>取消</Button></Link>

                    <Link to={`/taskarg`}><Button type="primary" className="cdp_button_left">上一步</Button></Link>&nbsp;&nbsp;&nbsp;
                    {(this.props.form.getFieldsValue().hour!=undefined ||this.props.form.getFieldsValue().day!=undefined ||this.props.form.getFieldsValue().week ||this.props.form.getFieldsValue().month!=undefined || this.props.form.getFieldsValue().minute!=undefined)?<Link to="schedules"><Button type="primary" className="cdp_button_left" onClick={this.handleSubmit.bind(this) }>提交</Button></Link>:<Button type="primary" className="cdp_button_left" onClick={this.handleSubmit.bind(this) }>提交</Button>}
                    
                </Col>
            </div>
        );
    }
}

Crontab.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            month:{name:'month'},
            week:{name:'week'},
            day:{name:'day'},
            hour:{name:'hour'},
            minute:{name:'minute'},
        }
    }
})(Crontab);