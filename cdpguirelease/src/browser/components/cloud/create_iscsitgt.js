import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form ,Checkbox,message} from 'antd';
import {select_all_volume_state} from '../../actions/cloudactions';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option


class CreateIscsitgt extends Component {
    handleSubmit() {
        let id = window.location.href.split('?')[0].split('/')[5];
        let name = window.location.href.split('?')[0].split('/').pop();
        this.props.onOk({
            'address' : this.props.form.getFieldsValue().address, 
            'hba' : this.props.form.getFieldsValue().hba,
            'hostname' : name,
            'id': id,
        })
        
    }
    checkAgentnameExist(rule, value, callback) {
        const text = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
        
    }
    render() {
        const {visible,hba,iscsitgtloading} = this.props
        console.log(iscsitgtloading)
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        let hbaArr=[];
        if(hba){
            for(let i=0;i<hba.length;i++){
                hbaArr.push(<Option key={hba[i]}>{hba[i]}</Option>)
            }
        }
        return (
            <div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    confirmLoading={iscsitgtloading}
                    title="创建虚拟机" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel} >
                    <Form layout='horizontal'>
                        <FormItem label="hba"  {...formItemLayout}>
                            <Select  {...getFieldProps('hba', {initialValue:this.props.form.getFieldsValue().hba}) } >
                                {hbaArr}
                            </Select>
                            
                        </FormItem>
                        <FormItem label="IP地址"  {...formItemLayout}>
                            <Input {...getFieldProps('address', {initialValue:this.props.form.getFieldsValue().address}) } type="text" />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateIscsitgt.propTypes = {

};

export default createForm({
    mapPropsToFields(props) {
        return {
            address: { name: 'address' },
            hba: { name: 'hba' },

        }
    }
})(CreateIscsitgt);
