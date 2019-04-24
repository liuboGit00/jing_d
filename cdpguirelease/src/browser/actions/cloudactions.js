import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,cloudspath,volumespath} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'

export const REQUEST_CLOUDS = 'REQUEST_CLOUDS'
export const RECEIVE_CLOUDS = 'RECEIVE_CLOUDS'
export const RECEIVE_CLOUDS_ERROR = 'RECEIVE_CLOUDS_ERROR'
export const REQUEST_CLONES = 'REQUEST_CLONES'
export const RECEIVE_CLONES = 'RECEIVE_CLONES'
export const RECEIVE_CLONES_ERROR = 'RECEIVE_CLONES_ERROR'
export const ECHO_CREATE_CONNECTION_MODAL = 'ECHO_CREATE_CONNECTION_MODAL'
export const CLOSE_CREATE_CONNECTION_MODAL = 'CLOSE_CREATE_CONNECTION_MODAL'
export const ECHO_CREATE_VPC_MODAL = 'ECHO_CREATE_VPC_MODAL'
export const CLOSE_CREATE_VPC_MODAL = 'CLOSE_CREATE_VPC_MODAL'
export const CREATE_CONNECTION_OK = 'CREATE_CONNECTION_OK'
export const CREATE_CONNECTION_ERROR = 'CREATE_CONNECTION_ERROR'
export const CREATE_VPC_OK = 'CREATE_VPC_OK'
export const CREATE_VPC_ERROR = 'CREATE_VPC_ERROR'
export const TOGGLE_CLOUDS = 'TOGGLE_CLOUDS'
export const DELETE_CLOUD_ERROR = 'DELETE_CLOUD_ERROR'
export const DELETE_CLOUD_OK = 'DELETE_CLOUD_OK'
export const SELECT_ALL_VOLUME_STATE = 'SELECT_ALL_VOLUME_STATE'


