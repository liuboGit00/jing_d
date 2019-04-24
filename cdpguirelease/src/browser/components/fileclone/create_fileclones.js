import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message } from 'antd';
import {close_filersync,} from '../../actions/filersyncaction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
var vpath ='';
class CreateFileclones extends Component {

    handleSubmit(e) {
        let sub= true;
        this.props.form.validateFields((err,value)=>{
            if(err){
                sub=false
                console.log(err)
            }
        });
        this.props.onOk({
            'name':this.props.form.getFieldsValue().name,
            'agent':this.props.form.getFieldsValue().agent,
            'agentpath':this.props.form.getFieldsValue().agentpath,
            'localpath':this.props.form.getFieldsValue().localpath,
            'localend':this.props.form.getFieldsValue().localend,
            'localip':this.props.form.getFieldsValue().localip,
            'exclude':this.props.form.getFieldsValue().exclude,
            'delete':this.props.form.getFieldsValue().deletefile=='false'?false:true,
            'by_ssh':this.props.form.getFieldsValue().by_ssh=='false'?false:true,
            'script':this.props.form.getFieldsValue().script,
            'check':sub,

        })  

        
    }

    checkVolumeName(rule, value, callback) {
        const parent=/^[A-Za-z0-9]+$/;
        console.log(parent.test(value))
        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格、中文、特殊字符。'));
        }
        const {items} = this.props;
            // console.log(items)

        if(value != undefined){
            for(let i=0;i<items.length;i++){

                if(value === items[i].name){
                    message.error('名称已被使用')
                }
            }
        }
    }
    render() {
        const { getFieldProps} = this.props.form;
        const { agents,ipaddress,filersync,selectedFileclones,echo} = this.props;
        // console.log(selectedFileclones)

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };

        var agentArr=[];
        var ipaddressArr = [];
        var rsyncArr = [];
        // console.log(ipaddress)

        if(agents!=''){
            for(let i=0;i<agents.length;i++){
                agentArr.push(<Option key={i} value={agents[i].url}>{agents[i].name}</Option>)
            }
        }
        if(ipaddress!=undefined){
            for(let i=0;i<ipaddress.length;i++){
                ipaddressArr.push(<Option key={i} value={ipaddress[i].url}>{ipaddress[i].address}</Option>)
            }
        }
        if(filersync!=''){
            for(let i=0;i<filersync.length;i++){
                rsyncArr.push(<Option key={i} value={filersync[i].url}>{filersync[i].name}</Option>)
            }
        }
        // console.log(ipaddressArr)
        if(echo !='echo'){
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="增加文件克隆设置" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                        >
                        <Form layout='horizontal'>
                           <FormItem label="名字"  {...formItemLayout}>
                                <Input {...getFieldProps('name',{rules:[{max:25,message:'名字不能超过25个字符'},{ validator: this.checkVolumeName.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="客户端"  {...formItemLayout}>
                                <Select {...getFieldProps('agent', {}) } >
                                    {agentArr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="客户端目录"  {...formItemLayout}>
                                <Input {...getFieldProps('agentpath',{}) } />
                            </FormItem>
                            
                            <FormItem label="本地节点"  {...formItemLayout}>
                                <Select {...getFieldProps('localend', {}) } >
                                    {rsyncArr}
                                </Select>
                            </FormItem><FormItem label="本地IP"  {...formItemLayout}>
                                <Select {...getFieldProps('localip', {}) } >
                                    {ipaddressArr}
                                </Select>
                            </FormItem>
                            <FormItem label="过滤文件"  {...formItemLayout}>
                                <Input placeholder='eg:*.mp4'{...getFieldProps('exclude',{}) } />
                            </FormItem>
                            <FormItem label="同步删除"  {...formItemLayout}>
                                <Select {...getFieldProps('deletefile', {initialValue:'false'}) } >
                                    <Option value="true"  >true</Option>
                                    <Option value="false"  >false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="使用ssh通道"  {...formItemLayout}>
                                <Select {...getFieldProps('by_ssh', {initialValue:'false'}) } >
                                    <Option value="true"  >true</Option>
                                    <Option value="false"  >false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="生成脚本"  {...formItemLayout}>
                                <Select {...getFieldProps('script', {initialValue:'true'}) } >
                                    <Option value="true"  >true</Option>
                                    <Option value="false"  >false</Option>
                                </Select>
                            </FormItem>
                        </Form>

                    </Modal>
                </div>
            );
        
        }else if(selectedFileclones!='' && selectedFileclones!=undefined){
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="修改文件克隆设置" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="名字"  {...formItemLayout}>
                                <Input {...getFieldProps('name',{rules:[{max:25,message:'名字不能超过25个字符'},{ validator: this.checkVolumeName.bind(this) }],initialValue: selectedFileclones.name}) } type="text"  />
                            </FormItem>
                            <FormItem label="客户端"  {...formItemLayout}>
                                <Select {...getFieldProps('agent', {initialValue:selectedFileclones.agent}) } >
                                    {agentArr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="客户端目录"  {...formItemLayout}>
                                <Input {...getFieldProps('agentpath',{ initialValue:selectedFileclones.agentpath}) } />
                            </FormItem>
                            
                            <FormItem label="本地节点"  {...formItemLayout}>
                                <Select {...getFieldProps('localend', {initialValue:selectedFileclones.localend}) } >
                                    {rsyncArr}
                                </Select>
                            </FormItem><FormItem label="本地IP"  {...formItemLayout}>
                                <Select {...getFieldProps('localip', {initialValue:selectedFileclones.localip}) } >
                                    {ipaddressArr}
                                </Select>
                            </FormItem>
                            <FormItem label="过滤文件"  {...formItemLayout}>
                                <Input placeholder='eg:*.mp4'{...getFieldProps('exclude',{initialValue:selectedFileclones.exclude}) } />
                            </FormItem>
                            <FormItem label="同步删除"  {...formItemLayout}>
                                <Select {...getFieldProps('deletefile', {initialValue:selectedFileclones.delete_flag+''}) } >
                                    <Option value="true"  >true</Option>
                                    <Option value="false"  >false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="使用ssh通道"  {...formItemLayout}>
                                <Select {...getFieldProps('by_ssh', {initialValue:selectedFileclones.by_ssh+''}) } >
                                    <Option value="true"  >true</Option>
                                    <Option value="false"  >false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="生成脚本"  {...formItemLayout}>
                                <Select {...getFieldProps('script', {initialValue:'true'}) } >
                                    <Option value="true"  >true</Option>
                                    <Option value="false"  >false</Option>
                                </Select>
                            </FormItem>
                            
                                
                           
                        </Form>

                    </Modal>
                </div>
            );
        }else{
            return(<div></div>)
        }


    }
}

CreateFileclones.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            agent :{name:'agent'},
            agentpath :{name:'agentpath'},
            localpath :{nme:'localpath'},
            localip :{namame:'localip'},
            localend :{name:'localend'},
            exclude:{name:'exclude'},
            deletefile:{name:'deletefile'},
            by_ssh:{name:'by_ssh'},
            scrip:{name:'script'},
        }
    }
})(CreateFileclones);
/*<FormItem label="本地目录"  {...formItemLayout}>
                                <Input {...getFieldProps('localpath',{}) } disabled={true} />
                            </FormItem>
<FormItem label="本地目录"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('localpath',{ initialValue: selectedFileclones.localpath}) } />
                            </FormItem>*/