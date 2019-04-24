import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'

class Samba extends Component {
    render() {
        const {items,onChange,selectedSamba, selectedRowKeys,volumes} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                width:'20%',

            },
            {
                title: '名字',
                dataIndex: 'name',
                width:'20%',

            },
            {
                title: '本地目录',
                dataIndex: 'path',
                width:'20%',

            },
            {
                title: '本地卷',
                dataIndex: 'volume',
                width:'20%',
                render:(text,recoder)=>{
                    for(let i=0;i<volumes.length;i++){
                        if(recoder.volume==volumes[i].url){
                            return volumes[i].name
                        }
                    }
                }
            },
            {
                title: '解释说明',
                dataIndex: 'comment',
                width:'20%',

            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Samba.propTypes = {

};

export default Samba;