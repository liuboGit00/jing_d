import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,clonepath,snapshotspath,username,password,agentlistpath,registerpath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'
//MIRRORS
export const ECHO_CREATE_MIRROR_MODAL = 'ECHO_CREATE_MIRROR_MODAL'
export const CLOSE_CREATE_MIRROR_MODAL = 'CLOSE_CREATE_MIRROR_MODAL'
export const ECHO_MODIFY_MIRROR_MODAL = 'ECHO_MODIFY_MIRROR_MODAL'
export const CLOSE_MODIFY_MIRROR_MODAL = 'CLOSE_MODIFY_MIRROR_MODAL'
export const FETCH_MIRRORS = 'FETCH_MIRRORS'
export const REQUEST_MIRRORS = 'REQUEST_MIRRORS'
export const RECEIVE_MIRRORS = 'RECEIVE_MIRRORS'
export const RECEIVE_MIRRORS_ERROR = 'RECEIVE_MIRRORS_ERROR'
export const DELETE_MIRRORS = 'DELETE_MIRRORS'
export const DELETE_MIRRORS_OK = 'DELETE_MIRRORS_OK'
export const DELETE_MIRRORS_ERROR = 'DELETE_MIRRORS_ERROR'
export const TOGGLE_MIRRORS = 'TOGGLE_MIRRORS'
export const CREATE_MIRROR = 'CREATE_MIRROR'
export const CREATE_MIRROR_OK = 'CREATE_MIRROR_OK'
export const CREATE_MIRROR_ERROR = 'CREATE_MIRROR_ERROR'
export const GET_AGENT_MIRROR = 'GET_AGENT_MIRROR'

export const INSTALL_DRBD_ERROR= 'INSTALL_DRBD_ERROR'
export const INSTALL_DRBD_OK = 'INSTALL_DRBD_OK'
export const INSTALL_DRBD = 'INSTALL_DRBD'
export const ECHO_INSTALL_DRBD_MODAL = 'ECHO_INSTALL_DRBD_MODAL'
export const CLOSE_INSTALL_DRBD_MODAL = 'CLOSE_INSTALL_DRBD_MODAL'

export const REQUEST_INITIALIZE = 'REQUEST_INITIALIZE'
export const RECEIVE_INITIALIZE_OK = 'RECEIVE_INITIALIZE_OK'
export const FETCH_INITIALIZE = 'FETCH_INITIALIZE'
export const CLOSE_INITIALIZE_MODAL='CLOSE_INITIALIZE_MODAL'
export const ECHO_INITIALIZE_MODAL ='ECHO_INITIALIZE_MODAL'
export const RECEIVE_INITIALIZE_ERROR ='RECEIVE_INITIALIZE_ERROR'

export const REQUEST_SYNC = 'REQUEST_SYNC'
export const RECEIVE_SYNC_OK = 'RECEIVE_SYNC_OK'
export const RECEIVE_SYNC_ERROR = 'RECEIVE_SYNC_ERROR'
export const FETCH_SYNC = 'FETCH_SYNC'
export const CLOSE_SYNC_MODAL = 'CLOSE_SYNC_MODAL'
export const ECHO_SYNC_MODAL= 'ECHO_SYNC_MODAL'


export const REQUEST_UNINSTALL = 'REQUEST_UNINSTALL'
export const RECEIVE_UNINSTALL_OK = 'RECEIVE_UNINSTALL_OK'
export const RECEIVE_UNINSTALL_ERROR = 'RECEIVE_UNINSTALL_ERROR'
export const FETCH_UNINSTALL = 'FETCH_UNINSTALL'
export const CLOSE_UNINSTALL_MODAL = 'CLOSE_UNINSTALL_MODAL'
export const ECHO_UNINSTALL_MODAL = 'ECHO_UNINSTALL_MODAL'

//进度查询

export const REQUEST_SYNCSTATUS = 'REQUEST_SYNCSTATUS'
export const RECEIVE_SYNCSTATUS_OK = 'RECEIVE_SYNCSTATUS_OK'
export const RECEIVE_SYNCSTATUS_ERROR = 'RECEIVE_SYNCSTATUS_ERROR'
export const FETCH_SYNCSTATUS = 'FETCH_SYNCSTATUS'
export const ECHO_SYNCSTATUS_MODAL = 'ECHO_SYNCSTATUS_MODAL'
export const CLOSE_SYNCSTATUS_MODAL = 'CLOSE_SYNCSTATUS_MODAL'
export const ECHO_OPENSYNCSTATUS_MODAL ='ECHO_OPENSYNCSTATUS_MODAL'
export const CLOSE_OPENSYNCSTATUS_MODAL ='CLOSE_OPENSYNCSTATUS_MODAL'


export const REQUEST_INSTALLAGENT = 'REQUEST_INSTALLAGENT'
export const RECEIVE_INSTALLAGENT_ERROR = 'RECEIVE_INSTALLAGENT_ERROR'
export const RECEIVE_INSTALLAGENT_OK = 'RECEIVE_INSTALLAGENT_OK'
export const FETCH_INSTALLAGENT = 'FETCH_INSTALLAGENT'
export const ECHO_INSTALLAGENT_MODAL = 'ECHO_INSTALLAGENT_MODAL'
export const CLOSE_INSTALLAGENT_MODAL = 'CLOSE_INSTALLAGENT_MODAL'


export const FETCH_IPADDRESSES = 'FETCH_IPADDRESSES'
export const REQUEST_IPADDRESSES = 'REQUEST_IPADDRESSES'
export const RECEIVE_IPADDRESSES_ERROR = 'RECEIVE_IPADDRESSES_ERROR'
export const RECEIVE_IPADDRESSES = 'RECEIVE_IPADDRESSES'
//fetch_windows
export const FETCH_WINDOWS = 'FETCH_WINDOWS'
export const REQUEST_WINDOWS = 'REQUEST_WINDOWS'
export const RECEIVE_WINDOWS_ERROR = 'RECEIVE_WINDOWS_ERROR'
export const RECEIVE_WINDOWS = 'RECEIVE_WINDOWS'
export const REQUIRE_SOURCEID_NUMBER = 'REQUIRE_SOURCEID_NUMBER'

//clone
export const ECHO_CREATE_AGENT_CLONE_MODAL = 'ECHO_CREATE_AGENT_CLONE_MODAL'
export const CLOSE_CREATE_AGENT_CLONE_MODAL = 'CLOSE_CREATE_AGENT_CLONE_MODAL'
export const FETCH_AGENT_CLONE = 'FETCH_AGENT_CLONE'
export const REQUEST_AGENT_CLONE = 'REQUEST_AGENT_CLONE'
export const RECEIVE_AGENT_CLONE = 'RECEIVE_AGENT_CLONE'
export const RECEIVE_AGENT_CLONE_ERROR = 'RECEIVE_AGENT_CLONE_ERROR'
export const DELETE_AGENT_CLONE = 'DELETE_AGENT_CLONE'
export const DELETE_AGENT_CLONE_OK = 'DELETE_AGENT_CLONE_OK'
export const DELETE_AGENT_CLONE_ERROR = 'DELETE_AGENT_CLONE_ERROR'
export const TOGGLE_AGENT_CLONE = 'TOGGLE_AGENT_CLONE'
export const CREATE_AGENT_CLONE = 'CREATE_AGENT_CLONE'
export const CREATE_AGENT_CLONE_OK = 'CREATE_AGENT_CLONE_OK'
export const CREATE_AGENT_CLONE_ERROR = 'CREATE_AGENT_CLONE_ERROR'
//modify agent clone
export const CREATE_MODIFY_AGENT_CLONE_OK = 'CREATE_MODIFY_AGENT_CLONE_OK'
export const CREATE_MODIFY_AGENT_CLONE_ERROR = 'CREATE_MODIFY_AGENT_CLONE_ERROR'
export const ECHO_MODIFY_AGENT_CLONE = 'ECHO_MODIFY_AGENT_CLONE'
export const CLOSE_MODIFY_AGENT_CLONE = 'CLOSE_MODIFY_AGENT_CLONE'

