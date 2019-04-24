import {REQUEST_LUNS,RECEIVE_LUNS,RECEIVE_LUNS_ERROR,TOGGLE_LUNS,DELETE_LUN_OK,DELETE_LUN_ERROR} from '../actions/actions'

function fetchLunList(state={isFetching:false,didInvalidate:true,items:[]},action){
    switch (action.type) {
        case REQUEST_LUNS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: [],
                selectedLuns: [],
                selectedRowKeys: []
            })
        case RECEIVE_LUNS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_LUNS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case TOGGLE_LUNS:
            return Object.assign({}, state, {
                selectedLuns: action.selectedLuns,
                selectedRowKeys: action.selectedRowKeys
            })
        case DELETE_LUN_OK:
            return Object.assign({},state,{items:state.items.filter(function(item){return(item.id != action.lun.id)},action)})
        case DELETE_LUN_ERROR:
            return state
        default:
            return state
    }
}

function luns(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchLunList(state,action)
}

export default luns