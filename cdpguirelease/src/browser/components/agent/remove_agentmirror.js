import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class RemoveAgentmirror extends Component {
    handleSubmit() {
        const{removeagentmirror}=this.props
        this.props.onOk({
            'agentname': this.props.form.getFieldsValue().agentname,
            'vgname': this.props.form.getFieldsValue().vgname,
            'volumename': this.props.form.getFieldsValue().volumename,
            'islast': this.props.form.getFieldsValue().islast,
            'id':removeagentmirror.id,
            'os':removeagentmirror.os,
        })

    }
    render() {
        const { getFieldProps } = this.props.form;
        const {removeagentmirror,agents} = this.props;
        console.log(removeagentmirror)
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const arr =eval('('+removeagentmirror.vgdetails+')')
        const agents_arr=[];
        for(let i=0;i<arr.length;i++){
            agents_arr.push(<Option key={arr[i].split('(')[0]}>{arr[i]}</Option>)
        }
        return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    closable={false}

                    title="小机镜像" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="卷名"  {...formItemLayout}>
                            <Select {...getFieldProps('volumename', {initialValue:arr[arr.length-1].split('(')[0]})}>
                                {agents_arr}
                            </Select>
                        </FormItem>
                        <FormItem label="卷组名"  {...formItemLayout}>
                            <Input {...getFieldProps('vgname', {initialValue:removeagentmirror.vgname})}/>
                        </FormItem>
                        <FormItem label="客户端名称"  {...formItemLayout}>
                            <Input {...getFieldProps('agentname', {initialValue:removeagentmirror.agentname}) } />
                           
                        </FormItem>
                        <FormItem label="最后一个卷"  {...formItemLayout}>
                            <Select {...getFieldProps('islast', {initialValue:'False'})}>
                                <Option key='True'>true</Option>
                                <Option key='False'>false</Option>
                            </Select>

                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

RemoveAgentmirror.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            volumename: {name: 'volumename'},
            vgname: {name: 'vgname'},
            agentname: {name: 'agentname'},
            islast: {name: 'islast'},

        }
    }
})(RemoveAgentmirror);