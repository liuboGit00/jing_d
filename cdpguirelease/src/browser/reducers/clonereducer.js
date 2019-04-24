import update from 'immutability-helper';
import {REQUEST_CLONES,RECEIVE_CLONES,RECEIVE_CLONES_ERROR} from '../actions/cloudactions'

function fetchClone(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type){
        case REQUEST_CLONES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items:[],            
            })
        case RECEIVE_CLONES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_CLONES_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        
        default :
            return state
    }
}
function clones(state = {isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchClone(state,action)
}

export default clones