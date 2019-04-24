import {REQUEST_POOLS,RECEIVE_POOLS,RECEIVE_POOLS_ERROR,SELECT_POOL,CHECKBOX_CHECKED_POOL,
    OPEN_ADD_POOL_WIN_REQUEST,
    OPEN_ADD_POOL_WIN_RECEIVE,
    OPEN_ADD_POOL_WIN_RECEIVE_ERROR,
    CLOSE_ADD_POOL_WIN,
    OPEN_UPDATE_POOL_WIN_REQUEST,
    OPEN_UPDATE_POOL_WIN_RECEIVE,
    OPEN_UPDATE_POOL_WIN_RECEIVE_ERROR,
    CLOSE_UPDATE_POOL_WIN,
    REQUEST_ADD_POOL,RECEIVE_ADD_POOL,RECEIVE_ADD_POOL_ERROR,
    REQUEST_UPDATE_POOL,RECEIVE_UPDATE_POOL,RECEIVE_UPDATE_POOL_ERROR,
    REQUEST_DEL_POOL,
    RECEIVE_DEL_POOL,
    RECEIVE_DEL_POOL_ERROR,
    REQUEST_POOL_DISKS,
    RECEIVE_POOL_DISKS,
    RECEIVE_POOL_DISKS_ERROR,
    RECEIVE_ADD_POOL_FORM,
    FETCH_ECHARTS_WIDTH,
    REQUEST_POOL_VOLUME,
    RECEIVE_POOL_VOLUME_OK,
    RECEIVE_POOL_VOLUME_ERR,
} from '../actions/poolactions'
import update from 'immutability-helper'

