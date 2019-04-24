import React, {Component, PropTypes} from 'react';
//import {Link} from 'react-router'
import { Tabs,Progress,Table } from 'antd';
import VolumesContainer from '../../containers/volumecontainer'

const TabPane = Tabs.TabPane;

class PoolDetail extends Component {
    render() {
        const {item,poolvolume}=this.props
        var timestamp = Date.parse(new Date(item.createdate));
        var newDate = new Date();
        newDate.setTime(timestamp)
        var createdate=newDate.toLocaleString()
        var disklist = new Array()
        const {disks} = this.props
        var id = item.id
        
        // console.log(item)
        disks.forEach(function(disk){
            // console.log(disk.upper)
            if (disk.upper != null){
            if(disk.upper.split('volumes/')[1]==id){
                disklist.push(disk)
            }
            }
        })
        const columns = [{
            title: '硬盘名',
            dataIndex: 'name',
        }, {
            title: '容量',
            dataIndex: 'size.size_text',
            render:(text,record)=>{
                // console.log(text,record)
            }
        }, {
            title: '状态',
            dataIndex: 'status.status',
        }];
        console.log(poolvolume)

        return (
            <div>
                <Tabs defaultActiveKey="1" tabPosition='top' type='card'>
                    <TabPane tab="基本信息" key="1">
                        <li>存储池名 ：{item.name}</li>
                        <li>id:{item.id}</li>
                        <li>创建时间：{createdate}</li>
                        <li>空闲空间：{(item.usage.free/1024).toFixed(2)+'G'}</li>
                        <li>总容量：{(item.usage.size/1024).toFixed(2)+'G'}</li>

                        <li>状态：{item.status.status}</li>

                        <Progress type="circle" percent={item.usage.free/item.usage.size*100} format={(percent)=>`空闲${percent.toFixed(2)}%`}  />
                    </TabPane>
                    <TabPane tab="硬盘组成" key="2">
                        <Table rowKey='id' columns={columns} dataSource={disklist} />
                    </TabPane>
                    <TabPane tab="池中已创建块设备" key="3"><VolumesContainer url={item.volumes} poolvolume={poolvolume}  filtertype='zvol'  showtype='pool' /></TabPane>
                    <TabPane tab="池中已创建文件系统" key="4"><VolumesContainer url={item.volumes}  poolvolume={poolvolume} filtertype='zfs' showtype='pool' /></TabPane>
                </Tabs>
            </div>
        )

    }
}

PoolDetail.propTypes = {

};

export default PoolDetail;