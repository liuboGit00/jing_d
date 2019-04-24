import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'
import {fetch_disks} from './actions'


//获取所以的iscsi
export const FETCH_ISCSI = 'FETCH_ISCSI'
export const REQUEST_ISCSI = 'REQUEST_ISCSI'
export const RECEIVE_ISCSI = 'RECEIVE_ISCSI'
export const RECEIVE_ISCSI_ERROR = 'RECEIVE_ISCSI_ERROR'

export const CREATE_ISCSI = 'CREATE_ISCSI'
export const CREATE_ISCSI_OK = 'CREATE_ISCSI_OK'
export const CREATE_ISCSI_ERROR = 'CREATE_ISCSI_ERROR'
export const ECHO_CREATE_ISCSI = 'ECHO_CREATE_ISCSI'
export const CLOSE_CREATE_ISCSI = 'CLOSE_CREATE_ISCSI'

export const DELETE_ISCSI = 'DELETE_ISCSI'
export const DELETE_ISCSI_OK = 'DELETE_ISCSI_OK' 
export const DELETE_ISCSI_ERROR = 'DELETE_ISCSI_ERROR'

export const TOGGLE_ISCSI = 'TOGGLE_ISCSI'

//获取iscsi上的target
export const FETCH_ISCSI_TARGET = 'FETCH_ISCSI_TARGET'
export const REQUEST_ISCSI_TARGET = 'REQUEST_ISCSI_TARGET'
export const RECEIVE_ISCSI_TARGET = 'RECEIVE_ISCSI_TARGET'
export const RECEIVE_ISCSI_TARGET_ERROR = 'RECEIVE_ISCSI_TARGET_ERROR'
export const REQUEST_TARGET_RELOAD =  'REQUEST_TARGET_RELOAD'
export const RECEIVE_TARGET_RELOAD = 'RECEIVE_TARGET_RELOAD'
export const RECEIVE_TARGET_RELOAD_ERROR = 'RECEIVE_TARGET_RELOAD_ERROR'


//获取login的target
export const FETCH_LOGIN_TARGET = 'FETCH_LOGIN_TARGET'
export const REQUEST_LOGIN_TARGET = 'REQUEST_LOGIN_TARGET'
export const RECEIVE_LOGIN_TARGET = 'RECEIVE_LOGIN_TARGET'
export const RECEIVE_LOGIN_TARGET_ERROR = 'RECEIVE_LOGIN_TARGET_ERROR'

// 登陆target
export const LOGIN_TARGET_OK = 'LOGIN_TARGET_OK'
export const LOGIN_TARGET_ERROR = 'LOGIN_TARGET_ERROR'

// 退出登陆target
export const LOGOUT_TARGET_OK = 'LOGOUT_TARGET_OK'
export const LOGOUT_TARGET_ERROR = 'LOGOUT_TARGET_ERROR'


//获取target的详细信息和修改
export const RECEIVE_TARGETDETAIL = 'RECEIVE_TARGETDETAIL'
export const RECEIVE_TARGETDETAIL_ERROR = 'RECEIVE_TARGETDETAIL_ERROR'
export const REQUEST_TARGETDETAIL = 'REQUEST_TARGETDETAIL'
export const TOGGLE_TARGETDETAIL = 'TOGGLE_TARGETDETAIL'
export const ECHO_MODIFY_OPTION = 'ECHO_MODIFY_OPTION'
export const CLOSE_MODIFY_OPTION = 'CLOSE_MODIFY_OPTION'
export const CREATE_MODIFY_OK = 'CREATE_MODIFY_OK'
export const CREATE_MODIFY_ERROR = 'CREATE_MODIFY_ERROR'

//扫描iscsiportal上的所有target
export const REQUEST_ISCSIPORTAL_TARGET = 'REQUEST_ISCSIPORTAL_TARGET'
export const RECEIVE_ISCSIPORTAL_TARGET = 'RECEIVE_ISCSIPORTAL_TARGET'
export const RECEIVE_ISCSIPORTAL_TARGET_ERROR = 'REVCEIVE_ISCSIPORTAL_TARGET_ERROR'


