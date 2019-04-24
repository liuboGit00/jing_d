import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,Form} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

Option = Select.Option

class Installagent extends Component {
    
    handleOk() {
    	const{installagent_id}=this.props;
        if(this.props.form.getFieldsValue().agentid){
            this.props.onOk({
               'agentid':this.props.form.getFieldsValue().agentid,
               'installagent_id':installagent_id,
               'bfcmd': this.props.form.getFieldsValue().bfcmd,
               'afcmd': this.props.form.getFieldsValue().afcmd,
            })
        }else{
            Modal.warning({
                title:'CDP系统提示！',
                content:'请选择客户端。',
                onOk(){},
                onCancel(){},
            })
        }
        

    }

       
    
    render() {
        const {visible,agentid,agentname,} = this.props;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 10},
        };
        // console.log(agentname)
        if(agentid !=undefined&&agentid !=''){
            const arr = agentid.split(',');
            const nameArr = agentname.split(',')
            const selsctArr=[];
            for(let i=0;i<arr.length;i++){
                selsctArr.push(<Option key={arr[i]}>{nameArr[i]}</Option>)
            }
            return (
                <div>
                    <Modal ref="modal"
                    width = {400}
                    closable={false}
                    visible={this.props.visible}
                    title="安装客户端配置" onOk={this.props.onOk} onCancel={this.props.onCancel}
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
                        <FormItem  label="主后执行函数" {...formItemLayout}>
                            <Select {...getFieldProps('afcmd',{initialValue:"false"})} style={{}} >
                                <Option key='false' value='false' >false</Option>
                                <Option key='true' value='true'>true</Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="主前执行函数" {...formItemLayout}>
                            <Select {...getFieldProps('bfcmd',{initialValue:"false"})} style={{}} >
                                <Option key='false' value='false' >false</Option>
                                <Option key='true' value='true'>true</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Modal>
                </div>
            );
        }else{
            return(<div></div>)
        }
        

        
        
    }
}

Installagent.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            afcmd:{name:'afcmd'},
            bfcmd:{name:'bfcmd'},
            agentid:{name:'agentid'},
        }
    }
})(Installagent);