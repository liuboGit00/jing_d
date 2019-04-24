import React, { Component,PropTypes } from 'react'
import {Provider,connect}  from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers/reducers'

import { syncHistoryWithStore } from 'react-router-redux'
// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink,browserHistory} from 'react-router'

// 引入Antd的导航组件
import { Menu, Icon, Switch } from 'antd'
import { createHistory } from 'history';
/*
 import {
 ReduxRouter,
 routerStateReducer,
 reduxReactRouter,
 push,
 } from 'redux-router';
 */
import DiskContainer from './diskcontainer'
/*import Container from './rootcontainer'*/
import Main from '../components/main'
import LoginContainer from './user/logincontainer'
import PoolsContainer from './pool/poolscontainer'
import PoolSettingContainer from './pool/poolsettingcontainer'
import VolumesContainer from './volumecontainer'
import PoolDetailContainer from './pool/pooldetailcontainer'
import VolumeDetailContainer from './volumedetailcontainer'
import CmdlogsContainer from './log/cmdlogscontainer'
import DevLogContainer from './log/devlogcontainer'
import TaskContainer from './task/taskcontainer'
import TaskDetailContainer from './task/taskdetailcontainer'



import AgentContainer from './agent/agentcontainer'
import UsersContainer from './user/usercontainer'
import SnapshotContainer from './snapshotcontainer'
import SnapshotsListContainer from './snapshotslistcontainer'
import SnapDetailContainer from './snapdetailcontainer'
import AgentDetailContainer from './agent/agentdetailcontainer'
import AboutContainer from './aboutcontainer'
import AgentListContainer from './agent/agentlistcontainer'

import LunContainer from './luncontainer'
import MirrorContainer from './agent/mirrorcontainer'
import MirrorDetailContainer from './agent/mirrordetailcontainer'
import CloneContainer from './agent/clonecontainer'
import HostContainer from './hosts/hostcontainer' 
import HostInitiatorsContainer from './hosts/hostinitiatorscontainer' 
import RemotemirrorsContainer from './hosts/remotemirrorscontainer'




//import TaskType from '../components/task/tasktype'
import CreateTaskContainer from './task/createtaskcontainer'
import TaskArgContainer from './task/taskargcontainer'
import PeriodContainer from './task/periodcontainer'
import ScheduleContainer from './task/schedulecontainer'
import CloudContainer from './cloud/cloudcontainer'
import ClouddetailContainer from './cloud/clouddetailcontainer'
import CloudhostdetailContainer from './cloud/cloudhostdetailcontainer'
import CloudlunContainer from './cloud/cloudluncontainer'



import IscsiContainer from './iscsi/iscsicontainer'
import TargetDetailContainer from './iscsi/targetdetailcontainer'
import FilersyncContainer from './filersync/filersynccontainer'
import FileclonesContainer from './fileclone/fileclonecontainer'
import SambaContainer from './samba/sambacontainer'
import NfsContainer from './nfs/nfscontainer'
import CephpoolsContainer from './pool/cephpoolscontainer'
import CephclientContainer from './ceph/cephclientcontainer'


import RaidContainer from './raid/raidcontainer'
import ConfigContainer from './config/configcontainer'
import OsdsContainer from './ceph/osdscontainer'
import VolumegroupContainer from './volumegroupcontainer'
import AgentmirrorContainer  from'./agent/agentmirrorcontainer'
import DeadlineContainer from './config/deadlinecontainer'
import AuditContainer from './config/auditcontainer'
import AuditDetailContainer from './config/auditdetailcontainer'
import ScriptDetailContainer from './agent/scriptdetailcontainer'
import EchartContainer from './config/echartcontainer'
import HaContainer from './groupha/grouphacontainer'
import HostgroupContainer from './hosts/hostgroupcontainer'
import HosrgroupPropertyContainer from './hosts/hostgrouppropertycontainer'


 





//import DevTools from './devtool'  // 引入Redux调试工具DevTools

//import Disk from '../components/disk'
//import NavigateBar from '../components/nav'

import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'
// 引入主体样式文件
import '../public/css/base.css';
import '../public/css/main.less';

// Configure routes like normal




const loggerMiddleware = createLogger()
/*
 const store = createStore(
 rootReducer,
 //{disks:{items:[]}},
 applyMiddleware(
 thunkMiddleware, // lets us dispatch() functions
 loggerMiddleware // neat middleware that logs actions
 )
 )*/

