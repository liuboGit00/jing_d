import {REQUEST_SCHEDULE,RECEIVE_SCHEDULE,RECEIVE_SCHEDULE_ERROR,START_SCHEDULE_OK,
    START_SCHEDULE_ERROR,STOP_SCHEDULE_OK,STOP_SCHEDULE_ERROR,DELETE_SCHEDULE_OK,
    DELETE_SCHEDULE_ERROR,CREATE_SCHEDULE_OK,CREATE_SCHEDULE_ERROR,TOGGLE_SCHEDULES,
    ECHO_MODIFY_SCHEDUL,CLOSE_MODEIFY_SCHEDUL,ECHO_MODIFY_SCHEDUL_TIME,CLOSE_MODEIFY_SCHEDUL_TIME,
    ECHO_MODIFY_SCHEDUL_CONTENT,CLOSE_MODEIFY_SCHEDUL_CONTENT,CREATE_MODIFY_SCHEDUL_TIME_OK,
    CREATE_MODIFY_SCHEDUL_TIME_ERR,CREATE_MODIFY_SCHEDUL_CONTENT_OK,CREATE_MODIFY_SCHEDUL_CONTENT_ERR,
} from '../actions/taskactions'
import update from 'immutability-helper'

function fetchSchedule(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_SCHEDULE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                selectedSchedules:[],
                selectedRowKeys:[]
            })
        case RECEIVE_SCHEDULE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_SCHEDULE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case START_SCHEDULE_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                    if(item.id==action.schedule.id){
                        item=action.schedule
                        return item
                    }else{
                        return item
                    }
                })})
        case START_SCHEDULE_ERROR:
            return state
        case STOP_SCHEDULE_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                    if(item.id==action.schedule.id){
                        item=action.schedule
                        return item
                    }else{
                        return item
                    }
                })})
        case DELETE_SCHEDULE_OK:
            return Object.assign({}, state, { items: state.items.filter(function (item) { return (item.id != action.schedule.id) }, action) })
        case DELETE_SCHEDULE_ERROR:
            return state
        case CREATE_SCHEDULE_OK:
/*            action.schedule.args = action.schedule.args.join('');
            action.schedule.kwargs = action.schedule.kwargs.max_snap_num.toString();*/
            return update(state, { items: { $push: [action.schedule] } })
        case CREATE_SCHEDULE_ERROR:
            return state
        case TOGGLE_SCHEDULES:
            return Object.assign({},state,{
                selectedSchedules:action.selectedSchedules,
                selectedRowKeys:action.selectedRowKeys
            })
        case ECHO_MODIFY_SCHEDUL:
            return Object.assign({},state,{
                schedule_modal:true
            })
        case CLOSE_MODEIFY_SCHEDUL:
            return Object.assign({},state,{
                schedule_modal:false
            })
        case ECHO_MODIFY_SCHEDUL_TIME:
            return Object.assign({},state,{
                time_schedule_modal: true
            })
        case CLOSE_MODEIFY_SCHEDUL_TIME:
            return Object.assign({},state,{
                time_schedule_modal:false
            })
        case ECHO_MODIFY_SCHEDUL_CONTENT:
            return Object.assign({},state,{
                content_schedule_modal:true
            })
        case CLOSE_MODEIFY_SCHEDUL_CONTENT:
            return Object.assign({},state,{
                content_schedule_modal:false
            })
        case CREATE_MODIFY_SCHEDUL_TIME_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id == action.scheduletime.id){
                    item=action.scheduletime
                    return item
                }else{
                    return item
                }
            })})
        case CREATE_MODIFY_SCHEDUL_TIME_ERR:
            return  state
        case CREATE_MODIFY_SCHEDUL_CONTENT_OK:
            return Object.assign({},state,{items:state.items.map(function(item){
                if(item.id == action.schedulecontent.id){
                    item=action.schedulecontent
                    return item
                }else{
                    return item
                }
            })})
        case CREATE_MODIFY_SCHEDUL_CONTENT_ERR:
            return  state
        default:
            return state
    }
}

function schedules(state = { isFetching: false, didInvalidate: true, items: [] }, action) {
    return fetchSchedule(state, action)
}

export default schedules