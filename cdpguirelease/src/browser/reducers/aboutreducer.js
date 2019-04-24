/**
 * Created by tanglinhai on 2016/9/13.
 */
import {
    SHOW_CURRENT_MENU
} from '../actions/aboutactions'

function updateAboutState(state={isFetching:false,didInvalidate:true, menuIndex:'1'},action) {

    switch (action.type) {
        case SHOW_CURRENT_MENU:
            return Object.assign({}, state, {
                menuIndex: action.menuIndex
            })
        default:
            return state
    }
}

function aboutState(state={isFetching:false,didInvalidate:true, menuIndex:'1'},action) {
    return updateAboutState(state,action)
}

export default aboutState
