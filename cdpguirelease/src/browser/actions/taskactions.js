/**
 * Created by tanglinhai on 2016/9/12.
 */
//import 'babel-polyfill'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,resultspath,username,password} from '../confs/host'
import {Modal, message} from 'antd';
import {pools, pool183, pool45, poolvolumes} from '../constants/test';
import {add_operation, del_operation} from './operationactions'
import auth from '../utils/auth'
import ReactDOM from 'react-dom';


export const REQUEST_TASK = 'REQUEST_TASK'
export const RECEIVE_TASK = 'RECEIVE_TASK'
export const RECEIVE_TASK_ERROR = 'RECEIVE_TASK_ERROR'

export const REQUEST_DEL_TASK = 'REQUEST_DEL_TASK'
export const RECEIVE_DEL_TASK = 'RECEIVE_DEL_TASK'
export const RECEIVE_DEL_TASK_ERROR = 'RECEIVE_DEL_TASK_ERROR'

export const CHECKBOX_CHECKED_TASK = 'CHECKBOX_CHECKED_TASK'
export const RECEIVE_SEARCHADVANCEFORM_STATE = 'RECEIVE_SEARCHADVANCEFORM_STATE'
export const RECEIVE_ADDORUPDATE_SEARCHADVANCEFORM = 'RECEIVE_ADDORUPDATE_SEARCHADVANCEFORM'

export const START_SCHEDULE_OK = 'START_SCHEDULE_OK'
export const START_SCHEDULE_ERROR = 'START_SCHEDULE_ERROR'
export const STOP_SCHEDULE_ERROR = 'STOP_SCHEDULE_ERROR'
export const STOP_SCHEDULE_OK = 'STOP_SCHEDULE_OK'
export const REQUEST_SCHEDULE = 'REQUEST_SCHEDULE'
export const RECEIVE_SCHEDULE = 'RECEIVE_SCHEDULE'
export const RECEIVE_SCHEDULE_ERROR = 'RECEIVE_SCHEDULE_ERROR'
export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR'
export const DELETE_SCHEDULE_OK = 'DELETE_SCHEDULE_OK'

export const SELECT_TASK_TYPE = 'SELECT_TASK_TYPE'
export const SELECT_TASK_PERIOD = 'SELECT_TASK_PERIOD'
export const CREATE_SNAP_TASK = 'CREATE_SNAP_TASK'
export const CREATE_SCHEDULE_ERROR = 'CREATE_SCHEDULE_ERROR'
export const CREATE_SCHEDULE_OK = 'CREATE_SCHEDULE_OK'
export const TOGGLE_SCHEDULES = 'TOGGLE_SCHEDULES'

export const ECHO_MODIFY_SCHEDUL = 'ECHO_MODIFY_SCHEDUL'
export const CLOSE_MODEIFY_SCHEDUL = 'CLOSE_MODEIFY_SCHEDUL'
export const ECHO_MODIFY_SCHEDUL_TIME = 'ECHO_MODIFY_SCHEDUL_TIME'
export const CLOSE_MODEIFY_SCHEDUL_TIME = 'CLOSE_MODEIFY_SCHEDUL_TIME'
export const CREATE_MODIFY_SCHEDUL_TIME_OK = 'CREATE_MODIFY_SCHEDUL_TIME_OK'
export const CREATE_MODIFY_SCHEDUL_TIME_ERR = 'CREATE_MODIFY_SCHEDUL_TIME_ERR'
export const CREATE_MODIFY_SCHEDUL_CONTENT_OK = 'CREATE_MODIFY_SCHEDUL_CONTENT_OK'
export const CREATE_MODIFY_SCHEDUL_CONTENT_ERR = 'CREATE_MODIFY_SCHEDUL_CONTENT_ERR'
export const ECHO_MODIFY_SCHEDUL_CONTENT = 'ECHO_MODIFY_SCHEDUL_CONTENT'
export const CLOSE_MODEIFY_SCHEDUL_CONTENT = 'CLOSE_MODEIFY_SCHEDUL_CONTENT'
/* advanceSearch state */
export function receive_searchAdvanceForm_state(formState) {
    return {
        type:RECEIVE_SEARCHADVANCEFORM_STATE,
        formState
    }
}
/* advanceSearch form */
export function receive_addOrUpdate_searchAdvanceForm(form) {
    return {
        type:RECEIVE_ADDORUPDATE_SEARCHADVANCEFORM,
        form
    }
}


