import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,username,password} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'



export const REQUEST_AUDITLOGS = 'REQUEST_AUDITLOGS'
export const RECEIVE_AUDITLOGS = 'RECEIVE_AUDITLOGS'
export const RECEIVE_AUDITLOGS_ERROR = 'RECEIVE_AUDITLOGS_ERROR'


export const TOGGLE_AUDITLOGS = 'TOGGLE_AUDITLOGS'

export const DELETE_AUDITLOGS_OK = 'DELETE_AUDITLOGS_OK'
export const DELETE_AUDITLOGS_ERR = 'DELETE_AUDITLOGS_ERR'

export const REQUEST_SEARCH_AUDITLOGS ='REQUEST_SEARCH_AUDITLOGS'
export const SEARCH_AUDITLOGS_OK = 'SEARCH_AUDITLOGS_OK'
export const SEARCH_AUDITLOGS_ERR = 'SEARCH_AUDITLOGS_ERR'


export function toggle_auditlogs(selectedRowKeys,selectedRows){
    return{
        type:TOGGLE_AUDITLOGS,
        selectedAuditlogs:[...selectedRows],
        selectedRowKeys:[...selectedRowKeys],
    }
}

export function request_auditlogs(){
    return{
        type:REQUEST_AUDITLOGS
    }
}
export function receive_auditlogs(body){
    return{
        type:RECEIVE_AUDITLOGS,
        auditlogs:body
    }
}
export function receive_auditlogs_error(err){
    return{
        type:RECEIVE_AUDITLOGS_ERROR,
        err
    }
}
export function fetch_auditlogs(){
    const date = new Date()
    const time = date.getTime()
    return function(dispatch){
        dispatch(request_auditlogs())
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/auditlogs?'+'limit=999'+ 'time='+time,
            {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache'} },
            (err,res,body)=>{
                if (err) {
                    dispatch(receive_auditlogs_error(err))
                    return false
                }
                if (body.results == undefined){
                    dispatch(receive_auditlogs(body))
                }else{
                    dispatch(receive_auditlogs(body.results))
                }
            }

        )
    }
}
export function delete_auditlogs_err(err){
    return{
        type:DELETE_AUDITLOGS_ERR,
        err
    }
}
export function delete_auditlogs_ok(body){
    console.log(body)
    return{
        type:DELETE_AUDITLOGS_OK,
        deleteAuditlogs:body
    }
}

export function delete_auditlogs(id){
   
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        if(id==undefined){
            api.del('/auditlogs',
                {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache'} },
                (err,res,body)=>{
                    if(err){
                        dispatch(delete_auditlogs_err(err))
                        dispatch(add_operation({
                            content: '删除审计系统日志',
                            result: 'failed'
                        }))
                        message.error("操作失败");
                        return false
                    }
                    if(body.results==undefined){
                        dispatch(delete_auditlogs_ok(body))
                        dispatch(add_operation({
                            content: '删除审计系统日志',
                            result: 'success'
                        }))
                        message.success("操作成功");
                        dispatch(fetch_auditlogs())
                    }else{
                        dispatch(delete_auditlogs_ok(body.results))
                        dispatch(add_operation({
                            content: '删除审计系统日志',
                            result: 'success'
                        }))
                        message.success("操作成功");
                        dispatch(fetch_auditlogs())

                    }
                }
            )
        }else{
            api.del('/auditlogs'+'/'+id,
                {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache'} },
                (err,res,body)=>{
                    console.log(body)
                    if(err){
                        dispatch(delete_auditlogs_err(err))
                        dispatch(add_operation({
                            content: '删除审计系统日志',
                            result: 'failed'
                        }))
                        message.error("操作失败");
                        return false
                    }
                    if(body.results==undefined){
                        dispatch(delete_auditlogs_ok(body))
                        dispatch(add_operation({
                            content: '删除审计系统日志',
                            result: 'success'
                        }))
                        message.success("操作成功");
                    }else{
                        dispatch(delete_auditlogs_ok(body.results))
                        dispatch(add_operation({
                            content: '删除审计系统日志',
                            result: 'success'
                        }))
                        message.success("操作成功");
                    }
                }
            )
        }
    
    }
}
export function search_auditlogs_ok(body){
    return{
        type:SEARCH_AUDITLOGS_OK,
        searchAuditlogs:body
    }
}
export function search_auditlogs_err(err){
    return{
        type:SEARCH_AUDITLOGS_ERR,
        err
    }
}
export function request_search_auditlogs(){
    return{
        type:REQUEST_SEARCH_AUDITLOGS,
    }
}
export function search_auditlogs(starttime,status,endtime){
    return function(dispatch){
        dispatch(request_search_auditlogs())
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/auditlogs'+'?'+'exitcode='+status+'&'+'start_datetime='+starttime+'&'+'end_datetime='+endtime,
            {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache'} },
            (err,res,body)=>{
                if(err){
                    dispatch(search_auditlogs_err(err))
                    return false
                }
                if(body.results==undefined){
                    dispatch(search_auditlogs_ok(body))
                }else{
                    dispatch(search_auditlogs_ok(body.results))
                }
            }
        )
    }
}



