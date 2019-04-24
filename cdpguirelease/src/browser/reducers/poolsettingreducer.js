/**
 * Created by tanglinhai on 2016/8/30.
 */
import {
    REQUEST_POOL,
    RECEIVE_POOL,
    RECEIVE_POOL_ERROR,
    REQUEST_POOL_VOLUMES,
    RECEIVE_POOL_VOLUMES,
    RECEIVE_POOL_VOLUMES_ERROR,
    CHECKBOX_CHECKED_POOL_VOLUMES,
    REQUEST_DEL_POOL_VOLUMES,
    RECEIVE_DEL_POOL_VOLUMES,
    RECEIVE_DEL_POOL_VOLUMES_ERROR,
    RECEIVE_ADDORUPDATE_VOLUME_FORM,
    OPEN_ADD_VOLUME_WIN,
    CLOSE_ADD_VOLUME_WIN,
    OPEN_UPDATE_VOLUME_WIN,
    CLOSE_UPDATE_VOLUME_WIN,
    REQUEST_ADD_VOLUME,
    RECEIVE_ADD_VOLUME,
    RECEIVE_ADD_VOLUME_ERROR
} from '../actions/poolsettingactions'
function fetchPoolSetting(state={isFetching:false,didInvalidate:true,volumes:{isFetching:false,didInvalidate:true,items:[]},winstate:{}},action) {

    switch (action.type) {
        case REQUEST_POOL_VOLUMES:
            return Object.assign({}, state, {
                volumes:{
                    isFetching:true,
                    didInvalidate:false
                }
            })
        case RECEIVE_POOL_VOLUMES:
            if(action.volumeType == 'zvol'){
                return Object.assign({}, state, {
                    selectedZvolRowKeys: [],
                    volumes:{
                        isFetching:false,
                        didInvalidate:false,
                        items: action.items,
                    }
                })
            }else{
                return Object.assign({}, state, {
                    selectedZfsRowKeys: [],
                    volumes:{
                        isFetching:false,
                        didInvalidate:false,
                        items: action.items,
                    }
                })
            }

        case RECEIVE_POOL_VOLUMES_ERROR:
            return Object.assign({}, state, {
                volumes:{
                    isFetching:false,
                    didInvalidate:true
                }
            })
        case REQUEST_POOL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POOL:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                pool: action.pool
            })
        case RECEIVE_POOL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
        case CHECKBOX_CHECKED_POOL_VOLUMES:
            return Object.assign({},state, action.volumeType == 'zvol' ? {
                selectedZvolRowKeys:action.selectedRowKeys
            } : {
                selectedZfsRowKeys:action.selectedRowKeys
            })
        case REQUEST_DEL_POOL_VOLUMES:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'loading'
                }
            })
        case RECEIVE_DEL_POOL_VOLUMES:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'success'
                }
            })
        case RECEIVE_DEL_POOL_VOLUMES_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'failed'
                }
            })
        case RECEIVE_ADDORUPDATE_VOLUME_FORM:
            return Object.assign({}, state, {
                addVolumeForm: action.formdata
            })
        case OPEN_ADD_VOLUME_WIN:
            return Object.assign({}, state, {
                addVolumeForm: {
                    volumeId: '',
                    volumeName: '',
                    volumeSize: 0,
                    volumeType: 'zvol'
                },
                winstate: {
                    openFormWin: true,
                    winType: 'add',
                    confirmLoading: false,
                    addBtnLoading: false
                }
            })
        case CLOSE_ADD_VOLUME_WIN:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'add',
                    confirmLoading: false
                }
            })
        case OPEN_UPDATE_VOLUME_WIN:
            return Object.assign({}, state, {
                addVolumeForm: {
                    volumeId: action.volume.id,
                    volumeName: action.volume.name,
                    volumeSize: action.volume.native.type.model == "zvol" ? action.volume.usage.bd_megs.replace('M', '') : action.volume.usage.size,
                    volumeType: action.volume.native.type.model
                },
                winstate: {
                    openFormWin: true,
                    winType: 'update',
                    confirmLoading: false,
                    updateBtnLoading: false
                }
            })
        case CLOSE_UPDATE_VOLUME_WIN:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'update',
                    confirmLoading: false
                }
            })
        case REQUEST_ADD_VOLUME:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: true,
                    winType: 'add',
                    confirmLoading: true
                }
            })
        case RECEIVE_ADD_VOLUME:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'add',
                    confirmLoading: false
                }
            })
        case RECEIVE_ADD_VOLUME_ERROR:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: true,
                    winType: 'add',
                    confirmLoading: false
                }
            })

        default:
            return state
    }
}

function poolSetting(state={isFetching:false,didInvalidate:true,volumes:{isFetching:false,didInvalidate:true,items:[]},winstate:{}},action) {
    return fetchPoolSetting(state,action)
}

export default poolSetting
