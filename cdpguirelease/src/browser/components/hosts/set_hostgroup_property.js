import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option
var va='';

class SetHostgroupProperty extends Component{
    handleSubmit() {
    	const {hostgroup}=this.props
    	// console.log(hostgroup)
        this.props.onOk(
            {
                'property': this.props.form.getFieldsValue().property,
                'value': this.props.form.getFieldsValue().value==='false'?false:this.props.form.getFieldsValue().value==='true'?true:this.props.form.getFieldsValue().value,
                'name':hostgroup[0].name,
                'id':hostgroup[0].id,
            })
    }
    handlechangevalue(value){
    	const {property} =this.props
    	let str = JSON.stringify(property).split('"')[1]
        let prop = str.split('\\n')
    	// console.log(value)
    	for(let i=0;i<prop.length-1;i++){
    		// console.log(prop[i].split(':')[0])
    		if(prop[i].split(':')[0]==value){
    			// console.log(prop[i].split(':')[1])
    			va=prop[i].split(':')[1]
    		}
    	}


    }
    render() {
    	const {property} = this.props
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        let str = JSON.stringify(property).split('"')[1]
        let prop = str.split('\\n')
        let propertyarr =[];
        for(let i=0;i<prop.length-1;i++){
        	propertyarr.push(<Option key={prop[i].split(':')[0]}>{prop[i].split(':')[0]}</Option>)
        }
        // console.log(va)
        return (
            <div>
                <Modal
                    closable={false}
                    visible={this.props.visible}
                    title="设置属性" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="属性"  {...formItemLayout}>
                          	<Select
                              placeholder="请选择"
                              onSelect={this.handlechangevalue.bind(this)}
                              {...getFieldProps('property', {}) }
                            >
                                {propertyarr}
                            </Select>   
                        </FormItem> 
                        <FormItem label="属性值"  {...formItemLayout}>
                            <Input  {...getFieldProps('value', {initialValue:va}) } type="text"  />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

SetHostgroupProperty.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            property: {name: 'property'},
            value: {name: 'value'},
        }
    }
})(SetHostgroupProperty);