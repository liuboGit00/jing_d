import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class CreateSSH extends Component {
    handleSubmit() {
        this.props.onOk({
			//this.props.form.getFieldsValue().agent_name,
			'ip_addr': this.props.form.getFieldsValue().ip_addr,
			'ip_port': this.props.form.getFieldsValue().ip_port,
			'ssh_user': this.props.form.getFieldsValue().ssh_user,
			'ssh_passwd': this.props.form.getFieldsValue().ssh_passwd,
		})
    }
    checkAgentnameExist(rule, value, callback) {
       
        const {agents} = this.props
        
        for (var i = 0; i < agents.length; i++) {
            // console.log(agents[i].name)
            // console.log(value)
            if (agents[i].name == value) {
                callback(new Error('抱歉，该名称已被占用'))
            } else { callback() }
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    title="创建SSH连接" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="IP地址"  {...formItemLayout}>
                            <Input {...getFieldProps('ip_addr', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkAgentnameExist.bind(this) }]
                            }) } type="text"  id='ip_addr'/>
                        </FormItem>
						<FormItem label="端口号"  {...formItemLayout}>
                            <Input {...getFieldProps('ip_port', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkAgentnameExist.bind(this) }]
                            }) } type="text"  id='ip_port'/>
                        </FormItem>
						<FormItem label="用户名"  {...formItemLayout}>
                            <Input {...getFieldProps('ssh_user', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkAgentnameExist.bind(this) }]
                            }) } type="text"  id='ssh_user'/>
                        </FormItem>
						<FormItem label="密码"  {...formItemLayout}>
                            <Input {...getFieldProps('ssh_passwd', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkAgentnameExist.bind(this) }]
                            }) } type="text"  id='ssh_passwd'/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateSSH.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            ip_addr: {name: 'ip_addr'},
			ip_port: {name: 'ip_port'},
			ssh_user: {name: 'ssh_user'},
			ssh_passwd: {name: 'ssh_passwd'},
        }
    }
})(CreateSSH);