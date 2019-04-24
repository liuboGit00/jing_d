import React, {Component, PropTypes} from 'react';
import {Table,Icon,Tooltip,Card} from 'antd'
import {fetch_config,toggle_config,set_config_status} from '../../actions/configaction'

import {Link} from 'react-router'
class Config extends Component {
    handleChange(name,sta){
        const{dispatch,items}=this.props
        for(let i=0;i<items.length;i++){
            if(name==items[i].name&&sta!=items[i].status){
                dispatch(set_config_status(name,sta))
            }
        }
        
        // console.log(name,sta)
    }
    render() {
        const {items,onChange,selectedConfig, selectedRowKeys} = this.props
        // console.log(items)
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)



        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
                width:'25%',
            },
            {
                title: '状态',
                dataIndex: 'status',
                width:'25%',
            },
            {
                title: '操作',
                width:'25%',
                render: (text, record) =>{
                    if(record.status=='stop'){
                        return(<span><Icon onClick={this.handleChange.bind(this,record.name,'stop')} style={{fontSize:20}} type="play-circle-o"/> <Icon onClick={this.handleChange.bind(this,record.name,'start')} style={{fontSize:20}} type="pause-circle"/></span>)
                    }else if(record.status=='start'){
                        return(<span><Icon onClick={this.handleChange.bind(this,record.name,'stop')} style={{fontSize:20}} type="play-circle"/> <Icon onClick={this.handleChange.bind(this,record.name,'start')} style={{fontSize:20}} type="pause-circle-o"/></span>)
                    }else{
                        return(<span><Icon onClick={this.handleChange.bind(this,record.name,'stop')} style={{fontSize:20}} type="play-circle"/> <Icon onClick={this.handleChange.bind(this,record.name,'start')} style={{fontSize:20}} type="pause-circle"/></span>)
                    }                  
                } 

            },
            {
                title:'操作',
                width:'25%',
                render: (text, record) => <div><Tooltip placement='bottom' trigger='click' title={record.usage} overlayStyle={{overflow:'hidden',overflowY:'auto',maxHeight:200,background:'white',fontColor:'black'}}><span>详情</span></Tooltip></div>,
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Config.propTypes = {

};

export default Config;