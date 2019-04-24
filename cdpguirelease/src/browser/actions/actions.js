//import 'babel-polyfill'
import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,clonepath,snapshotspath,username,password,agentlistpath,registerpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const FETCH_DISKS = 'FETCH_DISKS'
export const REQUEST_DISKS = 'REQUEST_DISKS'
export const RECEIVE_DISKS = 'RECEIVE_DISKS'
export const RECEIVE_DISKS_ERROR = 'RECEIVE_DISKS_ERROR'
export const TOGGLE_DISK = 'TOGGLE_DISK'


export const REQUEST_VOLUMES = 'REQUEST_VOLUMES'
export const RECEIVE_VOLUMES = 'RECEIVE_VOLUMES'
export const RECEIVE_VOLUMES_ERROR = 'RECEIVE_VOLUMES_ERROR'
export const ECHO_CREATE_VOLUME_MODAL = 'ECHO_CREATE_VOLUME_MODAL'
export const CLOSE_CREATE_VOLUME_MODAL = 'CLOSE_CREATE_VOLUME_MODAL'
export const RELOAD_VOLUME  = 'RELOAD_VOLUME'
export const TOGGLE_VOLUMES = 'TOGGLE_VOLUMES'
export const DELETE_VOLUMES = 'DELETE_VOLUMES'
export const DELETE_VOLUME_ERROR = 'DELETE_VOLUME_ERROR'
export const DELETE_VOLUME_OK = 'DELETE_VOLUME_OK'
export const CREATE_VOLUME = 'CREATE_VOLUME'
export const CREATE_VOLUME_OK = 'CREATE_VOLUME_OK'
export const CREATE_VOLUME_ERROR = 'CREATE_VOLUME_ERROR'
export const MAP_VOLUME_OK = 'MAP_VOLUME_OK'
export const MAP_VOLUME_ERROR = 'MAP_VOLUME_ERROR'
export const ECHO_MAP_VOLUME_MODAL = 'ECHO_MAP_VOLUME_MODAL'
export const CLOSE_MAP_VOLUME_MODAL = 'CLOSE_MAP_VOLUME_MODAL'
export const REQUEST_VOLUME_DETAIL = 'REQUEST_VOLUME_DETAIL'
export const RECEIVE_VOLUME_DETAIL = 'RECEIVE_VOLUME_DETAIL'
export const RECEIVE_VOLUME_DETAIL_ERROR = 'RECEIVE_VOLUME_DETAIL_ERROR'
export const REQUEST_SNAPSHOT_DETAIL = 'REQUEST_SNAPSHOT_DETAIL'
export const RECEIVE_SNAPSHOT_DETAIL = 'RECEIVE_SNAPSHOT_DETAIL'
export const RECEIVE_SNAPSHOT_DETAIL_ERROR = 'RECEIVE_SNAPSHOT_DETAIL_ERROR'
export const RECEIVE_NO_CLONE = 'RECEIVE_NO_CLONE'
export const TOGGLE_CLONES = 'TOGGLE_CLONES'
export const DELETE_CLONE_OK = 'DELETE_CLONE_OK'
export const DELETE_CLONE_ERROR = 'DELETE_CLONE_ERROR'
export const SET_COMPRESS_OK = 'SET_COMPRESS_OK'
export const SET_COMPRESS_ERROR = 'SET_COMPRESS_ERROR'
export const SET_DEDUPE_OK = 'SET_DEDUPE_OK'
export const SET_DEDUPE_ERROR = 'SET_DEDUPE_ERROR'
export const RECEIVE_IPADDRESS = 'RECEIVE_IPADDRESS'
export const ECHO_MAP_VOLUME_SNAPSHOT_MODAL = 'ECHO_MAP_VOLUME_SNAPSHOT_MODAL'
export const CLOSE_MAP_VOLUME_SNAPSHOT_MODAL = 'CLOSE_MAP_VOLUME_SNAPSHOT_MODAL'
export const MAP_VOLUME_SNAPSHOT_OK = 'MAP_VOLUME_SNAPSHOT_OK'
export const MAP_VOLUME_SNAPSHOT_ERROR ='MAP_VOLUME_SNAPSHOT_ERROR'
export const CHANGE_REPLAY_TIME = 'CHANGE_REPLAY_TIME'
export const SELECT_DISPLAY_CONTENT = 'SELECT_DISPLAY_CONTENT'
export const REQUEST_VOLUMES_SEARCH = 'REQUEST_VOLUMES_SEARCH'
export const RECEIVE_VOLUMES_SEARCH = 'RECEIVE_VOLUMES_SEARCH'
export const RECEIVE_VOLUMES_SEARCH_ERROR = 'RECEIVE_VOLUMES_SEARCH_ERROR'

//--------------------------------agent----------------------------------------------
export const ECHO_CREATE_SSH_MODAL = 'ECHO_CREATE_SSH_MODAL'
export const ECHO_CREATE_AGENT_MODAL = 'ECHO_CREATE_AGENT_MODAL'
export const ECHO_MODIFY_AGENT_MODAL = 'ECHO_MODIFY_AGENT_MODAL'
export const CREATE_SSH_OK = 'CREATE_AGENT_OK'
export const CREATE_SSH_ERROR = 'CREATE_AGENT_ERROR'
export const CREATE_AGENT_OK = 'CREATE_AGENT_OK'
export const CREATE_AGENT_ERROR = 'CREATE_AGENT_ERROR'
export const CLOSE_CREATE_AGENT_MODAL = 'CLOSE_CREATE_AGENT_MODAL'
export const CLOSE_CREATE_SSH_MODAL = 'CLOSE_CREATE_SSH_MODAL'
export const CLOSE_MODIFY_AGENT_MODAL = 'CLOSE_MODIFY_AGENT_MODAL'
export const DELETE_AGENTS = 'DELETE_AGENTS'
export const DELETE_AGENT_ERROR = 'DELETE_AGENTS_ERROR'
export const DELETE_AGENT_OK = 'DELETE_AGENTS_OK'
export const TOGGLE_AGENTS = 'TOGGLE_AGENTS'
export const FETCH_AGENTS = 'FETCH_AGENTS'
export const REQUEST_AGENTS = 'REQUEST_AGENTS'
export const RECEIVE_AGENTS = 'RECEIVE_AGENTS'
export const RECEIVE_AGENTS_ERROR = 'RECEIVE_AGENTS_ERROR'
export const FETCH_AGENT_DETAIL = 'FETCH_AGENT_DETAIL'
export const REQUEST_AGENT_DETAIL = 'REQUEST_AGENT_DETAIL'
export const RECEIVE_AGENT_DETAIL = 'RECEIVE_AGENT_DETAIL'
export const RECEIVE_AGENT_DETAIL_ERROR = 'RECEIVE_AGENT_DETAIL_ERROR'
export const REQUEST_AGENT_LIST = 'REQUEST_AGENT_LIST'
export const RECEIVE_AGENT_LIST = 'RECEIVE_AGENT_LIST'
export const RECEIVE_AGENT_LIST_ERROR = 'RECEIVE_AGENT_LIST_ERROR'
export const REGISTER_AGENT_OK = 'REGISTER_AGENT_OK'
export const REGISTER_AGENT_ERROR = 'REGISTER_AGENT_ERROR'
export const TOGGLE_AGENT_TO_REGISTER = 'TOGGLE_AGENT_TO_REGISTER'
export const CREATE_INITIATOR_OK = 'CREATE_INITIATOR_OK'
export const CREATE_INITIATOR_ERROR = 'CREATE_INITIATOR_ERROR'
export const ECHO_CREATE_INITIATOR_MODAL = 'ECHO_CREATE_ININTIATOR_MODAL'
export const CLOSE_CREATE_INITIATOR_MODAL = 'CLOSE_CREATE_INITIATOR_MODAL'
export const SAVE_GRAINS_ERROR = 'SAVE_GRAINS_ERROR'
export const SAVE_GRAINS_OK = 'SAVE_GRAINS_OK'
export const CHECK_ONLINE_OK = 'CHECK_ONLINE_OK'
export const CHECK_ONLINE_ERROR = 'CHECK_ONLINE_ERROR'
export const REQUEST_INITIATOR = 'REQUEST_INITIATOR'
export const RECEIVE_INITIATOR_OK = 'RECEIVE_INITIATOR_OK'
export const RECEIVE_INITIATOR_ERROR = 'RECEIVE_INITIATOR_ERROR'
export const REQUEST_NO_INITIATOR = 'REQUEST_NO_INITIATOR'
export const TOGGLE_INITIATORS = 'TOGGLE_INITIATORS'
export const DELETE_INITIATOR_OK = 'DELETE_INITIATOR_OK'
export const DELETE_INITIATOR_ERROR = 'DELETE_INITIATOR_ERROR'

