import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,hostpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'
import {create_host} from './hostactions'

export const FETCH_REMOTEMIRRORS = 'FETCH_REMOTEMIRRORS'
export const REQUEST_REMOTEMIRRORS = 'REQUEST_REMOTEMIRRORS'
export const RECEIVE_REMOTEMIRRORS = 'RECEIVE_REMOTEMIRRORS'
export const RECEIVE_REMOTEMIRRORS_ERROR = 'RECEIVE_REMOTEMIRRORS_ERROR'

export const FETCH_REMOTEMIRRORS_TASK = 'FETCH_REMOTEMIRRORS_TASK'
export const REQUEST_REMOTEMIRRORS_TASK = 'REQUEST_REMOTEMIRRORS_TASK'
export const RECEIVE_REMOTEMIRRORS_TASK = 'RECEIVE_REMOTEMIRRORS_TASK'
export const RECEIVE_REMOTEMIRRORS_TASK_ERROR = 'RECEIVE_REMOTEMIRRORS_TASK_ERROR'

export const CREATE_REMOTEMIRRORS = 'CREATE_REMOTEMIRRORS'
export const CREATE_REMOTEMIRRORS_SUCCESS = 'CREATE_REMOTEMIRRORS_SUCCESS'
export const CREATE_REMOTEMIRRORS_ERROR = 'CREATE_REMOTEMIRRORS_ERROR'

export const DELETE_REMOTEMIRRORS = 'DELETE_REMOTEMIRRORS'
export const DELETE_REMOTEMIRRORS_SUCCESS = 'DELETE_REMOTEMIRRORS_SUCCESS'
export const DELETE_REMOTEMIRRORS_ERROR = 'DELETE_REMOTEMIRRORS_ERROR'

export const TOGGLE_REMOTEMIRRORS = 'TOGGLE_REMOTEMIRRORS'

export const ECHO_REMOTEMIRRORS = 'ECHO_REMOTEMIRRORS'
export const CLOSE_REMOTEMIRRORS = 'CLOSE_REMOTEMIRRORS'

//获取目的端主机
export const REQUEST_LOCALHOST = 'REQUEST_LOCALHOST'
export const RECEIVE_LOCALHOST = 'RECEIVE_LOCALHOST'
export const RECEIVE_LOCALHOST_ERROR = 'RECEIVE_LOCALHOST_ERROR'

export const REQUEST_LOCALVOLUME = 'REQUEST_LOCALVOLUME'
export const RECEIVE_LOCALVOLUME = 'RECEIVE_LOCALVOLUME'
export const RECEIVE_LOCALVOLUME_ERROR = 'RECEIVE_LOCALVOLUME_ERROR'

//获取token和url

export const ECHO_TOKENANDURL = 'ECHO_TOKENANDURL'
export const CLOSE_TOKENANDURL = 'CLOSE_TOKENANDURL'
export const REQUEST_TOKENANDURL = 'REQUEST_TOKENANDURL'
export const RECEIVE_TOKENANDURL = 'RECEIVE_TOKENANDURL'
export const RECEIVE_TOKENANDURL_ERROR = 'RECEIVE_TOKENANDURL_ERROR'

//cdp连接时获取主机的名字
export const FETCH_REMOTEMIRRORS_HOST_NAME = 'FETCH_REMOTEMIRRORS_HOST_NAME'

//更新远程镜像
export const UPDATE_REMOTEMIRROR_ERR = 'UPDATE_REMOTEMIRROR_ERR'
export const UPDATE_REMOTEMIRROR_OK = 'UPDATE_REMOTEMIRROR_OK'
export const ECHO_UPDATE_REMOTEMIRROR = 'ECHO_UPDATE_REMOTEMIRROR'
export const CLOSE_UPDATE_REMOTEMIRROR = 'CLOSE_UPDATE_REMOTEMIRROR'

