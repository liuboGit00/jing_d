import {REQUEST_SNAPSHOTS, RECEIVE_SNAPSHOTS, RECEIVE_SNAPSHOTS_ERROR,TOGGLE_SNAPSHOTS,ECHO_CREATE_SNAPSHOT_MODAL,
        CLOSE_CREATE_SNAPSHOT_MODAL,ECHO_MAP_SNAPSHOT_MODAL,CLOSE_MAP_SNAPSHOT_MODAL,CREATE_SNAPSHOT_ERROR,
        CREATE_SNAPSHOT_OK,DELETE_SNAPSHOT_ERROR,DELETE_SNAPSHOT_OK,ECHO_CLONE_SNAPSHOT_MODAL,CLOSE_CLONE_SNAPSHOT_MODAL,
        CLONE_SNAPSHOT_OK,CLONE_SNAPSHOT_ERROR,ECHO_MAP_VOLUME_SNAPSHOT_MODAL,CLOSE_MAP_VOLUME_SNAPSHOT_MODAL,
        MAP_VOLUME_SNAPSHOT_OK,REQUEST_ONLY_SNAPSHOTS,RECEIVE_ONLY_SNAPSHOTS,RECEIVE_ONLY_SNAPSHOTS_ERROR,SET_PAGINATION,
    } from '../actions/actions'
import update from 'immutability-helper';
function fetchSnapshots(state={isFetching:false,didInvalidate:true,items:[]},action){
    // console.log(state.pagination)
    switch(action.type){
        case REQUEST_SNAPSHOTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                selectedSnapshots: [],
                selectedRowKeys: []
            })
        case RECEIVE_SNAPSHOTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.results.results,
                pagination: {
                    current: action.current,
                    total: action.results.count,
                    pageSize: action.pageSize,
                }
            })
        case RECEIVE_SNAPSHOTS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_SNAPSHOTS:
            return Object.assign({}, state, {
                selectedSnapshots: action.selectedSnapshots,
                selectedRowKeys: action.selectedRowKeys
            })
        case ECHO_CREATE_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                create_snapshot_modal: true
            })
        case CLOSE_CREATE_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                create_snapshot_modal: false
            })
        case ECHO_MAP_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                map_snapshot_modal: true
            })
        case CLOSE_MAP_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                map_snapshot_modal: false
            })
        case CREATE_SNAPSHOT_OK:
            return update(state, { 
                items: { $push: [action.snapshot] },
                // pagination: {
                //     current: state.pagination.current,
                //     total: state.pagination.total + 1,
                //     pageSize: state.pagination.pageSize,
                // }
               
            })
        case CREATE_SNAPSHOT_ERROR:
            return state
        case DELETE_SNAPSHOT_OK:
            return Object.assign({}, state, { 
                items: state.items.filter(function (item) { return (item.id != action.snapshot.id) }, action),
                // pagination: {
                //     current: state.pagination.current,
                //     total: state.pagination.total - 1,
                //     pageSize: state.pagination.pageSize,
                // }
            })
        case DELETE_SNAPSHOT_ERROR:
            return state
        case ECHO_CLONE_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                clone_snapshot_modal: true
            })
        case CLOSE_CLONE_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                clone_snapshot_modal: false
            })
        case CLONE_SNAPSHOT_OK:
            return state
        case CLONE_SNAPSHOT_ERROR:
            return state
        case ECHO_MAP_VOLUME_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                map_volume_snapshot_modal: true
            })
        case CLOSE_MAP_VOLUME_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                map_volume_snapshot_modal: false
            })
        case MAP_VOLUME_SNAPSHOT_OK:
            return state
        case REQUEST_ONLY_SNAPSHOTS:
            return Object.assign({},state,{})
        case RECEIVE_ONLY_SNAPSHOTS:
            return Object.assign({},state,{
                items:state.items.map(function(item){
                    if(item.id == action.onlySnapshots.id){
                        item = action.onlySnapshots;
                        return item
                    }else{
                        return item
                    }
                })
            })
        case RECEIVE_ONLY_SNAPSHOTS_ERROR :
            return Object.assign({},state,{})
        case SET_PAGINATION:
            return Object.assign({},state,{
                pagination: {
                    current: action.cur,
                    total: action.tot,
                    pageSize: action.pag,
                }
            })
        default:
            return state
    }
}

function snapshots(state = { isFetching: false, didInvalidate: true, items: [],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
} }, action) {
    return fetchSnapshots(state, action)
}

export default snapshots