import React, {Component, PropTypes} from 'react';
import {Table,Button,progress,Row} from 'antd'

class Cephpool extends Component {
    render() {
        const {items,onChange,selectedRowKeys,} = this.props
        // console.log(items)
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        const columns = [
            {
                title: '编号',
                dataIndex:'id',
                width:'25%',

            },
            {
                title: '默认副本数',
                dataIndex:'size',
                width:'25%',

            },
            {
                title: '最小副本数',
                dataIndex:'min_size',
                width:'25%',


            },
            {
                title: '集群地址',
                dataIndex:'cluster',
                width:'25%',
                render:(text,recoder)=>{
                    return (text.split('//')[1])
                }


            },
            
            ];
            
        
        return (
            <Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={items} rowSelection={rowSelection} loading={this.props.isFetching}/>
                </Row>

            </Row>
        );
   
    }

}


export default Cephpool;