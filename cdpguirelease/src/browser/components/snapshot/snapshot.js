import React, {Component, PropTypes} from 'react';
import {Table,Row} from 'antd'
import {Link} from 'react-router'


class Snapshot extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const {items,onChange, selectedSnapshots, selectedRowKeys} = this.props
        // console.log(items)
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
            },
            {
                 title: '操作',
                // key: 'operation',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => {
                    return (<Link to={`/snapshots/${record.id}`}>详情</Link>)
                },
            }
            ];
            // console.log(this.props.pagination)
            
            const pagination = {
                current: this.props.pagination.current,
                total: this.props.pagination.total,
                pageSize: this.props.pagination.pageSize,
                onChange: this.props.showSnapshotPage,
                onShowSizeChange: this.props.onShowSizeChange,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ['10','20','30','40'],
                showTotal: function(){return '总共'+this.props.pagination.total+'条数据';}.bind(this)
            }
        return (

            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} pagination={pagination}/>
            </div>
        );
    }
}

Snapshot.propTypes = {

};

export default Snapshot;