import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,username,password} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'



export const REQUEST_CEPHCLIENT = 'REQUEST_CEPHCLIENT'
export const RECEIVE_CEPHCLIENT = 'RECEIVE_CEPHCLIENT'
export const RECEIVE_CEPHCLIENT_ERROR = 'RECEIVE_CEPHCLIENT_ERROR'

export const CREATE_CEPHCLIENT_OK = 'CREATE_CEPHCLIENT_OK'
export const CREATE_CEPHCLIENT_ERROR = 'CREATE_CEPHCLIENT_ERROR'
export const ECHO_CREATE_CEPHCLIENT = 'ECHO_CREATE_CEPHCLIENT'
export const CLOSE_CREATE_CEPHCLIENT = 'CLOSE_CREATE_CEPHCLIENT'

export const DELETE_CEPHCLIENT = 'DELETE_CEPHCLIENT'
export const DELETE_CEPHCLIENT_OK = 'DELETE_CEPHCLIENT_OK'
export const DELETE_CEPHCLIENT_ERROR = 'DELETE_CEPHCLIENT_ERROR'

export const TOGGLE_CEPHCLIENT = 'TOGGLE_CEPHCLIENT'

export const REQUEST_CEPHCLUSTER = 'REQUEST_CEPHCLUSTER'
export const RECEIVE_CEPHCLUSTER = 'RECEIVE_CEPHCLUSTER'
export const RECEIVE_CEPHCLUSTER_ERROR = 'RECEIVE_CEPHCLUSTER_ERROR'


//osds
export const REQUEST_OSDS = 'REQUEST_OSDS'
export const RECEIVE_OSDS = 'RECEIVE_OSDS'
export const RECEIVE_OSDS_ERROR = 'RECEIVE_OSDS_ERROR'
export const DELETE_OSDS_OK = 'DELETE_OSDS_OK'
export const DELETE_OSDS_ERROR = 'DELETE_OSDS_ERROR'
export const CREATE_OSDS_OK = 'CREATE_OSDS_OK'
export const CREATE_OSDS_ERROR = 'CREATE_OSDS_ERROR'
export const ECHO_CREATE_OSDS = 'ECHO_CREATE_OSDS'
export const CLOSE_CREATE_OSDS = 'CLOSE_CREATE_OSDS'
export const UPDATE_OSDS_OK = 'UPDATE_OSDS_OK'
export const UPDATE_OSDS_ERR = 'UPDATE_OSDS_ERR'
export const TOGGLE_OSDS = 'TOGGLE_OSDS'
export const REFRESH_LIST = 'REFRESH_LIST'


export function request_cephclient(params){
    return{
        type:REQUEST_CEPHCLIENT,
        params
    }
}

export function receive_cephclient(cephclient){
    return{
        type:RECEIVE_CEPHCLIENT,
        items:cephclient,
    }

}
export function receive_cephclient_error(params){
    return{
        type:RECEIVE_CEPHCLIENT_ERROR,
        params
    }

}
    

