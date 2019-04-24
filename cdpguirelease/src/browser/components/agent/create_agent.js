import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class CreateAgent extends Component {
    handleSubmit() {
        this.props.onOk(this.props.form.getFieldsValue().agent_name)
        this.props.form.validateFields((err,value)=>{
            if(err){
                console.log(err)
            }
        })
    }
    checkAgentnameExist(rule, value, callback) {
        var parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文'));
        }
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
                    visible={this.props.visible}
                    closable={false}
                    title="创建客户端" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="客户端名称"  {...formItemLayout}>
                            <Input {...getFieldProps('agent_name', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkAgentnameExist.bind(this) }]
                            }) } type="text"  id='agent_name'/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateAgent.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            agent_name: {name: 'agent_name'},
        }
    }
})(CreateAgent);