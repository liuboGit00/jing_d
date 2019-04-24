/**
 * Created by tanglinhai on 2016/8/30.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,username,password} from '../confs/host'
import {Modal, message} from 'antd';
import {pools, pool183, pool45, poolvolumes} from '../constants/test';
import {add_operation, del_operation} from './operationactions'
import {fetch_volumes} from './actions'

export const REQUEST_POOL = 'REQUEST_POOL'
export const RECEIVE_POOL = 'RECEIVE_POOL'
export const RECEIVE_POOL_ERROR = 'RECEIVE_POOL_ERROR'

export const REQUEST_POOL_VOLUMES = 'REQUEST_POOL_VOLUMES'
export const RECEIVE_POOL_VOLUMES = 'RECEIVE_POOL_VOLUMES'
export const RECEIVE_POOL_VOLUMES_ERROR = 'RECEIVE_POOL_VOLUMES_ERROR'

export const CHECKBOX_CHECKED_POOL_VOLUMES = 'CHECKBOX_CHECKED_POOL_VOLUMES'

export const REQUEST_POOL_SETTING = 'REQUEST_POOL_SETTING'
export const RECEIVE_POOL_SETTING = 'RECEIVE_POOL_SETTING'
export const RECEIVE_POOL_SETTING_ERROR = 'RECEIVE_POOL_SETTING_ERROR'

export const REQUEST_DEL_POOL_VOLUMES = 'REQUEST_DEL_POOL_VOLUMES'
export const RECEIVE_DEL_POOL_VOLUMES = 'RECEIVE_DEL_POOL_VOLUMES'
export const RECEIVE_DEL_POOL_VOLUMES_ERROR = 'RECEIVE_DEL_POOL_VOLUMES_ERROR'

export const RECEIVE_ADDORUPDATE_VOLUME_FORM = 'RECEIVE_ADDORUPDATE_VOLUME_FORM'

export const OPEN_ADD_VOLUME_WIN = 'OPEN_ADD_VOLUME_WIN'
export const CLOSE_ADD_VOLUME_WIN = 'CLOSE_ADD_VOLUME_WIN'
export const OPEN_UPDATE_VOLUME_WIN = 'OPEN_UPDATE_VOLUME_WIN'
export const CLOSE_UPDATE_VOLUME_WIN = 'CLOSE_UPDATE_VOLUME_WIN'

export const REQUEST_ADD_VOLUME = 'REQUEST_ADD_VOLUME'
export const RECEIVE_ADD_VOLUME = 'RECEIVE_ADD_VOLUME'
export const RECEIVE_ADD_VOLUME_ERROR = 'RECEIVE_ADD_VOLUME_ERROR'
//----------------------------------------------------pools end--------------------------------------------------------------


//----------------------------------------------------pools start--------------------------------------------------------------
/* add volume */
export function request_add_volume(params) {
    return {
        type:REQUEST_ADD_VOLUME
    }
}
export function receive_add_volume(volume) {
    return {
        type:RECEIVE_ADD_VOLUME,
        volume
    }
}
export function receive_add_volume_error(params={}) {
    return {
        type:RECEIVE_ADD_VOLUME_ERROR,
        params
    }
}
export function add_volume(poolId, form, type) {

    return function (dispatch) {
        const values = form.getFieldsValue();
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_add_volume(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.post(params.path+'/'+poolId+'/createvolume', {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','Content-Type':'application/json'},
             body: JSON.stringify({
                 'name': values.volumeName,
                 'megs': values.volumeSize+'',
                 'filesystem': values.volumeType == 'zvol' ? '' : values.volumeType
             })
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_add_volume_error(params))
                dispatch(add_operation({
                    content: '添加卷'+values.volumeName,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
            }
            dispatch(receive_add_volume(body))
            //dispatch(fetch_volumes())
            dispatch(fetch_pool_volumes({
                poolId: poolId,
                volumeType: type
            }))
            dispatch(add_operation({
                content: '添加卷'+values.volumeName,
                result: 'success'
            }));
            message.success("操作成功！");
        })
    }
}


/* open add volume win */
export function open_add_volume_win(params) {
    return {
        type:OPEN_ADD_VOLUME_WIN
    }
}
/* close add volume win */
export function close_add_volume_win(params) {
    return {
        type:CLOSE_ADD_VOLUME_WIN
    }
}
/* open update volume win */
export function open_update_volume_win(params) {
    return {
        type:OPEN_UPDATE_VOLUME_WIN,
        volume: params
    }
}
/* close update volume win */
export function close_update_volume_win(params) {
    return {
        type:CLOSE_UPDATE_VOLUME_WIN
    }
}


/* get volume form data */
export function receive_addOrUpdate_volume_form(params) {
    return {
        type:RECEIVE_ADDORUPDATE_VOLUME_FORM,
        formdata: params
    }
}


/* del pool volumes */
export function request_del_pool_volumes(params) {
    return {
        type:REQUEST_DEL_POOL_VOLUMES
    }
}
export function receive_del_pool_volumes(params) {
    return {
        type:RECEIVE_DEL_POOL_VOLUMES
    }
}
export function receive_del_pool_volumes_error(params={}) {
    return {
        type:RECEIVE_DEL_POOL_VOLUMES_ERROR,
        params
    }
}
export function del_pool_volumes(poolId, volumeId, type) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':volumespath,'username':username,'password':password};
        dispatch(request_del_pool_volumes(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.del(params.path+'/'+volumeId+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json'}/*,
            body: JSON.stringify({"disks" : disks,"options":{}})*/
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_del_pool_volumes_error(params))
                dispatch(add_operation({
                    content: '删除卷ID:'+volumeId,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
            }
            dispatch(receive_del_pool_volumes(body))
            dispatch(fetch_pool_volumes({
                poolId: poolId,
                volumeType: type
            }))
            dispatch(add_operation({
                content: '删除卷ID:'+volumeId,
                result: 'success'
            }));
            message.success("操作成功！");
        })
    }
}
/* select pool volumes */
export function checkbox_checked_pool_volumes(selectedRowKeys, type) {
    return {
        type:CHECKBOX_CHECKED_POOL_VOLUMES,
        selectedRowKeys,
        volumeType: type
    }
}

/* fetch pool volumes */
export function request_pool_volumes(params) {
    return {
        type:REQUEST_POOL_VOLUMES
    }
}
export function receive_pool_volumes(items, volumeType) {
    return {
        type:RECEIVE_POOL_VOLUMES,
        items:items,
        volumeType: volumeType
    }
}
export function receive_pool_volumes_error(params={}) {
    return {
        type:RECEIVE_POOL_VOLUMES_ERROR,
        params
    }
}
export function fetch_pool_volumes(conditions={poolId:0,searchKey:'',volumeType:''}) {
    console.log(conditions)
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_pool_volumes(params))
        let api = new API({
            baseURI: params.baseURI
        });
        /*//test----------------------------------------------------
        dispatch(receive_pool_volumes(poolvolumes))
        return;
        //test----------------------------------------------------*/
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'/'+conditions.poolId+'/volumes?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json'}
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_pool_volumes_error(params))
                return false
            }
            dispatch(receive_pool_volumes(body, conditions.volumeType))

        })

    }
}


