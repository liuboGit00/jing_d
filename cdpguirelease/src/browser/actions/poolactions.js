/**
 * Created by tanglinhai on 2016/8/29.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,username,password} from '../confs/host'
import {Modal, message} from 'antd';
import {add_operation, del_operation} from './operationactions'
//----------------------------------------------------pools start--------------------------------------------------------------
export const FETCH_POOLS = 'FETCH_POOLS'
export const REQUEST_POOLS = 'REQUEST_POOLS'
export const RECEIVE_POOLS = 'RECEIVE_POOLS'
export const RECEIVE_POOLS_ERROR = 'RECEIVE_POOLS_ERROR'
export const SELECT_POOL = 'SELECT_POOL'
export const CHECKBOX_CHECKED_POOL = 'CHECKBOX_CHECKED_POOL'

export const OPEN_ADD_POOL_WIN_REQUEST = 'OPEN_ADD_POOL_WIN_REQUEST'
export const OPEN_ADD_POOL_WIN_RECEIVE = 'OPEN_ADD_POOL_WIN_RECEIVE'
export const OPEN_ADD_POOL_WIN_RECEIVE_ERROR = 'OPEN_ADD_POOL_WIN_RECEIVE_ERROR'

export const OPEN_UPDATE_POOL_WIN_REQUEST = 'OPEN_UPDATE_POOL_WIN_REQUEST'
export const OPEN_UPDATE_POOL_WIN_RECEIVE = 'OPEN_UPDATE_POOL_WIN_RECEIVE'
export const OPEN_UPDATE_POOL_WIN_RECEIVE_ERROR = 'OPEN_UPDATE_POOL_WIN_RECEIVE_ERROR'

export const CLOSE_ADD_POOL_WIN = 'CLOSE_ADD_POOL_WIN'
export const CLOSE_UPDATE_POOL_WIN = 'CLOSE_UPDATE_POOL_WIN'

export const REQUEST_ADD_POOL = 'REQUEST_ADD_POOL'
export const RECEIVE_ADD_POOL = 'RECEIVE_ADD_POOL'
export const RECEIVE_ADD_POOL_ERROR = 'RECEIVE_ADD_POOL_ERROR'

export const REQUEST_UPDATE_POOL = 'REQUEST_UPDATE_POOL'
export const RECEIVE_UPDATE_POOL = 'RECEIVE_UPDATE_POOL'
export const RECEIVE_UPDATE_POOL_ERROR = 'RECEIVE_UPDATE_POOL_ERROR'

export const REQUEST_POOLFORMDATA_DISKS = 'REQUEST_POOLFORMDATA_DISKS'
export const RECEIVE_POOLFORMDATA_DISKS = 'RECEIVE_POOLFORMDATA_DISKS'
export const RECEIVE_POOLFORMDATA_DISKS_ERROR = 'RECEIVE_POOLFORMDATA_DISKS_ERROR'

export const REQUEST_DEL_POOL = 'REQUEST_DEL_POOL'
export const RECEIVE_DEL_POOL = 'RECEIVE_DEL_POOL'
export const RECEIVE_DEL_POOL_ERROR = 'RECEIVE_DEL_POOL_ERROR'

export const REQUEST_POOL_DISKS = 'REQUEST_POOL_DISKS'
export const RECEIVE_POOL_DISKS = 'RECEIVE_POOL_DISKS'
export const RECEIVE_POOL_DISKS_ERROR = 'RECEIVE_POOL_DISKS_ERROR'

export const REQUEST_ADD_POOL_FORM = 'REQUEST_ADD_POOL_FORM'
export const RECEIVE_ADD_POOL_FORM = 'RECEIVE_ADD_POOL_FORM'
export const RECEIVE_ADD_POOL_FORM_ERROR = 'RECEIVE_ADD_POOL_FORM_ERROR'


//集群存储池
export const REQUEST_CEPH_POOLS = 'REQUEST_CEPH_POOLS'
export const RECEIVE_CEPH_POOLS = 'RECEIVE_CEPH_POOLS'
export const RECEIVE_CEPH_POOLS_ERROR = 'RECEIVE_CEPH_POOLS_ERROR'
export const TOGGLE_CEPH_POOL = 'TOGGLE_CEPH_POOL'
export const ECHO_CREATE_CEPH_POOL = 'ECHO_CREATE_CEPH_POOL'
export const CLOSE_CREATE_CEPH_POOL = 'CLOSE_CREATE_CEPH_POOL'
export const DEL_CEPH_POOL = 'DEL_CEPH_POOL'
export const REQUEST_DEL_CEPH_POOL = 'REQUEST_DEL_CEPH_POOL'
export const RECEIVE_DEL_CEPH_POOL = 'RECEIVE_DEL_CEPH_POOL'
export const RECEIVE_DEL_CEPH_POOL_ERROR = 'RECEIVE_DEL_CEPH_POOL_ERROR'
export const MODIFY_CEPH_POOL_OK = 'MODIFY_CEPH_POOL_OK'
export const MODIFY_CEPH_POOL_ERROR = 'MODIFY_CEPH_POOL_ERROR'
export const FETCH_ECHARTS_WIDTH = 'FETCH_ECHARTS_WIDTH'


//存储池里的卷
export const REQUEST_POOL_VOLUME = 'REQUEST_POOL_VOLUME'
export const RECEIVE_POOL_VOLUME_OK = 'RECEIVE_POOL_VOLUME_OK'
export const RECEIVE_POOL_VOLUME_ERR = 'RECEIVE_POOL_VOLUME_ERR'
//----------------------------------------------------pools end--------------------------------------------------------------


//----------------------------------------------------pools start--------------------------------------------------------------
/* pool table */


