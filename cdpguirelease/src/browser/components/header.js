/**
 * Created by tanglinhai on 2016/8/19.
 */
import React, { Component,PropTypes } from 'react'
import auth from '../utils/auth'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink,browserHistory} from 'react-router'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,userspath,username,password} from '../confs/host'
import  {Row, Col, Menu,Icon, Modal, message, Input}  from 'antd'
import FormUpdatePwd from './user/formupdatepwd'
import {update_pwd} from '../actions/useractions'
import API from 'fetch-api';
import htmlUtils from '../utils/htmlutils'

const SubMenu = Menu.SubMenu
class Header extends Component {
    constructor(props){
        super(props);
        this.headMenuHandle = this.headMenuHandle.bind(this);
        this.closeUpdatePwdWin = this.closeUpdatePwdWin.bind(this);
        this.openUpdatePwdWin = this.openUpdatePwdWin.bind(this);
        this.updatePwd = this.updatePwd.bind(this);
        this.getUpdatePwdForm = this.getUpdatePwdForm.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
        this.state = {
            showUpdateForm: false,
            oldPwdValidateStatus: '',
            newPwdValidateStatus: ''
        };
    }
    componentDidMount(){
        if(window.cdp_sys_tips){
            clearInterval(window.cdp_sys_tips);
            window.cdp_sys_tips = null;
        }
        const tipEle = this.refs.cdp_sys_tips;
        setTimeout(function(){
            tipEle.setAttribute('class', 'tips_text show_tips');
        }, 10);
        window.cdp_sys_tips = setInterval(function(){
            const currClass = tipEle.getAttribute('class');
            htmlUtils.setStyle(tipEle, 'transition', 'none');
                tipEle.setAttribute('class', 'tips_text');
                setTimeout(function(){
                    htmlUtils.setStyle(tipEle, 'transition', 'left 30s linear');
                    tipEle.setAttribute('class', 'tips_text show_tips');
                }.bind(this), 10);
        }.bind(this), 35000);
    }
    handleKeyup(e){
        if(e.keyCode == 13){
            Modal.warn({
                title: 'CDP系统提示！',
                content: '快速入口功能正在建设中..........',
            });
            e.target.value = '';
            e.target.blur();
        }
    }
    headMenuHandle(item, key, keyPath){
        if(item.key == 'logout'){
            auth.logout();
        }
        if(item.key == 'updatePwd'){
            this.openUpdatePwdWin();
        }
    }
    closeUpdatePwdWin(){
        this.setState(Object.assign(this.state, {
            showUpdateForm: false
        }));
    }
    openUpdatePwdWin(){
        this.setState(Object.assign(this.state, {
            showUpdateForm: true,
            oldPwdValidateStatus: '',
            newPwdValidateStatus: ''
        }));
    }
    getUpdatePwdForm(){
        return this.refs.formUpdatePwd;
    }
    updatePwd(){
        const form = this.getUpdatePwdForm();
        const {user} = this.props
        form.validateFields((errors, values) => {
            if (errors) {
                console.log('--------------%s------------', JSON.stringify(errors));
                const fields = form.fields;
                setTimeout(function(f, fes){f.setFields(fes);}.bind(this, form, fields), 10);
                const state = {}
                for(var key in errors){
                    if(errors[key].errors && errors[key].errors.length > 0){
                        state[key+'ValidateStatus'] = 'error'
                    }
                }
                this.setState(Object.assign(this.state, state));
            }else{
                update_pwd(form,user, (res)=>{
                    console.log(res)
                    if(res.flag == "success"){
                        message.success("更新密码成功！");
                        this.closeUpdatePwdWin();
                    }else{
                        message.error("更新密码失败！");
                    }
                });
            }
        });
    }
    render () {
        // console.log(this.props.user)
        const modalWin = {
            title: '修改密码',
            width: 700,
            visible: this.state.showUpdateForm,
            onCancel: this.closeUpdatePwdWin,
            onOk: this.updatePwd,
            confirmLoading: this.props.winstate && this.props.winstate.confirmLoading ? true : false
        }
        const user = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
        return (
            <Row className="header">
                <div className="left">
                    <a id="logo" href="/">
                        <img alt="logo" src={require("../public/img/cdp_logo.png")}/>
                        <span>CDP管理系统</span>
                    </a>
                </div>
                <div className="right">
                    <Col span="10">
                        <Input placeholder="快捷入口..." onKeyUp={this.handleKeyup} className="headerSearchInput"></Input>
                    </Col>
                    <Col span="14">
                        <div className="cdp_sys_tips"><span className="tips_text" ref="cdp_sys_tips">为了有更好的体验及兼容，请使用最新版本的chrome、firefox、ie9+浏览器！</span></div>
                        <Menu mode="horizontal" id="header_nav" style={{"minWidth":"227px","float":"right"}} onClick={this.headMenuHandle}>
                            <SubMenu title={<a href="http://www.heartsone.net" target="_blank">首页</a>}></SubMenu>
                            <SubMenu title={<Link to="/about">我们</Link>}></SubMenu>
                            <SubMenu title={<span><Icon type="user" />{user.username}</span>}>
                                <Menu.Item key="updatePwd"><Icon type="edit"></Icon>修改密码</Menu.Item>
                                <Menu.Item key="logout"><Icon type="poweroff"></Icon>退出</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </div>
                <Modal {...modalWin}>
                    <FormUpdatePwd {...this.props} ref="formUpdatePwd" dispatch={this.props.dispatch}/>
                </Modal>
            </Row>
        )
    }
}

export default Header;