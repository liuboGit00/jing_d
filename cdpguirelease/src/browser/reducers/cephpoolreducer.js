import {REQUEST_CEPH_POOLS,RECEIVE_CEPH_POOLS,RECEIVE_CEPH_POOLS_ERROR,
        TOGGLE_CEPH_POOL,ECHO_CREATE_CEPH_POOL,CLOSE_CREATE_CEPH_POOL,
        MODIFY_CEPH_POOL_OK,MODIFY_CEPH_POOL_ERROR,
        RECEIVE_DEL_CEPH_POOL,RECEIVE_DEL_CEPH_POOL_ERROR,} from '../actions/poolactions';
import update from 'immutability-helper';

function fetchCephpool(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_CEPH_POOLS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedCephpool:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_CEPH_POOLS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.cephpools,
            })
        case RECEIVE_CEPH_POOLS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_CEPH_POOL:
            return Object.assign({},state,{
                selectedCephpool:action.selectedCephpool,
                selectedRowKeys:action.selectedRowKeys,
            })
        case ECHO_CREATE_CEPH_POOL:
            return Object.assign({},state,{
                cephpool_modal:true,
            })
        case CLOSE_CREATE_CEPH_POOL:
            return Object.assign({},state,{
                cephpool_modal:false,
            })
        case MODIFY_CEPH_POOL_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id == action.body.id){
                    item=action.body
                    return item
                }else{
                    return item
                }
            },action)})

        case MODIFY_CEPH_POOL_ERROR:
            return state 
        case RECEIVE_DEL_CEPH_POOL:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id!=action.delCephpool.id)},action)}) 
        case RECEIVE_DEL_CEPH_POOL_ERROR:
            return state
        default:
            return state
    }
}
function cephpools(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchCephpool(state,action)
}

export default cephpools