export function request_pool_volume (){
    return {
        type:REQUEST_POOL_VOLUME
    }
}
export function receive_pool_volume_ok(body){
    return {
        type:RECEIVE_POOL_VOLUME_OK,
        poolvolume:body
    }
}
export function receive_pool_volume_err(err){
    return{
        type:RECEIVE_POOL_VOLUME_ERR,
        err
    }
}
export function fetch_pool_volume(id){
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_pool_volume(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'/'+id+'/volumes', {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','cache-control':'no-cache'},
            //body: JSON.stringify(conditions)
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_pool_volume_err(params))
                return false
            }
            if(body.results==undefined){
                dispatch(receive_pool_volume_ok(body))
            }else{
                dispatch(receive_pool_volume_ok(body.results))

            }

        })

    }
}

//get echarts width
export function fetch_echarts_width(width){
    return{
        type:FETCH_ECHARTS_WIDTH,
        echartswidth:width
    }
}
export function request_pools(params) {
    return {
        type:REQUEST_POOLS
    }
}
export function receive_pools(poolsjson) {
    return {
        type:RECEIVE_POOLS,
        items:poolsjson,
    }
}
export function receive_pools_error(params={}) {
    return {
        type:RECEIVE_POOLS_ERROR,
        params
    }
}
export function fetch_pools(conditions={'searchKey':''}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_pools(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit=999'+'&search='+conditions.searchKey, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','cache-control':'no-cache'},
            //body: JSON.stringify(conditions)
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_pools_error(params))
                return false
            }

            dispatch(receive_pools(body.results))

        })

    }
}
export function select_pool(poolId) {
    return {
        type:SELECT_POOL,
        poolId
    }
}
export function checkbox_checked_poll(selectedRowKeys,selectedPools) {
    return {
        type:CHECKBOX_CHECKED_POOL,
        selectedRowKeys:selectedRowKeys,
        selectedPools:selectedPools,
    }
}

