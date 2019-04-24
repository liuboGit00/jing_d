import {
    CREATE_VOLUMEGROUP_OK,CREATE_VOLUMEGROUP_ERR,REQUEST_VOLUMEGROUP,
    RECEIVE_VOLUMEGROUP_ERR,RECEIVE_VOLUMEGROUP_OK,ECHO_VOLUMEGROUP_MODAL,
    CLOSE_VOLUMEGROUP_MODAL,TOGGLE_VOLUMEGROUP,DELETE_VOLUMEGROUP_ERR,
    DELETE_VOLUMEGROUP_OK,
} from '../actions/volumegroupaction'
import update from 'immutability-helper';

function Volumegroup(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_VOLUMEGROUP:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedVolumegroup:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_VOLUMEGROUP_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.volumegroup,
            })
        case RECEIVE_VOLUMEGROUP_ERR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_VOLUMEGROUP_MODAL:
            return Object.assign({}, state, {
                create_volumegroup_modal: true,
            })
        case CLOSE_VOLUMEGROUP_MODAL:
            return Object.assign({}, state, {
                create_volumegroup_modal: false,
            })
        case TOGGLE_VOLUMEGROUP:
            return Object.assign({},state,{
                selectedVolumegroup:action.selectedVolumegroup,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_VOLUMEGROUP_OK:
            return Object.assign({},state,{
                items:state.items.filter(function(item){ return(item.id != action.ok.id) },action),
                selectedVolumegroup:[],
                selectedRowKeys:[],
            })
        case DELETE_VOLUMEGROUP_ERR:
            return state
        case CREATE_VOLUMEGROUP_OK:
            return update(state,{items:{$unshift:[action.body]}})
        case CREATE_VOLUMEGROUP_ERR:
            return state
        default:
            return state
    }
}
function volumegroup(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return Volumegroup(state,action)
}

export default volumegroup
