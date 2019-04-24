/**
 * Created by tanglinhai on 2016/9/2.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,userspath,username,password} from '../confs/host'
import {Modal, message} from 'antd';
import {pools, pool183, pool45, poolvolumes} from '../constants/test';
import {add_operation, del_operation} from './operationactions'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USERS_ERROR = 'RECEIVE_USERS_ERROR'

export const REQUEST_DEL_USERS = 'REQUEST_DEL_USERS'
export const RECEIVE_DEL_USERS = 'RECEIVE_DEL_USERS'
export const RECEIVE_DEL_USERS_ERROR = 'RECEIVE_DEL_USERS_ERROR'

export const REQUEST_ADD_USER = 'REQUEST_ADD_USER'
export const RECEIVE_ADD_USER = 'RECEIVE_ADD_USER'
export const RECEIVE_ADD_USER_ERROR = 'RECEIVE_ADD_USER_ERROR'

export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER'
export const RECEIVE_UPDATE_USER = 'RECEIVE_UPDATE_USER'
export const RECEIVE_UPDATE_USER_ERROR = 'RECEIVE_UPDATE_USER_ERROR'

export const OPEN_ADD_USER_WIN = 'OPEN_ADD_USER_WIN'
export const CLOSE_ADD_USER_WIN = 'CLOSE_ADD_USER_WIN'
export const OPEN_UPDATE_USER_WIN = 'OPEN_UPDATE_USER_WIN'
export const CLOSE_UPDATE_USER_WIN = 'CLOSE_UPDATE_USER_WIN'

export const CHECKBOX_CHECKED_USERS = 'CHECKBOX_CHECKED_USERS'
export const RECEIVE_ADDORUPDATE_USER_FORM = 'RECEIVE_ADDORUPDATE_USER_FORM'

export const RECEIVE_USER_FORM_STATE = 'RECEIVE_USER_FORM_STATE'

export const OPEN_UPDATE_USER_PERM = 'OPEN_UPDATE_USER_PERM'
export const CLOSE_UPDATE_USER_PERM = 'CLOSE_UPDATE_USER_PERM'
export const UPDATE_USER_PERM_OK = 'UPDATE_USER_PERM_OK'
export const UPDATE_USER_PERM_ERR = 'UPDATE_USER_PERM_ERR'
 
//MODIFY USER POWER

export function open_update_user_perm(){
    return{
        type:OPEN_UPDATE_USER_PERM
    }
}
export function close_update_user_perm(){
    return{
        type:CLOSE_UPDATE_USER_PERM
    }
}
export function update_user_perm_err(err){
    return{
        type:UPDATE_USER_PERM_ERR,
        err
    }
}
export function update_user_perm_ok(body){
    return{
        type:UPDATE_USER_PERM_OK,
        userperm:body
    }
}
export function update_user_perm(id,name){
    return function(dispatch){
        let api =new API({
            baseURI:restapi
        })
        api.auth([username:username,password:password])
        api.put('/users/'+id+'/chgperm',{
            credentials:'include',
            mode:'cors',
            headers:{'Accept':'application/json','Content-Type': 'application/json','cache-control':'no-cache' },
            body:JSON.stringify({
                'permissions':name
            })
        },(err,res,body)=>{
            if(err){
                dispatch(update_user_perm_err(err))
                dispatch(add_operation({
                    content:'修改用户权限:'+id,
                    result:'failed'
                }))
            }else{
                if(body.results==undefined){
                    dispatch(update_user_perm_ok(body))
                }else{
                    dispatch(update_user_perm_ok(body.results))
                }
               
                dispatch(add_operation({
                    content:'修改用户权限:'+id,
                    result:'success'
                }))
                dispatch(close_update_user_perm())
                message.success('修改成功')
            }
        })
    }
}

/* check pwd */
export function check_pwd(loginName, pwd, cb) {
    const params={'baseURI':restapi,'path':userspath};
    let api = new API({
        baseURI: params.baseURI
    });
    // log in to our API with a user/pass
    api.auth([loginName, pwd]);
    //auth method has some bug now
    // if(pwd == 'Aa123456'){
    //     cb();
    // }else{
    //     cb([new Error('密码错误，请重新再试!')]);
    // }
    api.get(params.path+'?limit='+new Date().getTime(), {
        credentials: 'include',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
    }, (err, res, body) => {
        if (err) {
            console.log('err', err)
            cb([new Error('网络异常或密码错误导致，请重新再试!')]);
            return false
        }
        let currentU = null;
        const len = body.results ? body.results.length : 0;
        for(let i=0;i<len;i++){
            const u = body.results[i];
            if(u.username == loginName){
                currentU = u;
                break;
            }
        }
        if(currentU){
            cb();
        }else{
            cb([new Error('密码错误，请重新再试!')]);
        }
    })
}
/* update pwd */
export function update_pwd(form,Alluser, cb) {
    const user = JSON.parse(sessionStorage.user);
    // console.log(sessionStorage.user,user)
    const values = form.getFieldsValue();
    // console.log(values)
    // console.log(Alluser)
    let id
    if(Alluser!=undefined){
        for(let i=0;i<Alluser.length;i++){
            // console.log(Alluser[i].username)
            if(Alluser[i].username==user.username){
                id = Alluser[i].id
            }
            // console.log(id)
        } 
    }
    
    console.log(id)
    const params={'baseURI':restapi,'path':userspath,'username':username,'password':password};
    let api = new API({
        baseURI: params.baseURI
    });
    // log in to our API with a user/pass
    api.auth([user.username, values.oldPwd]);
    api.put(params.path+'/'+id+'/chgpasswd', {
        credentials: 'include',
        mode: 'cors',
        headers: { 'Accept': 'application/json','Content-Type':'application/json' },
        body: JSON.stringify({
            "password": values.newPwd,
        })
    }, (err, res, body) => {
        console.log(err,res,body)
        if (err) {
            console.log('err', err)
            cb({flag:'failed',message:'更新密码失败，请重新再试！'})
            return false
        }
        cb({flag:'success',message:''})
    })
}

