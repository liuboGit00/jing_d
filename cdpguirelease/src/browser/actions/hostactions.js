import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,hostpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const FETCH_HOST = 'FETCH_HOST'
export const REQUEST_HOST = 'REQUEST_HOST'
export const RECEIVE_HOST = 'RECEIVE_HOST'
export const RECEIVE_HOST_ERROR = 'RECEIVE_HOST_ERROR'

export const CREATE_HOST = 'CREATE_HOST'
export const CREATE_HOST_OK = 'CREATE_HOST_OK'
export const CREATE_HOST_ERROR = 'CREATE_HOST_ERROR'
export const ECHO_CREATE_HOST = 'ECHO_CREATE_HOST'
export const CLOSE_CREATE_HOST = 'CLOSE_CREATE_HOST'

export const DELETE_HOST = 'DELETE_HOST'
export const DELETE_HOST_OK = 'DELETE_HOST_OK'
export const DELETE_HOST_ERROR = 'DELETE_HOST_ERROR'

export const TOGGLE_HOST = 'TOGGLE_HOST'

export const ECHO_CREATE_HOST_INITIATORS = 'ECHO_CREATE_HOST_INITIATORS'
export const CLOSE_CREATE_HOST_INITIATORS = 'CLOSE_CREATE_HOST_INITIATORS'
export const REQUEST_HOST_INITIATORS = 'REQUEST_HOST_INITIATORS'
export const RECEIVE_HOST_INITIATORS = 'RECEIVE_HOST_INITIATORS'
export const RECEIVE_HOST_INITIATORS_ERROR = 'RECEIVE_HOST_INITIATORS_ERROR'
export const CREATE_HOST_INITIATORS = 'CREATE_HOST_INITIATORS'
export const CREATE_HOST_INITIATORS_OK = 'CREATE_HOST_INITIATORS_OK'
export const CREATE_HOST_INITIATORS_ERROR = 'CREATE_HOST_INITIATORS_ERROR'
export const DELETE_HOST_INITIATORS = 'DELETE_HOST_INITIATORS'
export const DELETE_HOST_INITIATORS_ERROR = 'DELETE_HOST_INITIATORS_ERROR'
export const DELETE_HOST_INITIATORS_OK = 'DELETE_HOST_INITIATORS_OK'
export const TOGGLE_HOST_INITIATORS = 'TOGGLE_HOST_INITIATORS'

//获取光纤节点
export const REQUEST_HOST_FCPORTS = 'REQUEST_HOST_FCPORTS'
export const RECEIVE_HOST_FCPORTS = 'RECEIVE_HOST_FCPORTS'
export const RECEIVE_HOST_FCPORTS_ERROR = 'RECEIVE_HOST_FCPORTS_ERROR'
export const REQUEST_HOST_TARGETS = 'REQUEST_HOST_TARGETS'
export const RECEIVE_HOST_TARGETS = 'RECEIVE_HOST_TARGETS'
export const RECEIVE_HOST_TARGETS_ERROR = 'RECEIVE_HOST_TARGETS_ERROR'
export const POST_TARGET_ENABLE_OK = 'POST_TARGET_ENABLE_OK'
export const POST_TARGET_ENABLE_ERROR = 'POST_TARGET_ENABLE_ERROR'
export const POST_TARGET_DISABLE_OK = 'POST_TARGET_DISABLE_OK'
export const POST_TARGET_DISABLE_ERROR = 'POST_TARGET_DISABLE_ERROR'

//modify host
export const MODIFY_HOST_OK = 'MODIFY_HOST_OK'
export const MODIFY_HOST_ERROR = 'MODIFY_HOST_ERROR'
export const ECHO_MODIFY_HOST = 'ECHO_MODIFY_HOST'
export const CLOSE_MODIFY_HOST = 'CLOSE_MODIFY_HOST'


//initiators
export function request_host_initiators(params){
    return{
        type:REQUEST_HOST_INITIATORS,
        params
    }
}

export function receive_host_initiators(initiators){
    return{
        type:RECEIVE_HOST_INITIATORS,
        items:initiators,
    }

}
export function receive_host_initiators_error(params={}){
    return{
        type:RECEIVE_HOST_INITIATORS_ERROR,
        params
    }

}
    

