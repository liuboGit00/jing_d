import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import auth from '../../utils/auth'
import Register from '../../components/agent/register'
import {fetch_agent_list,register_agent,toggle_agent_to_register,save_grains,fetch_agents} from '../../actions/actions'
import {Spin,Button,Row,Modal} from 'antd'

class AgentListContainer extends Component {
    constructor(props){
        super(props)
        this.handle_register = this.handle_register.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        const {dispatch,agentlist,agents} = this.props
        if(agentlist.items.length<=0){
            dispatch(fetch_agent_list())
        }
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
    }
    handle_register(){
        const warning = Modal.warning;
        const {dispatch} = this.props
        const {selectedAgentToRegister} = this.props.agentlist
        console.log(selectedAgentToRegister[0].saltid)
        const {agents} = this.props
        //console.log(agents)
        var agent = agents.items.find(agent=>(agent.name==selectedAgentToRegister[0].saltid))
        console.log(agent)
        if (selectedAgentToRegister.length == 1) {//必须是单选
            if (agent == undefined) {
                dispatch(register_agent(selectedAgentToRegister[0].saltid, auth))
            } else {
                Modal.error({
                    title: '无法注册',
                    content: '该客户端已被注册！',
                })
            }
        }
        else {
            warning({
                title: '请选择一个客户端',
                content: '请选择一个客户端进行注册',
            })
        }
       /* dispatch(fetch_agents())
        const {agents} = this.props
        if (agents.register_success) {
            dispatch(fetch_agents())
            const {agents} = this.props
            console.log(agents)
            const agent = agents.items.find(item => (item.name == selectedAgentToRegister[0].saltid))
            console.log(agent)
            const url = agent.url
            dispatch(save_grains(url, auth))
        }*/
        //const saltid='192.168.40.23'

    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys)
        // console.log(selectedRows)
        this.setState({selectedRowKeys})
        // console.log(selectedRowKeys)

        this.props.dispatch(toggle_agent_to_register(selectedRowKeys, selectedRows))
    }
    render() {
        const {agentlist} = this.props
        // console.log(agentlist)

        //const list=[{"saltid":123,"type":'accept'}]
        return (
            <div>
                <Row className="table_toolbar">
                    <Button type='ghost' className="cdp_button_left" onClick={this.handle_register}>注册</Button>
                </Row>
                {agentlist.isFetching === false && agentlist.didInvalidate === false ? <Register agentlist={agentlist} onChange={this.handleChange}
                selectedAgentToRegister={agentlist.selectedAgentToRegister} selectedRowKeys={agentlist.selectedRowKeys} filtertype={this.props.filtertype}/> : <Spin />}
            </div>
        );
    }
}

AgentListContainer.propTypes = {

};

function mapStateToProps(state) {


    return {
        agentlist: state.agentlist,
        agents: state.agents
    }
}
export default connect(mapStateToProps)(AgentListContainer)