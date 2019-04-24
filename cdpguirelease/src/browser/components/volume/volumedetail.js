import React, {Component, PropTypes} from 'react';
import {Tabs,Button,Table} from 'antd'
import SnapshotContainer from '../../containers/snapshotcontainer'

const TabPane = Tabs.TabPane;
class VolumeDetail extends Component {
    getKey(value){
        if(value=='2'){
           const pathname = (location.hash.split('?')[0]).split('/').pop()
           if(pathname != 'snapshots'){
                location.hash = location.hash.split('?')[0]+'/snapshots'
           }
        }else{
                location.hash = location.hash.split('/snapshots')[0]
        }
    }
    render() {
        const {item} = this.props
        const pathname = (location.hash.split('?')[0]).split('/').pop()
        function setKey(){
            if(pathname.indexOf("snapshots")>-1){
                return '2'
            }else{
                return '1'
            }
        }
        const ke = setKey()

        // console.log(ke)
        var timestamp = Date.parse(new Date(item.createdate));
        var newDate = new Date();
        newDate.setTime(timestamp)
        var createdate=newDate.toLocaleString()
        // console.log(item.megs)
        return (
            <div>
                <Tabs defaultActiveKey = {ke}  tabPosition='top' type='card' onTabClick={this.getKey.bind(this)}>
                    <TabPane tab="基本信息" key="1">
                        <li>块设备名：{item.name}</li>
                        <li>id: {item.id}</li>
                        <li>创建时间：{createdate}</li>

                        <li>容量：{item.megs>=1024?(item.megs/1024).toFixed(2)+'G':item.megs+'M'}</li>

                        <li>状态：{item.status.status}</li>
                        <li>压缩功能：{item.usage.compression}</li>
                        <li>重删功能：{item.usage.dedup}</li>

                    </TabPane>
                    <TabPane tab="卷中已创建快照" key="2">
                        <SnapshotContainer url={item.snapshots}/>
                        
                    </TabPane>
                        
                </Tabs>
            </div>
        )
    }
}

VolumeDetail.propTypes = {
};

export default VolumeDetail;