// vpc
export const SET_VPC_SWITCH_ON = 'SET_VPC_SWITCH_ON'
export const SET_VPC_SWITCH_OFF = 'SET_VPC_SWITCH_OFF'
export const REQUEST_CLOUD_HOST = 'REQUEST_CLOUD_HOST'
export const RECEIVE_CLOUD_HOST_OK = 'RECEIVE_CLOUD_HOST_OK'
export const RECEIVE_CLOUD_HOST_ERR = 'RECEIVE_CLOUD_HOST_ERR'
export const REGISTER_CLOUD_AGENT_OK = 'REGISTER_CLOUD_AGENT_OK'
export const REGISTER_CLOUD_AGENT_ERR = 'REGISTER_CLOUD_AGENT_ERR'
export const ECHO_REGISTER_CLOUD_AGENT = 'ECHO_REGISTER_CLOUD_AGENT'
export const CLOSE_REGISTER_CLOUD_AGENT = 'CLOSE_REGISTER_CLOUD_AGENT'
export const TOGGLE_CLOUDS_HOST = 'TOGGLE_CLOUDS_HOST'
export const REQUEST_ADD_CLOUD_HOST_ISCSITGT = 'REQUEST_ADD_CLOUD_HOST_ISCSITGT'
export const ADD_CLOUD_HOST_ISCSITGT_OK = 'ADD_CLOUD_HOST_ISCSITGT_OK'
export const ADD_CLOUD_HOST_ISCSITGT_ERR = 'ADD_CLOUD_HOST_ISCSITGT_ERR'
export const REQUEST_DELETE_CLOUD_HOST_ISCSITGT ='REQUEST_DELETE_CLOUD_HOST_ISCSITGT'
export const DELETE_CLOUD_HOST_ISCSITGT_OK = 'DELETE_CLOUD_HOST_ISCSITGT_OK'
export const DELETE_CLOUD_HOST_ISCSITGT_ERR = 'DELETE_CLOUD_HOST_ISCSITGT_ERR'
export const REMOTE_CLOUD_HOST_ISCSITGT_ERR = 'REMOTE_CLOUD_HOST_ISCSITGT_ERR'
export const REMOTE_CLOUD_HOST_ISCSITGT_OK = 'REMOTE_CLOUD_HOST_ISCSITGT_OK'
export const TOGGLE_CLOUDS_HOST_ISCSITGT = 'TOGGLE_CLOUDS_HOST_ISCSITGT'
export const SCAN_CLOUD_HOST_LUN_OK = 'SCAN_CLOUD_HOST_LUN_OK'
export const SCAN_CLOUD_HOST_LUN_ERR = 'SCAN_CLOUD_HOST_LUN_ERR'
export const REQUEST_CLOUD_HOST_LUNS = 'REQUEST_CLOUD_HOST_LUNS'
export const RECEIVE_CLOUD_HOST_LUNS_OK = 'RECEIVE_CLOUD_HOST_LUNS_OK'
export const RECEIVE_CLOUD_HOST_LUNS_ERR = 'RECEIVE_CLOUD_HOST_LUNS_ERR'
export const CREATE_CLOUD_NEWVM_OK = 'CREATE_CLOUD_NEWVM_OK'
export const CREATE_CLOUD_NEWVM_ERR = 'CREATE_CLOUD_NEWVM_ERR'
export const ECHO_CREATE_CLOUD_NEWVM  = 'ECHO_CREATE_CLOUD_NEWVM'
export const CLOSE_CREATE_CLOUD_NEWVM = 'CLOSE_CREATE_CLOUD_NEWVM'
export const REQUEST_CLOUD_HOST_HBA = 'REQUEST_CLOUD_HOST_HBA'
export const RECEIVE_CLOUD_HOST_HBA_OK = 'RECEIVE_CLOUD_HOST_HBA_OK'
export const RECEIVE_CLOUD_HOST_HBA_ERR = 'RECEIVE_CLOUD_HOST_HBA_ERR'
export const ECHO_CLOUD_HOST_ISCSITGT = 'ECHO_CLOUD_HOST_ISCSITGT'
export const CLOSE_CLOUD_HOST_ISCSITGT = 'CLOSE_CLOUD_HOST_ISCSITGT'
export const REQUEST_CLOUD_DATACENTER = 'REQUEST_CLOUD_DATACENTER'
export const RECEIVE_CLOUD_DATACENTER_OK = 'RECEIVE_CLOUD_DATACENTER_OK'
export const RECEIVE_CLOUD_DATACENTER_ERR = 'RECEIVE_CLOUD_DATACENTER_ERR'
export const REQUEST_CLOUD_DATASTORE = 'REQUEST_CLOUD_DATASTORE'
export const RECEIVE_CLOUD_DATASTORE_OK = 'RECEIVE_CLOUD_DATASTORE_OK'
export const RECEIVE_CLOUD_DATASTORE_ERR = 'RECEIVE_CLOUD_DATASTORE_ERR'
export const REQUEST_CLOUD_NETWORK = 'REQUEST_CLOUD_NETWORK'
export const RECEIVE_CLOUD_NETWORK_OK = 'RECEIVE_CLOUD_NETWORK_OK'
export const RECEIVE_CLOUD_NETWORK_ERR = 'RECEIVE_CLOUD_NETWORK_ERR'
export const REQUEST_CLOUD_RESOURCEPOOL = 'REQUEST_CLOUD_RESOURCEPOOL'
export const RECEIVE_CLOUD_RESOURCEPOOL_OK = 'RECEIVE_CLOUD_RESOURCEPOOL_OK'
export const RECEIVE_CLOUD_RESOURCEPOOL_ERR = 'RECEIVE_CLOUD_RESOURCEPOOL_ERR'


// VPC START

