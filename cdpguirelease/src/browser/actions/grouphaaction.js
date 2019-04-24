import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,username,password,} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const ECHO_AGENTHA_MODAL = 'ECHO_AGENTHA_MODAL'
export const CLOSE_AGENTHA_MODAL='CLOSE_AGENTHA_MODAL'
export const CREATE_AGENTHA_OK = 'CREATE_AGENTHA_OK'
export const CREATE_AGENTHA_ERR = 'CREATE_AGENTHA_ERR'
export const DELETE_AGENTHA_ERR = 'DELETE_AGENTHA_ERR'
export const DELETE_AGENTHA_OK = 'DELETE_AGENTHA_OK'
export const REQUEST_AGENTHA_OK = 'REQUEST_AGENTHA_OK'
export const RECEIVE_AGENTHA_OK = 'RECEIVE_AGENTHA_OK'
export const RECEIVE_AGENTHA_ERR = 'RECEIVE_AGENTHA_ERR'

export const ECHO_GROUPHA_MODAL = 'ECHO_GROUPHA_MODAL'
export const CLOSE_GROUPHA_MODAL = 'CLOSE_GROUPHA_MODAL'
export const CREATE_GROUPHA_OK = 'CREATE_GROUPHA_OK'
export const CREATE_GROUPHA_ERR = 'CREATE_GROUPHA_ERR'
export const DELETE_GROUPHA_OK = 'DELETE_GROUPHA_OK'
export const DELETE_GROUPHA_ERR = 'DELETE_GROUPHA_ERR'
export const REQUEST_GROUPHA_OK = 'REQUEST_GROUPHA_OK'
export const RECEIVE_GROUPHA_OK = 'RECEIVE_GROUPHA_OK'
export const RECEIVE_GROUPHA_ERR = 'RECEIVE_GROUPHA_ERR'

export const GET_GROUPHA_STATUS = 'GET_GROUPHA_STATUS'
export const GET_GROUPHA_STATUS_OK = 'GET_GROUPHA_STATUS_OK'
export const GET_GROUPHA_STATUS_ERR = 'GET_GROUPHA_STATUS_ERR'
export const START_GROUPHA = 'START_GROUPHA'
export const START_GROUPHA_OK = 'START_GROUPHA_OK'
export const START_GROUPHA_ERR = 'START_GROUPHA_ERR'
export const STOP_GROUPHA = 'STOP_GROUPHA'
export const STOP_GROUPHA_ERR = 'STOP_GROUPHA_ERR'
export const STOP_GROUPHA_OK = 'STOP_GROUPHA_OK'

export const SET_STOP_GROUP_HA_OK = 'SET_STOP_GROUP_HA_OK'
export const SET_STOP_GROUP_HA_ERR = 'SET_STOP_GROUP_HA_ERR'
export const SET_START_GROUP_HA_OK = 'SET_START_GROUP_HA_OK'
export const SET_START_GROUP_HA_ERR = 'SET_START_GROUP_HA_ERR'

export const MODIFY_GROUP_HA_OK = 'MODIFY_GROUP_HA_OK'
export const MODIFY_GROUP_HA_ERR = 'MODIFY_GROUP_HA_ERR'
export const ECHO_MODIFY_GROUPHA_MODAL = 'ECHO_MODIFY_GROUPHA_MODAL'
export const CLOSE_MODIFY_GROUPHA_MODAL = 'CLOSE_MODIFY_GROUPHA_MODAL'

//demoted promoted agentha
export const ECHO_SET_PROMOTED = 'ECHO_SET_PROMOTED'
export const CLOSE_SET_PROMOTED = 'CLOSE_SET_PROMOTED'
export const SET_PROMOTED_OK = 'SET_PROMOTED_OK'
export const SET_PROMOTED_ERR = 'SET_PROMOTED_ERR'







