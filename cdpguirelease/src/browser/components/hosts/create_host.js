import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class CreateHost extends Component {
    handleSubmit() {

        this.props.onOk(
            {
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
                callback(new Error('不可包含空格和中文以及特殊字符'));
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
    checkUrl(rule,value,callback){
        const text = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
        // console.log(value.split('/')[0])
        
        // console.log(text.test(value))
        if(value&&text.test(value.split('/')[0])){
            callback()
        }else{
            callback(new Error('请填写正确的地址'))
        }

    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Modal
                    closable={false}
                    visible={this.props.visible}
                    title="创建主机" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="主机名"  {...formItemLayout}>
                            <Input {...getFieldProps('host_name', {rules:[{required:true,message:'请填写信息',whitespace:true},{ validator: this.checkHostName.bind(this) }]}) } type="text"  />
                        </FormItem>
                        <FormItem label="主机地址" {...formItemLayout}>
                            <Input  placeholder="*.*.*.*"{...getFieldProps('host_hosturl', {rules:[{required:true,message:'请填写信息',whitespace:true},{validator:this.checkUrl.bind(this)}]}) } type="text"   />
                        </FormItem>
                        <FormItem label="token"  {...formItemLayout}>
                            <Input  {...getFieldProps('host_token', {rules:[{required:true,message:'请填写信息',whitespace:true}]}) } type="text"  />
                        </FormItem>
                        
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateHost.propTypes = {
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
})(CreateHost);