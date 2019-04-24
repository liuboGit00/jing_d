import API from 'fetch-api'
import {Modal, message} from 'antd'
import {restapi,username,password,} from '../confs/host'
import auth from '../utils/auth'
import {add_operation, del_operation} from './operationactions'


export const FETCH_FILECLONES = 'FETCH_FILECLONES'
export const REQUEST_FILECLONES = 'REQUEST_FILECLONES'
export const RECEIVE_FILECLONES = 'RECEIVE_FILECLONES'
export const RECEIVE_FILECLONES_ERROR = 'RECEIVE_FILECLONES_ERROR'

export const MODIFY_FILECLONES = 'MODIFY_FILECLONES'
export const REQUEST_MODIFY_FILECLONES = 'REQUEST_MODIFY_FILECLONES'
export const RECEIVE_MODIFY_FILECLONES = 'RECEIVE_MODIFY_FILECLONES'
export const RECEIVE_MODIFY_FILECLONES_ERROR = 'RECEIVE_MODIFY_FILECLONES_ERROR'

export const CREATE_FILECLONES = 'CREATE_FILECLONES'
export const CREATE_FILECLONES_SUCCESS = 'CREATE_FILECLONES_SUCCESS'
export const CREATE_FILECLONES_ERROR = 'CREATE_FILECLONES_ERROR'

export const DELETE_FILECLONES = 'DELETE_FILECLONES'
export const DELETE_FILECLONES_SUCCESS = 'DELETE_FILECLONES_SUCCESS'
export const DELETE_FILECLONES_ERROR = 'DELETE_FILECLONES_ERROR'

export const TOGGLE_FILECLONES = 'TOGGLE_FILECLONES'

export const ECHO_FILECLONES = 'ECHO_FILECLONES'
export const CLOSE_FILECLONES = 'CLOSE_FILECLONES'

export const REQUEST_AGENTLOCAL = 'REQUEST_AGENTLOCAL'
export const RECEIVE_AGENTLOCAL = 'RECEIVE_AGENTLOCAL'
export const RECEIVE_AGENTLOCAL_ERROR = 'RECEIVE_AGENTLOCAL_ERROR'
export const REQUEST_LOCALAGENT = 'REQUEST_LOCALAGENT'
export const RECEIVE_LOCALAGENT = 'RECEIVE_LOCALAGENT'
export const RECEIVE_LOCALAGENT_ERROR = 'RECEIVE_LOCALAGENT_ERROR'

export const REQUEST_FILECLONES_TASK = 'REQUEST_FILECLONES_TASK'
export const RECEIVE_FILECLONES_TASK = 'RECEIVE_FILECLONES_TASK'
export const RECEIVE_FILECLONES_TASK_ERROR = 'RECEIVE_FILECLONES_TASK_ERROR'


//filesync server
export const STOP_SERVER_OK = 'STOP_SERVER_OK'
export const STOP_SERVER_ERR = 'STOP_SERVER_ERR'
export const START_SERVER_OK = 'START_SERVER_OK'
export const START_SERVER_ERR = 'START_SERVER_ERR'
export const FETCH_FILECLONES_SERVER_OK = 'FETCH_FILECLONES_SERVER_OK'
export const FETCH_FILECLONES_SERVER_ERR = 'FETCH_FILECLONES_SERVER_ERR'
export const REQUEST_FILECLONES_SERVER = 'REQUEST_FILECLONES_SERVER'
//fileclone add apply
export const CREATE_FILECLONES_APPLY_OK = 'CREATE_FILECLONES_APPLY_OK'
export const CREATE_FILECLONES_APPLY_ERR = 'CREATE_FILECLONES_APPLY_ERR'
export const REQUEST_FILECLONES_APPLY = 'REQUEST_FILECLONES_APPLY'


export function request_fileclones_apply(){
    return {
        type:REQUEST_FILECLONES_APPLY,

    }
}
export function create_fileclones_apply_ok(body){
    return  {
        type:CREATE_FILECLONES_APPLY_OK,
        apply:body,
    }
}
export function create_fileclones_apply_err(err){
    return{
        type:CREATE_FILECLONES_APPLY_ERR,
        err
    }
}

