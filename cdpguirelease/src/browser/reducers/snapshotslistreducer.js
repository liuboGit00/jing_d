import {ECHO_MAP_SNAPSHOT_MODAL,CLOSE_MAP_SNAPSHOT_MODAL,MAP_SNAPSHOT_OK,MAP_SNAPSHOT_ERROR, REQUEST_SNAPSHOTS_LIST,RECEIVE_SNAPSHOTS_LIST,RECEIVE_SNAPSHOTS_LIST_ERROR,TOGGLE_SNAPSHOTS_IN_LIST,DELETE_SNAPSHOT_OK_IN_LIST} from '../actions/actions'
import update from 'immutability-helper';

function fetchSnapshotsList(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_SNAPSHOTS_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                selectedSnapshots: [],
                selectedRowKeys: []
            })
        case RECEIVE_SNAPSHOTS_LIST:
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
        case RECEIVE_SNAPSHOTS_LIST_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_SNAPSHOTS_IN_LIST:
            return Object.assign({}, state, {
                selectedSnapshots: action.selectedSnapshots,
                selectedRowKeys: action.selectedRowKeys
            })
        case DELETE_SNAPSHOT_OK_IN_LIST:
            return Object.assign({}, state, { items: state.items.filter(function (item) { return (item.id != action.snapshot.id) }, action) })
        case ECHO_MAP_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                map_snapshot_modal: true
            })
        case CLOSE_MAP_SNAPSHOT_MODAL:
            return Object.assign({}, state, {
                map_snapshot_modal: false
            })
        case MAP_SNAPSHOT_OK:
            return state
        default:
            return state
    }
}
function snapshotslist(state = { isFetching: false, didInvalidate: true, items: [],pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
} }, action) {
    return fetchSnapshotsList(state, action)
}

export default snapshotslist