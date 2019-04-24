import {REQUEST_AGENTS,RECEIVE_AGENTS,RECEIVE_AGENTS_ERROR,ECHO_CREATE_AGENT_MODAL,ECHO_CREATE_SSH_MODAL,ECHO_MODIFY_AGENT_MODAL,CLOSE_CREATE_AGENT_MODAL,CLOSE_CREATE_SSH_MODAL,CLOSE_MODIFY_AGENT_MODAL,TOGGLE_AGENTS,
    DELETE_AGENT_OK,DELETE_AGENT_ERROR,REGISTER_AGENT_OK,SAVE_GRAINS_OK,SAVE_GRAINS_ERROR,CHECK_ONLINE_OK,CHECK_ONLINE_ERROR,CREATE_AGENT_ERROR,CREATE_AGENT_OK} from '../actions/actions';
import update from 'immutability-helper';

function fetchAGENT(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_AGENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],
                selectedAgents:[],          
            })
        case RECEIVE_AGENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_AGENTS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
		case ECHO_CREATE_SSH_MODAL:
            return Object.assign({}, state, {
                create_ssh_modal: true
            })
		case CLOSE_CREATE_SSH_MODAL:
            return Object.assign({}, state, {
                create_ssh_modal: false
            })
        case ECHO_CREATE_AGENT_MODAL:
            return Object.assign({}, state, {
                create_agent_modal: true
            })
        case CLOSE_CREATE_AGENT_MODAL:
            return Object.assign({}, state, {
                create_agent_modal: false
            })
        case ECHO_MODIFY_AGENT_MODAL:
            return Object.assign({},state,{
                modify_agent_modal:true
            })
        case CLOSE_MODIFY_AGENT_MODAL:
            return Object.assign({}, state, {
                modify_agent_modal: false
            })
        case TOGGLE_AGENTS:
            return Object.assign({}, state, {
                selectedAgents: action.selectedAgents,
                selectedRowKeys: action.selectedRowKeys
            })
        case DELETE_AGENT_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.agent.id)},action)})
        case DELETE_AGENT_ERROR:
            return state
        case REGISTER_AGENT_OK:
            return update(state,{items:{$push:[action.agent]}})
        case SAVE_GRAINS_OK:
            return state
        case SAVE_GRAINS_ERROR:
            return state
        case CHECK_ONLINE_ERROR:
            return state
        case CREATE_AGENT_OK:
            return update(state,{items:{$push:[action.agent]}})
        case CHECK_ONLINE_OK:
            //agent=items.find(item=>(item.id==action.id))
            //Object.assign({},state.items.find(item=>(item.id==action.id)),{online:action.body.online})
            /*update(state,{
                items:{$set: state.items.find(item=>(item.id==action.id)).online=action.body.online}
                })*/
                //update(state, { online: { $push: [{'id':action.id,'online':action.body.online} ]} })
                return Object.assign({},state,{items:state.items.map(function(item){
                    //console.info('mapitem',item)
                    if(item.id==action.id){
                        //item=update(item,{online:{$set:action.body.online}})
                        item['online']=action.body.online
                        return item
                        //console.info('aftermap',item)
                    }else{
                        return item
                    }
                })})
              
            
            
        default:
            return state
    }
}
function agents(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchAGENT(state,action)
}

export default agents