// agent->local
export const ECHO_CREATE_AGENT_LOCAL_MODAL = 'ECHO_CREATE_AGENT_LOCAL_MODAL'
export const CLOSE_CREATE_AGENT_LOCAL_MODAL = 'CLOSE_CREATE_AGENT_LOCAL_MODAL'
export const CREATE_AGENT_LOCAL = 'CREATE_AGENT_LOCAL'
export const CREATE_AGENT_LOCAL_OK = 'CREATE_AGENT_LOCAL_OK'
export const CREATE_AGENT_LOCAL_ERROR = 'CREATE_AGENT_LOCAL_ERROR'
// local->agent
export const ECHO_CREATE_LOCAL_AGENT_MODAL = 'ECHO_CREATE_LOCAL_AGENT_MODAL'
export const CLOSE_CREATE_LOCAL_AGENT_MODAL = 'CLOSE_CREATE_LOCAL_AGENT_MODAL'
export const CREATE_LOCAL_AGENT = 'CREATE_LOCAL_AGENT'
export const CREATE_LOCAL_AGENT_OK = 'CREATE_LOCAL_AGENT_OK'
export const CREATE_LOCAL_AGENT_ERROR = 'CREATE_LOCAL_AGENT_ERROR'
// fetch status
export const REQUEST_AGENT_CLONE_STATUS = 'REQUEST_AGENT_CLONE_STATUS'
export const RECEIVE_AGENT_CLONE_STATUS = 'RECEIVE_AGENT_CLONE_STATUS'
export const RECEIVE_AGENT_CLONE_STATUS_ERROR = 'RECEIVE_AGENT_CLONE_STATUS_ERROR'
export const FETCH_AGENT_CLONE_SATATUS = 'FETCH_AGENT_CLONE_SATATUS'
export const ECHO_AGENT_CLONE_DOWNLOAD = 'ECHO_AGENT_CLONE_DOWNLOAD'
export const CLOSE_AGENT_CLONE_DOWNLOAD = 'CLOSE_AGENT_CLONE_DOWNLOAD'
// set status 
export const CREATE_SETAGENT_STATUS = 'CREATE_SETAGENT_STATUS'
export const CREATE_SETAGENT_STATUS_ERROR = 'CREATE_SETAGENT_STATUS_ERROR'
export const ECHO_SETAGENT_MODAL = 'ECHO_SETAGENT_MODAL'
export const CLOSE_SETAGENT_MODAL = 'CLOSE_SETAGENT_MODAL'
//agent up or down 
export const CREATE_AGENT_UPORDOWN = 'CREATE_AGENT_UPORDOWN'
export const CREATE_AGENT_UPORDOWN_ERROR = 'CREATE_AGENT_UPORDOWN_ERROR'
export const ECHO_AGENT_UPORDOWN_MODAL = 'ECHO_AGENT_UPORDOWN_MODAL'
export const CLOSE_AGENT_UPORDOWN_MODAL = 'CLOSE_AGENT_UPORDOWN_MODAL'
// stop agent
export const CREATE_AGENT_PAUSESYNC = 'CREATE_AGENT_PAUSESYNC'
export const CREATE_AGENT_PAUSESYNC_ERROR = 'CREATE_AGENT_PAUSESYNC_ERROR'
export const ECHO_AGENT_PAUSESYNC_MODAL = 'ECHO_AGENT_PAUSESYNC_MODAL'
export const CLOSE_AGENT_PAUSESYNC_MODAL = 'CLOSE_AGENT_PAUSESYNC_MODAL'
// begin agent
export const CREATE_AGENT_RESUMESYNC = 'CREATE_AGENT_RESUMESYNC'
export const CREATE_AGENT_RESUMESYNC_ERROR = 'CREATE_AGENT_RESUMESYNC_ERROR'
export const ECHO_AGENT_RESUMESYNC_MODAL = 'ECHO_AGENT_RESUMESYNC_MODAL'
export const CLOSE_AGENT_RESUMESYNC_MODAL = 'CLOSE_AGENT_RESUMESYNC_MODAL'
//get agent role
export const ECHO_AGENT_GETAGENTROLE_MODAL = 'ECHO_AGENT_GETAGENTROLE_MODAL'
export const CLOSE_AGENT_GETAGENTROLE_MODAL = 'CLOSE_AGENT_GETAGENTROLE_MODAL'
export const REQUEST_AGENT_GETAGENTROLE = 'REQUEST_AGENT_GETAGENTROLE'
export const RECEIVE_AGENT_GETAGENTROLE = 'RECEIVE_AGENT_GETAGENTROLE'
export const RECEIVE_AGENT_GETAGENTROLE_ERROR = 'RECEIVE_AGENT_GETAGENTROLE_ERROR'
export const ECHO_AGENT_OPENROLE = 'ECHO_AGENT_OPENROLE'
export const CLOSE_AGENT_OPENROLE = 'CLOSE_AGENT_OPENROLE'
export const REQUEST_AGENT_GETAGENTROLE_BEHIND = 'REQUEST_AGENT_GETAGENTROLE_BEHIND'
export const RECEIVE_AGENT_GETAGENTROLE_BEHIND = 'RECEIVE_AGENT_GETAGENTROLE_BEHIND'
export const RECEIVE_AGENT_GETAGENTROLE_BEHIND_ERROR = 'RECEIVE_AGENT_GETAGENTROLE_BEHIND_ERROR'
//OPEN LOCAL
export const ECHO_AGENT_LOCALORAGENT_MODAL = 'ECHO_AGENT_LOCALORAGENT_MODAL'
export const CLOSE_AGENT_LOCALORAGENT_MODAL = 'CLOSE_AGENT_LOCALORAGENT_MODAL'
//OPEN AGENT
export const ECHO_AGENT_AGENTORLOCAL_MODAL = 'ECHO_AGENT_AGENTORLOCAL_MODAL'
export const CLOSE_AGENT_AGENTORLOCAL_MODAL = 'CLOSE_AGENT_AGENTORLOCAL_MODAL'
// modify mirror agent
export const ECHO_MODIFY_MIRROR_AGENT_MODAL = 'ECHO_MODIFY_MIRROR_AGENT_MODAL'
export const CLOSE_MODIFY_MIRROR_AGENT_MODAL = 'CLOSE_MODIFY_MIRROR_AGENT_MODAL'
export const CREATE_MIRROR_MODIFY_AGENT_ERR = 'CREATE_MIRROR_MODIFY_AGENT_ERR'
export const CREATE_MIRROR_MODIFY_AGENT_OK = 'CREATE_MIRROR_MODIFY_AGENT_OK'
//select agent url
export const ECHO_SELECT_AGENT_URL ='ECHO_SELECT_AGENT_URL'
export const CLOSE_SELECT_AGENT_URL ='CLOSE_SELECT_AGENT_URL'
export const SUBMIT_SELECT_AGENT_URL ='SUBMIT_SELECT_AGENT_URL'
//获取到agent的drbdstatus
export const REQUEST_GET_AGENT_DRBDSTATUS ='REQUEST_GET_AGENT_DRBDSTATUS'
export const RECEIVE_GET_AGENT_DRBDSTATUS ='RECEIVE_GET_AGENT_DRBDSTATUS'
export const RECEIVE_GET_AGENT_DRBDSTATUS_ERROR ='RECEIVE_GET_AGENT_DRBDSTATUS_ERROR'

//获取克隆的速度
export const ECHO_AGENT_CLONE_SPEED = 'ECHO_AGENT_CLONE_SPEED'
export const CLOSE_AGENT_CLONE_SPEED = 'CLOSE_AGENT_CLONE_SPEED'
export const CLONE_ON_OFF_STATUS = 'CLONE_ON_OFF_STATUS'

//本地到任意客户端

export const ECHO_LOCAL_ANYAGENT = 'ECHO_LOCAL_ANYAGENT'
export const CLOSE_LOCAL_ANYAGENT = 'CLOSE_LOCAL_ANYAGENT'
export const CREATE_LOCAL_ANYAGENT_OK = 'CREATE_LOCAL_ANYAGENT_OK'
export const CREATE_LOCAL_ANYAGENT_ERR = 'CREATE_LOCAL_ANYAGENT_ERR'

//定时获取状态
export const REQUEST_ONE_CLONE_STATUS = 'REQUEST_ONE_CLONE_STATUS'
export const RECEIVE_ONE_CLONE_STATUS = 'RECEIVE_ONE_CLONE_STATUS'
export const RECEIVE_ONE_CLONE_STATUS_ERR = 'RECEIVE_ONE_CLONE_STATUS_ERR'
export const REQUEST_ONE_AGENT_CLONE = 'REQUEST_ONE_AGENT_CLONE'
export const RECEIVE_ONE_AGENT_CLONE = 'RECEIVE_ONE_AGENT_CLONE'
export const RECEIVE_ONE_AGENT_CLONE_ERROR = 'RECEIVE_ONE_AGENT_CLONE_ERROR'

