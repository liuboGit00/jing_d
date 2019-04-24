import API from 'fetch-api'
import {Modal,message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,clonepath,snapshotspath,username,password,agentlistpath,registerpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const REQUEST_SCRIPT = 'REQUEST_SCRIPT'
export const RECEIVE_SCRIPT ='RECEIVE_SCRIPT'
export const RECEIVE_SCRIPT_ERR = 'RECEIVE_SCRIPT_ERR'
export const UPDATE_SCRIPT_OK = 'UPDATE_SCRIPT_OK'
export const UPDATE_SCRIPT_ERR = 'UPDATE_SCRIPT_ERR'
export const CREATE_SCRIPT_OK = 'CREATE_SCRIPT_OK'
export const CREATE_SCRIPT_ERR = 'CREATE_SCRIPT_ERR'
export const TOGGLE_SCRIPT = 'TOGGLE_SCRIPT'
export const DELETE_SCRIPT_ERR = 'DELETE_SCRIPT_ERR'
export const DELETE_SCRIPT_OK = 'DELETE_SCRIPT_OK'
export const ECHO_CREATE_SCRIPT = 'ECHO_CREATE_SCRIPT'
export const CLOSE_CREATE_SCRIPT = 'CLOSE_CREATE_SCRIPT'
export const ECHO_UPDATE_SCRIPT = 'ECHO_UPDATE_SCRIPT'
export const RUN_SCRIPT_OK = 'RUN_SCRIPT_OK'
export const RUN_SCRIPT_ERR = 'RUN_SCRIPT_ERR'
export const REQUEST_RUN_SCRIPT = 'REQUEST_RUN_SCRIPT'
export const ECHO_RUN_SCRIPT = 'ECHO_RUN_SCRIPT'
export const CLOSE_RUN_SCRIPT = 'CLOSE_RUN_SCRIPT'



export function echo_run_script(){
    return{
        type:ECHO_RUN_SCRIPT
    }
}
export function close_run_script(){
    return{
        type:CLOSE_RUN_SCRIPT
    }
}
export function request_run_script(){
    return{
        type:REQUEST_RUN_SCRIPT,
    }
}
export function run_script_ok(body){
    return{
        type:RUN_SCRIPT_OK,
        runScript:body,
    }
}
export function run_script_err(err){
    return{
        type:RUN_SCRIPT_ERR,
        err
    }
}
export  function run_script(script){
    // console.log('/scripts/'+script.id+'/run')
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/scripts/'+script.id+'/run',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if(res.status==200){
                dispatch(run_script_ok(body))
                add_operation({
                    content:'调试客户端脚本:'+script.name,
                    result:'success'
                })
            }else{
                dispatch(run_script_err(err))
                add_operation({
                    content:'调试客户端脚本:'+script.name,
                    result:'failed'
                })
                message.error('操作失败')
            }
        })
    }
}



export function echo_update_script(updatecontent){
	return{
		type:ECHO_UPDATE_SCRIPT,
		updatecontent
	}
}

export function toggle_script(selectedRows,selectedRowKeys){
	return{
		type:TOGGLE_SCRIPT,
		selectedScript:[...selectedRows],
		selectedRowKeys:[...selectedRowKeys]
	}
}

export function request_script(par){
	return{
		type:REQUEST_SCRIPT,
		par
	}
}
export function receive_script(body){
	return{
		type:RECEIVE_SCRIPT,
		script:body
	}
}
export function receive_script_err(err){
	return{
		type:RECEIVE_SCRIPT_ERR,
		err
	}
}

export function fetch_script(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_script(params))
         let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/scripts'+'?ordering=-id', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_script_err(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_script(body))
            }else{
                dispatch(receive_script(body.results))
            }
        })

    }
}
export function echo_create_script(){
	return{
		type:ECHO_CREATE_SCRIPT
	}
}
export function close_create_script(){
	return{
		type:CLOSE_CREATE_SCRIPT
	}
}
export function create_script_err(err){
	return{
		type:CREATE_SCRIPT_ERR,
		err
	}
}
export function create_script_ok(script){
	return{
		type:CREATE_SCRIPT_OK,
		createScript:script
	}
}
export function create_script(script){
    const params={'baseURI':restapi,'username':username,'password':password};
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(params.username,params.password);
        api.post('/scripts', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
            	'name':script.name,
				'agent':script.agents,
				'scriptcontent':script.scriptcontent,
				'shelltype':script.shelltype,
				'when':script.when,
				'runas':script.runas,
				'passwd':script.passwd,
				'args':script.args,
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_script_err(err))
                dispatch(add_operation({
                    content:'添加客户端脚本:'+script.name ,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(create_script_ok(body))
                    dispatch(add_operation({
                        content:'添加客户端脚本:'+script.name ,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(close_create_script())
                } else {
                    dispatch(create_script_err(err))
                    dispatch(add_operation({
                        content:'添加客户端脚本:'+script.name ,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    } 
    
}

export function delete_script_ok(body){
	return{
		type:DELETE_SCRIPT_OK,
		body
	}
}
export function delete_script_err(err){
	return{
		type:DELETE_SCRIPT_ERR,
		err
	}
}
export function delete_script(id,name){
    const params={'baseURI':restapi,'username':username,'password':password};
    return function (dispatch) {
        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.username, params.password]);
        api.del('/scripts/'+id,
            {
                credentials: 'include',
                mode: 'cors',
                headers: { 'Accept': 'application/json' }
            }, (err, res, body) => {
                if (err) {
                    console.log('err', err)
                    dispatch(delete_script_err(params))
                    Modal.error({
                        title: 'CDP系统提示！',
                        content: '删除失败，请联系管理员！',
                    });
                    dispatch(add_operation({
                        content: '删除客户端脚本:'+ name,
                        result: 'failed'
                    }));
                    message.error("操作失败！");
                    return false
                }
                dispatch(delete_script_ok(id))
                dispatch(add_operation({
                    content: '删除客户端脚本:'+ name,
                    result: 'success'
                }));
                message.success("操作成功！");

            })

    }
}
export function update_script_err(err){
	return{
		type:UPDATE_SCRIPT_ERR,
	}
}
export function update_script_ok(update){
	return{
		type:UPDATE_SCRIPT_OK,
		update
	}
}
export function update_script(script){
    const params={'baseURI':restapi,'username':username,'password':password};
	return function(dispatch){
		let api = new API({
			baseURI:restapi
		})
		api.auth([params.username,params.password])
		api.put('/scripts/'+script.id,{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
				'url':script.url,
				'id':script.id,
				'name':script.name,
				'agent':script.agents,
				'scriptcontent':script.scriptcontent,
				'shelltype':script.shelltype,
				'when':script.when,
				'runas':script.runas,
				'passwd':script.passwd,
				'args':script.args,

            })
        }, (err, res, body) => {
            if (err) {
                dispatch(update_script_err(err))
                dispatch(add_operation({
                    content:'修改客户端脚本:'+script.name ,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 200) {
                    dispatch(update_script_ok(body))
                    dispatch(add_operation({
                        content:'修改客户端脚本:'+script.name ,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(close_create_script())
                } else {
                    dispatch(update_script_err(err))
                    dispatch(add_operation({
                        content:'修改客户端脚本:'+script.name ,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        
		})
	}
}