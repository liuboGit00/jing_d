import {REQUEST_OSDS,RECEIVE_OSDS,RECEIVE_OSDS_ERROR,DELETE_OSDS_OK,
        DELETE_OSDS_ERROR,CREATE_OSDS_OK,CREATE_OSDS_ERROR,ECHO_CREATE_OSDS,
        CLOSE_CREATE_OSDS,UPDATE_OSDS_OK,UPDATE_OSDS_ERR,TOGGLE_OSDS,REFRESH_LIST,
} from '../actions/cephaction';
import update from 'immutability-helper';

function fetchOsds(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_OSDS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedOsds:[],
                selectedRowKeys:[],   
                refresh:false,        
            })
        case RECEIVE_OSDS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.osds,
            })
        case RECEIVE_OSDS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_OSDS:
            return Object.assign({},state,{
                selectedOsds:action.selectedOsds,
                selectedRowKeys:action.selectedRowKeys
            })
        case DELETE_OSDS_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return( item.id!=action.body.id)},action)})
        case DELETE_OSDS_ERROR:
            return state
        case CREATE_OSDS_OK:
            return update(state,{items:{$unshift:[action.osds]}})
        case CREATE_OSDS_ERROR:
            return state
        case ECHO_CREATE_OSDS:
            return Object.assign({},state,{
                osds_modal:true
            })
        case CLOSE_CREATE_OSDS:
            return Object.assign({},state,{
                osds_modal:false
            })
        case REFRESH_LIST:
            return Object.assign({},state,{
                refresh:action.refresh
            })

            
        default:
            return state
    }
}
function osds(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchOsds(state,action)
}

export default osds