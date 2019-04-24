/**
 * Created by tanglinhai on 2016/9/7.
 */
import {
    REQUEST_TASK,
    RECEIVE_TASK,
    RECEIVE_TASK_ERROR,

    REQUEST_DEL_TASK,
    RECEIVE_DEL_TASK,
    RECEIVE_DEL_TASK_ERROR,

    CHECKBOX_CHECKED_TASK,
    RECEIVE_SEARCHADVANCEFORM_STATE,
    RECEIVE_ADDORUPDATE_SEARCHADVANCEFORM,

    SELECT_TASK_TYPE,
    SELECT_TASK_PERIOD,
    CREATE_SNAP_TASK,
    CREATE_MODIFY_SCHEDUL_CONTENT_ERR,
    CREATE_MODIFY_SCHEDUL_CONTENT_OK,
} from '../actions/taskactions'

function updateTaskState(state={isFetching:false,didInvalidate:true,items:[],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
}, operation:{},searchAdvanceForm:{
    keyword: '',
    status: '',
    startDate: null,
    endDate: null
},searchAdvanceFormState:{
    endOpen: false
}},action) {
    switch (action.type) {
        case REQUEST_TASK:
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate:false
            })
        case RECEIVE_TASK:
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

        case RECEIVE_TASK_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true
            })
        case REQUEST_DEL_TASK:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'loading'
                }
            })
        case RECEIVE_DEL_TASK:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'success'
                }
            })
        case RECEIVE_DEL_TASK_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'failed'
                }
            })
        case CHECKBOX_CHECKED_TASK:
            return Object.assign({},state, {
                selectedRowKeys:action.selectedRowKeys
            })
        case RECEIVE_SEARCHADVANCEFORM_STATE:
            return Object.assign({},state, {
                searchAdvanceFormState: Object.assign({}, state.searchAdvanceFormState, action.formState)
            })
        case RECEIVE_ADDORUPDATE_SEARCHADVANCEFORM:
            return Object.assign({},state, {
                searchAdvanceForm: action.form
            })
        case SELECT_TASK_TYPE:
            return Object.assign({}, state, {
                task_name: action.task_name,
                ptask_name:action.ptask_name
            })
        /*case SELECT_TASK_PERIOD:
            return Object.assign({},state,{
                period:action.period
            })*/
        case CREATE_SNAP_TASK:
            return Object.assign({},state,{
                args: action.args,
                kwargs:action.kwargs,
                copy:action.copy,
                crontab:action.crontab,
            })
        case CREATE_MODIFY_SCHEDUL_CONTENT_ERR:
            return Object.assign({},state,{
               
            })
        case CREATE_MODIFY_SCHEDUL_CONTENT_OK:
            return Object.assign({},state,{
                items:state.items.map(function(items){
                    if(item.id==action.schedulecontent.id){
                        item = action.schedulecontent
                        return item
                    }
                    return item
                },action)
            })
        default:
            return state
    }
}

function taskState(state={isFetching:false,didInvalidate:true,items:[],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
}, operation:{},searchAdvanceForm:{
    keyword: '',
    status: '',
    startDate: null,
    endDate: null
},searchAdvanceFormState:{
    endOpen: false
}},action) {
    return updateTaskState(state,action)
}

export default taskState