function fetchPOOLS(state={isFetching:false,didInvalidate:true,items:[],selectpool:{},winstate:{}},action) {
    switch (action.type) {
        case REQUEST_POOLS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                echartswidth:window.innerWidth-400,
            })
        case RECEIVE_POOLS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                selectedRowKeys: [],
                selectedPools:[],
            })
        case RECEIVE_POOLS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case SELECT_POOL:
            return Object.assign({},state,{
                selectpool:state.items.find(item => (item.id == action.poolId) )
                //selectpool:state.items[0]
            })
        case CHECKBOX_CHECKED_POOL:
            return Object.assign({},state,{
                selectedRowKeys:action.selectedRowKeys,
                selectedPools:action.selectedPools
            })
        case OPEN_ADD_POOL_WIN_REQUEST:
            return Object.assign({}, state, {
                addPoolForm: {
                    pool_id: '',
                    pool_name: '',
                    pool_type: '',
                    pool_size: 0,
                    pool_disks: []
                },
                winstate: {
                    winType:'add',
                    openAddPoolWin: false,
                    addBtnLoading: true
                }
            })
        case OPEN_ADD_POOL_WIN_RECEIVE:
            return Object.assign({}, state, {
                disks: action.items,
                winstate: {
                    winType:'add',
                    openAddPoolWin: true,
                    addBtnLoading: false
                }
            })
        case OPEN_ADD_POOL_WIN_RECEIVE_ERROR:
            return Object.assign({}, state, {
                winstate: {
                    winType:'add',
                    openAddPoolWin: false,
                    addBtnLoading: false,
                }
            })
        case OPEN_UPDATE_POOL_WIN_REQUEST:
            return Object.assign({}, state, {
                addPoolForm: {
                    pool_id: action.pool.id,
                    pool_name: action.pool.name,
                    pool_type: action.pool.type,
                    pool_size: action.pool.usage.size,
                    pool_disks: []
                },
                winstate: {
                    winType:'update',
                    openAddPoolWin: false,
                    updateBtnLoading: true
                }
            })
        case OPEN_UPDATE_POOL_WIN_RECEIVE:
            return Object.assign({}, state, {
                disks: action.items,
                winstate: {
                    winType:'update',
                    openAddPoolWin: true,
                    updateBtnLoading: false
                }
            })
        case OPEN_UPDATE_POOL_WIN_RECEIVE_ERROR:
            return Object.assign({}, state, {
                winstate: {
                    winType:'update',
                    openAddPoolWin: false,
                    updateBtnLoading: false,
                }
            })
        case CLOSE_ADD_POOL_WIN:
            return Object.assign({}, state, {
                winstate: {
                    winType:'add',
                    openAddPoolWin: false
                }
            })
        case CLOSE_UPDATE_POOL_WIN:
            return Object.assign({}, state, {
                winstate: {
                    winType:'update',
                    openAddPoolWin: false
                }
            })
        case REQUEST_ADD_POOL:
        return Object.assign({}, state, {
            operation: {
                type: "add",
                state: "loading"
            },
            winstate: {
                winType:'add',
                openAddPoolWin: true,
                confirmLoading: true
            }
        })
        case RECEIVE_ADD_POOL:
            // return Object.assign({}, state, {   
            //     operation: {
            //         type: "add",
            //         state: "success"
            //     },
            //     winstate: {
            //         winType:'add',
            //         openAddPoolWin: false
            //     }
            // })
            return update(state, { items: { $push: [action.pool],
                operation: {$set:{
                    type: "add",
                    state: "success"}
                },
                winstate: {$set:{
                    winType:'add',
                    openAddPoolWin: false}
                }
             } })
        case RECEIVE_ADD_POOL_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: "add",
                    state: "failed"
                },
                winstate: {
                    winType:'add',
                    openAddPoolWin: true,
                    confirmLoading: false
                }
            })
        case REQUEST_UPDATE_POOL:
            return Object.assign({}, state, {
                operation: {
                    type: "update",
                    state: "loading"
                },
                winstate: {
                    winType:'update',
                    openAddPoolWin: true,
                    confirmLoading: true
                }
            })
        case RECEIVE_UPDATE_POOL:
            return Object.assign({}, state, {
                operation: {
                    type: "update",
                    state: "success"
                },
                winstate: {
                    winType:'update',
                    openAddPoolWin: false
                }
            })
        case RECEIVE_UPDATE_POOL_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: "update",
                    state: "failed"
                },
                winstate: {
                    winType:'update',
                    openAddPoolWin: true,
                    confirmLoading: false
                }
            })
        case REQUEST_DEL_POOL:
            return Object.assign({}, state, {
                operation: {
                    type: "del",
                    state: "loading"
                }
            })
        case RECEIVE_DEL_POOL:
            return Object.assign({}, state, {
                operation: {
                    type: "del",
                    state: "success"
                },
                items:state.items.filter(function(item){return(item.id != action.poolId)},action)
            })
        case RECEIVE_DEL_POOL_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: "del",
                    state: "failed"
                }
            })
        case REQUEST_POOL_DISKS:
            return Object.assign({}, state, {
                fetchingPoolSelectedDisks: true
            })
        case RECEIVE_POOL_DISKS:
            return Object.assign({}, state, {
                addPoolForm: {
                    pool_id: action.pool.id,
                    pool_name: action.pool.name,
                    pool_type: action.pool.type,
                    pool_size: action.pool.usage.size,
                    pool_disks: action.items
                },
                //poolSelectedDisks : action.items,
                fetchingPoolSelectedDisks: false
            })
        case RECEIVE_POOL_DISKS_ERROR:
            return Object.assign({}, state, {
                fetchingPoolSelectedDisks: false
            })
        case RECEIVE_ADD_POOL_FORM:
            return Object.assign({}, state, {
                addPoolForm: action.formdata
            })
        case FETCH_ECHARTS_WIDTH:
            return Object.assign({},state,{
                echartswidth:action.echartswidth-400,
            })
        case REQUEST_POOL_VOLUME:
            return Object.assign({},state,{
                poolvolume:[]
            })
        case RECEIVE_POOL_VOLUME_OK:
            return Object.assign({},state,{
                poolvolume:action.poolvolume
            })
        case RECEIVE_POOL_VOLUME_ERR:
            return Object.assign({},state,{

            })
        default:
            return state
            
    }
}

function pools(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchPOOLS(state,action)
}

export default pools
