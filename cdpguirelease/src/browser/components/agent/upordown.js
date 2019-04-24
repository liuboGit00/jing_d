import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,Form} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

Option = Select.Option

class Upordown extends Component {
    
    handleOk() {
        const{mirror_id,agentid}=this.props;
        this.props.onOk({
            'id':mirror_id,
            'agentid':this.props.form.getFieldsValue().agentid,
            'value': this.props.form.getFieldsValue().value,
            'afcmd': this.props.form.getFieldsValue().afcmd,
            'bfcmd': this.props.form.getFieldsValue().bfcmd,
        })
    }
    handlegetagent(){
        const {agentid} =this.props
        if (!agentid) {
            Modal.confirm({
                title: '镜像',
                content: '未获取到客户端',
                okText: '确认',
                cancelText: '取消',
            })
        };
    }
    
    render() {
        const {visible,agentid,agentname} = this.props;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10},
        };console.log(visible)
        // console.log(agentname)
        let selsctArr=[];
        if(agentid !=undefined&&agentid !=''){
            const arr = agentid.split(',');
            const nameArr =agentname.split(',')
            
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
                            同 步
                        </Button>
                    ]}
                    >
                    <Form layout='horizontal'>
                        <FormItem style={{marginTop:20}} label="客户端" {...formItemLayout}>
                            <Select  onFocus={this.handlegetagent.bind(this)}  {...getFieldProps('agentid',{})}  >
                               {selsctArr}
                            </Select>
                        </FormItem>
                        <FormItem label="设置客户端" {...formItemLayout}>
                            <Select {...getFieldProps('value',{initialValue:"upagent"})}  >
                                <Option  key='upagent' value='upagent' >upagent</Option>
                                <Option  key='downagent' value='downagent'>downagent</Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="主后执行函数" {...formItemLayout}>
                            <Select {...getFieldProps('afcmd',{initialValue:"false"})}  >
                                <Option key='false' value='false' >false</Option>
                                <Option key='true' value='true'>true</Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="主前执行函数" {...formItemLayout}>
                            <Select {...getFieldProps('bfcmd',{initialValue:"false"})}  >
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

Upordown.propTypes = {
    onOk: PropTypes.func.isRequired
};
export default createForm({
    mapPropsToFields (props) {
        return {
            value: {name: 'value'},
            afcmd: {name: 'afcmd'},
            bfcmd: {name: 'bfcmd'},
            agentid:{name:'agentid'},
        }
    }
})(Upordown);