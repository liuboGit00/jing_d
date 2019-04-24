import {ECHO_CREATE_VOLUME_MODAL,CLOSE_CREATE_VOLUME_MODAL,CREATE_VOLUME_OK,CREATE_VOLUME_ERROR} from '../actions/actions';
import {REQUEST_MIRRORS,RECEIVE_MIRRORS,RECEIVE_MIRRORS_ERROR,ECHO_CREATE_MIRROR_MODAL,
    ECHO_MODIFY_MIRROR_MODAL,CLOSE_CREATE_MIRROR_MODAL,CLOSE_MODIFY_MIRROR_MODAL,TOGGLE_MIRRORS,
    DELETE_MIRRORS_OK,DELETE_MIRRORS_ERROR,CREATE_MIRROR_OK,CREATE_MIRROR_ERROR,ECHO_INSTALL_DRBD_MODAL,
    CLOSE_INSTALL_DRBD_MODAL,INSTALL_DRBD_ERROR,INSTALL_DRBD_OK,ECHO_INITIALIZE_MODAL,
    CLOSE_INITIALIZE_MODAL,REQUEST_INITIALIZE,RECEIVE_INITIALIZE_OK,RECEIVE_INITIALIZE_ERROR,
    ECHO_SYNC_MODAL,CLOSE_SYNC_MODAL,REQUEST_SYNC,RECEIVE_SYNC_OK,RECEIVE_SYNC_ERROR,
    ECHO_UNINSTALL_MODAL,CLOSE_UNINSTALL_MODAL,REQUEST_UNINSTALL,RECEIVE_UNINSTALL_OK,RECEIVE_UNINSTALL_ERROR,
    ECHO_SYNCSTATUS_MODAL,CLOSE_SYNCSTATUS_MODAL,REQUEST_SYNCSTATUS,RECEIVE_SYNCSTATUS_OK,RECEIVE_SYNCSTATUS_ERROR,
    ECHO_INSTALLAGENT_MODAL,CLOSE_INSTALLAGENT_MODAL,REQUEST_INSTALLAGENT,RECEIVE_INSTALLAGENT_OK,RECEIVE_INSTALLAGENT_ERROR,
    REQUEST_IPADDRESSES,RECEIVE_IPADDRESSES,RECEIVE_IPADDRESSES_ERROR,
    REQUEST_WINDOWS,RECEIVE_WINDOWS,RECEIVE_WINDOWS_ERROR,REQUIRE_SOURCEID_NUMBER,
    CREATE_SETAGENT_STATUS,CREATE_SETAGENT_STATUS_ERROR,ECHO_SETAGENT_MODAL,CLOSE_SETAGENT_MODAL,
    CREATE_AGENT_UPORDOWN,CREATE_AGENT_UPORDOWN_ERROR,ECHO_AGENT_UPORDOWN_MODAL,CLOSE_AGENT_UPORDOWN_MODAL,
    CREATE_AGENT_PAUSESYNC,CREATE_AGENT_PAUSESYNC_ERROR,ECHO_AGENT_PAUSESYNC_MODAL,CLOSE_AGENT_PAUSESYNC_MODAL,
    CREATE_AGENT_RESUMESYNC,CREATE_AGENT_RESUMESYNC_ERROR,ECHO_AGENT_RESUMESYNC_MODAL,CLOSE_AGENT_RESUMESYNC_MODAL,
    REQUEST_AGENT_GETAGENTROLE,RECEIVE_AGENT_GETAGENTROLE,RECEIVE_AGENT_GETAGENTROLE_ERROR,ECHO_AGENT_GETAGENTROLE_MODAL,CLOSE_AGENT_GETAGENTROLE_MODAL,
    ECHO_AGENT_LOCALORAGENT_MODAL,CLOSE_AGENT_LOCALORAGENT_MODAL,GET_AGENT_MIRROR,
    ECHO_AGENT_AGENTORLOCAL_MODAL,CLOSE_AGENT_AGENTORLOCAL_MODAL,
    ECHO_MODIFY_MIRROR_AGENT_MODAL,CLOSE_MODIFY_MIRROR_AGENT_MODAL,CREATE_MIRROR_MODIFY_AGENT_ERR,CREATE_MIRROR_MODIFY_AGENT_OK,
    ECHO_SELECT_AGENT_URL,CLOSE_SELECT_AGENT_URL,SUBMIT_SELECT_AGENT_URL,
    ECHO_AGENT_OPENROLE,CLOSE_AGENT_OPENROLE,ECHO_OPENSYNCSTATUS_MODAL,CLOSE_OPENSYNCSTATUS_MODAL,
    REQUEST_GET_AGENT_DRBDSTATUS,RECEIVE_GET_AGENT_DRBDSTATUS,RECEIVE_GET_AGENT_DRBDSTATUS_ERROR,
    REQUEST_AGENT_GETAGENTROLE_BEHIND,RECEIVE_AGENT_GETAGENTROLE_BEHIND,RECEIVE_AGENT_GETAGENTROLE_BEHIND_ERROR,
    GET_PREVIOUS_AGENT,SEARCH_MIRROR_OK,SEARCH_MIRROR_ERR,
    ECHO_CLEAR_MIRROR,CLOSE_CLEAT_MIRROR,SET_CLEAR_MIRROR_OK,SET_CLEAR_MIRROR_ERR,ECHO_PREFER_HOST,
    CLOSE_PREFER_HOST,SET_PREFER_HOST_OK,SET_PREFER_HOST_ERR,ECHO_INSTALL_PCS,CLOSE_INSTALL_PCS,
    SET_INSTALL_PCS_OK,SET_INSTALL_PCS_ERR,REQUEST_CLEAR_MIRROR,REQUEST_PREFER_HOST,REQUEST_INSTALL_PCS,
    ECHO_HOST_TO_HOST,CLOSE_HOST_TO_HOST,CREATE_HOST_TO_HOST_OK,CREATE_HOST_TO_HOST_ERR,
} from '../actions/mirroraction';
import update from 'immutability-helper';

