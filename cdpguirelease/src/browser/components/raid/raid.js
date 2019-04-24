
import React, {Component, PropTypes} from 'react';
import {Table,Button,Select,Spin} from 'antd'
Option = Select.Option
import {Link} from 'react-router'

 class Raid extends Component {
    
   render() {
       const state={
            A:'正常',
            D:'写失败',
            S:'同步失败',
            R:'读失败',
        } 
        
       // const {items} = this.props;
        const {items,onChange,selectedRaid, selectedRowKeys,volumes,raid,onRaidLoadresume} = this.props
        // console.log(volumes)
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        
         const columns = [{
                title: '编号',
                dataIndex: 'id',
            },
			{
                title: '名字',
                dataIndex: 'name',
                render: (text, record) =>{
                 	return(<span>{ record.name}</span>)
                 }
            },
             {
                title: '卷1',
                render: (text, record) => {
                    // console.log(state)
                    for(let i in state){if(i=record.usage[8].split('')[0]){
                        return(<span>{ record.sourcevolume+'('+state[i]+')'}</span>)
                    }}
                 	
                 	
                 }    
            },
            
            {
                title: '卷2',
                dataIndex: 'dstvolume',
                render: (text, record) => {
                	for(let i in state){if(i=record.usage[8].split('')[1]){
                        return(<span>{ record.sourcevolume+'('+state[i]+')'}</span>)
                    }}
                },
            },

            {
            	title:'卷进度',
            	render:(text,record) =>{
            		let str=text.usage[6];
            		let s=str.split('/');
            		let result = (Number(s[0])/Number(s[1]))*100;
            		result = result.toFixed(2)
            		return(<span>{`${result}%`}</span>)
            	},
            },
             {
                title: '操作',
                key: 'operation',
                render: (text, record) =>
                    <div className="raidd" >
                        <button onClick = {onRaidLoadresume.bind(this,record.id)} style={{fontSize:13,borderRadius:2,color: '#5f5f5f',width: 60,height: 25,}}>重载</button>
                    </div>,
            }];
        
                if(volumes !=''){
                    return (<div> 
                              <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
                            </div>)
                }else{
                    return <Spin/>
                }
                
            
        

    }
}

Raid.propTypes = {
   
};

export default Raid;