/* select task */
export function checkbox_checked_task(selectedRowKeys) {
    return {
        type:CHECKBOX_CHECKED_TASK,
        selectedRowKeys
    }
}
/* fetch task */
export function request_task(params) {
    return {
        type:REQUEST_TASK
    }
}
export function receive_task(results, pageSize, current) {
    return {
        type:RECEIVE_TASK,
        results: results,
        pageSize: pageSize,
        current: current
    }
}
export function receive_task_error(params={}) {
    return {
        type:RECEIVE_TASK_ERROR,
        params
    }
}
export function fetch_tasks(conditions={searchKey:''}, pageSize=10, current=1, taskTable ) {
    const date=new Date()
    const time = date.getTime()
    console.log(time)
    return function (dispatch) {
        const params={'baseURI':restapi,'path':resultspath,'username':username,'password':password};
        dispatch(request_task(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.get(params.path+'?search='+conditions.searchKey+'&limit='+pageSize+'&offset='+(current-1)*pageSize+'&time='+ time, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json','cache-control':'no-cache' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_task_error(params))
                return false
            }
            dispatch(receive_task(body, pageSize, current))
            if(taskTable!=undefined){
                taskTable.setAttribute('data-resultType', 'normal');
            }
            
        })
    }
}
export function fetch_tasks_advance_search(conditions, pageSize=10, current=1, taskTable) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':resultspath,'username':username,'password':password};
        dispatch(request_task(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        //task_id=&task=celery.backend_cleanup&status=SUCCESS

        api.get(params.path+'?task_id=&task='+conditions.keyword+'&status='+conditions.status+'&limit='+pageSize+'&offset='+(current-1)*pageSize, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_task_error(params))
                return false
            }
            // console.log(pageSize)

            dispatch(receive_task(body, pageSize, current))
            taskTable.setAttribute('data-resultType', 'advance');
        })
    }
}

