/**
 * Created by tanglinhai on 2016/9/7.
 */
import {
    REQUEST_DEVLOG,
    RECEIVE_DEVLOG,
    RECEIVE_DEVLOG_ERROR,

    REQUEST_DEL_DEVLOG,
    RECEIVE_DEL_DEVLOG,
    RECEIVE_DEL_DEVLOG_ERROR,

    CHECKBOX_CHECKED_DEVLOG,

    START_LOGDEV_OK,
    START_LOGDEV_ERROR
} from '../actions/devlogactions'

import update from 'immutability-helper';

function updateCmdlogsState(state={isFetching:false,didInvalidate:true,items:[],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
}, operation:{}},action) {

    switch (action.type) {
        case REQUEST_DEVLOG:
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate:false
            })
        case RECEIVE_DEVLOG:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                items: action.results.results,
                pagination: {
                    current: action.current,
                    total: action.results.count,
                    pageSize: action.pageSize,
                }
            })

        case RECEIVE_DEVLOG_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true
            })
        case REQUEST_DEL_DEVLOG:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'loading'
                }
            })
        case RECEIVE_DEL_DEVLOG:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'success'
                }
            })
        case RECEIVE_DEL_DEVLOG_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'failed'
                }
            })
        case CHECKBOX_CHECKED_DEVLOG:
            return Object.assign({},state, {
                selectedRowKeys:action.selectedRowKeys
            })
        case START_LOGDEV_OK:
            return update(state,{
                items:{$push:[action.logdev]}
            })
        case START_LOGDEV_ERROR:
            return state
        default:
            return state
    }
}

function devLogState(state={isFetching:false,didInvalidate:true,items:[],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
}, operation:{}},action) {
    return updateCmdlogsState(state,action)
}

export default devLogState
