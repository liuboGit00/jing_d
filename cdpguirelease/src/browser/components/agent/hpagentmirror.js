import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class HpAgentmirror extends Component {
    handleSubmit() {
        const{hp}=this.props
        this.props.onOk({
            'agentname': this.props.form.getFieldsValue().agentname,
            'vgname': this.props.form.getFieldsValue().vgname,
            'diskname': this.props.form.getFieldsValue().diskname,
            'id':hp.id,
        })

    }
    render() {
        const { getFieldProps } = this.props.form;
        const {hp,agents,hptask} = this.props;
        console.log(hp,hptask)
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const arr =eval('('+hp.vgdetails+')')
        const agents_arr=[];
        for(let i=0;i<arr.length;i++){
            // console.log(arr[i].split('_').length)
            if(arr[i].split('_').length<=1){
                agents_arr.push(<Option key={arr[i].split('(')[0]}>{arr[i]}</Option>)
            }
            
        }

        return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    // closable={false}
                    title="HP镜像" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="客户端名称"  {...formItemLayout}>
                            <Input {...getFieldProps('agentname', {initialValue:hp.agentname}) } />
                        </FormItem>
                        <FormItem label="卷组名"  {...formItemLayout}>
                            <Input {...getFieldProps('vgname', {initialValue:hp.vgname})}/>
                        </FormItem>
                        <FormItem label="硬盘"  {...formItemLayout}>
                            <Select {...getFieldProps('diskname', {})}>
                                {agents_arr}
                            </Select>
                        </FormItem>
                        
                    </Form>
                </Modal>
            </div>
        );
    }
}

HpAgentmirror.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            volumename: {name: 'volumename'},
            vgname: {name: 'vgname'},
            agentname: {name: 'agentname'},

        }
    }
})(HpAgentmirror);