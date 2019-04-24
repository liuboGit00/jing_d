import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,Form} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

Option = Select.Option

class Setagent extends Component {
    
    handleOk() {
        const{setagent_id,agentid}=this.props;
        // console.log(setagent_id)
       this.props.onOk(
            {
               'id':setagent_id,
               'agentid':this.props.form.getFieldsValue().agentid,
               'value': this.props.form.getFieldsValue().value,
               'bfcmd': this.props.form.getFieldsValue().bfcmd,
               'afcmd': this.props.form.getFieldsValue().afcmd,
            })

    }

    
    render() {
        const {visible,agentid,agentname} = this.props;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 10},
        };
        console.log(agentid)
        let selsctArr=[];
        if(agentid !=undefined&&agentid !=''){
            const arr = agentid.split(',');
            const nameArr = agentname.split(',')
            
            for(let i=0;i<arr.length;i++){
                selsctArr.push(<Option key={arr[i]}>{nameArr[i]}</Option>)
            }
            
        }
        return (
                <div>
                <Modal ref="modal"
                    width = {400}
                    closable={false}
                    visible={this.props.visible}
                    title="客户端" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this) }>
                            确 定
                        </Button>
                    ]}
                    >
                    <Form layout='horizontal'>
                        <FormItem style={{marginTop:20}} label="客户端" {...formItemLayout}>
                            <Select {...getFieldProps('agentid',{})}  >
                               {selsctArr}
                            </Select>
                        </FormItem>
                        <FormItem  label="客户端地位" {...formItemLayout}>
                            <Select {...getFieldProps('value',{initialValue:"primaryagent"})}>
                                <Option key='primaryagent' value='primaryagent' >primaryagent</Option>
                                <Option key='secondaryagent' value='secondaryagent'>secondaryagent</Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="主前执行脚本" {...formItemLayout}>
                            <Select {...getFieldProps('afcmd',{initialValue:"false"})} style={{}} >
                                <Option key='false' value='false' >false</Option>
                                <Option key='true' value='true'>true</Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="主后执行脚本" {...formItemLayout}>
                            <Select {...getFieldProps('bfcmd',{initialValue:"false"})} style={{}} >
                                <Option key='false' value='false' >false</Option>
                                <Option key='true' value='true'>true</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
                </div>
            );
    }
}

Setagent.propTypes = {
    onOk: PropTypes.func.isRequired
};
export default createForm({
    mapPropsToFields (props) {
        return {
            value: {name: 'value'},
            afcmd:{name:'afcmd'},
            bfcmd:{name:'bfcmd'},
            agentid:{name:'agentid'},
        }
    }
})(Setagent);