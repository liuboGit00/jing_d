import React, {Component, PropTypes} from 'react';
import {Steps,Col, Modal, Button ,Select,notification ,message,Form,Input,AutoComplete,Radio} from 'antd';
const RadioGroup = Radio.Group;
import { Link} from 'react-router'
import {fetch_windows,require_sourceid_number} from '../../actions/mirroraction'
import {echo_modify_schedul_time,close_modify_schedul_time,echo_modify_schedul_content,
        close_modify_schedul_content,close_modify_schedul,modify_schedul_content,modify_schedul_time
        }from '../../actions/taskactions'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
const Step = Steps.Step
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    textIndent:'20px',
};
class ModifySchedules extends Component {
    constructor(props) {
        super(props);
        this.handle_echo_modify_schedule_content = this.handle_echo_modify_schedule_content.bind(this)
        this.handle_echo_modify_schedule_time = this.handle_echo_modify_schedule_time.bind(this)
        this.handle_close_modify_schedule_content = this.handle_close_modify_schedule_content.bind(this)
        this.handle_submit_modify_schedule_time = this.handle_submit_modify_schedule_time.bind(this)
        this.handle_close_modify_schedule_time = this.handle_close_modify_schedule_time.bind(this)
        this.handle_submit_modify_schedule_content = this.handle_submit_modify_schedule_content.bind(this)
    }
    handleOk() {
        const {dispatch,timevisible,contentvisible,schedules}=this.props;
        if(contentvisible){
            this.props.onOk({
                'ptask_name':this.props.form.getFieldsValue().ptask_name,
                'task_name':this.props.form.getFieldsValue().task_name,
                'volumeId':this.props.form.getFieldsValue().volumeId,
                'maxnum':this.props.form.getFieldsValue().maxnum,
                'crontab':this.props.form.getFieldsValue().crontab,
                'scripts':this.props.form.getFieldsValue().scripts,
                'check_befsnap':this.props.form.getFieldsValue().check_befsnap,
    
            })
        }else if (timevisible&&schedules.selectedSchedules[0].schedule.split(':')[0] =='<IntervalSchedule') {
            this.props.onOk({
                'period':this.props.form.getFieldsValue().period,
                'every':this.props.form.getFieldsValue().every,
            })
        }else{
            this.props.onOk({
                'month':this.props.form.getFieldsValue().month==''?'*':this.props.form.getFieldsValue().month,
                'week':this.props.form.getFieldsValue().week==''?'*':this.props.form.getFieldsValue().week,
                'day':this.props.form.getFieldsValue().day==''?'*':this.props.form.getFieldsValue().day,
                'hour':this.props.form.getFieldsValue().hour==''?'*':this.props.form.getFieldsValue().hour,
                'minute':this.props.form.getFieldsValue().minute==''?'*':this.props.form.getFieldsValue().minute,    
            })
        };   
       
    }
    handle_echo_modify_schedule_time(){
        const{dispatch}=this.props;
        dispatch(close_modify_schedul())
        dispatch(echo_modify_schedul_time())
    }
    handle_echo_modify_schedule_content(){
        const{dispatch}=this.props
        dispatch(close_modify_schedul())
        dispatch(echo_modify_schedul_content())
    }
    handle_close_modify_schedule_content(){
        const{dispatch}=this.props
        dispatch(close_modify_schedul_content())
    }
    handle_close_modify_schedule_time(){
        const{dispatch}=this.props
        dispatch(close_modify_schedul_time())
    }
    handle_submit_modify_schedule_time(){
        const{dispatch}=this.props
        dispatch(modify_schedul_time())
    }
    handle_submit_modify_schedule_content(){
        const{dispatch}=this.props
        dispatch(modify_schedul_content())
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
    render() {
        const {visible,dispatch,timevisible,contentvisible,schedules,volumes,scripts} = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const formItemLayoutContent = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const scriptArr=[]
        for (let i=0;i<scripts.length;i++){
            scriptArr.push(<Option key={scripts[i].id+''}  >{scripts[i].name}</Option>)
        }
        if(schedules.selectedSchedules&&schedules.selectedSchedules!=''){
            for(let i=0; i<schedules.items.length;i++){
                if(schedules.items[i].id == schedules.selectedSchedules[0].id){
                    schedules.selectedSchedules[0] = schedules.items[i]
                }
            }
        }
        
        console.log(schedules.selectedSchedules)

        const {getFieldProps} = this.props.form;
            if(visible){
                return (<div>
                    <Modal ref="modal" 
                        width = {350}
                        visible={this.props.visible}
                        title="修改任务"  onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.handle_echo_modify_schedule_content}>调度内容</Button>,
                            <Button key="submit" type="primary" size="large"  onClick={this.handle_echo_modify_schedule_time }>调度时间</Button>

                        ]}
                        >
                        <p style={{textAlign:'center',paddingTop:20,paddingBottom:20,fontSize:15}}>请选择修改项</p>
                    </Modal>
                </div>)
            }else if(timevisible&&schedules.selectedSchedules!=''){
                if(schedules.selectedSchedules[0].schedule.split(':')[0] =='<IntervalSchedule'){
                     return (<div>
                        <Modal ref="modal" 
                            width = {500}
                            visible={this.props.timevisible}
                            title="修改任务" onOk={this.handleOk.bind(this)} onCancel={this.handle_close_modify_schedule_time}
                            >
                            <Form layout='horizontal'>
                                 <FormItem style={{marginLeft:30}} label="时间调度" {...formItemLayout}>
                                    <RadioGroup {...getFieldProps('period', { initialValue:schedules.selectedSchedules[0].schedule==undefined?'':schedules.selectedSchedules[0].schedule.split(' ').pop()}) }>
                                        <Radio style={radioStyle} key="1" value="days>">天</Radio>
                                        <Radio style={radioStyle} key="2" value="hours>">小时</Radio>
                                        <Radio style={radioStyle} key="3" value="minutes>">分钟</Radio>
                                        <Radio style={radioStyle} key="4" value="seconds>">秒</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem style={{marginLeft:30}} label="单位时间" {...formItemLayout}>
                                    <Input type="text" {...getFieldProps('every', {initialValue:schedules.selectedSchedules[0].schedule==undefined?'':parseInt(schedules.selectedSchedules[0].schedule.split(' ')[2])>0?schedules.selectedSchedules[0].schedule.split(' ')[2]:''}) }/>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>)
                }else{
                     return (<div>
                        <Modal ref="modal" 
                            width = {500}
                            visible={this.props.timevisible}
                            title="修改任务" onOk={this.handleOk.bind(this)} onCancel={this.handle_close_modify_schedule_time}
                            >
                                   
                            <Form layout='horizontal'>
                                <FormItem label="月" {...formItemLayout}>
                                    <Input type="text" {...getFieldProps('month',{initialValue:schedules.selectedSchedules[0].schedule==undefined?'':schedules.selectedSchedules[0].schedule.split(':')[1].split('')[9]}) }/>
                                </FormItem>
                                <FormItem label="星期" {...formItemLayout}>
                                    <Input type="text" {...getFieldProps('week',{initialValue:schedules.selectedSchedules[0].schedule==undefined?'':schedules.selectedSchedules[0].schedule.split(':')[1].split('')[5]}) }/>
                                </FormItem>
                                <FormItem label="天" {...formItemLayout}>
                                    <Input type="text" {...getFieldProps('day',{initialValue:schedules.selectedSchedules[0].schedule==undefined?'':schedules.selectedSchedules[0].schedule.split(':')[1].split('')[7]}) }/>
                                </FormItem>
                                <FormItem label="小时" {...formItemLayout}>
                                    <Input type="text" {...getFieldProps('hour',{initialValue:schedules.selectedSchedules[0].schedule==undefined?'':schedules.selectedSchedules[0].schedule.split(':')[1].split('')[3]})}/>
                                </FormItem>
                                <FormItem label="分钟" {...formItemLayout}>
                                    <Input type="text" {...getFieldProps('minute',{initialValue:schedules.selectedSchedules[0].schedule==undefined?'':schedules.selectedSchedules[0].schedule.split(':')[1].split('')[1]}) }/>
                                </FormItem>
                            </Form>

                        </Modal>
                    </div>)
                }
               
            }else if(contentvisible&&schedules.selectedSchedules!=''){
                return(<div>
                    <Modal ref="modal" 
                        width = {500}
                        visible={this.props.contentvisible}
                        title="修改任务" onOk={this.handleOk.bind(this)} onCancel={this.handle_close_modify_schedule_content}
                        >  
                        <Form layout='horizontal'>
                            <FormItem label="任务名称" {...formItemLayoutContent}>
                                <Input type="text" {...getFieldProps('ptask_name',{rules:[{ validator: this.checkTaskName.bind(this) }],initialValue:schedules.selectedSchedules[0].name}) }/>
                            </FormItem>
                            <FormItem label="选择卷" {...formItemLayoutContent}>
                               <Select {...getFieldProps('volumeId', {initialValue:JSON.parse(schedules.selectedSchedules[0].args)+''}) } >
                                    {volumes.map(volume => <Option key={volume.id} value={`${volume.id}`} >{volume.name}</Option>) }
                               </Select>
                            </FormItem>
                            <FormItem label="最大保留数" {...formItemLayoutContent}>
                               <Input type="text" {...getFieldProps('maxnum', {initialValue:schedules.selectedSchedules[0].kwargs==undefined?'':JSON.parse(schedules.selectedSchedules[0].kwargs).max_snap_num}) } />
                            </FormItem>
                            <FormItem label="运行脚本列表"  {...formItemLayoutContent}>
                                {JSON.parse(schedules.selectedSchedules[0].kwargs).scripts==undefined?<Select
                                    {...getFieldProps('scripts', {}) }
                                    mode='tags'
                                    style={{width:'100%'}}
                                    tokenSeparators={[',']}
                                >
                                    {scriptArr}
                                </Select>:<Select
                                    {...getFieldProps('scripts', {initialValue:JSON.parse(schedules.selectedSchedules[0].kwargs).scripts==undefined?'':JSON.parse(schedules.selectedSchedules[0].kwargs).scripts.map(function(item){return item+''})}) }
                                    mode='tags'
                                    style={{width:'100%'}}
                                    tokenSeparators={[',']}
                                >
                                    {scriptArr}
                                </Select>}
                                
                            </FormItem>
                            <FormItem label="脚本出错是否继续快照" {...formItemLayoutContent}>
                                 <Select {...getFieldProps('check_befsnap', {initialValue:JSON.parse(schedules.selectedSchedules[0].kwargs).check_befsnap==undefined?'':JSON.parse(schedules.selectedSchedules[0].kwargs).check_befsnap+''})} >
                                    <Option key='true'>true</Option>
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>)
            }else{
                return(<div></div>)
            }
              
        
        
        
    }

 

}



ModifySchedules.propTypes = {
    onOk: PropTypes.func.isRequired

};
export default createForm({
    mapPropsToFields (props) {
        return {
            period:{name:'period'},
            every:{name:'every'},
            month:{name:'month'},
            week:{name:'week'},
            day:{name:'day'},
            hour:{name:'hour'},
            minute:{name:'minute'},
            ptask_name:{name:'ptask_name'},
            volumeId:{name:'volumeId'},
            maxnum:{name:'maxnum'},
            crontab:{name:'crontab'},
            scripts:{name:'scripts'},
            check_befsnap:{name:'check_befsnap'},
        }
    }
})(ModifySchedules);