//search mirror
export const SEARCH_MIRROR_OK = 'SEARCH_MIRROR_OK'
export const SEARCH_MIRROR_ERR = 'SEARCH_MIRROR_ERR'

//clear mirror
export const ECHO_CLEAR_MIRROR = 'ECHO_CLEAR_MIRROR'
export const CLOSE_CLEAT_MIRROR = 'CLOSE_CLEAT_MIRROR'
export const REQUEST_CLEAR_MIRROR = 'REQUEST_CLEAR_MIRROR'
export const SET_CLEAR_MIRROR_OK = 'SET_CLEAR_MIRROR_OK'
export const SET_CLEAR_MIRROR_ERR = 'SET_CLEAR_MIRROR_ERR'
export const ECHO_PREFER_HOST = 'ECHO_PREFER_HOST'
export const CLOSE_PREFER_HOST = 'CLOSE_PREFER_HOST'
export const REQUEST_PREFER_HOST = 'REQUEST_PREFER_HOST'
export const SET_PREFER_HOST_OK = 'SET_PREFER_HOST_OK'
export const SET_PREFER_HOST_ERR = 'SET_PREFER_HOST_ERR'
export const ECHO_INSTALL_PCS = 'ECHO_INSTALL_PCS'
export const CLOSE_INSTALL_PCS = 'CLOSE_INSTALL_PCS'
export const REQUEST_INSTALL_PCS = 'REQUEST_INSTALL_PCS'
export const SET_INSTALL_PCS_OK = 'SET_INSTALL_PCS_OK'
export const SET_INSTALL_PCS_ERR = 'SET_INSTALL_PCS_ERR'

// mirror host to host 
export const ECHO_HOST_TO_HOST = 'ECHO_HOST_TO_HOST'
export const CLOSE_HOST_TO_HOST = 'CLOSE_HOST_TO_HOST'
export const CREATE_HOST_TO_HOST_OK = 'CREATE_HOST_TO_HOST_OK'
export const CREATE_HOST_TO_HOST_ERR = 'CREATE_HOST_TO_HOST_ERR'

export function echo_host_to_host(){
    return {
        type:ECHO_HOST_TO_HOST,
    }
}
export function close_host_to_host(){
    return {
        type:CLOSE_HOST_TO_HOST
    }
}
export function create_host_to_host_err(err){
    return{
        type:CREATE_HOST_TO_HOST_ERR,
        err
    }
}
export function create_host_to_host_ok(body){
    return{
        type:CREATE_HOST_TO_HOST_OK,
        mirrorhost:body,
    }
}
export function create_host_to_host(mirror){
    const params={'baseURI':restapi,'username':username,'password':password}
    return function(dispatch){
        let api = new API({
            baseURI:params.baseURI,
        });
        api.auth([params.username,params.password]);
        api.post('/mirrors',{ credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain', 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' ,},
            body:JSON.stringify({
                connecttype:'host-host',
                source:{
                    name:mirror.source_name,
                    volume_id:mirror.source_volume,
                    metadisk_id:mirror.source_metadisk,
                    localaddress_id:source_localaddress,
                },
                dest:{
                    name:mirror.dest_name,
                    volume_id:mirror.dest_volume,
                    localaddress_id:mirror.dest_localaddress_id,
                    localaddress:mirror.dest_localaddress,
                    hostid:mirror.dest_host,
                    volume_path:mirror.dest_volume_path,
                    metadisk_id:mirror.dest_metadisk_id,
                    metadisk_path:mirror.dest_metadisk_path,
                }
            })}, (err, res, body) => {
            if (err) {
                dispatch(create_host_to_host_err(err))
                dispatch(add_operation({
                    content:'创建主机镜像:'+mirror.source_name,
                    result:'failed'
                }))
                message.error('操作失败');
                return false
            }
            if(body.results!=undefined){
                dispatch(create_host_to_host_ok(body.results))
            }else{
                dispatch(create_host_to_host_ok(body))
            }
            dispatch(add_operation({
                content:'创建主机镜像:'+mirror.source_name,
                result:'success'
            }))
            message.success('操作成功')
            dispatch(close_host_to_host())
        })
    }
}



export function request_clear_mirror(){
    return {
        type:REQUEST_CLEAR_MIRROR,
    }
}
export function set_clear_mirror_ok(body){
    return {
        type:SET_CLEAR_MIRROR_OK,
        clearmap:body
    }
}
export function set_clear_mirror_err(err){
    return{
        type:SET_CLEAR_MIRROR_ERR,
        err
    }
}
export function echo_clear_mirror(){
    return{
        type:ECHO_CLEAR_MIRROR,
    }
}
export function close_clear_mirror(){
    return{
        type:CLOSE_CLEAT_MIRROR,
    }
}
export function request_prefer_host(){
    return{
        type:REQUEST_PREFER_HOST,
    }
}
export function set_prefer_host_ok(body){
    return {
        type: SET_PREFER_HOST_OK,
        preferhost:body,
    }
}
export function set_prefer_host_err(err){
    return {
        type:SET_PREFER_HOST_ERR,
        err
    }
}
export function echo_prefer_host(id){
    return {
        type: ECHO_PREFER_HOST,
        prefer_mirror_id:id,
    }
}
export function close_prefer_host(){
    return {
        type:CLOSE_PREFER_HOST,
    }
}
export function request_install_pcs(){
    return {
        type: REQUEST_INSTALL_PCS,
    }
}
export function set_install_pcs_ok(body){
    return {
        type:SET_INSTALL_PCS_OK,
        pcsinstall:body,
    }
}
export function set_install_pcs_err(err){
    return {
        type:SET_INSTALL_PCS_ERR,
        err,
    }
}
export function echo_install_pcs(){
    return {
        type:ECHO_INSTALL_PCS,
    }
}
export function close_install_pcs(){
    return{
        type:CLOSE_INSTALL_PCS,
    }
}
export function search_mirror_ok(name){
    return {
        type:SEARCH_MIRROR_OK,
        searchMirror:name,
    }
}
export function search_mirror_err(err){
    return {
        type:SEARCH_MIRROR_ERR,
        err
    }
}
export function search_mirror(key){
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        let api = new API({
            baseURI:params.baseURI,
        });
        api.auth([params.username,params.password]);
        api.get('/mirrors?'+'search='+key,{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(search_mirror_err(err))
                return false
            }
            if(body.results!=undefined){
                dispatch(search_mirror_ok(body.results))
            }else{
                dispatch(search_mirror_ok(body))
            }
        })
    }
}


export function clear_mirror(id){
    console.log(id)
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_clear_mirror())
        let api = new API({
            baseURI:params.baseURI,
        });
        api.auth([params.username,params.password]);
        api.get('/mirrors/'+id+'/clearmap',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(set_clear_mirror_err(err))
                return false
            }
            if(body.results!=undefined){
                dispatch(set_clear_mirror_ok(body.results))
            }else{
                dispatch(set_clear_mirror_ok(body))
            }
        })
    }
}

export function prefer_host(host){
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_prefer_host())
        let api = new API({
            baseURI:params.baseURI,
        });
        api.auth([params.username,params.password]);
        api.post('/mirrors/'+host.id+'/prefer',{ credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain', 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' ,},body:JSON.stringify({
            host:host.host,
            databaseonly:host.databaseonly,
        }) }, (err, res, body) => {
            if (err) {
                dispatch(set_prefer_host_err(err))
                dispatch(add_operation({
                    content:'设置主机地位为主:'+host.host,
                    result:'failed'
                }))
                message.error('操作失败');
                return false
            }
            if(body.results!=undefined){
                dispatch(set_prefer_host_ok(body.results))
            }else{
                dispatch(set_prefer_host_ok(body))
            }
            dispatch(add_operation({
                content:'设置主机地位为主:'+host.host,
                result:'success'
            }))
            message.success('操作成功')
            dispatch(close_prefer_host())
        })
    }
}
export function pcs_install(id){
    console.log(id)
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_install_pcs())
        let api = new API({
            baseURI:params.baseURI,
        });
        api.auth([params.username,params.password]);
        api.get('/mirrors/'+id+'/pcsinstall',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(set_install_pcs_err(err))
                return false
            }
            if(body.results!=undefined){
                dispatch(set_install_pcs_ok(body.results))
            }else{
                dispatch(set_install_pcs_ok(body))
            }
        })
    }
}



