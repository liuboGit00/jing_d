import React, {Component, PropTypes} from 'react';
import {Modal, Form, Select, Button,Input} from 'antd'
import {echo_create_volume_modal,close_create_volume_modal} from '../../actions/actions'
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class StartLogdev extends Component {
   /* constructor(props){
        super(props)
        this.handle_create_volume = this.handle_create_volume.bind(this)
        this.handle_close_create_volume = this.handle_close_create_volume.bind(this)
        this.submit_create_volume = this.submit_create_volume.bind(this)
    }
    handle_create_volume(){
        this.props.dispatch(echo_create_volume_modal())
    }
    handle_close_create_volume(){
        this.props.dispatch(close_create_volume_modal())
    }
    submit_create_volume(){

    }*/
    constructor(props) {
        super(props);
        this.checkVolumeStatus = this.checkVolumeStatus.bind(this);
    }
    
    handleSubmit() {
        this.props.onOk(
            {
                'logdev_name': this.props.form.getFieldsValue().logdev_name,
                'logvol_id': this.props.form.getFieldsValue().logvol_id,
            })
    }
    checkVolumeStatus(rule, value, callback) {
        const {volumes} = this.props
        var volume = volumes.find(item=>(item.id==value))
        if(volume.status.status==''|| volume.native.type.model=='zfs'){
            callback(new Error('该卷状态未知不可选择！'));
        }else{
            callback();
        }
    }
    render() {
        const {volumes,pools} = this.props
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
                    title="开启日志" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}>
                    <Form layout='horizontal'>
                        <FormItem label="日志名称"  {...formItemLayout}>
                            <Input {...getFieldProps('logdev_name', {}) } type="text" id='logdev_name' />
                        </FormItem>
                        <FormItem label="选择卷"  {...formItemLayout}>
                            <Select {...getFieldProps('logvol_id', {rules:[{validator: this.checkVolumeStatus}]}) } >
                                {volumes.map(volume => <Option  key={volume.name} value={`${volume.id}`}>{volume.name}</Option>) }
                            </Select>
                            <Button type='ghost' icon='link' className="cdp_button_left" onClick={this.props.onCreate}>新建卷</Button>
                          
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

StartLogdev.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            logdev_name: {name: 'logdev_name'},
            logvol_id: {name: 'logdev_id'},
        }
    }
})(StartLogdev);

 /* <CreateVolume ref='createvolume' pools={pools.items} selectpool={pools.selectpool} visible={volumes.create_volume_modal} onOk={this.submit_create_volume}
                                onCancel={this.handle_close_volume}/>*/