//获取target的详细信息和修改
export function echo_modify_option(params){
    return{
        type:ECHO_MODIFY_OPTION,
        params
    }
}
export function close_modify_option(params){
    return{
        type:CLOSE_MODIFY_OPTION,
        params
    }
}
export function create_modify_ok(modify){
    return {
        type: CREATE_MODIFY_OK,
        modify
    }
}
export function create_modify_error(reason){
    return {
        type: CREATE_MODIFY_ERROR,
        reason: reason
    }
}
export function create_modify(modify,id,auth){
    console.log(modify,id)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/iscsitargets/'+ id  +'/iscsitgt_setvalue', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                'name':modify.name,
                'value':modify.value
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_modify_error(body))
                dispatch(add_operation({
                    content:'修改高级选项:'+modify.name,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(close_modify_option())
                    dispatch(create_modify_ok(body))
                    dispatch(fetch_targetdetail(id))
                    dispatch(add_operation({
                        content:'修改高级选项:'+modify.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_modify_error(body))
                    dispatch(add_operation({
                        content:'修改高级选项:'+modify.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}




export function request_targetdetail(){
    return{
        type:REQUEST_TARGETDETAIL,
    }
}
export function receive_targetdetail(body){
    return{
        type:RECEIVE_TARGETDETAIL,
        targetdetail:body
    }
}
export function receive_targetdetail_error(params){
    return{
        type:RECEIVE_TARGETDETAIL_ERROR,
        params
    }
}
export function fetch_targetdetail(id){

    return function (dispatch) {
        dispatch(request_targetdetail())
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username,auth.password]);
        api.get('/iscsitargets/'+id+'/iscsitgt_detail',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(err,res,body)
            if (err) {
                dispatch(receive_targetdetail_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_targetdetail(body))
            }else{
                dispatch(receive_targetdetail(body.results))
            }

        })

    }
}
export function toggle_targetdetail(selectRowKeys,selectedRows){
    return{
        type:TOGGLE_TARGETDETAIL,
        selectedTargetdetail:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}



// 登陆target
export function login_target(login,id,name,text,auth){
    // console.log(iscsi)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/iscsitargets/'+id+'/'+login, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
               
            })
        }, (err, res, body) => {
            // console.log(err)
            // console.log(res)
            // console.log(text)

            if (err) {
                dispatch(login_target_error(err))
                dispatch(add_operation({
                    content:'登录:'+name,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(login_target_ok(text))
                    dispatch(add_operation({
                        content:'登录:'+name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(login_target_error(body))
                    dispatch(add_operation({
                        content:'登录:'+name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function login_target_ok(login){
    return {
        type: LOGIN_TARGET_OK,
        login:login
    }
}
export function login_target_error(reason){
    return {
        type: LOGIN_TARGET_ERROR,
        reason: reason
    }
}


//退出登陆target
export function logout_target(logout,id,name,text,auth){
    // console.log(iscsi)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/iscsitargets/'+id+'/'+logout, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
            })
        }, (err, res, body) => {
            // console.log(err)
            // console.log(res)
            // console.log(body)

            if (err) {
                dispatch(logout_target_error(body))
                dispatch(add_operation({
                    content:'退出登录:'+name,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(logout_target_ok(text))
                    dispatch(add_operation({
                        content:'退出登录:'+name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(logout_target_error(body))
                    dispatch(add_operation({
                        content:'退出登录:'+name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function logout_target_ok(logout){
    return {
        type: LOGOUT_TARGET_OK,
        logout
    }
}
export function logout_target_error(reason){
    return {
        type: LOGOUT_TARGET_ERROR,
        reason: reason
    }
}


//获取login的target
export function request_login_target(params){
    return{
        type:REQUEST_LOGIN_TARGET,
        params
    }
}

export function receive_login_target(login){
    return{
        type:RECEIVE_LOGIN_TARGET,
        items:login,
    }

}
export function receive_login_target_error(params={}){
    return{
        type:RECEIVE_LOGIN_TARGET_ERROR,
        params
    }

}
    

export function fetch_login_target(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_login_target(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/iscsiportals/listsession',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(err,res,body)
            if (err) {
                dispatch(receive_login_target_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_login_target(body))
            }else{
                dispatch(receive_login_target(body.results))
            }

        })

    }
}






//获取iscsi上的target
export function request_iscsi_target(params){
    return{
        type:REQUEST_ISCSI_TARGET,
        params
    }
}

export function receive_iscsi_target(target){
    return{
        type:RECEIVE_ISCSI_TARGET,
        items:target,
    }

}
export function receive_iscsi_target_error(params={}){
    return{
        type:RECEIVE_ISCSI_TARGET_ERROR,
        params
    }

}
    

export function fetch_iscsi_target(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_iscsi_target(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/iscsitargets',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(err,res,body)
            if (err) {
                dispatch(receive_iscsi_target_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_iscsi_target(body))
            }else{
                dispatch(receive_iscsi_target(body.results))
            }

        })

    }
}
export function request_target_reload(){
    return{
        type:REQUEST_TARGET_RELOAD,
    }
}
export function receive_target_reload(body){
    return{
        type:RECEIVE_TARGET_RELOAD,
        target_reload:body
    }
}
export function receive_target_reload_error(params){
    return{
        type:RECEIVE_TARGET_RELOAD_ERROR,
        params
    }
}
export function fetch_target_reload(){

    return function (dispatch) {
        dispatch(request_target_reload())
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username,auth.password]);
        api.get('/hosts/scsirescan',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(err,res,body)
            if (err) {
                dispatch(receive_target_reload_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_target_reload(body))
                dispatch(fetch_disks())
            }else{
                dispatch(receive_target_reload(body.results))
                dispatch(fetch_disks())

            }

        })

    }
}




//
export function request_iscsi(params){
	return{
		type:REQUEST_ISCSI,
		params
	}
}

export function receive_iscsi(iscsijson){
	return{
		type:RECEIVE_ISCSI,
		items:iscsijson,
	}

}
export function receive_iscsi_error(params={}){
	return{
		type:RECEIVE_ISCSI_ERROR,
		params
	}

}
	

export function fetch_iscsi(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_iscsi(params))
		let api = new API({
			baseURI:params.baseURI
		});
        api.auth([params.auth.username, params.auth.password]);
        api.get('/iscsiportals',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_iscsi_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_iscsi(body))
            }else{
                dispatch(receive_iscsi(body.results))
            }

        })

    }
}
export function toggle_iscsi(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_ISCSI,
        selectedIscsi:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function create_iscsi(iscsi,auth){
    // console.log(iscsi)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/iscsiportals', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
            	'address':iscsi.address,
                'port':iscsi.port
            })
        }, (err, res, body) => {
            // console.log(err)
            // console.log(res)
            // console.log(body)

            if (err) {
                dispatch(create_iscsi_error(body))
                dispatch(add_operation({
                    content:'添加:',
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(close_create_iscsi())
                    dispatch(create_iscsi_ok(body))
                    dispatch(add_operation({
                        content:'添加:',
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_iscsi_error(body))
                    dispatch(add_operation({
                        content:'添加:',
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_iscsi_ok(iscsi){
    return {
        type: CREATE_ISCSI_OK,
        iscsi
    }
}
export function create_iscsi_error(reason){
    return {
        type: CREATE_ISCSI_ERROR,
        reason: reason
    }
}
export function echo_create_iscsi(params){
    return {
        type: ECHO_CREATE_ISCSI,
        params
    }
}
export function close_create_iscsi(params){
    return {
        type: CLOSE_CREATE_ISCSI
    }
}


export function delete_iscsi(selectedISCSI,auth) {
    return function (dispatch) {
        selectedISCSI.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_iscsi_ok(element))
                    dispatch(add_operation({
                        content:'删除:',
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_iscsi_error(body))
                    dispatch(add_operation({
                        content:'删除:',
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}
export function delete_iscsi_error(iscsi) {
    return {
        type:DELETE_ISCSI_ERROR,
        iscsi
    }
}
export function delete_iscsi_ok(iscsi) {
    return {
        type:DELETE_ISCSI_OK,
        iscsi
    }
}

//扫描iscsiportal上的所有target
export function request_iscsiportal_target(){
    return{
        type:REQUEST_ISCSIPORTAL_TARGET,
    }
}
export function receive_iscsiportal_target(body){
    return{
        type:RECEIVE_ISCSIPORTAL_TARGET,
        iscsiportal_target:body
    }
}
export function receive_iscsiportal_target_error(params){
    return{
        type:RECEIVE_ISCSIPORTAL_TARGET_ERROR,
        params
    }
}
export function fetch_iscsiportal_target(id){

    return function (dispatch) {
        dispatch(request_iscsiportal_target())
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username,auth.password]);
        api.get('/iscsiportals/'+id+'/discovery',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(err,res,body)
            if (err) {
                dispatch(receive_iscsiportal_target_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_iscsiportal_target(body))
                dispatch(fetch_iscsi_target())
                dispatch(fetch_iscsi())
            }else{
                dispatch(receive_iscsiportal_target(body.results))
                dispatch(fetch_iscsi_target())
                dispatch(fetch_iscsi())
                
            }

        })

    }
}
