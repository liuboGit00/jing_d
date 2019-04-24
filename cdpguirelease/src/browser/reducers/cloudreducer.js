import update from 'immutability-helper';
import {REQUEST_CLOUDS,RECEIVE_CLOUDS,RECEIVE_CLOUDS_ERROR,ECHO_CREATE_CONNECTION_MODAL,CLOSE_CREATE_CONNECTION_MODAL,ECHO_CREATE_VPC_MODAL,
        CLOSE_CREATE_VPC_MODAL,TOGGLE_CLOUDS,DELETE_CLOUD_OK,DELETE_CLOUD_ERROR,CREATE_CONNECTION_OK,CREATE_CONNECTION_ERROR,
        SELECT_ALL_VOLUME_STATE,SET_VPC_SWITCH_ON,SET_VPC_SWITCH_OFF,REQUEST_CLOUD_HOST,RECEIVE_CLOUD_HOST_OK,
        RECEIVE_CLOUD_HOST_ERR,REGISTER_CLOUD_AGENT_OK,REGISTER_CLOUD_AGENT_ERR,ECHO_REGISTER_CLOUD_AGENT,
        CLOSE_REGISTER_CLOUD_AGENT,TOGGLE_CLOUDS_HOST,REQUEST_CLOUD_HOST_HBA,RECEIVE_CLOUD_HOST_HBA_OK,
        RECEIVE_CLOUD_HOST_HBA_ERR,TOGGLE_CLOUDS_HOST_ISCSITGT,ECHO_CLOUD_HOST_ISCSITGT,CLOSE_CLOUD_HOST_ISCSITGT,
        ADD_CLOUD_HOST_ISCSITGT_OK,ADD_CLOUD_HOST_ISCSITGT_ERR,REQUEST_ADD_CLOUD_HOST_ISCSITGT,
        DELETE_CLOUD_HOST_ISCSITGT_OK,DELETE_CLOUD_HOST_ISCSITGT_ERR,REQUEST_DELETE_CLOUD_HOST_ISCSITGT,
        REQUEST_CLOUD_HOST_LUNS,RECEIVE_CLOUD_HOST_LUNS_OK,RECEIVE_CLOUD_HOST_LUNS_ERR,REQUEST_CLOUD_DATACENTER,
        RECEIVE_CLOUD_DATACENTER_OK,RECEIVE_CLOUD_DATACENTER_ERR,REQUEST_CLOUD_DATASTORE,RECEIVE_CLOUD_DATASTORE_OK,
        RECEIVE_CLOUD_DATASTORE_ERR,REQUEST_CLOUD_NETWORK,RECEIVE_CLOUD_NETWORK_OK,RECEIVE_CLOUD_NETWORK_ERR,
        REQUEST_CLOUD_RESOURCEPOOL,RECEIVE_CLOUD_RESOURCEPOOL_OK,RECEIVE_CLOUD_RESOURCEPOOL_ERR,
} from '../actions/cloudactions'

