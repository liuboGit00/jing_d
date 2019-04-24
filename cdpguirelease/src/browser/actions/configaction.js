import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,username,password} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'



export const REQUEST_CONFIG = 'REQUEST_CONFIG'
export const RECEIVE_CONFIG = 'RECEIVE_CONFIG'
export const RECEIVE_CONFIG_ERROR = 'RECEIVE_CONFIG_ERROR'


export const TOGGLE_CONFIG = 'TOGGLE_CONFIG'
export const SET_CONFIG_STATUS_OK ='SET_CONFIG_STATUS_OK'
export const SET_CONFIG_STATUS_ERROR ='SET_CONFIG_STATUS_ERROR'

export const ECHO_REGISTER_DEADLINE = 'ECHO_REGISTER_DEADLINE'
export const CLOSE_REGISTER_DEADLINE = 'CLOSE_REGISTER_DEADLINE'
export const RECEIVE_DEADLINE_OK = 'RECEIVE_DEADLINE_OK'
export const RECEIVE_DEADLINE_ERR = 'RECEIVE_DEADLINE_ERR'
export const REQUEST_DEADLINE = 'REQUEST_DEADLINE'
export const REGISTER_DEADLINE_ERR = 'REGISTER_DEADLINE_ERR'
export const REGISTER_DEADLINE_OK = 'REGISTER_DEADLINE_OK'
export const TOGGLE_DEADLINE = 'TOGGLE_DEADLINE'


export function toggle_deadline(selectedRowKeys,selectedRows){
    return{
        type:TOGGLE_DEADLINE,
        selectedDeadline:[...selectedRows],
        selectedRowKeys:[...selectedRowKeys],
    }
}
export function echo_register_deadline(){
    return{
        type:ECHO_REGISTER_DEADLINE,
    }
}
export function close_register_deadline(){
    return{
        type:CLOSE_REGISTER_DEADLINE
    }
}
export function request_deadline(){
    return{
        type:REQUEST_DEADLINE
    }
}
export function receive_deadline_ok(body){
    return{
        type:RECEIVE_DEADLINE_OK,
        deadline:body
    }
}
export function receive_deadline_err(err){
    return{
        type:RECEIVE_DEADLINE_ERR,
        err
    }
}
export function fetch_deadline(){
    return function(dispatch){
        dispatch(request_deadline())
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/register',
            {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache'} },
            (err,res,body)=>{
                if (err) {
                    dispatch(receive_deadline_err(err))
                    return false
                }
                if (body.results == undefined){
                    dispatch(receive_deadline_ok(body))
                }else{
                    dispatch(receive_deadline_ok(body.results))
                }
            }

        )
    }
}
export function register_deadline_ok(body){
    return{
        type:REGISTER_DEADLINE_OK,
        register_deadline:body
    }
}
export function register_deadline_err(err){
    return{
        type:REGISTER_DEADLINE_ERR,
        err
    }
}
export function register_deadline(code){
    console.log(code)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.post('/register',
            {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache'},
            body:JSON.stringify({
                registercode:code.code
            })},(err,res,body)=>{
                if (err) {
                    dispatch(register_deadline_err(err))
                    dispatch(add_operation({
                        content:'注册服务',
                            result:'failed'
                    }))
                    message.error('操作失败');
                    return false
                }
                if (body.results == undefined){
                    dispatch(register_deadline_ok(body))
                    dispatch(add_operation({
                        content:'注册服务',
                        result:'success'
                    }))
                    message.success('操作成功');
                }else{
                    dispatch(register_deadline_ok(body.results))
                    dispatch(add_operation({
                        content:'注册服务',
                        result:'success'
                    }))
                    message.success('操作成功');
                }
            })
    }
}


export function request_config(params){
    return{
        type:REQUEST_CONFIG,
        params
    }
}

export function receive_config(config){
    return{
        type:RECEIVE_CONFIG,
        items:config,
    }

}
export function receive_config_error(params){
    return{
        type:RECEIVE_CONFIG_ERROR,
        params
    }

}
    

export function fetch_config(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_config(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/systemctls', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_config_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_config(body))
            }else{
                dispatch(receive_config(body.results))
            }

        })

    }
}
export function set_config_status(name,status){
    const params={'baseURI':restapi,'username':username,'password':password};
    console.log(name,status)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(params.username,params.password);
        api.post('/systemctls', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                "name": name,
                "status": status,
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(set_config_status_error(body))
                dispatch(add_operation({
                    content:'修改系统服务:'+name+'-'+status,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(set_config_status_ok(body))
                    dispatch(add_operation({
                        content:'修改系统服务:'+name+'-'+status,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(set_config_status_error(body))
                    dispatch(add_operation({
                        content:'修改系统服务:'+name+'-'+status,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function set_config_status_ok(config){
    return {
        type: SET_CONFIG_STATUS_OK,
        config
    }
}
export function set_config_status_error(err){
    return {
        type: SET_CONFIG_STATUS_ERROR,
        err
    }
}
export function toggle_config(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_CONFIG,
        selectedConfig:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}





