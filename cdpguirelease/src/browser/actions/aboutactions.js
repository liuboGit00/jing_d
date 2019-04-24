/**
 * Created by tanglinhai on 2016/9/13.
 */
//import 'babel-polyfill'
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,devLogpath,username,password} from '../confs/host'

export const SHOW_CURRENT_MENU = 'SHOW_CURRENT_MENU'

/* select devLog */
export function show_current_menu(menuIndex=0) {
    return {
        type:SHOW_CURRENT_MENU,
        menuIndex
    }
}