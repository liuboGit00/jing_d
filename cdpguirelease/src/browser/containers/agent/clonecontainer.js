import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {echo_agent_clone_download,close_agent_clone_download,fetch_agent_clone,echo_create_agent_clone_modal,
        close_create_agent_clone_modal,toggle_agent_clone,delete_agent_clone,create_agent_clone,
        fetch_ipaddresses,create_agent_local,create_local_agent,echo_create_agent_local_modal,
        echo_create_local_agent_modal,close_create_agent_local_modal,close_create_local_agent_modal,
        fetch_agent_clone_status,modify_agent_clone,echo_modify_agent_clone,close_modify_agent_clone,
        echo_agent_clone_speed,close_agent_clone_speed,clone_on_off_status,advavce_get_on_off_status,
        echo_local_anyagent,close_local_anylocal,fetch_one_clone_satus,fetch_one_agent_clone,
    } from '../../actions/mirroraction'
import {fetch_volumes,fetch_agents,echo_create_volume_modal,close_create_volume_modal,create_volume} from '../../actions/actions'
import Agentclone from '../../components/agent/clone'
import Volumes from '../../components/volume/volume'

import CreateClone from '../../components/agent/create_clone'
import ModifyClone from '../../components/agent/modify_clone'

import  Localagent  from '../../components/agent/clone_localagent'
import  Agentlocal from '../../components/agent/clone_agentlocal'
import  Download from '../../components/agent/download'
import  Clonespeed from '../../components/agent/clonespeed'


import CreateVolume from '../../components/volume/create_volume'
import {fetch_pools} from '../../actions/poolactions'
import {message} from 'antd';







// import InstallDrbd from '../../components/agent/install_drbd'
// import Initialize from '../../components/agent/initialize'


import {Row, Col, Menu,Icon, Button, Input, Modal, Spin,Table,Alert} from 'antd'
import SearchInput from '../../components/common/searchinput'

import auth from '../../utils/auth'
import {Link} from 'react-router'
var timer

class CloneContainer extends Component {
    constructor(props) {
        super(props)
        this.handle_create_agent_clone = this.handle_create_agent_clone.bind(this)
        this.handle_delete_agent_clone = this.handle_delete_agent_clone.bind(this)
        this.handle_close_create_agent_clone = this.handle_close_create_agent_clone.bind(this)
        this.submit_create_agent_clone = this.submit_create_agent_clone.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit_agentlocal =this.submit_agentlocal.bind(this)
        this.handle_echo_agentlocal=this.handle_echo_agentlocal.bind(this)
        this.handle_close_agentlocal =this.handle_close_agentlocal.bind(this)
        this.submit_localagent =this.submit_localagent.bind(this)
        this.handle_close_localagent =this.handle_close_localagent.bind(this)
        this.handle_echo_localagent=this.handle_echo_localagent.bind(this)
        this.handle_echo_volume = this.handle_echo_volume.bind(this)
        this.handle_close_volume = this.handle_close_volume.bind(this)
        this.submit_create_volume = this.submit_create_volume.bind(this)
        this.handle_download = this.handle_download.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handle_modify_agent_clone = this.handle_modify_agent_clone.bind(this)
        this.handle_echo_modify_agent_clone = this.handle_echo_modify_agent_clone.bind(this)
        this.handle_close_modify_agent_clone = this.handle_close_modify_agent_clone.bind(this)
        this.handle_echo_agent_clone_speed = this.handle_echo_agent_clone_speed.bind(this)
        this.handle_close_agent_clone_speed = this.handle_close_agent_clone_speed.bind(this)
        this.handle_onoff_refresh = this.handle_onoff_refresh.bind(this)
        this.handle_echo_localanyagent = this.handle_echo_localanyagent.bind(this)
        this.handle_close_localanyagent = this.handle_close_localanyagent.bind(this)

    }
    componentDidMount(){
        const {dispatch} = this.props
        const {agentclone,agents,volumes,ipaddresses} = this.props
        // console.log(this.props)
        if (agentclone.items.length <= 0){
            dispatch(fetch_agent_clone());
            dispatch(fetch_ipaddresses());
        } 
        // if (this.props.url == undefined) {
        //     dispatch(fetch_agent_clone());
        // } else {
        //     dispatch(fetch_agent_clone({ 'baseURI':this.props.url, 'path': '', 'username': auth.username, 'password': auth.password }));

        // }
        if (agents.items.length <= 0){
            dispatch(fetch_agents());
        }
        if (volumes.items.length <= 0){
            dispatch(fetch_volumes());
        }
        const {pools} = this.props
        if(pools.items.length <= 0){
            dispatch(fetch_pools())
        }

    }

