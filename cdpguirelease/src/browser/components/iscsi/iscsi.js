import React, {Component, PropTypes} from 'react';
import {Table,Button,Tabs,Row} from 'antd'
import {Link} from 'react-router'
const TabPane = Tabs.TabPane;
import {fetch_iscsiportal_target} from '../../actions/iscsiactions'

class Iscsi extends Component {
    scanTarget(id){
        const{dispatch}=this.props;
        dispatch(fetch_iscsiportal_target(id[0]))
    }
    render() {
        const {login,target,items,onChange,selectedRowKeys,onDelete,onCreate,login_iscsitarget,logout_iscsitarget} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        console.log(items)

        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '端口号',
                dataIndex: 'port',
            }];
        const targ = [
            {
                title: '编号',
                render:(text,record)=>{
                    return <Link  to={`/iscsitarget/${record.id}`}>{text.id}</Link> 
                }
                
            },
            {
                title: '端口id',
                dataIndex: 'portalid',
            },
            {
                title: '目标',
                dataIndex: 'target',
            },
            {
                title: 'iscsi端口',
                dataIndex: 'iscsiportal',
            },
            {
                title:'状态',
                render: (text, record) => {
                    var status = login.find(item=>(item[1]==text.target))
                    if(status!=undefined&&text.target==status[1]){
                       return (<button className='iscsi_button' onClick={logout_iscsitarget.bind(this,'iscsitgt_logout',text.id,text.target,text)}>login</button>)    
                    }else{
                       return (<button className='iscsi_button' onClick={login_iscsitarget.bind(this,'iscsitgt_login',text.id,text.target,text)}>logout</button>)
                    }
                }
            }];
        return (
            <div>
                <Tabs defaultActiveKey='1' tabPosition='top' type='card'>
                    <TabPane tab="ISCSI存储" key="1">
                        <Row className="table_toolbar">
                            <Button type='ghost' icon='delete' className="cdp_button_right" onClick={onDelete}>删除外接iscsi</Button>
                            <Button type='ghost' icon='plus' className="cdp_button_right" onClick={onCreate}>创建外接iscsi</Button>
                            <Button type='target' icon='reload' className="cdp_button_right" onClick = {this.scanTarget.bind(this,selectedRowKeys)} >扫描目标</Button>
                            
                        </Row>
                        <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
                    </TabPane>
                    <TabPane tab='ISCSI目标' key='2'>
                        <Table rowKey='id' rowSelection={rowSelection} columns={targ} dataSource={target} />
                    </TabPane>
                </Tabs>
            </div>
            )

    }
}

Iscsi.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Iscsi