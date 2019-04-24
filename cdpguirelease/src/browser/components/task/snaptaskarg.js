import React, {Component, PropTypes} from 'react';
import { Steps, Radio, Button, Form,Row,Select,Input,Switch,Col,message} from 'antd'
import {Link} from 'react-router'
const Step = Steps.Step
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option


class SnapTaskArg extends Component {
    constructor(props){
    super(props)
    this.state = {
        flag:true   
    }
  }
    handleSubmit() {
        if(this.props.form.getFieldsValue(). volumeId && this.props.form.getFieldsValue(). maxnum &&  this.props.form.getFieldsValue(). crontab !=undefined){
                // console.log(this.props.form.getFieldsValue().scripts )
        this.props.onSnapTask({
            volumeId:this.props.form.getFieldsValue().volumeId,
            maxnum:this.props.form.getFieldsValue().maxnum,
            crontab:this.props.form.getFieldsValue().crontab,
            scripts:this.props.form.getFieldsValue().scripts,
            check_befsnap:this.props.form.getFieldsValue().check_befsnap=='true'?true:false,
            })
        }else{
             message.error('请把信息填写完整')
        }
    }

    volumeId_blur(){
        if(this.props.form.getFieldsValue().volumeId  ==undefined){
               message.error('请选择卷')
        }
    }
    filecloneId_blur(){
        if(this.props.form.getFieldsValue().volumeId ==undefined){
               message.error('请选择克隆文件')
        }
    }
    volumegroupId_blur(){
        if(this.props.form.getFieldsValue().volumeId ==undefined){
               message.error('请选择卷组')
        }
    }
      crontab_blur(){
        if(this.props.form.getFieldsValue().crontab ==undefined){
               message.error('请选择周期')
        }
    }

    checkSnapTaskArg(rule, value, callback) {
        // console.log(value)
        var parent=  /^\+?[1-9]\d*$/;;

        if(value && parent.test(value)){
            this.setState({
                flag:false
            })
            console.log(value,'value')
            callback();
        }else{
            this.setState({
                flag:true
            })
            callback(new Error('请填大于0的整数'));
        }
    }
    
    checkVolume(rule, value, callback) {
        if(value){
            this.setState({
                flag:false
            })
           console.log(value,'value')
            callback();
        }else{
            this.setState({
                flag:true
            })
            callback(new Error('请选择'));
        }
    }


