import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'
//import {vpcserver} from '../../confs/host'

class Clouddetail extends Component {
    render() {
        const {items,onChange,selectedCloudshost, selectedRowKeys,agents,id} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        //console.log(vpcserver)
        let host =[]
        if(items&&items.length>0){
            for(let i=0;i<items.length;i++){
                host.push({'name':items[i],'id':i,'register':'未注册'})
            }
            for(let k in host){
                for(let i = 0;i<agents.length;i++){
                    if (host[k].name == agents[i].name) {
                        host[k].register='已注册'
                    };
                }
               
            }
        }
        // console.log(host)
        const columns = [
            {
                title: '    主机',
                dataIndex: 'name',
                render:(text,record)=>{
                    console.log(text,record)
                    return(<Link to={`/clouds/${id}/${text}`}>{text}</Link>)
                }
            },{
                title:'状态',
                dataIndex:'register'
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={host} />
            </div>
        );
    }
}

Clouddetail.propTypes = {

};

export default Clouddetail;