/**
 * Created by tanglinhai on 2016/9/1.
 */
import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber} from 'antd';
import Loading from '../common/loading'
import {receive_addOrUpdate_volume_form} from '../../actions/poolsettingactions'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

class FormAddVolume extends Component{
    constructor(props){
        super(props);
        //this.volumeTypeChangeHandle = this.volumeTypeChangeHandle.bind(this)
        this.checkVolumeNameExist = this.checkVolumeNameExist.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkVolumeSize = this.checkVolumeSize.bind(this)
        this.volumeNameChangeHandle = this.volumeNameChangeHandle.bind(this)
        this.volumeSizeChangeHandle = this.volumeSizeChangeHandle.bind(this)
        this.volumeTypeChangeHandle = this.volumeTypeChangeHandle.bind(this)
    }
    getItemById(id){
        const items = this.props.items;

        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    volumeTypeChangeHandle(e){
        this.props.dispatch(receive_addOrUpdate_volume_form({
            volumeId: this.props.addVolumeForm.volumeId,
            volumeName: this.props.addVolumeForm.volumeName,
            volumeSize: this.props.addVolumeForm.volumeSize,
            volumeType: e.target.value
        }))
    }
    volumeSizeChangeHandle(size){
        this.props.dispatch(receive_addOrUpdate_volume_form({
            volumeId: this.props.addVolumeForm.volumeId,
            volumeName: this.props.addVolumeForm.volumeName,
            volumeSize: size,
            volumeType: this.props.addVolumeForm.volumeType
        }))
    }
    volumeNameChangeHandle(e){
        this.props.dispatch(receive_addOrUpdate_volume_form({
            volumeId: this.props.addVolumeForm.volumeId,
            volumeName: e.target.value,
            volumeSize: this.props.addVolumeForm.volumeSize,
            volumeType: this.props.addVolumeForm.volumeType
        }))
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }
    checkVolumeNameExist(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该名称已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }
    checkVolumeSize(rule, value, callback) {
        if(isNaN(value)){
            callback(new Error('请输入数字！'));
        }else{
            callback();
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const volumeIdProps = getFieldProps('volumeId', {
            initialValue: this.props.addVolumeForm.volumeId
        });
        const volumeNameProps = getFieldProps('volumeName', {
            onChange: this.volumeNameChangeHandle,
            rules: [
                {
                    required: true,
                     message: '请填写卷名'
                },
                { validator: this.checkVolumeNameExist },
            ]
        });
        const volumeSizeProps = getFieldProps('volumeSize', {
            onChange: this.volumeSizeChangeHandle,
            rules: [
                {
                    type: 'number',
                    required: true,
                    message: '请填写存储池大小！'
                },
                {
                    type: 'number',
                    validator: this.checkVolumeSize
                },
            ]
        });
        const volumeTypeProps = getFieldProps('volumeType', {});
        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit} action="/aaaa" id="addPoolVolumeForm">
                <FormItem {...formItemLayout} label="卷名称" required="true">
                    <Input type="text" className="cdp_input" {...volumeNameProps} placeholder="请输入名称" value={this.props.addVolumeForm.volumeName}/>
                    <Input type="hidden" {...volumeIdProps} value={this.props.addVolumeForm.volumeId}/>
                </FormItem>
                <FormItem {...formItemLayout} label="卷空间大小" required="true">
                    <InputNumber placeholder="请输入空间大小" /*min={1} max={10}*/ step={0.000001} className="cdp_input" {...volumeSizeProps} value={this.props.addVolumeForm.volumeSize}/><span style={{paddingLeft:"6px"}}>MB</span>
                </FormItem>
                <FormItem
                    label="卷类型"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    required="true"
                >
                    <RadioGroup value={this.props.addVolumeForm.volumeType} {...volumeTypeProps} onChange={this.volumeTypeChangeHandle}>
                        <Radio value="zvol" disabled={this.props.winstate.winType == 'update'}>块设备卷</Radio>
                        <Radio value="zfs" disabled={this.props.winstate.winType == 'update'}>文件卷</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            volumeId: {name: 'volumeId',value:props.addVolumeForm.volumeId},
            volumeName: {name: 'volumeName',value:props.addVolumeForm.volumeName},
            volumeSize: {name: 'volumeSize',value:props.addVolumeForm.volumeSize},
            volumeType: {name: 'volumeType',value:props.addVolumeForm.volumeType}
        }
    }
})(FormAddVolume);