/* add pool */
export function open_add_pool_win_request(params) {
    return {
        type:OPEN_ADD_POOL_WIN_REQUEST
    }
}
export function open_add_pool_win_receive(disksjson) {
    return {
        type:OPEN_ADD_POOL_WIN_RECEIVE,
        items:disksjson,
    }
}
export function open_add_pool_win_receive_error(params={}) {
    return {
        type:OPEN_ADD_POOL_WIN_RECEIVE_ERROR,
        params
    }
}
export function open_add_pool_win(params={'baseURI':restapi,'path':diskspath,'username':username,'password':password}) {
    return function (dispatch) {
        dispatch(open_add_pool_win_request(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(open_add_pool_win_receive_error(params))
                return false
            }
            dispatch(open_add_pool_win_receive(body.results))
        })
    }
}
export function close_add_pool_win(params={}) {
    return {
        type:CLOSE_ADD_POOL_WIN,
        params
    }
}
export function request_add_pool(params) {
    return {
        type:REQUEST_ADD_POOL
    }
}
export function receive_add_pool(pool) {
    return {
        type:RECEIVE_ADD_POOL,
        pool,
    }
}
export function receive_add_pool_error(params={}) {
    return {
        type:RECEIVE_ADD_POOL_ERROR,
        params
    }
}
export function add_pool(pool={'disks':[],name:'',options:{type:'',raidtype:'',name:''}}, form) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        const formvalues = form.getFieldsValue();
        dispatch(request_add_pool(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.post(params.path + '?limit=999', {
            credentials: 'include', mode: 'cors', headers: {'Accept': 'application/json','Content-Type':'application/json'},
            body: JSON.stringify({
                    "disks": pool.disks,
                    "name": pool.name,
                    //"size" : pool.size,
                    "options": {
                        "type": pool.options.type,
                        "raidtype": pool.options.raidtype,
                        "name": pool.options.name
                    }
                }
            )
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_add_pool_error(params))
                Modal.error({
                    title: 'CDP系统提示！',
                    content: '添加失败，请联系管理员！',
                });
                setTimeout(function(){
                    form.setFieldsValue(formvalues);
                }, 10);
                dispatch(add_operation({
                    content: '新建存储池:'+pool.name,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
                }
                // if (body.results == undefined) {
                //     dispatch(receive_add_pool(body))
                // } else {
                    dispatch(receive_add_pool(body))
                    // }
                    dispatch(close_add_pool_win());
                    //dispatch(fetch_pools())
                    dispatch(add_operation({
                        content: '新建存储池:' + pool.name,
                        result: 'success'
                    }));
                    message.success("操作成功！");
            })
    }
}

/* update pool */
export function open_update_pool_win_request(pool) {
    return {
        type:OPEN_UPDATE_POOL_WIN_REQUEST,
        pool: pool
    }
}
export function open_update_pool_win_receive(disksjson) {
    return {
        type:OPEN_UPDATE_POOL_WIN_RECEIVE,
        items:disksjson,
    }
}
export function open_update_pool_win_receive_error(params={}) {
    return {
        type:OPEN_UPDATE_POOL_WIN_RECEIVE_ERROR,
        params
    }
}
export function open_update_pool_win(pool={}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':diskspath,'username':username,'password':password};
        dispatch(open_update_pool_win_request(pool))

        let api = new API({
            baseURI: params.baseURI
        });

        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(open_update_pool_win_receive_error(params))
                return false
            }
            dispatch(open_update_pool_win_receive(body.results))
            //get selected disks
            dispatch(pool_disks(pool));

        })
    }
}
export function close_update_pool_win(params={}) {
    return {
        type:CLOSE_UPDATE_POOL_WIN,
        params
    }
}
export function request_update_pool(params) {
    return {
        type:REQUEST_UPDATE_POOL
    }
}
export function receive_update_pool(poolsjson) {
    return {
        type:RECEIVE_UPDATE_POOL,
        items:poolsjson,
    }
}
export function receive_update_pool_error(params={}) {
    return {
        type:RECEIVE_UPDATE_POOL_ERROR,
        params
    }
}
export function update_pool(pool={'id': '0','disks':[],name:'',options:{type:'',raidtype:'',name:''}}, form) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        const formvalues = form.getFieldsValue();
        dispatch(request_update_pool(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.post(params.path + '?limit=999', {
            credentials: 'include', mode: 'cors', headers: {'Accept': 'application/json','Content-Type':'application/json'},
            body: JSON.stringify({
                    "id": pool.id,
                    "disks": pool.disks,
                    "name": pool.name,
                    "options": {
                        "type": pool.options.type,
                        "raidtype": pool.options.raidtype,
                        "name": pool.options.name
                    }
                }
            )
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_update_pool_error(params))
                Modal.error({
                    title: 'CDP系统提示！',
                    content: '更新失败，请联系管理员！',
                });
                setTimeout(function(){
                    form.setFieldsValue(formvalues);
                }, 10);
                dispatch(add_operation({
                    content: '更新存储池:'+pool.name,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
            }
            if (body.results == undefined) {
                dispatch(receive_update_pool(body))
            } else {
                dispatch(receive_update_pool(body.results))
            }
            dispatch(close_add_pool_win());
            dispatch(fetch_pools())
            message.success("操作成功！");
            dispatch(add_operation({
                content: '更新存储池:'+pool.name,
                result: 'success'
            }));
        })
    }
}

/* pool form */
export function request_poolformdata_disks(params) {
    return {
        type:REQUEST_POOLFORMDATA_DISKS
    }
}
export function receive_poolformdata_disks(poolsjson) {
    return {
        type:RECEIVE_POOLFORMDATA_DISKS,
        items:poolsjson,
    }
}
export function receive_poolformdata_disks_error(params={}) {
    return {
        type:RECEIVE_POOLFORMDATA_DISKS_ERROR,
        params
    }
}
export function fetch_poolformdata_disks(params={'baseURI':restapi,'path':diskspath,'username':username,'password':password}) {
    return function (dispatch) {
        dispatch(request_poolformdata_disks(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_poolformdata_disks_error(params))
                return false
            }

            dispatch(receive_poolformdata_disks(body.results))

        })

    }
}

