import React, {Component, PropTypes} from 'react';
import {Table,Button, Select } from 'antd';
import {Link} from 'react-router'
const Option = Select.Option;
var arr =[]
var brr =[]

class Volumes extends Component {
    handleStartLog(srcvolId){
        this.props.onStartLog(srcvolId)
    }
    handleReplayLog(volumeId){
        this.props.onReplayLog(volumeId)
    }
    handleChange(value) {
      console.log(`${value}`);
    }
    render() {
        const {items,onChange,selectedVolumes,selectedRowKeys,selectcontent,filtertype,pools} = this.props
        // console.log(items)
        if(filtertype!=undefined){
            arr=[]
            for(let i=0;i<items.length;i++){
                if(items[i].native.type.model==filtertype){
                    arr.push(items[i])
                }
            }
        }else{
            if(selectcontent==undefined || selectcontent=='all'){
                arr=items
            }else{
                arr=[]
                brr=[]
                for(let i=0;i<items.length;i++){
                    if(items[i].native.type.model==selectcontent&&items[i].clonefrom==null){
                        arr.push(items[i])
                    }else if(items[i].native.type.model=='zvol'&&items[i].clonefrom!=null){
                        brr.push(items[i])
                    }
                }
            }
        }
        // console.log(arr)
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        const columns = [{
            title: '卷名',
            width:'20%',
            dataIndex: 'name',
            render: (text, record) => {
                return (<Link to={`/volumes/${record.id}`}>{text}</Link>)
            },
        },
            {
                title: '卷大小',
                dataIndex: 'usage.bd_megs',
                render:(text,record) => {
                    // console.log(text,record.native.type.model)
                    if(record.native.type.model=='zvol'){
                        if(text=='unknown'){
                            if(record.megs>1024){
                                return((record.megs/1024).toFixed(2)+'G')
                            }else if(record.megs>1048576){
                                return((record.megs/1048576).toFixed(2)+'G')
                            }else{
                                return (record.megs+'M')
                            }
                           
                        }else{
                            return text
                        }
                        
                    }else if(record.native.is_volumepool==true){
                        for(let i=0;i<pools.length;i++){
                            if (pools[i].name == record.name) {
                                return pools[i].usage.size_text
                            };
                        }
                        // if(record.usage.size_text=='unknown'){
                        //     if(record.megs>1024){
                        //         return((record.megs/1024).toFixed(2)+'G')
                        //     }else if(record.megs>1048576){
                        //         return((record.megs/1048576).toFixed(2)+'G')
                        //     }else{
                        //         return (record.megs+'M')
                        //     }
                        // }else{
                        //     return record.usage.size_text
                        // }
                    }else if(record.native.type.model=='connection'){
                        if(text=='unknown'){
                            if(record.megs>1024){
                                return((record.megs/1024).toFixed(2)+'G')
                            }else if(record.megs>1048576){
                                return((record.megs/1048576).toFixed(2)+'G')
                            }else{
                                return (record.megs+'M')
                            }
                           
                        }else{
                            if(text>1024){
                                return((text/1024).toFixed(2)+'G')
                            }else if(text>1048576){
                                return((text/1048576).toFixed(2)+'G')
                            }else{
                                return (text+'M')
                            }
                        }
                        
                    }else if(record.native.type.model=='genericdisk'){
                        
                        if(text=='unknown'){
                            if(record.megs>1024){
                                return((record.megs/1024).toFixed(2)+'G')
                            }else if(record.megs>1048576){
                                return((record.megs/1048576).toFixed(2)+'G')
                            }else{
                                return (record.megs+'M')
                            }
                           
                        }else{
                            if(text>1024){
                                return((text/1024).toFixed(2)+'G')
                            }else if(text>1048576){
                                return((text/1048576).toFixed(2)+'G')
                            }else{
                                return (text+'M')
                            }
                        }
                        
                    }else{
                         // console.log(record.name,record.usage.size_text)
                        if(record.usage.size_text=='unknown'){
                            if(record.megs>1024){
                                return((record.megs/1024).toFixed(2)+'G')
                            }else if(record.megs>1048576){
                                return((record.megs/1048576).toFixed(2)+'G')
                            }else{
                                return (record.megs+'M')
                            }
                        }else{
                            return record.usage.size_text
                        }
                        
                    }
                }
            },
            {
                title: '设备路径',
                dataIndex: 'native.path',
                width:'20%'
            },
            {
                title: '状态',
                dataIndex: 'status.status',
                render:(text,record) =>{
                    if(text=='good'){return '良好'}else{return <div style={{color:'#FAAD14'}}>未知</div>}
                }
            },
            {
                title:  '设备类型',
                dataIndex: 'native.type.model',
                // filters: [{
                //     text: '块设备',
                //     value: 'zvol',
                // }, {
                //     text: '文件系统',
                //     value: 'zfs',
                //   },{
                //     text: '镜像设备',
                //     value: 'connection',
                //   },{
                //     text: '日志卷',
                //     value: 'logdevice',
                //   },{
                //     text: '集群卷',
                //     value: 'image',
                //   }
                //   ],
                // filterMultiple: false,
                // onFilter: (value, record) =>{if(record.native.type.model===value){
                //     if(value=='zvol'){return '块设备'}
                //     if(value=='zfs'){return '文件系统'}
                //     if(value=='logdevice'){return '日志卷'}
                //     if(value=='connection'){return '镜像设备'}
                //     if(value=='image'){return '集群卷'}

                // }
                

                // },
                render:(text,record) => {
                    if(text=='zvol'){if(record.clonefrom!==null){return '克隆设备'}else{return '块设备'}}
                    if(text=='zfs'){return '文件系统'}
                    if(text=='logdevice'){return '日志卷'}
                    if(text=='connection'){return '镜像设备'}
                    if(text=='image'){return '集群卷'}
                    if(text=='genericdisk'){return '硬盘设备'}


                }
                
                
            },
            {
                title: '压缩功能',
                dataIndex: 'usage.compression',
                render:(text,record) => {
                    if(text=='on'){return '开启'}
                    if(text=='off'){return '关闭'}
                    if(text=='unknown'){return '未知'}
                }
            },
            {
                title: '重删功能',
                dataIndex: 'usage.dedup',
                render:(text,record) => {
                    if(text=='on'){return '开启'}
                    if(text=='off'){return '关闭'}
                    if(text=='unknown'){return '未知'}
                }
            },
            {
                title: '操作',
                // key: 'operation',
                // width: 220,
                render: (text, record) => {
                    // console.log(record.native)
                    if (record.native.type.model == 'zvol') {
                        return (<div><Link to={`/volumes/${record.id}`}>详情</Link>  &nbsp; &nbsp;
                            <Link to={`/volumes/${record.id}/snapshots`}>配置</Link> &nbsp; &nbsp;
                            <a onClick={this.handleStartLog.bind(this, record.id) }>开启日志</a></div>)
                    }
                    else {
                        if( record.native.is_logdev==true){
                            return (<div><Link to={`/volumes/${record.id}`}>详情</Link>  &nbsp; &nbsp;
                                <Link to={`/volumes/${record.id}/snapshots`}>配置</Link> &nbsp; &nbsp;
                                <a onClick={this.handleReplayLog.bind(this, record.id) }>回放</a>
                            </div>)
                        }else {
                            return (<div><Link to={`/volumes/${record.id}`}>详情</Link>&nbsp; &nbsp;
                                <Link to={`/volumes/${record.id}/snapshots`}>配置</Link></div>
                            )
                        }
                    }
                }
            }];

        return (
            <div>
                {selectcontent=='clone'?<Table rowKey='id' rowSelection={rowSelection} columns={columns}
                       dataSource={brr} />:<Table rowKey='id' rowSelection={rowSelection} columns={columns}
                       dataSource={arr} />}
                


            </div>

        );
    }
}

Volumes.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Volumes;