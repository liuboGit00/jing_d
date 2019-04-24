import React, {Component, PropTypes} from 'react';
import {Table,Icon,Tooltip,Card} from 'antd'
import {} from '../../actions/configaction'

import {Link} from 'react-router'
class Deadline extends Component {
    
    render() {
        const {items,onChange,selectedRowKeys} = this.props
        const source=[]
        // console.log(items[0].registercode)
        // console.log(items!='',items.registercode!=undefined)
        for(let i=0;i<items.length;i++){
            if(items!=''&&items[i].registercode!=undefined&&items[i].registercode!='exception register failed.'){
                // console.log(JSON.parse(items[0].registercode))
                source.push(JSON.parse(items[0].registercode))
            }
        }
        console.log(source)
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys

        const columns = [
            {
                title: '公司',
                dataIndex: 'company',
                width:'20%',
            },{
                title: '产品',
                dataIndex: 'product',
                width:'20%',
            },{
                title: '有效期',
                dataIndex: 'validtime',
                width:'20%',
            },{
                title: '开始时间',
                dataIndex: 'starttime',
                width:'20%',
            },{
                title: '结束时间',
                dataIndex: 'endtime',
                width:'20%',
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={source} />
            </div>
        );
    }
}

Deadline.propTypes = {

};

export default Deadline;

