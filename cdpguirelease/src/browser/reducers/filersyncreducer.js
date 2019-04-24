import {REQUEST_FILERSYNC,RECEIVE_FILERSYNC,RECEIVE_FILERSYNC_ERROR,REQUEST_MODIFY_FILERSYNC,
        RECEIVE_MODIFY_FILERSYNC,RECEIVE_MODIFY_FILERSYNC_ERROR,CREATE_FILERSYNC_SUCCESS,
        CREATE_FILERSYNC_ERROR,DELETE_FILERSYNC_SUCCESS,DELETE_FILERSYNC_ERROR,TOGGLE_FILERSYNC,
        ECHO_FILERSYNC,CLOSE_FILERSYNC,
} from '../actions/filersyncaction'
import update from 'immutability-helper';

function fileRsync(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_FILERSYNC:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedFilersync:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_FILERSYNC:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.filersync,
            })
        case RECEIVE_FILERSYNC_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_FILERSYNC:
            return Object.assign({}, state, {
                create_filersync: true,
                echo:action.echo
            })
        case CLOSE_FILERSYNC:
            return Object.assign({}, state, {
                create_filersync: false,
                echo:''
            })
        case TOGGLE_FILERSYNC:
            return Object.assign({},state,{
                selectedFilersync:action.selectedFilersync,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_FILERSYNC_SUCCESS:
            return Object.assign({},state,{items:state.items.filter(function(item){ return(item.id != action.filersync.id) },action)})
        case DELETE_FILERSYNC_ERROR:
            return state
        case CREATE_FILERSYNC_SUCCESS:
            return update(state,{items:{$unshift:[action.filersync]}})
        case CREATE_FILERSYNC_ERROR:
            return state
        case REQUEST_MODIFY_FILERSYNC:
            return state
        case RECEIVE_MODIFY_FILERSYNC:
            return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.modify.id){
                        item=action.modify
                        return item
                    }else{
                        return item
                    }
                },action)})
        case RECEIVE_MODIFY_FILERSYNC_ERROR:
            return state
        default:
            return state


    }
}
function filersync(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fileRsync(state,action)
}

export default filersync
