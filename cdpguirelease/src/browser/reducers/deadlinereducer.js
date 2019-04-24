import {ECHO_REGISTER_DEADLINE,CLOSE_REGISTER_DEADLINE,RECEIVE_DEADLINE_OK,RECEIVE_DEADLINE_ERR,
    REQUEST_DEADLINE,REGISTER_DEADLINE_ERR,REGISTER_DEADLINE_OK,TOGGLE_DEADLINE,
} from '../actions/configaction';
import update from 'immutability-helper';

function fetchDeadline(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case ECHO_REGISTER_DEADLINE:
            return Object.assign({},state,{
                deadline_modal:true
            })
        case CLOSE_REGISTER_DEADLINE:
            return Object.assign({},state,{
                deadline_modal:false
            })
        case RECEIVE_DEADLINE_OK:
            return Object.assign({},state,{
                isFetching: false,
                didInvalidate: false,
                items:action.deadline
            })
        case RECEIVE_DEADLINE_ERR:
            return Object.assign({},state,{
                isFetching: false,
                didInvalidate: true
            })
        case REQUEST_DEADLINE:
            return Object.assign({},state,{
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedConfig:[],
                selectedRowKeys:[],
            })
        case REGISTER_DEADLINE_ERR:
            return state
        case REGISTER_DEADLINE_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id==action.register_deadline.id){
                    item=action.register_deadline
                    return item
                }else{
                    return item
                }
            })})
        case TOGGLE_DEADLINE:
            return Object.assign({},state,{
                selectedRowKeys:action.selectedRowKeys,
                selectedDeadline:action.selectedDeadline,
            })
            
        default:
            return state
    }
}
function deadline(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchDeadline(state,action)
}

export default deadline