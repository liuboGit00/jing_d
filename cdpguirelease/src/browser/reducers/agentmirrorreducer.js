import {
    REQUEST_AGENTMIRROR,RECEIVE_AGENTMIRROR,RECEIVE_AGENTMIRROR_ERR,
    ECHO_CREATE_AGENTMIRROR,CLOSE_CREATE_AGENTMIRROR,TOGGLE_AGENTMIRROR,
    CREATE_AGENTMIRROR_OK,CREATE_AGENTMIRROR_ERR,ECHO_REMOVE_AGENTMIRROR,
    CLOSE_REMOVE_AGENTMIRROR,REMOVE_AGENTMIRROR_OK,REMOVE_AGENTMIRROR_ERR,
    CLOSE_AGENTMIRROR_EXTEND,ECHO_AGENTMIRROR_EXTEND,ECHO_HP_AGENTMIRROR,
    CLOSE_HP_AGENTMIRROR,
} from '../actions/agentmirroraction'
import update from 'immutability-helper';

function fetchAgentmirror(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_AGENTMIRROR:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                selectedAgentmirror:[],
                selectedRowKeys:[],
                removeagentmirror:[],
                hp:[],
                hptask:''
            })
        case RECEIVE_AGENTMIRROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.agentmirror,
            })
        case RECEIVE_AGENTMIRROR_ERR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_AGENTMIRROR:
            return Object.assign({}, state, {
                selectedAgentmirror: action.selectedAgentmirror,
                selectedRowKeys: action.selectedRowKeys
            })
        case CREATE_AGENTMIRROR_OK:
            return update(state,{items:{$unshift:[action.createAgentmirror]}})
        case CREATE_AGENTMIRROR_ERR:
            return state
        case ECHO_CREATE_AGENTMIRROR:
            return Object.assign({},state,{
                agentmirror_modal:true,
            })
        case CLOSE_CREATE_AGENTMIRROR:
            return Object.assign({},state,{
                agentmirror_modal:false,
            })
        case ECHO_REMOVE_AGENTMIRROR:
            return Object.assign({},state,{
                removeagentmirror: action.remove,
                removeagentmirror_modal:true,
            })
        case CLOSE_REMOVE_AGENTMIRROR:{
            return Object.assign({},state,{
                removeagentmirror_modal:false
            })
        }
        case REMOVE_AGENTMIRROR_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id!=action.removeAgentmirror.id)},action)})
        case CLOSE_AGENTMIRROR_EXTEND:
            return Object.assign({},state,{
                agentmirror_extend_modal:false,
                extend:[]
            })
        case ECHO_AGENTMIRROR_EXTEND:
            return Object.assign({},state,{
                agentmirror_extend_modal:true,
                extend:action.extend
            })
        case ECHO_HP_AGENTMIRROR:
            return Object.assign({},state,{
                hp_modal:true,
                hp:action.echohp,
                hptask:action.hptask,
            })
        case CLOSE_HP_AGENTMIRROR:
            return Object.assign({},state,{
                hp_modal:false,
                hp:[]
            })
        default:
            return state
    }
}
function agentmirror(state = { isFetching: false, didInvalidate: true, items: [] }, action) {
    return fetchAgentmirror(state,action)
}

export default agentmirror