import {REQUEST_SAMBA,RECEIVE_SAMBA,RECEIVE_SAMBA_ERROR,
        CREATE_SAMBA,CREATE_SAMBA_SUCCESS,CREATE_SAMBA_ERROR,
        DELETE_SAMBA,DELETE_SAMBA_SUCCESS,DELETE_SAMBA_ERROR,
        TOGGLE_SAMBA,ECHO_SAMBA,CLOSE_SAMBA,
} from '../actions/sambaactions'
import update from 'immutability-helper';
function Samba(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_SAMBA:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedSamba:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_SAMBA:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.samba,
            })
        case RECEIVE_SAMBA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_SAMBA:
            return Object.assign({}, state, {
                create_samba: true,
            })
        case CLOSE_SAMBA:
            return Object.assign({}, state, {
                create_samba: false,
            })
        case TOGGLE_SAMBA:
            return Object.assign({},state,{
                selectedSamba:action.selectedSamba,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_SAMBA_SUCCESS:
            return Object.assign({},state,{items:state.items.filter(function(item){ return(item.id != action.samba.id) },action)})
        case DELETE_SAMBA_ERROR:
            return state
        case CREATE_SAMBA_SUCCESS:
            return update(state,{items:{$unshift:[action.samba]}})
        case CREATE_SAMBA_ERROR:
            return state
        default:
            return state


    }
}
function samba(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return Samba(state,action)
}

export default samba
