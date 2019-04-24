import React, {Component, PropTypes} from 'react';
import {Modal,Form,Button,Input} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;

class CloneSnapshot extends Component {
    handleSubmit() {
        const {item,volumes} =this.props
        const name = [];
        console.log(item)
        const clone = item[0].clone_set
        for(let i=0 ;i<clone.length;i++){
           for(let j=0;j<volumes.length;j++){
            // console.log(clone[i],volumes[j].url)
               if(clone[i]==volumes[j].url){
                   name.push(volumes[j].name)
               }
           }
        }
        if(item[0].clone_set.length==0){
            this.props.onOk({
                'clone_name': this.props.form.getFieldsValue().clone_name
            }) 
        }else{
            console.log(name)
            for(let i=0;i<name.length;i++){
                console.log(name[i],this.props.form.getFieldsValue().clone_name)
                if(name[i]==this.props.form.getFieldsValue().clone_name){
                    Modal.warning({
                        title: 'CDP系统提示！',
                        content: '克隆名称已被使用，请重新填写。',
                    })
                    return
                }
                
                
            }
            this.props.onOk({
                'clone_name': this.props.form.getFieldsValue().clone_name
            })
        }
        

        
    }
    checkCloneName(rule, value, callback) {
        var parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格、中文和特殊字符'));
        }
    }
    render() {
         const {item,volumes} =this.props
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        };
       
        return (
            <div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    title="克隆快照" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    /*footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleSubmit.bind(this) }>
                            确 定
                        </Button>

                    ]}*/
                    >
                    <Form layout='horizontal'>
                        <FormItem label="克隆名称"  {...formItemLayout}>
                            <Input {...getFieldProps('clone_name', {rules:[{ validator: this.checkCloneName.bind(this) }]})} type="text" placeholder="请输入名称"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CloneSnapshot.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            clone_name: {name: 'clone_name'}
        }
    }
})(CloneSnapshot);