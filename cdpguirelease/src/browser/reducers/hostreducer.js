import {REQUEST_HOST,RECEIVE_HOST,RECEIVE_HOST_ERROR,ECHO_CREATE_HOST,CLOSE_CREATE_HOST,TOGGLE_HOST,DELETE_HOST_OK,DELETE_HOST_ERROR,
        CREATE_HOST_OK,CREATE_HOST_ERROR,ECHO_MODIFY_HOST,CLOSE_MODIFY_HOST,MODIFY_HOST_ERROR,MODIFY_HOST_OK } from '../actions/hostactions'
import update from 'immutability-helper';

function fetchHOSTS(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_HOST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedHost:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_HOST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.items,
            })
        case RECEIVE_HOST_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_CREATE_HOST:
            return Object.assign({}, state, {
                create_host: true
            })
        case CLOSE_CREATE_HOST:
            return Object.assign({}, state, {
                create_host: false
            })
        case TOGGLE_HOST:
            return Object.assign({},state,{
                selectedHost:action.selectedHost,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_HOST_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.host.id)},action)})
        case DELETE_HOST_ERROR:
            return state
        case CREATE_HOST_OK:
            return update(state,{items:{$unshift:[action.host]}})
        case CREATE_HOST_ERROR:
            return state
        case ECHO_MODIFY_HOST:
            return Object.assign({},state,{
                modify_host_modal:true
            })
        case CLOSE_MODIFY_HOST:
            return Object.assign({},state,{
                modify_host_modal:false
            })
        case MODIFY_HOST_ERROR:
            return state
        case MODIFY_HOST_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id == action.ok.id){
                    item=action.ok;
                    return item
                }else{
                    return item
                }
            },action)})
        default:
            return state

    }
}
function host(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchHOSTS(state,action)
}

export default host
