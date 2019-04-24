import update from 'immutability-helper';
import {REQUEST_VOLUME_DETAIL,RECEIVE_VOLUME_DETAIL,RECEIVE_VOLUME_DETAIL_ERROR,REQUEST_SNAPSHOT_DETAIL,RECEIVE_SNAPSHOT_DETAIL,RECEIVE_SNAPSHOT_DETAIL_ERROR,
    RECEIVE_NO_CLONE,TOGGLE_CLONES,DELETE_CLONE_OK,DELETE_CLONE_ERROR,MAP_SNAPSHOT_CLONE_OK,MAP_SNAPSHOT_CLONE_ERROR,ECHO_MAP_SNAPSHOT_CLONE_MODAL,CLOSE_MAP_SNAPSHOT_CLONE_MODAL} from '../actions/actions'

function fetchSnapDetail(state={isFetchingSnap:false,didInvalidateSnap:true,isFetchingClone:false,didInvalidateClone:true,clones:[]},action){
    switch (action.type){
        case REQUEST_SNAPSHOT_DETAIL:
            return Object.assign({}, state, {
                isFetchingSnap: true,
                didInvalidateSnap: false,
                clones:[],
                selectedVolumes:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_SNAPSHOT_DETAIL:
             return Object.assign({}, state, {
                isFetchingSnap: false,
                didInvalidateSnap: false,
                snapdetail: action.snapshotDetail
            })
        case RECEIVE_SNAPSHOT_DETAIL_ERROR:
            return Object.assign({}, state, {
                isFetchingSnap: false,
                didInvalidateSnap: true
            })
        case REQUEST_VOLUME_DETAIL:
            return Object.assign({}, state, {
                isFetchingClone: true,
                didInvalidateClone: false
            })
        case RECEIVE_VOLUME_DETAIL:
            return update(state,
                {
                    clones: {
                        $push: [action.volumeDetail]
                    },
                    isFetchingClone: { $set: false },
                    didInvalidateClone: { $set: false }
                })
        case RECEIVE_VOLUME_DETAIL:
            return Object.assign({}, state, {
                isFetchingclone: false,
                didInvalidateClone: true
            })
        case RECEIVE_NO_CLONE:
            return Object.assign({}, state, {
                isFetchingClone: false,
                didInvalidateClone: false
            })
        case TOGGLE_CLONES:
            return Object.assign({},state,{
                selectedVolumes:action.selectedVolumes,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_CLONE_OK:
            return Object.assign({},state,{clones:state.clones.filter(function(item){return(item.id != action.volume.id)},action)})
        case DELETE_CLONE_ERROR:
            return state
        case ECHO_MAP_SNAPSHOT_CLONE_MODAL:
            return Object.assign({}, state, {
                map_snapshot_clone_modal: true
            })
        case CLOSE_MAP_SNAPSHOT_CLONE_MODAL:
            return Object.assign({}, state, {
                map_snapshot_clone_modal: false
            })
        case MAP_SNAPSHOT_CLONE_OK:
            return state
        default:
            return state
    }
}

function snapshotDetail(state={isFetchingSnap:false,didInvalidateSnap:true,isFetchingClone:false,didInvalidateClone:true,clones:[]},action) {
    return fetchSnapDetail(state,action)
}

export default snapshotDetail