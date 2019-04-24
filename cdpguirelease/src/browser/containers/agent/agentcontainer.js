import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetch_agents,echo_create_agent_modal,echo_create_ssh_modal,close_create_agent_modal,close_create_ssh_modal,echo_modify_agent_modal,close_modify_agent_modal,toggle_agents,
    delete_agents,save_grains,check_online,create_agent,create_ssh} from '../../actions/actions'
import Agent from '../../components/agent/agent'
import CreateAgent from '../../components/agent/create_agent'
import CreateSSH from '../../components/agent/create_ssh'
import ModifyAgent from '../../components/agent/modify_agent'
import {Row, Col, Menu,Icon, Button, Input, Modal, Spin,Table,Alert,message} from 'antd'
import SearchInput from '../../components/common/searchinput'
import auth from '../../utils/auth'
import {Link} from 'react-router'

class AgentContainer extends Component {
    constructor(props) {
        super(props)
		this.handle_create_ssh = this.handle_create_ssh.bind(this)
        this.handle_create_agent = this.handle_create_agent.bind(this)
        this.handle_close_create_agent = this.handle_close_create_agent.bind(this)
        this.handle_modify_agent = this.handle_modify_agent.bind(this)
        this.handle_close_modify_agent = this.handle_close_modify_agent.bind(this)
        this.handle_delete_agent = this.handle_delete_agent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit_create_agent = this.submit_create_agent.bind(this)
		this.handle_close_create_ssh = this.handle_close_create_ssh.bind(this)
		this.submit_create_ssh = this.submit_create_ssh.bind(this)
        this.handle_save_grains = this.handle_save_grains.bind(this)
        this.handle_check_online = this.handle_check_online.bind(this)
    }
    componentDidMount() {
        const {dispatch} = this.props
        const {agents} = this.props
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
        
        // dispatch(fetch_agents())
        //console.log(agents)
        //if(agents.items.isFetching==false){dispatch(check_online(agents.items[0].id,agents.items[0].url,auth))}
        
        /*agents.items.forEach(function(element){
            console.log(auth.username,auth.password)
            dispatch(check_online(element.id,element.url,auth))
        })*/
    }
	handle_create_ssh() {
        const {dispatch} = this.props
        dispatch(echo_create_ssh_modal())
    }
    handle_create_agent() {
        const {dispatch} = this.props
        dispatch(echo_create_agent_modal())
    }
    handle_close_create_agent() {
        const {dispatch} = this.props
        dispatch(close_create_agent_modal())
    }
	handle_close_create_ssh() {
        const {dispatch} = this.props
        dispatch(close_create_ssh_modal())
    }
    handle_modify_agent() {
        const {dispatch} = this.props;
        const warning = Modal.warning;
        const {selectedAgents} = this.props.agents;
        if (selectedAgents.length == 1) {//修改必须是单选
            dispatch(echo_modify_agent_modal())
        }else {
            warning({
                title: '请选择一个客户端',
                content: '请选择一个客户端进行修改',
            })
        }
    }
    handle_close_modify_agent() {
        const {dispatch} = this.props
        dispatch(close_modify_agent_modal())
    }
    handle_delete_agent() {
        const {dispatch} = this.props
        const {selectedAgents} = this.props.agents
        const confirm = Modal.confirm;
        const warning = Modal.warning;

        if(selectedAgents.length>0){
            confirm({
                title: '您是否确认要删除已选择的这些客户端',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_agents(selectedAgents, auth))
                },
                onCancel() { },
            });
        }else{
            warning({
                title: '删除客户端',
                content: '请选择要删除客户端',
            })
        }
        
    }
    handleChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_agents(selectedRowKeys, selectedRows))
    }
	submit_create_ssh(agentName,port,user,passwd){
        const {dispatch} = this.props
		console.log(agentName)
        if(agentName.length>50){
            return message.error('用户名不能超过50个')
        }
        dispatch(create_ssh(agentName,auth))
    }
    submit_create_agent(agentName){
         const {dispatch} = this.props
         var parent = /^[A-Za-z0-9]+$/
         //console.log(agentName)
         if(!agentName || !parent.test(agentName)){
            return message.error('不可包含空格和中文')
         }
         if(agentName.length>50){
            return message.error('用户名不能超过50个')
         }
         dispatch(create_agent(agentName,auth))
    }
    submit_modify_agent(refs) {

    }
    handleSearch(searchKey) {
         this.props.dispatch(fetch_agents({
            searchKey: searchKey
        }));
    }
    
     handle_save_grains() {
        const {dispatch,agents} = this.props
        const {selectedAgents} = this.props.agents
        const confirm = Modal.confirm;
        console.log(agents)
        if(selectedAgents == ""){
            confirm({
                title: '更新客户端',
                content: '是否更新所有的客户端',
                onOk() {
                    dispatch(save_grains(agents.items,auth))
                },
                onCancel() { },
            });
        }
        dispatch(save_grains(selectedAgents,auth))
    }
     
    handle_check_online(){
        const {dispatch} = this.props
        const {agents} = this.props
        const {selectedAgents} = this.props.agents;
        // console.log(selectedAgents)
        // console.log(selectedAgents!='')
        if(selectedAgents!=''){
            selectedAgents.forEach(function(element){
                console.log(element)
                if(element.connect_set[0] != undefined){
                    dispatch(check_online(element.id,element.connect_set[0],auth))
                }
            })

        }else{
            agents.items.forEach(function(element){
                // console.log(auth.username,auth.password)
                if(element.connect_set[0] != undefined){
                    dispatch(check_online(element.id,element.connect_set[0],auth))
                }
            })

        }
    }

    render() { 
        //const {dispatch} = this.props
        const {agents} = this.props
        /*var elements = agents.items
        elements.forEach(function(element){
            dispatch(check_online(element.url,auth))
            
        })*/
        // let itemsArr=[]
        // // console.log(agents)
        // if(agents.items.length>0){
        //     for(let i=0;i<agents.items.length;i++){
        //         // console.log(agents.items[i].saved_grains!=null&&agents.items[i].saved_grains!=false&&agents.items[i].saved_grains!=undefined&&agents.items[i].saved_grains.ipv4!=undefined)
        //         if(agents.items[i].saved_grains!=null&&agents.items[i].saved_grains!=false&&agents.items[i].saved_grains!=undefined&&agents.items[i].saved_grains.ipv4!=undefined){
        //             itemsArr.push(agents.items[i])
        //         }
        //     }
        // }
        if (agents.isFetching) { return <Spin /> } else {
            return (

                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="laptop" />客户端信息</label>
                    </Row>
                    <Row className="table_toolbar">
                        <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this) } ref="searchInput"></SearchInput>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_agent}>删除</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_agent}>新建</Button>
                        <Link to="/register"><Button type='ghost' className="cdp_button_left" >客户端注册</Button></Link>
                        <Button type='ghost' className="cdp_button_left" onClick={this.handle_save_grains}>更新客户端信息</Button>
                        <Button type='ghost' className="cdp_button_left" onClick={this.handle_check_online}>检查是否在线</Button>
						<Button type='ghost' className="cdp_button_left" onClick={this.handle_create_ssh}>SSH</Button>
                    </Row>
                    <br/>
                    <Agent items={agents.items} onChange={this.handleChange} selectedAgents={agents.selectedAgents} selectedRowKeys={agents.selectedRowKeys}
                        filtertype={this.props.filtertype} />
                    <CreateAgent visible={agents.create_agent_modal} onCancel={this.handle_close_create_agent} agents={agents.items} onOk={this.submit_create_agent}/>
					<CreateSSH visible={agents.create_ssh_modal} onCancel={this.handle_close_create_ssh} agents={agents.items} onOk={this.submit_create_ssh}/>
                </Row>
            );
        }
    }
}

AgentContainer.propTypes = {
    //dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {


    return {
        agents: state.agents
    }
}
export default connect(mapStateToProps)(AgentContainer)




