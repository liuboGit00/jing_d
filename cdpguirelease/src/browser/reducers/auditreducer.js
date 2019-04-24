import {
    REQUEST_AUDITLOGS,RECEIVE_AUDITLOGS,RECEIVE_AUDITLOGS_ERROR,TOGGLE_AUDITLOGS,
    DELETE_AUDITLOGS_OK,DELETE_AUDITLOGS_ERR,SEARCH_AUDITLOGS_OK,SEARCH_AUDITLOGS_ERR,
    REQUEST_SEARCH_AUDITLOGS,
} from '../actions/auditactions';
import update from 'immutability-helper';

function fetchAudit(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_AUDITLOGS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedAuditlogs:[],          
            })
        case RECEIVE_AUDITLOGS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.auditlogs,
            })
        case RECEIVE_AUDITLOGS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case DELETE_AUDITLOGS_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.deleteAuditlogs.url.split('/').pop())},action)})
        case DELETE_AUDITLOGS_ERR:
            return state
        case TOGGLE_AUDITLOGS:
            return Object.assign({},state,{
                selectedAuditlogs:action.selectedAuditlogs,
                selectedRowKeys:action.selectedRowKeys,
            })
        case REQUEST_SEARCH_AUDITLOGS:
            return  Object.assign({},state,{
                items:[],
            })
        case SEARCH_AUDITLOGS_OK:
            return Object.assign({},state,{
                items:action.searchAuditlogs
            })
        default:
            return state
    }
}
function audit(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchAudit(state,action)
}

export default audit