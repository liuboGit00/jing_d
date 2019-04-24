import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,clonepath,snapshotspath,username,password,agentlistpath,registerpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'

export const REQUEST_AGENTMIRROR = 'REQUEST_AGENTMIRROR'
export const RECEIVE_AGENTMIRROR = 'RECEIVE_AGENTMIRROR'
export const RECEIVE_AGENTMIRROR_ERR = 'RECEIVE_AGENTMIRROR_ERR'
export const ECHO_CREATE_AGENTMIRROR = 'ECHO_CREATE_AGENTMIRROR'
export const CLOSE_CREATE_AGENTMIRROR = 'CLOSE_CREATE_AGENTMIRROR'
export const TOGGLE_AGENTMIRROR = 'TOGGLE_AGENTMIRROR'
export const CREATE_AGENTMIRROR_OK = 'CREATE_AGENTMIRROR_OK'
export const CREATE_AGENTMIRROR_ERR = 'CREATE_AGENTMIRROR_ERR'
export const ECHO_REMOVE_AGENTMIRROR = 'ECHO_REMOVE_AGENTMIRROR'
export const CLOSE_REMOVE_AGENTMIRROR = 'CLOSE_REMOVE_AGENTMIRROR'
export const REFRESH_MODAL_ERR = 'REFRESH_MODAL_ERR'
export const REFRESH_MODAL_OK = 'REFRESH_MODAL_OK'
export const REMOVE_AGENTMIRROR_OK = 'REMOVE_AGENTMIRROR_OK'
export const REMOVE_AGENTMIRROR_ERR ='REMOVE_AGENTMIRROR_ERR'
export const ECHO_AGENTMIRROR_EXTEND = 'ECHO_AGENTMIRROR_EXTEND'
export const CLOSE_AGENTMIRROR_EXTEND = 'CLOSE_AGENTMIRROR_EXTEND'
export const CREATE_AGENTMIRROR_EXTEND_OK = 'CREATE_AGENTMIRROR_EXTEND_OK'
export const CREATE_AGENTMIRROR_EXTEND_ERR = 'CREATE_AGENTMIRROR_EXTEND_ERR'
export const DELETE_AGENTMIRROR_HP_OK = 'DELETE_AGENTMIRROR_HP_OK'
export const DELETE_AGENTMIRROR_HP_ERR = 'DELETE_AGENTMIRROR_HP_ERR'
export const UNAGENTMIRROR_HP_ERR = 'UNAGENTMIRROR_HP_ERR'
export const UNAGENTMIRROR_HP_OK = 'UNAGENTMIRROR_HP_OK'
export const HP_AGENTMIRROR_OK = 'HP_AGENTMIRROR_OK'
export const HP_AGENTMIRROR_ERR = 'HP_AGENTMIRROR_ERR'
export const ECHO_HP_AGENTMIRROR = 'ECHO_HP_AGENTMIRROR'
export const CLOSE_HP_AGENTMIRROR = 'CLOSE_HP_AGENTMIRROR'



