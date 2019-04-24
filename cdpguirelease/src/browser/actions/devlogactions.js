/**
 * Created by tanglinhai on 2016/9/7.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,devLogpath,username,password} from '../confs/host'
import {Modal, message} from 'antd';
import {pools, pool183, pool45, poolvolumes} from '../constants/test';
import {add_operation, del_operation} from './operationactions';
import {fetch_volumes} from './actions';

export const REQUEST_DEVLOG = 'REQUEST_DEVLOG'
export const RECEIVE_DEVLOG = 'RECEIVE_DEVLOG'
export const RECEIVE_DEVLOG_ERROR = 'RECEIVE_DEVLOG_ERROR'

export const REQUEST_DEL_DEVLOG = 'REQUEST_DEL_DEVLOG'
export const RECEIVE_DEL_DEVLOG = 'RECEIVE_DEL_DEVLOG'
export const RECEIVE_DEL_DEVLOG_ERROR = 'RECEIVE_DEL_DEVLOG_ERROR'

export const CHECKBOX_CHECKED_DEVLOG = 'CHECKBOX_CHECKED_DEVLOG'

//----------------------------------logdev zhaoyi-------------------------------------------
export const START_LOGDEV_OK = 'START_LOGDEV_OK'
export const START_LOGDEV_ERROR = 'START_LOGDEV_ERROR'
export const ECHO_LOGDEV_MODAL = 'ECHO_LOGDEV_MODAL'
export const CLOSE_LOGDEV_MODAL = 'CLOSE_LOGDEV_MODAL'
export const REPLAY_LOG_OK = 'REPLAY_LOG_OK'
export const REPLAY_LOG_ERROR = 'REPLAY_LOG_ERROR'
export const ECHO_REPLAY_LOG_MODAL = 'ECHO_REPLAY_LOG_MODAL'
export const CLOSE_REPLAY_LOG_MODAL = 'CLOSE_REPLAY_LOG_MODAL'
export const RECEIVE_LOG_DETAIL = 'RECEIVE_LOG_DETAIL'
export const RECEIVE_LOG_DETAIL_ERROR = 'RECEIVE_LOG_DETAIL_ERROR'
export const REQUEST_LOG_DETAIL = 'REQUEST_LOG_DETAIL'
export const CLONE_FOR_REPLAY_OK = 'CLONE_FOR_REPLAY_OK'
export const CLONE_FOR_REPLAY_ERROR = 'CLONE_FOR_REPLAY_ERROR'

/* select devLog */
export function checkbox_checked_devLog(selectedRowKeys) {
    return {
        type:CHECKBOX_CHECKED_DEVLOG,
        selectedRowKeys
    }
}
/* fetch devLog */
export function request_devLog(params) {
    return {
        type:REQUEST_DEVLOG
    }
}
export function receive_devLog(results, pageSize, current) {
    return {
        type:RECEIVE_DEVLOG,
        results: results,
        pageSize: pageSize,
        current: current
    }
}
export function receive_devLog_error(params={}) {
    return {
        type:RECEIVE_DEVLOG_ERROR,
        params
    }
}
export function fetch_devLog(conditions={searchKey:''}, pageSize=10, current=1) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':devLogpath,'username':username,'password':password};
        dispatch(request_devLog(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit='+pageSize+'&offset='+(current-1)*pageSize, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_devLog_error(params))
                return false
            }
            dispatch(receive_devLog(body, pageSize, current))
        })
    }
}