//demoted promoted agentha
export function echo_set_promoted(value){
	return{
		type:ECHO_SET_PROMOTED,
		setpromoted:value,
	}
}
export function close_set_promoted(){
	return{
		type:CLOSE_SET_PROMOTED
	}
}
export function set_promoted_err(err){
	return{
		type:SET_PROMOTED_ERR,
		err
	}
}
export function set_promoted_ok(body){
	return{
		type:SET_PROMOTED_OK,
		body
	}
}
export function set_promoted(value){
	console.log(value)
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.post('/groupHA/'+value.id+'/demotepromote',{credentials: 'include', mode: 'cors', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' ,'cache-control':'no-cache' },
		body:JSON.stringify({
			promoted_ids:value.promoted,
			demoted_ids:value.demoted
           }) },(err,res,body)=>{
			if (err) {
        	       dispatch(set_promoted_err(err))
        	       message.success('切换失败。')
        	       dispatch(fetch_groupha())
        	       return false
        	   }
        	if (body.results == undefined){
        	    dispatch(set_promoted_ok(body))
        	    message.success('切换成功。')
        	    dispatch(close_set_promoted())
        	}else{
        	    dispatch(set_promoted_ok(body.results))
        	    message.success('切换成功。')
        	    dispatch(close_set_promoted())
        	    
        	}
		})
	}
}
// MODIFY GROUP HA 

export function	echo_modify_groupha_modal(ha,status){
	return{
		type:ECHO_MODIFY_GROUPHA_MODAL,
		echoHa:ha,
		echoStatus:status,

	}
}
export function close_modify_groupha_modal(){
	return{
		type:CLOSE_MODIFY_GROUPHA_MODAL,
	}
}
export function modify_group_ha_ok(body){
	return{
		type:MODIFY_GROUP_HA_OK,
		modifyHa:body
	}
}
export function modify_group_ha_err(err){
	return{
		type:MODIFY_GROUP_HA_ERR,
		err
	}
}
export function modify_ha(ha){
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		});
		api.auth([username,password]);
		api.put('/groupHA/'+ha.id,{credentials: 'include', mode: 'cors', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' ,'cache-control':'no-cache' },
			body:JSON.stringify({
				group:ha.name,
				webip:ha.ip,
				rights:ha.rights,
				pools:ha.pools,
				switched:ha.switched,
				mssed:ha.mssed,
				runagent:ha.runagent,

            })},(err,res,body)=>{
			console.log(err)
			if (err) {
                dispatch(modify_group_ha_err(err))
                dispatch(fetch_groupha())
                message.error('修改HA组失败')
                return false
            }
            if (body.results == undefined){
                dispatch(modify_group_ha_ok(body))
                dispatch(close_modify_groupha_modal())
                message.success('修改HA组成功')

            }else{
                dispatch(modify_group_ha_ok(body.results))
                dispatch(close_modify_groupha_modal())
                message.success('修改HA组成功')

            }
		})
	}
}

//STOP OR START EVERY GROUP

export function set_stop_group_ha_ok(body){
	return{
		type:SET_STOP_GROUP_HA_OK,
		grouphaoff:body
	}
}
export function set_stop_group_ha_err(body){
	return{
		type:SET_STOP_GROUP_HA_ERR,
		err
	}
}
export function set_stop_group_ha(id){
	console.log(id)
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.post('/groupHA/'+id+'/disableha',{credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' },
		body:JSON.stringify({
				on_off:false,
            }) },(err,res,body)=>{
			if (err) {
                dispatch(set_stop_group_ha_err(err))
                message.error('停止部署失败')
                dispatch(fetch_groupha())
                return false
            }
            if (body.results == undefined){
                dispatch(set_stop_group_ha_ok(body))
                message.success('停止部署成功')

            }else{
                dispatch(set_stop_group_ha_ok(body.results))
                message.success('停止部署成功')

            }
		})
	}
}

export function set_start_group_ha_ok(body){
	return{
		type:SET_START_GROUP_HA_OK,
		grouphaon:body
	}
}
export function set_start_group_ha_err(body){
	return{
		type:SET_START_GROUP_HA_ERR,
		err
	}
}
export function set_start_group_ha(id){
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.post('/groupHA/'+id+'/enableha',{credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' },
		body:JSON.stringify({
				on_off:true,
            }) },(err,res,body)=>{
			if (err) {
                dispatch(set_start_group_ha_err(err))
                message.success('开始部署失败停止')
                dispatch(fetch_groupha())
                return false
            }
            if (body.results == undefined){
                dispatch(set_start_group_ha_ok(body))
                message.success('开始部署成功')

            }else{
                dispatch(set_start_group_ha_ok(body.results))
                message.success('开始部署成功')

            }
		})
	}
}

