import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {modify_fileclones,fetch_fileclones,echo_fileclones,close_fileclones,create_fileclones,
        toggle_fileclones,delete_fileclones,fetch_agentlocal,fetch_localagent,stop_server,
        start_server,fetch_fileclones_server,create_fileclones_apply,
        } from '../../actions/filecloneaction'
import Fileclones from '../../components/fileclone/fileclone'
import {fetch_agents} from '../../actions/actions'
import {fetch_ipaddresses} from '../../actions/mirroraction'

import {fetch_filersync} from '../../actions/filersyncaction'


import CreateFileclones from '../../components/fileclone/create_fileclones'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,Switch} from 'antd';
import auth from '../../utils/auth'
import SearchInput from '../../components/common/searchinput'
import {restapi,hostpath} from '../../confs/host'
var setIntervalKey = null
class FileclonesContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handle_create_fileclones = this.handle_create_fileclones.bind(this);
        this.handle_close_fileclones = this.handle_close_fileclones.bind(this);
        this.handle_delete_fileclones = this.handle_delete_fileclones.bind(this);
        this.submit_create_fileclones = this.submit_create_fileclones.bind(this);
        this.handle_modify_fileclones = this.handle_modify_fileclones.bind(this);
        this.handle_echo_modify_fileclones = this.handle_echo_modify_fileclones.bind(this)
        this.handle_agentlocal = this.handle_agentlocal.bind(this)
        this.handle_localagent = this.handle_localagent.bind(this)
        this.handleStopServer = this.handleStopServer.bind(this)
        this.handleStartServer = this.handleStartServer.bind(this)
        this.handle_create_fileclones_apply = this.handle_create_fileclones_apply.bind(this)
    }
    componentDidMount() {
        const {dispatch,fileclones,filersync,agents} = this.props
        dispatch(fetch_ipaddresses())
        if(filersync.items.length<=0){
            dispatch(fetch_filersync())
        }
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
        if(fileclones.items.length<=0){
            dispatch(fetch_fileclones())
        }
        setIntervalKey=setInterval(function(){
            dispatch(fetch_fileclones())
        },10000)
    }
    componentWillUnmount(){
        clearInterval(setIntervalKey)
    }
    handle_create_fileclones(){
        const {dispatch} = this.props;
        dispatch(echo_fileclones())
    }
    handle_close_fileclones(){
        const {dispatch} = this.props;
        dispatch(close_fileclones())
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_fileclones(selectedRowKeys,selectedRows))
    }
    handle_delete_fileclones() {
        const {dispatch} = this.props
        const {selectedFileclones} = this.props.fileclones
        const confirm = Modal.confirm;
        if (selectedFileclones.length > 0) {
            console.log(selectedFileclones)

            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_fileclones(selectedFileclones, auth))
                },
                onCancel() { },
            });
        }
    }

    submit_create_fileclones(fn){
        const {dispatch,fileclones} = this.props
        for(let i=0;i<fileclones.items.length;i++){
            if(fn.name == fileclones.items[i].name){
                return message.error('名称已被使用')
            }
        }
        // console.log(fn.check)
        if(fn.check){
            dispatch(create_fileclones(fn,auth))
        }

    }
    handle_modify_fileclones(modify){
        const {dispatch} = this.props
        const {selectedFileclones} = this.props.fileclones
        if (selectedFileclones.length == 1) {
            dispatch(modify_fileclones(modify,selectedFileclones[0].id,auth))
        }
    }
    handle_echo_modify_fileclones(){
        const {dispatch} = this.props
        const {selectedFileclones} = this.props.fileclones
        const confirm = Modal.confirm;
        if(selectedFileclones.length ==1){
            dispatch(echo_fileclones('echo'))
        }else{
            confirm({
                title: '修改文件克隆',
                content:'请选择一个需要修改的任务。',
                onOk() {},
                onCancel(){},
            });
        }
    }
    handle_localagent(id){
        const {dispatch} = this.props;
        dispatch(fetch_localagent(id,auth))
    }
    handle_agentlocal(id){
        const {dispatch} = this.props;
        dispatch(fetch_agentlocal(id,auth))
    }

    // handleSearch(searchKey){
    //     const{dispatch} = this.props
    //     if (this.props.url == undefined) {
    //         dispatch(fetch_volumes({ 'baseURI': restapi, 'path':volumespath, 'auth':auth ,'searchKey':searchKey}))
    //     } else {
    //         dispatch(fetch_volumes({ 'baseURI': restapi, 'path':volumespath, 'auth':auth,'searchKey':searchKey}))
    //     }
    // }
    handleStopServer(id){
        const {dispatch} = this.props
        dispatch(stop_server(id))
    }
    handleStartServer(id){
        const {dispatch} = this.props
        console.log(id)
        dispatch(start_server(id))
    }
    handle_create_fileclones_apply(){
        const {dispatch} = this.props
        const {selectedFileclones} = this.props.fileclones
        const confirm = Modal.confirm;
        if(selectedFileclones.length >0){
            dispatch(create_fileclones_apply(selectedFileclones))
        }else{
            confirm({
                title: '添加脚本',
                content:'请选择需要添加脚本的任务。',
                onOk() {},
                onCancel() { },
            });
        }

    }
    render() {
        const {dispatch,filersync,fileclones,agents,} = this.props
        // console.log(filersync.items)
        const echo = fileclones.echo
        if(fileclones.items!=''&& fileclones.task!=undefined&&fileclones.task!=null){
            for(let i=0;i<fileclones.items.length;i++){
                for(let j=0;j<fileclones.task.length;j++){
                    if(fileclones.items[i].task == fileclones.task[j].url){
                        fileclones.items[i].status=fileclones.task[j].status;
                        fileclones.items[i].direction=fileclones.task[j].task.split('2')[1];
                    }
                }
            }
        } 
        const {selectedFileclones} = this.props.fileclones
        // console.log(fileclones.applystatus)
        if(selectedFileclones){
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />文件克隆</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='edit' className="cdp_button_right" onClick={this.handle_echo_modify_fileclones}>修改文件克隆</Button>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_fileclones}>删除文件克隆</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_fileclones}>增加文件克隆</Button>
                    </Row>
                    <Row >
                        <Fileclones dispatch={dispatch} agentlocal={this.handle_agentlocal} localagent={this.handle_localagent} items={fileclones.items} onChange={this.handleChange} selectedFileclones={fileclones.selectedFileclones} selectedRowKeys={fileclones.selectedRowKeys}
                           agents={agents.items} filersync={filersync.items} startServer={this.handleStartServer} stopServer={this.handleStopServer} /> 
                    </Row>
                     <Row>
                        <CreateFileclones ref='createfilerclones'echo={echo} selectedFileclones={selectedFileclones[0]} filersync={filersync.items} ipaddress={fileclones.address}  agents={agents.items} items ={fileclones.items}  visible={fileclones.create_fileclones} onOk={echo =='echo'?this.handle_modify_fileclones:this.submit_create_fileclones}
                            dispatch={dispatch} onCancel={this.handle_close_fileclones}/>
                    </Row>
                   
                </Row>
            )
        
        }{
           return <div></div> 
        }
            
    }
}

FileclonesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        filersync:state.filersync,
        fileclones:state.fileclones,
        agents:state.agents,
    }
}
export default connect(mapStateToProps)(FileclonesContainer)
// <Button loading={fileclones.applystatus} type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_fileclones_apply}>添加脚本</Button>
