import {
    FETCH_REMOTEMIRRORS,REQUEST_REMOTEMIRRORS,RECEIVE_REMOTEMIRRORS,RECEIVE_REMOTEMIRRORS_ERROR,
    CREATE_REMOTEMIRRORS,CREATE_REMOTEMIRRORS_SUCCESS,CREATE_REMOTEMIRRORS_ERROR,
    DELETE_REMOTEMIRRORS,DELETE_REMOTEMIRRORS_SUCCESS,DELETE_REMOTEMIRRORS_ERROR,
    TOGGLE_REMOTEMIRRORS,ECHO_REMOTEMIRRORS,CLOSE_REMOTEMIRRORS,
    REQUEST_REMOTEMIRRORS_TASK,RECEIVE_REMOTEMIRRORS_TASK,RECEIVE_REMOTEMIRRORS_TASK_ERROR,
    REQUEST_LOCALHOST,RECEIVE_LOCALHOST,RECEIVE_LOCALHOST_ERROR,
    REQUEST_LOCALVOLUME,RECEIVE_LOCALVOLUME,RECEIVE_LOCALVOLUME_ERROR,
    ECHO_TOKENANDURL,CLOSE_TOKENANDURL,REQUEST_TOKENANDURL,RECEIVE_TOKENANDURL_ERROR,RECEIVE_TOKENANDURL,
    FETCH_REMOTEMIRRORS_HOST_NAME,UPDATE_REMOTEMIRROR_ERR,UPDATE_REMOTEMIRROR_OK,ECHO_UPDATE_REMOTEMIRROR,
    CLOSE_UPDATE_REMOTEMIRROR,
    
} from '../actions/remotemirrorsactions'
import {REQUEST_VOLUMES,RECEIVE_VOLUMES,RECEIVE_VOLUMES_ERROR,}from'../actions/actions'
import update from 'immutability-helper';



function RemoteMirrors(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_REMOTEMIRRORS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedRemotemirrors:[],
                selectedRowKeys:[],
                task:[],          
            })
        case RECEIVE_REMOTEMIRRORS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.items,
            })
        case RECEIVE_REMOTEMIRRORS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_REMOTEMIRRORS:
            return Object.assign({}, state, {
                create_remotemirrors: true
            })
        case CLOSE_REMOTEMIRRORS:
            return Object.assign({}, state, {
                create_remotemirrors: false
            })
        case CREATE_REMOTEMIRRORS_SUCCESS:
            return update(state,{items:{$push:[action.remotemirrors]}})
        case CREATE_REMOTEMIRRORS_ERROR:
            return state
        case TOGGLE_REMOTEMIRRORS:
            return Object.assign({},state,{
                selectedRemotemirrors:action.selectedRemotemirrors,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_REMOTEMIRRORS_SUCCESS:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.body.id)},action)})
        case DELETE_REMOTEMIRRORS_ERROR:
            return state
        case REQUEST_REMOTEMIRRORS_TASK:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,        
            })
        case RECEIVE_REMOTEMIRRORS_TASK:
            return update(state,{task:{$push:[action.task]}})
            

        case RECEIVE_REMOTEMIRRORS_TASK_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_LOCALHOST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                localhost:[],           
            })
        case RECEIVE_LOCALHOST:
            return update(state,{localhost:{$push:[action.localhost]}})
        case RECEIVE_LOCALHOST_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_LOCALVOLUME:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                localvolume:[]         
            })
        case RECEIVE_LOCALVOLUME:
            return update(state,{localvolume:{$push:[action.localvolume]}})
            

        case RECEIVE_LOCALVOLUME_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_TOKENANDURL:
            return Object.assign({},state,{
                create_tokenandurl:true,
            })
        case CLOSE_TOKENANDURL:
            return Object.assign({},state,{
                create_tokenandurl:false,
            })
        case REQUEST_TOKENANDURL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                tokenandurl:[],           
            })
        case RECEIVE_TOKENANDURL:
            return update(state,{tokenandurl:{$push:[action.tokenandurl]}})
            

        case RECEIVE_TOKENANDURL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_VOLUMES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                localvolume:[],           
            })
        case RECEIVE_VOLUMES:
            return update(state,{localvolume:{$push:[action.items]}})
            

        case RECEIVE_VOLUMES_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case FETCH_REMOTEMIRRORS_HOST_NAME:
            return Object.assign({},state,{
                remotemirrorsHostName:action.rehostname
            })
        case UPDATE_REMOTEMIRROR_ERR:
            return  state
        case UPDATE_REMOTEMIRROR_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id==action.updateremotemirror.id){
                    item = action.updateremotemirror
                    return item
                }else{
                    return item
                }
            },action)})
        case ECHO_UPDATE_REMOTEMIRROR:
            return Object.assign({},state,{
                update_remotemirror_modal:true,
                create_remotemirrors: true
            })
        case CLOSE_UPDATE_REMOTEMIRROR:
            return Object.assign({},state,{
                update_remotemirror_modal:false,
                create_remotemirrors: false
            })
        default:
            return state
    }
}
function remotemirrors(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return RemoteMirrors(state,action)
}

export default remotemirrors