export function fetch_host_initiators(params={'baseURI':restapi,'path':hostpath,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_host_initiators(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/hostinitiators', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_host_initiators_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_host_initiators(body))
            }else{
                dispatch(receive_host_initiators(body.results))
            }

        })

    }
}
export function create_host_initiators(initiators,hostId,auth){
    // console.log(initiators)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/hostinitiators', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                "wwn": initiators.wwn,
                "host": initiators.id,
                "type": initiators.type,
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_host_initiators_error(body))
                dispatch(add_operation({
                    content:'添加initiator光纤节点:'+initiators.wwn,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(create_host_initiators_ok(body))
                    dispatch(add_operation({
                        content:'添加initiator光纤节点:'+initiators.wwn,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_host_initiators_error(body))
                    dispatch(add_operation({
                        content:'添加initiator光纤节点:'+initiators.wwn,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_host_initiators_ok(initiators){
    return {
        type: CREATE_HOST_INITIATORS_OK,
        initiators
    }
}
export function create_host_initiators_error(reason){
    return {
        type: CREATE_HOST_INITIATORS_ERROR,
        reason: reason
    }
}
export function echo_create_host_initiators(params){
    return {
        type: ECHO_CREATE_HOST_INITIATORS,
        params
    }
}
export function close_create_host_initiators(params){
    return {
        type: CLOSE_CREATE_HOST_INITIATORS
    }
}


export function delete_host_initiators(selectedHostini,auth) {
    return function (dispatch) {
        selectedHostini.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
               // console.log(body,element)
                if (200<=res.status&&res.status<300){
                    dispatch(delete_host_initiators_ok(element))
                    dispatch(add_operation({
                        content:'删除initiator光纤节点:'+element.wwn,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_host_initiators_error(body))
                    dispatch(add_operation({
                        content:'删除initiator光纤节点:'+element.wwn,
                        result:'failed'
                    }))
                    message.error("操作失败")
                } 
            })
        },auth);
   }
}
export function delete_host_initiators_error(initiators) {
    return {
        type:DELETE_HOST_INITIATORS_ERROR,
        initiators
    }
}
export function delete_host_initiators_ok(initiators) {
    return {
        type:DELETE_HOST_INITIATORS_OK,
        initiators
    }
}
export function toggle_host_initiators(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_HOST_INITIATORS,
        selectedInits:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}




//hosts

export function request_host(params){
	return{
		type:REQUEST_HOST,
		params
	}
}

export function receive_host(hostjson){
	return{
		type:RECEIVE_HOST,
		items:hostjson,
	}

}
export function receive_host_error(params={}){
	return{
		type:RECEIVE_HOST_ERROR,
		params
	}

}
	

export function fetch_host(params={'baseURI':restapi,'path':hostpath,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_host(params))
		let api = new API({
			baseURI:params.baseURI
		});
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path+'?ordering=-id', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_host_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_host(body))
            }else{
                dispatch(receive_host(body.results))
            }

        })

    }
}
export function toggle_host(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_HOST,
        selectedHost:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function create_host(host,auth){
    // console.log(host)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/hosts', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
            	'name':host.name,
            	'hosturl':host.url,
            	'token':host.token,
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_host_error(body))
                dispatch(add_operation({
                    content:'添加主机:'+host.name,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(close_create_host())
                    dispatch(create_host_ok(body))
                    dispatch(add_operation({
                        content:'添加主机:'+host.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_host_error(body))
                    dispatch(add_operation({
                        content:'添加主机:'+host_name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_host_ok(host){
    return {
        type: CREATE_HOST_OK,
        host
    }
}
export function create_host_error(reason){
    return {
        type: CREATE_HOST_ERROR,
        reason: reason
    }
}
export function echo_create_host(params){
    return {
        type: ECHO_CREATE_HOST,
        params
    }
}
export function close_create_host(params){
    return {
        type: CLOSE_CREATE_HOST
    }
}


export function delete_host(selectedHost,auth) {
    console.log(selectedHost)
    return function (dispatch) {
        selectedHost.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                // console.log(res.status,200<=res.status&&res.status<300)
                if (200<=res.status&&res.status<300){
                    dispatch(delete_host_ok(element))
                    dispatch(add_operation({
                        content:'删除主机:'+selectedHost[0].name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_host_error(body))
                    dispatch(add_operation({
                        content:'删除主机:'+selectedHost[0].name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}
export function delete_host_error(host) {
    return {
        type:DELETE_HOST_ERROR,
        host:host
    }
}
export function delete_host_ok(host) {
    return {
        type:DELETE_HOST_OK,
        host:host
    }
}


//列出主机端所有光纤节点
export function fetch_host_fcports(params={'baseURI':restapi,'path':hostpath,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_host_fcports(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path +'/getfcports', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_host_fcports_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_host_fcports(body))
            }else{
                dispatch(receive_host_fcports(body.results))
            }

        })

    }
}
export function request_host_fcports(params){
    return{
        type:REQUEST_HOST_FCPORTS,
        params
    }
}
export function receive_host_fcports(body){
    return{
        type:RECEIVE_HOST_FCPORTS,
        fcports:body
    }
}
export function receive_host_fcports_error(params){
    return{
        type:RECEIVE_HOST_FCPORTS_ERROR,
        params
    }
}


export function fetch_host_targets(params={'baseURI':restapi,'path':hostpath,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_host_targets(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path +'/getfctargets', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_host_targets_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_host_targets(body))
            }else{
                dispatch(receive_host_targets(body.results))
            }

        })

    }
}
export function request_host_targets(params){
    return{
        type:REQUEST_HOST_TARGETS,
        params
    }
}
export function receive_host_targets(body){
    return{
        type:RECEIVE_HOST_TARGETS,
        targets:body
    }
}
export function receive_host_targets_error(params){
    return{
        type:RECEIVE_HOST_TARGETS_ERROR,
        params
    }
}


export function post_target_enable(enable,auth){
    console.log(enable)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/hosts/enable_fctarget', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                'wwn':enable,
                
            })
        }, (err, res, body) => {
    // console.log(err)
    // console.log(res)
    // console.log(body)


            if (err) {
                dispatch(post_target_enable_error(err))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(post_target_enable_ok(body,enable+'target'))
                    message.success('操作成功')
                } else {
                    dispatch(post_target_enable_error(body))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function post_target_enable_ok(enable,target){
    return {
        type: POST_TARGET_ENABLE_OK,
        enable:enable,
        enable_target:target
    }
}
export function post_target_enable_error(reason){
    return {
        type: POST_TARGET_ENABLE_ERROR,
        reason: reason
    }
}

export function post_target_disable(disable,auth){
    // console.log(host)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/hosts/disable_fctarget', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                'wwn':disable,
                
            })
        }, (err, res, body) => {
            if (res.status == 201) {
                dispatch(post_target_disable_ok(body,disable+'initiator'))
                message.success('操作成功')
            } else {
                dispatch(post_target_disable_error(body))
                message.error('操作失败')
            }
        })
    }
}
export function post_target_disable_ok(host,initiator){
    return {
        type: POST_TARGET_DISABLE_OK,
        disable:host,
        disable_initiator:initiator
    }
}
export function post_target_disable_error(reason){
    return {
        type: POST_TARGET_DISABLE_ERROR,
        reason: reason
    }
}



//MODIFY HOST 

export function modify_host(host,auth){
    // console.log(host)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.put('/hosts/'+host.id, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                'name':host.name,
                'hosturl':host.url,
                'token':host.token,
            })
        }, (err, res, body) => {

            if (res.status == 200) {
                dispatch(close_modify_host())
                dispatch(modify_host_ok(body))
                dispatch(add_operation({
                    content:'修改主机:'+host.name,
                    result:'success'
                }))
                message.success('操作成功')
            } else {
                dispatch(modify_host_error(body))
                dispatch(add_operation({
                    content:'修改主机:'+host.name,
                    result:'failed'
                }))
                message.error('操作失败')
            }
            
        })
    }
}

export function modify_host_ok(ok){
    return{
        type:MODIFY_HOST_OK,
        ok
    }
}
export function modify_host_error(err){
    return{
        type:MODIFY_HOST_ERROR,
        err
    }
}
export function echo_modify_host(){
    return{
        type:ECHO_MODIFY_HOST
    }
}
export function close_modify_host(){
    return{
        type:CLOSE_MODIFY_HOST
    }
}