function fetchCloud(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_CLOUDS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedClouds:[],
                selectedRowKeys:[] ,
                vpcswitch:false,
                content:null, 
                list_host:null,
                host_hba:null,
                list_lun:null,

            })
        case RECEIVE_CLOUDS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_CLOUDS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_CREATE_CONNECTION_MODAL:
            return Object.assign({}, state, {
                create_connection_modal: true
            })
        case CLOSE_CREATE_CONNECTION_MODAL:
            return Object.assign({}, state, {
                create_connection_modal: false,
                content:null,
            })
        case ECHO_CREATE_VPC_MODAL:
            return Object.assign({}, state, {
                create_vpc_modal: true
            })
        case CLOSE_CREATE_VPC_MODAL:
            return Object.assign({}, state, {
                create_vpc_modal: false,

            })
        case TOGGLE_CLOUDS:
            return Object.assign({},state,{
                selectedClouds:action.selectedClouds,
                selectedRowKeys:action.selectedRowKeys
            })
        case CREATE_CONNECTION_OK:
            return update(state,{items:{$push:[action.connection]}})
        case CREATE_CONNECTION_ERROR:
            return state
        case DELETE_CLOUD_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.cloud.id)},action)})
        case SELECT_ALL_VOLUME_STATE:
            return Object.assign({},state,{
                allvolume:action.state
            })
        case SET_VPC_SWITCH_ON:{
            return Object.assign({},state,{
                vpcswitch:true,
                content:action.content,
            })
        }
        case SET_VPC_SWITCH_OFF:{
            return Object.assign({},state,{
                vpcswitch:false,

            })
        }
        case REQUEST_CLOUD_HOST:{
            return Object.assign({},state,{
                list_host:null
            })
        }
        case RECEIVE_CLOUD_HOST_OK:{
            return Object.assign({},state,{
                list_host:action.list_host
            })
        }
        case RECEIVE_CLOUD_HOST_ERR:{
            return Object.assign({},state,{

            })
        }
        case REGISTER_CLOUD_AGENT_OK:{
            return Object.assign({},state,{

            })
        }
        case REGISTER_CLOUD_AGENT_ERR:{
            return Object.assign({},state,{

            })
        }
        case ECHO_REGISTER_CLOUD_AGENT:{
            return Object.assign({},state,{
                register_cloud_agent_modal:true,
            })
        }
        case CLOSE_REGISTER_CLOUD_AGENT:{
            return Object.assign({},state,{
                register_cloud_agent_modal:false,
            })
        }
        case TOGGLE_CLOUDS_HOST:
            return Object.assign({},state,{
                selectedCloudshost:action.selectedCloudshost,
                selectedCloudRowKeys:action.selectedCloudRowKeys,
            })
        case RECEIVE_CLOUD_HOST_HBA_OK:
            return Object.assign({},state,{
                host_hba:action.hosthba,
            })
        case RECEIVE_CLOUD_HOST_HBA_ERR:
            return state
        case TOGGLE_CLOUDS_HOST_ISCSITGT:
            return Object.assign({},state,{
                selectedCloudshostiscsitgt:action.selectedCloudshostiscsitgt,
                selectedCloudiscsitgtRowKeys:action.selectedCloudiscsitgtRowKeys,
            })
        case ECHO_CLOUD_HOST_ISCSITGT:
            return Object.assign({},state,{
                create_iscsitgt_modal:true,
            })
        case CLOSE_CLOUD_HOST_ISCSITGT:
            return Object.assign({},state,{
                create_iscsitgt_modal:false,
            })
        case REQUEST_ADD_CLOUD_HOST_ISCSITGT:
            return Object.assign({},state,{
                add_iscsitgt_loading:true,
            })
        case ADD_CLOUD_HOST_ISCSITGT_OK:
            // return update(state,{host_hba:{$push:[action.connection]}})
            return Object.assign({},state,{
                add_iscsitgt_loading:false,
                
            })
        case ADD_CLOUD_HOST_ISCSITGT_ERR:
            return Object.assign({},state,{
                add_iscsitgt_loading:false,
            })
        case DELETE_CLOUD_HOST_ISCSITGT_OK:
            return Object.assign({},state,{
            
                selectedCloudshostiscsitgt:[],
                selectedCloudiscsitgtRowKeys:[],
            })
        case DELETE_CLOUD_HOST_ISCSITGT_ERR:
            return Object.assign({},state,{
                
            })
        case REQUEST_DELETE_CLOUD_HOST_ISCSITGT:
            return Object.assign({},state,{
                
            })
        case REQUEST_CLOUD_HOST_LUNS:
            return Object.assign({},state,{

            })
        case RECEIVE_CLOUD_HOST_LUNS_OK:
            return Object.assign({},state,{
                list_lun:action.hostluns
            })
        case RECEIVE_CLOUD_HOST_LUNS_ERR:
            return state
        case REQUEST_CLOUD_DATACENTER:
            return Object.assign({},state,{
                datacenter:null,
            })
        case RECEIVE_CLOUD_DATACENTER_OK:
            return Object.assign({},state,{
                datacenter:action.clouddatacenter,
            })
        case RECEIVE_CLOUD_DATACENTER_ERR:
            return state
        case REQUEST_CLOUD_DATASTORE:
            return Object.assign({},state,{
                datastore:null,
            })
        case RECEIVE_CLOUD_DATASTORE_OK:
            return Object.assign({},state,{
                datastore:action.clouddatastore,
            })
        case RECEIVE_CLOUD_DATASTORE_ERR:
            return state
        case REQUEST_CLOUD_NETWORK:
            return Object.assign({},state,{
                network:null,
            })
        case RECEIVE_CLOUD_NETWORK_OK:
            return Object.assign({},state,{
                network:action.cloudnetwork,
            })
        case RECEIVE_CLOUD_NETWORK_ERR:
            return state
        case REQUEST_CLOUD_RESOURCEPOOL:
            return Object.assign({},state,{
                resourcepool:null,
            })
        case RECEIVE_CLOUD_RESOURCEPOOL_OK:
            return Object.assign({},state,{
                resourcepool:action.cloudresourcepool,
            })
        case RECEIVE_CLOUD_RESOURCEPOOL_ERR:
            return state
        default :
            return state
    }
}
function clouds(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchCloud(state,action)
}

export default clouds