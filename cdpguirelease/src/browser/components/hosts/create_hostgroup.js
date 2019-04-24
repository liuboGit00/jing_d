import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class CreateHostgroup extends Component {
    handleSubmit() {

        this.props.onOk(
            {
                'name': this.props.form.getFieldsValue().name,
                'url':  this.props.form.getFieldsValue().url,
                
            })
    }
    checkHostName(rule, value, callback) {
        var parent=/^[a-zA-Z][A-Za-z0-9-_]+$/;
        var re=/^[0-9]/;
        // console.log(re.test(value))
        if(value && parent.test(value)){
            callback();
        }else{
            if(re.test(value)){
                callback(new Error('首字母为大写或小写英文字母'));
            }else{
                callback(new Error('不可包含空格和中文'));
            }
        }
        const {items} = this.props;
        // console.log(items)
        if(value != undefined&&items.length>0){
            for(let i=0;i<items.length;i++){

                if(value === items[i].name){
                    message.error('主机名已被使用')
                }
            }
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        const {hosts} =this.props
        let hostarr=[]
        for(let i=0;i<hosts.length;i++){
            hostarr.push(<Option key={hosts[i].url}>{hosts[i].name}</Option>)
        }
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Modal
                    closable={false}
                    visible={this.props.visible}
                    title="创建主机集群" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="任务名称" {...formItemLayout}>
                            <Input autoComplete="off" {...getFieldProps('name', {rules:[{message:'请填写信息',whitespace:true},{ validator: this.checkHostName.bind(this) }]}) }  type="text"  />
                        </FormItem>
                        <FormItem label="主机地址" {...formItemLayout}>
                            <Select
                              mode="multiple"
                              style={{ width: '100%' }}
                              placeholder="请选择"
                              {...getFieldProps('url', {}) }
                            >
                                {hostarr}
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateHostgroup.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            url: {name: 'url'},
        }
    }
})(CreateHostgroup);