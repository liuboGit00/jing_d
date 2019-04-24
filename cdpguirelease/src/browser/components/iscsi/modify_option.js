import React, {Component, PropTypes} from 'react';
import {Modal, Form, Button, Input,Select,AutoComplete,Row} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class ModifyOption extends Component {
    handleSubmit() {
        this.props.onOk(
            {
                'name':document.getElementById('name').value,
                'value': this.props.form.getFieldsValue().value
            })
    }

    render() {

        const { getFieldProps } = this.props.form;
        const { targetdetail,targetmodify,onOk,onCancel} = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        if(targetmodify){
            if(targetmodify[0].value.indexOf('=')!=-1){
               var str=(targetmodify[0].value.split('=')[0]).trim();

            }
        }
        
        
        return (
            <div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    title="修改高级选项" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="name"  {...formItemLayout}>
                            
                            <Input {...getFieldProps('name', {}) } value={str}  id='name'/>
                            
                        </FormItem>
                        <FormItem label="value"  {...formItemLayout}>
                            <Input {...getFieldProps('value', {}) }  />
                            
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
 //<Input {...getFieldProps('name', {initialValue:initialName})} type="text"  id='name'/>
//  <Select {...getFieldProps('name', {})} >
//                             {initiatorname.map( initiator => <Option  key={initiator} value={initiator}>{initiator}</Option>)}
//                            </Select>
ModifyOption.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            value: {name: 'value'}
        }
    }
})(ModifyOption);