export function fetch_one_agent_clone(id){
    console.log(id)
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        let api = new API({
            baseURI: params.baseURI
        });

        api.auth([params.username,params.password]);
        api.get(params.path+'/'+id , { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if(res.status==200){
                dispatch(receive_one_agent_clone(body))
            }else{
                dispatch(receive_one_agent_clone_error(err))
                return false
            }
        })
    }
}
export function request_one_agent_clone(params){
    return{
        type:REQUEST_ONE_AGENT_CLONE,
        params
    }
}
export function receive_one_agent_clone(one){
    return{
        type:RECEIVE_ONE_AGENT_CLONE,
        oneagentclone:one,
    }
}
export function receive_one_agent_clone_error(err){
    return{
        type:RECEIVE_ONE_AGENT_CLONE_ERROR,
        err
    }
}
export function request_one_clone_status(){
    return{
        type:REQUEST_ONE_CLONE_STATUS
    }
}
export function receive_one_clone_status(body){
    return{
        type:RECEIVE_ONE_CLONE_STATUS,
        oneclonestatus:body
    }
}
export function receive_one_clone_status_err(err){
    return{
        type:RECEIVE_ONE_CLONE_STATUS_ERR,
        err
    }
}
export function fetch_one_clone_satus(url){
    return function(dispatch){
        let api = new API({
            baseURI:url
        })
        api.auth([username,password])
        api.get('',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_one_clone_status_err(err))
                return false
            }
            if(body.results!=undefined){
                dispatch(receive_one_clone_status(body.results))
            }else{
                dispatch(receive_one_clone_status(body))
            }
            
        })
    }
}

export function echo_local_anyagent(){
    return{
        type:'ECHO_LOCAL_ANYAGENT'
    }
}
export function close_local_anyagent(){
    return{
        type:'CLOSE_LOCAL_ANYAGENT'
    }
}
export function create_local_anyagent_ok(body){
    return{
        type:CREATE_LOCAL_ANYAGENT_OK,
        anyagent:body
    }
}
export function create_local_anyagent_err(err){
    return{
        type:CREATE_LOCAL_ANYAGENT_ERR,
        anyagenterr:err,
    }
}
export function create_local_anyagent(anyagent){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
         api.post('/clones/'+anyagent.id+'/sync2agentx', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                "agentname":anyagent.agentname,
                "agentport":anyagent.agentport,
                "agentdevice":anyagent.agentdevice,
                "agentdevicesize":anyagent.agentdevicesize,
                "bs":anyagent.bs,
                "offset":anyagent.offset,

            })
        }, (err, res, body) => {
            if (res.status == 201){
                dispatch(close_local_anyagent())
                if(body.results==undefined){
                    dispatch(create_local_anyagent_ok(body))
                }else{
                    dispatch(create_local_anyagent_ok(body.results))
                }
            } else {
                dispatch(create_local_anyagent_err(body))
                
            }
            
        })
    }
}



export function clone_on_off_status(onoff){
    return{
        type:CLONE_ON_OFF_STATUS,
        onoff
    }
}

export function echo_agent_clone_speed(){
    return{
        type:ECHO_AGENT_CLONE_SPEED,

    }
}
export function close_agent_clone_speed(){
    return{
        type:CLOSE_AGENT_CLONE_SPEED,

    }
}

//退回上一部
export const GET_PREVIOUS_AGENT = 'GET_PREVIOUS_AGENT'
export function get_previous_agent(peerviousagent){
    return{
        type:GET_PREVIOUS_AGENT,
        peerviousagent
    }
}

//mirrors
export function echo_create_mirror_modal(params){
    return{
        type:ECHO_CREATE_MIRROR_MODAL,
        localoragent:params
    }
}
export function echo_modify_mirror_modal(params){
    return{
        type:ECHO_MODIFY_MIRROR_MODAL,
        params
    }
}
export function close_create_mirror_modal(params){
    return{
        type:CLOSE_CREATE_MIRROR_MODAL,
        params
    }
    
}
export function close_modify_mirror_modal(params){
    return{
        type:CLOSE_MODIFY_MIRROR_MODAL,
        params
    }
}
export function delete_mirrors(selectedMirrors,auth){
    return function(dispatch){
        selectedMirrors.forEach(function(element){
            let api = new API({
                baseURI : element.url
            });
            api.auth([auth.username,auth.password]);
            api.del('',{credentials:'include',mode:'cors',headers:{'Accept':'application/json'}},(err,res,body)=>{
                if (200<=res.status&&res.status<300){
                    dispatch(delete_mirrors_ok(element))
                    dispatch(add_operation({
                        content:'删除镜像:'+selectedMirrors[0].name,
                        result:'success'
                    }))
                    message.success('操作成功')
                }else{
                    dispatch(delete_mirrors_error(element))
                    dispatch(add_operation({
                        content:'删除镜像:'+selectedMirrors[0].name,
                        result:'failed'
                    }))
                    message.error('操作失败');
                }

            })
        },auth);
    }
}
export function delete_mirrors_error(mirrors){
    return{
        type:DELETE_MIRRORS_ERROR,
        mirrors
    }
}
export function delete_mirrors_ok(mirrors){
    return{
        type:DELETE_MIRRORS_OK,
        mirrors
    }
}
export function toggle_mirrors(selectRowKeys,selectedRows){
    return{
        type:TOGGLE_MIRRORS,
        selectedMirrors:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }

}
export function get_agent_mirror(agent){
    return{
        type:GET_AGENT_MIRROR,
        getagentmirror:agent,
    }
}

export function fetch_ipaddresses(params={'baseURI':restapi,'path':'/ipaddresses','username':username,'password':password}){
    return function(dispatch){
        dispatch(request_ipaddresses(params))
        let api = new API({
            baseURI: params.baseURI
        });

        api.auth([params.username,params.password]);
        api.get(params.path + '?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                
                dispatch(receive_ipaddresses_error(params))
                return false
            }
            dispatch(receive_ipaddresses(body.results))
        })
    }
}
export function request_ipaddresses(params){
    return{
        type:REQUEST_IPADDRESSES,
        params
    }
}
export function receive_ipaddresses(ipaddressesjson){
    return{
        type:RECEIVE_IPADDRESSES,
        items:ipaddressesjson
    }
}
export function receive_ipaddresses_error(params={}){
    return{
        type:RECEIVE_IPADDRESSES_ERROR,
        params
    }
}
// FETCH_WINDOWS
export function fetch_windows(windowsId){
    const params={'baseURI':restapi,'path':'/agents','username':username,'password':password}
    return function(dispatch){
        dispatch(request_windows(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // console.log(params.path +'/'+ windowsId +'/diskusage')
        api.auth([params.username,params.password]);
        api.get(params.path +'/'+ windowsId +'/diskusage' + '?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                
                dispatch(receive_windows_error(params))
                return false
            }
            dispatch(receive_windows(body))
        })
    }
}
export function request_windows(params){
    return{
        type:REQUEST_WINDOWS,
        params
    }
}
export function receive_windows(windowsjson){
    return{
        type:RECEIVE_WINDOWS,
        windows:windowsjson
    }
}
export function receive_windows_error(params={}){
    return{
        type:RECEIVE_WINDOWS_ERROR,
        params
    }
}
export function require_sourceid_number(num){
    return{
        type:REQUIRE_SOURCEID_NUMBER,
        num:num
    }
}

