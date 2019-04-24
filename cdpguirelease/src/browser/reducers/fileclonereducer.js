import {REQUEST_FILECLONES,RECEIVE_FILECLONES,RECEIVE_FILECLONES_ERROR,REQUEST_MODIFY_FILECLONES,
        RECEIVE_MODIFY_FILECLONES,RECEIVE_MODIFY_FILECLONES_ERROR,CREATE_FILECLONES_SUCCESS,
        CREATE_FILECLONES_ERROR,DELETE_FILECLONES_SUCCESS,DELETE_FILECLONES_ERROR,TOGGLE_FILECLONES,
        ECHO_FILECLONES,CLOSE_FILECLONES,REQUEST_FILECLONES_TASK,RECEIVE_FILECLONES_TASK,
        RECEIVE_FILECLONES_TASK_ERROR,RECEIVE_AGENTLOCAL,RECEIVE_LOCALAGENT,FETCH_FILECLONES_SERVER_OK,
        REQUEST_FILECLONES_APPLY,CREATE_FILECLONES_APPLY_OK,CREATE_FILECLONES_APPLY_ERR,

} from '../actions/filecloneaction'
import {REQUEST_IPADDRESSES,RECEIVE_IPADDRESSES_ERROR,RECEIVE_IPADDRESSES,} from '../actions/mirroraction'
import update from 'immutability-helper';
function Fileclones(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_FILECLONES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedFileclones:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_FILECLONES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.fileclones,
            })
        case RECEIVE_FILECLONES_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_FILECLONES:
            return Object.assign({}, state, {
                create_fileclones: true,
                echo:action.echo,
            })
        case CLOSE_FILECLONES:
            return Object.assign({}, state, {
                create_fileclones: false,
                echo:'',
            })
        case TOGGLE_FILECLONES:
            return Object.assign({},state,{
                selectedFileclones:action.selectedFileclones,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_FILECLONES_SUCCESS:
            return Object.assign({},state,{items:state.items.filter(function(item){ return(item.id != action.fileclones.id) },action)})
        case DELETE_FILECLONES_ERROR:
            return state
        case CREATE_FILECLONES_SUCCESS:
            return update(state,{items:{$unshift:[action.fileclones]}})
        case CREATE_FILECLONES_ERROR:
            return state
        case REQUEST_MODIFY_FILECLONES:
            return state
        case RECEIVE_MODIFY_FILECLONES:
            return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.modify.id){
                        item=action.modify
                        return item
                    }else{
                        return item
                    }
                },action)})
        case RECEIVE_MODIFY_FILECLONES_ERROR:
            return state
        case REQUEST_FILECLONES_TASK:
            return Object.assign({}, state, {
                task:[],       
            })
        case RECEIVE_FILECLONES_TASK:
            return update(state,{task:{$unshift:[action.task]}})
        case RECEIVE_FILECLONES_TASK_ERROR:
            return state
        case RECEIVE_AGENTLOCAL:
            return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.agentlocal.id){
                        item=action.agentlocal
                        return item
                    }else{
                        return item
                    }
                },action)})
        case RECEIVE_LOCALAGENT:
            return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.localagent.id){
                        item=action.localagent
                        return item
                    }else{
                        return item
                    }
                },action)})
        case REQUEST_IPADDRESSES:
            return Object.assign({}, state, {
                address:[],           
            })
        case RECEIVE_IPADDRESSES:
            return Object.assign({}, state, {
                address:action.items,
            })
        case RECEIVE_IPADDRESSES_ERROR:
            return state
        case FETCH_FILECLONES_SERVER_OK:
            return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.serverid){
                        item.serverstatus=action.serverstatus
                        return item
                    }else{
                        return item
                    }
                },action)})
        case REQUEST_FILECLONES_APPLY:
            return Object.assign({},state,{
                applystatus:true,
            })
        case CREATE_FILECLONES_APPLY_OK:
            return Object.assign({},state,{
                applystatus:false,
            })
        case CREATE_FILECLONES_APPLY_ERR:
            return Object.assign({},state,{
                applystatus:false,
            })
        default:
            return state


    }
}
function fileclones(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return Fileclones(state,action)
}

export default fileclones
