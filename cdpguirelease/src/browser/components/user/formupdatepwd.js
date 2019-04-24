/*
 * Created by tanglinhai on 2016/9/5.
 */
import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber, Row, Col} from 'antd';
import {check_pwd} from '../../actions/useractions'
const FormItem = Form.Item;
import classNames from 'classnames';
var strength,strength2;
function noop() {
    return false;
}

class FormUpdatePwd extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getPassStrenth= this.getPassStrenth.bind(this)
        this.renderPassStrengthBar= this.renderPassStrengthBar.bind(this)
        this.checkPass= this.checkPass.bind(this)
        this.checkPass2= this.checkPass2.bind(this)



    }

//----------------------------------------------change handle function start--------------------------------------------
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }
//----------------------------------------------change handle function end----------------------------------------------

//----------------------------------------------my function start----------------------------------------------------

    getPassStrenth(value, type) {
        const reg = /[A-Za-z]/
        const reg2 = /[0-9]/
        if (type='oldPwd'&&value) {
            if (value.length < 6) {
                strength = 'L';
            }else if(value.length>=9&&reg.test(value)&&reg2.test(value)) {
                strength = 'H';
            }else{
                strength = 'M';
            }
            
        }else{
            if (value.length < 6) {
                strength2 = 'L';
            }else if(value.length>=9&&reg.test(value)&&reg2.test(value)) {
                strength2 = 'H';
            }else{
                strength2 = 'M';
            }
        }
        

    }
    renderPassStrengthBar(type) {
        let str=type==='oldPwd'?strength:strength2
        const classSet = classNames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': str === 'L',
            'ant-pwd-strength-medium': str === 'M',
            'ant-pwd-strength-high': str === 'H',
        });
        const level = {
            L: '低',
            M: '中',
            H: '高',
        };
        // console.log(classSet)
        // console.log(type)

        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
                    <span className="ant-form-text">
                        {level[str]}
                    </span>
                </ul>
            </div>
        );
    }
//----------------------------------------------my function end----------------------------------------------

//----------------------------------------------check function start----------------------------------------------------
  checkPass(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'oldPwd');
        callback();
    }

    checkPass2(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'newPwd');
        if (value && value !== form.getFieldValue('oldPwd')) {
            callback(new Error('两次输入密码不一致！'));
        } else {
            callback();
        }
    }
//---------------------------------------------check function end------------------------------------------------------

    render() {

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const passwordProps = getFieldProps('oldPwd', {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        min: 5,
                        message: '请填写新密码，并且新密码不能小于5位数!'
                    },
                    { validator: this.checkPass },
                ]
            });
        const rePasswdProps = getFieldProps('newPwd', {
                rules: [{
                    required: true,
                    whitespace: true,
                    message: '请再次输入密码',
                }, {
                    validator: this.checkPass2,
                }],
            });
        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit} action="/aaaa" id="updatePwdForm">
                <Row>
                    <Col span="16">
                        <FormItem {...formItemLayout} label="密码" hasFeedback  labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
                            <Input {...passwordProps} type="password" autoComplete="off" 
                                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        {this.renderPassStrengthBar('oldPwd')}
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                        <FormItem {...formItemLayout} label="确认密码" hasFeedback  labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
                            <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                        </FormItem>
                    </Col>
                    <Col span="6">
                      {this.renderPassStrengthBar('newPwd')}
                    </Col>
                </Row>
            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            "oldPwd": {name: 'oldPwd'},
            "newPwd": {name: 'newPwd'}
        }
    }
})(FormUpdatePwd);

/* <FormItem {...formItemLayout} label="新密码" hasFeedback>
                    <Input {...newPwdProps} type="password" autoComplete="off" onBlur={this.handlePasswordBlur.bind(this.props.form.getFieldsValue().newPwd)}
                           onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="确认新密码" hasFeedback>
                    <Input {...confirmPwdProps} type="password" autoComplete="off"
                           onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>*/