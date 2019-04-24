import { combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { routerReducer } from 'react-router-redux'
import {REQUEST_DISKS,RECEIVE_DISKS,RECEIVE_DISKS_ERROR,TOGGLE_DISK} from '../actions/actions'
import pools from './poolreducer'
import volumes from './volumereducer'
import agents from './agentreducer'
import mirrors from './mirrorreducer'
import agentclone from './agentclonereducer'
import poolSetting from './poolsettingreducer'
import userState from './userreducer'
import aboutState from './aboutreducer'
import operationState from './operationreducer'
import snapshotslist from './snapshotslistreducer'
import agentdetail from './agentdetailreducer'
import agentlist from './agentlistreducer'
import userManageState from './userreducer'
import snapshots from './snapshotreducer'
import loginState from './loginreducer'
import cmdlogsState from './cmdlogsreducer'
import devLogState from './devlogreducer'
import taskState from './taskreducer'
import taskDetailState from './taskdetailreducer'
import portals from './portalreducer'
import luns from './lunreducer'
import logdetail from './logdetailreducer'
import schedules from './schedulereducer'
import snapshotDetail from './snapdetailreducer'
import clouds from './cloudreducer'
import clones from './clonereducer'
import host from './hostreducer'
import hostinitiators from './hostinitiatorsreducer'
import remotemirrors from './remotemirrorsreducer'
import iscsi from './iscsireducer'
import filersync from './filersyncreducer'
import fileclones from './fileclonereducer'
import samba from './sambareducer'
import nfs from './nfsreducer'
import cephpools from './cephpoolreducer'
import cephclients from './cephclientreducer'
import raid from './raidreducer'
import config from './configreducer'
import osds from './osdsreducer'
import volumegroup from './volumegroupreducer'
import scripts from './scriptreducer'
import agentmirror from './agentmirrorreducer'
import deadline from './deadlinereducer'
import audit from './auditreducer'
import ha from './grouphareducer'
import hostgroup from './hostgroupreducer'









function fetchDisks(state={isFetching:false,didInvalidate:false,items:[]},action) {
    switch (action.type) {
        case REQUEST_DISKS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                selectedDisks:[],
                selectedRowKeys:[]
            })
        case RECEIVE_DISKS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
            })
        case RECEIVE_DISKS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })

        case TOGGLE_DISK:
            return Object.assign({},state,{
                selectedDisks:action.selectedDisks,
                selectedRowKeys:action.selectedRowKeys
            })
            
    
        default:
            return state
            
    }
}
function disks(state={isFetching:false,didInvalidate:true,items:[]},action) {
    return fetchDisks(state,action)
}

const rootReducer = combineReducers({
    disks,
    pools,
    volumes,
    luns,
    portals,
    agents,
    mirrors,
    agentdetail,
    agentlist,
    clouds,
    clones,
    snapshots,
    snapshotslist,
    snapshotDetail,
    logdetail,
    poolSetting,
    userManageState,
    loginState,
    cmdlogsState,
    devLogState,
    aboutState,
    operationState,
    taskState,
    taskDetailState,
    schedules,
    router: routerStateReducer,
    routing: routerReducer,
    agentclone,
    host,
    remotemirrors,
    hostinitiators,
    iscsi,
    filersync,
    fileclones,
    samba,
    nfs,
    cephpools,
    cephclients,
	raid,
    config,
    osds,
    volumegroup,
    scripts,
    agentmirror,
    deadline,
    audit,
    ha,
    hostgroup,
})

export default rootReducer