export function echo_update_remotemirror(){
    return{
        type:ECHO_UPDATE_REMOTEMIRROR
    }
}
export function close_update_remotemirror(){
    return{
        type:CLOSE_UPDATE_REMOTEMIRROR,
    }
}
export function update_remotemirror_ok(body){
    return{
        type:UPDATE_REMOTEMIRROR_OK,
        updateremotemirror:body,
    }
}
export function update_remotemirror_err(err){
    return{
        type:UPDATE_REMOTEMIRROR_ERR,
        err
    }
}
export function update_remotemirror(update,auth){
    console.log(update)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.put('/remotemirrors/'+update.id,{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                "srcHost": update.updatesrcHost,
                "dstHost": update.updatedstHost,
                "srcvolid": update.updatesrcvolid,
                "dstvolid": update.updatedstvolid,
                "dstport": update.updatedstport,
                "options": JSON.stringify({"gzip": update.updategzip=='true'?true:false , "max_snap": Number(update.updatemax_snap)}),
                "is_started":update.updatestarted,
            })

        },(err, res, body) => {
                if (err) {
                    dispatch(update_remotemirror_err(err))
                    message.error("更新远程镜像失败")
                    return false
                }
                if (body.results == undefined){
                    dispatch(update_remotemirror_ok(body))

                }else{
                    dispatch(update_remotemirror_ok(body.results))
                    
                }
                message.success("更新远程镜像成功")
                dispatch(close_update_remotemirror())

        })
    }
}


//cdp连接时获取主机的名字
export function  fetch_remotemirrors_host_name(value){
    return{
        type:FETCH_REMOTEMIRRORS_HOST_NAME,
        rehostname:value
    }
}

export function request_localhost(){
    return{
        type:REQUEST_LOCALHOST,
        
    }
}
export function receive_localhost(localhost) {
    return{
        type:RECEIVE_LOCALHOST,
        localhost:localhost,
    }

}
export function receive_localhost_error(params){
    return{
        type:RECEIVE_LOCALHOST_ERROR,
        params
    }


}
export function fetch_localhost(url,token){
    console.log(url,token)
    return function (dispatch) {
        dispatch(request_localhost())
        let api = new API({
            baseURI:url 
        });
        api.get('/hosts'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: {'Authorization': 'Token '+token , 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_localhost_error(err))
                message.error("无法获取CDP主机")

                return false
            }
            if (body.results == undefined){
                dispatch(receive_localhost(body))
            }else{
                dispatch(receive_localhost(body.results))
                
            }

        })

    }
}


//获取和创建目的端的卷

export function request_localvolume(){
    return{
        type:REQUEST_LOCALVOLUME,
        
    }
}
export function receive_localvolume(localvolume) {
    return{
        type:RECEIVE_LOCALVOLUME,
        localvolume:localvolume,
    }

}
export function receive_localvolume_error(params){
    return{
        type:RECEIVE_LOCALVOLUME_ERROR,
        params
    }


}
export function fetch_localvolume(url,token){
    console.log(url,token)
    return function (dispatch) {
        dispatch(request_localvolume())
        let api = new API({
            baseURI:url
        });
        api.get('/volumes'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: {'Authorization': 'Token '+token , 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_localvolume_error(err))
                message.error("无法获取CDP主机卷")

                return false
            }
            if (body.results == undefined){
                dispatch(receive_localvolume(body))
            }else{
                dispatch(receive_localvolume(body.results))
                
            }

        })

    }
}



//  获取remotemirr

export function request_remotemirrors(params){
    return{
        type:REQUEST_REMOTEMIRRORS,
        params
    }
}
export function receive_remotemirrors(remotemirrors) {
    return{
        type:RECEIVE_REMOTEMIRRORS,
        items:remotemirrors,
    }

}
export function receive_remotemirrors_error(params={}){
    return{
        type:RECEIVE_REMOTEMIRRORS_ERROR,
        params
    }


}
export function fetch_remotemirrors(params={'baseURI':restapi,'auth':auth,'searchKey':''}){
    return function (dispatch) {
        dispatch(request_remotemirrors(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/remotemirrors'+'?limit=999', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body.results)
            if (err) {
                dispatch(receive_remotemirrors_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_remotemirrors(body))
                for(let i=0;i<body.length;i++){
                    if(body[i].task==null){
                        continue
                    }else{
                       dispatch(fetch_remotemirrors_task(body[i].task))
                    }
                    
                }

            }else{
                dispatch(receive_remotemirrors(body.results))
                for(let i=0;i<body.results.length;i++){
                    // console.log(body.results[i].task)
                    if(body.results[i].task==null){
                        continue
                    }else{
                        dispatch(fetch_remotemirrors_task(body.results[i].task))
                    }
                }
            }

        })

    }
}

