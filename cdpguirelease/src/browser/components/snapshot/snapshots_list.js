import React, {Component, PropTypes} from 'react';
import {Table,Button,Row,Modal} from 'antd'
import auth from '../../utils/auth'

import {Link} from 'react-router'
import {fetch_snapshots_list,echo_map_snapshot_modal,close_map_snapshot_modal,map_snapshot} from '../../actions/actions'
import SearchInput from '../common/searchinput'
import MapVolume from '../volume/map_volume'


class SnapshotsList extends Component {
    constructor(props) {
        super(props);
        this.showSnapListPage = this.showSnapListPage.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
        this.handle_map_snapshot = this.handle_map_snapshot.bind(this)
        this.handle_close_map_snapshot = this.handle_close_map_snapshot.bind(this)
        this.submit_map_snapshot = this.submit_map_snapshot.bind(this)
    }
    handleSearch(searchKey){
        this.props.dispatch(fetch_snapshots_list({
            searchKey: searchKey
        }, this.props.pagination.pageSize, 1));
    }
    showSnapListPage(current){
        this.props.dispatch(fetch_snapshots_list({
            searchKey: this.refs.searchInput.state.value
        }, this.props.pagination.pageSize, current));
    }
    onShowSizeChange(current, pageSize){
        this.props.dispatch(fetch_snapshots_list({
            searchKey: this.refs.searchInput.state.value
        }, pageSize, current));
    }
    handle_map_snapshot(){
        const {dispatch} = this.props
        const {snapshotslist} = this.props
        if (snapshotslist.selectedSnapshots.length == 1) {//单选
            dispatch(echo_map_snapshot_modal())
        }
        else {
            Modal.warning({
                title: '请选择一个卷',
                content: '请选择一个卷进行映射',
            })
        }
        
        
    }
    submit_map_snapshot(lun){
        const {dispatch} = this.props
        const {selectedSnapshots} = this.props.snapshotslist
        const snapshot_id = selectedSnapshots[0].id
        console.log(lun)
        console.log(snapshot_id)
        dispatch(map_snapshot(lun,snapshot_id,auth))
    }
    handle_close_map_snapshot(){
        const {dispatch} = this.props
        dispatch(close_map_snapshot_modal())
    }
    render() {
        const {items,onChange, selectedSnapshots, selectedRowKeys,luns,agents,portals,snapshotslist} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '快照名称',
                dataIndex: 'name',
                render: (text, record) => {
                    return (<Link to={`/snapshots/${record.id}`}>{text}</Link>)
                },
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
                title: '实际使用空间',
                dataIndex: 'usage.bd_used',
            },
            {
                title: '容量',
                dataIndex: 'usage.bd_megs',
            },
            {
                title: '状态',
                dataIndex: 'status.status',
            }];
        const pagination = {
            current: this.props.pagination.current,
            total: this.props.pagination.total,
            pageSize: this.props.pagination.pageSize,
            onChange: this.showSnapListPage,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10','20','30','40'],
            showTotal: function(){return '总共'+this.props.pagination.total+'条数据';}.bind(this)
        }

        const {onDelete} = this.props
        return (
            <div>
                <Row className="table_toolbar">
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this)} ref="searchInput"></SearchInput>
                    <Button type='ghost' icon='delete' className="cdp_button_right" onClick={onDelete}>删除</Button>
                    <Button type='ghost' icon='link' className="cdp_button_left" onClick={this.handle_map_snapshot}>映射</Button>
                </Row>
                <MapVolume ref='mapvolume' portals={portals} visible={snapshotslist.map_snapshot_modal} onOk={this.submit_map_snapshot} onCancel={this.handle_close_map_snapshot}
                        agents={agents} luns={luns}/>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} pagination={pagination}/>
            </div>
        );
    }
}

SnapshotsList.propTypes = {

};

export default SnapshotsList;