export function scan_cloud_host_lun_err(err){
    return{
        type:SCAN_CLOUD_HOST_LUN_ERR,
        err
    }
}
export function scan_cloud_host_lun_ok(body){
    return{
        type:SCAN_CLOUD_HOST_LUN_OK,
        body
    }
}
export function scan_cloud_host_lun(id,hostname,hba){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/rescan_hba'+'?hostname='+hostname+'&&hba='+hba,{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if(res.status==200){
                dispatch(scan_cloud_host_lun_ok(body))
                dispatch(add_operation({
                    content:'扫描客户端上的映射卷:'+hostname,
                    result:'success',
                }))
                message.success('扫描成功')  
            }else{
                dispatch(scan_cloud_host_lun_err(err))
                dispatch(add_operation({
                    content:'扫描客户端上的映射卷:'+hostname,
                    result:'failed',
                }))
                message.error('扫描失败')
                return false
            }
            

        })
    }
}
export function request_cloud_datacenter(){
    return{
        type:REQUEST_CLOUD_DATACENTER,
    }
}
export function receive_cloud_datacenter_ok(body){
    return{
        type:RECEIVE_CLOUD_DATACENTER_OK,
        clouddatacenter:body
    }
}
export function receive_cloud_datacenter_err(err){
    return{
        type:RECEIVE_CLOUD_DATACENTER_ERR,
        err
    }
}
export function fetch_cloud_datacenter(id){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_datacenter())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_datacenters',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_datacenter_err(err))
                return false
            }
            dispatch(receive_cloud_datacenter_ok(body))
        })
    }
}
export function request_cloud_datastore(){
    return{
        type:REQUEST_CLOUD_DATASTORE,
    }
}
export function receive_cloud_datastore_ok(body){
    return{
        type:RECEIVE_CLOUD_DATASTORE_OK,
        clouddatastore:body
    }
}
export function receive_cloud_datastore_err(err){
    return{
        type:RECEIVE_CLOUD_DATASTORE_ERR,
        err
    }
}
export function fetch_cloud_datastore(id){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_datastore())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_datastores',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_datastore_err(err))
                return false
            }
            dispatch(receive_cloud_datastore_ok(body))
        })
    }
}
export function request_cloud_network(){
    return{
        type:REQUEST_CLOUD_NETWORK,
    }
}
export function receive_cloud_network_ok(body){
    return{
        type:RECEIVE_CLOUD_NETWORK_OK,
        cloudnetwork:body
    }
}
export function receive_cloud_network_err(err){
    return{
        type:RECEIVE_CLOUD_NETWORK_ERR,
        err
    }
}
export function fetch_cloud_network(id){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_network())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_networks',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_network_err(err))
                return false
            }
            dispatch(receive_cloud_network_ok(body))
        })
    }
}
export function request_cloud_resourcepool(){
    return{
        type:REQUEST_CLOUD_RESOURCEPOOL,
    }
}
export function receive_cloud_resourcepool_ok(body){
    return{
        type:RECEIVE_CLOUD_RESOURCEPOOL_OK,
        cloudresourcepool:body
    }
}
export function receive_cloud_resourcepool_err(err){
    return{
        type:RECEIVE_CLOUD_RESOURCEPOOL_ERR,
        err
    }
}
export function fetch_cloud_resourcepool(id){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_resourcepool())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_resourcepools',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_resourcepool_err(err))
                return false
            }
            dispatch(receive_cloud_resourcepool_ok(body))
        })
    }
}
export function request_cloud_host_luns(){
    return {
        type:REQUEST_CLOUD_HOST_LUNS,
    }
}
export function receive_cloud_host_luns_ok(body){
    return {
        type: RECEIVE_CLOUD_HOST_LUNS_OK,
        hostluns:body,
    }
}
export function receive_cloud_host_luns_err(err){
    return {
        type:RECEIVE_CLOUD_HOST_LUNS_ERR,
        err,
    }
}
export function fetch_cloud_host_luns(id,name){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_host_luns())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_luns?'+'hostname='+name,{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_host_luns_err(err))
                return false
            }
            dispatch(receive_cloud_host_luns_ok(body))
        })
    }
}
export function request_cloud_host_hba(){
    return {
        type:REQUEST_CLOUD_HOST_HBA
    }
}
export function receive_cloud_host_hba_ok(body){
    return{
        type:RECEIVE_CLOUD_HOST_HBA_OK,
        hosthba:body,
    }
}
export function receive_cloud_host_hba_err(err){
    return{
        type:RECEIVE_CLOUD_HOST_HBA_ERR,
        err,
    }
}
export function fetch_cloud_host_hba(id){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_host_hba())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_hbas',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_host_hba_err(err))
                return false
            }
            dispatch(receive_cloud_host_hba_ok(body))
        })
    }

}