    render() {
        const {volumes,fileclones,volumegroup,scripts} = this.props
        console.log(scripts)
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        const scriptArr=[]
        for (let i=0;i<scripts.length;i++){
            scriptArr.push(<Option key={scripts[i].id+''} >{scripts[i].name}</Option>)
        }

        if(volumes!=undefined){
            let  volumeArr= []
            volumes.map(volume =>{
                if(volume.native.type.model != 'genericdisk'){
                    volumeArr.push(volume)
                }
            })
            console.log(volumeArr)

            return (
                <div>
                    <Steps current={1}>
                        <Step title="任务类型" key='1' />
                        <Step title="任务参数" key='2' />
                        <Step title="调度时间" key='3' />
                    </Steps>
                    <br/><br/>
                    <Col sm={20}>
                    <Form layout='horizontal' label="创建快照任务">
                        <FormItem label="选择卷" {...formItemLayout}>
                           <Select {...getFieldProps('volumeId', {rules:[{ validator: this.checkVolume.bind(this) }]}) }  onBlur={this. volumeId_blur.bind(this)}  >
                                {volumeArr.map(volume => <Option key={volume.id} value={`${volume.id}`} >{volume.name}</Option>) }
                           </Select>
                        </FormItem>
                        <FormItem label="最大保留数" {...formItemLayout}>
                           <Input type="text" {...getFieldProps('maxnum', {rules:[{ validator: this.checkSnapTaskArg.bind(this) }]}) } />
                        </FormItem>
                        <FormItem label="是否周期复制" {...formItemLayout}>
                             <Select {...getFieldProps('crontab', {rules:[{ validator: this.checkVolume.bind(this) }]}) } onBlur={this.crontab_blur.bind(this)} >
                                <Option key='true'>true</Option>
                                <Option key='false'>false</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="运行脚本列表"  {...formItemLayout}>
                             <Select
                                {...getFieldProps('scripts', {}) }
                                mode='tags'
                                style={{width:'100%'}}
                                tokenSeparators={[',']}
                            >
                                {scriptArr}
                            </Select>
                        </FormItem>
                        <FormItem label="脚本出错是否快照" {...formItemLayout}>
                             <Select {...getFieldProps('check_befsnap', {})} >
                                <Option key='true'>true</Option>
                                <Option key='false'>false</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Col>
                    <Col span={5} offset={10} style={{textAlign: 'right'}}>
                        <Link to='schedules' style={{marginRight:10}}><Button>取消</Button></Link>
                        <Link to={`/createtask`}><Button type="primary" className="cdp_button_left">上一步</Button></Link>&nbsp;&nbsp;&nbsp;
                       {this.props.form.getFieldsValue().maxnum && this.props.form.getFieldsValue().volumeId && this.props.form.getFieldsValue().crontab ?<Link to="period"> <Button type="primary" disabled={this.state.flag} className="cdp_button_left" onClick={this.handleSubmit.bind(this)}>下一步</Button></Link>: <Button type="primary" disabled={this.state.flag} className="cdp_button_left" onClick={this.handleSubmit.bind(this)}>下一步</Button>}
                        
                    </Col>
                </div>
            );
        }else if(volumegroup!=undefined){
            return (
                <div>
                    <Steps current={1}>
                        <Step title="任务类型" key='1' />
                        <Step title="任务参数" key='2' />
                        <Step title="调度时间" key='3' />
                    </Steps>
                    <br/><br/>
                    <Col sm={20}>
                    <Form layout='horizontal' label="创建快照任务">
                        <FormItem label="选择卷组" {...formItemLayout}>
                           <Select {...getFieldProps('volumeId', {rules:[{ validator: this.checkVolume.bind(this) }]}) }  onBlur={this. volumegroupId_blur.bind(this)}  >
                                {volumegroup.map(volumeg => <Option key={volumeg.id} value={`${volumeg.id}`} >{volumeg.groupname}</Option>) }
                            </Select>
                        </FormItem>
                        <FormItem label="最大保留数" {...formItemLayout}>
                           <Input type="text" {...getFieldProps('maxnum', {rules:[{ validator: this.checkSnapTaskArg.bind(this) }]}) } />
                        </FormItem>
                        <FormItem label="是否周期复制" {...formItemLayout}>
                             <Select {...getFieldProps('crontab', {rules:[{ validator: this.checkVolume.bind(this) }]}) } onBlur={this.crontab_blur.bind(this)} >
                                <Option key='true'>true</Option>
                                <Option key='false'>false</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="运行脚本列表"  {...formItemLayout}>
                             <Select
                                {...getFieldProps('scripts', {}) }
                                mode='tags'
                                style={{width:'100%'}}
                                tokenSeparators={[',']}
                            >
                                {scriptArr}
                            </Select>
                        </FormItem>
                        <FormItem label="脚本出错是否快照" {...formItemLayout}>
                             <Select {...getFieldProps('check_befsnap', {})} >
                                <Option key='true'>true</Option>
                                <Option key='false'>false</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Col>
                    <Col span={5} offset={10} style={{textAlign: 'right'}}>
                        <Link to='schedules' style={{marginRight:10}}><Button>取消</Button></Link>

                        <Link to={`/createtask`}><Button type="primary" className="cdp_button_left">上一步</Button></Link>&nbsp;&nbsp;&nbsp;
                        {this.props.form.getFieldsValue().maxnum && this.props.form.getFieldsValue().volumeId && this.props.form.getFieldsValue().crontab ?<Link to="period"><Button type="primary" disabled={this.state.flag} className="cdp_button_left" onClick={this.handleSubmit.bind(this)}>下一步</Button></Link>:<Button type="primary" disabled={this.state.flag} className="cdp_button_left" onClick={this.handleSubmit.bind(this)}>下一步</Button>}
                        
                    </Col>
                </div>
            );
        }else{
            return (
                <div>
                    <Steps current={1}>
                        <Step title="任务类型" key='1' />
                        <Step title="任务参数" key='2' />
                        <Step title="调度时间" key='3' />
                    </Steps>
                    <br/><br/>
                    <Col sm={20}>
                    <Form layout='horizontal' label="创建快照任务">
                        <FormItem label="选择克隆文件" {...formItemLayout}>
                           <Select {...getFieldProps('volumeId', {rules:[{ validator: this.checkVolume.bind(this) }]}) }  onBlur={this. filecloneId_blur.bind(this)}  >
                                {fileclones.map(fileclone => <Option key={fileclone.id} value={`${fileclone.id}`} >{fileclone.name}</Option>) }
                           </Select>
                        </FormItem>
                        <FormItem label="最大保留数" {...formItemLayout}>
                           <Input type="text" {...getFieldProps('maxnum', {rules:[{ validator: this.checkSnapTaskArg.bind(this) }]}) } />
                        </FormItem>
                        <FormItem label="是否周期复制" {...formItemLayout}>
                             <Select {...getFieldProps('crontab', {rules:[{ validator: this.checkVolume.bind(this) }]}) } onBlur={this.crontab_blur.bind(this)} >
                                <Option key='true'>true</Option>
                                <Option key='false'>false</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="运行脚本列表"  {...formItemLayout}>
                             <Select
                                {...getFieldProps('scripts', {}) }
                                mode='tags'
                                style={{width:'100%'}}
                                tokenSeparators={[',']}
                            >
                                {scriptArr}
                            </Select>
                        </FormItem>
                        <FormItem label="脚本出错是否快照" {...formItemLayout}>
                             <Select {...getFieldProps('check_befsnap', {})} >
                                <Option key='true'>true</Option>
                                <Option key='false'>false</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Col>
                    <Col span={5} offset={10} style={{textAlign: 'right'}}>
                        <Link to='schedules' style={{marginRight:10}}><Button>取消</Button></Link>
                        <Link to={`/createtask`}><Button type="primary" className="cdp_button_left">上一步</Button></Link>&nbsp;&nbsp;&nbsp;
                        {this.props.form.getFieldsValue().maxnum && this.props.form.getFieldsValue().volumeId && this.props.form.getFieldsValue().crontab ?<Link to="period"><Button type="primary" disabled={this.state.flag} className="cdp_button_left" onClick={this.handleSubmit.bind(this)}>下一步</Button></Link>:<Button type="primary" disabled={this.state.flag} className="cdp_button_left" onClick={this.handleSubmit.bind(this)}>下一步</Button>}
                        
                    </Col>
                </div>
            );
        }
        
    }
}

SnapTaskArg.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            volumeId: {name: 'volumeId'},
            maxnum: {name: 'maxnum'},
            crontab:{name:'crontab'},
            check_befsnap:{name:'check_befsnap'},
            scripts:{name:'scripts'}

        }
    }
})(SnapTaskArg);