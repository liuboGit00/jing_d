import {ECHO_CREATE_HOST_INITIATORS,CLOSE_CREATE_HOST_INITIATORS,REQUEST_HOST_INITIATORS,RECEIVE_HOST_INITIATORS,
        RECEIVE_HOST_INITIATORS_ERROR,CREATE_HOST_INITIATORS,CREATE_HOST_INITIATORS_OK,CREATE_HOST_INITIATORS_ERROR,
        DELETE_HOST_INITIATORS,DELETE_HOST_INITIATORS_ERROR,DELETE_HOST_INITIATORS_OK,TOGGLE_HOST_INITIATORS,
        REQUEST_HOST_FCPORTS,RECEIVE_HOST_FCPORTS,RECEIVE_HOST_FCPORTS_ERROR,
        REQUEST_HOST_TARGETS,RECEIVE_HOST_TARGETS,RECEIVE_HOST_TARGETS_ERROR,POST_TARGET_ENABLE_OK,POST_TARGET_ENABLE_ERROR,POST_TARGET_DISABLE_OK,POST_TARGET_DISABLE_ERROR,
    } from '../actions/hostactions'
import update from 'immutability-helper'

function fetchAgentDetail(state={isFetching:false,didInvalidate:true},action){
    switch(action.type){
        case CREATE_HOST_INITIATORS_ERROR:
            return state
        case ECHO_CREATE_HOST_INITIATORS:
            return Object.assign({},state,{
                create_hostinitiator_modal: true
            })
        case CLOSE_CREATE_HOST_INITIATORS:
            return Object.assign({}, state, {
                create_hostinitiator_modal: false
            })
        case CREATE_HOST_INITIATORS_OK:
            return update(state,{hostinitiators:{$push:[action.initiators]}})

        case REQUEST_HOST_INITIATORS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                hostinitiators:[],
                selectedInits: [],
                selectedRowKeys: [],
            })
        case RECEIVE_HOST_INITIATORS:
            return Object.assign({},state, { 
                hostinitiators: action.items,
                isFetching: {$set:false},
                disInvalidate: {$set:false},
              })
        case RECEIVE_HOST_INITIATORS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        // case REQUEST_NO_INITIATOR:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         didInvalidate: false,
        //         initiators:[]
        //     })
        case DELETE_HOST_INITIATORS_OK:
            return Object.assign({},state,{hostinitiators:state.hostinitiators.filter(function(item){return(item.id != action.initiators.id)},action)})
        case DELETE_HOST_INITIATORS_ERROR:
            return state
        case TOGGLE_HOST_INITIATORS:
            return Object.assign({}, state, {
                selectedInits: action.selectedInits,
                selectedRowKeys: action.selectedRowKeys
            })
        case REQUEST_HOST_FCPORTS:
            return state
        case RECEIVE_HOST_FCPORTS:
             return Object.assign({}, state, {
                fcports:action.fcports,
            })
        case RECEIVE_HOST_FCPORTS_ERROR:
            return state
        case REQUEST_HOST_TARGETS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                targets:[],           
            })
        case RECEIVE_HOST_TARGETS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                targets:action.targets,
            })
        case RECEIVE_HOST_TARGETS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case POST_TARGET_ENABLE_OK:
            return Object.assign({},state,{
                enable:action.enable_target
            })
        case POST_TARGET_ENABLE_ERROR:
            return state
        case POST_TARGET_DISABLE_OK:
            return Object.assign({},state,{
                disable:action.disable_initiator
            })
        case POST_TARGET_DISABLE_ERROR:
            return state
        default:
            return state
    }
}
function hostinitiators(state = {
    isFetching: false, didInvalidate: true, hostinitiators: [], create_initiator_modal: false, 

}, action) {
    return fetchAgentDetail(state,action)
}

export default hostinitiators