export function create_fileclones_apply(selectedFileclones){
    // console.log(selectedFileclones)
    const fileArr = [selectedFileclones]
    let i = 0
    let j = 0
    return function(dispatch){
        dispatch(request_fileclones_apply())
        fileArr.forEach(function(element) {
            let api = new API({
                baseURI:restapi
            });
            api.auth([username,password]);
            api.get('/fileclones/'+element.id+'/apply',{credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' }},
                (err,res,body)=>{
                    if(res.status == 200) {
                        dispatch(create_fileclones_apply_ok(body))
                        dispatch(add_operation({
                            content:'添加脚本:'+element.name,
                            result:'success'
                        }));
                        i++;
                        j++;
                        if(selectedFileclones.length>1){
                            if(j==selectedFileclones.length){
                                if(i==selectedFileclones.length){
                                    message.success('操作成功')
                                }else{
                                    message.error('操作失败')
                                }
                            }
                            
                        }else{
                            message.success('操作成功')
                        }
                        
                    }else{
                        i--;
                        j++;
                        dispatch(create_fileclones_apply_err(body))
                        dispatch(add_operation({ 
                            content:'添加脚本:'+element.name,
                            result:'failed'
                        }))

                        if(selectedFileclones.length>1){
                            if(j==selectedFileclones.length){
                                if(i!=selectedFileclones.length){
                                    message.error('操作失败')
                                }
                            }
                        }else{
                            message.error('操作失败')
                        }
                        
                    }
    
            })
        }) 
    }
}



export function request_fileclones_server(){
    return{
        type:REQUEST_FILECLONES_SERVER,
        
    }
}
export function fetch_fileclones_server_ok(ok,id){
    return {
        type:FETCH_FILECLONES_SERVER_OK,
        serverstatus:ok,
        serverid:id
    }
}
export function fetch_fileclones_server_err(err){
    return{
        type:FETCH_FILECLONES_SERVER_ERR,
        err
    }
}
export function fetch_fileclones_server(id){
    return function(dispatch){
        dispatch(request_fileclones_server())
        let api =new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/fileclones/'+id+'/statusdaemon',{credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' }},(err,res,body)=>{
            if (err) {
                dispatch(fetch_fileclones_server_err(err))
                return false
            };
            // console.log(body)
            if (body.results == undefined){
                dispatch(fetch_fileclones_server_ok(body,id))
            }else{
                dispatch(fetch_fileclones_server_ok(body.results,id))
            }
        })
    }

}
export function stop_server_ok(ok){
    return{
        type:STOP_SERVER_OK,
        stopserver:ok
    }
}
export function stop_server_err(err){
    return{
        type:STOP_SERVER_ERR,
        err
    }
}
export function stop_server(id){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/fileclones/'+id+'/stopdaemon',{credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' }},(err,res,body)=>{
            if (err) {
                dispatch(stop_server_err())
                return false
            };
            if (body.results == undefined){
                dispatch(stop_server_ok(body))
                dispatch(fetch_fileclones_server(id))
                message.success('关闭成功')


            }else{
                dispatch(stop_server_ok(body.results))
                dispatch(fetch_fileclones_server(id))
                message.error('关闭失败')

            }

        })
    }
}
export function start_server_ok(ok){
    return{
        type:START_SERVER_OK,
        startserver:ok
    }
}
export function start_server_err(err){
    return{
        type:START_SERVER_ERR,
        err
    }
}
export function start_server(id){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([username,password])
        api.get('/fileclones/'+id+'/startdaemon',{credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' }},(err,res,body)=>{
            if (err) {
                dispatch(start_server_err())
                message.error('开启失败')
                return false
            };
            if (body.results == undefined){
                dispatch(start_server_ok(body))
                dispatch(fetch_fileclones_server(id))
                if (body.result==false) {
                    Modal.warning({
                        title:'CDP系统提示！',
                        content:'无法开启实时同步，请联系系统管理员。',
                    })
                }else{
                    message.success('开启成功')
                }
            }else{
                dispatch(start_server_ok(body.results))
                dispatch(fetch_fileclones_server(id))
                
                
            }

        })
    }
}


