/**
 * Created by tanglinhai on 2016/9/7.
 */

//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,cmdlogspath,username,password} from '../confs/host'
import {Modal, message} from 'antd';
import {pools, pool183, pool45, poolvolumes} from '../constants/test';
import {add_operation, del_operation} from './operationactions'

export const REQUEST_CMDLOGS = 'REQUEST_CMDLOGS'
export const RECEIVE_CMDLOGS = 'RECEIVE_CMDLOGS'
export const RECEIVE_CMDLOGS_ERROR = 'RECEIVE_CMDLOGS_ERROR'

export const REQUEST_DEL_CMDLOGS = 'REQUEST_DEL_CMDLOGS'
export const RECEIVE_DEL_CMDLOGS = 'RECEIVE_DEL_CMDLOGS'
export const RECEIVE_DEL_CMDLOGS_ERROR = 'RECEIVE_DEL_CMDLOGS_ERROR'

export const CHECKBOX_CHECKED_CMDLOGS = 'CHECKBOX_CHECKED_CMDLOGS'


/* select cmdlogs */
export function checkbox_checked_cmdlogs(selectedRowKeys) {
    return {
        type:CHECKBOX_CHECKED_CMDLOGS,
        selectedRowKeys
    }
}
/* fetch cmdlogs */
export function request_cmdlogs(params) {
    return {
        type:REQUEST_CMDLOGS
    }
}
export function receive_cmdlogs(results, pageSize, current) {
    return {
        type:RECEIVE_CMDLOGS,
        results: results,
        pageSize: pageSize,
        current: current
    }
}
export function receive_cmdlogs_error(params={}) {
    return {
        type:RECEIVE_CMDLOGS_ERROR,
        params
    }
}
export function fetch_cmdlogs(conditions={searchKey:''}, pageSize=10, current=1) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':cmdlogspath,'username':username,'password':password};
        dispatch(request_cmdlogs(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?ordering=-id'+'&limit='+pageSize+'&offset='+(current-1)*pageSize+'&search='+conditions.searchKey+'&time='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' ,'cache-control':'no-cache'}
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_cmdlogs_error(params))
                return false
            }
            dispatch(receive_cmdlogs(body, pageSize, current))
        })
    }
}

/* del cmdlogs */
export function request_del_cmdlogs(params) {
    return {
        type:REQUEST_DEL_CMDLOGS
    }
}
export function receive_del_cmdlogs(params) {
    return {
        type:RECEIVE_DEL_CMDLOGS
    }
}
export function receive_del_cmdlogs_error(params={}) {
    return {
        type:RECEIVE_DEL_CMDLOGS_ERROR,
        params
    }
}
export function del_cmdlogs(cmdlogId=0, pagination={current:1, pageSize:10}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':cmdlogspath,'username':username,'password':password};
        dispatch(request_del_cmdlogs(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        // api.auth([params.username, params.password]);
        api.del(params.path+'/'+cmdlogId+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_del_cmdlogs_error(params))
                dispatch(add_operation({
                    content: '删除CMD日志ID:'+cmdlogId,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
            }
            dispatch(receive_del_cmdlogs(body))
            dispatch(fetch_cmdlogs({searchKey:''}, pagination.pageSize, pagination.current))
            dispatch(add_operation({
                content: '删除CMD日志ID:'+cmdlogId,
                result: 'success'
            }));
            message.success("操作成功！");
        })
    }
}