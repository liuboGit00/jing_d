import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import AgentListContainer from '../../containers/agent/agentlistcontainer'

class Register extends Component {

    setRegisterlist(agentlist) {
        var registerlist = []
        // agentlist.items.unaccept.map(agent => registerlist[registerlist.length] = { "saltid": agent, "type": 'unaccept' })
        // agentlist.items.accept.map(agent => registerlist[registerlist.length] = { "saltid": agent, "type": 'accept' })
        for(let i=0;i<agentlist.items.unaccept.length;i++){
            registerlist.push({'saltid':agentlist.items.unaccept[i],'type':'unaccept','id':i})
        }
        var len = agentlist.items.unaccept.length;
        for(let i=0;i<agentlist.items.accept.length;i++){
            registerlist.push({'saltid':agentlist.items.accept[i],'type':'accept','id':len+i})
        }

        return registerlist
    }

    render() {
        const {agentlist,onChange,selectedAgentToRegister,selectedRowKeys} = this.props
        
        const rowSelection = {}
        console.log(this.setRegisterlist(agentlist))
        // console.log( rowSelection.onChange)
        // console.log( selectedRowKeys)


        // console.log(agentlist)
        // console.log(selectedAgentToRegister)


        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        /*var registerlist = []
        agentlist.items.unaccept.map(agent => registerlist[registerlist.length] = { "saltid": agent, "type": 'unaccept' })
        agentlist.items.accept.map(agent => registerlist[registerlist.length] = { "saltid": agent, "type": 'accept' })*/
        const columns = [
            {
                title: '客户端名称',
                dataIndex: 'saltid',
            },
            {
                title: '类型',
                dataIndex: 'type',
            }
        ]
        return (
            <div>
               
                <Table rowKey='id'  rowSelection={rowSelection} columns={columns} dataSource={this.setRegisterlist(agentlist)} />
               
            </div>
        );
    }
}

Register.propTypes = {

};

export default Register;
