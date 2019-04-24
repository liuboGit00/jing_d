import React, {Component, PropTypes} from 'react';

import {Table,Button,Select} from 'antd'
Option = Select.Option
class Agentmirror extends Component{
	handleChange(value){
		console.log(value)
		const{onRefresh,onRemove,onExtend,onMirror,onHpmirror}=this.props
		if(value.split(':')[1]=='refresh'){
			onRefresh(value.split(':')[0],value.split(':')[2],value.split(':')[3])
		}else if(value.split(':')[1]=='remove'|| value.split(':')[1]=='hpvolume'){
			onRemove(value.split(':')[0],value.split(':')[1])
		}else if(value.split(':')[1]=='extend'){
			onExtend(value.split(':')[0])
		}else if(value.split(':')[1] == 'mirror'){
			onMirror(value.split(':')[0],value.split(':')[2],value.split(':')[3])
		}else if(value.split(':')[1] == 'hpmirror'||value.split(':')[1] == 'hpunmirror'){
			onHpmirror(value.split(':')[0],value.split(':')[1])
		}
	}
	render(){
		const{onChange,items,selectedRowKeys}=this.props
		// console.log(items)
		const rowSelection={}
		rowSelection.onChange = onChange
		const columns=[
			{
				title:'客户端',
				dataIndex:'agentname',
				width:'15%'
			},{
				title:'系统',
				dataIndex:'os',
				width:'15%'
			},{
				title:'卷组名',
				dataIndex:'vgname',
				width:'15%'

			},{
				title:'卷组信息',
				width:'30%',
				render:(text,recod)=>{
					const str=eval('('+text.vgdetails+')')
					// console.log(str)
					var det=''
					for(let i=0;i<str.length;i++){
						det+=str[i]+';'
					}
					return det
				}

			},{
				width:'100px',
				title:'操作',
				render:(text,recod)=>{
					console.log(text.os)
					if(text.os!=undefined&&text.os!=''&&text.os=='AIX'){
						return(<Select ref='clearvalue'   value='请选择' dropdownStyle={{textAlign:'center',}} style={{width:100,marginLeft:-10}} onChange={this.handleChange.bind(this)} >
                    	    <Option  key='请选择' value='请选择' >请选择</Option>
                    	    <Option  key={text.id+':refresh'+':'+text.agentname+':'+text.vgname} value={text.id+':refresh'+':'+text.agentname+':'+text.vgname}>刷新</Option>
                    	    <Option  key={text.id+':remove'} value={text.id+':remove'}>删除卷</Option>
                    	    <Option  key={text.id+':extend'} value={text.id+':extend'}>添加卷</Option>
                    	    <Option  key={text.id+':mirror'+':'+text.agentname+':'+text.vgname} value={text.id+':mirror'}>卷组镜像</Option>
                    	</Select>)
					}else if(text.os!=undefined&&text.os!=''&&text.os=='HPUX'){
						return(<Select ref='clearvalue'   value='请选择' dropdownStyle={{textAlign:'center',}} style={{width:100,marginLeft:-10}} onChange={this.handleChange.bind(this)} >
                    	    <Option  key='请选择' value='请选择' >请选择</Option>
                    	    <Option  key={text.id+':hpmirror'+':'+text.agentname+':'+text.vgname} value={text.id+':hpmirror'+':'+text.agentname+':'+text.vgname}>镜像</Option>
                    	    <Option  key={text.id+':hpunmirror'+':'+text.agentname+':'+text.vgname} value={text.id+':hpunmirror'+':'+text.agentname+':'+text.vgname}>取消镜像</Option>
                    	    <Option  key={text.id+':hpvolume'+':'+text.agentname+':'+text.vgname} value={text.id+':hpvolume'+':'+text.agentname+':'+text.vgname}>删除卷</Option>
                    	</Select>)
					}else{
						return(<Select ref='clearvalue'   value='请选择' dropdownStyle={{textAlign:'center',}} style={{width:100,marginLeft:-10}} onChange={this.handleChange.bind(this)} >
                    	    <Option  key='请选择' value='请选择' >请选择</Option>
                    	</Select>)
					}
					
				}
			}
		]
		return(
			<div>
				<Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
			</div>
		)
	}
}
export default Agentmirror