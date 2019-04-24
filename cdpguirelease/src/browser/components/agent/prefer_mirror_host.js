import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class Prefermirrorhost extends Component {
    handleSubmit() {
        const{id}=this.props
        this.props.onOk({
            'host':this.props.form.getFieldsValue().host,
            'databaseonly':this.props.form.getFieldsValue().databaseonly==false?false:true,
            'id':id,
        })
        
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {mirrors,id,loading,host} = this.props
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        let hostArr=[];
        let nexthost = '';
        for(let i=0; i<mirrors.length;i++){
            if(mirrors[i].id == id){
                if(mirrors[i].gethostendpoint[0]!=''){
                    nexthost = mirrors[i].gethostendpoint[0].host
                }
            }
        };
        for(let i=0;i<host.length;i++){
            if(host[i].machine_code!=''){
                hostArr.push(<Option key={host[i].name}>{host[i].name}</Option>)
            }
            if(nexthost == host[i].url){
                hostArr.push(<Option key={host[i].name}>{host[i].name}</Option>)
            }
        };
        return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    closable={false}
                    title="创建客户端" 
                    onOk={this.handleSubmit.bind(this) } 
                    onCancel={this.props.onCancel}
                    confirmLoading={loading}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="客户端名称"  {...formItemLayout}>
                            <Select {...getFieldProps('host', {})}>
                                {hostArr}
                            </Select>
                        </FormItem>
                        <FormItem label="客户端名称"  {...formItemLayout}>
                            <Select {...getFieldProps('databaseonly', {initialValue:'true'})} >
                                <Option key='true' value='true' >true</Option>
                                <Option key='false' value='false'>false</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default createForm({
    mapPropsToFields (props) {
        return {
            host: {name: 'host'},
            databaseonly: {name: 'databaseonly'},

        }
    }
})(Prefermirrorhost);