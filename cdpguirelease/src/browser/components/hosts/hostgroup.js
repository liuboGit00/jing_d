import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd'
import {Link} from 'react-router'

class Hostgroup extends Component {
    render() {
        const {items,onChange, selectedRowKeys,hosts,setProperty} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)
        const columns = [
            {
                title: '任务名称',
                width:'40%',
                dataIndex:'name',
                render: (text, record) => {
                    return text
                },
            },{
                title: '主机',
                width:'50%',
                dataIndex:'hosts',
                render: (text, record) => {
                    let ho='';
                    for(let i=0;i<hosts.length;i++){
                        for(let j=0;j<text.length;j++){
                            if(text[j]==hosts[i].url){
                                ho+=hosts[i].name+ "  "
                            }
                        }
                    }
                    return ho
                    // console.log(text)
                },
            },{
                title:'操作',
                width:'10%',
                render:(text,record)=>{
                    return( <Link to={`hostgroups/${text.id}`} onClick={()=>{setProperty(text.id)}}>详情</Link>)
                }
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Hostgroup.propTypes = {
    // items: PropTypes.array.isRequired,
};

export default Hostgroup;