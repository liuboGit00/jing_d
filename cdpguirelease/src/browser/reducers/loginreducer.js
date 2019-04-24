/**
 * Created by tanglinhai on 2016/9/5.
 */
import {
    RECEIVE_ADDORUPDATE_LOGIN_FORM,
    RECEIVE_LOGIN_FORM_STATE,
    RECEIVE_LOGIN_OK
} from '../actions/loginactions'

function updateLoginState(state={isLogining:false,loginFormState:{usernameValidateStatus:'',passwordValidateStatus:''},loginForm:{username:'',password:''}},action) {

    switch (action.type) {
        case RECEIVE_ADDORUPDATE_LOGIN_FORM:
            return Object.assign({}, state, {
                loginForm: action.form
            })
        case RECEIVE_LOGIN_FORM_STATE:
            return Object.assign({}, state, {
                loginFormState: Object.assign({}, state.loginFormState, action.formState)
            })
        case RECEIVE_LOGIN_OK:
            return Object.assign({}, state, {
                isLogining:true,
                isLogin:true   
            })
        
        default:
            return state
    }
}

function loginState(state={isLogining:false,loginFormState:{usernameValidateStatus:'',passwordValidateStatus:''},loginForm:{username:'',password:''}},action) {
    return updateLoginState(state,action)
}

export default loginState
