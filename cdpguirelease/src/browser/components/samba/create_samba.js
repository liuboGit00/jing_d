import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message } from 'antd';
import {close_filersync,} from '../../actions/filersyncaction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class CreateFileclones extends Component {
    handleSubmit() {
    console.log(this.props.form.getFieldsValue().volume)
        this.props.form.validateFields((err,value)=>{
            if(err){
                console.log(err)
            }else{
                this.props.onOk({
                    'name':this.props.form.getFieldsValue().name,
                    'path':this.props.form.getFieldsValue().path,
                    'available':this.props.form.getFieldsValue().available,
                    'browseable':this.props.form.getFieldsValue().browseable,
                    'guest_ok':this.props.form.getFieldsValue().guest_ok,
                    'writeable':this.props.form.getFieldsValue().writeable,
                    'comment':this.props.form.getFieldsValue().comment,
                    'volume':this.props.form.getFieldsValue().volume,
                })
            }
        })
        
    }

    checkSambaName(rule, value, callback) {
        const parent=/^[A-Za-z0-9]+$/;
        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文以及特殊字符'));
        }
        const {samba} = this.props;
            // console.log(samba)

        if(value != undefined){
            for(let i=0;i<samba.length;i++){

                if(value === samba[i].name){
                    message.error('名称已被使用')
                }
            }
        }
    }
    render() {
        const { getFieldProps} = this.props.form;
        const {volumes} = this.props;
        

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };

        var arr=[];
        // console.log(selectedFileclones)

        if(volumes!=''){
            for(let i=0;i<volumes.length;i++){
                if(volumes[i].native.type.model == 'zfs'){
                    arr.push(<Option key={i} value={volumes[i].url}>{volumes[i].name}</Option>)
                }
            }
        }

        // if(echo !='echo'){
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        width={570}
                        visible={this.props.visible}
                        title="增加网络共享" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                        >
                        <Form layout='horizontal'>
                           <FormItem label="名字"  {...formItemLayout}>
                                <Input {...getFieldProps('name',{rules:[{max:25,message:'名字不能超过25个字符'},{ validator: this.checkSambaName.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="目录"  {...formItemLayout}>
                                <Input {...getFieldProps('path',{}) } />
                            </FormItem>
                            <FormItem label="卷名"  {...formItemLayout}>
                                <Select {...getFieldProps('volume', {}) } >
                                    {arr}
                                </Select>
                            </FormItem>
                            <FormItem label="注释"  {...formItemLayout}>
                                <Input {...getFieldProps('comment',{}) } />
                            </FormItem>
                            <FormItem label="是否可用"  {...formItemLayout}>
                                <Select  {...getFieldProps('available', {initialValue:'true'}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="是否可写"  {...formItemLayout}>
                                <Select {...getFieldProps('writeable', {initialValue:'true'}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="是否可浏览"  {...formItemLayout}>
                                <Select {...getFieldProps('browseable', {initialValue:'true'}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem><FormItem label="游客是否可用"  {...formItemLayout}>
                                <Select {...getFieldProps('guest_ok', {initialValue:'false'}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                            


                                
                           
                        </Form>

                    </Modal>
                </div>
            );
        // }


    }
}

CreateFileclones.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            path :{name:'path'},
            available:{name:'available'},
            browseable:{name:'browseable'},
            guest_ok:{name:'guest_ok'},
            writeable:{name:'writeable'},
            comment:{name:'comment'},
            volume:{name:'volume'},





        }
    }
})(CreateFileclones);