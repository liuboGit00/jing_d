import React, {Component, PropTypes} from 'react';
import {Modal, Form, Button, Input,Select,AutoComplete} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateHostinitiator extends Component {
    handleSubmit() {
        this.props.onOk(
            {
                'wwn': this.props.form.getFieldsValue().wwn,
                'type': this.props.form.getFieldsValue().type,
                'id': this.props.form.getFieldsValue().id,
            })
    }

    render() {

        const { getFieldProps } = this.props.form;
        const { fcports } = this.props;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        console.log(fcports)
        

        if(fcports!=undefined){
            return (<div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    title="创建Initiator" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="wwn"  {...formItemLayout}>
                           <AutoComplete
                                dataSource={fcports.wwns}
                                {...getFieldProps('wwn', {}) }  
                                />
                        </FormItem>
                        <FormItem label="类型"  {...formItemLayout}>
                            <Select {...getFieldProps('type', {})} >
                                <Option key='iscsi' value='iscsi' >iscsi</Option>
                                <Option key='qla2xxx' value='qla2xxx'>光纤</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="主机id"  {...formItemLayout}>
                            <Input {...getFieldProps('id', {})} type="text"  />
                            
                        </FormItem>
                    </Form>
                </Modal>
            </div>);
        }else{
            return <div></div>
        }

        
    }
}

CreateHostinitiator.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            wwn: {name: 'wwn'},
            type: {name: 'type'},
            id: {name: 'id'}
        }
    }
})(CreateHostinitiator);