/* del devLog */
export function request_del_devLog(params) {
    return {
        type:REQUEST_DEL_DEVLOG
    }
}
export function receive_del_devLog(params) {
    return {
        type:RECEIVE_DEL_DEVLOG
    }
}
export function receive_del_devLog_error(params={}) {
    return {
        type:RECEIVE_DEL_DEVLOG_ERROR,
        params
    }
}
export function del_devLogs(devlogId=0, pagination={current:1, pageSize:10}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':devLogpath,'username':username,'password':password};
        dispatch(request_del_devLog(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.del(params.path+'/'+devlogId+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_del_devLog_error(params))
                dispatch(add_operation({
                    content: '删除DEV日志ID:'+devlogId,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
            }
            dispatch(receive_del_devLog(body))
            dispatch(fetch_devLog({searchKey:''}, pagination.pageSize, pagination.current))
            dispatch(add_operation({
                content: '删除DEV日志ID:'+devlogId,
                result: 'success'
            }));
            message.success("操作成功！");
        })
    }
}
//--------------------------------logdev functions----zhaoyi--------------------------------------
export function start_logdev(srcvolId,logdev,auth) {
    return function (dispatch) {
        console.log(logdev.logvol_id)
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username,auth.password]);
        api.post('/logdev', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'cache-control': 'no-cache' },
            body: JSON.stringify({ 'name': logdev.logdev_name, 'sourcevolume': srcvolId, 'logvolume': logdev.logvol_id })
        }, (err, res, body) => {
            if (err) {
                console.log('start logdev err', err, res, body)
                dispatch(close_logdev_modal())
                dispatch(start_logdev_error(body))
                dispatch(add_operation({
                    content: '开启日志卷:' + logdev.logdev_name,
                    result: 'failed'
                }))
                message.error("操作失败");
            }

            if (res.status == 201) {
                dispatch(close_logdev_modal())
                dispatch(start_logdev_ok(body))
                dispatch(add_operation({
                    content: '开启日志卷:' + logdev.logdev_name,
                    result: 'success'
                }))
                message.success("操作成功");
                dispatch(fetch_volumes())
            } else {
                dispatch(close_logdev_modal())
                dispatch(start_logdev_error(body))
                dispatch(add_operation({
                    content: '开启日志卷:' + logdev.logdev_name,
                    result: 'failed'
                }))
                message.error("操作失败");
            }

        })
    }
}
export function start_logdev_ok(logdev){
    return {
        type:START_LOGDEV_OK,
        logdev
    }
}
export function start_logdev_error(reason){
    return{
        type:START_LOGDEV_ERROR,
        reason:reason
    }
}
export function echo_logdev_modal(srcvolId){
    return{
        type:ECHO_LOGDEV_MODAL,
        srcvolId
    }
}
export function close_logdev_modal(){
    return{
        type:CLOSE_LOGDEV_MODAL
    }
}
export function replay_log(url,name,auth,startdir,logdevId,datetime,cloneId){
    return function(dispatch){
        let api = new API({
            baseURI:url
        });
        api.auth([auth.username,auth.password]);
        api.post('/replayto', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 'logdev': logdevId,'startdir':startdir,'limit':0,'endtime':datetime })
        }, (err, res, body) => {
            if (err) {
                console.log('replay log err', err, res, body)
                dispatch(replay_log_error(body))
                dispatch(add_operation({
                    content: '回放卷:' + cloneId,
                    result: 'failed'
                }))
                message.error("操作失败");
            }
            if (res.status == 200) {
                dispatch(close_replay_log_modal())
                dispatch(replay_log_ok(body))
                dispatch(add_operation({
                    content: '回放卷:' + cloneId,
                    result: 'success'
                }))
                message.success("操作成功");
            } else {
                dispatch(replay_log_error(body))
                dispatch(add_operation({
                    content: '回放卷:' + cloneId,
                    result: 'failed'
                }))
                message.error("操作失败");
            }

        })
    }
}
export function replay_log_ok(task){
    return {
        type:REPLAY_LOG_OK,
        task
    }
}
export function replay_log_error(reason){
    return {
        type:REPLAY_LOG_ERROR,
        reason:reason
    }
}
export function echo_replay_log_modal(logdevId,snaplist){
    return {
        type:ECHO_REPLAY_LOG_MODAL,
        logdevId,
        snaplist
    }
}
export function close_replay_log_modal(){
    return {
        type:CLOSE_REPLAY_LOG_MODAL
    }
}
export function fetch_log_detail(url,auth){
    return function(dispatch){
        dispatch(request_log_detail())
        let api = new API({
            baseURI:url
        });
        api.auth([auth.username, auth.password]);
        api.get('/logdetail'+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_log_detail_error(body))
                return false
            }

            dispatch(receive_log_detail(body))

        })

    }
}
export function request_log_detail(params){
    return{
        type:REQUEST_LOG_DETAIL,
        params
    }
}
export function receive_log_detail(logdetailjson){
    return {
        type:RECEIVE_LOG_DETAIL,
        items:logdetailjson
    }
}
export function receive_log_detail_error(params={}){
    return {
        type:RECEIVE_LOG_DETAIL_ERROR,
        params
    }
}
export function create_snap_task(snaptask){
    return{
        type:CREATE_SNAP_TASK,
        snaptask
    }
}
export function clone_and_replay(url,name,auth,startdir,logdevId,datetime) {
    // console.log(url)
    return function (dispatch) {
        let api = new API({
            baseURI: url
        });
        api.auth([auth.username, auth.password]);
        api.post('/clone', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' ,'cache-control':'no-cache'},
            body: JSON.stringify({ 'name': name })
        }, (err, res, body) => {
            if (err) {
                // console.log('clone snapshot err', err, res, body)
                dispatch(clone_for_replay_error(body))
            } else {
                // console.log( body.url)
                if (res.status == 201) {
                    dispatch(close_replay_log_modal())
                    dispatch(clone_for_replay_ok(body))
                    dispatch(replay_log(body.url,name,auth,startdir,logdevId,datetime,body.id))
                } else {
                    dispatch(clone_for_replay_error(body))
                }
            }
        })

    }
}
export function clone_for_replay_ok(clonevolume){
    return{
        type:CLONE_FOR_REPLAY_OK,
        clonevolume
    }
}
export function clone_for_replay_error(reason){
    return{
        type:CLONE_FOR_REPLAY_ERROR,
        reason
    }
}
export function setSnaplist(url, auth, logvolumeUrl,logdevId) {
    return function (dispatch) {

        let api = new API({
            baseURI: url
        });

        // log in to our API with a user/pass
        api.auth([auth.username, auth.password]);
        api.get('/snapshots' + '?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'cache-control': 'no-cache' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                return false
            }
            var snapshots = body.results
            // console.log(snapshots)
            let api = new API({
                baseURI: logvolumeUrl
            });
            api.auth([auth.username, auth.password]);
            api.get('/logdetail' + '?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'cache-control': 'no-cache' } }, (err, res, body) => {
                if (err) {
                    console.log('err', err)
                    dispatch(receive_log_detail_error(body))
                    return false
                }

                dispatch(receive_log_detail(body))
                var entries = body.entries
                // console.log(entries)
                if (entries.length == 0) { message.error("无日志信息，无法回放！"); } else {
                    var snaplist = new Array()
                    snapshots.forEach(function (element) {
                        // console.log(element)
                        var snaptime = Date.parse(new Date(element.createdate+"+08:00"))
                        snaptime = snaptime / 1000
                        // console.log(snaptime <= entries[0].timestamp,snaptime >= entries[entries.length - 1].timestamp)
                        // console.log(snaptime , entries[0].timestamp)

                        if (snaptime <= entries[0].timestamp) {
                            // console.log(element)
                            snaplist.push(element)
                        }
                    })
                    // console.log(logdevId, snaplist)
                    dispatch(echo_replay_log_modal(logdevId, snaplist))
                }
            })
        })

    }
}