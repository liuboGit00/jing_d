/**
 * Created by tanglinhai on 2016/8/23.
 */
import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber} from 'antd';
import Loading from '../common/loading'
import {receive_add_pool_form} from '../../actions/poolactions'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

class FormAddPool extends Component{
    constructor(props){
        super(props);
        //this.getItemById = this.getItemById.bind(this)
        this.checkboxChangeHandle = this.checkboxChangeHandle.bind(this)
        this.checkPoolnameExist = this.checkPoolnameExist.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkDiskCount = this.checkDiskCount.bind(this)
        this.checkPooltype = this.checkPooltype.bind(this)
        this.pooltypeChangeHandle = this.pooltypeChangeHandle.bind(this)
        this.poolnameChangeHandle = this.poolnameChangeHandle.bind(this)
        /*let disksDefault = [];

        if(this.props.poolSelectedDisks)
            for(let i=0;i<this.props.poolSelectedDisks.length;i++){
                disksDefault.push(this.props.poolSelectedDisks[i].id);
            }
        this.state = {
            checkboxGroupDefault: disksDefault
        }*/
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
    checkboxChangeHandle(checkedValues){
/*
        let pool = null;
        if(this.props.winstate.winType == 'add') {
            pool = {
                id: this.props.addPoolForm.pool_id,
                name: this.props.addPoolForm.pool_name,
                usage: {
                    size: this.props.addPoolForm.pool_size
                }
            };
        }else
            pool = this.getItemById(this.props.selectedRowKeys[0]);
*/
        this.props.dispatch(receive_add_pool_form({
            pool_id: this.props.addPoolForm.pool_id,
            pool_name: this.props.addPoolForm.pool_name,
            pool_type: this.props.addPoolForm.pool_type,
            pool_disks: checkedValues
        }))
    }
    pooltypeChangeHandle(e){
        console.log(e.target.value)
        this.props.dispatch(receive_add_pool_form({
            pool_id: this.props.addPoolForm.pool_id,
            pool_name: this.props.addPoolForm.pool_name,
            pool_type:e.target.value,
            pool_disks: this.props.addPoolForm.pool_disks
        }))
    }
    poolnameChangeHandle(e){
        this.props.dispatch(receive_add_pool_form({
            pool_id: this.props.addPoolForm.pool_id,
            pool_name: e.target.value,
            pool_type: this.props.addPoolForm.pool_type,
            pool_disks: this.props.addPoolForm.pool_disks
        }))
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }

    checkPoolnameExist(rule, value, callback) {
        const {items} = this.props

        if(this.props.winstate && this.props.winstate.winType == 'add'){
            for(var i=0;i<items.length;i++){
                console.log(items[i].name)
    
                if(items[i].name == value){
                    callback(new Error('抱歉，该名称已被占用'))
                }else{callback()}
            }
        }else{
            for(var i=0;i<items.length;i++){
                // console.log(items[i].name)
                if(this.props.pools.selectedPools[0].name!=value&&items[i].name == value){
                    callback(new Error('抱歉，该名称已被占用'))
                }else{callback()}
            }
        }
        var parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('请输入数字和英文字母区分大小写'));
        }

       
    }
    
    checkDiskCount(rule, value, callback) {
        if (this.props.addPoolForm.pool_type == 'raid0') {
             callback();
        }else{
            if(value && value.length > 1){
                callback();
            }else{
                callback(new Error('至少选择两个或两个以上的磁盘！'));
            }
        }
        
    }
    checkPooltype(rule, value, callback) {
        // if(isNaN(value)){
        //     callback(new Error('请输入数字！'));
        // }else{
        //     callback();
        // }
    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        };
        //let previousPool = this.props.winstate.winType == 'update' && this.props.selectedRowKeys.length > 0 ? this.getItemById(this.props.selectedRowKeys[0]) : null;

        const poolidProps = getFieldProps('pool_id', {
            //initialValue: previousPool ? previousPool.id : ''
            initialValue: this.props.addPoolForm.pool_id
        });
        const poolnameProps = getFieldProps('pool_name', {
           // initialValue: previousPool ? previousPool.name : '',
            //value: this.props.addPoolForm.pool_name,
            onChange: this.poolnameChangeHandle,
            rules: [
                {
                    required: true,
                    message: '请填写存储池名称'
                },
                { validator: this.checkPoolnameExist }
            ]
        });
            
        const pooltypeProps = getFieldProps('pool_type', {
            //initialValue: previousPool ? previousPool.usage.type : '',
            //value: this.props.addPoolForm.pool_type,
            onChange: this.pooltypeChangeHandle,
            rules: [                
                {required: true,}
            ]
        });


        const diskscheckboxs = [];
        const ds = this.props.disks //? this.props.disks : [];
        for(let i=0;i<ds.length;i++){
            let d = ds[i];
            if (d.upper == null) {
                diskscheckboxs.push({
                    value: d.id,
                    label: d.name + "            " + d.size.size_text,
                    className: 'ant-checkbox-vertical',
                    disabled:false
                });
            }else{
                diskscheckboxs.push({
                    value: d.id,
                    label: d.name + "            " + d.size.size_text,
                    className: 'ant-checkbox-vertical',
                    disabled:true
                });
            }
        }
        const disksProps = getFieldProps('pool_disks', {
            initialValue: this.props.addPoolForm.pool_disks,
            valuePropName: 'checked',
            rules: [{
                type: 'array',
                validator: this.checkDiskCount
            }]
        });
        console.log(this.props.pools.winstate.winType)
        // <FormItem {...formItemLayout} label="分配空间大小" required="true">
        //     <InputNumber ref="form_pool_size" placeholder="请输入空间大小" /*min={1} max={10}*/ step={0.000001} className="cdp_input" {...poolSizeProps} value={this.props.addPoolForm.pool_size}/><span style={{ paddingLeft: "6px" }}>G</span>
        // </FormItem>
        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit} action="/aaaa" id="addPoolForm">
                <FormItem {...formItemLayout} label="存储池名称" required="true">
                    <Input type="text" disabled={this.props.pools.winstate.winType=='update'?true:false} className="cdp_input" {...poolnameProps} placeholder="请输入名称" ref="form_pool_name" value={this.props.addPoolForm.pool_name}/>
                    <Input type="hidden" {...poolidProps} ref="form_pool_id" value={this.props.addPoolForm.pool_id}/>
                </FormItem>
                <FormItem {...formItemLayout} label="存储池类型" required="true">
                    <select ref="form_pool_type" className="addPoolForm_pooltype" {...pooltypeProps} value={this.props.addPoolForm.pool_type}>
                        <option key="请选择类型"> 请选择类型</option>
                        <option key="raidz">raidz</option>
                        <option key="raid0">raid0</option>
                    </select>
                </FormItem>
                <FormItem
                    label="选择空间来源"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    required="true"
                >
                    <CheckboxGroup options={diskscheckboxs} {...disksProps} onChange={this.checkboxChangeHandle} value={this.props.addPoolForm.pool_disks} />
                    <Loading loading={this.props.fetchingPoolSelectedDisks}/>
                </FormItem>
                

            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            pool_id: {name: 'pool_id',value:props.addPoolForm.pool_id},
            pool_name: {name: 'pool_name',value:props.addPoolForm.pool_name},
            pool_type: {name: 'pool_type',value:props.addPoolForm.pool_type},
            pool_disks: {name: 'pool_disks',value:props.addPoolForm.pool_disks}
        }
    }
})(FormAddPool);