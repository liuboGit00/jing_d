import React, {Component, PropTypes} from 'react';
import {Tabs,Table,Row,Button}  from 'antd'
import {fetch_initiators} from '../../actions/actions'

const TabPane = Tabs.TabPane;

class Hostinitiators extends Component {
    componentDidMount() {
        // const{dispatch} = this.props
        // const{initiator_set}=this.props.agent
        // dispatch(fetch_initiators(initiator_set))
        
    }
    render() {
        const {enable_disable,fcports,targets,hostini,hostinitiators,loading,onChange,selectedInits, selectedRowKeys,onDelete,onCreate,onTarget,onInitiator} = this.props
        // console.log(targets)
        var data =[];
        if(hostinitiators){
            for(let i=0;i<hostinitiators.length;i++){
                if(hostinitiators[i].host == hostini.url){
                     data.push(hostinitiators[i]);
                }
            }

        }
        var wwn_ports=[];
        if(fcports !=undefined){
            for(let i=0;i<fcports.wwns.length;i++){
                // console.log(hostini.url)
                wwn_ports.push({
                    wwn:fcports.wwns[i]
                })
            }
        }
        var wwn_targrt=[];
        if(fcports !=undefined&&targets!=undefined&&targets!=''){
            // console.log(targets.wwns.length)
            for(let i=0;i<targets.wwns.length;i++){
                wwn_targrt.push({
                    wwn:targets.wwns[i]
                })
            }
        }
        

        // console.log(enable_disable.enable)
        // console.log(enable_disable.disable)


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
        const ports=[
            {
                title:'wwn',
                render:(text,record)=>{
                    return text.wwn
                }
            },
            {
                title: '操作',
                render: (text, record) => {
                    const ww=wwn_targrt.find(item=>((item.wwn).split('.')[1]==(record.wwn).split(':').join('')))
                        if(ww){

                            if((text.wwn).split(':').join('')==(ww.wwn).split('.')[1]){
                                return (<div id="mirror_button">
                                            <button onClick={onInitiator.bind(this,text.wwn)}>targets</button>
                                        </div>)
                            }else{
                                return  (<div id="mirror_button">
                                            <button onClick={onTarget.bind(this,text.wwn)}>initiator</button>
                                        </div>)
                            }
                        }else{
                            return (<div id="mirror_button">
                                            <button onClick={onTarget.bind(this,text.wwn)}>initiator</button>
                                        </div>)
                        }
                        
            
                }
                    
                    
            }
        ]
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys

        
        return (
            <div>
                <Tabs defaultActiveKey='1' tabPosition='top' type='card'>
                    <TabPane tab="基本信息" key="1">
                        <p>name: {hostini.name}</p>
                        <p>id: {hostini.id}</p>
                        <p>token: {hostini.token}</p>
                        <p>hosturl:{hostini.hosturl}</p>
                        <p>device:{hostini.primary_ip_address?hostini.primary_ip_address.device:null}</p>
                        <p>address:{hostini.primary_ip_address?hostini.primary_ip_address.address:null}</p>
                        
                    </TabPane>
                    <TabPane tab='initiator' key='2'>
                        <Row className="table_toolbar">
                            <Button type='ghost' icon='plus' className="cdp_button_left" onClick={onCreate}>创建initiator</Button>
                            <Button type='ghost' icon='delete' className="cdp_button_left" onClick={onDelete}>删除initiator</Button>
                            
                        </Row>
                        <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading}/>   
                    </TabPane>
                    {hostini.netdevice_set!=''?<TabPane tab='光纤节点' key='3'>
                                                <Table rowKey='id' rowSelection={rowSelection} columns={ports} dataSource={wwn_ports} loading={loading}/>   
                                            </TabPane>:null}
                </Tabs>
            </div>
        );
    }
}

Hostinitiators.propTypes = {

};

export default Hostinitiators;