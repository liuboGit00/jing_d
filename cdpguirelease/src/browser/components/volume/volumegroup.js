import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'

class Volumegroup extends Component {
    render() {
        const {items,onChange,selectedVolumegroup,selectedRowKeys} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)
        const columns = [{
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '卷组名',
                dataIndex: 'groupname',
            },
            {
                title: '执行前路径',
                dataIndex: 'preshell',
            },
            {
                title: '执行后路径',
                dataIndex: 'postshell',
            }];

        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Volumegroup.propTypes = {

};

export default Volumegroup;