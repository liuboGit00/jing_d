import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetch_mirrors,echo_create_mirror_modal,close_create_mirror_modal,echo_modify_mirror_modal,
        close_modify_mirror_modal,toggle_mirrors,delete_mirrors,save_grains,check_online,create_mirror,
        install_drbd,echo_install_drbd_modal,close_install_drbd_modal,close_initialize_modal,
        echo_initialize_modal,fetch_initialize,echo_sync_modal,close_sync_modal,fetch_sync,echo_uninstall_modal,
        close_uninstall_modal,fetch_uninstall,echo_syncstatus_modal,close_syncstatus_modal,
        fetch_syncstatus,echo_installagent_modal,close_installagent_modal,fetch_installagent,
        fetch_ipaddresses,fetch_windows,
        setagent_status,echo_setagent_modal,close_setagent_modal,
        agent_upordown,echo_agent_upordown_modal,close_agent_upordown_modal,
        agent_pausesync,echo_agent_pausesync_modal,close_agent_pausesync_modal,
        agent_resumesync,echo_agent_resumesync_modal,close_agent_resumesync_modal,
        agent_getagentrole,echo_agent_getagentrole_modal,close_agent_getagentrole_modal,
        echo_agent_localoragent_modal,close_agent_localoragent_modal,get_agent_mirror,
        echo_agent_agentorlocal_modal,close_agent_agentorlocal_modal,
        echo_modify_mirror_agent_modal,close_modify_mirror_agent_modal,create_modify_mirror_agent,
        echo_select_agent_url,close_select_agent_url,submit_select_agent_url,
        close_agent_openrole,echo_agent_openrole,
        echo_opensyncstatus_modal,close_opensyncstatus_modal,
        get_agent_drbdstatus,search_mirror,
        echo_clear_mirror,close_clear_mirror,echo_prefer_host,close_prefer_host,echo_install_pcs,
        close_install_pcs,clear_mirror,prefer_host,pcs_install,
        create_host_to_host,echo_host_to_host,close_host_to_host,
    } from '../../actions/mirroraction'
import {fetch_agents,echo_create_volume_modal,close_create_volume_modal,create_volume,fetch_volumes,
        loading_modal,
} from '../../actions/actions'
import Mirror from '../../components/agent/mirrors'
import Volumes from '../../components/volume/volume'


import CreateMirror from '../../components/agent/create_mirrors'

import InstallDrbd from '../../components/agent/install_drbd'
import Initialize from '../../components/agent/initialize'
import Sync from '../../components/agent/sync'
import Uninstall from '../../components/agent/uninstall'
import Syncstatus from '../../components/agent/syncstatus'
import Installagent from '../../components/agent/install_agent'
import CreateVolume from '../../components/volume/create_volume'
import {fetch_pools} from '../../actions/poolactions'
import Setagent from '../../components/agent/setagent'
import Upordown from '../../components/agent/upordown'
import Pausesync from '../../components/agent/pausesync'
import Resumesync from '../../components/agent/resumesync'
import Getagentrole from '../../components/agent/getagentrole'
import Localoragent from '../../components/agent/localoragent'
import Agentorlocal from '../../components/agent/agentorlocal'
import ModifyMirrorAgent from '../../components/agent/modify_mirror_agent'
import SelectAgentUrl from '../../components/agent/select_agent_url'
import Openrole from '../../components/agent/openrole'
import Opensyncstatus from '../../components/agent/opensyncstatus'
import {fetch_script} from '../../actions/scriptaction'
import {fetch_host} from '../../actions/hostactions'
import Prefermirrorhost from '../../components/agent/prefer_mirror_host'
import CreateHostToHost  from '../../components/agent/mirror_host_host'



import {Row, Col, Menu,Icon, Button, Input, Modal, Spin,Table,Alert,message} from 'antd'
import SearchInput from '../../components/common/searchinput'

