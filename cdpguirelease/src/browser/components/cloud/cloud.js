import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'
//import {vpcserver} from '../../confs/host'

class Clouds extends Component {
    render() {
        const {items,onChange,selectedClouds, selectedRowKeys} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        //console.log(vpcserver)
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '云主机名称',
                dataIndex: 'name',
                render: (text, record) => {
                    return <a href={record.adminurl}>{text}</a>
                }
            },
            {
                title: '连接类型',
                dataIndex: 'connection',
            },{
                title:'主机类型',
                dataIndex:'cloudtype'
            },{
                title:'操作',
                render:(text,record)=>{
                    return <Link to={`/clouds/${record.id}`}>详情</Link>
                }
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Clouds.propTypes = {

};

export default Clouds;