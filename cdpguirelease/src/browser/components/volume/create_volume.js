import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option
// import {loading_modal}

class CreateVolume extends Component {
    handleSubmit() {
        const {pools}=this.props
        for(let i=0;i<pools.length;i++){
            if(this.props.form.getFieldsValue().vol_pool == pools[i].url){
                if(pools[i].usage.size>=this.props.form.getFieldsValue().vol_size){
                    this.props.form.validateFields((err,value)=>{
                        if(!err){
                            console.log(err,value)
                            this.props.onOk({
                                'vol_name': this.props.form.getFieldsValue().vol_name,
                                'vol_size': this.props.form.getFieldsValue().vol_size.slice(-1).toUpperCase()=='G'?parseInt(this.props.form.getFieldsValue().vol_size)*1024:this.props.form.getFieldsValue().vol_size.slice(-1).toUpperCase()=='K'?parseInt(this.props.form.getFieldsValue().vol_size)/1024:this.props.form.getFieldsValue().vol_size.slice(-1).toUpperCase()=='T'?parseInt(this.props.form.getFieldsValue().vol_size)*1024*1024:this.props.form.getFieldsValue().vol_size ,
                                'vol_pool': this.props.form.getFieldsValue().vol_pool,
                                'vol_type': this.props.form.getFieldsValue().vol_type,
                                'vol_thin': this.props.form.getFieldsValue().vol_thin == 'ture' ? 1 : 0,
                                'vol_blocksize': this.props.form.getFieldsValue().vol_blocksize,
                            }) 
                        }
                    })
                     
                }else{
                    if(this.props.form.getFieldsValue().vol_size==undefined){
                        message.error('请填写要创建卷的大小')
                    }else{
                        message.error('卷太大超出容量')
                    }
                    
                }
                return
            }
        }
        this.props.form.validateFields((err,value)=>{
            if(err){
                console.log(err)
            }
        })
    }
    checkVolumeName(rule, value, callback) {
        const parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格、中文和特殊字符'));
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
        const {visible, pools,selectpool,loading} = this.props
        // console.log(loading)
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        const arr=['512','1024','2048','4096','8192','16384','32768'];
        const arr_size=[];
        for(let i=0;i<arr.length;i++){
            arr_size.push(<Option key={i} value={arr[i]}>{arr[i]}</Option>)
        }
        return (
            <div>
                <Modal 
                    closable={false}
                    visible={this.props.visible}
                    title="创建卷" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    confirmLoading={loading}
                    >
                    <Form layout='horizontal' >
                        <FormItem label="卷名"  {...formItemLayout}>
                            <Input {...getFieldProps('vol_name', {rules:[{required:true,message:"请填写卷名"},{ validator: this.checkVolumeName.bind(this) }]}) } type="text" id='vol_name' />
                        </FormItem>
                        <FormItem label="卷大小"  {...formItemLayout}>
                            <Input {...getFieldProps('vol_size', {rules:[{required:true,message:"请填写卷大小"}]}) } type="text" id='vol_size' placeholder="默认为M" />
                        </FormItem>
                        <FormItem label="存储池"  {...formItemLayout}>
                            <Select {...getFieldProps('vol_pool', {rules:[{required:true,message:"请选择存储池"}]}) } >
                                {pools.map(pool => <Option key={pool.id} value={pool.url}>{pool.name}</Option>) }
                            </Select>
                        </FormItem>
                        <FormItem label="卷类型"  {...formItemLayout}>
                            <Select {...getFieldProps('vol_type', {rules:[{required:true,message:"请选择卷类型"}]}) } >
                                <Option key='ZVOL' value="zvol">块设备</Option>
                                <Option key='ZFS' value="zfs">文件系统</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="块大小"  {...formItemLayout}>
                            <Select {...getFieldProps('vol_blocksize', {rules:[{required:true,message:"请选择块大小"}]}) } >
                                {arr_size}
                            </Select>
                        </FormItem>
                        <FormItem label="精简配置"  {...formItemLayout}>
                            <Select {...getFieldProps('vol_thin', {rules:[{required:true,message:"请选择是否精简配置"}]}) } >
                                <Option key='true' value="true">true</Option>
                                <Option key='false' value="false">false</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateVolume.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            vol_name: {name: 'vol_name'},
            vol_size: {name: 'vol_size'},
            vol_pool: {name: 'vol_pool'},
            vol_type: {name: 'vol_type'},
            vol_thin: {name: 'vol_thin'},
            vol_blocksize: {name: 'vol_blocksize'}
        }
    }
})(CreateVolume);