import React, {Component, PropTypes} from 'react';
import AgentDetailContainer from '../../containers/agent/agentdetailcontainer'
import {Tabs,Table,Row,Button,}  from 'antd'
import {fetch_initiators} from '../../actions/actions'
import Scripts from './script'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane;
var str = '1'

class AgentDetail extends Component {
    componentDidMount() {
        const{dispatch} = this.props
        const{initiator_set}=this.props.agent
        dispatch(fetch_initiators(initiator_set))
        
    }
    handle_click(key){
        str = key
        console.log(str)
    }
    render() {
        const {agents,scripts,agent,initiators,loading,onChange,selectedInits, selectedRowKeys,
        onDelete,onCreate,ScriptChange,delete_script,create_script,update_script,ScriptselectedRowKeys,
        run_script,
    } = this.props
    // console.log(scripts)
        var agentdetail = this.props.agentdetail
        
        var id = window.location.href.split('?')[0].split('/').pop()
        var script=scripts.filter(function(item){return item.agent.split('/').pop()==id})
        // console.log(script)
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: 'wwn',
                dataIndex: 'wwn',
            },
            {
                title: '类型',
                dataIndex: 'type',
                render: (text, record) => {
                    if(text=='qla2xxx'){
                        return '光纤'
                    }
                    if(text=='iscsi'){
                        return 'iscsi'
                    }
                }
            },
        ];
        const ScriptColumes=[
        {
            title:'名字',
            dataIndex:'name',
            width:'20%'
        },
        {
            title:'客户端',
            dataIndex:'agent',
            width:'20%',
            render:(text,record)=>{
                // console.log(text,record)
                if(agents!=''){
                    for(let i=0;i<agents.length;i++){
                        if(text==agents[i].url){
                            return agents[i].name
                        }
                    }
                }
            }
        },
        {
            title:'脚本类型',
            dataIndex:'shelltype',
            width:'20%'
        },
        {
            title:'脚本运行类型',
            dataIndex:'when',
            width:'20%'
        },{
            title:'客户端内容',
            width:'20%',
            render:(text,record)=>{
                return(<Link to={`/scripts/${record.id}`}>详情</Link>)
            }
        }]
        const rowSelection = {}
        const rowSelectionScript = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        rowSelectionScript.onChange = ScriptChange
        rowSelectionScript.selectedRowKeys = ScriptselectedRowKeys
        if(agentdetail==null){
            agentdetail=new Object()
            agentdetail.initiatorname=new Array()}

        return (
            <div>
                <Tabs onTabClick={this.handle_click.bind(this)}   defaultActiveKey={str} tabPosition='top' type='card'>
                    <TabPane tab="基本信息" key="1">
                        <p>OS: {agentdetail.os}</p>
                        <p>Disks: {agentdetail.disks}</p>
                        <p>Initiatorname:{agentdetail.initiatorname==undefined?null:agentdetail.initiatorname.map(function(name){return <li key={name+'1'}>{name}</li>})}</p>
                        <p>drbd_ver:{agentdetail.drbd_ver==undefined?'null':agentdetail.drbd_ver.DRBDADM_VERSION}</p>
                        <p>ncat_ver:{agentdetail.ncat_ver==undefined?'null':agentdetail.ncat_ver}</p>
                    </TabPane>
                    <TabPane tab='initiator' key='2'>
                        <Row className="table_toolbar">
                            <Button type='ghost' icon='delete' className="cdp_button_right" onClick={onDelete}>删除initiator</Button>
                        
                            <Button type='ghost' icon='plus'  className="cdp_button_right" onClick={onCreate}>创建initiator</Button>

                        </Row>
                        <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={initiators} loading={loading}/>
                    </TabPane>
                    <TabPane tab='客户端脚本' key='3'>
                        <Row className="table_toolbar">
                            <Button   className="cdp_button_right" onClick={run_script}>脚本测试</Button>
                            <Button  icon='delete' className="cdp_button_right" onClick={delete_script}>删除</Button>
                            <Button  icon='edit' className="cdp_button_right" onClick={update_script}>修改</Button>
                            <Button  icon='plus' className="cdp_button_right" onClick={create_script}>创建</Button>
                        </Row>
                        <Table rowKey='id' rowSelection={rowSelectionScript} columns={ScriptColumes} dataSource={script} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

AgentDetail.propTypes = {

};

export default AgentDetail;
