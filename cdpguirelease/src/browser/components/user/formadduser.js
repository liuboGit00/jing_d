/**
 * Created by tanglinhai on 2016/9/2.
 */
import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber, Row, Col,AutoComplete} from 'antd';
import Loading from '../common/loading'
import {receive_addOrUpdate_user_form, receive_user_form_state} from '../../actions/useractions'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
import classNames from 'classnames';
const Option = AutoComplete.Option;
function noop() {
    return false;
}

class FormAddUser extends Component{
    constructor(props){
        super(props);
        //this.volumeTypeChangeHandle = this.volumeTypeChangeHandle.bind(this)
        this.checkUsernameExist = this.checkUsernameExist.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.getPassStrenth = this.getPassStrenth.bind(this)
        this.renderPassStrengthBar = this.renderPassStrengthBar.bind(this)
        this.checkPass = this.checkPass.bind(this)
        this.checkPass2 = this.checkPass2.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.usernameChangeHandle = this.usernameChangeHandle.bind(this)
        this.passwordChangeHandle = this.passwordChangeHandle.bind(this)
        this.rePasswdChangeHandle = this.rePasswdChangeHandle.bind(this)
        this.emailChangeHandle = this.emailChangeHandle.bind(this)
        this.firstNameChangeHandle = this.firstNameChangeHandle.bind(this)
        this.lastNameChangeHandle = this.lastNameChangeHandle.bind(this)
        this.isActiveChangeHandle = this.isActiveChangeHandle.bind(this)
        this.isStaffChangeHandle = this.isStaffChangeHandle.bind(this)
        this.isSupperChangeHandle = this.isSupperChangeHandle.bind(this)
        this.handleFieldCommon = this.handleFieldCommon.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            result: [],
        }

    }

//----------------------------------------------change handle function start--------------------------------------------
    usernameChangeHandle(e){
        this.handleFieldCommon('username', e.target.value);
    }
    passwordChangeHandle(e){
        this.handleFieldCommon('password', e.target.value);
    }
    rePasswdChangeHandle(e){
        this.handleFieldCommon('rePasswd', e.target.value);
    }
    emailChangeHandle(e){
        this.handleFieldCommon('email', e);
    }
    firstNameChangeHandle(e){
        this.handleFieldCommon('first_name', e.target.value);
    }
    lastNameChangeHandle(e){
        this.handleFieldCommon('last_name', e.target.value);
    }
    isActiveChangeHandle(e){
        this.handleFieldCommon('is_active', e.target.value);
    }
    isStaffChangeHandle(e){
        this.handleFieldCommon('is_staff', e.target.value);
    }
    isSupperChangeHandle(e){
        this.handleFieldCommon('is_superuser', e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }
//----------------------------------------------change handle function end----------------------------------------------

//----------------------------------------------my function start----------------------------------------------------
    handleFieldCommon(fieldName, newValue){
        const values = this.props.form.getFieldsValue();
        values[fieldName] = newValue;
        this.props.form.setFieldsValue(values);
        this.props.form.validateFields([fieldName], (errors, values) => {
            const res = {};
            if (errors) {
                res[fieldName+'ValidateStatus'] = 'error';
                this.props.dispatch(receive_user_form_state(Object.assign(this.props.addUserFormState, res)))
            }else{
                res[fieldName+'ValidateStatus'] = 'success';
                this.props.dispatch(receive_user_form_state(Object.assign(this.props.addUserFormState, res)))
            }
        });
        const temp = {};
        temp[fieldName] = newValue;
        this.props.dispatch(receive_addOrUpdate_user_form(Object.assign(this.props.addUserForm, temp)))
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
    getPassStrenth(value, type) {
        if (value) {
            let strength;
            // 密码强度的校验规则自定义，这里只是做个简单的示例
            if (value.length < 6) {
                strength = 'L';
            } else if (value.length <= 9) {
                strength = 'M';
            } else {
                strength = 'H';
            }
            if (type === 'password') {
                this.props.dispatch(receive_user_form_state(Object.assign(this.props.addUserFormState,{ passBarShow: true, passStrength: strength })))
            } else {
                this.props.dispatch(receive_user_form_state(Object.assign(this.props.addUserFormState,{ rePassBarShow: true, rePassStrength: strength })))
            }
        } else {
            if (type === 'password') {
                this.props.dispatch(receive_user_form_state(Object.assign(this.props.addUserFormState,{ passBarShow: false })))
            } else {
                this.props.dispatch(receive_user_form_state(Object.assign(this.props.addUserFormState,{ rePassBarShow: false })))
            }
        }
    }
    renderPassStrengthBar(type) {
        const strength = type === 'password' ? this.props.addUserFormState.passStrength : this.props.addUserFormState.rePassStrength;
        const classSet = classNames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': strength === 'L',
            'ant-pwd-strength-medium': strength === 'M',
            'ant-pwd-strength-high': strength === 'H',
        });
        const level = {
            L: '低',
            M: '中',
            H: '高',
        };

        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
                    <span className="ant-form-text">
            {level[strength]}
          </span>
                </ul>
            </div>
        );
    }
