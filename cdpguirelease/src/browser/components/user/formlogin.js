/**
 * Created by tanglinhai on 2016/9/5.
 */
import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber, Row, Col} from 'antd';
import Loading from '../common/loading'
import {receive_addOrUpdate_login_form, receive_login_form_state} from '../../actions/loginactions'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
import classNames from 'classnames';

function noop() {
    return false;
}

class FormLogin extends Component{
    constructor(props){
        super(props);
        this.checkUsernameExist = this.checkUsernameExist.bind(this)
        this.checkPass = this.checkPass.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.usernameChangeHandle = this.usernameChangeHandle.bind(this)
        this.passwordChangeHandle = this.passwordChangeHandle.bind(this)
        this.handleFieldCommon = this.handleFieldCommon.bind(this)


    }

//----------------------------------------------change handle function start--------------------------------------------
    usernameChangeHandle(e){
        this.handleFieldCommon('username', e.target.value);
    }
    passwordChangeHandle(e){
        this.handleFieldCommon('password', e.target.value);
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
                this.props.dispatch(receive_login_form_state(Object.assign(this.props.loginFormState, res)))
            }else{
                res[fieldName+'ValidateStatus'] = 'success';
                this.props.dispatch(receive_login_form_state(Object.assign(this.props.loginFormState, res)))
            }
        });
        const temp = {};
        temp[fieldName] = newValue;
        this.props.dispatch(receive_addOrUpdate_login_form(Object.assign(this.props.loginForm, temp)))
    }
//----------------------------------------------my function end----------------------------------------------

//----------------------------------------------check function start----------------------------------------------------
    checkPass(rule, value, callback) {
        const form = this.props.form;
        callback();
    }
    checkUsernameExist(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该名称已被占用。')]);
                } else {
                    callback();
                }
            }, 400);
        }
    }
//----------------------------------------------check function end------------------------------------------------------

    render() {

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const usernameProps = getFieldProps('username', {
            onChange: this.usernameChangeHandle,
            rules: [
                {
                    required: true,
                    min: 3,
                    message: '登入名至少为 3 个字符'
                },
                { validator: this.checkUsernameExist },
            ]
        });
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

        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit} action="/aaaa" id="loginForm">
                <FormItem {...formItemLayout} label="账户名" required="true" hasFeedback validateStatus={this.props.loginFormState.usernameValidateStatus} help={this.props.form.isFieldValidating('username') ? '校验中...' : (this.props.form.getFieldError('username') || []).join(', ')}>
                    <Input type="text" className="cdp_input" {...usernameProps} placeholder="请输入账户名" value={this.props.loginForm.username}/>
                </FormItem>
                <FormItem {...formItemLayout} label="密码" hasFeedback validateStatus={this.props.loginFormState.passwordValidateStatus}>
                    <Input {...passwordProps} type="password" autoComplete="off" value={this.props.loginForm.password}
                           onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>
            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            "username": {name: 'username',value:props.loginForm.username},
            "password": {name: 'password',value:props.loginForm.password}
        }
    }
})(FormLogin);

