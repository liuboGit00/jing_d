
import React, {Component, PropTypes} from 'react';
import {Table,Button,Select,Switch,Icon} from 'antd'
import {Link} from 'react-router'
const Option = Select.Option
class GroupHa extends Component{
	handlechange(record,value){
        const {onDelete,onCreateagentha,onModify,onPromoted} = this.props
        
        // const val = {
        //   '删除':onDelete(record,'group'),
        //   '创建节点':onCreateagentha(record),
        //   '修改':onModify(record,value),
        //   '切换HA的状态':onPromoted(record),
        // }
        // console.log(val)
        // for(let k in val){
          // console.log(val[k])
          // if(k==value){
          //   
          //   val[k]
          // }
        // }
        if(value == '删除'){
            onDelete(record,'group')
        }else if(value =='创建节点' ){
            onCreateagentha(record)
        }else if(value =='修改' ){
          onModify(record,value)
        }else if(value == '切换HA的状态' ){
          onPromoted(record)
        }
    }
    render() {
        const {groupha,agents,agentha,onDelete,startGroupHa,stopGroupHa} = this.props
        // console.log(groupha[0].auto_promote_flag)
        const expandedRowRender =(item)=>{
        	const agentArr =[]
        	for(let i=0;i<agentha.length;i++){
        		if(agentha[i].group==item.url){
        			agentArr.push(agentha[i])
        		}
        	}
			const columns=[
			{
				title:'客户端',
				width:'8%',
				dataIndex:'agent',
				render:(text,record)=>{		
					for(let i=0;i<agents.length;i++){
						if(text==agents[i].url){
							return (<Link to={`/agents/${agents[i].id}`}>{agents[i].name}</Link>) 
						}
					}
				}		
			},{
				title:'客户端状态',
				dataIndex:'promotedstatus',
				width:'8%',

			},{
				title:'权值',
				dataIndex:'rgt',
				width:'8%',

			},{
				title:'连接模式',
				dataIndex:'connectmode',
				width:'8%',

			},{
				title:'网卡名',
				dataIndex:'nic',
				width:'8%',

			},{
				title:'网口',
				dataIndex:'ip',	
				width:'8%',
        render:(text,record)=>{
          if(record.connectmode=='salt'){
            return '-'
          }else{
            return text
          }
        }

			},{
        title:'用户名',
        dataIndex:'username', 
        width:'8%',
        render:(text,record)=>{
          if(record.connectmode=='salt'){
            return '-'
          }else{
            return text
          }
        }

      },{
        title:'密码',
        dataIndex:'passwd', 
        width:'8%',
        render:(text,record)=>{
          if(record.connectmode=='salt'){
            return '-'
          }else{
            return '******'
          }
        }
      },{
				title:'操作',
				width:'8%',
				render:(text,record)=>{
					return(<Select defaultValue="请选择" style={{width:80}} onChange={onDelete.bind(this,record,'agent')}>
							<Option key='请选择'>请选择</Option>
							<Option key='删除' >删除</Option>
						</Select>)
				}
			}]
			return (
    		  <Table
    		  	rowKey="id"
    		    columns={columns}
    		    dataSource={agentArr}
    		    pagination={false}
    		  />
    		)
  		};
        const columns = [
            {
                title: '群组名',
               	dataIndex:'group',
               	width:'20%',

            },
            {
                title: '虚拟IP',
               	dataIndex:'webip',
               	width:'10%',
                render:(text,recod)=>{
                    if(text){
                        return text
                    }
                    return '未知'
                }

            },{
                title:'是否自动提升',
                dataIndex:'auto_promote_flag',
                width:'10%',
                render:(text,record)=>{
                    if(text==false){
                        return '否'
                    }
                    return '是'
                }

            },{
			    title:'运行客户端',
			    dataIndex:'groupHA_set',
			    width:'15%',
			    render:(text,record)=>{
                    let str = null
                    for (var i = 0; i < text.length; i++) {
                        for (var j = 0; j < agentha.length; j++){
                            if(agentha[j].url==text[i]&&agentha[j].promotedstatus=='promoted'){
                                str=agentha[j].agent
                            }
                        };
                    };
			     	for(let i=0;i<agents.length;i++){
			     		if(str==agents[i].url){
			     			return (<Link to={`/agents/${agents[i].id}`}>{agents[i].name}</Link>)
			     		}
			     	}
                    return '未知'
			     }		
			       },
            {
				title:'群组开关',
               	width:'15%',
               	dataIndex:'on_off',
               	render:(text,record)=>{
               		// console.log(text)
                    if(text=='on'){
                    	// return(<Icon type='pause-circle-o' onClick={stopGroupHa.bind(this,record.id,)} style={{fontSize:20,}}></Icon>)
                        return(<Switch checkedChildren="开" unCheckedChildren="关"   defaultChecked   onChange={stopGroupHa.bind(this,record.id,)}/>)
                    }else{
                    	// return(<Icon type='play-circle-o' onClick={startGroupHa.bind(this,record.id,)} style={{fontSize:20,}}></Icon>)
                        return(<Switch checkedChildren="开" unCheckedChildren="关"    onChange={startGroupHa.bind(this,record.id,)}/>)
                    }
                    
               	}
			},{
				title:'操作',
				width:'15%',
				render:(text,record)=>{
					return(<Select defaultValue="请选择" style={{width:100}} onChange={this.handlechange.bind(this,record)}>
							<Option key='请选择'>请选择</Option>
              						<Option key='修改'>修改</Option>
							<Option key='删除'>删除</Option>
							<Option key='创建节点'>创建节点</Option>
              <Option key='切换HA的状态'>切换HA的状态</Option>


						</Select>)
				}
			}];
        return (
            <div>
                <Table rowKey='id' className="components-table-demo-nested" expandedRowRender={expandedRowRender}  columns={columns} dataSource={groupha} />
            </div>
        );
    }
}



export default GroupHa;