export function echo_hp_agentmirror(hp,va){
	return{
		type:ECHO_HP_AGENTMIRROR,
		hptask:va,
		echohp:hp
	}
}
export function close_hp_agentmirror(){
	return{
		type:CLOSE_HP_AGENTMIRROR
	}
}
export function delete_agentmirror_hp_err(err){
	return{
		type:DELETE_AGENTMIRROR_HP_ERR,
		err
	}
}
export function delete_agentmirror_hp_ok(body){
	return{
		type:DELETE_AGENTMIRROR_HP_OK,
		deletehp:body
	}
}
export function unagentmirror_hp_ok(body){
	return{
		type:UNAGENTMIRROR_HP_OK,
		unhp:body
	}
}
export function unagentmirror_hp_err(err){
	return{
		type:UNAGENTMIRROR_HP_ERR,
		err
	}
}
export function hp_agentmirror_ok(body){
	return{
		type:HP_AGENTMIRROR_OK,
		hpmirror:body
	}
}
export function hp_agentmirror_err(err){
	return{
		type:HP_AGENTMIRROR_ERR,
		err
	}
}
export function hp_agentmirror(hp){
	console.log(hp)
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([username,password])
		api.post('/agentmirrorhp/'+hp.id+'/mirror',
		{credentials: 'include', mode: 'cors', headers: {'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
		body: JSON.stringify({
				agentname:hp.agentname,
				vgname:hp.vgname,
				diskname:hp.diskname
		})},
		(err,res,body)=>{
			if(err){
				dispatch(hp_agentmirror_err(err))
				add_operation({
					content:'hp镜像：'+hp.agentname,
					result:'failed'
				})
				message.error('操作失败')
				return false
			}
			if(body.result==undefined){
				dispatch(hp_agentmirror_ok(body))
				add_operation({
					content:'hp镜像：'+hp.agentname,
					result:'success'
				})
				message.success('操作成功')
				dispatch(close_hp_agentmirror())

			}else{
				dispatch(hp_agentmirror_ok(body.result))
				add_operation({
					content:'hp镜像：'+hp.agentname,
					result:'success'
				})
				message.success('操作成功')
				dispatch(close_hp_agentmirror())
			}
		})
	}

}
export function unagentmirror_hp(unhp){
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([username,password])
		api.post('/agentmirrorhp/'+unhp.id+'/unmirror',
		{credentials: 'include', mode: 'cors', headers: {'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
		body: JSON.stringify({
				agentname:unhp.agentname,
				vgname:unhp.vgname,
				diskname:unhp.diskname
		})},(err,res,body)=>{
			if(err){
				dispatch(unagentmirror_hp_err(err))
				add_operation({
					content:'取消hp镜像：'+unhp.agentname,
					result:'failed'
				})
				message.error('操作失败')
				return false
			}
			if(body.result==undefined){
				dispatch(unagentmirror_hp_ok(body))
				add_operation({
					content:'取消hp镜像：'+unhp.agentname,
					result:'success'
				})
				message.success('操作成功')
				dispatch(close_hp_agentmirror())

			}else{
				dispatch(unagentmirror_hp_ok(body.result))
				add_operation({
					content:'取消hp镜像：'+unhp.agentname,
					result:'success'
				})
				message.success('操作成功')
				dispatch(close_hp_agentmirror())
			}
		})
	}		
}
export function delete_agentmirror_hp(dehp){
	return function(dispatch) {
		let api = new API({
			baseURI:restapi
		})
		api.auth([username,password])
		api.post('/agentmirrorhp/'+dehp.id+'/remove',
		{credentials: 'include', mode: 'cors', headers: {'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
		body: JSON.stringify({
				agentname:dehp.agentname,
				vgname:dehp.vgname,
				volumename:dehp.volumename,
				islast:dehp.islast=='True'?true:false,
		})},(res,err,body)=>{
			if(err){
				dispatch(hp_agentmirror_err(err))
				add_operation({
					content:'删除hp镜像：'+dehp.vgname,
					result:'failed'
				})
				message.error('操作失败')
				return false
			}
			if(body.result==undefined){
				dispatch(hp_agentmirror_ok(body))
				add_operation({
					content:'删除hp镜像：'+dehp.vgname,
					result:'success'
				})
				message.success('操作成功')
				dispatch(close_remove_agentmirror())

			}else{
				dispatch(hp_agentmirror_ok(body.result))
				add_operation({
					content:'删除hp镜像：'+dehp.vgname,
					result:'success'
				})
				message.success('操作成功')
				dispatch(close_remove_agentmirror())

			}
		})
	}
}

export function toggle_agentmirror(selectedRows,selectedRowKeys){
	return{
		type:TOGGLE_AGENTMIRROR,
		selectedAgentmirror:[...selectedRows],
		selectedRowKeys:[selectedRowKeys],
	}
}
export function echo_create_agentmirror(){
	return{
		type:ECHO_CREATE_AGENTMIRROR
	}
}
export function close_create_agentmirror(){
	return{
		type:CLOSE_CREATE_AGENTMIRROR
	}
}
export function request_agentmirror(par){
	return{
		type:REQUEST_AGENTMIRROR,
		par
	}
}
export function receive_agentmirror(body){
	return{
		type:RECEIVE_AGENTMIRROR,
		agentmirror:body,

	}
}
export function receive_agentmirror_err(err){
	return{
		type:RECEIVE_AGENTMIRROR_ERR,
		err
	}
}
export function fetch_agentmirror(){
	const params={'baseURI':restapi,'auth':auth,'searchKey':''}
	return function(dispatch){
		dispatch(request_agentmirror());
		let api = new API({
			baseURI:params.baseURI
		});
		api.auth([params.auth.username,params.auth.password]);
		api.get('/agentmirror'+'?ordering=-id'+'&limit=999', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if(res.status == 200){
            	console.log(body)
            	if(body.results == undefined){
            		dispatch(receive_agentmirror(body))
            	}else{
            		dispatch(receive_agentmirror(body.results))
            	}
            }else{
            	dispatch(receive_agentmirror_err(err))
            }

        })
	}
}
export function create_agentmirror_ok(body){
	return{
		type:CREATE_AGENTMIRROR_OK,
		createAgentmirror:body
	}
}
export function create_agentmirror_err(){
	return{
		type:CREATE_AGENTMIRROR_ERR
	}
}
export function create_agentmirror(agentmirror){
	console.log(agentmirror)
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([auth.username,auth.password])
		api.post('/agentmirror',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
			body: JSON.stringify({
				agentname:agentmirror.agentname,
				vgname:agentmirror.vgname,
				sourcedisk:agentmirror.sourcedisk,
				destdisk:agentmirror.destdisk==undefined?'':agentmirror.destdisk,
				size:agentmirror.size,
			})
		}, (err, res, body) => {
			if (err) {
                // console.log(saltid)
                dispatch(create_agentmirror_err(err))
                dispatch(add_operation({
                    content:'创建卷组镜像:'+ agentmirror.vgname,
                    result:'failed'

                }))
                message.error('操作失败');
                return false;

            } else {
                if (res.status == 201) {
                    dispatch(create_agentmirror_ok(body))
                    dispatch(add_operation({
                        content:'创建卷组镜像:'+agentmirror.vgname,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(close_create_agentmirror())
                } else {
                    dispatch(create_agentmirror_err(err))
                    dispatch(add_operation({
                        content:'创建卷组镜像:'+ agentmirror.vgname,
                        result:'failed'

                    }))
                    message.error('操作失败');
                }
            }

		})
	}
}

export function refresh_modal_err(err){
	return{
		type:REFRESH_MODAL_ERR,
		err
	}
}
export function refresh_modal_ok(body){
	return{
		type:REFRESH_MODAL_OK,
		body
	}
}

export function refresh_modal(id,agentname,vgname){
	return function(dispatch){
		let api=new API({
			baseURI:restapi
		})
		api.auth([auth.username,auth.password])
		api.post('/agentmirror/' + id + '/refresh',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
			body: JSON.stringify({
				agentname:agentname,
				vgname:vgname,
			})
		}, (err, res, body) => {
			if (err) {
                // console.log(saltid)
                dispatch(refresh_modal_err(err))
                dispatch(add_operation({
                    content:'刷新卷组镜像:'+ vgname,
                    result:'failed'

                }))
                message.error('操作失败');
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(refresh_modal_ok(body))
                    dispatch(add_operation({
                        content:'刷新卷组镜像:'+vgname,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(fetch_agentmirror())
                } else {
                    dispatch(refresh_modal_err(err))
                    dispatch(add_operation({
                        content:'刷新卷组镜像:'+vgname,
                        result:'failed'

                    }))
                    message.error('操作失败');
                }
            }
		})
	}

}

export function echo_remove_agentmirror (re){
	return{
		type:ECHO_REMOVE_AGENTMIRROR,
		remove:re
	}
}
export function close_remove_agentmirror(){
	return{
		type:CLOSE_REMOVE_AGENTMIRROR,
	}
}
export function remove_agentmirror_ok(body){
	return {
		type:REMOVE_AGENTMIRROR_OK,
		removeAgentmirror:body
	}
}
export function remove_agentmirror_err(err){
	return{
		type:REMOVE_AGENTMIRROR_ERR,
		err
	}
}
export function remove_agentmirror(remove){
	console.log(remove)
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([auth.username,auth.password])
		api.post('/agentmirror/'+remove.id+'/remove',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
			body: JSON.stringify({
				agentname:remove.agentname,
				vgname:remove.vgname,
				volumename:remove.volumename,
				islast:remove.islast=='True'?true:false,
			})
		}, (err, res, body) => {
			if (err) {
                // console.log(saltid)
                dispatch(remove_agentmirror_err(err))
                dispatch(add_operation({
                    content:'删除卷组镜像:'+remove.vgname,
                    result:'failed'

                }))
                message.error('操作失败');
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(remove_agentmirror_ok(body))
                    dispatch(add_operation({
                        content:'删除卷组镜像:'+remove.vgname,
                        result:'success'
                    }))
                    dispatch(close_remove_agentmirror())
                    message.success('操作成功')
                } else {
                    dispatch(remove_agentmirror_err(err))
                    dispatch(add_operation({
                        content:'删除卷组镜像:'+remove.vgname,
                        result:'failed'

                    }))
                    message.error('操作失败');
                }
            }
		})
		
	}
}