export function fetch_mirrors(conditions={searchKey:''}){
    const params={'baseURI':restapi,'path':mirrorspath,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_mirrors(params))
        let api = new API({
            baseURI: params.baseURI
        });

        api.auth([params.username,params.password]);
        api.get(params.path + '?ordering=-id'+'&limit=999'+'&search='+ conditions.searchKey, { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_mirrors_error(params))
                return false
            }
            
            dispatch(receive_mirrors(body.results))
            // console.log(body.results)
            // console.log(body.results[0].getagentendpoint)
            for(let i=0;i<body.results.length;i++){
                if((body.results[i].getagentendpoint).length==2){
                    dispatch(get_agent_drbdstatus(body.results[i].id,body.results[i].getagentendpoint[0].id))
                }
                dispatch(agent_getagentrole_behind(body.results[i].id,body.results[i].getagentendpoint[0].id)) 
            }

        })
    }
}
export function request_mirrors(params){
    return{
        type:REQUEST_MIRRORS,
        params
    }
}
export function receive_mirrors(mirrorsjson){
    return{
        type:RECEIVE_MIRRORS,
        items:mirrorsjson
    }
}
export function receive_mirrors_error(params={}){
    return{
        type:RECEIVE_MIRRORS_ERROR,
        params
    }
}
export function create_mirror(mirror,getagentmirrors,auth) {
    console.log(getagentmirrors)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/mirrors', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: (mirror.drbdenable == false ? JSON.stringify({
                    'protocol':getagentmirrors.protocol,
                    'syncer_rate':getagentmirrors.mir_rate,
                    'source':{
                        'agentvolumename':getagentmirrors.mir_source_agentvolumename,
                        'agentDevpath':getagentmirrors.mir_source_agentdepath.split(':').length>1?getagentmirrors.mir_source_agentdepath.split(':')[1]:getagentmirrors.mir_source_agentdepath,
                        'agentDrbdminor':getagentmirrors.mir_source_agentdrbdminor,
                        'agentaddress':getagentmirrors.mir_source_agentaddress,
                        'metadisk':getagentmirrors.mir_source_metadisk,
                        'agentid':getagentmirrors.mir_source_agentid,
                    },
                    'dest':{
                        'volume_id':mirror.mir_dest_volumeid,
                        'localaddress':mirror.mir_dest_localaddress,
                        'drbdenable':mirror.drbdenable,
                        'agentvolumename':mirror.local_agentvolumename,
                        'agentDevpath':mirror.local_agentdepath,
                        'agentDrbdminor':mirror.local_agentdrbdminor,
                        'agentaddress':mirror.local_agentaddress,
                        'agentid':mirror.local_agentid,
                        'metadisk':mirror.mir_local_source_metadisk,
                        



                    }
                }):JSON.stringify({
                        'protocol':getagentmirrors.protocol,
                        'syncer_rate':getagentmirrors.mir_rate,
                        'source':{
                            'agentvolumename':getagentmirrors.mir_source_agentvolumename,
                            'agentDevpath':getagentmirrors.mir_source_agentdepath.split(':').length>1?getagentmirrors.mir_source_agentdepath.split(':')[1]:getagentmirrors.mir_source_agentdepath,
                            'agentDrbdminor':getagentmirrors.mir_source_agentdrbdminor,
                            'agentaddress':getagentmirrors.mir_source_agentaddress,
                            'metadisk':getagentmirrors.mir_source_metadisk,
                            'agentid':getagentmirrors.mir_source_agentid,
                        },
                        'dest':{
                            'drbdenable':mirror.drbdenable,
                            'volume_id':mirror.mir_dest_volumeid,
                            'metadisk':mirror.mir_dest_metadisk,
                            'localaddress':mirror.mir_dest_localaddress,
                        }
                    }))
        }, (err, res, body) => {
            if (err) {
                dispatch(create_mirror_error(body))
                dispatch(add_operation({
                    content:'添加镜像:'+mirror.mir_source_agentvolumename +':'+ mirror.mir_dest_volumeid,
                    result:'failed'
                }))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 201) {
                    dispatch(close_create_mirror_modal())
                    dispatch(create_mirror_ok(body))
                    dispatch(add_operation({
                        content:'添加镜像:'+mirror.mir_source_agentvolumename+':'+mirror.mir_dest_volumeid,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_mirror_error(body))
                    dispatch(add_operation({
                        content:'添加镜像:'+mirror.mir_source_agentvolumename+':'+mirror.mir_dest_volumeid,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_mirror_error(reason) {
    return {
        type: CREATE_MIRROR_ERROR,
        reason: reason
    }
}
export function create_mirror_ok(mirror) {
    return {
        type: CREATE_MIRROR_OK,
        mirror
    }
}



//DRBD
export function echo_install_drbd_modal(id){
    return{
        type:ECHO_INSTALL_DRBD_MODAL,
        id
    }
}

export function close_install_drbd_modal(params){
    return{
        type:CLOSE_INSTALL_DRBD_MODAL,
        params
    }
    
}
export function install_drbd(mirror,auth) {
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        // console.log(mirror.mirror_id)
        api.auth([auth.username, auth.password]);
        api.post('/mirrors', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                "connection_id":mirror.mirror_id
            })
        }, (err, res, body) => {
            if (res.status == 201){
                dispatch(close_install_drbd_modal())
                dispatch(install_drbd_ok(body))

            } else {
                dispatch(install_drbd_error(body))
                
            }
            
        })

    }
}

export function install_drbd_error(reason) {
    return {
        type: INSTALL_DRBD_ERROR,
        reason: reason
    }
}
export function install_drbd_ok(install) {
    return {
        type: INSTALL_DRBD_OK,
        install
        
    }
}


// initialize
export function echo_initialize_modal(id){
    return{
        type:ECHO_INITIALIZE_MODAL,
        id
    }
}

export function close_initialize_modal(params){
    return{
        type:CLOSE_INITIALIZE_MODAL,
        params
    }
    
}
export function fetch_initialize(mirror){
    console.log(mirror)
    return function(dispatch){
        const params={'baseURI':restapi,'path':mirrorspath,'username':username,'password':password}
        dispatch(request_initialize(params))

        let api = new API({
            baseURI: params.baseURI
        });
        console.log(params.path + '/'+ mirror.hash + '/primaryagent')
        api.auth([params.username,params.password]);
        api.get(params.path + '/'+ mirror.hash + '/primaryagent' , { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(err,res)
            if (err) {
                dispatch(receive_initialize_error(params))
                return false
            }
            dispatch(close_initialize_modal())
            dispatch(receive_initialize(body.results))
        })
    }
}

export function receive_initialize_error(params={}) {
    return {
        type: RECEIVE_INITIALIZE_ERROR,
        params
    }
}
export function receive_initialize(mirrorsjson) {
    return {
        type: RECEIVE_INITIALIZE_OK,
        items:mirrorsjson
        
    }
}
export function request_initialize(params){
    return{
        type:REQUEST_INITIALIZE,
        params
    }
}


// sync

export function echo_sync_modal(id){
    return{
        type:ECHO_SYNC_MODAL,
        id
    }
}

export function close_sync_modal(params){
    return{
        type:CLOSE_SYNC_MODAL,
        params
    }
    
}
export function fetch_sync(mirror){

    return function(dispatch){
        const params={'baseURI':restapi,'path':mirrorspath,'username':username,'password':password}
        dispatch(request_sync(params))

        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.username,params.password]);
        api.get(params.path + '/' + mirror.sync_id + '/' + 'sync2' + mirror.value , { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_sync_error(params))
                return false
            }
            dispatch(close_sync_modal())
            dispatch(receive_sync(body.results))
        })
    }
}

export function receive_sync_error(params={}) {
    return {
        type: RECEIVE_SYNC_ERROR,
        params
    }
}
export function receive_sync(mirrorsjson) {
    return {
        type: RECEIVE_SYNC_OK,
        items:mirrorsjson
        
    }
}
export function request_sync(params){
    return{
        type:REQUEST_SYNC,
        params
    }
}


//uninstall

export function echo_uninstall_modal(id){
    return{
        type:ECHO_UNINSTALL_MODAL,
        id
    }
}

export function close_uninstall_modal(params){
    return{
        type:CLOSE_UNINSTALL_MODAL,
        params
    }
    
}
export function fetch_uninstall(mirror){

    return function(dispatch){
        const params={'baseURI':restapi,'path':mirrorspath,'username':username,'password':password}
        dispatch(request_uninstall(params))

        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.username,params.password]);
        api.get(params.path + '/' + mirror.uninstall_id + '/' + 'uninstall' , { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_uninstall_error(params))
                return false
            }
            dispatch(close_uninstall_modal())
            dispatch(receive_uninstall(body.results))
        })
    }
}

export function receive_uninstall_error(params={}) {
    return {
        type: RECEIVE_UNINSTALL_ERROR,
        params
    }
}
export function receive_uninstall(mirrorsjson) {
    return {
        type: RECEIVE_UNINSTALL_OK,
        items:mirrorsjson
        
    }
}
export function request_uninstall(params){
    return{
        type:REQUEST_UNINSTALL,
        params
    }
} 




