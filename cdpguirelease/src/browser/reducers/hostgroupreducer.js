import {REQUEST_HOSTGROUP,RECEIVE_HOSTGROUP_OK,RECEIVE_HOSTGROUP_ERR,TOGGLE_HOSTGROUP,
    ECHO_HOSTGROUP,CLOSE_HOSTGROUP,CREATE_HOSTGROUP_OK,CREATE_HOSTGROUP_ERR,
    DELETE_HOSTGROUP_ERR,DELETE_HOSTGROUP_OK,APPLY_HOSTGROUP_OK,APPLY_HOSTGROUP_ERR,
    REQUEST_APPLY_HOSTGROUP,REQUEST_HOSTGROUP_PROPERTY,RECEIVE_HOSTGROUP_PROPERTY_OK,
    RECEIVE_HOSTGROUP_PROPERTY_ERR,SET_HOSTGROUP_PROPERTY_OK,SET_HOSTGROUP_PROPERTY_ERR,
    SET_HOSTGROUP_PROPERTY_ID,ECHO_HOSTGROUP_PROPERTY,CLOSE_HOSTGROUP_PROPERTY,
} from '../actions/hostgroupaction';
import update from 'immutability-helper';

function fetchHostgroup(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_HOSTGROUP:
            return Object.assign({},state,{
                isFetching:true,
                items:[],
                selectedHostgroup:[],
                selectedRowKeys:[],
            })
        case RECEIVE_HOSTGROUP_OK:
            return Object.assign({},state,{
                isFetching:false,
                items:action.hostgroup,
            })
        case RECEIVE_HOSTGROUP_ERR:
            return Object.assign({},state,{
                isFetching:true,
            })
        case TOGGLE_HOSTGROUP:
            return Object.assign({},state,{
                selectedHostgroup:action.selectedHostgroup,
                selectedRowKeys:action.selectedRowKeys
            })
        case ECHO_HOSTGROUP:
            return Object.assign({},state,{
                hostgroup_modal:true,
            })
        case CLOSE_HOSTGROUP:
            return Object.assign({},state,{
                hostgroup_modal:false,
            })
        case CREATE_HOSTGROUP_OK:
            return update(state,{items:{$push:[action.clone]}})
        case CREATE_HOSTGROUP_ERR:
            return state
        case DELETE_HOSTGROUP_ERR:
            return state
        case DELETE_HOSTGROUP_OK:
            return Object.assign({},state,{
                items:state.items.filter(function(item){return(item.id != action.deletehostgroup)},action)
            })
        case REQUEST_APPLY_HOSTGROUP:
            return Object.assign({},state,{
                loading:true,
            })
        case APPLY_HOSTGROUP_OK:
            return Object.assign({},state,{
                loading:false,
            })
        case APPLY_HOSTGROUP_ERR:
            return Object.assign({},state,{
                loading:false,
            })
        case REQUEST_HOSTGROUP_PROPERTY:
            return Object.assign({},state,{
                property:[],
            })
        case RECEIVE_HOSTGROUP_PROPERTY_OK:
            return Object.assign({},state,{
                property:action.property,
            })
        case RECEIVE_HOSTGROUP_PROPERTY_ERR:
            return state
        case SET_HOSTGROUP_PROPERTY_OK:
            return Object.assign({},state,{
                // property:state.property.map(function(item){
                //     if (item.) {};
                // })
            })
        case SET_HOSTGROUP_PROPERTY_ERR:
            return state
        case SET_HOSTGROUP_PROPERTY_ID:
            return Object.assign({},state,{
                hostgroupid:action.hostgroupid,
            })
        case ECHO_HOSTGROUP_PROPERTY:
            return Object.assign({},state,{
                hostgroup_property_modal:true
            })
        case CLOSE_HOSTGROUP_PROPERTY:
            return Object.assign({},state,{
                hostgroup_property_modal:false
            })
        default:
            return state
    }
}
function hostgroup(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchHostgroup(state,action)
}

export default hostgroup