import update from 'immutability-helper';
import {ECHO_AGENTHA_MODAL,CLOSE_AGENTHA_MODAL,REQUEST_AGENTHA_OK,RECEIVE_AGENTHA_OK,
		RECEIVE_AGENTHA_ERR,DELETE_AGENTHA_OK,DELETE_AGENTHA_ERR,ECHO_GROUPHA_MODAL,
		CREATE_AGENTHA_OK,CREATE_AGENTHA_ERR,CLOSE_GROUPHA_MODAL,REQUEST_GROUPHA_OK,
		RECEIVE_GROUPHA_OK,RECEIVE_GROUPHA_ERR,DELETE_GROUPHA_OK,DELETE_GROUPHA_ERR,
		CREATE_GROUPHA_OK,CREATE_GROUPHA_ERR,GET_GROUPHA_STATUS_OK,GET_GROUPHA_STATUS_ERR,
        START_GROUPHA_OK,START_GROUPHA_ERR,STOP_GROUPHA_ERR,STOP_GROUPHA_OK,
        SET_STOP_GROUP_HA_OK,SET_STOP_GROUP_HA_ERR,SET_START_GROUP_HA_OK,SET_START_GROUP_HA_ERR,
        MODIFY_GROUP_HA_OK,MODIFY_GROUP_HA_ERR,ECHO_MODIFY_GROUPHA_MODAL,CLOSE_MODIFY_GROUPHA_MODAL,
        ECHO_SET_PROMOTED,CLOSE_SET_PROMOTED,SET_PROMOTED_OK,SET_PROMOTED_ERR,
		} from '../actions/grouphaaction'
function fetchHa(state={isFetching:false,didInvalidate:true,agentha:[],groupha:[],},action){
    switch (action.type){
        case REQUEST_AGENTHA_OK:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                agentha:[],
                selectedAgents:[],          
            })
        case RECEIVE_AGENTHA_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                agentha: action.agentha,
            })
        case RECEIVE_AGENTHA_ERR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_GROUPHA_OK:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                groupha:[],
                selectedAgents:[],          
            })
        case RECEIVE_GROUPHA_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                groupha: action.groupha,
            })
        case RECEIVE_GROUPHA_ERR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_AGENTHA_MODAL:
            return Object.assign({}, state, {
                create_agentha_modal: true,
                echoagentha:action.echoagentha,
            })
		case CLOSE_AGENTHA_MODAL:
            return Object.assign({}, state, {
                create_agentha_modal: false
            })
		case ECHO_GROUPHA_MODAL:
            return Object.assign({}, state, {
                create_groupha_modal: true,
            })
		case CLOSE_GROUPHA_MODAL:
            return Object.assign({}, state, {
                create_groupha_modal: false,
            })
        case ECHO_MODIFY_GROUPHA_MODAL:
            return Object.assign({}, state, {
                echoHa:action.echoHa,
                echoStatus:action.echoStatus,
            })
        case CLOSE_MODIFY_GROUPHA_MODAL:
             return Object.assign({}, state, {
                echoStatus:false,
            })
        case CREATE_AGENTHA_OK:
        	return update(state,{agentha:{$unshift:[action.createagentha]}})
        	
		case CREATE_AGENTHA_ERR:
			return state
		case CREATE_GROUPHA_OK:
			return update(state,{groupha:{$unshift:[action.creategroupha]}})
		case CREATE_GROUPHA_ERR:
			return state
        case DELETE_AGENTHA_OK:
            return Object.assign({},state,{agentha:state.agentha.filter(function(item){return(item.id != action.deleteagentha.id)},action)})
        case DELETE_AGENTHA_ERR:
            return state
        case DELETE_GROUPHA_OK:
            return Object.assign({},state,{groupha:state.groupha.filter(function(item){return(item.id != action.deletegroupha.id)},action)})
        case DELETE_GROUPHA_ERR:
            return state
        case GET_GROUPHA_STATUS_OK:
            return Object.assign({},state,{
                grouphastatus:action.grouphastatus==0?true:false,
            })
        case GET_GROUPHA_STATUS_ERR:
            return Object.assign({},state,{
                grouphastatus:false,
            })
        case START_GROUPHA_OK:
            return Object.assign({},state,{
                grouphastatus:action.startgroupha==0?true:false,
            })
        case START_GROUPHA_ERR:
            return Object.assign({},state,{
                grouphastatus:false,
            })
        case STOP_GROUPHA_ERR:
            return Object.assign({},state,{
                grouphastatus:true,
            })
        case STOP_GROUPHA_OK:
            return Object.assign({},state,{
                grouphastatus:action.stopgroupha==0?false:true,
            })
        case SET_STOP_GROUP_HA_OK:
            return Object.assign({},state,{
                groupha:state.groupha.map(function(item){
                    if(item.id == action.grouphaoff.id){
                        item = action.grouphaoff
                        return item
                    }else{
                        return item
                    }
                })
            })
        case SET_STOP_GROUP_HA_ERR:
            return state
        case SET_START_GROUP_HA_OK:
            return Object.assign({},state,{
                groupha:state.groupha.map(function(item){
                    if(item.id == action.grouphaon.id){
                        item = action.grouphaon
                        return item
                    }else{
                        return item
                    }
                })
            })
        case SET_START_GROUP_HA_ERR:
            return state
        case MODIFY_GROUP_HA_OK:
            return Object.assign({},state,{groupha:state.groupha.map(function(item){
                if(item.id==action.modifyHa.id){
                    console.log(item)
                    console.log(action.modifyHa)
                    
                    item = action.modifyHa
                    return  item
                }else{
                    return item
                }
            })})
        case MODIFY_GROUP_HA_ERR:
            return state
        case ECHO_SET_PROMOTED:
            return Object.assign({},state,{
                promoted_modal:true,
                promoted:action.setpromoted,
            })
        case CLOSE_SET_PROMOTED:
            return Object.assign({},state,{
                promoted_modal:false,
                promoted:[]
            })
        case SET_PROMOTED_OK:
            return Object.assign({},state,{

            })
        case SET_PROMOTED_ERR:
            return Object.assign({},state,{

            })
        default:
            return state
    }
}
function ha(state = {isFetching:false,didInvalidate:true,groupha:[],agentha:[]},action) {
    return fetchHa(state,action)
}

export default ha