import auth from '../../utils/auth'
import {Link} from 'react-router'
var setIntervalKey = ''
class MirrorContainer extends Component {
    constructor(props) {
        super(props)
        this.handle_create_mirror = this.handle_create_mirror.bind(this)
        this.handle_close_create_mirror = this.handle_close_create_mirror.bind(this)
        this.handle_delete_mirror = this.handle_delete_mirror.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit_create_mirror = this.submit_create_mirror.bind(this)
        this.handle_install_drbd = this.handle_install_drbd.bind(this)
        this.submit_install_drbd = this.submit_install_drbd.bind(this)
        this.handle_close_install_drbd = this.handle_close_install_drbd.bind(this)
        this.handle_echo_initialize = this.handle_echo_initialize.bind(this)
        this.handle_close_initialize= this.handle_close_initialize.bind(this)
        this.submit_initialize = this.submit_initialize.bind(this)
        this.handle_echo_sync = this.handle_echo_sync.bind(this)
        this.handle_close_sync= this.handle_close_sync.bind(this)
        this.submit_sync = this.submit_sync.bind(this)
        this.handle_echo_uninstall = this.handle_echo_uninstall.bind(this)
        this.handle_close_uninstall = this.handle_close_uninstall.bind(this)
        this.submit_uninstall = this.submit_uninstall.bind(this)
        this.handle_close_syncstatus = this.handle_close_syncstatus.bind(this)
        this.submit_syncstatus = this.submit_syncstatus.bind(this)
        this.handle_echo_installagent = this.handle_echo_installagent.bind(this)
        this.handle_close_installagent = this.handle_close_installagent.bind(this)
        this.submit_installagent = this.submit_installagent.bind(this)
        this.handle_mirror_volume = this.handle_mirror_volume.bind(this)
        this.handle_close_volume = this.handle_close_volume.bind(this)
        this.submit_create_volume = this.submit_create_volume.bind(this)
        this.handle_echo_setagent = this.handle_echo_setagent.bind(this)
        this.submit_setagent = this.submit_setagent.bind(this)
        this.handle_close_setagent = this.handle_close_setagent.bind(this)
        this.handle_echo_agent_upordown = this.handle_echo_agent_upordown.bind(this)
        this.submit_agent_upordown = this.submit_agent_upordown.bind(this)
        this.handle_close_agent_upordown = this.handle_close_agent_upordown.bind(this)
        this.handle_echo_agent_pausesync = this.handle_echo_agent_pausesync.bind(this)
        this.submit_agent_pausesync = this.submit_agent_pausesync.bind(this)
        this.handle_close_agent_pausesync = this.handle_close_agent_pausesync.bind(this)
        this.handle_echo_agent_resumesync = this.handle_echo_agent_resumesync.bind(this)
        this.submit_agent_resumesync = this.submit_agent_resumesync.bind(this)
        this.handle_close_agent_resumesync = this.handle_close_agent_resumesync.bind(this)
        this.handle_echo_agent_getagentrole = this.handle_echo_agent_getagentrole.bind(this)
        this.submit_agent_getagentrole = this.submit_agent_getagentrole.bind(this)
        this.handle_close_agent_getagentrole = this.handle_close_agent_getagentrole.bind(this)
        this.handle_echo_agent_localoragent = this.handle_echo_agent_localoragent.bind(this)
        this.submit_agent_localoragent = this.submit_agent_localoragent.bind(this)
        this.handle_close_agent_localoragent = this.handle_close_agent_localoragent.bind(this)
        this.handle_echo_agent_agentorlocal = this.handle_echo_agent_agentorlocal.bind(this)
        this.submit_agent_agentorlocal = this.submit_agent_agentorlocal.bind(this)
        this.handle_close_agent_agentorlocal = this.handle_close_agent_agentorlocal.bind(this)
        this.handle_echo_modify_agent = this.handle_echo_modify_agent.bind(this)
        this.submit_modify_agent = this.submit_modify_agent.bind(this)
        this.handle_close_modify_agent = this.handle_close_modify_agent.bind(this)
        this.handle_echo_select_agent_url = this.handle_echo_select_agent_url.bind(this)
        this.handle_close_select_agent_url = this.handle_close_select_agent_url.bind(this)
        this.submit_select_agent_url = this.submit_select_agent_url.bind(this)
        this.handle_close_agent_openrole = this.handle_close_agent_openrole.bind(this)
        this.handle_echo_syncstatus = this.handle_echo_syncstatus.bind(this)
        this.handle_close_opensyncstatus = this.handle_close_opensyncstatus.bind(this)
        this.handle_echo_clear_mirror  = this.handle_echo_clear_mirror.bind(this)
        this.handle_close_clear_mirror  = this.handle_close_clear_mirror.bind(this)
        this.handle_echo_prefer_host  = this.handle_echo_prefer_host.bind(this)
        this.handle_close_prefer_host  = this.handle_close_prefer_host.bind(this)
        this.handle_echo_install_pcs  = this.handle_echo_install_pcs.bind(this)
        this.handle_close_install_pcs  = this.handle_close_install_pcs.bind(this)
        this.handle_clear_mirror = this.handle_clear_mirror.bind(this)
        this.handle_prefer_host = this.handle_prefer_host.bind(this)
        this.handle_pcs_install = this.handle_pcs_install.bind(this)
        this.handle_create_host_to_host = this.handle_create_host_to_host.bind(this)
        this.handle_close_host_to_host = this.handle_close_host_to_host.bind(this)
        this.handle_echo_host_to_host = this.handle_echo_host_to_host.bind(this)


    }
    componentDidMount(){
        const {dispatch} = this.props
        const {didInvalidate} = this.props.mirrors
        const {mirrors,volumes,pools,agents,scripts,host} = this.props
        if(mirrors.items.length <= 0){
            dispatch(fetch_ipaddresses())
        }
        if (volumes.items.length <= 0){
            dispatch(fetch_volumes());
        }
        if (mirrors.items.length <= 0){
            dispatch(fetch_mirrors());
        } 
        if(pools.items.length <= 0){
            // console.log(pools)
            dispatch(fetch_pools())
        }
        if(agents.items.length <= 0){
            dispatch(fetch_agents())
        }
        if(scripts.items.length<=0){
            dispatch(fetch_script())
        }
        if(host.items.length<=0){
            dispatch(fetch_host())
        }
        // setIntervalKey = setInterval(function(){
        //      dispatch(fetch_mirrors())
        // },300000)
    }
    componentWillUnmount(){
        clearInterval(setIntervalKey)
    }
    handle_mirror_volume(){
        const {dispatch} = this.props
        dispatch(echo_create_volume_modal())

    }