export function toggle_clouds_host_iscsitgt(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_CLOUDS_HOST_ISCSITGT,
        selectedCloudshostiscsitgt:[...selectedRows],
        selectedCloudiscsitgtRowKeys:[...selectRowKeys]
    }
}
export function echo_create_cloud_newvm(){
    return {
        type:ECHO_CREATE_CLOUD_NEWVM,
    }
}
export function close_create_cloud_newvm(){
    return{
        type:CLOSE_CREATE_CLOUD_NEWVM,
    }
}
export function create_cloud_newvm_ok(body){
    return{
        type:CREATE_CLOUD_NEWVM_OK,
        createnewvm:body,
    }
}
export function create_cloud_newvm_err(err){
    return{
        type:CREATE_CLOUD_NEWVM_ERR,
        err,
    }
}
export function create_cloud_newvm(newvm){
    console.log(newvm)
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        let api = new API({
            baseURI:params.baseURI,
        });
        api.post('/clouds/'+newvm.id+'/cloud_newvm',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({
                    'name':newvm.name,
                    'cpu':newvm.cpu,
                    'mem':newvm.mem,
                    'disks':newvm.devicename,
                    'bootide':newvm.bootide,
                    'networkname':newvm.networkname,
                    'host':newvm.host,
                    'resourcepool':newvm.resourcepool,
                    'datacenter':newvm.datacenter,
                    'datastore':newvm.datastore,
                })}, (err, res, body) => {
            if (err) {
                dispatch(create_cloud_newvm_ok(body))
                dispatch(add_operation({
                    content:'创建虚拟机:'+newvm.name,
                    result:'failed',
                }))
                message.error("操作失败");
                return false;
                
            }
            if(200<=res.status&&res.status<300){
                dispatch(close_create_vpc_modal())
                dispatch(create_cloud_newvm_ok(body))
                dispatch(add_operation({
                    content:'创建虚拟机:'+newvm.name,
                    result:'success',
                }))
                message.success("操作成功");
            }else{
                dispatch(create_cloud_newvm_ok(body))
                dispatch(add_operation({
                    content:'创建虚拟机:'+newvm.name,
                    result:'failed',
                }))
                message.error("操作失败")
            }
            
        })
    }
}
export function echo_cloud_host_iscsitgt(){
    return {
        type:ECHO_CLOUD_HOST_ISCSITGT,
    }
}
export function close_cloud_host_iscsitgt(){
    return{
        type:CLOSE_CLOUD_HOST_ISCSITGT,
    }
}
export function request_add_cloud_host_iscsitgt (){
    return{
        type:REQUEST_ADD_CLOUD_HOST_ISCSITGT,
    }
}
export function add_cloud_host_iscsitgt_ok(body){
    return{
        type:ADD_CLOUD_HOST_ISCSITGT_OK,
        hostiscsitgt:body
    }
}
export function add_cloud_host_iscsitgt_err(err){
    return{
        type:ADD_CLOUD_HOST_ISCSITGT_ERR,
        err
    }
}
export function add_cloud_host_iscsitgt(iscsi){
    console.log(iscsi)
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_add_cloud_host_iscsitgt())
        let api = new API({
            baseURI:params.baseURI,
        });
        api.post('/clouds/'+iscsi.id+'/add_iscsitgt',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({
                    'hostname':iscsi.hostname,
                    'hba':iscsi.hba,
                    'address':iscsi.address,
                })}, (err, res, body) => {
            if (err) {
                dispatch(add_cloud_host_iscsitgt_err(err))
                dispatch(add_operation({
                    content:'添加客户端iscsitgt:'+iscsi.hostname,
                    result:'failed',
                }))
                message.error("操作失败");
                return false;
                
            }
            console.log(body)
            if(200<=res.status&&res.status<300){
                dispatch(close_cloud_host_iscsitgt())
                dispatch(add_cloud_host_iscsitgt_ok(body))
                dispatch(add_operation({
                    content:'添加客户端iscsitgt:'+iscsi.hostname,
                    result:'success',
                }))
                dispatch(fetch_cloud_host_hba(iscsi.id))
                message.success("操作成功");
                dispatch(close_cloud_host_iscsitgt())
            }else{
                dispatch(add_cloud_host_iscsitgt_ok(body))
                dispatch(add_operation({
                    content:'添加客户端iscsitgt:'+iscsi.hostname,
                    result:'failed',
                }))
                dispatch(fetch_cloud_host_hba(iscsi.id))
                message.error("操作成功");
                dispatch(close_cloud_host_iscsitgt())
            }
            
        })
    }
}
export function request_delete_cloud_host_iscsitgt(){
    return {
        type:REQUEST_DELETE_CLOUD_HOST_ISCSITGT,
    }
}
export function delete_cloud_host_iscsitgt_ok(body){
    return {
        type:DELETE_CLOUD_HOST_ISCSITGT_OK,
        deleteiscsitgt:body,
    }
}
export function delete_cloud_host_iscsitgt_err(err){
    return {
        type :DELETE_CLOUD_HOST_ISCSITGT_ERR,
        err
    }
}
export function delete_cloud_host_iscsitgt(iscsi,id){

    console.log(iscsi,id)
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_delete_cloud_host_iscsitgt())
        let api = new API({
            baseURI:params.baseURI,
        });
        api.post('/clouds/'+id+'/remove_iscsitgt',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({
                    'hostname':iscsi.hostname,
                    'hba':iscsi.hba,
                    'address':iscsi.name,
                })}, (err, res, body) => {
            if (err) {
                dispatch(delete_cloud_host_iscsitgt_err(err))
                dispatch(add_operation({
                    content:'添加客户端iscsitgt:'+iscsi.hostname,
                    result:'failed',
                }))
                message.error("操作失败");
                return false;
                
            }
            // console.log(body)
            if(200<=res.status&&res.status<300){
                dispatch(delete_cloud_host_iscsitgt_ok(body))
                dispatch(add_operation({
                    content:'添加客户端iscsitgt:'+iscsi.hostname,
                    result:'success',
                }))
                dispatch(fetch_cloud_host_hba(id))
                message.success("操作成功");
            }else{
                dispatch(delete_cloud_host_iscsitgt_ok(body))
                dispatch(add_operation({
                    content:'添加客户端iscsitgt:'+iscsi.hostname,
                    result:'failed',
                }))
                dispatch(fetch_cloud_host_hba(id))
                message.error("操作成功");
            }
            
        })
    }
}
export function toggle_clouds_host(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_CLOUDS_HOST,
        selectedCloudshost:[...selectedRows],
        selectedCloudRowKeys:[...selectRowKeys]
    }
}
export function echo_register_cloud_agent(){
    return{
        type:ECHO_REGISTER_CLOUD_AGENT,
    }
}
export function close_register_cloud_agent(){
    return{
        type:CLOSE_REGISTER_CLOUD_AGENT,
    }

}
export function register_cloud_agent_ok(body){
    return{
        type:REGISTER_CLOUD_AGENT_OK,
        register_agent:body,
    }
}
export function register_cloud_agent_err(err){
    return{
        type:REGISTER_CLOUD_AGENT_ERR,
        err
    }
}
export function register_cloud_agent(name,id){
    // console.log(name,id)
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        let api = new API({
            baseURI:params.baseURI,
        });
        api.post('/clouds/'+id+'/registenode',{ credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({
                    'name':name,
                })}, (err, res, body) => {
            if (err) {
                dispatch(register_cloud_agent_err(body))
                dispatch(add_operation({
                    content:'注册虚拟机客户端:'+agent.name,
                    result:'failed',
                }))
                message.error("操作失败");
                return false;
            }
            if(200<=res.status&&res.status<300){
                dispatch(register_cloud_agent_ok(body))
                dispatch(add_operation({
                    content:'注册虚拟机客户端:'+agent.name,
                    result:'success',
                }))
                message.success("操作成功");
                dispatch(set_vpc_switch_off())
            }else{
                dispatch(register_cloud_agent_err(body))
                dispatch(add_operation({
                    content:'注册虚拟机客户端:'+agent.name,
                    result:'failed',
                }))
                message.error("操作失败")
            }
            
        })
    }
}
export function request_cloud_host(){
    return{
        type:REQUEST_CLOUD_HOST,
    }
}
export function receive_cloud_host_ok(body){
    return{
        type:RECEIVE_CLOUD_HOST_OK,
        list_host:body,
    }
}
export function receive_cloud_host_err(err){
    return{
        type:RECEIVE_CLOUD_HOST_ERR,
        err
    }
}