export function toggle_remotemirrors(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_REMOTEMIRRORS,
        selectedRemotemirrors:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_remotemirrors_error(body){
    return{
        type:DELETE_REMOTEMIRRORS_ERROR,
        body
    }
}
export function delete_remotemirrors_success(body){
    return{
        type:DELETE_REMOTEMIRRORS_SUCCESS,
        body 
    }
}
export function delete_remotemirrors(selectedRemotemirrors,auth){
    return function (dispatch) {
        selectedRemotemirrors.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_remotemirrors_success(element))
                    dispatch(add_operation({
                        content:'删除远程CDP:',
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_remotemirrors_error(body))
                    dispatch(add_operation({
                        content:'删除远程CDP:',
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}




export function create_remotemirrors_success(remotemirrors){
    return{
        type:CREATE_REMOTEMIRRORS_SUCCESS,
        remotemirrors
    }
}
export function create_remotemirrors_error(body){
    return{
        type:CREATE_REMOTEMIRRORS_ERROR,
        body 
    }
}
export function echo_remotemirrors(){
    return{
        type:ECHO_REMOTEMIRRORS
    }
}
export function close_remotemirrors(){
    return{
        type:CLOSE_REMOTEMIRRORS
    }
}
export function create_remotemirrors(remotemirrors,auth){
    // console.log(remotemirrors)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/remotemirrors', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                "srcHost": remotemirrors.srcHost,
                "dstHost": remotemirrors.dstHost,
                "srcvolid": remotemirrors.srcvolid,
                "dstvolid": remotemirrors.dstvolid,
                "dstport": remotemirrors.dstport,
                "options": JSON.stringify({"gzip": remotemirrors.gzip=='true'?true:false , "max_snap": Number(remotemirrors.max_snap)}),
                "is_started":remotemirrors.started,
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_remotemirrors_error(body))
                dispatch(add_operation({
                    content:'创建远程主机:',
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(close_remotemirrors())
                    dispatch(create_remotemirrors_success(body))
                    dispatch(add_operation({
                        content:'创建远程主机:',
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_remotemirrors_error(body))
                    dispatch(add_operation({
                        content:'创建远程主机:',
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}



export function request_remotemirrors_task(params){
    return{
        type:REQUEST_REMOTEMIRRORS_TASK,
        params
    }
}
export function receive_remotemirrors_task(ta) {
    return{
        type:RECEIVE_REMOTEMIRRORS_TASK,
        task:ta,
    }
}
export function receive_remotemirrors_task_error(params={}){
    return{
        type:RECEIVE_REMOTEMIRRORS_TASK_ERROR,
        params
    }
}
export function fetch_remotemirrors_task(task){
    console.log(task)
    return function (dispatch) {
        dispatch(request_remotemirrors_task())
        let api = new API({
            baseURI:task
        });
        api.auth([auth.username, auth.password]);
        api.get('',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_remotemirrors_task_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_remotemirrors_task(body))
            }else{
                dispatch(receive_remotemirrors_task(body.results))
            }

        })

    }
}

//获取token和url


export function echo_tokenandurl(){
    return{type:ECHO_TOKENANDURL,}

}
export function close_tokenandurl(){
    return{type:CLOSE_TOKENANDURL}
}
export function request_tokenandurl(){
    return{
        type:REQUEST_TOKENANDURL,
        
    }
}
export function receive_tokenandurl(tokenandurl) {
    return{
        type:RECEIVE_TOKENANDURL,
        tokenandurl:tokenandurl,
    }
}
export function receive_tokenandurl_error(){
    return{
        type:RECEIVE_TOKENANDURL_ERROR,
        
    }
}
export function fetch_tokenandurl(tokenandurl){
    return function (dispatch) {
        console.log(tokenandurl)
        dispatch(create_host(tokenandurl,auth))
        dispatch(fetch_localhost(tokenandurl.url,tokenandurl.token))
        dispatch(fetch_localvolume(tokenandurl.url,tokenandurl.token))
    }
    
}