    handle_close_volume(){
        const {dispatch} = this.props
        dispatch(close_create_volume_modal())
    }
    submit_create_volume(volume){
        const {dispatch,volumes} = this.props
        dispatch(loading_modal())
        var parent = /^[A-Za-z0-9]+$/
        if(!volume.vol_name || !parent.test(volume.vol_name)){
            return message.error('请重新输入卷名')
        }
        for(let i=0;i<volumes.items.length;i++){
            // console.log(volume.vol_name)
            if(volume.vol_name == volumes.items[i].name){
                return message.error('卷名已被使用')
            }
        }
        dispatch(create_volume(volume,auth))
    }
    handle_create_mirror() {
        // console.log(this.props)
        const {dispatch} = this.props
        const confirm = Modal.confirm
        confirm({
            title:'镜像',
            content:'请选择创建镜像的类型。',
            okText: '主机端',
            cancelText: '客户端',
            okType:'secondary',
            maskClosable:true,
            onOk(){
                dispatch(echo_host_to_host())
            },
            onCancel(){
                // console.log(this)
                if(this==undefined){
                    dispatch(echo_create_mirror_modal())
                }
                
            },
        })
    }  
    handle_install_drbd(id) {
        // console.log(id)
        const {dispatch} = this.props
        dispatch(echo_install_drbd_modal(id))
    }
    handle_echo_initialize(id) {
        // console.log(id)
        const {dispatch} = this.props
        dispatch(echo_initialize_modal(id))
    }
    handle_echo_sync(id) {
        // console.log(id)
        const {dispatch} = this.props
        dispatch(echo_sync_modal(id))
    }
    handle_echo_uninstall(id){
        // console.log(id)
        const{dispatch} = this.props
        dispatch(echo_uninstall_modal(id))
    }
    handle_echo_installagent(id,agentid,agentname){
        // console.log(agentid)
        const{dispatch} = this.props
        dispatch(echo_installagent_modal(id,agentid,agentname))
    }
    handle_close_create_mirror() {
        const {dispatch} = this.props
        dispatch(close_create_mirror_modal())
    }
    handle_close_install_drbd() {
        const {dispatch} = this.props
        dispatch(close_install_drbd_modal())
    }
    handle_close_initialize() {
        const {dispatch} = this.props
        dispatch(close_initialize_modal())
    }
    handle_close_sync() {
        const {dispatch} = this.props
        dispatch(close_sync_modal())
    }
    handle_close_uninstall(){
        const{dispatch}= this.props
        dispatch(close_uninstall_modal())
    }
    handle_close_syncstatus(){
        const{dispatch}= this.props
        dispatch(close_syncstatus_modal())
    }
    handle_close_installagent(){
        const{dispatch}= this.props
        dispatch(close_installagent_modal())
    }
    handle_echo_setagent(id,agentid,agentname){
        // console.log(id,agentid,agentname)
        const{dispatch}= this.props
        dispatch(echo_setagent_modal(id,agentid,agentname))
    }
    handle_close_setagent(){
        const {dispatch} = this.props
        dispatch(close_setagent_modal())
    }

