import React, {Component, PropTypes} from 'react';
import {Modal,Form,Button,Input,message} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;

class CreateSnapshot extends Component {
    handleSubmit() {
        const {snapshots} = this.props;
        if(snapshots.length>0){
            for(let i=0;i<snapshots.length;i++){
                if(this.props.form.getFieldsValue().snap_name == snapshots[i].name){
                    return message.error('名字已被使用')
                }
            }
            this.props.onOk({
                'snap_name': this.props.form.getFieldsValue().snap_name
            })

        }else{
            this.props.onOk({
                'snap_name': this.props.form.getFieldsValue().snap_name
            })
        }
        
        
    }
    checkSnapName(rule, value, callback) {
        var parent=/^[A-Za-z0-9_]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格、中文和非法字符'));
        }
        
    }

    render() {

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
                    title="创建快照" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    /*footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleSubmit.bind(this) }>
                            确 定
                        </Button>

                    ]}*/
                    >
                    <Form layout='horizontal'>
                        <FormItem label="快照名称"  {...formItemLayout}>
                            <Input {...getFieldProps('snap_name', {rules:[{ validator: this.checkSnapName.bind(this) }]})} type="text" placeholder="请输入名称"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateSnapshot.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            snap_name: {name: 'snap_name'}
        }
    }
})(CreateSnapshot);