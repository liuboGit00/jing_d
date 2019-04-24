import React, { Component, PropTypes } from 'react';
import { Steps, Radio, Button, Form,Input,Row,Col,message} from 'antd'
import {Link} from 'react-router'
import TaskArgContainer from '../../containers/task/taskargcontainer'
//import {select_task_type} from '../actions/taskActions'
const Step = Steps.Step
const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'inline-block',
    height: '30px',
    lineHeight: '30px',
};
const createForm = Form.create;
const FormItem = Form.Item

class TaskType extends Component {
    /*handle_select_task(){
        const {dispatch} = this.props
        dispatch(select_task_type(this.props.form.getFieldsValue().tasktype))
    }*/
   constructor(props){
    super(props)
    this.state = {
      flag:true,
      typeTask:true,
    }
  }
    handleSubmit() {
        if(this.props.form.getFieldsValue().ptask_name !=undefined){
            console.log(this.props.form.getFieldsValue().task_name)
            this.props.onSelect({
                task_name:this.props.form.getFieldsValue().task_name,
                ptask_name:this.props.form.getFieldsValue().ptask_name
            })
        }else{
            message.error('请填写任务名称')
        }
        
    }
    ptask_name_blur(){
        if(this.props.form.getFieldsValue().ptask_name ==undefined){
             message.error('请填写任务名称')
        }
    }
    checkTaskName(rule, value, callback) {
        var parent=/^[A-Za-z0-9_]+$/;
        if(value && parent.test(value)){
            this.setState({
                flag:false
            })
        	// console.log(value,'value')
            callback();
        }else{
            this.setState({
                flag:true
            })
            callback(new Error('不可包含空格和中文'));
        }
    }
    checkTypetask(rule, value, callback){
        if(value){
        console.log(1)

            this.setState({
                typeTask:false
            })
            callback();
        }else{
        console.log(2)

            this.setState({
                typeTask:true
            })
            callback();
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        console.log(this.state.flag,this.state.typeTask)

        console.log(this.state.flag||this.state.typeTask)
        return (
            <div>
                <Steps current={0}>
                    <Step title="任务类型" key='1' />
                    <Step title="任务参数" key='2' />
                    <Step title="调度时间" key='3' />
                </Steps>
                <br/><br/>
                <Col sm={20}>
                <Form layout='horizontal'>
                    <FormItem label="任务名称" {...formItemLayout}>
                        <Input  type="text" {...getFieldProps('ptask_name', {rules:[{ validator: this.checkTaskName.bind(this) }]}) } onBlur={this.ptask_name_blur.bind(this)}  />
                    </FormItem>
                    <FormItem label="任务类型" {...formItemLayout}>
                        <RadioGroup {...getFieldProps('task_name', {rules:[{ validator:this.checkTypetask.bind(this)}]}) }>
                            <Radio style={radioStyle} key="1" value='volumes.tasks.auto_create_snap'>创建快照</Radio>
                            <Radio style={radioStyle} key="2" value='clone.tasks.fileclone2local'>文件克隆</Radio>
                            <Radio style={radioStyle} key="3" value='volumes.tasks.auto_create_groupsnap'>创建卷组快照</Radio>
                            
                        </RadioGroup>
                    </FormItem>
                </Form>
                </Col>
                <Col span={5} offset={10} style={{textAlign: 'right'}}>
                    <Link to='schedules' style={{marginRight:10}}><Button>取消</Button></Link>
                    {this.props.form.getFieldsValue().ptask_name?<Link to="taskarg"><Button type="primary" disabled={this.state.flag||this.state.typeTask} onClick={this.handleSubmit.bind(this)} >下一步</Button></Link>:<Button type="primary" disabled={this.state.flag||this.state.typeTask} onClick={this.handleSubmit.bind(this)} >下一步</Button>}
                </Col>
            </div>
        );
    }
}

TaskType.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            task_name: {name: 'task_name'},
            ptask_name: {name: 'ptask_name'}
        }
    }
})(TaskType);
