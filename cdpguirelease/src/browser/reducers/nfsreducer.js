import {REQUEST_NFS,RECEIVE_NFS,RECEIVE_NFS_ERROR,REQUEST_MODIFY_NFS,
        RECEIVE_MODIFY_NFS,RECEIVE_MODIFY_NFS_ERROR,CREATE_NFS_SUCCESS,
        CREATE_NFS_ERROR,DELETE_NFS_SUCCESS,DELETE_NFS_ERROR,TOGGLE_NFS,
        ECHO_NFS,CLOSE_NFS,
} from '../actions/nfsactions'
import update from 'immutability-helper';

function Nfs(state={isFetching:false,didInvalidate:true,items:[]},action) {
    switch (action.type) {
        case REQUEST_NFS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedNfs:[],
                selectedRowKeys:[]            
            })
        case RECEIVE_NFS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:action.nfs,
            })
        case RECEIVE_NFS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_NFS:
            return Object.assign({}, state, {
                create_nfs: true,
                echo:action.echo
            })
        case CLOSE_NFS:
            return Object.assign({}, state, {
                create_nfs: false,
                echo:''
            })
        case TOGGLE_NFS:
            return Object.assign({},state,{
                selectedNfs:action.selectedNfs,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_NFS_SUCCESS:
            return Object.assign({},state,{items:state.items.filter(function(item){ return(item.id != action.nfs.id) },action)})
        case DELETE_NFS_ERROR:
            return state
        case CREATE_NFS_SUCCESS:
            return update(state,{items:{$unshift:[action.nfs]}})
        case CREATE_NFS_ERROR:
            return state
        case REQUEST_MODIFY_NFS:
            return state
        case RECEIVE_MODIFY_NFS:
            return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.modify.id){
                        item=action.modify
                        return item
                    }else{
                        return item
                    }
                },action)})
        case RECEIVE_MODIFY_NFS_ERROR:
            return state
        default:
            return state
      /* 	case RECEIVE_MODIFY_NFS_ERROR:
            return state
        case REQUEST_NFS_TASK:
            return Object.assign({}, state, {
                task:[],       
            })
        case RECEIVE_NFS_TASK:
             return update(state,{task:{$unshift:[action.task]}})
        case RECEIVE_NFS_TASK_ERROR:
            return state

*/
    }
}
function nfs(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return Nfs(state,action)
}

export default nfs
