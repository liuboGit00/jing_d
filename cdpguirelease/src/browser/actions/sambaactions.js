import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,username,password,} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const FETCH_SAMBA = 'FETCH_SAMBA'
export const REQUEST_SAMBA = 'REQUEST_SAMBA'
export const RECEIVE_SAMBA = 'RECEIVE_SAMBA'
export const RECEIVE_SAMBA_ERROR = 'RECEIVE_SAMBA_ERROR'


export const CREATE_SAMBA = 'CREATE_SAMBA'
export const CREATE_SAMBA_SUCCESS = 'CREATE_SAMBA_SUCCESS'
export const CREATE_SAMBA_ERROR = 'CREATE_SAMBA_ERROR'

export const DELETE_SAMBA = 'DELETE_SAMBA'
export const DELETE_SAMBA_SUCCESS = 'DELETE_SAMBA_SUCCESS'
export const DELETE_SAMBA_ERROR = 'DELETE_SAMBA_ERROR'

export const TOGGLE_SAMBA = 'TOGGLE_SAMBA'

export const ECHO_SAMBA = 'ECHO_SAMBA'
export const CLOSE_SAMBA = 'CLOSE_SAMBA'




export function request_samba(){
    return{
        type:REQUEST_SAMBA,
        
    }
}
export function receive_samba(filec) {
    return{
        type:RECEIVE_SAMBA,
        samba:filec,
    }

}
export function receive_samba_error(params){
    return{
        type:RECEIVE_SAMBA_ERROR,
        params
    }


}
export function fetch_samba(){
    // console.log()
    return function (dispatch) {
        dispatch(request_samba())
        let api = new API({
            baseURI:restapi
        });
        api.get('/sambashares'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_samba_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_samba(body))
            }else{
                dispatch(receive_samba(body.results))
            }

        })

    }
}


export function toggle_samba(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_SAMBA,
        selectedSamba:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_samba_error(body){
	return{
        type:DELETE_SAMBA_ERROR,
        body
    }
}
export function delete_samba_success(body){
	return{
        type:DELETE_SAMBA_SUCCESS,
        samba :body
    }
}
export function delete_samba(selectedSamba,auth){
    // console.log(selectedSamba)
    return function (dispatch) {
        selectedSamba.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                // console.log(element)

                if (200<=res.status&&res.status<300){
                    dispatch(delete_samba_success(element))
                    dispatch(add_operation({
                        content:'网络共享:'+element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_SAMBA_error(element))
                    dispatch(add_operation({
                        content:'网络共享:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}




export function create_samba_success(sa){
	return{
        type:CREATE_SAMBA_SUCCESS,
        samba:sa
    }
}
export function create_samba_error(body){
	return{
        type:CREATE_SAMBA_ERROR,
        body 
    }
}
export function echo_samba(){
	return{
        type:ECHO_SAMBA,
    }
}
export function close_samba(){
	return{
        type:CLOSE_SAMBA
    }
}
export function create_samba(samba,auth){
    console.log(samba)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/sambashares', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
               'name':samba.name,
                'path':samba.path,
                'available':samba.available=='true'?true:false,
                'browseable':samba.browseable=='true'?true:false,
                'guest_ok':samba.guest_ok=='true'?true:false,
                'writeable':samba.writeable=='true'?true:false,
                'comment':samba.comment,
                'volume':samba.volume,
            })
        }, (err, res, body) => {
            // console.log(res)
            // console.log(err)
            // console.log(body)

                if (res.status == 201) {
                    dispatch(close_samba())
                    dispatch(create_samba_success(body))
                    dispatch(add_operation({
                        content:'增加网络共享:'+samba.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_samba_error(body))
                    dispatch(add_operation({
                        content:'增加网络共享:'+samba.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            
        })
    }
}

