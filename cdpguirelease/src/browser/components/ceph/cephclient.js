import React, {Component, PropTypes} from 'react';
import {Table,Button,progress,Row} from 'antd'
import {Link} from 'react-router'

class Cephclient extends Component {
    render() {
        const {items,onChange,selectedRowKeys,cephclusters,host} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        const columns = [
            {
                title: '编号',
                dataIndex:'id',
                width:'33%',
            },
            {
                title: '主机名',
                dataIndex:'host',
                width:'33%',
                render:(text,recoder)=>{
                    for(let i=0;i<host.length;i++){
                        if(text==host[i].url){
                            return (<Link to={`/hosts/${text.split('/').pop()}`}>{host[i].name}</Link>)
                        }
                    }
                }
            },
            {
                title: '集群名',
                dataIndex:'cluster',
                width:'33%',
                render:(text,recoder)=>{
                   for(let i=0;i<cephclusters.length;i++){
                        // console.log(text)
                        if(text==cephclusters[i].url){
                            return cephclusters[i].name
                        }
                    }
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


export default Cephclient;