/* del task */
export function request_del_task(params) {
    return {
        type:REQUEST_DEL_TASK
    }
}
export function receive_del_task(params) {
    return {
        type:RECEIVE_DEL_TASK
    }
}
export function receive_del_task_error(params={}) {
    return {
        type:RECEIVE_DEL_TASK_ERROR,
        params
    }
}
export function del_tasks(taskId=0, pagination={current:1, pageSize:10}) {
    return function (dispatch) {
        const params={'baseURI':restapi,'path':resultspath,'username':username,'password':password};
        dispatch(request_del_task(params))
        let api = new API({
            baseURI: params.baseURI
        });
        // log in to our API with a user/pass
        api.auth([params.username, params.password]);
        api.del(params.path+'/'+taskId+'?limit='+new Date().getTime(), {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_del_task_error(params))
                dispatch(add_operation({
                    content: '删除任务ID:'+taskId,
                    result: 'failed'
                }));
                message.error("操作失败！");
                return false
            }
            dispatch(receive_del_task(body))
            dispatch(fetch_tasks({searchKey:''}, pagination.pageSize, pagination.current))
            dispatch(add_operation({
                content: '删除任务ID:'+taskId,
                result: 'success'
            }));
            message.success("操作成功！");
        })
    }
}
export function start_schedule(scheduleId,auth){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username, auth.password]);
        api.post('/schedules/' + scheduleId + '/start', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'cache-control': 'no-cache' }
        }, (err, res, body) => {
            if (err) {
                console.log('start schedule err', err, res, body)
                dispatch(start_schedule_error(body))
                dispatch(add_operation({
                    content: '开启任务:'+scheduleId,
                    result: 'failed'
                }));
                message.error("操作失败！");
            }
            if (res.status == 200) {
                dispatch(start_schedule_ok(body))
                dispatch(add_operation({
                    content: '开启任务:'+scheduleId,
                    result: 'success'
                }));
                message.success("操作成功！");
            } else {
                dispatch(start_schedule_error(body))
                dispatch(add_operation({
                    content: '开启任务:'+scheduleId,
                    result: 'failed'
                }));
                message.error("操作失败！");
            }

        })
    }
}
export function start_schedule_ok(schedule) {
    return {
        type:START_SCHEDULE_OK,
        schedule
    }
}
export function start_schedule_error(params){
    return{
        type:START_SCHEDULE_ERROR,
        params
    }
}
export function stop_schedule(scheduleId,auth){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        });
        api.auth([auth.username,auth.password]);
        api.post('/schedules/' + scheduleId + '/stop', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'cache-control': 'no-cache' }
        }, (err, res, body) => {
            if (err) {
                console.log('stop schedule err', err, res, body)
                dispatch(stop_schedule_error(body))
                dispatch(add_operation({
                    content: '关闭任务:'+scheduleId,
                    result: 'failed'
                }));
                message.error("操作失败！");
            }
            if (res.status == 200) {
                dispatch(stop_schedule_ok(body))
                dispatch(add_operation({
                    content: '关闭任务:'+scheduleId,
                    result: 'success'
                }));
                message.success("操作成功！");
            } else {
                dispatch(stop_schedule_error(body))
                dispatch(add_operation({
                    content: '关闭任务:'+scheduleId,
                    result: 'failed'
                }));
                message.error("操作失败！");
            }

        })
    }
}
export function stop_schedule_ok(schedule){
    return{
        type:STOP_SCHEDULE_OK,
        schedule
    }
}
export function stop_schedule_error(){
    return{
        type:STOP_SCHEDULE_ERROR
    }
}
export function fetch_schedules(params={'baseURI':restapi,'auth':auth}){
    return function(dispatch){
        dispatch(request_schedule(params))
        let api = new API({
            baseURI:params.baseURI
        });
        api.auth([params.auth.username, params.auth.password]);
        api.get('/schedules'+'?limit=999', { credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json','cache-control':'no-cache'} }, (err, res, body) => {
            if (err) {
                console.log('err', err)
                dispatch(receive_schedule_error(body))
                return false
            }

            dispatch(receive_schedule(body.results))

        })

    }
}
export function request_schedule(params){
    return{
        type:REQUEST_SCHEDULE,
        params
    }
}
export function receive_schedule(schedulesjson){
    return {
        type:RECEIVE_SCHEDULE,
        items:schedulesjson
    }
}
export function receive_schedule_error(reason){
    return {
        type:RECEIVE_SCHEDULE_ERROR,
        reason:reason
    }
}
export function delete_schedules(selectedSchedules,auth){
    return function (dispatch) {
        selectedSchedules.forEach(function(element) {
            let api = new API({
            baseURI: element.url
            });
            api.auth([auth.username, auth.password]);
            api.del('', { credentials: 'include', mode: 'cors', headers: { 'Content-Type': 'text/plain' ,'cache-control':'no-cache'} }, (err, res, body) => {
                if (200<=res.status&&res.status<300) {
                    dispatch(delete_schedule_ok(element))
                    dispatch(add_operation({
                        content:'删除调度任务:'+ element.name,
                        result:'success'
                    }))
                    message.success("操作成功");
                } else {
                    console.log('err', err, res, body)
                    dispatch(delete_schedule_error(body))
                    dispatch(add_operation({
                        content:'删除调度任务:'+element.name,
                        result:'failed'
                    }))
                    message.error("操作失败")
                }
            })
        }, auth);
    }
}
export function delete_schedule_error(schedule) {
    return {
        type:DELETE_SCHEDULE_ERROR,
        schedule
    }
}
export function delete_schedule_ok(schedule) {
    return {
        type:DELETE_SCHEDULE_OK,
        schedule
    }
}
export function select_task_type(task_name,ptask_name){
    return{
        type:SELECT_TASK_TYPE,
        task_name,
        ptask_name
    }
}
/*export function select_task_period(period){
    return{
        type:SELECT_TASK_PERIOD,
        period
    }
}*/
export function create_schedule(ptask_name,task_name,args,kwargs,crontab,period) {
    // console.log(task)
    return function (dispatch) {
        let api = new API({
            baseURI: restapi
        });
        console.log(auth.username,auth.password)
        api.auth([auth.username, auth.password]);
        api.post('/schedules', {
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: (crontab=='false'?JSON.stringify({
                            'ptask_name': ptask_name,
                            'task_name': task_name,
                            'period': period.period,
                            'every': parseFloat(period.every),
                            'args': args,
                            'kwargs': kwargs
                        }):JSON.stringify({
                            'ptask_name': ptask_name,
                            'task_name': task_name, 
                            'args': args, 
                            'kwargs': kwargs,
                            'minute':period.minute,
                            'hour':period.hour,
                            'week':period.week,
                            'day':period.day,
                            'month':period.month,
            
                        }))

        }, (err, res, body) => {
            if (err) {
                console.log('create schedule err', err, res, body)
                dispatch(create_schedule_error(body))
                dispatch(add_operation({
                        content:'创建调度任务:'+task_name,
                        result:'failed'
                    }))
                    message.error('操作失败')

            } else {
                if (res.status == 201) {
                    //console.log('create vulume ok', res, body)
                    dispatch(create_schedule_ok(body))
                    dispatch(add_operation({
                        content:'创建调度任务:'+ task_name,
                        result:'success'
                    }))
                    message.success("操作成功");
                } else {
                    dispatch(create_schedule_error(body))
                    dispatch(add_operation({
                        content:'创建调度任务:'+task_name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_schedule_error(reason){
    return{
        type:CREATE_SCHEDULE_ERROR,
        reason:reason
    }
}
export function create_schedule_ok(schedule){
    return{
        type:CREATE_SCHEDULE_OK,
        schedule
    }
}
export function create_snap_task(args,kwargs,copy,crontab,scripts){
    return{
        type:CREATE_SNAP_TASK,
        args,
        kwargs,
        copy,
        crontab,
    }
}
export function toggle_schedules(selectRowKeys,selectedRows) {
    return {
        type:TOGGLE_SCHEDULES,
        selectedSchedules:[...selectedRows],
        selectedRowKeys:[...selectRowKeys]
    }
}
export function echo_modify_schedul(){
    return{
        type:ECHO_MODIFY_SCHEDUL
    }
}
export function close_modify_schedul(){
    return{
        type:CLOSE_MODEIFY_SCHEDUL
    }
}
export function echo_modify_schedul_time(){
    return{
        type:ECHO_MODIFY_SCHEDUL_TIME
    }
}
export function close_modify_schedul_time(){
    return{
        type: CLOSE_MODEIFY_SCHEDUL_TIME
    }
}
export function echo_modify_schedul_content(){
    return{
        type:ECHO_MODIFY_SCHEDUL_CONTENT
    }
}
export function close_modify_schedul_content(){
    return{
        type: CLOSE_MODEIFY_SCHEDUL_CONTENT
    }
}
export function create_modify_schedul_content_err(err){
    return{
        type:CREATE_MODIFY_SCHEDUL_CONTENT_ERR,
        err
    }
}
export function create_modify_schedul_content_ok(body){
    return{
        type:CREATE_MODIFY_SCHEDUL_CONTENT_OK,
        schedulecontent:body
    }
}
export function modify_schedul_content(id,content){
    console.log(content)
    const sc =[]
    if(content.scripts!=undefined){
        for(let i=0;i<content.scripts.length;i++){
            sc.push(parseInt(content.scripts[i]))
        }
    }
    // console.log(sc)
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([auth.username,auth.password])
        api.put('/schedules/'+id,
            {credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: (JSON.stringify({
                            'name': content.ptask_name, 
                            'args': content.volumeId, 
                            'kwargs': {'max_snap_num':content.maxnum,'scripts':sc,'check_befsnap':content.check_befsnap},
                        }))

        }, (err, res, body) => {
            if (err) {
                dispatch(create_modify_schedul_content_err(err))
                dispatch(add_operation({
                        content:'修改调度任务内容:'+content.ptask_name,
                        result:'failed'
                    }))
                    message.error('操作失败')

            } else {
                if (res.status == 202) {
                    //console.log('create vulume ok', res, body)
                    dispatch(create_modify_schedul_content_ok(body))
                    dispatch(add_operation({
                        content:'修改调度任务内容:'+ content.ptask_name,
                        result:'success'
                    }))
                    message.success("操作成功");
                    dispatch(close_modify_schedul_content())
                } else {
                    dispatch(create_modify_schedul_content_err(err))
                    dispatch(add_operation({
                        content:'修改调度任务内容:'+content.ptask_name,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}
export function create_modify_schedul_time_err(err){
    return{
        type:CREATE_MODIFY_SCHEDUL_TIME_ERR,
        err
    }
}
export function create_modify_schedul_time_ok(body){
    return{
        type:CREATE_MODIFY_SCHEDUL_TIME_OK,
        scheduletime:body
    }
}
export function modify_schedul_time(id,time){
    return function(dispatch){
        let api = new API({
            baseURI:restapi
        })
        api.auth([auth.username,auth.password])
        api.post('/schedules/'+id+'/chgschedule',{
            credentials: 'include', mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body:time.minute==undefined?(
                JSON.stringify({
                    'period':time.period.split('>')[0],
                    'every':parseInt(time.every),
                })):(JSON.stringify({
                        'minute':parseInt(time.minute),
                        'hour':parseInt(time.hour),
                        'week':parseInt(time.week),
                        'day':parseInt(time.day),
                        'month':parseInt(time.month),
                    }))
        }, (err, res, body) => {
            if (err) {
                dispatch(create_modify_schedul_time_err(err))
                dispatch(add_operation({
                        content:'修改调度任务时间:'+id,
                        result:'failed'
                    }))
                    message.error('操作失败')


            } else {
                if (res.status == 202) {
                    //console.log('create vulume ok', res, body)
                    dispatch(create_modify_schedul_time_ok(body))
                    dispatch(add_operation({
                        content:'修改调度任务时间:'+ id,
                        result:'success'
                    }))
                    message.success("操作成功");
                    dispatch(close_modify_schedul_time())
                } else {
                    dispatch(create_modify_schedul_time_err(err))
                    dispatch(add_operation({
                        content:'修改调度任务时间:'+id,
                        result:'failed'
                    }))
                    message.error('操作失败')
                }
            }
        })
    }
}