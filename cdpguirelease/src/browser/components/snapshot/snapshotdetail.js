import React, {Component, PropTypes} from 'react';
import {Table,Tabs,Button,Row,Modal} from 'antd'
import {echo_map_snapshot_clone_modal,close_map_snapshot_clone_modal,map_snapshot_clone} from '../../actions/actions'
import MapVolume from '../volume/map_volume'
import auth from '../../utils/auth'


const TabPane = Tabs.TabPane;

class SnapshotDetail extends Component {
    constructor(props) {
        super(props);
        this.handle_map_snapshot_clone = this.handle_map_snapshot_clone.bind(this)
        this.handle_close_map_snapshot_clone = this.handle_close_map_snapshot_clone.bind(this)
        this.submit_map_snapshot_clone = this.submit_map_snapshot_clone.bind(this)
    }
    handle_map_snapshot_clone(){
        const {dispatch} = this.props
        const {snapshotDetail} = this.props
        console.log(this.props)
        if (snapshotDetail.selectedVolumes.length == 1) {//单选
            dispatch(echo_map_snapshot_clone_modal())
        }
        else {
            Modal.warning({
                title: '请选择一个卷',
                content: '请选择一个卷进行映射',
            })
        }
        
        
    }
    submit_map_snapshot_clone(lun){
        const {dispatch} = this.props
        const {selectedVolumes} = this.props.snapshotDetail
        const snapshot_clone_id = selectedVolumes[0].id
        console.log(lun)
        console.log(snapshot_clone_id)
        dispatch(map_snapshot_clone(lun,snapshot_clone_id,auth))
    }
    handle_close_map_snapshot_clone(){
        const {dispatch} = this.props
        dispatch(close_map_snapshot_clone_modal())
    }
    render() {
        // console.log(this.props)
        const {cloneset,snapdetail,onChange,selectedVolumes,selectedRowKeys,onDelete,luns,agents,portals,snapshotDetail} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        console.log(cloneset)
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '名称',
                dataIndex: 'name',
            },

            {
                title: '创建时间',
                dataIndex: 'createdate',
                render: (text, record) => {
                    var timestamp = Date.parse(new Date(text));
                    var newDate = new Date();
                    newDate.setTime(timestamp)
                    return ( newDate.toLocaleString() )
                },
            },
            {
                title: '状态',
                dataIndex: 'status.status',
            }];
        var timestamp = Date.parse(new Date(snapdetail.createdate));
        var newDate = new Date();
        newDate.setTime(timestamp)
        var createdate=newDate.toLocaleString()
        return (
            <div>
                <Tabs defaultActiveKey='1' tabPosition='top' type='card'>
                    <TabPane tab="快照详情" key="1">
                        <li>快照名称： {snapdetail.name}</li>
                        <li>快照id: {snapdetail.id}</li>
                        <li>创建时间： {createdate}</li>

                        <li>容量： {snapdetail.usage.bd_megs}</li>

                        <li>状态： {snapdetail.status.status}</li>

                    </TabPane>
                    <TabPane tab="基于此快照的克隆盘" key="2">
                        <Row className="table_toolbar">
                            <Button type='ghost' icon='delete' className="cdp_button_right" onClick={onDelete}>删除卷</Button>
                            <Button type='ghost' icon='link' className="cdp_button_left" onClick={this.handle_map_snapshot_clone}>映射</Button>
                        </Row>
                        <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={cloneset} />
                        <MapVolume ref='mapvolume' portals={portals} visible={snapshotDetail.map_snapshot_clone_modal} onOk={this.submit_map_snapshot_clone} onCancel={this.handle_close_map_snapshot_clone}
                        agents={agents} luns={luns}/>
                    </TabPane>

                </Tabs>
            </div>
        );
    }
}

SnapshotDetail.propTypes = {

};

export default SnapshotDetail;