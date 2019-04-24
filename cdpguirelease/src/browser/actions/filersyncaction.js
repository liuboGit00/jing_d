import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'

export const FETCH_FILERSYNC = 'FETCH_FILERSYNC'
export const REQUEST_FILERSYNC = 'REQUEST_FILERSYNC'
export const RECEIVE_FILERSYNC = 'RECEIVE_FILERSYNC'
export const RECEIVE_FILERSYNC_ERROR = 'RECEIVE_FILERSYNC_ERROR'

export const MODIFY_FILERSYNC = 'MODIFY_FILERSYNC'
export const REQUEST_MODIFY_FILERSYNC = 'REQUEST_MODIFY_FILERSYNC'
export const RECEIVE_MODIFY_FILERSYNC = 'RECEIVE_MODIFY_FILERSYNC'
export const RECEIVE_MODIFY_FILERSYNC_ERROR = 'RECEIVE_MODIFY_FILERSYNC_ERROR'

export const CREATE_FILERSYNC = 'CREATE_FILERSYNC'
export const CREATE_FILERSYNC_SUCCESS = 'CREATE_FILERSYNC_SUCCESS'
export const CREATE_FILERSYNC_ERROR = 'CREATE_FILERSYNC_ERROR'

export const DELETE_FILERSYNC = 'DELETE_FILERSYNC'
export const DELETE_FILERSYNC_SUCCESS = 'DELETE_FILERSYNC_SUCCESS'
export const DELETE_FILERSYNC_ERROR = 'DELETE_FILERSYNC_ERROR'

export const TOGGLE_FILERSYNC = 'TOGGLE_FILERSYNC'

export const ECHO_FILERSYNC = 'ECHO_FILERSYNC'
export const CLOSE_FILERSYNC = 'CLOSE_FILERSYNC'



export function request_filersync(){
    return{
        type:REQUEST_FILERSYNC,
        
    }
}
export function receive_filersync(filers) {
    return{
        type:RECEIVE_FILERSYNC,
        filersync:filers,
    }

}
export function receive_filersync_error(params){
    return{
        type:RECEIVE_FILERSYNC_ERROR,
        params
    }


}
export function fetch_filersync(){
    // console.log()
    return function (dispatch) {
        dispatch(request_filersync())
        let api = new API({
            baseURI:restapi
        });
        api.get('/rsyncs'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_filersync_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_filersync(body))
            }else{
                dispatch(receive_filersync(body.results))
                
            }

        })

    }
}


export function toggle_filersync(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_FILERSYNC,
        selectedFilersync:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_filersync_error(body){
	return{
        type:DELETE_FILERSYNC_ERROR,
        body
    }
}
export function delete_filersync_success(body){
	return{
        type:DELETE_FILERSYNC_SUCCESS,
        filersync :body
    }
}
export function delete_filersync(selectedFilersync,auth){
    // console.log(selectedFilersync)
    return function (dispatch) {
        selectedFilersync.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                // console.log(element)

                if (200<=res.status&&res.status<300){
                    dispatch(delete_filersync_success(element))
                    dispatch(add_operation({
                        content:'文件同步节点:'+element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_filersync_error(element))
                    dispatch(add_operation({
                        content:'文件同步节点:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}




export function create_filersync_success(filersync){
	return{
        type:CREATE_FILERSYNC_SUCCESS,
        filersync:filersync
    }
}
export function create_filersync_error(body){
	return{
        type:CREATE_FILERSYNC_ERROR,
        body 
    }
}
export function echo_filersync(echo){
	return{
        type:ECHO_FILERSYNC,
        echo:echo
    }
}
export function close_filersync(){
	return{
        type:CLOSE_FILERSYNC
    }
}
export function create_filersync(filersync,auth){
    // console.log(filersync)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/rsyncs', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
               'name':filersync.name,
               'path':filersync.path,
               'comment':filersync.comment,
               'volume':filersync.volume,
            })
        }, (err, res, body) => {
            // console.log(res)
            // console.log(err)
            // console.log(body)

                if (res.status == 201) {
                    dispatch(close_filersync())
                    dispatch(create_filersync_success(body))
                    dispatch(add_operation({
                        content:'增加文件同步节点:'+filersync.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_filersync_error(body))
                    dispatch(add_operation({
                        content:'增加文件同步节点:'+filersync.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            
        })
    }
}



export function request_modify_filersync(params){
    return{
        type:REQUEST_MODIFY_FILERSYNC,
        params
    }
}
export function receive_modify_filersync(modify) {
    return{
        type:RECEIVE_MODIFY_FILERSYNC,
        modify:modify,
    }
}
export function receive_modify_filersync_error(params={}){
    return{
        type:RECEIVE_MODIFY_FILERSYNC_ERROR,
        params
    }
}
export function modify_filersync(filersync,id){
    // console.log(filersync,id)
    return function (dispatch) {
        dispatch(request_modify_filersync())
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.put('/rsyncs/'+id, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({
               'name':filersync.name,
               'path':filersync.path,
               'comment':filersync.comment,
               'volume':filersync.volume,
            
            })
        },(err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_modify_filersync_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_modify_filersync(body))
                dispatch(close_filersync())
            }else{
                dispatch(receive_modify_filersync(body.results))
                dispatch(close_filersync())

            }

        })

    }
}

