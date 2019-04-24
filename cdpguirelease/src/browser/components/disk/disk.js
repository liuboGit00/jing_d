//import restapi from '../confs/host';
//import 'babel-polyfill'

import React, {Component, PropTypes} from 'react';
//import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import update from 'immutability-helper'
//require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
//import 'whatwg-fetch';
// require the module
import API from 'fetch-api';
//import {Button,Icon,Table} from 'amazeui-react'
import {Table,Checkbox} from 'antd'

// instantiate a new API instance



class Disk extends Component {
    constructor(props) {
        super(props)
        this.getCheckboxProps = this.getCheckboxProps.bind(this)

    }
    getCheckboxProps(record){
        /*let checked = false

         if(this.props.selectedDisks !== undefined){
         checked = (this.props.selectedDisks.filter( disk => {disk.id === record.id}).length > 0)
         console.log(record.id +'checked = '+checked)
         }*/
        return {
            disabled: record.upper !== null
        }

    }
    render() {
        const {items, onChange,selectedDisks,selectedRowKeys} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        //rowSelection.getCheckboxProps = this.getCheckboxProps
        rowSelection.selectedRowKeys = selectedRowKeys
        const columns = [{
            title: '硬盘名',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '容量',
            dataIndex: 'size.size_text',
        }, {
            title: '状态',
            dataIndex: 'status.status',
        }];

        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        )


        /*
         return (

         <div>

         <Table bordered striped hover radius>
         <thead>
         <tr>
         <th>硬盘名</th>
         <th>容量</th>
         <th>状态</th>
         </tr>
         </thead>
         <tbody>

         {items.length > 0 && items.map((item,index)=>{
         return (
         <tr key={item.id}>
         <td> <Checkbox defaultValue={item.checked} checked={item.checked}  onChange= {() => onChange( item.id)}/> {item.name}</td>
         <td>{item.size.size_text}</td>
         <td>{item.status.status}</td>
         </tr>
         )
         })}
         </tbody>
         </Table>

         <Button>
         <Icon icon="cog" /> 设置
         </Button>

         <Button amStyle="warning">
         <Icon icon="shopping-cart" /> 败家
         </Button>

         <Button>
         <Icon icon="spinner" spin /> Loading
         </Button>

         <Button amStyle="secondary">
         下载片片 <Icon icon="cloud-download" />
         </Button>
         </div>
         )*/
    }
}

Disk.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Disk