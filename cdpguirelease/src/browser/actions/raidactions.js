
import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,raidpath,username,password} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const FETCH_RAID = 'FETCH_RAID'
export const REQUEST_RAID = 'REQUEST_RAID'
export const RECEIVE_RAID = 'RECEIVE_RAID'
export const RECEIVE_RAID_ERROR = 'RECEIVE_RAID_ERROR'


export const CREATE_RAID = 'CREATE_RAID'
export const CREATE_RAID_SUCCESS = 'CREATE_RAID_SUCCESS'
export const CREATE_RAID_ERROR = 'CREATE_RAID_ERROR'

export const DELETE_RAID = 'DELETE_RAID'
export const DELETE_RAID_SUCCESS = 'DELETE_RAID_SUCCESS'
export const DELETE_RAID_ERROR = 'DELETE_RAID_ERROR'

export const ECHO_RAID = 'ECHO_RAID'
export const CLOSE_RAID = 'CLOSE_RAID'
export const TOGGLE_RAID = 'TOGGLE_RAID'


//raid_loadresume
export const ECHO_CREATE_RAID_LOADRESUME_MODAL = 'ECHO_CREATE_RAID_LOADRESUME_MODAL'
export const CLOSE_CREATE_RAID_LOADRESUME_MODAL = 'CLOSE_CREATE_RAID_LOADRESUME_MODAL'
export const CREATE_RAID_LOADRESUME = 'CREATE_RAID_LOADRESUME'
export const CREATE_RAID_LOADRESUME_OK = 'CREATE_RAID_LOADRESUME_OK'
export const CREATE_RAID_LOADRESUME_ERROR = 'CREATE_RAID_LOADRESUME_ERROR'

//volumes
export const REQUEST_VOLUMES = 'REQUEST_VOLUMES'
export const RECEIVE_VOLUMES = 'RECEIVE_VOLUMES'
export const RECEIVE_VOLUMES_ERROR = 'RECEIVE_VOLUMES_ERROR'
export const ECHO_CREATE_VOLUME_MODAL = 'ECHO_CREATE_VOLUME_MODAL'
export const CLOSE_CREATE_VOLUME_MODAL = 'CLOSE_CREATE_VOLUME_MODAL'
export const RELOAD_VOLUME  = 'RELOAD_VOLUME'
export const TOGGLE_VOLUMES = 'TOGGLE_VOLUMES'





export function request_raid(){
    return{
        type:REQUEST_RAID,
        
    }
}
export function receive_raid(filers) {
    return{
        type:RECEIVE_RAID,
        raid:filers,
    }

}
export function receive_raid_error(params){
    return{
        type:RECEIVE_RAID_ERROR,
        params
    }


}
export function fetch_raid(){
    // console.log()
    return function (dispatch) {
        dispatch(request_raid())
        let api = new API({
            baseURI:restapi
        });
        api.get('/raid1'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_raid_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_raid(body))
            }else{
                dispatch(receive_raid(body.results))    
            }

        })

    }
}


export function toggle_raid(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_RAID,
        selectedRaid:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}


//get volumes
export function request_volumes(params) {
    return {
        type:REQUEST_VOLUMES,
        params
        }
}
export function receive_volumes(volumesjson) {
    return {
        type:RECEIVE_VOLUMES,
        items:volumesjson,
    }    
}
export function receive_volumes_error(params={}) {
    return {
        type:RECEIVE_VOLUMES_ERROR,
        params
    }
}

export function fetch_volumes(params={'baseURI':restapi,'path':volumespath,'auth':auth,'searchKey':''}) {
    return function (dispatch) {
        dispatch(request_volumes(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path+'?ordering=-id'+'&snapshot__isnull=true'+'&limit=999'+'&search='+params.searchKey,
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_volumes_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_volumes(body))
            }else{
                dispatch(receive_volumes(body.results))
            }

        })

    }
}

export function toggle_volumes(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_VOLUMES,
        selectedVolumes:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_raid_error(body){
	return{
        type:DELETE_RAID_ERROR,
        body
    }
}
export function delete_raid_success(body){
	return{
        type:DELETE_RAID_SUCCESS,
        raid :body
    }
}
export function delete_raid(selectedRaid,auth){
    // console.log(selectedFilersync)
    return function (dispatch) {
        selectedRaid.forEach(function(element) {
            let api = new API({
            baseURI: element.volume
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_raid_success(element))
                    dispatch(add_operation({
                        content:'RAID1卷列表:'+element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_raid_error(element))
                    dispatch(add_operation({
                        content:'RAID1卷列表:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}



export function create_raid_success(raid){
	return{
        type:CREATE_RAID_SUCCESS,
        raid:raid
    }
}
export function create_raid_error(body){
	return{
        type:CREATE_RAID_ERROR,
        body 
    }
}

export function echo_raid(echo){
	return{
        type:ECHO_RAID,
        echo:echo
    }
}
export function close_raid(){
	return{
        type:CLOSE_RAID
    }
}


export function create_raid(raid,auth){
	console.log(raid,'ui')
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/raid1', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
             body: JSON.stringify({ 
               'name':raid.name,
               'sourcevolume':raid.sourcevolume,
               'dstvolume':raid.dstvolume,
               'sync':raid.sync,
            })
        }, (err, res, body) => {
                if (res.status == 201) {
                    dispatch(close_raid())
                    dispatch(create_raid_success(body))
                    dispatch(add_operation({
                        content:'RAID1创建:'+raid.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_raid_error(body))
                    dispatch(add_operation({
                        content:'RAID1创建:'+raid.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            
        })
    }
}


//raid->loadresume
export function echo_create_raid_loadresume_modal(echo){
    return{
        type:ECHO_CREATE_RAID_LOADRESUME_MODAL,
         echo:echo
    }
}
export function close_create_raid_loadresume_modal(){
    return{
        type:CLOSE_CREATE_RAID_LOADRESUME_MODAL,
    }
    
}

export function create_raid_loadresume(raid,auth) {
	console.log(raid)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/raid1/'+raid.id+'/loadresume', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                   'sourcevolume':raid.sourcevolume,
					               'dstvolume':raid.dstvolume,
					               'sync':raid.sync,
                                })
        }, (err, res, body) => {
                if (res.status == 201) {
                    dispatch(close_create_raid_loadresume_modal())
                    dispatch(create_raid_loadresume_ok(body))
                    dispatch(add_operation({
                        content:'重新恢复:'+raid.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_raid_loadresume_error(body))
                    dispatch(add_operation({
                        content:'重新恢复:'+raid.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
        })

    }
}


export function create_raid_loadresume_error(body) {
    return {
        type: CREATE_RAID_LOADRESUME_ERROR,
        body
    }
}
export function create_raid_loadresume_ok(raidloadresume) {
    return {
        type: CREATE_RAID_LOADRESUME_OK,
        raidloadresume:raidloadresume
    }
}