export function fetch_cephclient(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_cephclient(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/cephclients'+'?ordering=-id', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_cephclient_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_cephclient(body))
            }else{
                dispatch(receive_cephclient(body.results))
            }

        })

    }
}
export function create_cephclient(cephclient,id,auth){
    const params={'baseURI':restapi,'username':username,'password':password};
    console.log(cephclient)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(params.username,params.password);
        api.post('/cephclients', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                "cluster": cephclient.cluster,
                "host": cephclient.host,
            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_cephclient_error(body))
                dispatch(add_operation({
                    content:'添加集群:'+cephclient.cluster,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(create_cephclient_ok(body))
                    dispatch(add_operation({
                        content:'添加集群:'+cephclient.cluster,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(close_create_cephclient())
                } else {
                    dispatch(create_cephclient_error(body))
                    dispatch(add_operation({
                        content:'添加集群:'+cephclient.cluster,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_cephclient_ok(cephclient){
    return {
        type: CREATE_CEPHCLIENT_OK,
        cephclient
    }
}
export function create_cephclient_error(err){
    return {
        type: CREATE_CEPHCLIENT_ERROR,
        err
    }
}
export function echo_create_cephclient(){
    return {
        type: ECHO_CREATE_CEPHCLIENT,
    }
}
export function close_create_cephclient(params){
    return {
        type: CLOSE_CREATE_CEPHCLIENT
    }
}


// export function delete_cephclient(selectedCephclient) {
//     const params={'baseURI':restapi,'path':diskspath,'auth':auth}
//     return function (dispatch) {
//         selectedCephclient.forEach(function(element) {
//             let api = new API({
//             baseURI: element.url
//             });
//             api.auth([params.auth.username, params.auth.password]);
//             api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
//                // console.log(body,element)
//                 if (res.status == 204){
//                     dispatch(delete_cephclient_ok(element))
//                     dispatch(add_operation({
//                         content:'删除集群:'+element.cluster,
//                         result:'success'
//                     }))
//                     message.success("操作成功");
//                 }else{
//                     dispatch(delete_cephclient_error(body))
//                     dispatch(add_operation({
//                         content:'删除集群:'+element.cluster,
//                         result:'failed'
//                     }))
//                     message.error("操作失败")
//                 } 
//             })
//         },auth);
//    }
// }
export function delete_cephclient(Id=0) {
    const params={'baseURI':restapi,'username':username,'password':password};
    return function (dispatch) {
        
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);

        let delFailedIds = [];

        api.del('/cephclients'+'/'+Id,
            {
                credentials: 'include',
                mode: 'cors',
                headers: { 'Accept': 'application/json' }
            }, (err, res, body) => {
                if (err) {
                    console.log('err', err)
                    dispatch(delete_cephclient_error(params))
                    Modal.error({
                        title: 'CDP系统提示！',
                        content: '删除失败，请联系管理员！',
                    });
                    dispatch(add_operation({
                        content: '删除集群客户端ID:'+Id,
                        result: 'failed'
                    }));
                    message.error("操作失败！");
                    return false
                }
                dispatch(delete_cephclient_ok(body))
                dispatch(add_operation({
                    content: '删除集群客户端ID:'+Id,
                    result: 'success'
                }));
                message.success("操作成功！");
            })

    }
}
export function delete_cephclient_error(err) {
    return {
        type:DELETE_CEPHCLIENT_ERROR,
        err
    }
}
export function delete_cephclient_ok(body) {
    return {
        type:DELETE_CEPHCLIENT_OK,
        delCephclient:body
    }
}
export function toggle_cephclient(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_CEPHCLIENT,
        selectedCephclient:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}


export function request_cephcluster(params){
    return{
        type:REQUEST_CEPHCLUSTER,
        params
    }

}
export function receive_cephcluster(body){
    return{
        type:RECEIVE_CEPHCLUSTER,
        cephclusters:body,
    }
}
export function receive_cephcluster_error(err){
    return{
        type:RECEIVE_CEPHCLUSTER_ERROR,
        err

    }
}

export function fetch_cephcluster(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_cephcluster(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/cephclusters',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_cephcluster_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_cephcluster(body))
            }else{
                dispatch(receive_cephcluster(body.results))
            }

        })

    }
}


export function request_osds(params){
    return{
        type:REQUEST_OSDS,
        params
    }
}

export function receive_osds(osd){
    return{
        type:RECEIVE_OSDS,
        osds:osd,
    }

}
export function receive_osds_error(params){
    return{
        type:RECEIVE_OSDS_ERROR,
        params
    }

}
    

export function fetch_osds(params={'baseURI':restapi,'auth':auth,'searchKey':''}){

    return function (dispatch) {
        dispatch(request_osds(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/osds'+'?ordering=-id', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_osds_error(params))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_osds(body))
            }else{
                dispatch(receive_osds(body.results))
            }

        })

    }
}
export function delete_osds_ok(body){
    return{
        type:DELETE_OSDS_OK,
        body
    }
}
export function delete_osds_error(err){
    return{
        type:DELETE_OSDS_ERROR,
        err
    }
}
export function toggle_osds(selectedRows,selectRowKeys){
    console.log(selectedRows,selectRowKeys)
    return{
        type:TOGGLE_OSDS,
        selectedOsds:[...selectRowKeys],
        selectedRowKeys:[...selectedRows]
    }
}
export function delete_osds(id){
    const params={'baseURI':restapi,'username':username,'password':password};
    return function (dispatch) {
        let api = new API({
            baseURI: params.baseURI
        });
        api.auth([params.username, params.password]);
        api.del('/osds/'+id,
            {
                credentials: 'include',
                mode: 'cors',
                headers: { 'Accept': 'application/json' }
            }, (err, res, body) => {
                if (err) {
                    console.log('err', err)
                    dispatch(delete_osds_error(params))
                    Modal.error({
                        title: 'CDP系统提示！',
                        content: '删除失败，请联系管理员！',
                    });
                    dispatch(add_operation({
                        content: '删除集群硬盘节点ID:'+id,
                        result: 'failed'
                    }));
                    message.error("操作失败！");
                    return false
                }
                dispatch(delete_osds_ok(body))
                dispatch(add_operation({
                    content: '删除集群硬盘节点ID:'+id,
                    result: 'success'
                }));
                message.success("操作成功！");
                dispatch(fetch_cephcluster())
                dispatch(refresh_list(true))

            })

    }
}
export function create_osds_ok(osd){
    return{
        type:CREATE_OSDS_OK,
        osds:osd
    }
}
export function create_osds_error(err){
    return{
        type:CREATE_OSDS_ERROR,
        err
    }
}
export function echo_create_osds(){
    return{
        type:ECHO_CREATE_OSDS
    }
}
export function close_create_osds(){
    return{
        type:CLOSE_CREATE_OSDS,
    }
}
export function create_osds(osds,auth){
    const params={'baseURI':restapi,'username':username,'password':password};
    console.log(osds)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(params.username,params.password);
        api.post('/osds', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
                "cluster": osds.cluster,
                "volume": osds.volume,
                "journal": osds.logvolume,
                "uuid":'',
                "ceph_id":-9999,

            })
        }, (err, res, body) => {
            if (err) {
                dispatch(create_osds_error(body))
                dispatch(add_operation({
                    content:'添加集群硬盘节点存储卷ID:'+osds.volume.split('/').pop() ,
                    result:'failed'
                }))
                message.error('操作失败');
                return false;
            } else {
                if (res.status == 201) {
                    dispatch(create_osds_ok(body))
                    dispatch(add_operation({
                        content:'添加集群硬盘节点存储卷ID:'+osds.volume.split('/').pop() ,
                        result:'success'
                    }))
                    message.success('操作成功')
                    dispatch(close_create_osds())
                    dispatch(fetch_cephcluster())
                    dispatch(refresh_list(true))
                } else {
                    dispatch(create_osds_error(body))
                    dispatch(add_operation({
                        content:'添加集群硬盘节点存储卷ID:'+osds.volume.split('/').pop() ,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    } 
    
}
export function update_osds_ok(ok){
    return{
        type:UPDATE_OSDS_OK,
        ok
    }
}
export function update_osds_err(err){
    return{
        type:UPDATE_OSDS_ERR,
        err
    }
}
export function update_osds(params={'baseURI':restapi,'auth':auth,'searchKey':''}){
     return function (dispatch) {
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/cephclusters/refresh', 
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(update_osds_err(params))
                return false
            }
            if (body.results == undefined){
                dispatch(update_osds_ok(body))
                dispatch(refresh_list(true))

            }else{
                dispatch(update_osds_ok(body.results))
                dispatch(refresh_list(true))

            }

        })

    }
}



export function refresh_list(tr){
    return{
        type:REFRESH_LIST,
        refresh:tr
    }
}