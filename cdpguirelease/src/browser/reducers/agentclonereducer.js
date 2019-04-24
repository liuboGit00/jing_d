import {ECHO_CREATE_VOLUME_MODAL,CLOSE_CREATE_VOLUME_MODAL} from '../actions/actions';
import {REQUEST_AGENT_CLONE,RECEIVE_AGENT_CLONE,RECEIVE_AGENT_CLONE_ERROR,ECHO_CREATE_AGENT_CLONE_MODAL,
    CLOSE_CREATE_AGENT_CLONE_MODAL,TOGGLE_AGENT_CLONE,DELETE_AGENT_CLONE_OK,DELETE_AGENT_CLONE_ERROR,
    CREATE_AGENT_CLONE_OK,CREATE_AGENT_CLONE_ERROR,REQUIRE_SOURCEID_NUMBER,
    REQUEST_WINDOWS,RECEIVE_WINDOWS,RECEIVE_WINDOWS_ERROR,
    REQUEST_IPADDRESSES,RECEIVE_IPADDRESSES,RECEIVE_IPADDRESSES_ERROR,
    ECHO_CREATE_AGENT_LOCAL_MODAL,CLOSE_CREATE_AGENT_LOCAL_MODAL,CREATE_AGENT_LOCAL_OK,CREATE_AGENT_LOCAL_ERROR,
    ECHO_CREATE_LOCAL_AGENT_MODAL,CLOSE_CREATE_LOCAL_AGENT_MODAL,CREATE_LOCAL_AGENT_OK,CREATE_LOCAL_AGENT_ERROR,
    REQUEST_AGENT_CLONE_STATUS,RECEIVE_AGENT_CLONE_STATUS,RECEIVE_AGENT_CLONE_STATUS_ERROR,
    ECHO_AGENT_CLONE_DOWNLOAD,CLOSE_AGENT_CLONE_DOWNLOAD,ECHO_MODIFY_AGENT_CLONE,CLOSE_MODIFY_AGENT_CLONE,
    CREATE_MODIFY_AGENT_CLONE_OK,CREATE_MODIFY_AGENT_CLONE_ERROR,ECHO_AGENT_CLONE_SPEED,
    CLOSE_AGENT_CLONE_SPEED,CLONE_ON_OFF_STATUS,RECEIVE_ONE_CLONE_STATUS,RECEIVE_ONE_AGENT_CLONE
} from '../actions/mirroraction';
import update from 'immutability-helper';
function fetchAgentclone(state={isFetching:false,didInvalidate:true,items:[],modifyStatus:false},action) {
    switch (action.type) {
        case REQUEST_AGENT_CLONE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedClone:[],
                selectedRowKeys:[],
                onoff:[],     
            })
        case RECEIVE_AGENT_CLONE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                onoff:action.advanceOnoff,
                items: action.items.filter(function(item){return(item.getagentendpoint!='')},action),
            })
        case RECEIVE_AGENT_CLONE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_CREATE_AGENT_CLONE_MODAL:
            return Object.assign({}, state, {
                create_agent_clone_modal: true
            })
        case CLOSE_CREATE_AGENT_CLONE_MODAL:
            return Object.assign({}, state, {
                create_agent_clone_modal: false
            })
        case ECHO_CREATE_VOLUME_MODAL:
            return Object.assign({}, state, {
                create_volume_modal: true
            })
        case CLOSE_CREATE_VOLUME_MODAL:
            return Object.assign({}, state, {
                create_volume_modal: false
            })
        case TOGGLE_AGENT_CLONE:
            return Object.assign({},state,{
                selectedClone:action.selectedClone,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_AGENT_CLONE_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.clone.id)},action)})
        case DELETE_AGENT_CLONE_ERROR:
            return state
        case CREATE_AGENT_CLONE_OK:
            return update(state,{items:{$push:[action.clone]}})
        case CREATE_AGENT_CLONE_ERROR:
            return state
        case REQUIRE_SOURCEID_NUMBER:
            return Object.assign({},state,{
                isFetching:false,
                didInvalidate:false,
                num:action.num,
            })
        case REQUEST_WINDOWS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedwindows:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_WINDOWS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                windows:action.windows,
            })
        case RECEIVE_WINDOWS_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:true
            })
        case REQUEST_IPADDRESSES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedipaddresses:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_IPADDRESSES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                address: action.items,
            })
        case RECEIVE_IPADDRESSES_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:true
            })
        case ECHO_CREATE_AGENT_LOCAL_MODAL:
            return Object.assign({}, state, {
                create_agent_local_modal: true,
                create_agent_local:action.id
            })
        case CLOSE_CREATE_AGENT_LOCAL_MODAL:
            return Object.assign({}, state, {
                create_agent_local_modal: false
            })
        case CREATE_AGENT_LOCAL_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                    if(item.id==action.items.id){
                        item.task=action.items.task
                        return item
                    }else{
                        return item
                    }
                })})

        case CREATE_AGENT_LOCAL_ERROR:
            return state
        case ECHO_CREATE_LOCAL_AGENT_MODAL:
            return Object.assign({}, state, {
                create_local_agent_modal: true,
                create_local_agent:action.id
            })
        case CLOSE_CREATE_LOCAL_AGENT_MODAL:
            return Object.assign({}, state, {
                create_local_agent_modal: false
            })
        case CREATE_LOCAL_AGENT_OK:
            return state
        case CREATE_LOCAL_AGENT_ERROR:
            return state
        case REQUEST_AGENT_CLONE_STATUS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedstatus:[],
                selectedRowKeys:[],
                status:[]            
            })
        case RECEIVE_AGENT_CLONE_STATUS:
             return update(state,{status:{$unshift:[action.items]}})
        case RECEIVE_AGENT_CLONE_STATUS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_AGENT_CLONE_DOWNLOAD:
            return Object.assign({}, state, {
                download_modal: true
            })
        case CLOSE_AGENT_CLONE_DOWNLOAD:
            return Object.assign({}, state, {
                download_modal: false,
                selectedClone:[],
                selectedRowKeys:[]
            })
        case ECHO_MODIFY_AGENT_CLONE:
            return Object.assign({},state,{
                modify_clone_modal:true,
            })
        case CLOSE_MODIFY_AGENT_CLONE:
            return Object.assign({},state,{
                modify_clone_modal:false,
            })
        case CREATE_MODIFY_AGENT_CLONE_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id == action.modifyAgent.id){
                    item=action.modifyAgent
                    return item
                }else{
                    return item
                }
            },action)})
        case CREATE_MODIFY_AGENT_CLONE_ERROR:
            return state
        case ECHO_AGENT_CLONE_SPEED:
            return Object.assign({},state,{
                clone_speed_modal:true,
            })
        case CLOSE_AGENT_CLONE_SPEED:
            return Object.assign({},state,{
                clone_speed_modal:false,
                selectedClone:[],
                selectedRowKeys:[]
            })
        case CLONE_ON_OFF_STATUS:
            return Object.assign({},state,{onoff:state.onoff.map(function(item){
                if(item.split(':')[0]==action.onoff.split(':')[0]){
                    return item=action.onoff
                }else{
                    return item
                }
            },action)})
        case RECEIVE_ONE_CLONE_STATUS:
            return Object.assign({},state,{status:state.status.map(function(item){
                if(item.id==action.oneclonestatus.id){
                    item=action.oneclonestatus
                    return item
                }else{
                    return item
                }
            })})
        case RECEIVE_ONE_AGENT_CLONE:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id==action.oneagentclone.id){
                    item=action.oneagentclone
                    return item
                }else{
                    return item
                }
            })})
        default:
            return state

    }
}
function agentclone(state={isFetching:false,didInvalidate:true,items:[],modifyStatus:false},action) {
    return fetchAgentclone(state,action)
}

export default agentclone