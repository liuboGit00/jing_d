import {REQUEST_AGENT_DETAIL,RECEIVE_AGENT_DETAIL,RECEIVE_AGENT_DETAIL_ERROR,CREATE_INITIATOR_OK,CREATE_INITIATOR_ERROR,
    ECHO_CREATE_INITIATOR_MODAL,CLOSE_CREATE_INITIATOR_MODAL,REQUEST_INITIATOR,RECEIVE_INITIATOR_ERROR,RECEIVE_INITIATOR_OK,REQUEST_NO_INITIATOR,
    DELETE_INITIATOR_OK,DELETE_INITIATOR_ERROR,TOGGLE_INITIATORS} from '../actions/actions'
import update from 'immutability-helper'

function fetchAgentDetail(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_AGENT_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                initiators:[]
            })
        case RECEIVE_AGENT_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_AGENT_DETAIL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        
        case CREATE_INITIATOR_ERROR:
            return state
        case ECHO_CREATE_INITIATOR_MODAL:
            return Object.assign({},state,{
                create_initiator_modal: true
            })
        case CLOSE_CREATE_INITIATOR_MODAL:
            return Object.assign({}, state, {
                create_initiator_modal: false
            })
        case CREATE_INITIATOR_OK:
            return update(state,{initiators:{$push:[action.initiator]}})
        case REQUEST_INITIATOR:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                initiators:[],
                selectedInits: [],
                selectedRowKeys: [],
            })
        case RECEIVE_INITIATOR_OK:
            return update(state, { initiators: { $push: [action.initiator]},
                isFetching: {$set:false},
                disInvalidate: {$set:false},
              })
        case RECEIVE_INITIATOR_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_NO_INITIATOR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                initiators:[]
            })
        case DELETE_INITIATOR_OK:
            return Object.assign({},state,{initiators:state.initiators.filter(function(item){return(item.id != action.initId)},action)})
        case TOGGLE_INITIATORS:
            return Object.assign({}, state, {
                selectedInits: action.selectedInits,
                selectedRowKeys: action.selectedRowKeys
            })
        default:
            return state
    }
}
function agentdetail(state = {
    isFetching: false, didInvalidate: true, items: [], create_initiator_modal: false, initiators: [],

}, action) {
    return fetchAgentDetail(state,action)
}

export default agentdetail