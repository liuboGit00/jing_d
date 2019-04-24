import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd'
import {Link} from 'react-router'

class Agent extends Component {
    render() {
        const {items,onChange,selectedAgents, selectedRowKeys} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange 
        // console.log(items)

        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '客户端名称',
                dataIndex: 'name',
                render: (text, record) => {
                    return (<Link to={`/agents/${record.id}`}>{text}</Link>)
                },
            },
            {
                title: '系统',
                dataIndex: 'saved_grains.kernel',
                render:(text,record)=>{
                    if(text!=undefined){
                        if(record.saved_grains.os=='Windows'){
                            return(text+' '+ record.saved_grains.osrelease)
                        }else{
                            return(text+' '+ record.saved_grains.os)
                        } 
                    }else{
                        return '未知'
                    }
                }
            },
            {
                title: 'IP',
                dataIndex: 'saved_grains.ipv4',
                render:(text,record)=>{
                    // console.log(text)
                    if(record.saved_grains!=null&&text!=undefined){
                        return(text.map(function(item){
                            if(item.split('.').pop()>1){
                                // console.log(item)
                                return item+' '
                            }else{
                                return null
                            }
                        }))
                    }else{
                        return '未知'
                    }
                }
            },
            {
                title: '是否在线',
                render: (text, record) => {
                    const agent=items.find(item=>(item.id==record.id))
                    // console.log(agent.online)
                    if(agent.online==undefined){
                       return <div>未知</div>
                    }else{
                        if(agent.online==true){
                           return <div>online</div>
                        }else{
                           return  <div>offline</div>
                        }
                    }
                }
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Agent.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Agent;