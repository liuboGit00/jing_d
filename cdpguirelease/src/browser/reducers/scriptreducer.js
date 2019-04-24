import {REQUEST_SCRIPT,RECEIVE_SCRIPT,RECEIVE_SCRIPT_ERR,
		UPDATE_SCRIPT_OK,UPDATE_SCRIPT_ERR,CREATE_SCRIPT_OK,CREATE_SCRIPT_ERR,
		TOGGLE_SCRIPT,DELETE_SCRIPT_ERR,DELETE_SCRIPT_OK,ECHO_CREATE_SCRIPT,CLOSE_CREATE_SCRIPT,
		ECHO_UPDATE_SCRIPT,RUN_SCRIPT_OK,RUN_SCRIPT_ERR,REQUEST_RUN_SCRIPT,
		ECHO_RUN_SCRIPT,CLOSE_RUN_SCRIPT,
}from '../actions/scriptaction'	
import update from 'immutability-helper';
function fetchScript(state={isFetching:false,didInvalidate:true,items:[]},action){
	switch(action.type){
		case REQUEST_SCRIPT:
		 	return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedScript:[],
                selectedRowKeys:[],
                update_switch:false,
                updatecontent:[],
                run:[]    
            })
		case RECEIVE_SCRIPT:
			return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.script,
            })
		case RECEIVE_SCRIPT_ERR:
			return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })

		case UPDATE_SCRIPT_OK:
			return Object.assign({},state,{items:state.items.map(
                function(item){
                    if(item.id==action.update.id){
                        item=action.update
                        return item
                    }else{
                        return item
                    }
                },action)})

		case UPDATE_SCRIPT_ERR:
			return state

		case CREATE_SCRIPT_OK:
			return update(state,{items:{$unshift:[action.createScript]}})
		case CREATE_SCRIPT_ERR:
			return state
		case TOGGLE_SCRIPT:
			return Object.assign({},state,{
                selectedScript:action.selectedScript,
                selectedRowKeys:action.selectedRowKeys
            })
		case DELETE_SCRIPT_ERR:
			return state

		case DELETE_SCRIPT_OK:
			  return Object.assign({},state,{items:state.items.filter(function(item){return( item.id!=action.body)},action)})
		case ECHO_CREATE_SCRIPT:
		 	return Object.assign({}, state, {
                script_modal:true
            })

		case CLOSE_CREATE_SCRIPT:
			return Object.assign({},state,{
                script_modal:false,
                update_switch:false,

			})
		case ECHO_UPDATE_SCRIPT:
			return Object.assign({},state,{
				update_switch:true,
				updatecontent:action.updatecontent
			})
		case RUN_SCRIPT_OK:
			return Object.assign({},state,{
				run:action.runScript
			})
		case RUN_SCRIPT_ERR:
			return state
		case REQUEST_RUN_SCRIPT:
			return Object.assign({},state,{
				run:[]
			})
		case ECHO_RUN_SCRIPT:
			return Object.assign({},state,{
				run_script_modal:true,
			})
		case CLOSE_RUN_SCRIPT:
			return Object.assign({},state,{
				run_script_modal:false,
			})
		default:
			return state
	}
		
}

function scripts(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchScript(state,action)
}

export default scripts