//syncstatus
export function echo_opensyncstatus_modal(){
    return{
        type:ECHO_OPENSYNCSTATUS_MODAL,
        
    }
}

export function close_opensyncstatus_modal(params){
    return{
        type:CLOSE_OPENSYNCSTATUS_MODAL,
        params
    }
    
}

export function echo_syncstatus_modal(mirror,agentid,agentname){
    return{
        type:ECHO_SYNCSTATUS_MODAL,
        mirro:mirror,
        agenti:agentid,
        agentnam:agentname,
        
    }
}

export function close_syncstatus_modal(params){
    return{
        type:CLOSE_SYNCSTATUS_MODAL,
        params
    }
    
}
export function fetch_syncstatus(mirror){
    console.log(mirror)
    const date = new Date()
    const time = date.getTime()
    return function(dispatch){
        const params={'baseURI':restapi,'path':mirrorspath,'username':username,'password':password}
        dispatch(request_syncstatus(params))

        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.username,params.password]);
        api.get(params.path + '/' + mirror.id + '/' + 'getsyncstatus'+'?id='+mirror.agentid+'limit='+time , { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_syncstatus_error(params))
                return false
            }
            dispatch(receive_syncstatus(body))
        })
    }
}

export function receive_syncstatus_error(params={}) {
    return {
        type: RECEIVE_SYNCSTATUS_ERROR,
        params
    }
}
export function receive_syncstatus(mirrorsjson) {
    return {
        type: RECEIVE_SYNCSTATUS_OK,
        sync:mirrorsjson,

    }
}
export function request_syncstatus(params){
    return{
        type:REQUEST_SYNCSTATUS,
        params
    }
} 

//installagent

export function echo_installagent_modal(id,agentid,agentname){
    return{
        type:ECHO_INSTALLAGENT_MODAL,
        id:id,
        agentid:agentid,
        agentnam:agentname,


    }
}

export function close_installagent_modal(params){
    return{
        type:CLOSE_INSTALLAGENT_MODAL,
        params
    }
    
}
export function fetch_installagent(mirror){
    // console.log(mirror)
    return function(dispatch){
        const params={'baseURI':restapi,'path':mirrorspath,'username':username,'password':password}
        dispatch(request_installagent(params))

        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.username,params.password]);
        api.get(params.path + '/' + mirror.installagent_id + '/' + 'installagent'+ '?id='+mirror.agentid +'&afcmd='+ mirror.afcmd +'&bfcmd='+mirror.bfcmd , { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_installagent_error(params))
                return false
                dispatch(add_operation({
                        content:'agent安装drbd:'+err,
                        result:'failed'
                    }))
            }
            dispatch(close_installagent_modal())
            dispatch(receive_installagent(body.results))
            dispatch(add_operation({
                        content:'agent安装drbd:'+body.results,
                        result:'success'
                    }))
        })
    }
}

export function receive_installagent_error(params={}) {
    return {
        type: RECEIVE_INSTALLAGENT_ERROR,
        params
    }
}
export function receive_installagent(mirrorsjson) {
    return {
        type: RECEIVE_INSTALLAGENT_OK,
        items:mirrorsjson
    }
}
export function request_installagent(params){
    return{
        type:REQUEST_INSTALLAGENT,
        params
    }
}

//CLONE

export function delete_agent_clone(selectedClone,auth){
    return function(dispatch){
        selectedClone.forEach(function(element){
            let api = new API({
                baseURI : element.url
            });
            api.auth([auth.username,auth.password]);
            api.del('',{credentials:'include',mode:'cors',headers:{'Accept':'application/json'}},(err,res,body)=>{
                if (200<=res.status&&res.status<300){
                    dispatch(delete_agent_clone_ok(element))
                    dispatch(add_operation({
                        content:'删除硬盘:'+selectedClone[0].name,
                        result:'success'
                    }))
                    message.success('操作成功')
                }else{
                    dispatch(delete_agent_clone_error(element))
                    dispatch(add_operation({
                        content:'删除硬盘:'+selectedClone[0].name,
                        result:'failed'
                    }))
                    message.error('操作失败');
                }

            })
        },auth);
    }
}
export function delete_agent_clone_error(clone){
    return{
        type:DELETE_AGENT_CLONE_ERROR,
        clone
    }
}
export function delete_agent_clone_ok(clone){
    return{
        type:DELETE_AGENT_CLONE_OK,
        clone
    }
}
export function toggle_agent_clone(selectRowKeys,selectedRows){
    return{
        type:TOGGLE_AGENT_CLONE,
        selectedClone:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }

}

export function fetch_agent_clone(conditions={searchKey:''}){
    console.log(conditions.searchKey)
    const arr=[];
    const childrent=[];
    const childreno=[];
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_agent_clone(params))
        let api = new API({
            baseURI: params.baseURI
        });

        api.auth([params.username,params.password]);
        api.get(params.path +'?ordering=-id'+'&limit=999'+'&search='+ conditions.searchKey, { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if(res.status==200){
                if(body.results!=undefined){
                    // console.log(body.results)
                    for(let i=0;i<body.results.length;i++){
                        arr.push(body.results[i].id+':stop')
                        if(body.results[i].task!=null){
                            dispatch(fetch_agent_clone_status(body.results[i].task))
                        }
                        
                    } 
                    dispatch(receive_agent_clone(body.results,arr))

                }/*else{
                    for(let i=0;i<body.length;i++){
                        arr.push(body[i].id+':stop')
                        if(body[i].task!=null){
                            dispatch(fetch_agent_clone_status(body[i].task))
                        }
                        
                    } 
                    dispatch(receive_agent_clone(body,arr))
                }*/
            }else{
                dispatch(receive_agent_clone_error(params))
                return false
            }
        })
    }
}
export function request_agent_clone(params){
    return{
        type:REQUEST_AGENT_CLONE,
        params
    }
}
export function receive_agent_clone(clonejson,arr){
    return{
        type:RECEIVE_AGENT_CLONE,
        items:clonejson,
        advanceOnoff:arr
    }
}
export function receive_agent_clone_error(params={}){
    return{
        type:RECEIVE_AGENT_CLONE_ERROR,
        params
    }
}
export function create_agent_clone(clone, auth) {
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/clones', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  "name":clone.clone_source_agentvolumename,
                                    "source":{
                                            "agentDevpath":clone.clone_source_agentdepath,
                                            "agentDevsize":clone.clone_source_agentdevsize,
                                            "agentaddress":clone.clone_source_agentaddress,
                                            "agentid":clone.clone_source_agentid,
                                            "port":clone.clone_source_agentport
                                            },
                                    "dest":{
                                            "volume_id":clone.clone_dest_volumeid,
                                            "localaddress":clone.clone_dest_localaddress,
                                            "port":clone.clone_dest_localport
                                            }

                                })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_agent_clone_error(body))
                dispatch(add_operation({
                    content:'添加硬盘:'+clone.clone_source_agentvolumename +':'+ clone.clone_source_agentid,
                    result:'failed'
                }))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 201) {
                    dispatch(close_create_agent_clone_modal())
                    dispatch(create_agent_clone_ok(body))
                    dispatch(add_operation({
                        content:'添加硬盘:'+clone.clone_source_agentvolumename+':'+clone.clone_source_agentid,
                        result:'success'
                    }))
                    message.success('操作成功')
                } else {
                    dispatch(create_agent_clone_error(body))
                    dispatch(add_operation({
                        content:'添加硬盘:'+clone.clone_source_agentvolumename+':'+clone.clone_source_agentid,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_agent_clone_error(reason) {
    return {
        type: CREATE_AGENT_CLONE_ERROR,
        reason: reason
    }
}
export function create_agent_clone_ok(clone) {
    return {
        type: CREATE_AGENT_CLONE_OK,
        clone
    }
}
export function echo_create_agent_clone_modal(id){
    return{
        type:ECHO_CREATE_AGENT_CLONE_MODAL,
        id
    }
}

export function close_create_agent_clone_modal(params){
    return{
        type:CLOSE_CREATE_AGENT_CLONE_MODAL,
        params
    }
}
//MODIFY AGENT CLONE
export function modify_agent_clone(clone, auth) {
    console.log(clone)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.put('/clones/'+clone.id, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  "name":clone.clone_source_agentvolumename,
                                    "source":{
                                            "agentDevpath":clone.clone_source_agentdepath,
                                            "agentDevsize":clone.clone_source_agentdevsize,
                                            "agentaddress":clone.clone_source_agentaddress,
                                            "agentid":clone.clone_source_agentid,
                                            "port":clone.clone_source_agentport
                                            },
                                    "dest":{
                                            "volume_id":clone.clone_dest_volumeid,
                                            "localaddress":clone.clone_dest_localaddress,
                                            "port":clone.clone_dest_localport
                                            }

                                })
        }, (err, res, body) => {
            // console.log(err,res,body)
            if (res.status == 200) {
                dispatch(close_modify_agent_clone())
                dispatch(create_modify_agent_clone_ok(body))
                dispatch(add_operation({
                    content:'修改硬盘:'+clone.clone_source_agentvolumename+':'+clone.clone_source_agentid,
                    result:'success'
                }))
                message.success('操作成功')
            } else {
                dispatch(create_modify_agent_clone_error(body))
                dispatch(add_operation({
                    content:'修改硬盘:'+clone.clone_source_agentvolumename+':'+body.detail,
                    result:'failed'
                }))
                message.error('操作失败')
            }
            
        })

    }
}