const store = compose(
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ),
    // reduxReactRouter({
    // routes,
    //createHistory
    //}),
    // DevTools.instrument()
    //  devTools()

)(createStore)(rootReducer);




// 配置导航

const history = syncHistoryWithStore(hashHistory, store)
class Root extends Component {

    render() {
    console.log() 

        return (
            <Provider store={store} >
                <Router history={history}>
                    <Route path="/" component={Main}>
                        <IndexRoute component={DiskContainer}/>
                        <Route path="login" component={LoginContainer} />
                        <Route path="users" component={UsersContainer} />
                        <Route path="disks" component={DiskContainer} />
                        <Route path="pools" component={PoolsContainer} />
                        <Route path="pool/setting/:poolId/type/:type" component={PoolSettingContainer} />
                        <Route path="/pools/:poolId" component={PoolDetailContainer} />
                        <Route path="volumes" component={VolumesContainer} />
                        <Route path="/volumes/:volumeId" component={VolumeDetailContainer} />
                        <Route path="/volumes/:volumeId/snapshots" component={VolumeDetailContainer} />
                        <Route path="agents" component={AgentContainer} />
                        <Route path="cmdlogs" component={CmdlogsContainer} />
                        <Route path="logdev" component={DevLogContainer} />
                        <Route path="snapshotslist" component={SnapshotsListContainer} />
                        <Route path="/agents/:agentId" component={AgentDetailContainer} />
                        <Route path="cmdlogs" component={CmdlogsContainer} />
                        <Route path="register" component={AgentListContainer} />
                        <Route path="about" component={AboutContainer} />
                        <Route path="results" component={TaskContainer} />
                        <Route path="/results/:task_id" component={TaskDetailContainer} />
                        <Route path="luns" component={LunContainer} />
                        <Route path="createtask" component={CreateTaskContainer} />
                        <Route path="taskarg" component={TaskArgContainer} />
                        <Route path="period" component={PeriodContainer} />
                        <Route path="/snapshots/:snapshotId" component={SnapDetailContainer} />
                        <Route path="schedules" component={ScheduleContainer} />
                        <Route path="mirrors" component={MirrorContainer} />
                        <Route path="/mirrors/:mirrorsId" component={MirrorDetailContainer} />
                        <Route path='clouds' component={CloudContainer} />
                        <Route path="clones" component={CloneContainer} />
                        <Route path="hosts" component={HostContainer} />
                        <Route path="/hosts/:hostsId" component={HostInitiatorsContainer} />
                        <Route path="remotemirrors" component={RemotemirrorsContainer} />
                        <Route path="iscsiportals" component={IscsiContainer} />
                        <Route path="/iscsitarget/:targetId" component={TargetDetailContainer} />
                        <Route path="rsyncs" component={FilersyncContainer} />
                        <Route path="fileclones" component={FileclonesContainer} />
                        <Route path="samba" component={SambaContainer} />
                        <Route path="nfs" component={NfsContainer} />
                        <Route path="cephpools" component={CephpoolsContainer} />
                        <Route path="cephclients" component={CephclientContainer} />
						<Route path="raid" component={RaidContainer} />
                        <Route path="config" component={ConfigContainer} />
                        <Route path="osds" component={OsdsContainer} />
                        <Route path="volumegroup" component={VolumegroupContainer} />
                        <Route path="agentmirror" component={AgentmirrorContainer} />
                        <Route path="deadline" component={DeadlineContainer} />
                        <Route path="audit" component={AuditContainer} />
                        <Route path="/audit/:auditId" component={AuditDetailContainer} />
                        <Route path="/scripts/:scriptId" component={ScriptDetailContainer} />
                        <Route path="echart" component={EchartContainer} />
                        <Route path="groupHA" component={HaContainer} />
                        <Route path="hostgroups" component={HostgroupContainer} />
                        <Route path="/hostgroups/:hostgroupId" component={HosrgroupPropertyContainer} />
                        <Route path="/clouds/:cloudId" component={ClouddetailContainer} />
                        <Route path="/clouds/:cloudId/:cloudhost" component={CloudhostdetailContainer} />
                        <Route path="/clouds/luns/:name/:id" component={CloudlunContainer} />











                    </Route>
                </Router>
            </Provider>
        )
    }
}
export default Root;
