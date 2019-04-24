/**
 * Created by tanglinhai on 2016/9/2.
 */
import {
    REQUEST_USERS,
    RECEIVE_USERS,
    RECEIVE_USERS_ERROR,

    REQUEST_DEL_USERS,
    RECEIVE_DEL_USERS,
    RECEIVE_DEL_USERS_ERROR,

    REQUEST_ADD_USER,
    RECEIVE_ADD_USER,
    RECEIVE_ADD_USER_ERROR,
    REQUEST_UPDATE_USER,
    RECEIVE_UPDATE_USER,
    RECEIVE_UPDATE_USER_ERROR,

    OPEN_ADD_USER_WIN,
    CLOSE_ADD_USER_WIN,
    OPEN_UPDATE_USER_WIN,
    CLOSE_UPDATE_USER_WIN,

    CHECKBOX_CHECKED_USERS,
    RECEIVE_ADDORUPDATE_USER_FORM,
    RECEIVE_USER_FORM_STATE,
    OPEN_UPDATE_USER_PERM,
    CLOSE_UPDATE_USER_PERM,
    UPDATE_USER_PERM_OK,
    UPDATE_USER_PERM_ERR,


} from '../actions/useractions'

function updateUserManageState(state={isFetching:false,didInvalidate:true,items:[],winstate:{}},action) {

    switch (action.type) {
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate:false
            })
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                items: action.items
            })

        case RECEIVE_USERS_ERROR:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true
            })
        case REQUEST_DEL_USERS:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'loading'
                }
            })
        case RECEIVE_DEL_USERS:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'success'
                }
            })
        case RECEIVE_DEL_USERS_ERROR:
            return Object.assign({}, state, {
                operation: {
                    type: 'delete',
                    state: 'failed'
                }
            })
        case CHECKBOX_CHECKED_USERS:
            return Object.assign({},state, {
                selectedRowKeys:action.selectedRowKeys
            })
        case REQUEST_ADD_USER:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: true,
                    winType: 'add',
                    confirmLoading: true
                }
            })
        case RECEIVE_ADD_USER:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'add',
                    confirmLoading: false
                }
            })
        case RECEIVE_ADD_USER_ERROR:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: true,
                    winType: 'add',
                    confirmLoading: false
                }
            })
        /*case RECEIVE_ADDORUPDATE_VOLUME_FORM:
            return Object.assign({}, state, {
                addVolumeForm: action.formdata
            })*/
        case OPEN_ADD_USER_WIN:
            return Object.assign({}, state, {
                addUserFormState: {
                    passBarShow: false, // 是否显示密码强度提示条
                    rePassBarShow: false,
                    passStrength: 'L', // 密码强度
                    rePassStrength: 'L',
                    usernameValidateStatus: '',
                    passwordValidateStatus: '',
                    rePasswdValidateStatus: '',
                    emailValidateStatus: '',
                    first_nameValidateStatus: '',
                    last_nameValidateStatus: '',
                    is_activeValidateStatus: '',
                    is_staffValidateStatus: '',
                    is_superuserValidateStatus: ''
                },
                addUserForm: {
                    "id": "",
                    "username": "",
                    "password": "",
                    "rePasswd": "",
                    "email": "",
                    "first_name": "",
                    "last_name": "",
                    "is_active": true,
                    "is_staff": true,
                    "is_superuser": false
                },
                winstate: {
                    openFormWin: true,
                    winType: 'add',
                    confirmLoading: false,
                    addBtnLoading: false
                }
            })
        case CLOSE_ADD_USER_WIN:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'add',
                    confirmLoading: false
                }
            })
        case OPEN_UPDATE_USER_WIN:
            return Object.assign({}, state, {
                addUserFormState: {
                    passBarShow: false, // 是否显示密码强度提示条
                    rePassBarShow: false,
                    passStrength: 'L', // 密码强度
                    rePassStrength: 'L',
                    usernameValidateStatus: '',
                    passwordValidateStatus: '',
                    rePasswdValidateStatus: '',
                    emailValidateStatus: '',
                    first_nameValidateStatus: '',
                    last_nameValidateStatus: '',
                    is_activeValidateStatus: '',
                    is_staffValidateStatus: '',
                    is_superuserValidateStatus: ''
                },
                addUserForm: {
                    "id": action.user.id,
                    "username": action.user.username,
                    "password": "",
                    "rePasswd": "",
                    "email": action.user.email,
                    "first_name": action.user.first_name,
                    "last_name": action.user.last_name,
                    "is_active": action.user.is_active,
                    "is_staff": action.user.is_staff,
                    "is_superuser": action.user.is_superuser
                },
                winstate: {
                    openFormWin: true,
                    winType: 'update',
                    confirmLoading: false,
                    updateBtnLoading: false
                }
            })
        case CLOSE_UPDATE_USER_WIN:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'update',
                    confirmLoading: false
                }
            })
        case RECEIVE_ADDORUPDATE_USER_FORM:
            return Object.assign({}, state, {
                addUserForm: action.form
            })
        case RECEIVE_USER_FORM_STATE:
            return Object.assign({}, state, {
                addUserFormState: Object.assign({}, state.addUserFormState, action.formState)
            })
        case REQUEST_UPDATE_USER:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: true,
                    winType: 'update',
                    confirmLoading: true
                }
            })
        case RECEIVE_UPDATE_USER:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: false,
                    winType: 'update',
                    confirmLoading: false
                }
            })
        case RECEIVE_UPDATE_USER_ERROR:
            return Object.assign({}, state, {
                winstate: {
                    openFormWin: true,
                    winType: 'update',
                    confirmLoading: false
                }
            })
        case OPEN_UPDATE_USER_PERM:
            return Object.assign({},state,{
                permission_modal:true
            })
        case CLOSE_UPDATE_USER_PERM:
            return Object.assign({},state,{
                permission_modal:false

            })
        case UPDATE_USER_PERM_OK:
            return Object.assign({},state,{
                items:state.items.map(function(item){
                    if(item.id==action.userperm.id){
                        item=action.userperm
                        return item
                    }{
                        return item
                    }
                })
            })
        case UPDATE_USER_PERM_ERR:
            return state
        default:
            return state
    }
}


function userManageState(state={isFetching:false,didInvalidate:true,items:[],winstate:{}},action) {
    return updateUserManageState(state,action)
}

export default userManageState