/* fetch pool */
export function request_pool(params) {
    return {
        type:REQUEST_POOL
    }
}
export function receive_pool(pool) {
    return {
        type:RECEIVE_POOL,
        pool:pool,
    }
}
export function receive_pool_error(params={}) {
    return {
        type:RECEIVE_POOL_ERROR,
        params
    }
}
export function fetch_pool(poolId=0) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_pool(params))
        let api = new API({
            baseURI: params.baseURI
        });
        /*//test----------------------------------------------------
        if(poolId == 45)
            dispatch(receive_pool(pool45))
        else
            dispatch(receive_pool(pool183))
        return;
        //test----------------------------------------------------*/
        // log in to our API with a user/pass
        //api.auth([params.username, params.password]);
        api.get(params.path+'/'+poolId+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json'}
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_pool_error(params))
                return false
            }
            dispatch(receive_pool(body))
            dispatch(fetch_pool_volumes({
                poolId: poolId
            }))
        })

    }
}

/* fetch pool setting */
export function request_pool_setting(params) {
    return {
        type:REQUEST_POOL_SETTING
    }
}
export function receive_pool_setting(poolsjson) {
    return {
        type:RECEIVE_POOL_SETTING,
        items:poolsjson,
    }
}
export function receive_pool_setting_error(params={}) {
    return {
        type:RECEIVE_POOL_SETTING_ERROR,
        params
    }
}
export function fetch_pool_setting(conditions={'searchKey':''}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_pool_setting(params))
        let api = new API({
            baseURI: params.baseURI
        });
        /*//test----------------------------------------------------
        dispatch(receive_pool(pools))
        return;
        //test----------------------------------------------------*/
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit=999', {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json'},
            //body: JSON.stringify(conditions)
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_pool_setting_error(params))
                return false
            }

            dispatch(receive_pool_setting(body.results))

        })

    }
}