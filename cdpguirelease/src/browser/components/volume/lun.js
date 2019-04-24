import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'

class Lun extends Component {
    render() {
        const {items,onChange,selectedLuns,selectedRowKeys,volumes} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        console.log(items)
        function objectsort(key,bo){
            if(bo){
                return function(a,b){
                    return a[key]>b[key]?1:-1
                }
            }else{
                return function(a,b){
                    return a[key]<b[key]?1:-1
                }
            }

        }
        items.sort(objectsort('lun_id',true))
        // console.log(items)
        const columns = [{
                title: '映射编号',
                dataIndex: 'lun_id',
                width:'10%',
            },
            {
                title: '客户端',
                dataIndex: 'agent',
                width:'10%',
                 render: (text,record) => {
                	// console.log(record)
                	  return (<Link to={`/agents/${record.agent.split('/')[1]}`}>{record.agent.split('/')[0]}</Link>)
                },
            },{
                title:'客户端映射编号',
                width:'10%',
                dataIndex:'map_lunid',
            },{
                title: '卷名称',
                dataIndex: 'volume',
                width:'20%',
                render: (text,record) => {
                	// console.log(record.volume)
                	  return (<Link to={`/volumes/${record.volume.split('/')[1]}`}>{record.volume.split('/')[0]}</Link>)
                },
            },
            {
                title: 'wwn',
                width:'30%',
                render:(text,record)=>{
                    for(let i=0;i<volumes.length;i++){
                        if(text.volume.split('/')[0]==volumes[i].name){
                            return volumes[i].uuid
                        }
                    }
                }

            },{
                title: '接口',
                width:'20%',
                dataIndex: 'portals',
            }];

        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Lun.propTypes = {

};

export default Lun;