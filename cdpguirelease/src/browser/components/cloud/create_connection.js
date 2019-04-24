import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option
import {set_vpc_switch_on,set_vpc_switch_off} from '../../actions/cloudactions'
class CreateConnection extends Component {
    handleSubmit() {
        const {dispatch,content} =this.props
       
        this.props.form.validateFields((err,value)=>{
            if(err){
                console.log(err)
            }else{
                    if(this.props.form.getFieldsValue().cloudtype=='local'){
                        this.props.onOk({
                            'name': this.props.form.getFieldsValue().name,
                            'connection': this.props.form.getFieldsValue().connection,
                            'adminurl':this.props.form.getFieldsValue().adminurl,
                            'cloudtype':this.props.form.getFieldsValue().cloudtype,         
                        })
                    }else if (this.props.form.getFieldsValue().cloudtype=='vmware'){
                        const obj={
                            'name': this.props.form.getFieldsValue().name,
                            'connection': this.props.form.getFieldsValue().connection,
                            'adminurl':this.props.form.getFieldsValue().adminurl,
                            'cloudtype':this.props.form.getFieldsValue().cloudtype,
                        }
                        dispatch(set_vpc_switch_on(obj))
                    }else if(this.props.form.getFieldsValue().user){
                        this.props.onOk({
                           'name': content.name,
                           'connection': content.connection,
                           'adminurl':content.adminurl,
                           'cloudtype':content.cloudtype,
                           'user':this.props.form.getFieldsValue().user,
                           'password':this.props.form.getFieldsValue().password,
                           'protocol':this.props.form.getFieldsValue().protocol,
                           'port':this.props.form.getFieldsValue().port,
                           'url':this.props.form.getFieldsValue().url,
                        })
                    
                    }
            }
        })
       
    }
    checknameExist(rule, value, callback){
        let parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文以及特殊字符。'));
        }
        const {clouds} = this.props
        // console.log(clouds)
        for (let  i = 0; i < clouds.length; i++) {
            if (clouds[i].name == value) {
                callback(new Error('抱歉，该名称已被占用'))
            } else { callback() }
        }
    }
    checkcloudtypeExist(rule,value,callback){
        // console.log(value)
        if(value){
             callback()
        }
        callback(new Error('请选择云类型'))
       
    }
    checkconnectionExist(rule,value,callback){
        // console.log(value)
        // if(value){
             callback()
        // }
        // callback(new Error('请选择连接类型'))
       
    }
    checkadminurlExist(rule,value,callback){
        // console.log(value)
        if(value){
             callback()
        }
        callback(new Error('请填写管理链接'))
       
    }
    checkuserExist(rule,value,callback){
        if (value) {
            callback()
        };
        callback(new Error('请填写用户名'))
    }
    checkpasswordExist(rule,value,callback){
        if (value) {
            callback()
        };
        callback(new Error('请填写密码'))
    }
    checkprotocolExist(rule,value,callback){
        if (value) {
            callback()
        };
        callback(new Error('请填写传输协议'))
    }
    checkportExist(rule,value,callback){
        if (value) {
            callback()
        };
        callback(new Error('请填写接口号'))
    }
    checkurlExist(rule,value,callback){
        if (value) {
            callback()
        };
        callback(new Error('请填写地址'))
    }
    handleblack(){
        const{dispatch}=this.props
        dispatch(set_vpc_switch_off())
    }
    render() {
        const {visible,vpcswitch,content} = this.props
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        // console.log(content)
        // console.log(this.props.form.getFieldsValue().cloudtype)
        if(vpcswitch){
            return (
                <div>
                    <Modal 
                        visible={this.props.visible}
                        title="创建连接配置" 
                        onOk={this.handleSubmit.bind(this) } 
                        onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
                            <Button key="echolocal" type="ghost" size="large"  onClick={this.handleblack.bind(this)}>上一步</Button>,
                            <Button key="echolocalagent" type="ghost" size="large"  onClick={this.handleSubmit.bind(this)}>确定</Button>,
                        ]}>
                        <Form layout='horizontal'>
                            <FormItem label="用户名"  {...formItemLayout}>
                                <Input {...getFieldProps('user', {initialValue:this.props.form.getFieldsValue().user,rules: [{
                                        max: 50,
                                        message: '主机名称最多为50个字符'
                                    }, { validator: this.checkuserExist.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="密码"  {...formItemLayout}>
                                <Input {...getFieldProps('password', {initialValue:this.props.form.getFieldsValue().password,rules: [{ validator: this.checkpasswordExist.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="地址"  {...formItemLayout}>
                                <Input {...getFieldProps('url', {initialValue:this.props.form.getFieldsValue().url,rules: [{ validator: this.checkurlExist.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="协议"  {...formItemLayout}>
                                <Input {...getFieldProps('protocol', {initialValue:this.props.form.getFieldsValue().protocol,rules: [{ validator: this.checkprotocolExist.bind(this) }]}) } type="text"  />
                            </FormItem><FormItem label="接口"  {...formItemLayout}>
                                <Input {...getFieldProps('port', {initialValue:this.props.form.getFieldsValue().port,rules: [{ validator: this.checkportExist.bind(this) }]}) } type="text"  />
                            </FormItem>

                            
                        </Form>
                    </Modal>
                </div>
            );
        }else{
            return (
                <div>
                    <Modal 
                        visible={this.props.visible}
                        okText={content&&this.props.form.getFieldsValue().cloudtype==undefined?(content.cloudtype=='vmware'?'下一步':'确定'):(this.props.form.getFieldsValue().cloudtype=='vmware'?'下一步':'确定')}
    
                        title="创建连接配置" 
                        onOk={this.handleSubmit.bind(this)} 
                        onCancel={this.props.onCancel}>
                        <Form layout='horizontal'>
                            <FormItem label="主机名称"  {...formItemLayout}>
                                <Input {...getFieldProps('name', {initialValue:content?content.name:null,rules: [{
                                        max: 50,
                                        message: '主机名称最多为50个字符'
                                    }, { validator: this.checknameExist.bind(this) }]}) } type="text" id='name' />
                            </FormItem>
                            <FormItem label="连接类型"  {...formItemLayout}>
                                <Select {...getFieldProps('connection', {initialValue:content?content.connection:null,rules: [{ validator: this.checkconnectionExist.bind(this) }]}) } >
                                    <Option key='qemu:///system' value='qemu:///system'>qemu:///system</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="管理链接" {...formItemLayout}>
                                <Input {...getFieldProps('adminurl', {initialValue:content?content.adminurl:null,rules: [{ validator: this.checkadminurlExist.bind(this) }]}) } type="text" id='adminurl' />
                            </FormItem>
                            <FormItem label="云类型"  {...formItemLayout}>
                                <Select {...getFieldProps('cloudtype', {initialValue:content?content.cloudtype:null,rules: [{ validator: this.checkcloudtypeExist.bind(this) }]}) } >
                                    <Option key='local' value='local'>local</Option>
                                    <Option key='vmware' value='vmware'>vmware</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            );
        }
        
    }
}

CreateConnection.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            connection: {name: 'connection'},
            adminurl:{name:'adminurl'},
            cloudtype:{name:'cloudtype'},
            user:{name:'user'},
            password:{name:'password'},
            protocol:{name:'protocol'},
            port:{name:'port'},
            url:{name:'url'},
        }
    }
})(CreateConnection);