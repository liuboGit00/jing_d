import {REQUEST_LOG_DETAIL,RECEIVE_LOG_DETAIL,RECEIVE_LOG_DETAIL_ERROR} from '../actions/devlogactions'
import update from 'immutability-helper'

function fetchLogDetail(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_LOG_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
            })
        case RECEIVE_LOG_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_LOG_DETAIL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        default:
            return state
    }
}

function logdetail(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchLogDetail(state,action)
}

export default logdetail