export function create_modify_agent_clone_ok (body) {
    return{
        type:CREATE_MODIFY_AGENT_CLONE_OK,
        modifyAgent:body
    }
}
export function create_modify_agent_clone_error(body){
    return{
        type:CREATE_MODIFY_AGENT_CLONE_ERROR,
        body
    }
}
export function echo_modify_agent_clone () {
    return{
        type:ECHO_MODIFY_AGENT_CLONE,
    }
}
export function close_modify_agent_clone(){
    return{
        type:CLOSE_MODIFY_AGENT_CLONE,
    }
}








// agent->local
export function echo_create_agent_local_modal(id){
    return{
        type:ECHO_CREATE_AGENT_LOCAL_MODAL,
        id
    }
}

export function close_create_agent_local_modal(params){
    return{
        type:CLOSE_CREATE_AGENT_LOCAL_MODAL,
        params
    }
    
}
export function create_agent_local(clone, auth) {
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/clones/'+clone.id+'/sync2local', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                    'bs':parseInt(clone.bs),
                                    'offset':clone.offset,
                                    'clonetype':clone.copysize,
                                })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_agent_local_error(body))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 200) {
                    // console.log(body)
                    dispatch(close_create_agent_local_modal())
                    dispatch(create_agent_local_ok(body))
                    message.success('操作成功')
                    // dispatch(fetch_agent_clone())
                } else {
                    dispatch(create_agent_local_error(body))
                    dispatch(add_operation({
                        content:'添加硬盘:',
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_agent_local_error(params={}) {
    return {
        type: CREATE_AGENT_LOCAL_ERROR,
        params
    }
}
export function create_agent_local_ok(agentlocal) {
    return {
        type: CREATE_AGENT_LOCAL_OK,
        items:agentlocal
    }
}

// local->agent
export function echo_create_local_agent_modal(id){
    return{
        type:ECHO_CREATE_LOCAL_AGENT_MODAL,
        id
    }
}

export function close_create_local_agent_modal(params){
    return{
        type:CLOSE_CREATE_LOCAL_AGENT_MODAL,
        params
    }
    
}
export function create_local_agent(clone, auth) {
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/clones/'+clone.id+'/sync2agent', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                    'bs':parseInt(clone.bs),
                                    'offset':clone.offset,
                                    'clonetype':clone.copysize,
                                })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_local_agent_error(body))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(close_create_local_agent_modal())
                    dispatch(create_local_agent_ok(body))
                    message.success('操作成功')
                } else {
                    dispatch(create_local_agent_error(body))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_local_agent_error(params={}) {
    return {
        type: CREATE_LOCAL_AGENT_ERROR,
        params
    }
}
export function create_local_agent_ok(localagent) {
    return {
        type: CREATE_LOCAL_AGENT_OK,
        items:localagent
    }
}


//fetch status

export function fetch_agent_clone_status(url){
    // console.log(url)
    const params={'baseURI':restapi,'path':clonepath,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_agent_clone_status(params))
        let api = new API({
            baseURI:url
        });
        api.auth([params.username,params.password]);
        api.get('', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_agent_clone_status_error(params))
                return false
            }
            dispatch(receive_agent_clone_status(body))
        })
    }
}


export function request_agent_clone_status(params){
    return{
        type:REQUEST_AGENT_CLONE_STATUS,
        params
    }
}
export function receive_agent_clone_status(status){
    return{
        type:RECEIVE_AGENT_CLONE_STATUS,
        items:status
    }
}
export function receive_agent_clone_status_error(params={}){
    return{
        type:RECEIVE_AGENT_CLONE_STATUS_ERROR,
        params
    }
}
export function echo_agent_clone_download(){
    return{
        type:ECHO_AGENT_CLONE_DOWNLOAD
    }
}
export function close_agent_clone_download(){
    return{
        type:CLOSE_AGENT_CLONE_DOWNLOAD
    }
}

//set status
export function setagent_status(set,auth) {
    console.log(set)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/mirrors/'+set.id+'/'+set.value , {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                    'id':set.agentid,
                                    'bfcmd':set.bfcmd=='true'?true:false,
                                    'afcmd':set.afcmd=='true'?true:false,
                                })
        }, (err, res, body) => {
            console.log(res)
            if (res.status == 200) {
                dispatch(close_setagent_modal())
                dispatch(create_setagent_status(body))
                message.success('操作成功')
            } else {
                dispatch(create_setagent_status_error(body))
                message.error('操作失败')
            }
            
        })

    }
}

export function create_setagent_status(status){
    return{
        type:CREATE_SETAGENT_STATUS,
        agentstatus:status
    }
}
export function create_setagent_status_error(params={}){
    return{
        type:CREATE_SETAGENT_STATUS_ERROR,
        params
    }
}
export function echo_setagent_modal(id,agentid,agentname){
    return{
        type:ECHO_SETAGENT_MODAL,
        id:id,
        agentid:agentid,
        agentnam:agentname,
    }
}
export function close_setagent_modal(){
    return{
        type:CLOSE_SETAGENT_MODAL
    }
}
//agent up or down
export function agent_upordown(set,auth) {
    console.log(set)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/mirrors/'+set.id+'/'+set.value, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                    'id':set.agentid,
                                    'bfcmd':set.bfcmd=='true'?true:false,
                                    'afcmd':set.afcmd=='true'?true:false,
                                })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_agent_upordown_error(body))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(close_agent_upordown_modal())
                    dispatch(create_agent_upordown(body))
                    message.success('操作成功')
                } else {
                    dispatch(create_agent_upordown_error(body))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_agent_upordown(status){
    return{
        type:CREATE_AGENT_UPORDOWN,
        agentstatus:status
    }
}
export function create_agent_upordown_error(params={}){
    return{
        type:CREATE_AGENT_UPORDOWN_ERROR,
        params
    }
}
export function echo_agent_upordown_modal(id,agentid,agentname){
    return{
        type:ECHO_AGENT_UPORDOWN_MODAL,
        id:id,
        agentid:agentid,
        agentnam:agentname,
    }
}
export function close_agent_upordown_modal(){
    return{
        type:CLOSE_AGENT_UPORDOWN_MODAL
    }
}
//stop agent
export function agent_pausesync(set,auth) {
    console.log(set)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/mirrors/'+set.id+'/pausesync', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                    'id':set.agentid,
                                })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_agent_pausesync_error(body))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(close_agent_pausesync_modal())
                    dispatch(create_agent_pausesync(body))
                    message.success('操作成功')
                } else {
                    dispatch(create_agent_pausesync_error(body))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_agent_pausesync(status){
    return{
        type:CREATE_AGENT_PAUSESYNC,
        agentstatus:status
    }
}
export function create_agent_pausesync_error(params={}){
    return{
        type:CREATE_AGENT_PAUSESYNC_ERROR,
        params
    }
}
export function echo_agent_pausesync_modal(id,agentid,agentname){
    return{
        type:ECHO_AGENT_PAUSESYNC_MODAL,
        id:id,
        agentid:agentid,
        agentnam:agentname,
    }
}
export function close_agent_pausesync_modal(){
    return{
        type:CLOSE_AGENT_PAUSESYNC_MODAL
    }
}
//begin agent
export function agent_resumesync(set,auth) {
    console.log(set)
    return function (dispatch) {
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/mirrors/'+set.id+'/resumesync', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({  
                                    'id':set.agentid,
                                })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_agent_resumesync_error(body))
                message.error('操作失败')
                return false;

            } else {
                if (res.status == 200) {
                    dispatch(close_agent_resumesync_modal())
                    dispatch(create_agent_resumesync(body))
                    message.success('操作成功')
                } else {
                    dispatch(create_agent_resumesync_error(body))
                    message.error('操作失败')
                }
            }
        })

    }
}

