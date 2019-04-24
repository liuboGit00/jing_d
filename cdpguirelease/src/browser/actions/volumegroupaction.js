import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,username,password,} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const CREATE_VOLUMEGROUP_OK = 'CREATE_VOLUMEGROUP_OK'
export const CREATE_VOLUMEGROUP_ERR = 'CREATE_VOLUMEGROUP_ERR'
export const REQUEST_VOLUMEGROUP = 'REQUEST_VOLUMEGROUP'
export const RECEIVE_VOLUMEGROUP_ERR = 'RECEIVE_VOLUMEGROUP_ERR'
export const RECEIVE_VOLUMEGROUP_OK = 'RECEIVE_VOLUMEGROUP_OK'
export const ECHO_VOLUMEGROUP_MODAL = 'ECHO_VOLUMEGROUP_MODAL'
export const CLOSE_VOLUMEGROUP_MODAL = 'CLOSE_VOLUMEGROUP_MODAL'
export const TOGGLE_VOLUMEGROUP = 'TOGGLE_VOLUMEGROUP'
export const DELETE_VOLUMEGROUP_ERR = 'DELETE_VOLUMEGROUP_ERR'
export const DELETE_VOLUMEGROUP_OK  = 'DELETE_VOLUMEGROUP_OK'

export function toggle_volumegroup(selectRowKeys,selectedRows){
	return{
		type:TOGGLE_VOLUMEGROUP,
		selectedVolumegroup:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
	}
}

export function request_volumegroup(){
	return{
		type:REQUEST_VOLUMEGROUP,
	}
}
export function receive_volumegroup_ok(body){
	return{
		type:RECEIVE_VOLUMEGROUP_OK,
		volumegroup:body
	}
}
export function receive_volumegroup_err(err){
	return{
		type:RECEIVE_VOLUMEGROUP_ERR,
		err
	}
}
export function fetch_volumegroup(){
    const params={'baseURI':restapi,'auth':auth}
	return function (dispatch){
		dispatch(request_volumegroup())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/volumegroup'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_volumegroup_err(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_volumegroup_ok(body))
            }else{
                dispatch(receive_volumegroup_ok(body.results))
                
            }

        })
	}
}


export function echo_volumegroup_modal(){
	return{
		type:ECHO_VOLUMEGROUP_MODAL
	}
}
export function close_volumegroup_modal(){
	return{
		type:CLOSE_VOLUMEGROUP_MODAL
	}
}
export function create_volumegroup_ok(body){
	return{
		type:CREATE_VOLUMEGROUP_OK,
		body
	}
}
export function create_volumegroup_err(err){
	return{
		type:CREATE_VOLUMEGROUP_ERR,
		err
	}
}
export function create_volumegroup(volumegroup){
	console.log(volumegroup)
    const params={'baseURI':restapi,'auth':auth}
	return function(dispatch){
		let api = new API({
            baseURI: params.baseURI
            });
        	api.auth([params.auth.username, params.auth.password]);
            api.post('/volumegroup', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({
                	'groupname':volumegroup.name,
                	'presh':volumegroup.presh,
                	'postsh':volumegroup.postsh,
                	'args':volumegroup.args

                })}, (err, res, body) => {
            if (err) {
                dispatch(create_volumegroup_err(body))
                dispatch(add_operation({
                    content:'新建卷组:'+volumegroup.name,
                    result:'failed'
                }))
                message.error("操作失败");
                return false;
                
            }
            if(res.status == 201){
                dispatch(close_volumegroup_modal())
                dispatch(create_volumegroup_ok(body))
                dispatch(add_operation({
                    content:'新建卷组:'+volumegroup.name,
                    result:'success'
                }))
                message.success("操作成功");
            }else{
                dispatch(create_volumegroup_err(body))
                dispatch(add_operation({
                    content:'新建卷组:'+volumegroup.name,
                    result:'failed'
                }))
                message.error("操作失败")
            }
            
        })
    
	}
}

export function delete_volumegroup_ok(ok){
	return{
		type : DELETE_VOLUMEGROUP_OK,
		ok
	}
}
export function delete_volumegroup_err (err) {
	return{
		type:DELETE_VOLUMEGROUP_ERR,
		err
	}
}
export function delete_volumegroup(selectedVolumegroup,auth){
	console.log(selectedVolumegroup)
	return function(dispatch){
        selectedVolumegroup.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_volumegroup_ok(element))
                    dispatch(add_operation({
                        content:'删除卷组:'+ element.groupname,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_volumegroup_err(body))
                    dispatch(add_operation({
                        content:'删除卷组:'+element.groupname,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   
	}
}