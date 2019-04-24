import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'
//import {vpcserver} from '../../confs/host'

class Filersync extends Component {
    render() {
        const {items,onChange,selectedFilersync, selectedRowKeys,volumes} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        //console.log(vpcserver)
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                width:'10%',
            },
            {
                title: '云主机名称',
                dataIndex: 'name',
                width:'20%',

                
            },
            {
                title: '目的目录',
                dataIndex: 'path',
                width:'20%',

            },
            {
                title: '文件卷',
                dataIndex: 'volume',
                width:'20%',
                render:(text,record)=>{
                    for(let i=0;i<volumes.length;i++){
                        if(text==volumes[i].url){
                            return (<Link to={`/volumes/${volumes[i].id}`}>{volumes[i].name}</Link>  )
                        }
                        
                    }
                }
            },
            {
                title: '详细说明',
                dataIndex: 'comment',
                width:'30%',

            },

            ];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Filersync.propTypes = {

};

export default Filersync;