import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,hostpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'

export const REQUEST_HOSTGROUP = 'REQUEST_HOSTGROUP'
export const RECEIVE_HOSTGROUP_OK = 'RECEIVE_HOSTGROUP_OK'
export const RECEIVE_HOSTGROUP_ERR = 'RECEIVE_HOSTGROUP_ERR'
export const TOGGLE_HOSTGROUP = 'TOGGLE_HOSTGROUP'
export const ECHO_HOSTGROUP = 'ECHO_HOSTGROUP'
export const CLOSE_HOSTGROUP = 'CLOSE_HOSTGROUP'
export const CREATE_HOSTGROUP_OK = 'CREATE_HOSTGROUP_OK'
export const CREATE_HOSTGROUP_ERR = 'CREATE_HOSTGROUP_ERR'
export const DELETE_HOSTGROUP_ERR = 'DELETE_HOSTGROUP_ERR'
export const DELETE_HOSTGROUP_OK = 'DELETE_HOSTGROUP_OK'
export const APPLY_HOSTGROUP_OK = 'APPLY_HOSTGROUP_OK'
export const APPLY_HOSTGROUP_ERR = 'APPLY_HOSTGROUP_ERR'
export const REQUEST_APPLY_HOSTGROUP = 'REQUEST_APPLY_HOSTGROUP'
//get property 
export const REQUEST_HOSTGROUP_PROPERTY = 'REQUEST_HOSTGROUP_PROPERTY'
export const RECEIVE_HOSTGROUP_PROPERTY_OK = 'RECEIVE_HOSTGROUP_PROPERTY_OK'
export const RECEIVE_HOSTGROUP_PROPERTY_ERR = 'RECEIVE_HOSTGROUP_PROPERTY_ERR'
export const SET_HOSTGROUP_PROPERTY_OK = 'SET_HOSTGROUP_PROPERTY_OK'
export const SET_HOSTGROUP_PROPERTY_ERR = 'SET_HOSTGROUP_PROPERTY_ERR'
export const SET_HOSTGROUP_PROPERTY_ID = 'SET_HOSTGROUP_PROPERTY_ID'
export const ECHO_HOSTGROUP_PROPERTY = 'ECHO_HOSTGROUP_PROPERTY'
export const CLOSE_HOSTGROUP_PROPERTY = 'CLOSE_HOSTGROUP_PROPERTY'

export function echo_hostgroup_property(){
	return {
		type:ECHO_HOSTGROUP_PROPERTY,
	}
}
export function close_hostgroup_property(){
	return{
		type:CLOSE_HOSTGROUP_PROPERTY,
	}
}
export function set_hostgroup_property_id(id){
	return{
		type:SET_HOSTGROUP_PROPERTY_ID,
		hostgroupid:id,
	}
}

export function request_hostgroup_property(){
	return{
		type: REQUEST_HOSTGROUP_PROPERTY,
	}
}
export function receive_hostgroup_property_ok(body){
	return{
		type: RECEIVE_HOSTGROUP_PROPERTY_OK,
		property:body,
	}
}
export function receive_hostgroup_property_err(err){
	return{
		type:RECEIVE_HOSTGROUP_PROPERTY_ERR,
		err
	}
}
export function fetch_hostgroup_property(id){
	const params={'baseURI':restapi,'auth':auth}
	return function(dispatch){
		dispatch(request_hostgroup())
		let api=new API({
			baseURI:params.baseURI,
		});
		api.auth([params.auth.username,params.auth.password]);
		api.get('/hostgroups/'+id+'/property',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_hostgroup_property_err(err))
                return false
            }
            if(body.results==undefined){
            	dispatch(receive_hostgroup_property_ok(body))
            }else{
            	dispatch(receive_hostgroup_property_ok(body.results))
            }

        })
	}
}
export function set_hostgroup_property_ok(body){
	return {
		type:SET_HOSTGROUP_PROPERTY_OK,
		setproperty:body,
	}

}
export function set_hostgroup_property_err(err){
	return {
		type:SET_HOSTGROUP_PROPERTY_OK,
		err
	}
}

export function set_hostgroup_property(set){
	const params={'baseURI':restapi,'auth':auth}
	return function(dispatch){
		dispatch(request_hostgroup())
		let api=new API({
			baseURI:params.baseURI,
		});
		api.auth([params.auth.username,params.auth.password]);
		api.post('/hostgroups/'+id+'/propertyset',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache' },body:JSON.stringify({
				'property':set.property,
				'value':set.value,
			})}, (err, res, body) => {
            if (err) {
                dispatch(set_hostgroup_property_err(err))
            	message.success('操作失败')
                add_operation({
                	content:'设置'+set.name+'属性'+set.property,
					result:'failed',
                })
                return false
            }
            if(body.results==undefined){
            	dispatch(set_hostgroup_property_ok(body))
            }else{
            	dispatch(set_hostgroup_property_ok(body.results))
            }
            add_operation({
               	content:'设置'+set.name+'属性'+set.property,
				result:'success',
            })
            message.success('操作成功')
            dispatch(fetch_hostgroup_property(set.id))

        })
	}
}