//STOP OR START ALL GROUP
export function get_groupha_status_ok(body){
	return {
		type :'GET_GROUPHA_STATUS_OK',
		grouphastatus:body.result
	}

}
export function get_groupha_status_err(err){
	return {
		type:'GET_GROUPHA_STATUS_ERR',
		err
	}
}
export function get_groupha_status(){
	return function (dispatch){
		let api = new API({
			baseURI:restapi,
		});
		api.auth([username,password]);
		api.get('/groupHA/statusha',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
			if (err) {
                dispatch(get_groupha_status_err(err))
                return false
            }
            if (body.results == undefined){
                dispatch(get_groupha_status_ok(body))
            }else{
                dispatch(get_groupha_status_ok(body.results))
            }
		})
	}
}
export function start_groupha_ok(body){
	return {
		type:'START_GROUPHA_OK',
		startgroupha:body.result
	}
}
export function start_groupha_err(err){
	return{
		type:'START_GROUPHA_ERR',
		err
	}
}
export function start_groupha(){
	return function (dispatch){
		let api = new API({
			baseURI:restapi,
		});
		api.auth([username,password]);
		api.get('/groupHA/startha',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
			if (err) {
                dispatch(start_groupha_err(err))
                message.success('全部开始部署失败')

                return false
            }
            if (body.results == undefined){
                dispatch(start_groupha_ok(body))
                message.success('全部开始部署成功')

            }else{
                dispatch(start_groupha_ok(body.results))
                message.success('全部开始部署成功')

            }
		})
	}
}
export function stop_groupha_ok(body){
	return {
		type:'STOP_GROUPHA_OK',
		stopgroupha:body.result
	}
}
export function stop_groupha_err(err){
	return {
		type:'STOP_GROUPHA_ERR',
		err
	}
}
export function stop_groupha(){
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([username,password])
		api.get('/groupHA/stopha',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
			if (err) {
                dispatch(stop_groupha_err(err))
                message.success('全部停止部署失败')
                return false
            }
            if (body.results == undefined){
                dispatch(stop_groupha_ok(body))
                message.success('全部停止部署成功')

            }else{
                dispatch(stop_groupha_ok(body.results))
                message.success('全部停止部署成功')

                
            }
		})
	}
}




//agentha
export function request_agentha_ok(){
	return{
		type:'REQUEST_AGENTHA_OK'
	}
}
export function receive_agentha_ok(body){
	return{
		type:'RECEIVE_AGENTHA_OK',
		agentha:body
	}
}
export function receive_agentha_err(err){
	return{
		type:'RECEIVE_AGENTHA_ERR',
		err
	}
}
export function fetch_agentha(){
	return function(dispatch){
		dispatch(request_agentha_ok())
		let api = new API({
			baseURI:restapi
		})
		api.auth([username,password])
		api.get('/agentHA',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
			if (err) {
                dispatch(receive_agentha_err(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_agentha_ok(body))
            }else{
                dispatch(receive_agentha_ok(body.results))
                
            }
		})
	}
} 
export function echo_agentha_modal(body){
	return{
		type:'ECHO_AGENTHA_MODAL',
		echoagentha:body,
	}
}
export function close_agentha_modal(){
	return{
		type:'CLOSE_AGENTHA_MODAL'
	}
}
export function create_agentha_err(err){
	return{
		type:'CREATE_AGENTHA_ERR',
		err:err,
	}
}
export function create_agentha_ok(body){
	return{
		type:'CREATE_AGENTHA_OK',
		createagentha:body,
	}
}
export function create_agentha(ha){
	console.log(ha)
	return function(dispatch){
		let api = new API({
		 	baseURI:restapi
		})
		api.auth([username,password])
		api.post('/agentHA',{
			credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
			body:JSON.stringify({
				agent:ha.agent,
				agentstatus:ha.agentstatus,
				saltstatus:ha.saltstatus,
				rgt:ha.rgt,
				promotedstatus:ha.promotedstatus,
				demotescript:ha.demotescript,
				promotescript:ha.promotescript,
				nic:ha.nic,
				connectmode:ha.connectmode,
				ip:ha.agentip,
				username:ha.username,
				passwd:ha.password,
				group:ha.group,
				drbdrole:ha.drbdrole,
            })},(err,res,body)=>{
				if (err) {
            	    dispatch(create_agentha_err(err))
            	    dispatch(add_operation({
            	        content:'新建客户端HA:'+ha.agent,
            	        result:'failed'
            	    }))
            	    message.error("操作失败");
            	    return false;
            	    
            	}
            	if(res.status == 201){
            	    dispatch(close_agentha_modal())
            	    dispatch(create_agentha_ok(body))
            	    dispatch(add_operation({
            	        content:'新建客户端HA:'+ha.agent,
            	        result:'success'
            	    }))
            	    message.success("操作成功");
            	}else{
            	    dispatch(create_agentha_err(err))
            	    dispatch(add_operation({
            	        content:'新建客户端HA:'+ha.agent,
            	        result:'failed'
            	    }))
            	    message.error("操作失败")
            	}
            }
         )
	}
}

