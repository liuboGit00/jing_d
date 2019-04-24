import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class CreateVolumegroup extends Component {
    handleSubmit() {
        if(this.props.form.getFieldsValue().groupname!=undefined&&
            this.props.form.getFieldsValue().args!=undefined
        ){
            this.props.onOk({
                'name': this.props.form.getFieldsValue().groupname,
                'presh': this.props.form.getFieldsValue().presh,
                'postsh': this.props.form.getFieldsValue().postsh,
                'args': this.props.form.getFieldsValue().args,
            })   
        }else{
            return message.error('数据不能为空')
        }
 
               
    }
    checkVolumeName(rule, value, callback) {
        const parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文'));
        }
        const {items} = this.props;
            // console.log(items)

        if(value != undefined){
            for(let i=0;i<items.length;i++){

                if(value === items[i].name){
                    message.error('卷名已被使用')
                }
            }
        }
    }

    render() {
        const {visible,volumes} = this.props
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        const volumeArr=[]
        // console.log(volumes)
        if(volumes){
            for(let i=0;i<volumes.length;i++){
                volumeArr.push(<Option key={volumes[i].id+''}>{volumes[i].name}</Option>)
            }
        }
        return (
            <div>
                <Modal 
                    closable={false}
                    visible={this.props.visible}
                    title="创建卷组" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="卷组"  {...formItemLayout}>
                             <Select
                                {...getFieldProps('args', {}) }
                                mode='tags'
                                style={{width:'100%'}}
                                tokenSeparators={[',']}
                            >
                                {volumeArr}
                            </Select>
                        </FormItem>
                        <FormItem label="卷组名"  {...formItemLayout}>
                           <Input {...getFieldProps('groupname', {rules:[{validator: this.checkVolumeName.bind(this)}]}) } type="text"  />
                        </FormItem>
                        <FormItem label="执行前脚本"  {...formItemLayout}>
                            <Input {...getFieldProps('presh', {rules:[{}]}) } type="text"  />
                        </FormItem>
                        <FormItem label="执行后脚本"  {...formItemLayout}>
                            <Input {...getFieldProps('postsh', {rules:[{}]}) } type="text" />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateVolumegroup.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            groupname: {name: 'groupname'},
            presh: {name: 'presh'},
            postsh: {name: 'postsh'},
            args: {name: 'args'},
        }
    }
})(CreateVolumegroup);