function fetchMIRROR(state={isFetching:false,didInvalidate:true,items:[],register_success:false},action){
    switch (action.type){
        case REQUEST_MIRRORS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                searchStatue:false,
                items:[],
                selectedMirrors:[],
                selectedRowKeys:[],

            })
        case RECEIVE_MIRRORS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_MIRRORS_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:true
            })
        case ECHO_CREATE_MIRROR_MODAL:
            return Object.assign({}, state, {
                create_mirror_modal: true,
                value:action.localoragent
            })
        case CLOSE_CREATE_MIRROR_MODAL:
            return Object.assign({}, state, {
                create_mirror_modal: false,
            })
        case ECHO_MODIFY_MIRROR_MODAL:
            return Object.assign({},state,{
                modify_mirror_modal:true
            })
        case CLOSE_MODIFY_MIRROR_MODAL:
            return Object.assign({}, state, {
                modify_mirror_modal: false
            })
        case TOGGLE_MIRRORS:
            return Object.assign({}, state, {
                selectedMirrors: action.selectedMirrors,
                selectedRowKeys: action.selectedRowKeys
            })
        case DELETE_MIRRORS_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.mirrors.id)},action)})
        case DELETE_MIRRORS_ERROR:
            return state
        case CREATE_MIRROR_OK:
            return update(state,{items:{$push:[action.mirror]}})
        case CREATE_MIRROR_ERROR:
            return state
        case ECHO_INSTALL_DRBD_MODAL:
            return Object.assign({}, state, {
                install_drbd_modal: true,
                add:action.id
            })
        case CLOSE_INSTALL_DRBD_MODAL:
            return Object.assign({}, state, {
                install_drbd_modal: false
            })
        case INSTALL_DRBD_OK:
            return state
        case INSTALL_DRBD_ERROR:  
            return state
        case REQUEST_INITIALIZE:
            return Object.assign({},state,{
                isFetching: true,
                didInvalidate: false,
                selectedMirrors:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_INITIALIZE_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items:state.items
                
            })
        case RECEIVE_INITIALIZE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_INITIALIZE_MODAL:
            return Object.assign({}, state, {
                initialize_modal: true,
                hash:action.id
            })
        case CLOSE_INITIALIZE_MODAL:
            return Object.assign({}, state, {
                initialize_modal: false
            })
        case REQUEST_SYNC:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedMirrors:[],
                selectedRowKeys:[],         
            })
        case RECEIVE_SYNC_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
            })
        case RECEIVE_SYNC_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_SYNC_MODAL:
            return Object.assign({}, state, {
                sync_modal: true,
                sync_id:action.id
            })
        case CLOSE_SYNC_MODAL:
            return Object.assign({}, state, {
                sync_modal: false
            })
        case REQUEST_UNINSTALL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedMirrors:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_UNINSTALL_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
            })
        case RECEIVE_UNINSTALL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_UNINSTALL_MODAL:
            return Object.assign({}, state, {
                uninstall_modal: true,
                uninstall_id:action.id
            })
        case CLOSE_UNINSTALL_MODAL:
            return Object.assign({}, state, {
                uninstall_modal: false
            })
        case REQUEST_SYNCSTATUS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedMirrors:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_SYNCSTATUS_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                sync :action.sync,

            })
        case RECEIVE_SYNCSTATUS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_SYNCSTATUS_MODAL:
            return Object.assign({}, state, {
                syncstatus_modal: true,
                syncstatus_id:action.mirro,
                agentid:action.agenti,
                agentname:action.agentnam,
            })
        case CLOSE_SYNCSTATUS_MODAL:
            return Object.assign({}, state, {
                syncstatus_modal: false
            })
        case ECHO_OPENSYNCSTATUS_MODAL:
            return Object.assign({}, state, {
                opensyncstatus_modal: true,
            })
        case CLOSE_OPENSYNCSTATUS_MODAL:
            return Object.assign({}, state, {
                opensyncstatus_modal: false
            })

        case REQUEST_INSTALLAGENT:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedMirrors:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_INSTALLAGENT_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
            })
        case RECEIVE_INSTALLAGENT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case ECHO_INSTALLAGENT_MODAL:
            return Object.assign({}, state, {
                installagent_modal: true,
                installagent_id:action.id,
                agentid:action.agentid,
                agentname:action.agentnam,

            })
        case CLOSE_INSTALLAGENT_MODAL:
            return Object.assign({}, state, {
                installagent_modal: false,
                agentid:[]
            })
        case ECHO_CREATE_VOLUME_MODAL:
            return Object.assign({}, state, {
                create_volume_modal: true
            })
        case CLOSE_CREATE_VOLUME_MODAL:
            return Object.assign({}, state, {
                create_volume_modal: false
            })
        case REQUEST_IPADDRESSES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedipaddresses:[],
                selectedRowKeys:[],            
            })
        case RECEIVE_IPADDRESSES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                address: action.items,
            })
        case RECEIVE_IPADDRESSES_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:true
            })
        case REQUEST_WINDOWS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedwindows:[],
                selectedRowKeys:[],  
                windows:{},          
            })
        case RECEIVE_WINDOWS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                windows:action.windows,
            })
        case RECEIVE_WINDOWS_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:true
            })
        case REQUIRE_SOURCEID_NUMBER:
            return Object.assign({},state,{
                isFetching:false,
                didInvalidate:false,
                num:action.num,
            })
        case ECHO_SETAGENT_MODAL:
            return Object.assign({}, state, {
                setagent_modal: true,
                setagent_id:action.id,
                agentid:action.agentid,
                agentname:action.agentnam,
            })
        case CLOSE_SETAGENT_MODAL:
            return Object.assign({}, state, {
                setagent_modal: false,
                agentid:[]
            })
        case ECHO_AGENT_UPORDOWN_MODAL:
            return Object.assign({}, state, {
                agent_upordown_modal: true,
                mirror_id:action.id,
                agentid:action.agentid,
                agentname:action.agentnam,
            })
        case CLOSE_AGENT_UPORDOWN_MODAL:
            return Object.assign({}, state, {
                agent_upordown_modal: false,
                agentid:[],
                mirror_id:[],
            })
        case ECHO_AGENT_PAUSESYNC_MODAL:
            return Object.assign({}, state, {
                agent_pausesync_modal: true,
                mirror_id:action.id,
                agentid:action.agentid,
                agentname:action.agentnam,
            })
        case CLOSE_AGENT_PAUSESYNC_MODAL:
            return Object.assign({}, state, {
                agent_pausesync_modal: false,
                agentid:[],
                mirror_id:[],
            })
        case ECHO_AGENT_RESUMESYNC_MODAL:
            return Object.assign({}, state, {
                agent_resumesync_modal: true,
                mirror_id:action.id,
                agentid:action.agentid,
                agentname:action.agentnam,
            })
        case CLOSE_AGENT_RESUMESYNC_MODAL:
            return Object.assign({}, state, {
                agent_resumesync_modal: false,
                agentid:[],
                mirror_id:[],
            })
        case ECHO_AGENT_GETAGENTROLE_MODAL:
            return Object.assign({}, state, {
                agent_getagentrole_modal: true,
                mirror_id:action.id,
                agentid:action.agentid,
                agentname:action.agentnam,
                
            })
        case CLOSE_AGENT_GETAGENTROLE_MODAL:
            return Object.assign({}, state, {
                agent_getagentrole_modal: false,
                agentid:[],
                mirror_id:[],
            })
        case REQUEST_AGENT_GETAGENTROLE:
            return state
        case RECEIVE_AGENT_GETAGENTROLE:
            return Object.assign({},state,{
                agentrole:action.getagentrole,
            })
        case RECEIVE_AGENT_GETAGENTROLE_ERROR:
            return state
        case ECHO_AGENT_LOCALORAGENT_MODAL:
            return Object.assign({}, state, {
                agent_localoragent_modal: true,
                previousagent:false,
                
            })
        case CLOSE_AGENT_LOCALORAGENT_MODAL:
            return Object.assign({}, state, {
                agent_localoragent_modal: false,
            })
        case ECHO_AGENT_AGENTORLOCAL_MODAL:
            return Object.assign({}, state, {
                agent_agentorlocal_modal: true,
                previousagent:false,

            })
        case CLOSE_AGENT_AGENTORLOCAL_MODAL:
            return Object.assign({}, state, {
                agent_agentorlocal_modal: false,
            })
        case GET_AGENT_MIRROR:
            return Object.assign({},state,{
                getagentmirrors:action.getagentmirror
            })
        case ECHO_MODIFY_MIRROR_AGENT_MODAL:
            return Object.assign({}, state, {
                agent_modifyagent_modal: true,
               
            })
        case CLOSE_MODIFY_MIRROR_AGENT_MODAL:
            return Object.assign({}, state, {
                agent_modifyagent_modal: false,
            })
        case CLOSE_SELECT_AGENT_URL:
            return Object.assign({}, state, {
                select_agent_url_modal: false,
            })
        case ECHO_SELECT_AGENT_URL:
            return Object.assign({},state,{
                select_agent_url_modal:true,
                 modifyagentid:action.id,
            })
        case SUBMIT_SELECT_AGENT_URL:
            return Object.assign({},state,{
                selectagenturl:action.url,
            })
        case CLOSE_AGENT_OPENROLE:
            return Object.assign({}, state, {
                openrole_modal: false,
            })
        case ECHO_AGENT_OPENROLE:
            return Object.assign({},state,{
                openrole_modal:true,
            })
        case REQUEST_GET_AGENT_DRBDSTATUS:
            return Object.assign({}, state, {
                drbdstatus:[],
                drbdstatusid:[],

            })
        case RECEIVE_GET_AGENT_DRBDSTATUS:
            return update(state,{drbdstatus:{$push:[action.drbdstatus]},drbdstatusid:{$push:[action.agentid]}})
        case RECEIVE_GET_AGENT_DRBDSTATUS_ERROR:
            return state
        case REQUEST_AGENT_GETAGENTROLE_BEHIND:
            return Object.assign({},state,{
                role:[]
            })
        case RECEIVE_AGENT_GETAGENTROLE_BEHIND:
            return update(state,{role:{$push:[action.role]}})
        case RECEIVE_AGENT_GETAGENTROLE_BEHIND_ERROR:
            return state
        case GET_PREVIOUS_AGENT:
            return Object.assign({},state,{
                previousagent:true,
            })
        case SEARCH_MIRROR_OK:
            return Object.assign({},state,{
                items:action.searchMirror,
            })
        case ECHO_CLEAR_MIRROR:
            return Object.assign({},state,{
                clear_mirror_modal:true,
            })
        case CLOSE_CLEAT_MIRROR:
            return Object.assign({},state,{
                clear_mirror_modal:false,
            })
        case REQUEST_CLEAR_MIRROR:
            return Object.assign({},state,{
                clear_mirror_loading:true,
            })
        case SET_CLEAR_MIRROR_OK:
            return Object.assign({},state,{
                clear_mirror_loading:false,
            })
        case SET_CLEAR_MIRROR_ERR:
            return Object.assign({},state,{
                clear_mirror_loading:false,
            })
        case ECHO_PREFER_HOST:
            return Object.assign({},state,{
                prefer_host_modal:true,
                prefer_mirror_id:action.prefer_mirror_id,
            })
        case CLOSE_PREFER_HOST:
            return Object.assign({},state,{
                prefer_host_modal:false,
                prefer_mirror_id:'',
            })
        case REQUEST_PREFER_HOST:
            return Object.assign({},state,{
                prefer_host_loading:true,
            })
        case SET_PREFER_HOST_OK:
            return Object.assign({},state,{
                prefer_host_loading:false,
            })
        case SET_PREFER_HOST_ERR:
            return Object.assign({},state,{
                prefer_host_loading:false,
            })
        case ECHO_INSTALL_PCS:
            return Object.assign({},state,{
                install_pcs_modal:true,
            })
        case CLOSE_INSTALL_PCS:
            return Object.assign({},state,{
                install_pcs_modal:false,
            })
        case REQUEST_INSTALL_PCS:
            return Object.assign({},state,{
                install_pcs_loading:true,
            })
        case SET_INSTALL_PCS_OK:
            return Object.assign({},state,{
                install_pcs_loading:false,
            })
        case SET_INSTALL_PCS_ERR:
            return Object.assign({},state,{
                install_pcs_loading:false,
            })
        case ECHO_HOST_TO_HOST:
            return Object.assign({},state,{
                host_to_host_modal:true
            })
        case CLOSE_HOST_TO_HOST:
            return Object.assign({},state,{
                host_to_host_modal:false
            })
        case CREATE_HOST_TO_HOST_OK:
            update(state,{items:{$push:[action.mirrorhost]}})
        case CREATE_HOST_TO_HOST_ERR:
            return Object.assign({},state,{
                
            })
        default:
            return state
    }
}
function mirrors(state = {isFetching:false,didInvalidate:true,items:[]},action){
    return fetchMIRROR(state,action)
}

export default mirrors