export function delete_agentha_ok(body){
	return{
		type:'DELETE_AGENTHA_OK',
		deleteagentha:body,
	}
}
export function delete_agentha_err(err){
	return{
		type:'DELETE_AGENTHA_ERR',
		err
	}
}
export function delete_agentha(agentha){
	return function(dispatch){
		let api = new API({
			baseURI:agentha.url
		})
		api.auth([username,password])
		api.del('',{ credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_agentha_ok(agentha))
                    dispatch(add_operation({
                        content:'删除客户端HA:'+ agentha.agent,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_agentha_err(err))
                    dispatch(add_operation({
                        content:'删除客户端HA:'+agentha.agent,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                 
            })
		
	}
}

//groupha

export function request_groupha_ok(){
	return{
		type:'REQUEST_GROUPHA_OK'
	}
}
export function receive_groupha_ok(body){
	return{
		type:'RECEIVE_GROUPHA_OK',
		groupha:body
	}
}
export function receive_groupha_err(err){
	return{
		type:'RECEIVE_GROUPHA_ERR',
		err
	}
}
export function fetch_groupha(){
	return function(dispatch){
		dispatch(request_groupha_ok())
		let api = new API({
			baseURI:restapi
		})
		api.auth([username,password])
		api.get('/groupHA',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
			if (err) {
                dispatch(receive_groupha_err(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_groupha_ok(body))
            }else{
                dispatch(receive_groupha_ok(body.results))
                
            }
		})
	}
} 
export function echo_groupha_modal(){
	return{
		type:'ECHO_GROUPHA_MODAL',
	}
}
export function close_groupha_modal(){
	return{
		type:'CLOSE_GROUPHA_MODAL'
	}
}
export function create_groupha_err(err){
	return{
		type:'CREATE_GROUPHA_ERR',
		err:err,
	}
}
export function create_groupha_ok(body){
	return{
		type:'CREATE_GROUPHA_OK',
		creategroupha:body,
	}
}
export function create_groupha(ha){
	return function(dispatch){
		let api = new API({
		 	baseURI:restapi
		})
		api.auth([username,password])
		api.post('/groupHA',{
			credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
			body:JSON.stringify({
				group:ha.name,
				webip:ha.ip,
				rights:ha.rights,
				pools:ha.pools,
				switched:ha.switched,
				mssed:ha.mssed,
				runagent:ha.runagent,
				on_off:ha.onoff,
            })},(err,res,body)=>{
				if (err) {
            	    dispatch(create_groupha_err(err))
            	    dispatch(add_operation({
            	        content:'新建组HA:'+ha.name,
            	        result:'failed'
            	    }))
            	    message.error("操作失败");
            	    return false;
            	    
            	}
            	if(res.status == 201){
            	    dispatch(close_groupha_modal())
            	    dispatch(create_groupha_ok(body))
            	    dispatch(add_operation({
            	        content:'新建组HA:'+ha.name,
            	        result:'success'
            	    }))
            	    message.success("操作成功");
            	}else{
            	    dispatch(create_groupha_err(err))
            	    dispatch(add_operation({
            	        content:'新建组HA:'+ha.name,
            	        result:'failed'
            	    }))
            	    message.error("操作失败")
            	}
            }
         )
	}
}
export function delete_groupha_ok(body){
	return{
		type:'DELETE_GROUPHA_OK',
		deletegroupha:body
	}
}
export function delete_groupha_err(err){
	return{
		type:'DELETE_GROUPHA_ERR',
		err
	}
}
export function delete_groupha(groupha){
	console.lo
	return function(dispatch){
		let api = new API({
			baseURI:groupha.url
		})
		api.auth([username,password])
		api.del('',{ credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_groupha_ok(groupha))
                    dispatch(add_operation({
                        content:'删除客户端HA:'+ groupha.group,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_grouopha_err(body))
                    dispatch(add_operation({
                        content:'删除客户端HA:'+groupha.group,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                 
            })
	}
	
}