/* del pool */
export function request_del_pool(params) {
    return {
        type:REQUEST_DEL_POOL
    }
}
export function receive_del_pool(poolId) {
    return {
        type:RECEIVE_DEL_POOL,
        poolId,
    }
}
export function receive_del_pool_error(params={}) {
    return {
        type:RECEIVE_DEL_POOL_ERROR,
        params
    }
}
export function del_pool(poolId=0) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_del_pool(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);

        let delFailedIds = [];

        api.del(params.path+'/'+poolId,
            {
                credentials: 'include',
                mode: 'cors',
                headers: { 'Accept': 'application/json' }
            }, (err, res, body) => {
                if (err) {
                    console.log('err', err)
                    dispatch(receive_del_pool_error(params))
                    Modal.error({
                        title: 'CDP系统提示！',
                        content: '删除失败，请联系管理员！',
                    });
                    dispatch(add_operation({
                        content: '删除存储池ID:'+poolId,
                        result: 'failed'
                    }));
                    message.error("操作失败！");
                    return false
                }
                dispatch(receive_del_pool(poolId))
                //dispatch(fetch_pools())
                dispatch(add_operation({
                    content: '删除存储池ID:'+poolId,
                    result: 'success'
                }));
                message.success("操作成功！");
            })

    }
}

/* get pool disks */
export function request_pool_disks(params) {
    return {
        type:REQUEST_POOL_DISKS
    }
}
export function receive_pool_disks(diskIds, poolsjson) {
    return {
        type:RECEIVE_POOL_DISKS,
        items:diskIds,
        pool: poolsjson
    }
}
export function receive_pool_disks_error(params={}) {
    return {
        type:RECEIVE_POOL_DISKS_ERROR,
        params
    }
}
export function pool_disks(pool={}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_pool_disks(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'/'+pool.id+'/storage?limit='+new Date().getTime(), { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_pool_disks_error(params))
                return false
            }
            const diskIds = [];
            if(body){
                for(let i=0;i<body.length;i++){
                    diskIds.push(body[i].id)
                }
            }
            dispatch(receive_pool_disks(diskIds, pool))
        })

    }
}