//-----------------------------------snapshots--- =''-----------------------------------
export const REQUEST_SNAPSHOTS = 'REQUEST_SNAPSHOTS'
export const FETCH_SNAPSHOTS = 'FETCH_SNAPSHOTS'
export const RECEIVE_SNAPSHOTS = 'RECEIVE_SNAPSHOTS'
export const RECEIVE_SNAPSHOTS_ERROR = 'RECEIVE_SNAPSHOTS_ERROR'
export const TOGGLE_SNAPSHOTS = 'TOGGLE_SNAPSHOTS'
export const ECHO_CREATE_SNAPSHOT_MODAL = 'ECHO_CREATE_SNAPSHOT_MODAL'
export const CLOSE_CREATE_SNAPSHOT_MODAL = 'CLOSE_CREATE_SNAPSHOT_MODAL'
export const ECHO_MAP_SNAPSHOT_MODAL = 'ECHO_MAP_SNAPSHOT_MODAL'
export const CLOSE_MAP_SNAPSHOT_MODAL = 'CLOSE_MAP_SNAPSHOT_MODAL'
export const MAP_SNAPSHOT_OK = 'MAP_SNAPSHOT_OK'
export const MAP_SNAPSHOT_ERROR ='MAP_SNAPSHOT_ERROR'
export const CREATE_SNAPSHOT = 'CREATE_SNAPSHOT'
export const CREATE_SNAPSHOT_ERROR = 'CREATE_SNAPSHOT_ERROR'
export const CREATE_SNAPSHOT_OK = 'CREATE_SNAPSHOT_OK'
export const DELETE_SNAPSHOT = 'DELETE_SNAPSHOT'
export const DELETE_SNAPSHOT_ERROR = 'DELETE_SNAPSHOT_ERROR'
export const DELETE_SNAPSHOT_OK = 'DELETE_SNAPSHOT_OK'
export const DELETE_SNAPSHOT_OK_IN_LIST = 'DELETE_SNAPSHOT_OK_IN_LIST'
export const ECHO_CLONE_SNAPSHOT_MODAL = 'ECHO_CLONE_SNAPSHOT_MODAL'
export const CLOSE_CLONE_SNAPSHOT_MODAL = 'CLOSE_CLONE_SNAPSHOT_MODAL'
export const CLONE_SNAPSHOT_OK = 'CLONE_SNAPSHOT_OK'
export const CLONE_SNAPSHOT_ERROR = 'CLONE_SNAPSHOT_ERROR'
export const CLOSE_MAP_SNAPSHOT_CLONE_MODAL = 'CLOSE_MAP_SNAPSHOT_CLONE_MODAL'
export const ECHO_MAP_SNAPSHOT_CLONE_MODAL = 'ECHO_MAP_SNAPSHOT_CLONE_MODAL'
export const MAP_SNAPSHOT_CLONE_OK = 'MAP_SNAPSHOT_CLONE_OK'
export const MAP_SNAPSHOT_CLONE_ERROR = 'MAP_SNAPSHOT_CLONE_ERROR'
export const REQUEST_ONLY_SNAPSHOTS = 'REQUEST_ONLY_SNAPSHOTS'
export const FETCH_ONLY_SNAPSHOTS = 'FETCH_ONLY_SNAPSHOTS'
export const RECEIVE_ONLY_SNAPSHOTS = 'RECEIVE_ONLY_SNAPSHOTS'
export const RECEIVE_ONLY_SNAPSHOTS_ERROR = 'RECEIVE_ONLY_SNAPSHOTS_ERROR'
export const SET_PAGINATION = 'SET_PAGINATION'

//---------------------------------snapshots list------------------------------------
export const FETCH_SNAPSHOTS_LIST = 'FETCH_SNAPSHOTS_LIST'
export const REQUEST_SNAPSHOTS_LIST = 'REQUEST_SNAPSHOTS_LIST'
export const RECEIVE_SNAPSHOTS_LIST = 'RECEIVE_SNAPSHOTS_LIST'
export const RECEIVE_SNAPSHOTS_LIST_ERROR = 'RECEIVE_SNAPSHOTS_LIST_ERROR'
export const TOGGLE_SNAPSHOTS_IN_LIST = 'TOGGLE_SNAPSHOTS_IN_LIST'
//-----------------------------------portal------------------------------------------
export const REQUEST_PORTALS = 'REQUEST_PORTALS'
export const RECEIVE_PORTALS = 'RECEIVE_PORTALS'
export const RECEIVE_PORTALS_ERROR = 'RECEIVE_PORTALS_ERROR'
//-----------------------------------lun----------------------------------------------
export const REQUEST_LUNS = 'REQUEST_LUNS'
export const RECEIVE_LUNS = 'RECEIVE_LUNS'
export const RECEIVE_LUNS_ERROR = 'RECEIVE_LUNS_ERROR'
export const TOGGLE_LUNS = 'TOGGLE_LUNS'
export const DELETE_LUN_OK = 'DELETE_LUN_OK'
export const DELETE_LUN_ERROR = 'DELETE_LUN_ERROR'
export const LOADING_MODAL = 'LOADING_MODAL'


export function loading_modal(){
    return{
        type:LOADING_MODAL
    }
}

