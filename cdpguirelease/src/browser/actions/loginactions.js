/**
 * Created by tanglinhai on 2016/9/6.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,userspath,username,password} from '../confs/host'
import {Modal} from 'antd';

export const RECEIVE_ADDORUPDATE_LOGIN_FORM = 'RECEIVE_ADDORUPDATE_LOGIN_FORM'
export const RECEIVE_LOGIN_FORM_STATE = 'RECEIVE_LOGIN_FORM_STATE'
export const RECEIVE_LOGIN_OK       = "RECEIVE_LOGIN_OK"

/* set login form state */
export function receive_login_form_state(formState) {
    return {
        type:RECEIVE_LOGIN_FORM_STATE,
        formState
    }
}

/* set login form */
export function receive_addOrUpdate_login_form(form) {
    return {
        type:RECEIVE_ADDORUPDATE_LOGIN_FORM,
        form
    }
}
export function receive_login_ok() {
    return {
        type:RECEIVE_LOGIN_OK,
        }
}