/* set add pool form */
export function receive_add_pool_form(formdata) {
    return {
        type:RECEIVE_ADD_POOL_FORM,
        formdata:formdata
    }
}


//集群存储池
export function request_ceph_pools(){
    return{
        type:REQUEST_CEPH_POOLS
    }
}
export function receive_ceph_pools(body){
    return{
        type:RECEIVE_CEPH_POOLS,
        cephpools:body
    }
}
export function receive_ceph_pools_error(err){
    return{
        type:RECEIVE_CEPH_POOLS_ERROR,
        err
    }
}
export function fetch_ceph_pools(){
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_ceph_pools())

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get('/cephpools'+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' } }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_ceph_pools_error(params))
                return false
            }
            dispatch(receive_ceph_pools(body.results))

        })

    }
}
export function toggle_ceph_pool(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_CEPH_POOL,
        selectedCephpool:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function echo_create_ceph_pool(){
    return{
        type:ECHO_CREATE_CEPH_POOL,

    }
}
export function close_create_ceph_pool(){
    return{
        type:CLOSE_CREATE_CEPH_POOL,
    }
}
export function request_del_ceph_pool(){
    return{
        type:REQUEST_DEL_CEPH_POOL,
        params
    }
}
export function receive_del_ceph_pool(cephpool){
    return{
        type:RECEIVE_DEL_CEPH_POOL,
        delCephpool:cephpool
    }
}
export function receive_del_ceph_pool_error(err){
    return{
        type:RECEIVE_DEL_CEPH_POOL_ERROR,
        err
    }
}

export function del_ceph_pool(poolId=0) {
    // console.log(poolId)
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        dispatch(request_del_ceph_pool(params))

        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);

        let delFailedIds = [];

        api.del('/cephpools'+'/'+poolId,
            {
                credentials: 'include',
                mode: 'cors',
                headers: { 'Accept': 'application/json' }
            }, (err, res, body) => {
                if (err) {
                    console.log('err', err)
                    dispatch(receive_del_ceph_pool_error(params))
                    Modal.error({
                        title: 'CDP系统提示！',
                        content: '删除失败，请联系管理员！',
                    });
                    dispatch(add_operation({
                        content: '删除集群存储池ID:'+poolId,
                        result: 'failed'
                    }));
                    message.error("操作失败！");
                    return false
                }
                dispatch(receive_del_ceph_pool(body))
                //dispatch(fetch_pools())
                dispatch(add_operation({
                    content: '删除集群存储池ID:'+poolId,
                    result: 'success'
                }));
                message.success("操作成功！");
            })

    }
}

export function modify_ceph_pool_ok (body){
    return{
        type:MODIFY_CEPH_POOL_OK,
        body
    }
}
export function modify_ceph_pool_error (err){
    return{
        type:MODIFY_CEPH_POOL_ERROR,
        err
    }
}
export function modify_cephpool(cephpool) {
    console.log(cephpool)
    return function (dispatch) {
        const params={'baseURI':restapi,'path':poolspath,'username':username,'password':password};
        let api = new API({
            baseURI:restapi
        });
        api.auth([params.username, params.password]);
        api.put('/cephpools/'+cephpool.id, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({
                "size":cephpool.size,
                'min_size':cephpool.min_size,
                'ceph_id':cephpool.ceph_id,
                'cluster':cephpool.cluster,
            })
        }, (err, res, body) => {
            // console.log(err,res,body)
            if (res.status == 200){
                // dispatch(close_create_agent_clone_modal())
                dispatch(modify_ceph_pool_ok(body))
                dispatch(add_operation({
                    content:'修改集群存储池:'+cephpool.id,
                    result:'success'
                }))
                message.success('操作成功')
                dispatch(close_create_ceph_pool())
            } else {
                dispatch(modify_ceph_pool_error(err))
                dispatch(add_operation({
                    content:'修改集群存储池:'+cephpool.id,
                    result:'failed'
                }))
                message.error('操作失败')
            }
            
        })

    }
}

//----------------------------------------------------pools end--------------------------------------------------------------