export function request_hostgroup(){
	return {
		type:REQUEST_HOSTGROUP
	}
}
export function receive_hostgroup_err(err){
	return{
		type:RECEIVE_HOSTGROUP_ERR,
		err
	}
}
export function receive_hostgroup_ok(body){
	return{
		type:RECEIVE_HOSTGROUP_OK,
		hostgroup:body
	}
}
export function toggle_hostgroup(selectRowKeys,selectedRows){
	return{
		type:TOGGLE_HOSTGROUP,
		selectedHostgroup:[...selectedRows],
		selectedRowKeys:[...selectRowKeys],

	}
}
export function fetch_hostgroup(){
	const params={'baseURI':restapi,'auth':auth}
	return function(dispatch){
		dispatch(request_hostgroup())
		let api=new API({
			baseURI:params.baseURI,
		});
		api.auth([params.auth.username,params.auth.password]);
		api.get('/hostgroups'+'?limit=999',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_hostgroup_err(err))
                return false
            }
            if(body.results==undefined){
            	dispatch(receive_hostgroup_ok(body))
            }else{
            	dispatch(receive_hostgroup_ok(body.results))
            }

        })
	}
}
export function echo_hostgroup(){
	return{
		type:ECHO_HOSTGROUP
	}
}
export function close_hostgroup(){
	return {
		type:CLOSE_HOSTGROUP
	}
}
export function create_hostgroup_err(err){
	return{
		type:CREATE_HOSTGROUP_ERR,
		err
	}
}
export function create_hostgroup_ok(body){
	return{
		type:CREATE_HOSTGROUP_OK,
		createhostgroup:body,
	}
}
export function create_hostgroup(hostgroup){
	const params={'baseURI':restapi,'path':diskspath,'auth':auth}
	return function(dispatch){
		let api = new API({
			baseURI:params.baseURI,
		});
		api.auth([params.auth.username,params.auth.password]);
		api.post('/hostgroups',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache' },
			body:JSON.stringify({
				name:hostgroup.name,
				hosts:hostgroup.hosts

			})}, (err, res, body) => {
            if (err) {
                dispatch(create_hostgroup_err(err))
                message.error('操作失败')
                dispatch(add_operation({
                	content:'创建主机集群'+hostgroup.name,
                	result:'failed'
                }))
                return false
            }
            if(body.results==undefined){
            	dispatch(create_hostgroup_ok(body))
            }else{
            	dispatch(create_hostgroup_ok(body.results))
            }
            dispatch(add_operation({
            	content:'创建主机集群'+hostgroup.name,
            	result:'success'
            }))
            message.success('操作成功')
        })
	}
}

export function delete_hostgroup_err(err){
	return{
		type:DELETE_HOSTGROUP_ERR,
		err
	}
}
export function delete_hostgroup_ok(body){
	return{
		type:DELETE_HOSTGROUP_OK,
		deletehostgroup:body
	}
}
export function delete_hostgroup(hostgroup){
	const params={'baseURI':restapi,'path':diskspath,'auth':auth}
	
	return function(dispatch){
		hostgroup.forEach(function(element){
			let api = new API({
				baseURI:element.url
			});
			api.auth([params.auth.username,params.auth.password]);
			api.del('',{ credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_hostgroup_ok(element))
                    dispatch(add_operation({
                        content:'删除主机集群:'+ element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_hostgroup_err(body))
                    dispatch(add_operation({
                        content:'删除主机集群:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
		})
		
	}
}
export function request_apply_hostgroup(){
	return{
		type:REQUEST_APPLY_HOSTGROUP,
	}
}
export function apply_hostgroup_ok(body){
	return{
		type:APPLY_HOSTGROUP_OK,
		applyhostgroup:body,
	}
}
export function apply_hostgroup_err(err){
	return{
		type:APPLY_HOSTGROUP_ERR,
		err	
	}
}


export function apply_hostgroup(hostgroup){
	const params={'baseURI':restapi,'auth':auth}
	
	return function(dispatch){
		dispatch(request_apply_hostgroup())
		hostgroup.forEach(function(element){
			let api = new API({
				baseURI:element.url
			});
			api.auth([params.auth.username,params.auth.password]);
			api.get('/apply',{ credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (res.status == 200){
                    dispatch(apply_hostgroup_ok(element))
                    dispatch(add_operation({
                        content:'主机集群生效:'+ element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(apply_hostgroup_err(body))
                    dispatch(add_operation({
                        content:'主机集群生效:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
		})
		
	}
}