export function agentmirror_mirror_err(err){
	return{
		type:AGENTMIRROR_MIRROR_ERR,
		err
	}
}
export function agentmirror_mirror_ok(body){
	return{
		type:AGENTMIRROR_MIRROR_OK,
		body 
	}
}
export function agentmirror_mirror(id,agentname,vgname){
	return function (dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([auth.username,auth.password])
		api.post('/agentmirror/' + id + '/mirror',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
			body: JSON.stringify({
				agentname:agentname,
				vgname:vgname,
			})
		}, (err, res, body) => {
			if (err) {
                // console.log(saltid)
                dispatch(agentmirror_mirror_err(err))
                dispatch(add_operation({
                    content:'开始卷组镜像:'+ vgname,
                    result:'failed'

                }))
                message.error('操作失败');
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(agentmirror_mirror_ok(body))
                    dispatch(add_operation({
                        content:'开始卷组镜像:'+vgname,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(fetch_agentmirror())
                } else {
                    dispatch(agentmirror_mirror_err(err))
                    dispatch(add_operation({
                        content:'开始卷组镜像:'+vgname,
                        result:'failed'

                    }))
                    message.error('操作失败');
                }
            }
		})
	}
}
export function close_agentmirror_extend(){
	return{
		type:CLOSE_AGENTMIRROR_EXTEND
	}
}
export function echo_agentmirror_extend(extend){
	return{
		type:ECHO_AGENTMIRROR_EXTEND,
		extend

	}
}
export function create_agentmirror_extend_ok(body){
	return{
		type:CREATE_AGENTMIRROR_EXTEND_OK,
		extend:body
	}
}
export function create_agentmirror_extend_err(err){
	return {
		type:CREATE_AGENTMIRROR_EXTEND_ERR,
		err
	}
}
export function agentmirror_extend(id,extend){
	return function(dispatch){
		let api =new API({
			baseURI:restapi
		})
		api.auth([auth.username,auth.password])
		api.post('/agentmirror/' + id + '/mirror',
			{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
			body: JSON.stringify({
				agentname:extend.agentname,
				vgname:extend.vgname,
				volumename:extend.volumename,
			})
		}, (err, res, body) => {
			if (err) {
                // console.log(saltid)
                dispatch(create_agentmirror_extend_err(err))
                dispatch(add_operation({
                    content:'添加卷:'+ volumename,
                    result:'failed'

                }))
                message.error('操作失败');
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(create_agentmirror_extend_ok(body))
                    dispatch(add_operation({
                        content:'添加卷:'+volumename,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(close_agentmirror_extend())
                    dispatch(fetch_agentmirror())
                } else {
                    dispatch(create_agentmirror_extend_err(err))
                    dispatch(add_operation({
                        content:'添加卷:'+volumename,
                        result:'failed'

                    }))
                    message.error('操作失败');
                }
            }
		})
	}
}