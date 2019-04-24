import {REQUEST_ISCSI,RECEIVE_ISCSI,RECEIVE_ISCSI_ERROR,
        CREATE_ISCSI,CREATE_ISCSI_OK,CREATE_ISCSI_ERROR,
        ECHO_CREATE_ISCSI,CLOSE_CREATE_ISCSI,DELETE_ISCSI,
        DELETE_ISCSI_OK,DELETE_ISCSI_ERROR,TOGGLE_ISCSI,
        REQUEST_ISCSI_TARGET,RECEIVE_ISCSI_TARGET,RECEIVE_ISCSI_TARGET_ERROR,
        REQUEST_LOGIN_TARGET,RECEIVE_LOGIN_TARGET,RECEIVE_LOGIN_TARGET_ERROR,
        LOGIN_TARGET_OK,LOGIN_TARGET_ERROR,LOGOUT_TARGET_ERROR,LOGOUT_TARGET_OK,
        REQUEST_TARGETDETAIL,RECEIVE_TARGETDETAIL,RECEIVE_TARGETDETAIL_ERROR,TOGGLE_TARGETDETAIL,
        ECHO_MODIFY_OPTION,CLOSE_MODIFY_OPTION,CREATE_MODIFY_OK,CREATE_MODIFY_ERROR,
        

} from '../actions/iscsiactions'
import update from 'immutability-helper';


function fetchISCSI(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_ISCSI:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedIscsi:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_ISCSI:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_ISCSI_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_CREATE_ISCSI:
            return Object.assign({}, state, {
                create_iscsi: true
            })
        case CLOSE_CREATE_ISCSI:
            return Object.assign({}, state, {
                create_iscsi: false
            })
        case TOGGLE_ISCSI:
            return Object.assign({},state,{
                selectedIscsi:action.selectedIscsi,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_ISCSI_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.iscsi.id)},action)})
        case DELETE_ISCSI_ERROR:
            return state
        case CREATE_ISCSI_OK:
            return update(state,{items:{$unshift:[action.iscsi]}})
        case CREATE_ISCSI_ERROR:
            return state
        case REQUEST_ISCSI_TARGET:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedTarget:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_ISCSI_TARGET:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                target: action.items,
            })
        case RECEIVE_ISCSI_TARGET_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_LOGIN_TARGET:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                login:[],          
            })
        case RECEIVE_LOGIN_TARGET:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                login: action.items,
            })
        case RECEIVE_LOGIN_TARGET_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
            })
        case LOGOUT_TARGET_OK:
            return Object.assign({},state,{login:state.login.filter(function(item){item},action)})
        case LOGOUT_TARGET_ERROR:
            return state
        case LOGIN_TARGET_OK:
            return update(state,{login:{$unshift:[[action.login.portalid,action.login.target]]}})
        case LOGIN_TARGET_ERROR:
            return state 
        case REQUEST_TARGETDETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                targetdetail:[],          
            })
        case RECEIVE_TARGETDETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                targetdetail: action.targetdetail,
            })
        case RECEIVE_TARGETDETAIL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
            })
        case TOGGLE_TARGETDETAIL:
            return Object.assign({},state,{
                selectedTargetdetail:action.selectedTargetdetail,
                selectedRowKeys:action.selectedRowKeys
            })
        case ECHO_MODIFY_OPTION:
            return Object.assign({}, state, {
                modify_option: true
            })
        case CLOSE_MODIFY_OPTION:
            return Object.assign({}, state, {
                modify_option: false
            })

        default:
            return state

    }
}
function iscsi(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchISCSI(state,action)
}

export default iscsi
