import React, {Component, PropTypes} from 'react';
import {Table,Icon,Tooltip,Card,Tabs} from 'antd'
import {Link} from 'react-router'
const TabPane = Tabs.TabPane;

class AuditDetail extends Component {
    render() {
        const {items,volumes} = this.props
        // console.log(items)
        // console.log(location.href)
        const id = location.href.split('/').pop().split('?')[0]
        const arr =[];
        for (let i=0;i<items.length;i++){
            if(items[i].id==id){
                var item=JSON.parse(items[i].request)
            }
        }
        for(var i in item){
            console.log(i,item[i])
            arr.push(<p key={i}>{i+' : '+item[i]}</p>)
        }
        return (
            <div>
                <Tabs defaultActiveKey='1' tabPosition='top' type='card'>
                    <TabPane tab="基本信息" key="1">
                        {arr}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}


export default AuditDetail;