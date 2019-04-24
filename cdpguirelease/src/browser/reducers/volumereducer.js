import {REQUEST_VOLUMES,RECEIVE_VOLUMES,RECEIVE_VOLUMES_ERROR,ECHO_CREATE_VOLUME_MODAL,
    CLOSE_CREATE_VOLUME_MODAL,RELOAD_VOLUME,TOGGLE_VOLUMES,DELETE_VOLUME_OK,DELETE_VOLUME_ERROR,
    CREATE_VOLUME_OK,CREATE_VOLUME_ERROR,MAP_VOLUME_OK,MAP_VOLUME_ERROR,ECHO_MAP_VOLUME_MODAL,
    CLOSE_MAP_VOLUME_MODAL,SET_COMPRESS_OK,SET_DEDUPE_OK,ECHO_MAP_VOLUME_SNAPSHOT_MODAL,
    CLOSE_MAP_VOLUME_SNAPSHOT_MODAL,MAP_VOLUME_SNAPSHOT_OK,MAP_VOLUME_SNAPSHOT_ERROR,
    CHANGE_REPLAY_TIME,SELECT_DISPLAY_CONTENT,REQUEST_VOLUMES_SEARCH,
    RECEIVE_VOLUMES_SEARCH,RECEIVE_VOLUMES_SEARCH_ERROR,LOADING_MODAL,
} from '../actions/actions'
import {ECHO_LOGDEV_MODAL,CLOSE_LOGDEV_MODAL,ECHO_REPLAY_LOG_MODAL,CLOSE_REPLAY_LOG_MODAL,REPLAY_LOG_ERROR,REPLAY_LOG_OK,CLONE_FOR_REPLAY_ERROR,CLONE_FOR_REPLAY_OK} from '../actions/devlogactions'
import update from 'immutability-helper';
import {RECEIVE_ADD_VOLUME} from '../actions/poolsettingactions'

function fetchVOLUMES(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_VOLUMES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedVolumes:[],
                selectedRowKeys:[]          
            })
        case RECEIVE_VOLUMES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_VOLUMES_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_CREATE_VOLUME_MODAL:
            return Object.assign({}, state, {
                create_volume_modal: true,
                loading:false
            })
        case LOADING_MODAL:
            return Object.assign({},state,{
                loading:true
            })
        case CLOSE_CREATE_VOLUME_MODAL:
            return Object.assign({}, state, {
                create_volume_modal: false,
                loading:false,
            })
        case RELOAD_VOLUME:
            return  Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                items: action.items,
                search_modal:false,
            })
        case TOGGLE_VOLUMES:
            return Object.assign({},state,{
                selectedVolumes:action.selectedVolumes,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_VOLUME_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.volume.id)},action)})
        case DELETE_VOLUME_ERROR:
            return state
        case CREATE_VOLUME_OK:
            return update(state,{items:{$unshift:[action.volume]}})
        case CREATE_VOLUME_ERROR:
            return state
        case ECHO_MAP_VOLUME_MODAL:
            return Object.assign({}, state, {
                map_volume_modal: true
            })
        case CLOSE_MAP_VOLUME_MODAL:
            return Object.assign({}, state, {
                map_volume_modal: false
            })
        case MAP_VOLUME_OK:
            return state
        case ECHO_LOGDEV_MODAL:
            return Object.assign({}, state, {
                start_logdev_modal: true,
                srcvolId: action.srcvolId
            })
        case CLOSE_LOGDEV_MODAL:
            return Object.assign({}, state, {
                start_logdev_modal: false
            })
        case ECHO_REPLAY_LOG_MODAL:
            return Object.assign({}, state, {
                replay_log_modal: true,
                logdevId: action.logdevId,
                snaplist: action.snaplist
            })
        case CLOSE_REPLAY_LOG_MODAL:
            return Object.assign({}, state, {
                replay_log_modal: false
            })
        case CLONE_FOR_REPLAY_OK:
            return Object.assign({}, state, {
                clonevolume: action.clonevolume
            })
        case CLONE_FOR_REPLAY_ERROR:
            return state
        case SET_COMPRESS_OK:
            /*return update(state,{items:{$set:state.items.filter(function(item){if(item.id==action.volume.id){
                return action.volume
            }})}})*/
            /*return Object.assign({}, state, {
                items: state.items.filter(function (item) { if (item.id == action.volume.id) { return action.volume } else { return item } })
            })*/
            return Object.assign({},state,{items:state.items.map(function(item){
                    if(item.id==action.volume.id){
                        item=action.volume
                        return item
                    }else{
                        return item
                    }
                })})
        case SET_DEDUPE_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                    if(item.id==action.volume.id){
                        item=action.volume
                        return item
                    }else{
                        return item
                    }
                })})
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
        case RECEIVE_ADD_VOLUME:
            return update(state,{items:{$unshift:[action.volume]}})
        case CHANGE_REPLAY_TIME:
            return Object.assign({}, state, {
                replay_time: action.time,
                replay_time_number:action.timeNumber
            })
        case SELECT_DISPLAY_CONTENT:
            return Object.assign({},state,{
                selectContent:action.content
            })
        case REQUEST_VOLUMES_SEARCH:
            return Object.assign({},state,{
                serchVolumes:[],
            })
        case RECEIVE_VOLUMES_SEARCH:
            return Object.assign({},state,{
                searchVolumes:action.search_volumes,
                search_modal:true
            })
        case RECEIVE_VOLUMES_SEARCH_ERROR:
            return state
        default:
            return state
    }
}
function volumes(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchVOLUMES(state,action)
}

export default volumes
