import {RECEIVE_PORTALS,RECEIVE_PORTALS_ERROR,REQUEST_PORTALS,RECEIVE_IPADDRESS} from '../actions/actions'

function fetchPortals(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch(action.type){
        case REQUEST_PORTALS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
            })
        case RECEIVE_PORTALS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_PORTALS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case RECEIVE_IPADDRESS:
            return Object.assign({},state,{items:state.items.map(function(item){
                    if(item.id==action.portalId){
                        item.ipaddress=action.ipaddress
                        return item
                    }else{
                        return item
                    }
                })})
        default:
            return state
    }
}
function portals(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchPortals(state,action)
}

export default portals