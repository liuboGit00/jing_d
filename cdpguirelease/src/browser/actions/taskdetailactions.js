/**
 * Created by tanglinhai on 2016/9/12.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,resultspath,username,password} from '../confs/host'
import {Modal, message} from 'antd';

export const REQUEST_TASK_DETAIL = 'REQUEST_TASK_DETAIL'
export const RECEIVE_TASK_DETAIL = 'RECEIVE_TASK_DETAIL'
export const RECEIVE_TASK_DETAIL_ERROR = 'RECEIVE_TASK_DETAIL_ERROR'


/* fetch task_detail */
export function request_task_detail(params) {
    return {
        type:REQUEST_TASK_DETAIL
    }
}
export function receive_task_detail(item) {
    return {
        type:RECEIVE_TASK_DETAIL,
        item: item
    }
}
export function receive_task_detail_error(params={}) {
    return {
        type:RECEIVE_TASK_DETAIL_ERROR,
        params
    }
}
export function fetch_task_detail(id=0) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':resultspath,'username':username,'password':password};
        dispatch(request_task_detail(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?task_id='+id, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_task_detail_error(params))
                return false
            }
            dispatch(receive_task_detail(body.results[0]))
        })
    }
}
