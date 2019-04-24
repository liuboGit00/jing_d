import {REQUEST_CONFIG,RECEIVE_CONFIG,RECEIVE_CONFIG_ERROR,
    TOGGLE_CONFIG,SET_CONFIG_STATUS_OK,SET_CONFIG_STATUS_ERROR,
} from '../actions/configaction';
import update from 'immutability-helper';

function fetchConfig(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_CONFIG:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedConfig:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_CONFIG:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_CONFIG_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_CONFIG:
            return Object.assign({}, state, {
                selectedConfig: action.selectedConfig,
                selectedRowKeys: action.selectedRowKeys
            })
        case SET_CONFIG_STATUS_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id==action.config.id){
                    item=action.config
                    return item
                }else{
                    return item
                }
            })})
            
        default:
            return state
    }
}
function config(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchConfig(state,action)
}

export default config