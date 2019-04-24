import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option
import {fetch_localhost,fetch_localvolume,fetch_remotemirrors_host_name} from '../../actions/remotemirrorsactions'


class CreateTokenandurl extends Component {
    handleSubmit() {
        if(this.props.form.getFieldsValue().name!=undefined&&
            this.props.form.getFieldsValue().url!=undefined&&
            this.props.form.getFieldsValue().token!=undefined){
            const{dispatch}=this.props
            dispatch(fetch_remotemirrors_host_name(this.props.form.getFieldsValue().name))
            this.props.onOk(
                {   
                    'name':this.props.form.getFieldsValue().name,
                    'url':'http://'+ this.props.form.getFieldsValue().url,
                    'token': this.props.form.getFieldsValue().token ,
                })
        }else{
            message.error('参数不能为空')
        }
        
    }
    checkHostName(rule, value, callback) {
        const {hosts,dispatch} = this.props;
        var parent=/^[a-zA-Z][A-Za-z0-9_-]+$/;
        var re=/^[0-9]/;
        if(value && parent.test(value)){
            for(let i=0;i<hosts.items.length;i++){
                if(value === hosts.items[i].name){
                    console.log(hosts.items[i].token)
                    if(hosts.items[i].token!=null){
                        dispatch(fetch_remotemirrors_host_name(value))
                        dispatch(fetch_localhost(hosts.items[i].hosturl,hosts.items[i].token))
                        dispatch(fetch_localvolume(hosts.items[i].hosturl,hosts.items[i].token))
                        var pp = this.props.point;
                        pp();
                        callback()
                    }else{
                        message.error('主机token不存在')
                    }
                }else{
                    callback()
                }
            }
        }else{
            if(re.test(value)){
                callback(new Error('首字母为大写或小写英文字母'));
            }else{
                callback(new Error('不可包含空格和中文及特殊字符'));
            }
        }
    }
    checkUrl(rule,value,callback){
        const text = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
        if(value&&text.test(value)){
            callback()
        }else{
            callback(new Error('请填写正确的地址'))
        }

    }
    render() {
        const {visible} = this.props
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
                        <FormItem label="name"  {...formItemLayout}>
                            <Input {...getFieldProps('name', {rules:[{ validator: this.checkHostName.bind(this) }]}) } type="text"  />
                        </FormItem>
                        <FormItem label="token"  {...formItemLayout}>
                            <Input {...getFieldProps('token', {}) } type="text"  />
                        </FormItem>
                        <FormItem label="url"  {...formItemLayout}>
                            <Input placeholder="0.0.0.0" {...getFieldProps('url', {rules:[{validator:this.checkUrl.bind(this)}]}) } type="text"  />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateTokenandurl.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            url: {name: 'url'},
            token: {name: 'token'},
        }
    }
})(CreateTokenandurl);