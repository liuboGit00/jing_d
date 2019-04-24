import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'

export const FETCH_NFS = 'FETCH_NFS'
export const REQUEST_NFS = 'REQUEST_NFS'
export const RECEIVE_NFS = 'RECEIVE_NFS'
export const RECEIVE_NFS_ERROR = 'RECEIVE_NFS_ERROR'

export const MODIFY_NFS = 'MODIFY_NFS'
export const REQUEST_MODIFY_NFS = 'REQUEST_MODIFY_NFS'
export const RECEIVE_MODIFY_NFS = 'RECEIVE_MODIFY_NFS'
export const RECEIVE_MODIFY_NFS_ERROR = 'RECEIVE_MODIFY_NFS_ERROR'

export const CREATE_NFS = 'CREATE_NFS'
export const CREATE_NFS_SUCCESS = 'CREATE_NFS_SUCCESS'
export const CREATE_NFS_ERROR = 'CREATE_NFS_ERROR'

export const DELETE_NFS = 'DELETE_NFS'
export const DELETE_NFS_SUCCESS = 'DELETE_NFS_SUCCESS'
export const DELETE_NFS_ERROR = 'DELETE_NFS_ERROR'

export const TOGGLE_NFS = 'TOGGLE_NFS'

export const ECHO_NFS = 'ECHO_NFS'
export const CLOSE_NFS = 'CLOSE_NFS'



export function request_nfs(){
    return{
        type:REQUEST_NFS,
        
    }
}
export function receive_nfs(filers) {
    return{
        type:RECEIVE_NFS,
        nfs:filers,
    }

}
export function receive_nfs_error(params){
    return{
        type:RECEIVE_NFS_ERROR,
        params
    }


}
export function fetch_nfs(){
    const params={'baseURI':restapi,'auth':auth}
    return function (dispatch) {
        dispatch(request_nfs())
        let api = new API({
            baseURI:restapi
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/nfs'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_nfs_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_nfs(body))
            }else{
                dispatch(receive_nfs(body.results))
                
            }

        })

    }
}


export function toggle_nfs(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_NFS,
        selectedNfs:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_nfs_error(body){
	return{
        type:DELETE_NFS_ERROR,
        body
    }
}
export function delete_nfs_success(body){
	return{
        type:DELETE_NFS_SUCCESS,
        nfs :body
    }
}
export function delete_nfs(selectedNfs,auth){
    // console.log(selectedFilersync)
    return function (dispatch) {
        selectedNfs.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                // console.log(element)

                if (200<=res.status&&res.status<300){
                    dispatch(delete_nfs_success(element))
                    dispatch(add_operation({
                        content:'NFS网络共享:'+element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_nfs_error(element))
                    dispatch(add_operation({
                        content:'NFS网络共享:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}




export function create_nfs_success(nfs){
	return{
        type:CREATE_NFS_SUCCESS,
        nfs:nfs
    }
}
export function create_nfs_error(body){
	return{
        type:CREATE_NFS_ERROR,
        body 
    }
}
export function echo_nfs(echo){
	return{
        type:ECHO_NFS,
        echo:echo
    }
}
export function close_nfs(){
	return{
        type:CLOSE_NFS
    }
}
export function create_nfs(nfs,auth){
    // console.log(filersync)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/nfs', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
             body: JSON.stringify({ 
               'name':nfs.name,
               'path':nfs.path,
               'comment':nfs.comment,
               'volume':nfs.volume,
               'rw':nfs.rw,
            })
        }, (err, res, body) => {
            // console.log(res)
            // console.log(err)
            // console.log(body)

                if (res.status == 201) {
                    dispatch(close_nfs())
                    dispatch(create_nfs_success(body))
                    dispatch(add_operation({
                        content:'创建nfs共享:'+nfs.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_nfs_error(body))
                    dispatch(add_operation({
                        content:'创建nfs共享:'+nfs.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            
        })
    }
}



export function request_modify_nfs(params){
    return{
        type:REQUEST_MODIFY_NFS,
        params
    }
}
export function receive_modify_nfs(modify) {
    return{
        type:RECEIVE_MODIFY_NFS,
        modify:modify,
    }
}
export function receive_modify_nfs_error(params={}){
    return{
        type:RECEIVE_MODIFY_NFS_ERROR,
        params
    }
}
export function modify_nfs(nfs,id){
     console.log(nfs,id)
    return function (dispatch) {
        dispatch(request_modify_nfs())
        let api = new API({
           baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.put('/nfs/'+id, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({
                'name':nfs.name,
                'path':nfs.path,
                'comment':nfs.comment,
                'volume':nfs.volume[0].url,
                'rw':nfs.rw,
               
            
            })
        },(err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_modify_nfs_error(err))
                return false
            }
            if (body.results == undefined){
                 dispatch(receive_modify_nfs(body))
              	 dispatch(close_nfs())
            }else{
                  dispatch(receive_modify_nfs(body.results))
               	  dispatch(close_nfs())

            }

        })
       

    }
}