    handle_create_agent_clone() {
        // console.log(this.props)
        const {dispatch} = this.props
        dispatch(echo_create_agent_clone_modal())
    }
    handle_close_create_agent_clone() {
        const {dispatch} = this.props
        dispatch(close_create_agent_clone_modal())
    }
    handle_delete_agent_clone() {
        const {dispatch} = this.props
        const {selectedClone} = this.props.agentclone
        // console.log(this.props)
        const confirm = Modal.confirm;
        if (selectedClone.length > 0){
            confirm({
                title: '您是否确认要删除已选择的这些镜像',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_agent_clone(selectedClone,auth))
                },
                onCancel() { },
            });
        }
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_agent_clone(selectedRowKeys, selectedRows))
    }
    submit_create_agent_clone(clone){
        const {dispatch,agentclone} = this.props
        for(let i=0;i<agentclone.items.length;i++){
            console.log(agentclone.items[i].getlocalendpoint[0])
            if(agentclone.items[i].getlocalendpoint[0] !=undefined&&clone.clone_dest_localport == agentclone.items[i].getlocalendpoint[0].port){
                return message.error('本地端口号已被占用')
            }
            if(agentclone.items[i].getagentendpoint[0] !=undefined&&clone.clone_source_agentport == agentclone.items[i].getagentendpoint[0].port){
                return message.error('客户端端口号已被占用')
            }
        }
        // console.log(clone)
        dispatch(create_agent_clone(clone,auth))
    }
 
    handleSearch(searchKey) {
        console.log(searchKey)
        this.props.dispatch(fetch_agent_clone({
            searchKey:searchKey
        }));
    }
    submit_agentlocal(agentlocal){
        const {dispatch}=this.props;
        dispatch(create_agent_local(agentlocal,auth))
        dispatch(close_create_agent_local_modal())
    }
    handle_echo_agentlocal(id,url){
        const {dispatch}=this.props;
        console.log(url)
        if(url != null){
            dispatch(fetch_one_clone_satus(url))
            dispatch(echo_create_agent_local_modal(id))
        }else{
            dispatch(echo_create_agent_local_modal(id))
        }
        

    }
    handle_close_agentlocal(){
        const {dispatch}=this.props;
        dispatch(close_create_agent_local_modal())
    }
    submit_localagent(localagent){
        const {dispatch}=this.props;
        dispatch(create_local_agent(localagent,auth))
        dispatch(close_create_local_agent_modal())
        

    }
    handle_echo_localagent(id,url){
        const {dispatch}=this.props;
        console.log(url)
        if(url != null){
            dispatch(fetch_one_clone_satus(url))
            dispatch(echo_create_local_agent_modal(id))
        }else{
            dispatch(echo_create_local_agent_modal(id))
        }
    }
    handle_close_localagent(){
        const {dispatch}=this.props;
        dispatch(close_create_local_agent_modal())
    }
    handle_echo_volume(){
        const{dispatch} =this.props;
        dispatch(echo_create_volume_modal())
    }
    handle_close_volume(){
        const {dispatch} = this.props
        dispatch(close_create_volume_modal())
    }
    submit_create_volume(volume){
        const {dispatch} = this.props
        //console.log(volume)
        dispatch(create_volume(volume,auth))
    }
    handle_download(){
        const{dispatch,agentclone} = this.props
        // console.log(agentclone.selectedClone)
        if(agentclone.selectedClone.length==1){
            var url = agentclone.selectedClone[0].task
            dispatch(fetch_one_clone_satus(url))
            dispatch(echo_agent_clone_download())
            // console.log(url);
        }else{
            message.error('请选择一条数据进行查询')
        }
        
    }
    close_agent_clone_download(){
        const{dispatch} = this.props;
        dispatch(close_agent_clone_download())
    }
    
    handle_modify_agent_clone(clone){
        const{agentclone,dispatch} = this.props;
        dispatch(modify_agent_clone(clone,auth))
    }
    handle_echo_modify_agent_clone(){
        const{dispatch,agentclone}=this.props;

        if(agentclone.selectedClone.length!=1){
            message.error("请选择一条数据进行修改")
            
        }else if(agentclone.selectedClone[0].getlocalendpoint==''&&agentclone.selectedClone[0].getagentendpoint[1].agent==undefined){
            message.error("无法获取要修改的数据请删除")
        }
        else{
            dispatch(echo_modify_agent_clone())
        }

        
    }
    handle_close_modify_agent_clone(){
        const{dispatch}=this.props;
        dispatch(close_modify_agent_clone())
    }
    handle_echo_agent_clone_speed(){
        const {dispatch,agentclone}=this.props
        console.log(agentclone.selectedClone)
        if(agentclone.selectedClone.length==1){
            dispatch(fetch_one_clone_satus(agentclone.selectedClone[0].task))
            dispatch(echo_agent_clone_speed())
        }else{
            message.error("请选择一条数据查询传输速度")
        }
    }
    handle_close_agent_clone_speed(){
        const {dispatch}=this.props

        dispatch(close_agent_clone_speed())
    }
    handle_onoff_refresh(id,onoff,task){
        const{dispatch,agentclone}=this.props
        if(onoff=='start'){
            timer = setInterval(function(){
                dispatch(fetch_one_agent_clone(id));
                dispatch(fetch_one_clone_satus(task))},10000)
            dispatch(clone_on_off_status(id+':'+onoff+':'+timer))
        }else{
            for(let i=0;i<agentclone.onoff.length;i++){
                if(id==agentclone.onoff[i].split(':')[0]){
                    clearInterval(agentclone.onoff[i].split(':')[2])
                    dispatch(clone_on_off_status(id+':'+onoff+':'+agentclone.onoff[i].split(':')[2]))
                }
            }
        }
    }
    handle_echo_localanyagent(id,url){
        const{dispatch}=this.props
         if(url != null){
            dispatch(fetch_one_clone_satus(url))
            dispatch(echo_local_anyagent(id))
        }else{
            dispatch(echo_local_anyagent(id))
        }
       
    }
    handle_close_localanyagent(){
        const{dispatch}=this.props
        dispatch(close_local_anylocal())
    }

    render() {
        const {agentclone,pools,volumes,dispatch,agents,} = this.props
        if(agentclone.items.length>0){
            if(agentclone.onoff.length>0){
                for(let i=0;i<agentclone.onoff.length;i++){
                    for(let j=0;j<agentclone.items.length;j++){
                        if(agentclone.onoff[i].split(':')[0]==agentclone.items[j].id){
                            agentclone.items[j].onoff=agentclone.onoff[i].split(':')[1]
                        }
                    }
                }
            } 
        }
        if(agentclone.status&&agentclone.items !=''){
            for(let i=0;i<agentclone.items.length;i++){
                for(let j=0;j<agentclone.status.length;j++){
                    if(agentclone.items[i].task==agentclone.status[j].url){
                        agentclone.items[i].status=agentclone.status[j]
                    }
                }
            }
        }
        return (

            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />硬盘复制</label>
                </Row>
                <Row className="table_toolbar">
                    <SearchInput ref="searchInput" placeholder="搜 索" onSearch={this.handleSearch.bind(this)}></SearchInput>
                    <Button type='ghost' icon='edit' className="cdp_button_right" onClick={this.handle_echo_modify_agent_clone} >修改</Button>
                    <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_agent_clone}>删除</Button>
                    <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_agent_clone}>创建</Button>
                </Row>
                <br/>
                {agentclone.items.length>0&&pools.items.length>0&&agents.items.length>0&&volumes.items.length>0?<Agentclone  onLocalanyagent={this.handle_echo_localanyagent} clonespeed={agentclone.status}  volumes={volumes.items} onOff={this.handle_onoff_refresh}  items={agentclone.items} ipaddresses={agentclone.address}  agent={agents.items}  onChange={this.handleChange}   selectedClone={agentclone.selectedClone} selectedRowKeys={agentclone.selectedRowKeys} onAgentlocal = {this.handle_echo_agentlocal}  onLocalagent = {this.handle_echo_localagent}
                    filtertype={this.props.filtertype} />:<Agentclone  onLocalanyagent={this.handle_echo_localanyagent} clonespeed={agentclone.status}  volumes={volumes.items} onOff={this.handle_onoff_refresh}  items={[]} ipaddresses={agentclone.address}  agent={agents.items}  onChange={this.handleChange}   selectedClone={agentclone.selectedClone} selectedRowKeys={agentclone.selectedRowKeys} onAgentlocal = {this.handle_echo_agentlocal}  onLocalagent = {this.handle_echo_localagent}
                    filtertype={this.props.filtertype} />}
                <CreateClone ref='createclone' visible={agentclone.create_agent_clone_modal} items={agentclone.items}  selectedClone={agentclone.selectedClone} ipaddresses={agentclone.address} onOk={this.submit_create_agent_clone} onCancel={this.handle_close_create_agent_clone}   volumes = {volumes.items} agents ={agents.items} dispatch={dispatch} num={agentclone.num} windows={agentclone.windows} agentcloneVolume={this.handle_echo_volume}/>
                <ModifyClone ref='modifyclone' visible={agentclone.modify_clone_modal} items={agentclone.items}  selectedClone={agentclone.selectedClone} ipaddresses={agentclone.address} onOk={this.handle_modify_agent_clone} onCancel={this.handle_close_modify_agent_clone}   volumes = {volumes.items} agents ={agents.items} dispatch={dispatch} num={agentclone.num} windows={agentclone.windows} agentcloneVolume={this.handle_echo_volume}/>
               
                <Agentlocal ref='agentlocal' visible={agentclone.create_agent_local_modal} onOk={this.submit_agentlocal} onCancel={this.handle_close_agentlocal} download={agentclone.status} items={agentclone.items} id={agentclone.create_agent_local} />
                <Localagent ref='localagent' visible={agentclone.create_local_agent_modal} onOk={this.submit_localagent} onCancel={this.handle_close_localagent} download={agentclone.status} items={agentclone.items} id={agentclone.create_local_agent} />
                <Download ref='download' visible={agentclone.download_modal} download={agentclone.status} onCancel={this.close_agent_clone_download.bind(this)}/>
                <Clonespeed ref='clonespeed' visible={agentclone.clone_speed_modal} clonespeed={agentclone.status} onCancel={this.handle_close_agent_clone_speed}/>
                
            </Row>
        );
    }
}

CloneContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        agentclone: state.agentclone,
        pools: state.pools,
        volumes:state.volumes,
        agents:state.agents,


    }
}
export default connect(mapStateToProps)(CloneContainer)


/* <CreateVolume ref='createvolume' visible={agentclone.create_volume_modal} items={volumes.items} pools={pools.items}  onOk={this.submit_create_volume} onCancel={this.handle_close_volume}/>
*/

