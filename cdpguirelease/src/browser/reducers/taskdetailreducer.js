/**
 * Created by tanglinhai on 2016/9/7.
 */
import {
    REQUEST_TASK_DETAIL,
    RECEIVE_TASK_DETAIL,
    RECEIVE_TASK_DETAIL_ERROR
} from '../actions/taskdetailactions'

function updateTaskDetailState(state={isFetching:false,didInvalidate:true,item:{}},action) {

    switch (action.type) {
        case REQUEST_TASK_DETAIL:
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate:false
            })
        case RECEIVE_TASK_DETAIL:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                item: action.item
            })

        case RECEIVE_TASK_DETAIL_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true
            })
        default:
            return state
    }
}

function taskDetailState(state={isFetching:false,didInvalidate:true,item:{}},action) {
    return updateTaskDetailState(state,action)
}
export default taskDetailState