export function fetch_cloud_host(id){
    const params={'baseURI':restapi,'path':cloudspath,'auth':auth}
    return function(dispatch){
        dispatch(request_cloud_host())
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get('/clouds/'+id+'/list_hosts',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_cloud_host_err(err))
                return false
            }
            console.log(body)
            for(let i=0;i<body.length;i++){
                dispatch(fetch_cloud_host_luns(id,body[i]))
            }
            dispatch(receive_cloud_host_ok(body))
        })
    }
}
export function set_vpc_switch_on(content){
    return {
        type:SET_VPC_SWITCH_ON,
        content:content,
    }
}
export function set_vpc_switch_off(){
    return {
        type:SET_VPC_SWITCH_OFF
    }
}


//VPC END
export function fetch_clouds(params={'baseURI':restapi,'path':cloudspath,'auth':auth}){
    return function(dispatch){
        dispatch(request_clouds(params))

        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.auth.username,params.auth.password]);
        api.get(params.path+'?limit=999', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_clouds_error(params))
                return false
            }

            dispatch(receive_clouds(body.results))

        })
    }
}
export function request_clouds(params) {
    return {
        type:REQUEST_CLOUDS,
        params
        }
}
export function receive_clouds(cloudsjson) {
    return {
        type:RECEIVE_CLOUDS,
        items:cloudsjson,
    }    
}
export function receive_clouds_error(params={}) {
    return {
        type:RECEIVE_CLOUDS_ERROR,
        params
    }
}
export function fetch_clones(params={'baseURI':restapi,'path':volumespath,'auth':auth}) {
    return function (dispatch) {
        dispatch(request_clones(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.auth.username, params.auth.password]);
        api.get(params.path+'?clonefrom__isnull=false'+'&limit=999', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_clones_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_clones(body))
            }else{
                dispatch(receive_clones(body.results))
            }

        })

    }
}
export function request_clones(params) {
    return {
        type:REQUEST_CLONES,
        params
        }
}
export function receive_clones(clonesjson) {
    return {
        type:RECEIVE_CLONES,
        items:clonesjson,
    }    
}
export function receive_clones_error(params={}) {
    return {
        type:RECEIVE_CLONES_ERROR,
        params
    }
}
export function echo_create_connection_modal(params) {
    return {
        type:ECHO_CREATE_CONNECTION_MODAL,
        params
    }
}
export function close_create_connection_modal(params) {
    return {
        type:CLOSE_CREATE_CONNECTION_MODAL
    }    
}
export function echo_create_vpc_modal(params) {
    return {
        type:ECHO_CREATE_VPC_MODAL,
        params
    }
}
export function close_create_vpc_modal(params) {
    return {
        type:CLOSE_CREATE_VPC_MODAL
    }    
}
export function create_connection(connection,auth) {
    const obj=JSON.stringify({
        "user":connection.user,
        "password":connection.password,
        "protocol":connection.protocol,
        "port":connection.port,
        "url":connection.url
    })
    return function (dispatch) {
        let api = new API({
        baseURI: restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/clouds', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
            body:connection.cloudtype=='vmware'?JSON.stringify({
                "name":connection.name,
                "cloudtype":connection.cloudtype,
                "adminurl":connection.adminurl,
                "connection":"",
                "providerConf":obj
            }):JSON.stringify({
                'name':connection.name,
                'connection':connection.connection,
                'adminurl':connection.adminurl
            })}, (err, res, body) => {
        if (err) {
            dispatch(create_connection_error(body))
            dispatch(add_operation({
                content:'创建云主机连接配置:'+connection.name,
                result:'failed'
            }))
            message.error("操作失败");
            return false;
            
        }
        if(200<=res.status&&res.status<300){
            dispatch(close_create_connection_modal())
            dispatch(create_connection_ok(body))
            dispatch(add_operation({
                content:'创建云主机连接配置:'+connection.name,
                result:'success'
            }))
            message.success("操作成功");
            dispatch(set_vpc_switch_off())
        }else{
            dispatch(create_connection_error(body))
            dispatch(add_operation({
                content:'创建云主机连接配置:'+connection.name,
                result:'failed'
            }))
            message.error("操作失败")
        }
        
    })
    }
}
export function create_connection_error(reason) {
    return {
        type: CREATE_CONNECTION_ERROR,
        reason:reason
    }
}
export function create_connection_ok(connection) {
    return {
        type: CREATE_CONNECTION_OK,
        connection
    }
}
export function create_vpc(url,vpc,auth) {
        return function (dispatch) {
            let api = new API({
            baseURI: url
            });
            api.auth([auth.username, auth.password]);
            api.post('/createvpc', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','Content-Type':'application/json' },
                body:JSON.stringify({
                    'name':vpc.name, 
                    'kvmtype':vpc.kvmtype,
                    'persist':vpc.persist=='true'?true:false,
                    'cpu':vpc.cpu,
                    'mem':vpc.mme*1024*1024,
                    'volumes':vpc.volumes,
                    'bootide':vpc.bootide=='true'?true:false,
                })}, (err, res, body) => {
            if (err) {
                dispatch(create_vpc_error(body))
                dispatch(add_operation({
                    content:'创建虚拟机:'+vpc.name,
                    result:'failed'
                }))
                message.error("操作失败");
                return false;
                
            }
                if(res.status == 201){
                    dispatch(close_create_vpc_modal())
                    dispatch(create_vpc_ok(body))
                    dispatch(add_operation({
                        content:'创建虚拟机:'+vpc.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(create_vpc_error(body))
                    dispatch(add_operation({
                        content:'创建虚拟机:'+vpc.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
            
        })
        }
}
export function create_vpc_error(reason) {
    return {
        type: CREATE_VPC_ERROR,
        reason:reason
    }
}
export function create_vpc_ok(vpc) {
    return {
        type: CREATE_VPC_OK,
        vpc
    }
}
export function toggle_clouds(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_CLOUDS,
        selectedClouds:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function delete_clouds(selectedClouds,auth) {
    return function (dispatch) {
        selectedClouds.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                if (200<=res.status&&res.status<300){
                    dispatch(delete_cloud_ok(element))
                    dispatch(add_operation({
                        content:'删除云主机连接配置:'+ element.name + ' ' + element.id,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_cloud_error(body))
                    dispatch(add_operation({
                        content:'删除云主机连接配置:'+element.name+ ' ' + element.id,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}
export function delete_cloud_error(cloud) {
    return {
        type:DELETE_CLOUD_ERROR,
        cloud
    }
}
export function delete_cloud_ok(cloud) {
    return {
        type:DELETE_CLOUD_OK,
        cloud
    }
}

export function select_all_volume_state(state){
    return{
        type:SELECT_ALL_VOLUME_STATE,
        state
    }
}