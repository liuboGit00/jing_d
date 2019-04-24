import React, {Component, PropTypes} from 'react';
import {Modal, Form, Button, Input,Select,AutoComplete} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class RegisterDeadline extends Component {
    handleSubmit() {
        this.props.onOk(
            {
                'code': this.props.form.getFieldsValue().code,
            })
    }
    checkuserExist(rule, value, callback){
        // console.log()
        callback()

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
                    title="CDP创建" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="注册码"  {...formItemLayout}>
                            <Input {...getFieldProps('code', { rules: [{
                                    }, { validator: this.checkuserExist.bind(this) }] })} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
RegisterDeadline.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            code: {name: 'code'},
        }
    }
})(RegisterDeadline);