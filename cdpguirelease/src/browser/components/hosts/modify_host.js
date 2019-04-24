import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class ModifyHost extends Component {
    handleSubmit() {
        const{modifyhost}=this.props;
        // console.log(modifyhost)
        this.props.onOk(
            {   
                'id':modifyhost[0].id,
                'name': this.props.form.getFieldsValue().host_name,
                'url': 'http://'+ this.props.form.getFieldsValue().host_hosturl,
                'token': this.props.form.getFieldsValue().host_token,
            })
    }
    checkHostName(rule, value, callback) {
        var parent=/^[a-zA-Z][A-Za-z0-9-]+$/;
        var re=/^[0-9]/;
        console.log(re.test(value))
        if(value && parent.test(value)){
            callback();
        }else{
            if(re.test(value)){
                callback(new Error('首字母为大写或小写英文字母'));
            }else{
                callback(new Error('不可包含空格和中文'));
            }
        }
        const {items} = this.props;
        if(value != undefined){
            for(let i=0;i<items.length;i++){

                if(value === items[i].name){
                    message.error('主机名已被使用')
                }
            }
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { modifyhost,user } = this.props;
        if(modifyhost!=undefined&&modifyhost!=''){
            // console.log(user)
            const formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 15 },
            };
            if(modifyhost[0].hosturl==null){
                return (
                    <div>
                        <Modal 
                            closable={false}
                            visible={this.props.visible}
                            title="修改主机" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                            >
                            <Form layout='horizontal'>
                                <FormItem label="主机名"  {...formItemLayout}>
                                    <Input {...getFieldProps('host_name', {rules:[{ validator: this.checkHostName.bind(this) }],initialValue:modifyhost[0].name}) } type="text"  />
                                </FormItem>
                                <FormItem label="hosturl"  {...formItemLayout}>
                                    <Input disabled={true} {...getFieldProps('host_hosturl', {initialValue:modifyhost[0].url.split('//')[1].split('/ho')[0]}) } type="text"   />
                                </FormItem>
                                <FormItem  label="token"  {...formItemLayout}>
                                    <Input disabled={true} {...getFieldProps('host_token', {initialValue:user[0].token.token}) } type="text"  />
                                </FormItem>
                                
                            </Form>
                        </Modal>
                    </div>
                );
            }else{
               return (
                    <div>
                        <Modal 
                            closable={false}
                            visible={this.props.visible}
                            title="修改主机" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                            >
                            <Form layout='horizontal'>
                                <FormItem label="主机名"  {...formItemLayout}>
                                    <Input {...getFieldProps('host_name', {rules:[{ validator: this.checkHostName.bind(this) }],initialValue:modifyhost[0].name}) } type="text"  />
                                </FormItem>
                                <FormItem label="hosturl"  {...formItemLayout}>
                                    <Input {...getFieldProps('host_hosturl', {initialValue:modifyhost[0].hosturl.split('//')[1]}) } type="text"   />
                                </FormItem>
                                <FormItem  label="token"  {...formItemLayout}>
                                    <Input  {...getFieldProps('host_token', {initialValue:modifyhost[0].token}) } type="text"  />
                                </FormItem>
                                
                            </Form>
                        </Modal>
                    </div>
                ); 
            }
            
        }else{
            return<div></div>
        }
        
    }
}

ModifyHost.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            host_name: {name: 'host_name'},
            host_hosturl: {name: 'host_hosturl'},
            host_token: {name: 'host_token'},
        }
    }
})(ModifyHost);