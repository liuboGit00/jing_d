/**
 * Created by tanglinhai on 2016/9/5.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
receive_login_ok
} from '../../actions/loginactions'
import FormLogin from '../../components/user/formlogin'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import auth from '../../utils/auth'
const confirm = Modal.confirm;

class LoginContainer extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    login(){
        const form = this.refs.login;
        form.validateFields((errors, values) => {

            if (errors) {
             console.log('errors')
                console.log('--------------%s------------', JSON.stringify(errors));
                const fields = form.fields;
                setTimeout(function(f, fes){f.setFields(fes);}.bind(this, form, fields), 10);
                const state = {}
                for(var key in errors){
                    if(errors[key].errors && errors[key].errors.length > 0){
                        state[key+'ValidateStatus'] = 'error'
                    }
                }
                //this.props.dispatch(receive_user_form_state(state));
            }else{
                const values = form.getFieldsValue();
                auth.login(values.username, values.password, function(loginFlag){
                    if(loginFlag){
                        //window.location.reload(); 
                        this.props.dispatch(receive_login_ok())
                    }else{
                        Modal.error({
                            title: 'CDP系统提示！',
                            content: '登录失败，请重新登录！',
                        });
                    }
                }.bind(this));
            }
        });

    }
    render() {
        const winevents = {};
        const lo = this
        onkeydown = function(e){
            if(e.keyCode == 13){
                lo.login()
            }
        }
        return (
            <Row>
                <Row className="loginHead">
                    <Col span="3" className="login_logo_col"></Col>
                    <Col span="21"></Col>
                </Row>
                <Row className="loginCenter">
                    <Col span="12"></Col>
                    <Col span="12">
                        <div className="loginForm">
                            <div className="formHead"><div></div></div>
                            <div className="formTitle">登录CDP系统</div>
                            <FormLogin {...this.props.loginState} onOk={this.login} {...winevents} ref="login" dispatch={this.props.dispatch}/>
                            <div className="formBtns">
                                <Button type="primary" htmlType="submit" onClick={this.login} loading={this.props.loginState.isLogining}>登录</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="loginFoot">
                    <div>Copyright © 2010-2016 北京中科同向技术有限公司 </div>
                    
                </Row>
            </Row>
        );
    }
}

LoginContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        loginState: state.loginState
    }
}

export default connect(mapStateToProps)(LoginContainer);