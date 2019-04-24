import React, {Component, PropTypes} from 'react';
import {Modal, Form, Button, Input,Select,AutoComplete} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateInitiator extends Component {
    handleSubmit() {
        this.props.onOk(
            {
                'initiator_name': this.props.form.getFieldsValue().name,
                'initiator_type': this.props.form.getFieldsValue().type
            })
    }

    render() {
        var agentdetail = this.props.agentdetail
        if(agentdetail==null){
            agentdetail=new Object()
            agentdetail.initiatorname=new Array()}
        // var initiatorname = this.props.agentdetail.initiatorname
        // if(initiatorname==undefined){
        //     initiatorname=[]
        // }
        //console.log(initiatorname)
        //const initialName = initiatorname[0]
        //console.log(initialName)
        console.log(agentdetail.initiatorname)
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
                    title="创建Initiator" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                   /* footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk.bind(this) }>
                            确 定
                        </Button>

                    ]}*/
                    >
                    <Form layout='horizontal'>
                        <FormItem label="名称"  {...formItemLayout}>
                            <AutoComplete
                                dataSource={agentdetail.initiatorname}
                                {...getFieldProps('name', {}) }  id='name'
                                />
                        </FormItem>
                        <FormItem label="类型"  {...formItemLayout}>
                            <Select {...getFieldProps('type', {})} >
                                <Option key='iscsi' value='iscsi' >iscsi</Option>
                                <Option key='qla2xxx' value='qla2xxx'>光纤</Option>
                            </Select>
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
CreateInitiator.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            initiator_name: {name: 'initiator_name'},
            initiator_type: {name: 'initiator_type'}
        }
    }
})(CreateInitiator);