import {REQUEST_AGENT_LIST,RECEIVE_AGENT_LIST,RECEIVE_AGENT_LIST_ERROR,REGISTER_AGENT_ERROR,TOGGLE_AGENT_TO_REGISTER} from '../actions/actions'
import update from 'immutability-helper';

function fetchAgentList(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_AGENT_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                selectedAgentToRegister:[],
                selectedRowKeys:[]
            })
        case RECEIVE_AGENT_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_AGENT_LIST_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        
        case REGISTER_AGENT_ERROR:
            return state
        case TOGGLE_AGENT_TO_REGISTER:
            return Object.assign({}, state, {
                selectedAgentToRegister: action.selectedAgentToRegister,
                selectedRowKeys: action.selectedRowKeys
            })
        default:
            return state
    }
}
function agentlist(state = { isFetching: false, didInvalidate: true, items: [] }, action) {
    return fetchAgentList(state,action)
}

export default agentlist