/* set user form state */
export function receive_user_form_state(formState) {
    return {
        type:RECEIVE_USER_FORM_STATE,
        formState
    }
}

/* set user form */
export function receive_addOrUpdate_user_form(form) {
    return {
        type:RECEIVE_ADDORUPDATE_USER_FORM,
        form
    }
}
/* select users */
export function checkbox_checked_users(selectedRowKeys) {
    return {
        type:CHECKBOX_CHECKED_USERS,
        selectedRowKeys
    }
}
/* open add user win */
export function open_add_user_win(params) {
    return {
        type:OPEN_ADD_USER_WIN
    }
}
/* close add user win */
export function close_add_user_win(params) {
    return {
        type:CLOSE_ADD_USER_WIN
    }
}
/* open update user win */
export function open_update_user_win(params) {
    return {
        type:OPEN_UPDATE_USER_WIN,
        user: params
    }
}
/* close update user win */
export function close_update_user_win(params) {
    return {
        type:CLOSE_UPDATE_USER_WIN
    }
}
/* fetch users */
export function request_users(params) {
    return {
        type:REQUEST_USERS
    }
}
export function receive_users(params) {
    return {
        type:RECEIVE_USERS,
        items: params
    }
}
export function receive_users_error(params={}) {
    return {
        type:RECEIVE_USERS_ERROR,
        params
    }
}
export function fetch_users(conditions={searchKey:''}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':userspath,'username':username,'password':password};
        dispatch(request_users(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_users_error(params))
                return false
            }
            dispatch(receive_users(body.results))
        })
    }
}

/* del users */
export function request_del_users(params) {
    return {
        type:REQUEST_DEL_USERS
    }
}
export function receive_del_users(params) {
    return {
        type:RECEIVE_DEL_USERS
    }
}
export function receive_del_users_error(params={}) {
    return {
        type:RECEIVE_DEL_USERS_ERROR,
        params
    }
}
export function del_users(userId=0) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':userspath,'username':username,'password':password};
        dispatch(request_del_users(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.del(params.path+'/'+userId+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json','cache-control':'no-cache'  }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_del_users_error(params))
                dispatch(add_operation({
                    content: '删除用户ID:'+userId,
                    result: 'failed'
                }));
                message.error("删除用户失败！");
                return false
            }
            dispatch(receive_del_users(body))
            dispatch(fetch_users({searchKey:''}))
            dispatch(add_operation({
                content: '删除用户ID:'+userId,
                result: 'success'
            }));
            message.success("删除用户成功！");
        })
    }
}

/* add user */
export function request_add_user(params) {
    return {
        type:REQUEST_ADD_USER
    }
}
export function receive_add_user(params) {
    return {
        type:RECEIVE_ADD_USER
    }
}
export function receive_add_user_error(params={}) {
    return {
        type:RECEIVE_ADD_USER_ERROR,
        params
    }
}
export function add_user(form) {
    return function (dispatch) {
        const values = form.getFieldsValue();
        const params={'baseURI':restapi,'path':userspath,'username':username,'password':password};
        dispatch(request_add_user(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.post(params.path, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','Content-Type':'application/json' },
            body: JSON.stringify({
                "username": values.username,
                "password": values.password,
                "email": values.email,
                "first_name": values.first_name,
                "last_name": values.last_name,
                "is_active": values.is_active,
                "is_staff": values.is_staff,
                "is_superuser": values.is_superuser
            })
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_add_user_error(params))
                dispatch(add_operation({
                    content: '添加用户:'+values.username,
                    result: 'failed'
                }));
                message.error("添加用户失败！");
                return false
            }
            dispatch(receive_add_user(body))
            dispatch(fetch_users({searchKey:''}))
            dispatch(add_operation({
                content: '添加用户:'+values.username,
                result: 'success'
            }));
            message.success("添加用户成功！");
        })
    }
}


/* update user */
export function request_update_user(params) {
    return {
        type:REQUEST_UPDATE_USER
    }
}
export function receive_update_user(params) {
    return {
        type:RECEIVE_UPDATE_USER
    }
}
export function receive_update_user_error(params={}) {
    return {
        type:RECEIVE_UPDATE_USER_ERROR,
        params
    }
}
export function update_user(form) {
    return function (dispatch) {
        const values = form.getFieldsValue();
        const params={'baseURI':restapi,'path':userspath,'username':username,'password':password};
        dispatch(request_update_user(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.put(params.path+'/'+values.id, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','Content-Type':'application/json' },
            body: JSON.stringify({
                "username": values.username,
                "password": values.password,
                "email": values.email,
                "first_name": values.first_name,
                "last_name": values.last_name,
                "is_active": values.is_active,
                "is_staff": values.is_staff,
                "is_superuser": values.is_superuser
            })
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_update_user_error(params))
                dispatch(add_operation({
                    content: '更新用户:'+values.username,
                    result: 'failed'
                }));
                message.error("更新用户失败！");
                return false
            }
            dispatch(receive_update_user(body))
            dispatch(fetch_users({searchKey:''}))
            dispatch(add_operation({
                content: '更新用户:'+values.username,
                result: 'success'
            }));
            message.success("更新用户成功！");
        })
    }
}