export function request_disks(params) {
    return {
        type:REQUEST_DISKS
        }
}
export function receive_disks(disksjson) {
    return {
        type:RECEIVE_DISKS,
        items:disksjson,
    }    
}
export function receive_disks_error(params={}) {
    return {
        type:RECEIVE_DISKS_ERROR,
        params
    }
}
export function fetch_disks(conditions={searchKey:''}) {
    const params={'baseURI':restapi,'path':diskspath,'auth':auth}
    return function (dispatch) {
        dispatch(request_disks(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path+'?limit=999'+'&search='+conditions.searchKey, 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_disks_error(params))
                return false
            }

            dispatch(receive_disks(body.results))

        })

    }
}
export function toggle_disk(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_DISK,
        selectedDisks:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}


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
        api.get(params.path+'?ordering=-id'+'&snapshot__isnull=true'+'&limit=999'+'&upper__isnull=true'+'&search='+params.searchKey,
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
export function request_volumes_search(params) {
    return {
        type:REQUEST_VOLUMES_SEARCH,
        params
        }
}
export function receive_volumes_search(volumesjson) {
    return {
        type:RECEIVE_VOLUMES_SEARCH,
        search_volumes:volumesjson,
    }    
}
export function receive_volumes_search_error(params={}) {
    return {
        type:RECEIVE_VOLUMES_SEARCH_ERROR,
        params
    }
}
export function fetch_volumes_search(params={'baseURI':restapi,'path':volumespath,'auth':auth,'searchKey':''}) {
    return function (dispatch) {
        dispatch(request_volumes_search(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path+'?ordering=-id'+'&snapshot__isnull=true'+'&limit=999'+'&upper__isnull=true'+'&search='+params.searchKey,
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_volumes_search_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_volumes_search(body))
            }else{
                dispatch(receive_volumes_search(body.results))
            }

        })

    }
}
export function fetch_snapshot_detail(snapshotId){
    return function (dispatch) {
        dispatch(request_snapshot_detail())

        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.get('/volumes/' + snapshotId + '?limit=999', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_snapshot_detail_error(err))
                return false
            }else{
            
                dispatch(receive_snapshot_detail(body))
                if(body.clone_set.length>0){
                    body.clone_set.forEach(function(element){
                        dispatch(fetch_volume_detail(element.split('volumes/')[1]))
                    })
                }else{
                    dispatch(receive_no_clone())
                }
            }
        })
        
    }
}
export function request_snapshot_detail(){
    return{
        type:REQUEST_SNAPSHOT_DETAIL
    }
}
export function receive_snapshot_detail(snapshotDetail){
    return{
        type:RECEIVE_SNAPSHOT_DETAIL,
        snapshotDetail
    }
}
export function receive_snapshot_detail_error(params){
    return{
        type:RECEIVE_SNAPSHOT_DETAIL_ERROR
    }
}
export function receive_no_clone(){
    return{
        type:RECEIVE_NO_CLONE
    }
}
export function fetch_volume_detail(volumeId){
    return function (dispatch) {
        dispatch(request_volume_detail())

        let api = new API({
            baseURI: restapi
        });
        // log in to our API with a user/pass
        api.auth([auth.username, auth.password]);
        api.get('/volumes/' + volumeId + '?limit=999', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_volume_detail_error(err))
                return false
            }
            
            dispatch(receive_volume_detail(body))
          
        })

    }
}
export function request_volume_detail(){
    return{
        type:REQUEST_VOLUME_DETAIL
    }
}
export function receive_volume_detail(volumeDetail){
    return{
        type:RECEIVE_VOLUME_DETAIL,
        volumeDetail
    }
}
export function receive_volume_detail_error(params){
    return{
        type:RECEIVE_VOLUME_DETAIL_ERROR,
        params
    }
}
export function toggle_clones(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_CLONES,
        selectedVolumes:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function delete_clones(selectedVolumes,auth) {
    return function (dispatch) {
        selectedVolumes.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300 ){
                    dispatch(delete_clone_ok(element))
                    dispatch(add_operation({
                        content:'删除克隆盘:'+ element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_clone_error(body))
                    dispatch(add_operation({
                        content:'删除克隆盘:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}
export function delete_clone_error(params) {
    return {
        type:DELETE_CLONE_ERROR,
        params
    }
}
export function delete_clone_ok(volume) {
    return {
        type:DELETE_CLONE_OK,
        volume
    }
}
export function set_compress(volumeId,value){
    return function (dispatch){
        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/volumes/'+volumeId+'/setcompress', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'value': value })
        }, (err, res, body) => {
            if (err) {
                dispatch(set_compress_error(body))
                if (value == 'on') {
                    dispatch(add_operation({
                        content: '开启卷压缩：' + volumeId,
                        result: 'failed'
                    }))
                    message.error("操作失败");
                } else {
                    dispatch(add_operation({
                        content: '关闭卷压缩：' + volumeId,
                        result: 'failed'
                    }))
                    message.error("操作失败");
                }
                return false;
                } else {
                    if (res.status == 200) {
                        dispatch(set_compress_ok(body))
                        if (value == 'on') {
                            dispatch(add_operation({
                                content: '开启卷压缩：' + volumeId,
                                result: 'success'
                            }))
                            message.success("操作成功");
                        } else {
                            dispatch(add_operation({
                                content: '关闭卷压缩：' + volumeId,
                                result: 'success'
                            }))
                            message.success("操作成功");
                        }
                    } else {
                        dispatch(set_compress_error(body))
                        if (value == 'on') {
                            dispatch(add_operation({
                                content: '开启卷压缩：' + volumeId,
                                result: 'failed'
                            }))
                            message.error("操作失败");
                        } else {
                            dispatch(add_operation({
                                content: '关闭卷压缩：' + volumeId,
                                result: 'failed'
                            }))
                            message.error("操作失败");
                        }
                    }
                }
            })
    }
}
export function set_compress_ok(volume){
    return{
        type:SET_COMPRESS_OK,
        volume
    }
}
export function set_compress_error(params){
    return{
        type:SET_COMPRESS_ERROR,
        params
    }
}
export function set_dedupe(volumeId,value){
    return function (dispatch){
        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/volumes/'+volumeId+'/setdedupe', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'value': value })
        }, (err, res, body) => {
            if (err) {
                dispatch(set_dedupe_error(body))
                if (value == 'on') {
                    dispatch(add_operation({
                        content: '开启卷重删：' + volumeId,
                        result: 'failed'
                    }))
                    message.error("操作失败");
                } else {
                    dispatch(add_operation({
                        content: '关闭卷重删：' + volumeId,
                        result: 'failed'
                    }))
                    message.error("操作失败");
                }
                return false;
                } else {
                    if (res.status == 200) {
                        dispatch(set_dedupe_ok(body))
                        if (value == 'on') {
                            dispatch(add_operation({
                                content: '开启卷重删：' + volumeId,
                                result: 'success'
                            }))
                            message.success("操作成功");
                        } else {
                            dispatch(add_operation({
                                content: '关闭卷重删：' + volumeId,
                                result: 'success'
                            }))
                            message.success("操作成功");
                        }
                    } else {
                        dispatch(set_dedupe_error(body))
                        if (value == 'on') {
                            dispatch(add_operation({
                                content: '开启卷重删：' + volumeId,
                                result: 'failed'
                            }))
                            message.error("操作失败");
                        } else {
                            dispatch(add_operation({
                                content: '关闭卷重删：' + volumeId,
                                result: 'failed'
                            }))
                            message.error("操作失败");
                        }
                    }
                }
            })
    }
}
export function set_dedupe_ok(volume){
    return{
        type:SET_DEDUPE_OK,
        volume
    }
}
export function set_dedupe_error(params){
    return{
        type:SET_DEDUPE_ERROR,
        params
    }
}

export function echo_create_volume_modal(params) {
    return {
        type:ECHO_CREATE_VOLUME_MODAL,
        params
    }
}
export function close_create_volume_modal(params) {
    return {
        type:CLOSE_CREATE_VOLUME_MODAL
    }    
}
export function reload_volume(params) {
    return {
        type:RELOAD_VOLUME
    }
}
export function toggle_volumes(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_VOLUMES,
        selectedVolumes:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_volumes(selectedVolumes,auth) {
    return function (dispatch) {
        selectedVolumes.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_volume_ok(element))
                    dispatch(add_operation({
                        content:'删除卷:'+ element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_volume_error(body))
                    dispatch(add_operation({
                        content:'删除卷:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}
export function delete_volume_error(volume) {
    return {
        type:DELETE_VOLUME_ERROR,
        volume
    }
}
export function delete_volume_ok(volume) {
    return {
        type:DELETE_VOLUME_OK,
        volume
    }
}
export function create_volume(volume,auth) {
        return function (dispatch) {
            let api = new API({
            baseURI: volume.vol_pool
            });
            console.log(volume)
            api.auth([auth.username, auth.password]);
            api.post('/createvolume', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' ,'cache-control':'no-cache'},
                body:volume.vol_type=='zvol'?JSON.stringify({
                        'name':volume.vol_name, 
                        'megs':volume.vol_size,
                        'filesystem':'',
                        'blocksize':volume.vol_blocksize,
                        'is_thin':volume.vol_thin=='true'?true:false
                    }):JSON.stringify({
                        'name':volume.vol_name, 
                        'megs':volume.vol_size,
                        'filesystem':volume.vol_type,
                        'blocksize':volume.vol_blocksize,
                    })
            }, (err, res, body) => {
            if (err) {
                dispatch(create_volume_error(body))
                dispatch(add_operation({
                    content:'添加卷列表:'+volume.vol_name,
                    result:'failed'
                }))
                message.error("操作失败");
                return false;
                
            }
            if(res.status == 201){
                dispatch(close_create_volume_modal())
                dispatch(create_volume_ok(body))
                dispatch(add_operation({
                    content:'添加卷:'+volume.vol_name,
                    result:'success'
                }))
                message.success("操作成功");
            }else{
                dispatch(create_volume_error(body))
                dispatch(add_operation({
                    content:'添加卷:'+volume.vol_name,
                    result:'failed'
                }))
                message.error("操作失败")
            }
            
        })
        }
}
export function create_volume_error(reason) {
    return {
        type: CREATE_VOLUME_ERROR,
        reason:reason
    }
}
export function create_volume_ok(volume) {
    return {
        type: CREATE_VOLUME_OK,
        volume
    }
}
export function map_volume(lun,volume_id,auth){
    console.log(lun)
    return function (dispatch){
        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/luns', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'volume': volume_id,'map_lunid':lun.map_lunid,'lun_id': lun.lun_id, 'agent': lun.agent_id, 'portals': lun.portal_id,'readonly':lun.readonly=='false'?false:true,'writeback':lun.writeback=='true'?true:false})
        }, (err, res, body) => {
            if (err) {
                dispatch(map_volume_error(body))
                dispatch(add_operation({
                    content:'映射卷:'+ volume_id,
                    result:'failed'
                }))
                message.error("操作失败");
                return false;
            } 
            if (res.status == 201) {
                dispatch(close_map_volume_modal())
                dispatch(map_volume_ok(body))
                dispatch(add_operation({
                    content: '映射卷:' + volume_id,
                    result: 'success'
                }))
                message.success("操作成功")
                dispatch(fetch_luns())
            } else {
                dispatch(map_volume_error(body))
                dispatch(add_operation({
                    content: '映射卷:' + volume_id,
                    result: 'failed'
                }))
                message.error("操作失败")
            }
            
        })
    }
}
export function map_volume_ok(lun){
    return {
        type: MAP_VOLUME_OK,
        lun:lun
    }
}
export function map_volume_error(reason){
    return {
        type: MAP_VOLUME_ERROR,
        reason: reason
    }
}
export function echo_map_volume_modal(params){
    return {
        type: ECHO_MAP_VOLUME_MODAL,
        params
    }
}
export function close_map_volume_modal(params){
    return {
        type: CLOSE_MAP_VOLUME_MODAL,
        params
    }
}
export function map_volume_snapshot(lun,volume_snapshot_id,auth){
    return function (dispatch){
        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/luns', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'volume': volume_snapshot_id, 'lun_id': lun.lun_id, 'agent': lun.agent_id, 'portals': lun.portal_id,'readonly':lun.readonly=='false'?false:true,'writeback':lun.writeback=='false'?false:true})
        }, (err, res, body) => {
            if (err) {
                dispatch(map_volume_snapshot_error(body))
                dispatch(add_operation({
                    content:'映射卷快照:'+ volume_snapshot_id,
                    result:'failed'
                }))
                message.error("操作失败");
                return false;
            } 
            if (res.status == 201) {
                dispatch(close_map_volume_snapshot_modal())
                dispatch(map_volume_snapshot_ok(body))
                dispatch(add_operation({
                    content: '映射卷快照:' + volume_snapshot_id,
                    result: 'success'
                }))
                message.success("操作成功")
            } else {
                dispatch(map_volume_snapshot_error(body))
                dispatch(add_operation({
                    content: '映射卷快照:' + volume_snapshot_id,
                    result: 'failed'
                }))
                message.error("操作失败")
            }
            
        })
    }
}
export function map_volume_snapshot_ok(lun){
    return {
        type: MAP_VOLUME_SNAPSHOT_OK,
        lun
    }
}
export function map_volume_snapshot_error(reason){
    return {
        type: MAP_VOLUME_SNAPSHOT_ERROR,
        reason: reason
    }
}
export function echo_map_volume_snapshot_modal(params){
    return {
        type: ECHO_MAP_VOLUME_SNAPSHOT_MODAL,
        params
    }
}
export function close_map_volume_snapshot_modal(params){
    return {
        type: CLOSE_MAP_VOLUME_SNAPSHOT_MODAL,
        params
    }
}
export function change_replay_time(timeNumber,time){
    return{
        type:CHANGE_REPLAY_TIME,
        time,
        timeNumber
    }
}

export function select_display_content(value){
    return{
        type:SELECT_DISPLAY_CONTENT,
        content:value
    }
}

//----------------------------------agent start--------------------------------
export function echo_create_ssh_modal(params) {
    return {
        type: ECHO_CREATE_SSH_MODAL,
        params
    }
}
export function echo_create_agent_modal(params) {
    return {
        type: ECHO_CREATE_AGENT_MODAL,
        params
    }
}
export function  echo_modify_agent_modal(params){
    return{
        type: ECHO_MODIFY_AGENT_MODAL,
        params
    }
}
export function close_create_ssh_modal(params){
    return{
        type: CLOSE_CREATE_SSH_MODAL
    }
}
export function close_create_agent_modal(params){
    return{
        type: CLOSE_CREATE_AGENT_MODAL
    }
}
export function close_modify_agent_modal(params){
    return{
        type: CLOSE_MODIFY_AGENT_MODAL
    }
}
export function create_ssh(agentName,auth){
    return function(dispatch){
        let api = new API({
            baseURI: restapi
            });
            api.auth([auth.username, auth.password]);
            api.post('/connects', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({'ip':agentName.ip_addr,'port':agentName.ip_port,'username':agentName.ssh_user,'passwd':agentName.ssh_passwd})}, (err, res, body) => {
            if (err) {
                dispatch(create_ssh_error(body))
                dispatch(add_operation({
                    content:'新建SSH:'+agentName,
                    result:'failed'
                }))
                message.error("操作失败");
                return false; 
            }
            if(res.status == 201){
				dispatch(close_create_ssh_modal())
                dispatch(create_ssh_ok(body))
                dispatch(add_operation({
                    content:'新建SSH:'+agentName,
                    result:'success'
                }))
                message.success("操作成功");
            }else{
                dispatch(create_ssh_error(body))
                dispatch(add_operation({
                    content:'新建SSH:'+agentName,
                    result:'failed'
                }))
                message.error("操作失败")
            }
        })
    }
}
export function create_agent(agentName,auth){
    return function(dispatch){
        let api = new API({
            baseURI: restapi
            });
            api.auth([auth.username, auth.password]);
            api.post('/agents', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({'name':agentName})}, (err, res, body) => {
            if (err) {
                dispatch(create_agent_error(body))
                dispatch(add_operation({
                    content:'新建客户端:'+agentName,
                    result:'failed'
                }))
                message.error("操作失败");
                return false;
                
            }
            if(res.status == 201){
                dispatch(close_create_agent_modal())
                dispatch(create_agent_ok(body))
                dispatch(add_operation({
                    content:'新建客户端:'+agentName,
                    result:'success'
                }))
                message.success("操作成功");
            }else{
                dispatch(create_agent_error(body))
                dispatch(add_operation({
                    content:'新建客户端:'+agentName,
                    result:'failed'
                }))
                message.error("操作失败")
            }
            
        })
    }
}
export function create_ssh_ok(agent){
    return{
        type:CREATE_SSH_OK,
        agent
    }
}
export function create_ssh_error(params){
    return{
        type:CREATE_SSH_ERROR,
        params
    }
}
export function create_agent_ok(agent){
    return{
        type:CREATE_AGENT_OK,
        agent
    }
}
export function create_agent_error(params){
    return{
        type:CREATE_AGENT_ERROR,
        params
    }
}
export function delete_agents(selectedAgents,auth) {
    return function (dispatch) {
        selectedAgents.forEach(function (element) {
            let api = new API({
                baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' } }, (err, res, body) => {
                if (err) {
                    dispatch(delete_agent_error(element))
                    dispatch(add_operation({
                        content:'删除客户端:'+element.name,
                        result:'failed'
                    }))
                    message.error('操作失败');
                    return false;

                } else {
                    dispatch(delete_agent_ok(element))
                    dispatch(add_operation({
                        content:'删除客户端:'+element.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                }
            })
        }, auth);
    }
}
export function delete_agent_error(agent) {
    return {
        type:DELETE_AGENT_ERROR,
        agent
    }
}
export function delete_agent_ok(agent) {
    return {
        type:DELETE_AGENT_OK,
        agent
    }
}
export function toggle_agents(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_AGENTS,
        selectedAgents:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function fetch_agents(conditions={searchKey:''}){
    const params={'baseURI':restapi,'path':agentspath,'auth':auth}
    return function(dispatch){
        dispatch(request_agents(params))

        let api = new API({
            baseURI: params.baseURI
        });
            // console.log(api)
            // console.log(API)
        api.auth([params.auth.username,params.auth.password]);
        api.get(params.path+'?ordering=-id'+'&limit=999'+'&search='+conditions.searchKey, 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_agents_error(params))
                return false
            }

            dispatch(receive_agents(body.results))

        })
    }
}
export function request_agents(params) {
    return {
        type:REQUEST_AGENTS,
        params
        }
}
export function receive_agents(agentsjson) {
    return {
        type:RECEIVE_AGENTS,
        items:agentsjson,
    }    
}
export function receive_agents_error(params={}) {
    return {
        type:RECEIVE_AGENTS_ERROR,
        params
    }
}
export function fetch_agent_detail(params) {
    return function (dispatch) {
        dispatch(request_agent_detail(params))

        let api = new API({
            baseURI: params.baseURI
        });
        
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                dispatch(receive_agent_detail_error(params))
                return false
            }

            dispatch(receive_agent_detail(body))

        })

    }
}
export function request_agent_detail(params){
    return{
        type:REQUEST_AGENT_DETAIL,
        params
    }
}
export function receive_agent_detail(agentdetailjson){
    return {
        type:RECEIVE_AGENT_DETAIL,
        items:agentdetailjson
    }
}
export function receive_agent_detail_error(params={}){
    return {
        type:RECEIVE_AGENT_DETAIL_ERROR,
        params
    }
}
export function fetch_agent_list(params={'baseURI':restapi,'path':agentlistpath,'auth':auth}){
    return function (dispatch) {
        dispatch(request_agent_list(params))
        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get(params.path+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_agent_list_error(params))
                return false
            }

            dispatch(receive_agent_list(body))

        })
    }
}
export function request_agent_list(params){
    return{
        type:REQUEST_AGENT_LIST,
        params
    }
}
export function receive_agent_list(agentlistjson){
    return {
        type:RECEIVE_AGENT_LIST,
        items:agentlistjson
    }
}
export function receive_agent_list_error(params={}){
    return {
        type:RECEIVE_AGENT_LIST_ERROR,
        params
    }
}
export function register_agent(saltid,auth){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post(registerpath, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 'saltid': saltid })
        }, (err, res, body) => {
            if (err) {
                console.log(saltid)
                dispatch(register_agent_error(body))
                dispatch(add_operation({
                    content:'注册客户端:'+ saltid,
                    result:'failed'

                }))
                message.error('操作失败');
                return false;

            } else {
                if (res.status == 201) {
                    dispatch(register_agent_ok(body))
                    dispatch(save_grains([body],auth))
                    dispatch(fetch_agent_list())
                    dispatch(add_operation({
                        content:'注册客户端:'+saltid,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(register_agent_error(body))
                    dispatch(add_operation({
                        content:'注册客户端:'+ saltid,
                        result:'failed'

                    }))
                    message.error('操作失败');
                }
            }
        })
    }
}
export function register_agent_ok(agent){
    return {
        type:REGISTER_AGENT_OK,
        agent
    }
}
export function register_agent_error(reason){
    return{
        type:REGISTER_AGENT_ERROR,
        reason:reason
    }
}
export function toggle_agent_to_register(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_AGENT_TO_REGISTER,
        selectedAgentToRegister:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function create_initiator(initiator,agentId,auth){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/initiators', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 'wwn': initiator.initiator_name,'type':initiator.initiator_type,'agent':agentId })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_initiator_error(body))
                dispatch(add_operation({
                    content:'添加启动程序:'+initiator.initiator_name,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(close_create_initiator_modal())
                    dispatch(create_initiator_ok(body))
                    dispatch(add_operation({
                        content:'添加启动程序:'+initiator.initiator_name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_initiator_error(body))
                    dispatch(add_operation({
                        content:'添加启动程序:'+initiator.initiator_name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_initiator_ok(initiator){
    return {
        type: CREATE_INITIATOR_OK,
        initiator
    }
}
export function create_initiator_error(reason){
    return {
        type: CREATE_INITIATOR_ERROR,
        reason: reason
    }
}
export function echo_create_initiator_modal(params){
    return {
        type: ECHO_CREATE_INITIATOR_MODAL,
        params
    }
}
export function close_create_initiator_modal(params){
    return {
        type: CLOSE_CREATE_INITIATOR_MODAL
    }
}
export function save_grains(selectedAgents,auth) {
    let i = 0
    let j = 0
    return function (dispatch) {
        selectedAgents.forEach(function (element) {
            // console.log(element)
           
            let api = new API({
                baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.get('/savegrains', {
                credentials: 'include', mode: 'cors', headers: {'Accept':'application/json', 'Content-Type': 'application/json' ,'cache-control':'no-cache'}
            }, (err, res, body) => {
                if (res.status == 200) {
                    dispatch(save_grains_ok(body))
                    dispatch(add_operation({
                        content:'保存操作系统信息:'+element.name,
                        result:'success'
                    }));
                    i++;
                    j++;
                    if(selectedAgents.length>1){
                        if(j==selectedAgents.length){
                            if(i==selectedAgents.length){
                                message.success('操作成功')
                            }else{
                                message.error('操作失败')
                            }
                        }
                        
                    }else{
                        message.success('操作成功')
                        dispatch(fetch_agents())

                    }
                    
                } else {
                    i--;
                    j++;
                    dispatch(save_grains_error(body))
                    dispatch(add_operation({ 
                        content:'保存操作系统信息:'+element.name,
                        result:'failed'
                    }))

                    if(selectedAgents.length>1){
                        if(j==selectedAgents.length){
                            if(i!=selectedAgents.length){
                                message.error('操作失败')
                            }
                        }
                    }else{
                        message.error('操作失败')
                    }
                    
                }
            })
        }, auth);
    }
}
export function save_grains_ok(grains){
    return{
        type: SAVE_GRAINS_OK,
        grains
    }
}
export function save_grains_error(reason){
    return {
        type: SAVE_GRAINS_ERROR,
        reason:reason
    }
}
export function check_online(id,url,auth){
    // console.log(url)
    return function(dispatch){
        let api = new API({
            baseURI:url
        });
        api.auth([auth.username,auth.password]);
        api.get('/online', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' ,'cache-control':'no-cache'}
        }, (err, res, body) => {
            if (err) {
                dispatch(check_online_error(body))
            } else {
                dispatch(check_online_ok(body,id))
            }
        })
    }
}
export function check_online_ok(body,id){
    return{
        type:CHECK_ONLINE_OK,
        body,
        id
    }
}
export function check_online_error(reason){
    return{
        type:CHECK_ONLINE_ERROR,
        reason:reason
    }
}
export function fetch_initiators(initiators){
    return function (dispatch) {
        dispatch(request_initiator())
        if(initiators.length>0){
            initiators.forEach(function (element){
       
        let api = new API({
            baseURI: element
        });
        api.auth([auth.username,auth.password]);
        api.get(''+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_initiator_error(body))
                return false
            }

            dispatch(receive_initiator_ok(body))

        })
        })
        }else{
            dispatch(request_no_initiator())
        }
        
        
    }
}
export function request_no_initiator(){
    return{
        type:REQUEST_NO_INITIATOR
    }
}
export function request_initiator(){
    return{
        type:REQUEST_INITIATOR
    }
}
export function receive_initiator_ok(initiator){
    return{
        type:RECEIVE_INITIATOR_OK,
        initiator:initiator
    }
}
export function receive_initiator_error(reason){
    return{
        type:RECEIVE_INITIATOR_ERROR,
        reason:reason
    }
}
export function toggle_initiators(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_INITIATORS,
        selectedInits:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function delete_initiators(selectedInits,auth) {
    return function (dispatch) {
        selectedInits.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_initiator_ok(element.id))
                    dispatch(add_operation({
                        content:'创建initiator:'+ element.wwn,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_initiator_error(body))
                    dispatch(add_operation({
                        content:'创建initiator:'+element.wwn,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}
export function delete_initiator_ok(initId){
    return{
        type:DELETE_INITIATOR_OK,
        initId
    }
}
export function delete_initiator_error(params){
    return{
        type:DELETE_INITIATOR_ERROR,
        params
    }
}



//-----------------------------------agent end-------------------------------------
//-----------------------------------snapshots-------------------------------------

export function fetch_snapshots(url,auth, pageSize=10, current=1) {
    return function (dispatch) {
        dispatch(request_snapshots())

        let api = new API({
            baseURI: url
        });
        
        // log in to our API with a user/pass
        api.auth([auth.username, auth.password]);
        api.get(''+'?limit='+pageSize+'&offset='+(current-1)*pageSize+'&time='+(new Date().getTime()) , 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                dispatch(receive_snapshots_error(body))
                return false
            }
            // console.log(body)
            // for(let i=0;i<body.results.length;i++){
            //     let firstTime = new Date(body.results[i].createdate)
            //     let nextTime = new Date(firstTime.setHours(firstTime.getHours() + 8))
            //     body.results[i].createdate = nextTime
            //     // console.log(body.results[i].createdate)
            // }
            dispatch(receive_snapshots(body,pageSize,current))

        })

    }
}
export function request_snapshots(params) {
    return {
        type:REQUEST_SNAPSHOTS,
        params
        }
}
export function receive_snapshots(results,pageSize,current) {
    return {
        type:RECEIVE_SNAPSHOTS,
        results:results,
        pageSize:pageSize,
        current:current
    }    
}
export function receive_snapshots_error(params={}) {
    return {
        type:RECEIVE_SNAPSHOTS_ERROR,
        params
    }
}
export function fetch_only_snapshots(url) {
    return function (dispatch) {
        dispatch(request_only_snapshots())

        let api = new API({
            baseURI: url
        });
        
        // log in to our API with a user/pass
        api.auth([auth.username, auth.password]);
        api.get('' , 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                dispatch(receive_only_snapshots_error(err))
                return false
            }
            dispatch(receive_only_snapshots(body))

        })

    }
}
export function request_only_snapshots() {
    return {
        type:REQUEST_ONLY_SNAPSHOTS,
    }
}
export function receive_only_snapshots(body) {
    return {
        type:RECEIVE_ONLY_SNAPSHOTS,
        onlySnapshots:body,
    }    
}
export function receive_only_snapshots_error(params) {
    return {
        type:RECEIVE_ONLY_SNAPSHOTS_ERROR,
        params
    }
}
export function toggle_snapshots(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_SNAPSHOTS,
        selectedSnapshots:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function echo_create_snapshot_modal(params){
    return {
        type: ECHO_CREATE_SNAPSHOT_MODAL,
        params
    }
}
export function close_create_snapshot_modal(params){
    return{
        type: CLOSE_CREATE_SNAPSHOT_MODAL
    }
}

export function create_snapshot(snapshot, url,pagination, auth) {
    // console.log(url)
    return function (dispatch) {
        let api = new API({
            baseURI: url
        });
        api.auth([auth.username, auth.password]);
        api.post('', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 'name': snapshot.snap_name })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_snapshot_error(body))
                dispatch(add_operation({
                    content:'添加快照:'+snapshot.snap_name,
                    result:'failed'
                }))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 201) {
                    dispatch(close_create_snapshot_modal())
                    // let firstTime = new Date(body.createdate)
                    // let nextTime = new Date(firstTime.setHours(firstTime.getHours() + 8))
                    // body.createdate = nextTime
                    dispatch(create_snapshot_ok(body))
                    dispatch(add_operation({
                        content:'添加快照:'+snapshot.snap_name,
                        result:'success'
                    }))
                    message.success('操作成功')
                    // console.log(body)
                    dispatch(fetch_only_snapshots(body.url))
                    dispatch(set_pagination(pagination))
                } else {
                    dispatch(create_snapshot_error(body))
                    dispatch(add_operation({
                        content:'添加快照:'+snapshot.snap_name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_snapshot_error(reason) {
    return {
        type: CREATE_SNAPSHOT_ERROR,
        reason: reason
    }
}
export function create_snapshot_ok(snapshot) {
    return {
        type: CREATE_SNAPSHOT_OK,
        snapshot
    }
}
export function delete_snapshots(selectedSnapshots,pagination,auth) {
    return function (dispatch) {
        selectedSnapshots.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'text/plain' } }, (err, res, body) => {
                // console.log(err,res,body)
                if(err){
                    dispatch(delete_snapshot_error(body))
                    dispatch(add_operation({
                        content:'删除快照:'+element.name,
                        result:'failed'
                    }))
                    message.error('操作失败') 
                    return false
                }
                dispatch(delete_snapshot_ok(element))
                dispatch(delete_snapshot_ok_in_list(element))
                dispatch(add_operation({
                    content:'删除快照:'+element.name,
                    result:'success'
                }))
                message.success('操作成功')
                dispatch(set_pagination(pagination))
                if((pagination.tot)%(pagination.pag)==0){
                    console.log(element.snapshot+'/snapshots')
                    dispatch(fetch_snapshots(element.snapshot+'/snapshots',auth,pagination.pag,pagination.cur))
                }
            })
        }, auth);
    }
}
export function delete_snapshot_ok_in_list(snapshot){
    return{
        type:DELETE_SNAPSHOT_OK_IN_LIST,
        snapshot
    }
}
export function delete_snapshot_error(snapshot) {
    return {
        type:DELETE_SNAPSHOT_ERROR,
        snapshot
    }
}
export function delete_snapshot_ok(snapshot) {
    return {
        type:DELETE_SNAPSHOT_OK,
        snapshot
    }
}
export function clone_snapshot(name,url,snapshot, auth) {
    console.log(snapshot)
    return function (dispatch) {
        let api = new API({
            baseURI: url
        });
        api.auth([auth.username, auth.password]);
        api.post('/clone', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' ,'cache-control':'no-cache'},
            body: JSON.stringify({ 'name': name.clone_name })
        }, (err, res, body) => {
            if (err) {
                dispatch(clone_snapshot_error(body))
                dispatch(add_operation({
                    content: '克隆快照:' + name.clone_name,
                    result: 'failed'
                }))
                message.error('操作失败')

            }
            if (res.status == 201) {
                dispatch(close_clone_snapshot_modal())
                dispatch(clone_snapshot_ok(body))
                dispatch(add_operation({
                    content: '克隆快照:' + name.clone_name,
                    result: 'success'
                }))
                dispatch(fetch_snapshots(snapshot +'/snapshots',auth))
                dispatch(fetch_volumes())
                message.success('操作成功')
            } else {
                dispatch(clone_snapshot_error(body))
                dispatch(add_operation({
                    content: '克隆快照:' + name.clone_name,
                    result: 'failed'
                }))
                message.error('操作失败')
            }

        })

    }
}
export function clone_snapshot_error(reason) {
    return {
        type: CLONE_SNAPSHOT_ERROR,
        reason: reason
    }
}
export function clone_snapshot_ok(snapshot) {
    return {
        type: CLONE_SNAPSHOT_OK,
        snapshot
    }
}
export function echo_clone_snapshot_modal(params){
    return {
        type: ECHO_CLONE_SNAPSHOT_MODAL,
        params
    }
}
export function close_clone_snapshot_modal(params){
    return{
        type: CLOSE_CLONE_SNAPSHOT_MODAL
    }
}
export function map_snapshot(lun,snapshot_id,auth){
    return function (dispatch){
        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/luns', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'volume': snapshot_id, 'lun_id': lun.lun_id, 'agent': lun.agent_id, 'portals': lun.portal_id,'readonly':lun.readonly=='false'?false:true,'writeback':lun.writeback=='false'?false:true})
        }, (err, res, body) => {
                if (err) {
                    dispatch(map_snapshot_error(body))
                    dispatch(add_operation({
                        content:'映射快照:'+ snapshot_id,
                        result:'failed'
                    }))
                    message.error("操作失败");
                    return false;
                } else {
                    if (res.status == 201) {
                        dispatch(close_map_snapshot_modal())
                        dispatch(map_snapshot_ok(body))
                        dispatch(add_operation({
                            content:'映射快照:'+snapshot_id,
                            result:'success'
                        }))
                        message.success("操作成功")
                    } else {
                        dispatch(map_snapshot_error(body))
                        dispatch(add_operation({
                            content:'映射快照:'+snapshot_id,
                            result:'failed'
                        }))
                        message.error("操作失败")
                    }
                }
            
        })
    }
}
export function map_snapshot_ok(lun){
    return {
        type: MAP_SNAPSHOT_OK,
        lun
    }
}
export function map_snapshot_error(reason){
    return {
        type: MAP_SNAPSHOT_ERROR,
        reason: reason
    }
}
export function echo_map_snapshot_modal(params){
    return {
        type: ECHO_MAP_SNAPSHOT_MODAL,
        params
    }
}
export function close_map_snapshot_modal(params){
    return {
        type: CLOSE_MAP_SNAPSHOT_MODAL,
        params
    }
}
export function map_snapshot_clone(lun,snapshot_clone_id,auth){
    return function (dispatch){
        let api = new API({
            baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/luns', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'volume': snapshot_clone_id, 'lun_id': lun.lun_id, 'agent': lun.agent_id, 'portals': lun.portal_id,'readonly':lun.readonly=='false'?false:true,'writeback':lun.writeback=='false'?false:true})
        }, (err, res, body) => {
                if (err) {
                    dispatch(map_snapshot_clone_error(body))
                    dispatch(add_operation({
                        content:'映射快照的克隆盘:'+ snapshot_clone_id,
                        result:'failed'
                    }))
                    message.error("操作失败");
                    return false;
                } else {
                    if (res.status == 201) {
                        dispatch(close_map_snapshot_clone_modal())
                        dispatch(map_snapshot_clone_ok(body))
                        dispatch(add_operation({
                            content:'映射快照的克隆盘:'+snapshot_clone_id,
                            result:'success'
                        }))
                        message.success("操作成功")
                    } else {
                        dispatch(map_snapshot_clone_error(body))
                        dispatch(add_operation({
                            content:'映射快照的克隆盘:'+snapshot_clone_id,
                            result:'failed'
                        }))
                        message.error("操作失败")
                    }
                }
            
        })
    }
}
export function map_snapshot_clone_ok(lun){
    return {
        type: MAP_SNAPSHOT_CLONE_OK,
        lun
    }
}
export function map_snapshot_clone_error(reason){
    return {
        type: MAP_SNAPSHOT_CLONE_ERROR,
        reason: reason
    }
}
export function echo_map_snapshot_clone_modal(params){
    return {
        type: ECHO_MAP_SNAPSHOT_CLONE_MODAL,
        params
    }
}
export function close_map_snapshot_clone_modal(params){
    return {
        type: CLOSE_MAP_SNAPSHOT_CLONE_MODAL,
        params
    }
}
export function set_pagination(pagination){
    return {
        type:SET_PAGINATION,
        cur:pagination.cur,
        tot:pagination.tot,
        pag:pagination.pag,
    }
}


//-----------------------------------------snapshots list-----------------------------------------------------------------
export function fetch_snapshots_list(conditions={searchKey:''},pageSize=10,current=1) {
    return function (dispatch) {
        dispatch(request_snapshots_list())

        let api = new API({
            baseURI: restapi
        });
        // log in to our API with a user/pass
        api.auth([auth.username, auth.password]);
        api.get('/snapshots?ordering=-id'+'&limit='+pageSize+'&offset='+(current-1)*pageSize+'&search='+conditions.searchKey,
         { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_snapshots_list_error(err))
                return false
            }
            // body.reverse()
            // console.log(body.count)
            dispatch(receive_snapshots_list(body,pageSize, current))

        })

    }
}
export function request_snapshots_list(params) {
    return {
        type:REQUEST_SNAPSHOTS_LIST,
        params
        }
}
export function receive_snapshots_list(results,pageSize,current) {
    return {
        type:RECEIVE_SNAPSHOTS_LIST,
        results:results,
        pageSize:pageSize,
        current:current
    }    
}
export function receive_snapshots_list_error(params={}) {
    return {
        type:RECEIVE_SNAPSHOTS_LIST_ERROR,
        params
    }
}
export function toggle_snapshots_in_list(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_SNAPSHOTS_IN_LIST,
        selectedSnapshots:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}





//---------------------------------------portal----------------------------------------------
export function fetch_portals(params={'baseURI':restapi,'auth':auth}) {
    return function (dispatch) {
        dispatch(request_portals(params))

        let api = new API({
            baseURI: params.baseURI
        });
        
        // log in to our API with a user/pass
        api.auth([params.auth.username, params.auth.password]);
        api.get('/portals'+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                dispatch(receive_portals_error(params))
                return false
            }

            dispatch(receive_portals(body.results))
            var portals = body.results
            portals.forEach(function(portal){
                let api = new API({
                    baseURI: portal.ipaddress
                });
                api.get('' + '?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'cache-control': 'no-cache' } }, (err, res, body) => {
                    if (err) {
                        console.log('err', err)
                        //dispatch(receive_log_detail_error(body))
                        return false
                    }

                    dispatch(receive_ipaddress(portal.id,body.address))
                })
            })


        })

    }
}
export function receive_ipaddress(portalId,ipaddress){
    return{
        type:RECEIVE_IPADDRESS,
        portalId,
        ipaddress
    }
}
export function request_portals(params){
    return{
        type: REQUEST_PORTALS,
        params
    }
}
export function receive_portals(portalsjson){
    return {
        type: RECEIVE_PORTALS,
        items:portalsjson
    }
}
export function receive_portals_error(params={}){
    return{
        type:RECEIVE_PORTALS_ERROR,
        params
    }
}
//-------------------------------------------------lun------------------------------------------------
export function fetch_luns(params={'baseURI':restapi,'auth':auth}) {
    return function (dispatch) {
        dispatch(request_luns(params))

        let api = new API({
            baseURI: params.baseURI
        });
        
        // log in to our API with a user/pass
        api.auth([params.auth.username, params.auth.password]);
        api.get('/luns'+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                dispatch(receive_luns_error(params))
                return false
            }

            dispatch(receive_luns(body.results))
            var luns = body.results
            luns.forEach(function(lun){
                let api = new API({
                    baseURI: lun.volume
                });
                api.get('' + '?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'cache-control': 'no-cache' } }, (err, res, body) => {
                    if (err) {
                        console.log('err', err)
                        //dispatch(receive_log_detail_error(body))
                        return false
                    }
                })
            })

        })

    }
}

export function request_luns(params){
    return{
        type: REQUEST_LUNS,
        params
    }
}
export function receive_luns(lunsjson){
    return {
        type: RECEIVE_LUNS,
        items:lunsjson
    }
}
export function receive_luns_error(params={}){
    return{
        type:RECEIVE_LUNS_ERROR,
        params
    }
}
export function delete_luns(selectedLuns,auth) {
    return function (dispatch) {
        selectedLuns.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: { 'Content-Type': 'text/plain' ,'cache-control':'no-cache'} }, (err, res, body) => {
                if (200<=res.status&&res.status<300) {
                    dispatch(delete_lun_ok(element))
                    dispatch(add_operation({
                        content:'删除已映射列表:'+element.name,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(delete_lun_error(body))
                    dispatch(add_operation({
                        content:'删除已映射列表:'+element.name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            })
        }, auth);
    }
}
export function delete_lun_error(lun) {
    return {
        type:DELETE_LUN_ERROR,
        lun
    }
}
export function delete_lun_ok(lun) {
    return {
        type:DELETE_LUN_OK,
        lun
    }
}
export function toggle_luns(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_LUNS,
        selectedLuns:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