//----------------------------------------------my function end----------------------------------------------

//----------------------------------------------check function start----------------------------------------------------
    checkPass(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'password');

        if (form.getFieldValue('password')) {
            form.validateFields(['rePasswd'], { force: true });
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'rePasswd');
        if (value && value !== form.getFieldValue('password')) {
            callback(new Error('两次输入密码不一致！'));
        } else {
            callback();
        }
    }
    checkUsernameExist(rule, value, callback) {
        console.log(this.props.items)
        const name = this.props.items
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                for(let i=0;i<name.length;i++){
                    if (value === name[i].username) {
                        callback([new Error('抱歉，该名称已被占用。')]);
                    } else {
                        callback();
                    }
                }
                
            }, 400);
        }
        var reg=/^([A-Za-z]|[0-9]|[A-Za-z0-9]){4,30}$/;
        if(!reg.test(value)) 
        { 
        callback([new Error('用户名必须由4-30个英文字母和数字或英文字母或数字的字符串组成！。')]);
        } 
    }
    handleSearch = (value) => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
          result = [];
        } else {
          result = ['qq.com','gmail.com','163.com','yahoo.com','msn.com','hotmail.com','aol.com','ask.com','live.com','0355.net','163.net','263.net','3721.net','yeah'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    }
//----------------------------------------------check function end------------------------------------------------------

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const idProps = getFieldProps('id', {
            initialValue: this.props.addUserForm.id
        });
        const usernameProps = getFieldProps('username', {
            onChange: this.usernameChangeHandle,
            //onBlur: this.showFiledLastestState.bind(this, 'username', 'usernameValidateStatus'),
            rules: [
                {
                    required: true,
                    min: 4,
                    message: '登入名至少为 4 个字符'
                },
                { validator: this.checkUsernameExist },
            ]
        });
        let password = null;
        let rePasswd = null;
        if(this.props.winstate.winType == 'add'){
            const passwordProps = getFieldProps('password', {
                onChange: this.passwordChangeHandle,
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        min: 5,
                        message: '请填写密码'
                    },
                    { validator: this.checkPass },
                ]
            });
            password = <Row>
                <Col span="16">
                    <FormItem {...formItemLayout} label="密码" hasFeedback validateStatus={this.props.addUserFormState.passwordValidateStatus} labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
                        <Input {...passwordProps} type="password" autoComplete="off" value={this.props.addUserForm.password}
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        />
                    </FormItem>
                </Col>
                <Col span="6">
                    {this.props.addUserFormState.passBarShow ? this.renderPassStrengthBar('password') : null}
                </Col>
            </Row>

            const rePasswdProps = getFieldProps('rePasswd', {
                onChange: this.rePasswdChangeHandle,
                rules: [{
                    required: true,
                    whitespace: true,
                    message: '请再次输入密码',
                }, {
                    validator: this.checkPass2,
                }],
            });

            rePasswd = <Row>
                <Col span="16">
                    <FormItem {...formItemLayout} label="确认密码" hasFeedback validateStatus={this.props.addUserFormState.rePasswdValidateStatus} labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
                        <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        />
                    </FormItem>
                </Col>
                <Col span="6">
                    {this.props.addUserFormState.rePassBarShow ? this.renderPassStrengthBar('rePasswd') : null}
                </Col>
            </Row>
        }



        const emailProps = getFieldProps('email', {
            onChange: this.emailChangeHandle,
            validate: [{
                rules: [
                    { type: 'email',required: true,message: '请输入正确的邮箱地址' },
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const firstNameProps = getFieldProps('first_name', {
            onChange: this.firstNameChangeHandle,
            rules: [
                {
                    required: true,
                    min: 1,
                    message: '姓氏至少为 1 个字符'
                }
            ]
        });
        const lastNameProps = getFieldProps('last_name', {
            onChange: this.lastNameChangeHandle,
            rules: [
                {
                    required: true,
                    min: 1,
                    message: '姓氏至少为 1 个字符'
                }
            ]
        });
        const isActiveProps = getFieldProps('is_active', {
            onChange: this.isActiveChangeHandle
        });
        const isStaffProps = getFieldProps('is_staff', {
            onChange: this.isStaffChangeHandle
        });
        const isSupperProps = getFieldProps('is_superuser', {
            onChange: this.isSupperChangeHandle
        });
        const { result } = this.state;
        const children = result.map((email) => {
            return <Option key={email}>{email}</Option>;
        });

        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit} action="/aaaa" id="addPoolVolumeForm">
                <Input type="hidden" {...idProps} value={this.props.addUserForm.id}/>

                <FormItem {...formItemLayout} label="账户名" required="true" hasFeedback validateStatus={this.props.addUserFormState.usernameValidateStatus} help={this.props.form.isFieldValidating('username') ? '校验中...' : (this.props.form.getFieldError('username') || []).join(', ')}>
                    <Input type="text" className="cdp_input" {...usernameProps} placeholder="请输入账户名" value={this.props.addUserForm.username}/>
                </FormItem>

                {password}
                {rePasswd}
                <FormItem {...formItemLayout} label="邮件" required="true" hasFeedback validateStatus={this.props.addUserFormState.emailValidateStatus} help={this.props.form.isFieldValidating('email') ? '校验中...' : (this.props.form.getFieldError('email') || []).join(', ')}>
                    <AutoComplete

                        onSearch={this.handleSearch}
                        className="cdp_input" 
                        {...emailProps} 
                        placeholder="请输入邮件" 
                        value={this.props.addUserForm.email}
                    >
                    {children}
                    </AutoComplete>
                </FormItem>
                <FormItem {...formItemLayout} label="姓" required="true" hasFeedback validateStatus={this.props.addUserFormState.first_nameValidateStatus} help={this.props.form.isFieldValidating('first_name') ? '校验中...' : (this.props.form.getFieldError('first_name') || []).join(', ')}>
                    <Input type="text" className="cdp_input" {...firstNameProps} placeholder="请输入姓" value={this.props.addUserForm.first_name}/>
                </FormItem>
                <FormItem {...formItemLayout} label="名字" required="true" hasFeedback validateStatus={this.props.addUserFormState.last_nameValidateStatus} help={this.props.form.isFieldValidating('last_name') ? '校验中...' : (this.props.form.getFieldError('last_name') || []).join(', ')}>
                    <Input type="text" className="cdp_input" {...lastNameProps} placeholder="请输入名字" value={this.props.addUserForm.last_name}/>
                </FormItem>
                <FormItem label="是否激活" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} required="true">
                    <RadioGroup value={this.props.addUserForm.is_active} {...isActiveProps}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否员工" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} required="true">
                    <RadioGroup value={this.props.addUserForm.is_staff} {...isStaffProps}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否管理员" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} required="true">
                    <RadioGroup value={this.props.addUserForm.is_superuser} {...isSupperProps}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            "id": {name: 'id',value:props.addUserForm.id},
            "username": {name: 'username',value:props.addUserForm.username},
            "password": {name: 'password',value:props.addUserForm.password},
            "rePasswd": {name: 'rePasswd',value:props.addUserForm.rePasswd},
            "email": {name: 'email',value:props.addUserForm.email},
            "first_name": {name: 'first_name',value:props.addUserForm.first_name},
            "last_name": {name: 'last_name',value:props.addUserForm.last_name},
            "is_active": {name: 'is_active',value:props.addUserForm.is_active},
            "is_staff": {name: 'is_staff',value:props.addUserForm.is_staff},
            "is_superuser": {name: 'is_superuser',value:props.addUserForm.is_superuser}
        }
    }
})(FormAddUser);