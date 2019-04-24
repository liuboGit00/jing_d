import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class CreateIscsi extends Component {
    handleSubmit() {
        this.props.onOk({
            'address':this.props.form.getFieldsValue().address,
            'port':this.props.form.getFieldsValue().port,
        })
    }

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    title="创建ISCSI" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem style={{marginTop:20}} label="地址"  {...formItemLayout}>
                            <Input {...getFieldProps('address',{}) } type="text"  />
                        </FormItem>
                        <FormItem label="端口"  {...formItemLayout}>
                            <Input {...getFieldProps('port',{  initialValue: 3260 }) } />
                        </FormItem>
                    </Form>

                </Modal>
            </div>
        );
    }
}

CreateIscsi.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            address: {name: 'address'},
            port: {name: 'port'},

        }
    }
})(CreateIscsi);