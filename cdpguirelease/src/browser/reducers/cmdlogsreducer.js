/**
 * Created by tanglinhai on 2016/9/7.
 */
import {
    REQUEST_CMDLOGS,
    RECEIVE_CMDLOGS,
    RECEIVE_CMDLOGS_ERROR,

    REQUEST_DEL_CMDLOGS,
    RECEIVE_DEL_CMDLOGS,
    RECEIVE_DEL_CMDLOGS_ERROR,

    CHECKBOX_CHECKED_CMDLOGS
} from '../actions/cmdlogsactions'

function updateCmdlogsState(state={isFetching:false,didInvalidate:true,items:[],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
},operation:{}},action) {

    switch (action.type) {
        case REQUEST_CMDLOGS:
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate:false
            })
        case RECEIVE_CMDLOGS:
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

        case RECEIVE_CMDLOGS_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true
            })
        case REQUEST_DEL_CMDLOGS:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'loading'
                }
            })
        case RECEIVE_DEL_CMDLOGS:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'success'
                },
                selectedRowKeys:[],
            })
        case RECEIVE_DEL_CMDLOGS_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'failed'
                }
            })
        case CHECKBOX_CHECKED_CMDLOGS:
            return Object.assign({},state, {
                selectedRowKeys:action.selectedRowKeys
            })

        default:
            return state
    }
}

function cmdlogsState(state={isFetching:false,didInvalidate:true,items:[],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
},operation:{}},action) {
    return updateCmdlogsState(state,action)
}

export default cmdlogsState
