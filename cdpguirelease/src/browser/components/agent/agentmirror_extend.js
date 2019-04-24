import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class AgentmirrorExtend extends Component {
    handleSubmit() {
        const{removeagentmirror}=this.props
        this.props.onOk({
            'agentname': this.props.form.getFieldsValue().agentname,
            'vgname': this.props.form.getFieldsValue().vgname,
            'volumename': this.props.form.getFieldsValue().volumename,
            'id':removeagentmirror.id
        })

    }
    render() {
        const { getFieldProps } = this.props.form;
        const {removeagentmirror,agents} = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        console.log(this.props.form.getFieldsValue().agentname)
        const volume_arr=[]
        if(agents!=undefined&&removeagentmirror.agentname!=undefined){
            for (let i=0;i<agents.length; i++) {
                if(agents[i].name==removeagentmirror.agentname&&agents[i].saved_grains!=undefined){
                    for(let j in agents[i].saved_grains.partitions){
                        volume_arr.push(<Option key={j}>{j+':'+agents[i].saved_grains.partitions[j]+'M'}</Option>)
                    }
                }
            };
        }
        console.log(volume_arr)
        return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    closable={false}

                    title="小机镜像" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="客户端名称"  {...formItemLayout}>
                            <Input {...getFieldProps('agentname', {initialValue:removeagentmirror.agentname}) } />
                        </FormItem>

                         <FormItem label="卷组名"  {...formItemLayout}>
                            <Input {...getFieldProps('vgname', {initialValue:removeagentmirror.vgname})}/>
                        </FormItem>
                        <FormItem label="卷名"  {...formItemLayout}>
                            <Select {...getFieldProps('volumename', {})}>
                                {volume_arr}
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

AgentmirrorExtend.propTypes = {
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
})(AgentmirrorExtend);