export function request_fileclones(){
    return{
        type:REQUEST_FILECLONES,
        
    }
}
export function receive_fileclones(filec) {
    return{
        type:RECEIVE_FILECLONES,
        fileclones:filec,
    }

}
export function receive_fileclones_error(params){
    return{
        type:RECEIVE_FILECLONES_ERROR,
        params
    }


}
export function fetch_fileclones(){
    // console.log()
    return function (dispatch) {
        dispatch(request_fileclones())
        let api = new API({
            baseURI:restapi
        });
        api.auth([username,password])
        api.get('/fileclones'+'?limit=999',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_fileclones_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_fileclones(body))
                for(let i=0;i<body.length;i++){
                    dispatch(fetch_fileclones_server(body[i].id))
                    if(body[i].task!=null){
                        dispatch(fetch_fileclones_task(body[i].task))
                    }
                    
                    
                }
            }else{
                dispatch(receive_fileclones(body.results))
                for(let i=0;i<body.results.length;i++){
                    dispatch(fetch_fileclones_server(body.results[i].id))
                    if(body.results[i].task!=null){
                        dispatch(fetch_fileclones_task(body.results[i].task))
                    }
                    
                    
                }

                
            }

        })

    }
}


export function toggle_fileclones(selectRowKeys,selectedRows){
    return {
        type:TOGGLE_FILECLONES,
        selectedFileclones:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}

export function delete_fileclones_error(body){
	return{
        type:DELETE_FILECLONES_ERROR,
        body
    }
}
export function delete_fileclones_success(body){
	return{
        type:DELETE_FILECLONES_SUCCESS,
        fileclones :body
    }
}
export function delete_fileclones(selectedFileclones,auth){
    // console.log(selectedFileclones)
    return function (dispatch) {
        selectedFileclones.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: {'Content-Type': 'text/plain' } }, (err, res, body) => {               
                // console.log(element)

                if (200<=res.status&&res.status<300){
                    dispatch(delete_fileclones_success(element))
                    dispatch(add_operation({
                        content:'文件同步节点:'+element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                }else{
                    dispatch(delete_fileclones_error(element))
                    dispatch(add_operation({
                        content:'文件同步节点:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
                  
            })
        },auth);
   }
}

export function create_fileclones_success(filec){
	return{
        type:CREATE_FILECLONES_SUCCESS,
        fileclones:filec
    }
}
export function create_fileclones_error(body){
	return{
        type:CREATE_FILECLONES_ERROR,
        body 
    }
}
export function echo_fileclones(echo){
	return{
        type:ECHO_FILECLONES,
        echo:echo
    }
}
export function close_fileclones(){
	return{
        type:CLOSE_FILECLONES
    }
}
export function create_fileclones(fileclones,auth){
    // console.log(fileclones)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth(auth.username,auth.password);
        api.post('/fileclones', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({ 
               'name':fileclones.name,
                'agent':fileclones.agent,
                'agentpath':fileclones.agentpath,
                'localpath':fileclones.localpath,
                'localend':fileclones.localend,
                'localip':fileclones.localip,
                'by_ssh':fileclones.by_ssh,
                'exclude':fileclones.exclude,
                'delete_flag':fileclones.delete,
            })
        }, (err, res, body) => {
            // console.log(err,res,body)
            if (res.status == 201) {
                dispatch(close_fileclones())
                dispatch(create_fileclones_success(body))
                dispatch(add_operation({
                    content:'增加文件同步节点:'+fileclones.name,
                    result:'success'
                }))
                message.success('操作成功')
                if (fileclones.script=='true') {
                    dispatch(create_fileclones_apply(body))
                };
                
            } else {
                dispatch(create_fileclones_error(body))
                dispatch(add_operation({
                    content:'增加文件同步节点:'+fileclones.name,
                    result:'failed'
                }))
                message.error('操作失败')
            }
            
        })
    }
}



export function request_modify_fileclones(params){
    return{
        type:REQUEST_MODIFY_FILECLONES,
        params
    }
}
export function receive_modify_fileclones(modify) {
    return{
        type:RECEIVE_MODIFY_FILECLONES,
        modify:modify,
    }
}
export function receive_modify_fileclones_error(params={}){
    return{
        type:RECEIVE_MODIFY_FILECLONES_ERROR,
        params
    }
}
export function modify_fileclones(fileclones,id){
    // console.log(fileclones,id)
    return function (dispatch) {
        dispatch(request_modify_fileclones())
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.put('/fileclones/'+id, {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
            body: JSON.stringify({
                /*'name':fileclones.name,
                'agent':fileclones.agent,
                'agentpath':fileclones.agentpath,
               'localpath':fileclones.localpath,
                'localend':fileclones.localend,
                'localip':fileclones.localip,*/
                'name':fileclones.name,
                'agent':fileclones.agent,
                'agentpath':fileclones.agentpath,
                'localend':fileclones.localend,
                'localip':fileclones.localip,
                'by_ssh':fileclones.by_ssh,
                'exclude':fileclones.exclude,
                'delete_flag':fileclones.delete,
            
            })
        },(err, res, body) => {
            // console.log(body)
            if (err) {
                dispatch(receive_modify_fileclones_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_modify_fileclones(body))
                dispatch(close_fileclones())
            }else{
                dispatch(receive_modify_fileclones(body.results))
                dispatch(close_fileclones())

            }

        })

    }
}

export function request_agentlocal(){
    return{
        type:REQUEST_AGENTLOCAL,
        
    }
}
export function receive_agentlocal(agentl) {
    return{
        type:RECEIVE_AGENTLOCAL,
        agentlocal:agentl,
    }

}
export function receive_agentlocal_error(params){
    return{
        type:RECEIVE_AGENTLOCAL_ERROR,
        params
    }


}
export function fetch_agentlocal(id){
    console.log(id)
    const params={'baseURI':restapi,'username':username,'password':password}
    return function (dispatch) {
        dispatch(request_agentlocal())
        let api = new API({
            baseURI:restapi
        });
        api.auth([params.username,params.password]);
        api.get('/fileclones/'+ id +'/sync2local',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {

            if (err) {
                dispatch(receive_agentlocal_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_agentlocal(body))
                dispatch(fetch_fileclones_task(body.task))
            }else{
                dispatch(receive_agentlocal(body.results))
                dispatch(fetch_fileclones_task(body.results.task))
            }

        })

    }
}

export function request_localagent(){
    return{
        type:REQUEST_LOCALAGENT, 
        
    }
}
export function receive_localagent(locala) {
    return{
        type:RECEIVE_LOCALAGENT,
        localagent:locala,
    }

}
export function receive_localagent_error(params){
    return{
        type:RECEIVE_LOCALAGENT_ERROR,
        params
    }


}
export function fetch_localagent(id){
    console.log(id)
    const params={'baseURI':restapi,'username':username,'password':password}
    return function (dispatch) {
        dispatch(request_localagent())
        let api = new API({
            baseURI:restapi
        });
        api.auth([params.username,params.password]);

        api.get('/fileclones/'+ id +'/sync2agent',
        { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            if (err) {
                dispatch(receive_localagent_error(err))
                return false
            }
            if (body.results == undefined){
                dispatch(receive_localagent(body))
                dispatch(fetch_fileclones_task(body.task))

            }else{
                dispatch(receive_localagent(body.results))
                dispatch(fetch_fileclones_task(body.results.task))

                
            }

        })

    }
}
export function request_fileclones_task(){
    return{
        type:REQUEST_FILECLONES_TASK, 
        
    }
}
export function receive_fileclones_task(ta) {
    return{
        type:RECEIVE_FILECLONES_TASK,
        task:ta,
    }

}
export function receive_fileclones_task_error(params){
    return{
        type:RECEIVE_FILECLONES_TASK_ERROR,
        params
    }


}
export function fetch_fileclones_task(task){
    // console.log(task)
    const params={'baseURI':restapi,'username':username,'password':password}
    return function(dispatch){
        dispatch(request_fileclones_task(params))
        let api = new API({
            baseURI:task
        });
        api.auth([params.username,params.password]);
        api.get('', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json' ,'cache-control':'no-cache' } }, (err, res, body) => {
            // console.log(body)
            if(res.status == 200){
                dispatch(receive_fileclones_task(body))
            }else{
                dispatch(receive_fileclones_task_error(err))

            }
        })
    }
    
}

