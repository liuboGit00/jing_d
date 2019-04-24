import {
        REQUEST_CEPHCLIENT,RECEIVE_CEPHCLIENT,RECEIVE_CEPHCLIENT_ERROR,
        CREATE_CEPHCLIENT_OK,CREATE_CEPHCLIENT_ERROR,ECHO_CREATE_CEPHCLIENT,
        CLOSE_CREATE_CEPHCLIENT,DELETE_CEPHCLIENT_OK,DELETE_CEPHCLIENT_ERROR,
        TOGGLE_CEPHCLIENT,
        REQUEST_CEPHCLUSTER,RECEIVE_CEPHCLUSTER,RECEIVE_CEPHCLUSTER_ERROR,
} from '../actions/cephaction';
import update from 'immutability-helper';

function fetchCephclient(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_CEPHCLIENT:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedCephclient:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_CEPHCLIENT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_CEPHCLIENT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_CEPHCLIENT:
            return Object.assign({},state,{
                selectedCephclient:action.selectedCephclient,
                selectedRowKeys:action.selectedRowKeys,
            })
        case ECHO_CREATE_CEPHCLIENT:
            return Object.assign({},state,{
                cephclient_modal:true,
            })
        case CLOSE_CREATE_CEPHCLIENT:
            return Object.assign({},state,{
                cephclient_modal:false,
            })
        // case MODIFY_CEPH_POOL_OK:
        //     return Object.assign({},state,{items:state.items.map(function(item){
        //         if(item.id == action.body.id){
        //             item=action.body
        //             return item
        //         }else{
        //             return item
        //         }
        //     },action)})

        // case MODIFY_CEPH_POOL_ERROR:
        //     return state 
        case CREATE_CEPHCLIENT_ERROR:
            return state
        case CREATE_CEPHCLIENT_OK:
            return update(state,{items:{$unshift:[action.cephclient]}})
        case DELETE_CEPHCLIENT_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.url!=action.delCephclient.url)},action)}) 
        case DELETE_CEPHCLIENT_ERROR:
            return state
        case REQUEST_CEPHCLUSTER:
            return Object.assign({},state,{
                cephclusters:[],
            })
        case RECEIVE_CEPHCLUSTER:
            return Object.assign({},state,{
                cephclusters:action.cephclusters
            })
        case RECEIVE_CEPHCLUSTER_ERROR:
            return state

        default:
            return state
    }
}
function cephclients(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchCephclient(state,action)
}

export default cephclients