export function create_agent_resumesync(status){
    return{
        type:CREATE_AGENT_RESUMESYNC,
        agentstatus:status
    }
}
export function create_agent_resumesync_error(params={}){
    return{
        type:CREATE_AGENT_RESUMESYNC_ERROR,
        params
    }
}
export function echo_agent_resumesync_modal(id,agentid,agentname){
    return{
        type:ECHO_AGENT_RESUMESYNC_MODAL,
        id:id,
        agentid:agentid,
        agentnam:agentname,
    }
}
export function close_agent_resumesync_modal(){
    return{
        type:CLOSE_AGENT_RESUMESYNC_MODAL
    }
}
//get agent role 
export function agent_getagentrole(id,agentid,auth) {
    console.log(id,agentid)
    return function (dispatch) {
        dispatch(request_agent_getagentrole())
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.get('/mirrors/'+id+'/getagentrole'+'?id='+ agentid, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            
        }, (err, res, body) => {
            if (err) {
                dispatch(receive_agent_getagentrole_error(body))
                return false;

            } else {
                dispatch(receive_agent_getagentrole(body))
                dispatch(close_agent_getagentrole_modal())
                dispatch(echo_agent_openrole())
            }
        })

    }
}

export function request_agent_getagentrole(){
    return{
        type:REQUEST_AGENT_GETAGENTROLE,
    }
}
export function receive_agent_getagentrole(status){
    return{
        type:RECEIVE_AGENT_GETAGENTROLE,
        getagentrole:status,
    }
}
export function receive_agent_getagentrole_error(params={}){
    return{
        type:RECEIVE_AGENT_GETAGENTROLE_ERROR,
        params
    }
}
export function echo_agent_getagentrole_modal(id,agentid,agentname){
    return{
        type:ECHO_AGENT_GETAGENTROLE_MODAL,
        id:id,
        agentid:agentid,
        agentnam:agentname,
    }
}
export function close_agent_getagentrole_modal(){
    return{
        type:CLOSE_AGENT_GETAGENTROLE_MODAL
    }
}
export function echo_agent_localoragent_modal(){
    return{
        type:ECHO_AGENT_LOCALORAGENT_MODAL,
    }
}
export function close_agent_localoragent_modal(){
    return{
        type:CLOSE_AGENT_LOCALORAGENT_MODAL
    }
}
export function echo_agent_agentorlocal_modal(){
    return{
        type:ECHO_AGENT_AGENTORLOCAL_MODAL,
    }
}
export function close_agent_agentorlocal_modal(){
    return{
        type:CLOSE_AGENT_AGENTORLOCAL_MODAL
    }
}
export function echo_agent_openrole(){
    return{
        type:ECHO_AGENT_OPENROLE,
    }
}
export function close_agent_openrole(){
    return{
        type:CLOSE_AGENT_OPENROLE,
    }
}
export function agent_getagentrole_behind(id,agentid) {
    // console.log(restapi+'/mirrors/'+id+'/getagentrole'+'?id='+ agentid)
    const params={'baseURI':restapi,'username':username,'password':password}

    return function (dispatch) {
        dispatch(request_agent_getagentrole_behind())
        let api = new API({
            baseURI:restapi
        });
        api.auth([params.username, params.password]);
        api.get('/mirrors/'+id+'/getagentrole'+'?id='+ agentid, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            
        }, (err, res, body) => {
            if (err) {
                dispatch(receive_agent_getagentrole_behind_error(body))
                return false;

            } else {
                dispatch(receive_agent_getagentrole_behind(body,id))
            }
        })

    }
}

export function request_agent_getagentrole_behind(){
    return{
        type:REQUEST_AGENT_GETAGENTROLE_BEHIND,
    }
}
export function receive_agent_getagentrole_behind(status,id){
    return{
        type:RECEIVE_AGENT_GETAGENTROLE_BEHIND,
        role:status+'$'+id,
    }
}
export function receive_agent_getagentrole_behind_error(params={}){
    return{
        type:RECEIVE_AGENT_GETAGENTROLE_BEHIND_ERROR,
        params
    }
}

//modify mirror agent

export function create_modify_mirror_agent(agent,auth){

    const params={'baseURI':restapi,'username':username,'password':password}
    return function (dispatch) {
        let api = new API({
            baseURI: agent.url
        });
        api.auth([params.username, params.password]);
        api.put('', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({
                'primarybf_cmd':agent.primarybf_cmd,
                'primaryaf_cmd':agent.primaryaf_cmd,
                'secondarybf_cmd':agent.secondarybf_cmd,
                'secondaryaf_cmd':agent.secondaryaf_cmd,
                'upbf_cmd':agent.upbf_cmd,
                'upaf_cmd':agent.upaf_cmd,
                'downbf_cmd':agent.downbf_cmd,
                'downaf_cmd':agent.downaf_cmd,
                'port':agent.port,
                'agent':agent.agent,
                'metadisk':agent.metadisk,
                'agentaddress':agent.agentaddress,
                'agentDrbdminor':agent.agentDrbdminor,
                'agentDevpath':agent.agentDevpath,
                'agentvolumename':agent.agentvolumename,
                'url':agent.url,
                'id':agent.id,


            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_mirror_modify_agent_err(body))
                dispatch(add_operation({
                    content:'修改agent:'+agent.agentvolumename,
                    result:'failed'
                }))
                message.error('操作失败')
                return false;
            } else {
                dispatch(close_modify_mirror_agent_modal())
                dispatch(create_mirror_modify_agent_ok(body))
                dispatch(fetch_mirrors())
                dispatch(add_operation({
                    content:'修改agent:'+agent.agentvolumename,
                    result:'success'
                }))
                message.success('操作成功')
                
                
            }
        })

    }
}
export function echo_modify_mirror_agent_modal(id){
    return{
        type:ECHO_MODIFY_MIRROR_AGENT_MODAL,
        id
    }
}
export function close_modify_mirror_agent_modal(){
    return{
        type:CLOSE_MODIFY_MIRROR_AGENT_MODAL,
    }
}
export function create_mirror_modify_agent_err(err){
    return{
        type:CREATE_MIRROR_MODIFY_AGENT_ERR,
        err
    }
}
export function create_mirror_modify_agent_ok(body){
    return{
        type:CREATE_MIRROR_MODIFY_AGENT_OK,
        body
    }
}

//select agent url
export function echo_select_agent_url(id){
    return{
        type:ECHO_SELECT_AGENT_URL,
        id

    }
}
export function close_select_agent_url(){
    return{
        type:CLOSE_SELECT_AGENT_URL,
    }
}
export function submit_select_agent_url(url){
    return{
        type:SUBMIT_SELECT_AGENT_URL,
        url
    }
}

//获取到agent的drbdstatus
export function get_agent_drbdstatus(id,agentid,auth) {
    const params={'baseURI':restapi,'username':username,'password':password}
    return function (dispatch) {
        dispatch(request_get_agent_drbdstatus())
        let api = new API({
            baseURI:restapi
        });
        api.auth([params.username, params.password]);
        api.get('/mirrors/'+id+'/drbdstatus'+'?id='+agentid, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            
        }, (err, res, body) => {
            if (err) {
                // console.log(agentid)
                dispatch(receive_get_agent_drbdstatus_error(body))
                return false;
            } else {
                dispatch(receive_get_agent_drbdstatus(body,id))
            }
        })
    }
}

export function request_get_agent_drbdstatus(){
    return{
        type:REQUEST_GET_AGENT_DRBDSTATUS,
    }
}
export function receive_get_agent_drbdstatus(status,agenti){
    return{
        type:RECEIVE_GET_AGENT_DRBDSTATUS,
        drbdstatus:status,
        agentid:agenti,

    }
}
export function receive_get_agent_drbdstatus_error(params={}){
    return{
        type:RECEIVE_GET_AGENT_DRBDSTATUS_ERROR,
        params
    }
}

