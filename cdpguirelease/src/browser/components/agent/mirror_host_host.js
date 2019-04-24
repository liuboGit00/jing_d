import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option

class CreateHostToHost extends Component {
    handleSubmit() {
        this.props.onOk({
            'source_name':this.props.form.getFieldsValue().source_name,
            'source_volume':this.props.form.getFieldsValue().source_volume,
            'source_metadisk':this.props.form.getFieldsValue().source_metadisk,
            'source_localaddress':parseInt(this.props.form.getFieldsValue().source_localaddress),
            'dest_name':this.props.form.getFieldsValue().dest_name,
            'dest_host':parseInt(this.props.form.getFieldsValue().dest_host),
            'dest_volume':this.props.form.getFieldsValue().dest_volume,
            'dest_volume_path':this.props.form.getFieldsValue().dest_volume_path,
            'dest_localaddress_id':this.props.form.getFieldsValue().dest_localaddress_id,
            'dest_localaddress':this.props.form.getFieldsValue().dest_localaddress,
            'dest_metadisk_id':this.props.form.getFieldsValue().dest_metadisk_id,
            'dest_metadisk_path':this.props.form.getFieldsValue().dest_metadisk_path,
        })
      
    }
    checkAgentnameExist(rule, value, callback) {
        var parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文'));
        }
        const {agents} = this.props
        
        for (var i = 0; i < agents.length; i++) {
            if (agents[i].name == value) {
                callback(new Error('抱歉，该名称已被占用'))
            } else { callback() }
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {hosts,volumes,ipaddress,} =this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const volumeArr=[];
        const ipaddressArr=[];
        const hostArr=[];
        if(volumes){
            for (let i = 0; i < volumes.length; i++) {
                volumeArr.push(<Option key={volumes[i].id+''}>{volumes[i].name}</Option>)
            }; 
        }
        
        if(ipaddress){
            for (let i=0;i<ipaddress.length;i++){
                ipaddressArr.push(<Option key={ipaddress[i].id+''}>{ipaddress[i].address.split('/')[0]}</Option>)
            }
        }
        
        if(hosts){
            for (var i = 0; i < hosts.length; i++) {
                hostArr.push(<Option key={hosts[i].id+''}>{hosts[i].name}</Option>)
            };
        }
        return (
            <div>
                <Modal ref="modal"
                    width={750}
                    visible={this.props.visible}
                    closable={false}
                    title="创建主机端" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form>
                        <div style={{textAlign:'center',paddingBottom:20,fontSize:15,color:'rgba(0,0,0,1.85)'}}>源主机</div>
                        <FormItem label="任务名称:"  {...formItemLayout}> 
                            <Input placeholder="只支持英文或英文数字组合" {...getFieldProps('source_name',{initialValue:this.props.form.getFieldsValue().source_name}) } />
                        </FormItem>
                        <FormItem label="块设备:"  {...formItemLayout}>
                            <Select   {...getFieldProps('source_volume', {}) } >
                                {volumeArr}
                            </Select>
                        </FormItem>
                        <FormItem label="元设备:"  {...formItemLayout}>
                            <Select   {...getFieldProps('source_metadisk', {}) } >
                                {volumeArr}
                            </Select>
                        </FormItem>
                        <FormItem label="IP:"  {...formItemLayout}>
                            <Select   {...getFieldProps('source_localaddress', {}) } >
                                {ipaddressArr}
                            </Select>
                        </FormItem>
                        <div style={{textAlign:'center',paddingBottom:20,fontSize:15,color:'rgba(0,0,0,1.85)'}}>目的主机</div>
                        <FormItem label="任务名称:"  {...formItemLayout}> 
                            <Input placeholder="只支持英文或英文数字组合" {...getFieldProps('dest_name',{initialValue:this.props.form.getFieldsValue().source_name}) } />
                        </FormItem>
                        <FormItem label="主机:"  {...formItemLayout}>
                            <Select  {...getFieldProps('dest_host', {initialValue:this.props.form.getFieldsValue().dest_host}) } >
                                {hostArr}
                            </Select>
                        </FormItem>
                        <FormItem label="块设备ID:"  {...formItemLayout}>
                            <Input  {...getFieldProps('dest_volume', {initialValue:this.props.form.getFieldsValue().dest_volume}) } ></Input>
                        </FormItem>
                        <FormItem label="块设备路径:"  {...formItemLayout}>
                            <Input  {...getFieldProps('dest_volume_path', {initialValue:this.props.form.getFieldsValue().dest_volume_path}) } ></Input>
                        </FormItem>
                        <FormItem label="IP地址ID:"  {...formItemLayout}>
                            <Input  {...getFieldProps('dest_localaddress_id', {initialValue:this.props.form.getFieldsValue().dest_localaddress_id}) } ></Input>
                        </FormItem>
                        <FormItem label="IP地址:"  {...formItemLayout}>
                            <Input  {...getFieldProps('dest_localaddress', {initialValue:this.props.form.getFieldsValue().dest_localaddress}) } ></Input>
                        </FormItem>
                        <FormItem label="元设备ID:"  {...formItemLayout}>
                            <Input  {...getFieldProps('dest_metadisk_id', {initialValue:this.props.form.getFieldsValue().dest_metadisk_id}) } ></Input>
                        </FormItem>
                        <FormItem label="元设备路径:"  {...formItemLayout}>
                            <Input  {...getFieldProps('dest_metadisk_path', {initialValue:this.props.form.getFieldsValue().dest_metadisk_path}) } ></Input>
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
            source_name:{name:'source_name'},
            source_volume:{name:'source_volume'},
            source_metadisk:{name:'source_metadisk'},
            source_localaddress:{name:'source_localaddress'},
            dest_name:{name:'dest_name'},
            dest_host:{name:'dest_host'},
            dest_volume:{name:'dest_volume'},
            dest_volume_path:{name:'dest_volume_path'},
            dest_localaddress_id:{name:'dest_localaddress_id'},
            dest_localaddress:{name:'dest_localaddress'},
            dest_metadisk_id:{name:'dest_metadisk_id'},
            dest_metadisk_path:{name:'dest_metadisk_path'},
        }
    }
})(CreateHostToHost);