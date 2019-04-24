import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd'
import {Link} from 'react-router'

class Scripts extends Component {
    render() {
        const {items,onChange, selectedRowKeys,agents} = this.props
        // console.log(selectedRowKeys)
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
		const columes=[
    	{
    		title:'名字',
    		dataIndex:'name',
    		width:'25%'
    	},
    	{
    		title:'客户端',
    		dataIndex:'agent',
    		width:'25%',
    		render:(text,recoder)=>{
    			if(agents!=''){
    				for(let i=0;i<agents.length;i++){
    					if(text==agents[i].url){
    						return agents[i].name
    					}
    				}
    			}
    		}
    	},
    	{
    		title:'脚本类型',
    		dataIndex:'shelltype',
    		width:'25%'
    	},
    	{
    		title:'脚本运行类型',
    		dataIndex:'when',
    		width:'25%'
    	}]
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columes} dataSource={items} />
            </div>
        );
    }
}

Scripts.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Scripts;