    handle_delete_mirror() {
        const {dispatch} = this.props
        const {selectedMirrors} = this.props.mirrors
        const confirm = Modal.confirm;
        if (selectedMirrors.length > 0){
            confirm({
                title: '您是否确认要删除已选择的这些镜像',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_mirrors(selectedMirrors,auth))
                },
                onCancel() { },
            });
        }
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_mirrors(selectedRowKeys, selectedRows))
    }
    submit_create_mirror(mirror){
        // console.log(mirror)
         const {dispatch,mirrors} = this.props
         for(let i=0;i<mirrors.items.length;i++){
             if(mirrors.items[i].name == mirror.mir_source_agentvolumename){
                return message.error('镜像名字已被使用')
             }
         }
        
        dispatch(get_agent_mirror(mirror,auth))
    }
    submit_install_drbd(mirror){
        // console.log(mirror)
         const {dispatch} = this.props
         dispatch(install_drbd(mirror,auth))
    }
    submit_initialize(mirror){
         const {dispatch} = this.props
         dispatch(fetch_initialize(mirror,auth))

    }
    submit_sync(mirror){
         const {dispatch} = this.props
         dispatch(fetch_sync(mirror,auth))
    }
    submit_uninstall(mirror){
        const{dispatch} = this.props
        dispatch(fetch_uninstall(mirror,auth))

    }
    handle_echo_syncstatus(mirror,agentid,agentname){
        // console.log(mirror,agentid,agentname)
        const{dispatch} = this.props
        dispatch(echo_syncstatus_modal(mirror,agentid,agentname))
    }
    submit_syncstatus(mirror){
        // console.log(mirror.agentid)
        const{dispatch} = this.props
       
        if(mirror.agentid != undefined){
            dispatch(fetch_syncstatus(mirror,auth))
            dispatch(close_syncstatus_modal())
            dispatch(echo_opensyncstatus_modal())
        }
    }
    handle_close_opensyncstatus(){
        const{dispatch} = this.props
        dispatch(close_opensyncstatus_modal())
    }
    submit_installagent(mirror){
        // console.log(mirror)
        const{dispatch} = this.props
        dispatch(fetch_installagent(mirror,auth))
    }
    submit_setagent(mirror){
        // console.log(mirror)
        const{dispatch} = this.props
        if (mirror.agentid) {
            dispatch(setagent_status(mirror,auth))
        }else{
            message.warning('请选择客户端')
        }
        
    }
    

    handleSearch(searchKey) {
        console.log(searchKey=='')
        if(searchKey==''){
            this.props.dispatch(fetch_mirrors({
                searchKey:searchKey
            }));
        }else{
            this.props.dispatch(search_mirror(searchKey:searchKey))
        }
    }
    handle_echo_agent_upordown(id,agentid,agentname){
        // console.log(id,agentid,agentname)
        const{dispatch}= this.props
        dispatch(echo_agent_upordown_modal(id,agentid,agentname))
    }
    handle_close_agent_upordown(){
        const {dispatch} = this.props
        dispatch(close_agent_upordown_modal())
    }
    submit_agent_upordown(mirror){
        const {dispatch} =this.props
        if(mirror.agentid){
            dispatch(agent_upordown(mirror,auth))
        }else{
            message.warning('请选择客户端')
        }
        //
    }
    handle_echo_agent_pausesync(id,agentid,agentname){
        // console.log(id,agentid)
        const{dispatch}= this.props
        dispatch(echo_agent_pausesync_modal(id,agentid,agentname))
    }
    handle_close_agent_pausesync(){
        const {dispatch} = this.props
        dispatch(close_agent_pausesync_modal())
    }
    submit_agent_pausesync(mirror){
        // console.log(mirror)
        const {dispatch} =this.props
        if (mirror.agentid) {
            dispatch(agent_pausesync(mirror,auth))
        }else{
            message.warning('请选择客户端')
        }
    }
    handle_echo_agent_resumesync(id,agentid,agentname){
        // console.log(id,agentid)
        const{dispatch}= this.props
        dispatch(echo_agent_resumesync_modal(id,agentid,agentname))
    }
    handle_close_agent_resumesync(){
        const {dispatch} = this.props
        dispatch(close_agent_resumesync_modal())
    }
    submit_agent_resumesync(mirror){
        // console.log(mirror)
        const {dispatch} =this.props
        if(mirror.agentid){
            dispatch(agent_resumesync(mirror,auth))
        }else{
            message.warning('请选择客户端')
        }
    }
    handle_echo_agent_getagentrole(id,agentid,agentname){
        // console.log(id,agentid)
        const{dispatch}= this.props
        // dispatch(agent_getagentrole(id,agentid,auth))
        dispatch(echo_agent_getagentrole_modal(id,agentid,agentname))
        
    }
    handle_close_agent_getagentrole(){
        const {dispatch} = this.props
        dispatch(close_agent_getagentrole_modal())
    }
    submit_agent_getagentrole(mirror){
        // console.log(mirror)
        const {dispatch} =this.props
        dispatch(agent_getagentrole(mirror.id,mirror.agentid,auth))
    }
    handle_echo_agent_localoragent(){
        // console.log(id,agentid)

        const{dispatch}= this.props
        dispatch(echo_agent_localoragent_modal())
        dispatch(close_create_mirror_modal())
        // this.submit_create_mirror()

    }
    handle_close_agent_localoragent(){
        const {dispatch} = this.props
        dispatch(close_agent_localoragent_modal())
    }
    submit_agent_localoragent(mirror){
        console.log(mirror)
        const {dispatch,mirrors} =this.props
        dispatch(close_agent_localoragent_modal())
        dispatch(create_mirror(mirror,mirrors.getagentmirrors,auth))
    }
    handle_echo_agent_agentorlocal(){
        // console.log(id,agentid)
        const{dispatch}= this.props
        dispatch(close_create_mirror_modal())
        dispatch(echo_agent_agentorlocal_modal())
        // this.submit_create_mirror()
    }
    handle_close_agent_agentorlocal(){
        const {dispatch} = this.props
        dispatch(close_agent_agentorlocal_modal())
    }
    submit_agent_agentorlocal(mirror){
        console.log(mirror)
        const {dispatch,mirrors} =this.props
        dispatch(close_agent_agentorlocal_modal())
        dispatch(create_mirror(mirror,mirrors.getagentmirrors,auth))
    }
    handle_echo_modify_agent(id){
        // console.log(id)
        const{dispatch}= this.props
        dispatch(echo_modify_mirror_agent_modal()(id))
        // this.submit_create_mirror()
    }role
    handle_close_modify_agent(){
        const {dispatch} = this.props
        dispatch(close_modify_mirror_agent_modal())
    }
    submit_modify_agent(mirror){
        console.log(mirror)
        const {dispatch} =this.props
        dispatch(create_modify_mirror_agent(mirror,auth))
    }
    handle_echo_select_agent_url(id){
        // console.log(id)
        const{dispatch}= this.props
        dispatch(echo_select_agent_url(id))
        // this.submit_create_mirror()
    }
    handle_close_select_agent_url(){
        const {dispatch} = this.props
        dispatch(close_select_agent_url())
    }
    submit_select_agent_url(mirror){
        console.log(mirror)
        const {dispatch} =this.props
        dispatch(submit_select_agent_url(mirror,auth))
        dispatch(close_select_agent_url())
        dispatch(echo_modify_mirror_agent_modal())
    }
    handle_close_agent_openrole(){
        const {dispatch}=this.props;
        dispatch(close_agent_openrole())
    }
    handle_echo_clear_mirror(){
        const {dispatch}=this.props
        dispatch(echo_clear_mirror())
    }
    handle_close_clear_mirror(){
        const {dispatch}=this.props
        dispatch(close_clear_mirror())
    }
    handle_echo_prefer_host(id){
        // console.log(id)
        const {dispatch}=this.props
        dispatch(echo_prefer_host(id))
    }
    handle_close_prefer_host(){
        const {dispatch}=this.props
        dispatch(close_prefer_host())
    }
    handle_echo_install_pcs(){
        const {dispatch}=this.props
        dispatch(echo_install_pcs())
    }
    handle_close_install_pcs(){
        const {dispatch}=this.props
        dispatch(close_install_pcs())
    }
    handle_clear_mirror(id){
        const {dispatch}=this.props
        const confirm = Modal.confirm
        confirm({
                title: 'CDP镜像',
                content: '是否强制连接状态一致，免数据传输。',
                onOk() {
                   dispatch(clear_mirror(id))
                },
                onCancel(){},
        })
        
    }
    handle_prefer_host(value){
        console.log(value)
        const {dispatch}=this.props
        dispatch(prefer_host(value))
    }
    handle_pcs_install(id){
        const {dispatch}=this.props
        const confirm = Modal.confirm
        confirm({
                title: 'CDP镜像',
                content: '是否开启本地端之间的数据传输。',
                onOk() {
                   dispatch(pcs_install(id))
                },
                onCancel(){},
        })
        
    }
    handle_create_host_to_host(value){
        console.log(value)
        const {dispatch} = this.props
        // dispatch(create_host_to_host(value))

    }
    handle_close_host_to_host(){
        const {dispatch} = this.props
        dispatch(close_host_to_host())
    }
    handle_echo_host_to_host(){
        const {dispatch} = this.props
        dispatch(close_host_to_host())
    }
    render() {
        const {mirrors,pools,volumes,dispatch,agents,scripts,host} = this.props
        if(mirrors.drbdstatus!=undefined){
            for(let i=0;i<mirrors.drbdstatus.length;i++){
                if( mirrors.drbdstatus[i][1] != mirrors.drbdstatusid[i]){
                    (mirrors.drbdstatus[i]).push(mirrors.drbdstatusid[i]);
                }
            
            } 
            for(let i=0;i<mirrors.items.length;i++){
                for(let j=0;j<mirrors.drbdstatus.length;j++){
                    if(mirrors.items[i].id == (mirrors.drbdstatus[j])[1]){
                        mirrors.items[i].getlocalendpoint[0].drbdstatus = (mirrors.drbdstatus[j])[0]
                    }
                    // console.log(mirrors.items[i].getlocalendpoint[0].drbdstatus)
                }
            }
        
        }


         if(mirrors.items.length !=undefined){
            if(mirrors.items.length>0){
                for (let i = 0; i <mirrors.items.length; i++) {
                    // if(mirrors.items[i].getlocalendpoint[0]&&mirrors.address != undefined){
                    //     for(let j=0;j<mirrors.address.length;j++){
                    //         if(mirrors.items[i].getlocalendpoint[0].ipaddress == mirrors.address[j].url){
                    //             console.log(mirrors.items[i].getlocalendpoint[0].ipaddress , mirrors.address[j].address)
                    //             mirrors.items[i].getlocalendpoint[0].ipaddress = mirrors.address[j].address
                    //         }
                    //     }
                    // }
                    // console.log(mirrors.role)
                    if(mirrors.role!=undefined&&mirrors.role.length>0){
                        for(let n=0;n<mirrors.role.length;n++){
                            // console.log(mirrors.role[n].split('$')[1])
                            if(mirrors.items[i].id == mirrors.role[n].split('$')[1]&& mirrors.items[i].getstatus.length<2){
                                mirrors.items[i].getstatus.push({role:mirrors.role[n].split('$')[0]}) 
                            }
                        }
                    }
                     
                }
            }
        }
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />镜像信息</label>
                </Row>
                <Row className="table_toolbar">
                    <SearchInput ref="searchInput" placeholder="搜 索" onSearch={this.handleSearch.bind(this)}></SearchInput>
                    <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_mirror}>删除</Button>
                    <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_mirror}>创建</Button>
                    
                </Row>
                <br/>
                <Mirror items={mirrors.searchStatue==true?mirrors.search:mirrors.items} onSelectagenturl={this.handle_echo_select_agent_url} onGetagentrole={this.handle_echo_agent_getagentrole} onResumesync={this.handle_echo_agent_resumesync} onPausesync={this.handle_echo_agent_pausesync} onAgentupordown={this.handle_echo_agent_upordown} onSetagent={this.handle_echo_setagent}  agent={agents.items}  onChange={this.handleChange} onInstall={this.handle_install_drbd} onInitialize={this.handle_echo_initialize} onSync={this.handle_echo_sync} 
                    onPrefermirror={this.handle_echo_prefer_host} onPcsinstall={this.handle_pcs_install} onClearmap={this.handle_clear_mirror} onUninstall={this.handle_echo_uninstall} onSyncstatus={this.handle_echo_syncstatus}  onInstallagent={this.handle_echo_installagent} selectedMirrors={mirrors.selectedMirrors} selectedRowKeys={mirrors.selectedRowKeys} filtertype={this.props.filtertype} />
                <InstallDrbd ref='installdrbd' visible={mirrors.install_drbd_modal} onOk={this.submit_install_drbd} onCancel={this.handle_close_install_drbd} items={mirrors.items}  add={mirrors.add} />
                <Initialize ref='initialize' visible={mirrors.initialize_modal} onOk={this.submit_initialize} onCancel={this.handle_close_initialize} items={mirrors.items} hash={mirrors.hash} />
                <Sync ref='sync' visible={mirrors.sync_modal} onOk={this.submit_sync} onCancel={this.handle_close_sync} items={mirrors.items} sync_id={mirrors.sync_id}/>
                <Uninstall ref='uninstall' visible={mirrors.uninstall_modal} onOk={this.submit_uninstall} onCancel={this.handle_close_uninstall} items={mirrors.items} uninstall_id={mirrors.uninstall_id}/>
                <Syncstatus ref='syncstatus' visible={mirrors.opensyncstatus_modal} onCancel={this.handle_close_opensyncstatus} sync={mirrors.sync} />
                <Opensyncstatus ref='opensyncstatus' visible={mirrors.syncstatus_modal} onOk={this.submit_syncstatus} onCancel={this.handle_close_syncstatus}   syncstatus_id={mirrors.syncstatus_id} agentid={mirrors.agentid} agentname={mirrors.agentname}/>
                
                <Installagent ref='installagent' visible={mirrors.installagent_modal} onOk={this.submit_installagent} onCancel={this.handle_close_installagent} items={mirrors.items} installagent_id={mirrors.installagent_id} agentid={mirrors.agentid} agentname={mirrors.agentname}/>
                {volumes.create_volume_modal?<CreateVolume ref='createvolume' loading={volumes.loading} visible={mirrors.create_volume_modal} items={volumes.items} pools={pools.items} selectpool={pools.selectpool} onOk={this.submit_create_volume} onCancel={this.handle_close_volume}/>:<div></div>}
                {mirrors.setagent_modal? <Setagent ref='setagent' visible={mirrors.setagent_modal} onOk={this.submit_setagent} onCancel={this.handle_close_setagent} items={mirrors.items} setagent_id={mirrors.setagent_id} agentid={mirrors.agentid} agentname={mirrors.agentname}/>:<div></div>}
                {mirrors.agent_upordown_modal? <Upordown ref='upordown' visible={mirrors.agent_upordown_modal} onOk={this.submit_agent_upordown} onCancel={this.handle_close_agent_upordown} items={mirrors.items} mirror_id={mirrors.mirror_id} agentid={mirrors.agentid} agentname={mirrors.agentname}/>:<div></div>}
                {mirrors.agent_pausesync_modal? <Pausesync ref='pausesync' visible={mirrors.agent_pausesync_modal} onOk={this.submit_agent_pausesync} onCancel={this.handle_close_agent_pausesync} items={mirrors.items} mirror_id={mirrors.mirror_id} agentid={mirrors.agentid} agentname={mirrors.agentname}/>:<div></div>}
                {mirrors.agent_resumesync_modal? <Resumesync ref='resumesync' visible={mirrors.agent_resumesync_modal} onOk={this.submit_agent_resumesync} onCancel={this.handle_close_agent_resumesync} items={mirrors.items} mirror_id={mirrors.mirror_id} agentid={mirrors.agentid}agentname={mirrors.agentname}/>:<div></div>}
                {mirrors.agent_getagentrole_modal? <Getagentrole ref='getagentrole' visible={mirrors.agent_getagentrole_modal} onOk={this.submit_agent_getagentrole} onCancel={this.handle_close_agent_getagentrole} items={mirrors.items} mirror_id={mirrors.mirror_id} agentid={mirrors.agentid} agentname={mirrors.agentname} />:<div></div>}
                {mirrors.openrole_modal? <Openrole ref='getagentrole' visible={mirrors.openrole_modal}  onCancel={this.handle_close_agent_openrole}   agentrole={mirrors.agentrole} />:<div></div>}
                {mirrors.agent_agentorlocal_modal? <Agentorlocal ref='agentorlocal'  agentorlocal={mirrors.getagentmirrors} visible={mirrors.agent_agentorlocal_modal} onOk={this.submit_agent_agentorlocal} onCancel={this.handle_close_agent_agentorlocal}  items={mirrors.items} select = {volumes.items} ipaddress={mirrors.address} dispatch={dispatch} mirrorVolume={this.handle_mirror_volume}/>:<div></div>}
                {mirrors.agent_localoragent_modal? <Localoragent ref='localoragent' localoragent={mirrors.getagentmirrors} value={mirrors.value} visible={mirrors.agent_localoragent_modal} onOk={this.submit_agent_localoragent} onCancel={this.handle_close_agent_localoragent} items={mirrors.items} select = {volumes.items} ipaddress={mirrors.address} agentsId={agents.items}  mirrorVolume={this.handle_mirror_volume} dispatch={dispatch} windows ={mirrors.windows} num ={mirrors.num} mirrorVolume={this.handle_mirror_volume}/>:<div></div>}
                {mirrors.create_mirror_modal? <CreateMirror ref='createmirror' previousagentstate={mirrors.previousagent} previousagent={mirrors.getagentmirrors} value={mirrors.value} visible={mirrors.create_mirror_modal} onOk={this.submit_create_mirror} onCancel={this.handle_close_create_mirror} items={mirrors.items} select = {volumes.items} ipaddress={mirrors.address} agentsId={agents.items}  mirrorVolume={this.handle_mirror_volume} dispatch={dispatch} windows ={mirrors.windows} num ={mirrors.num}/>:<div></div>}
                {mirrors.select_agent_url_modal? <SelectAgentUrl ref='selectagenturl' visible={mirrors.select_agent_url_modal} onOk={this.submit_select_agent_url} onCancel={this.handle_close_select_agent_url} mirrors={mirrors}  />:<div></div>}
                {mirrors.agent_modifyagent_modal? <ModifyMirrorAgent ref='modifymirroragent' visible={mirrors.agent_modifyagent_modal} onOk={this.submit_modify_agent} onCancel={this.handle_close_modify_agent} mirrors={mirrors}  scripts={scripts.items} />:<div></div>}
                {mirrors.prefer_host_modal?<Prefermirrorhost ref='prefermirrorhost' host={host.items} loading={mirrors.prefer_host_loading}  id={mirrors.prefer_mirror_id} mirrors={mirrors.items} onOk={this.handle_prefer_host} visible={mirrors.prefer_host_modal} onCancel={this.handle_close_prefer_host} />:<div></div>}
                {mirrors.host_to_host_modal?<CreateHostToHost visible={mirrors.host_to_host_modal} volumes={volumes.items} ipaddress={mirrors.address}  hosts={host.items} onOk={this.handle_create_host_to_host} onCancel={this.handle_close_host_to_host}   />:<div></div>}
            </Row>
        );
    }
}

MirrorContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        mirrors: state.mirrors,
        pools: state.pools,
        volumes:state.volumes,
        agents:state.agents,
        scripts:state.scripts,
        host:state.host,


    }
}
export default connect(mapStateToProps)(MirrorContainer)




