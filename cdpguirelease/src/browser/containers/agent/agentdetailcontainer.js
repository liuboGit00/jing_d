import React, {Component, PropTypes} from 'react';
import AgentDetail from '../../components/agent/agentdetail'
import {connect} from 'react-redux'
import auth from '../../utils/auth'
import {fetch_agent_detail,echo_create_initiator_modal,close_create_initiator_modal,create_initiator,toggle_initiators,delete_initiators,fetch_agents} from '../../actions/actions'
import CreateInitiator from '../../components/agent/create_initiator'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,Alert} from 'antd';
import {toggle_script,fetch_script,create_script,delete_script,update_script,echo_create_script,
        close_create_script,echo_update_script,run_script,echo_run_script,close_run_script
}from '../../actions/scriptaction'
import CreateScript from '../../components/agent/createscript'

class AgentDetailContainer extends Component {
    constructor(props){
        super(props)
        this.handle_create_initiator = this.handle_create_initiator.bind(this)
        this.submit_create_initiator = this.submit_create_initiator.bind(this)
        this.handle_close_create_initiator_modal = this.handle_close_create_initiator_modal.bind(this)
        this.handle_delete_initiator = this.handle_delete_initiator.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handle_delete_script = this.handle_delete_script.bind(this)
        this.handle_create_script = this.handle_create_script.bind(this)
        this.handle_close_script = this.handle_close_script.bind(this)
        this.handle_submit_create_script = this.handle_submit_create_script.bind(this)
        this.handle_echo_update_script = this.handle_echo_update_script.bind(this)
        this.handleChange_script = this.handleChange_script.bind(this)
        this.handle_echo_run_script = this.handle_echo_run_script.bind(this)
        this.handle_close_run_script = this.handle_close_run_script.bind(this)
    }
    componentWillMount(){
        /*
        const {agents} = this.props
        const agentId = this.props.params.agentId
        //console.log(agentId)
        const agent = agents.items.find(item => (item.id == agentId))
        //console.log(agent)
        const connect = agent.connect_set[0]
        //console.log(auth.username,auth.password)
        dispatch(fetch_agent_detail({ 'baseURI': connect, 'path': '/grains', 'username': auth.username, 'password': auth.password }))*/
        const {dispatch,scripts,agents} = this.props
        if(scripts.items.length<=0){
            dispatch(fetch_script())
        }
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
    }
    handle_create_initiator() {
        const {dispatch} = this.props
        //const {initiatorname} = this.props.agentdetail
        dispatch(echo_create_initiator_modal())
    }
    submit_create_initiator(initiator){
        const {dispatch} = this.props
        const agentId = this.props.params.agentId
        dispatch(create_initiator(initiator,agentId,auth))
    }
    handle_close_create_initiator_modal(){
        const {dispatch} = this.props
        dispatch(close_create_initiator_modal())
    }
    handle_delete_initiator() {
        const {dispatch} = this.props
        const {selectedInits} = this.props.agentdetail
        const confirm = Modal.confirm;
        confirm({
            title: '您确定要删除所选内容吗',
            content: '删除后将无法恢复',
            onOk() {
                dispatch(delete_initiators(selectedInits, auth))
            },
            onCancel() {},
        });
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_initiators(selectedRowKeys, selectedRows))
    }
    // handleChange_script(selectedRowKeys, selectedRows) {
    //     console.log(selectedRowKeys, selectedRows)
    //     this.props.dispatch(toggle_script(selectedRows,selectedRowKeys))
    // }
     handle_delete_script() {
        // console.log(this.props.cephclients.selectedRowKeys)
        const rowKeys = this.props.scripts.selectedScript;
        const {scripts} = this.props;
        // console.log(scripts)
        // console.log(rowKeys)
        

        if(!rowKeys || rowKeys.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要删除的数据！',
            });
        }else{
            if(!scripts.items||scripts.items.length>0){
                        confirm({
                            title: 'CDP系统提示！',
                            content: '您是否确认要删除选中的内容！',
                            onOk: function() {
                                for(let i=0;i<scripts.items.length;i++){
                                    for(let j=0;j<rowKeys.length;j++){
                                        if(scripts.items[i].id == rowKeys[j].id){
                                            this.props.dispatch(delete_script(scripts.items[i].id));
                                        }
                                    }
                                }
                            }.bind(this),
                            onCancel() {},
                        });
                  
            }else{
                Modal.error({
                    title: 'CDP系统提示！',
                    content: '删除的数据不存在！',
                });
            }
            

           
        }
    }
    handle_create_script(){
        const{dispatch}=this.props;

        dispatch(echo_create_script())
    }

    handle_close_script(){
        const{dispatch}=this.props;
        dispatch(close_create_script())

    }
    handle_submit_create_script(script){
        const{dispatch,scripts}=this.props;
        // console.log(script)
        // console.log(scripts.update_switch)
        if(scripts.update_switch==true){
            dispatch(update_script(script))
        }else{
            dispatch(create_script(script))
        }
    }
    handle_echo_update_script(){
        const{dispatch}=this.props;
        const row = this.props.scripts.selectedScript;
        console.log(row)
        if(!row || row.length == 0){
            Modal.warning({
                title: 'CDP系统提示！',
                content: '请选择要修改的数据！',
            });
        }else if(row.length === 1){
            dispatch(echo_update_script(row))
            dispatch(echo_create_script())
        }else{
            Modal.warning({
                title: 'CDP系统提示！',
                content: '请选择一条数据进行修改！',
            });
        }
        
        
    }
    handleChange_script(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_script(selectedRows,selectedRowKeys))
    }
    handle_echo_run_script(){
        const {dispatch} =this.props
        const row = this.props.scripts.selectedScript;
        console.log(row)
        if(!row || row.length == 0){
            Modal.warning({
                title: 'CDP系统提示！',
                content: '请选择要测试的脚本！',
            });
        }else if(row.length === 1){
            dispatch(run_script(row[0]))
            dispatch(echo_run_script())
        }else{
            Modal.warning({
                title: 'CDP系统提示！',
                content: '请选择一条脚本进行测试！',
            });
        }
    }
    handle_close_run_script(){
        this.props.dispatch(close_run_script())
    }
    render() {
        const {agentdetail,scripts} = this.props
        const {agents} = this.props
        if (agents.items.length<=0&&agents.isFetching) { return <Spin /> } else {
        const agentId = this.props.params.agentId
        const agent = agents.items.find(item => (item.id == agentId))
        // console.log(scripts.items)
        if(agent!=undefined&&agent.saved_grains!=undefined){
            return (
                <div>
                    <AgentDetail run_script={this.handle_echo_run_script} agents={agents.items} scripts={scripts.items} ScriptselectedRowKeys={scripts.selectedRowKeys} ScriptChange={this.handleChange_script} delete_script={this.handle_delete_script} create_script ={this.handle_create_script} update_script={this.handle_echo_update_script}  agentdetail={agent.saved_grains} agent={agent} dispatch={this.props.dispatch} initiators={agentdetail.initiators} loading={agentdetail.isFetching}
                        onChange={this.handleChange} selectedInits={agentdetail.selectedInits} selectedRowKeys={agentdetail.selectedRowKeys} onDelete={this.handle_delete_initiator} onCreate={this.handle_create_initiator}/>
                    <CreateInitiator visible={agentdetail.create_initiator_modal} agentdetail={agent.saved_grains} onOk={this.submit_create_initiator}
                        onCancel={this.handle_close_create_initiator_modal} />
                    <CreateScript ref='CreateScript' scripts={scripts.items}  visible={scripts.script_modal} updatecontent={scripts.updatecontent} updateSwitch={scripts.update_switch} agents={agents.items} items={scripts.items} selectedScript={scripts.selectedScript} onOk={this.handle_submit_create_script} onCancel={this.handle_close_script}/>
                    {scripts.run_script_modal==true?<Modal title='客户端脚本' onCancel={this.handle_close_run_script} onOk={this.handle_close_run_script} visible={scripts.run_script_modal}><p style={{padding:30,textAlign:'center' }}>{scripts.run.retcode==0?scripts.run.stdout:scripts.run.stderr}</p></Modal>:<div></div>}
                </div>
            )}else{
                return <Alert message='客户端信息不完整请完善客户端信息' type='warning' showIcon/>
            }
        }

    }
}

AgentDetailContainer.propTypes = {

};

function mapStateToProps(state) {


    return {
        agentdetail: state.agentdetail,
        agents: state.agents,
        scripts:state.scripts,
    }
}
export default connect(mapStateToProps)(AgentDetailContainer)