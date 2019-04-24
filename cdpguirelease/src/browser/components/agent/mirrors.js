import React, {Component, PropTypes} from 'react';
import {Table,Button,Select} from 'antd'
Option = Select.Option
import {Link} from 'react-router'


class Mirror extends Component {
    handlechange(value){
        const {onClearmap,onPcsinstall,onPrefermirror,onSelectagenturl,onModifyagent,onGetagentrole,onPausesync,onResumesync,onInstall,onInitialize,onSync,onUninstall,onSyncstatus,onInstallagent,onSetagent,onAgentupordown} = this.props
        let id = value.split(':')[0];
        let va = value.split(':')[1];
        let agentid = value.split(':')[2];
        let agentname = value.split(':')[3];
        console.log(value)
        console.log(id,agentid,agentname)
        let obj = {
            "Install":onInstall,
            "Initialize":onInitialize,
            "Sync":onSync,
            "Uninstall":onUninstall,
            "Syncstatus":onSyncstatus,
            "Installagent":onInstallagent,
            "Setagent":onSetagent,
            "Agentupordown":onAgentupordown,
            "Pausesync":onPausesync,
            "Resumesync":onResumesync,
            "Getagentrole":onGetagentrole,
            "Selectagenturl":onSelectagenturl,
            "Prefermirror":onPrefermirror,
            "Pcsinstall":onPcsinstall,
            "Clearmap":onClearmap,
        }
        for(let i in obj ){
            if(va==i){
              obj[i](id,agentid,agentname)  
            }
        };
        // if(va == 'onInstall'){
        //     onInstall(id)
        // }else if(va == 'onInitialize'){
        //     onInitialize(id)
        // }else if(va == 'onSync'){
        //     onSync(id)
        // }else if(va == 'onUninstall'){
        //     onUninstall(id)
        // }else if(va == 'onSyncstatus') {
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
        //     // console.log(id,agentid,agentname)
        //     onSyncstatus(id,agentid,agentname)
        // }else if(va == 'onInstallagent'){
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
        //     onInstallagent(id,agentid,agentname)
        // }else if(va == 'onSetagent'){
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
            
        //     onSetagent(id,agentid,agentname)
        // }else if(va == 'onAgentupordown'){
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
            
        //     onAgentupordown(id,agentid,agentname)
        // }else if (va == 'onPausesync'){
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
            
        //     onPausesync(id,agentid,agentname)
        // }else if (va == 'onResumesync'){
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
            
        //     onResumesync(id,agentid,agentname)
        // }else if(va == 'onGetagentrole'){
        //     // console.log(value)
        //     let agentid = value.split(':')[2];
        //     let agentname = value.split(':')[3];
            
        //     onGetagentrole(id,agentid,agentname)
        // }else if(va == 'onSelectagenturl'){
        //     onSelectagenturl(id)
        // }else if(va == 'onPrefermirror' ){
        //    onPrefermirror(id)
        // }
    }

    render() {
        const {items,agent,address,onChange,selectedAgents, selectedRowKeys,pagination,onInstall,onInitialize,onSync,onUninstall,onSyncstatus,onInstallagent} = this.props
        // console.log(items)
        if(items!=undefined && agent != ''&&items!=''){
            
            for(let i=0;i<items.length;i++){
                if(items[i].getagentendpoint[0]!=undefined){
                    for(let j=0;j<agent.length;j++){
                        // console.log(items[i].getagentendpoint[0])
                       if(items[i].getagentendpoint[0].agent == agent[j].url){
                            items[i].getagentendpoint[0].address = agent[j].name
                       }
                    }  
                }
            }
        
        }
            
  
        

        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        const formItemLayout={
                    labelCol: { span: 6 },
                    wrapperCol: { span: 15 },
                };
        const columns = [
            {
                title: '任务名称',
                render: (text,record)=>{
                    return text.name                
                }

            },
            // {
            //     title: '客户端1',
            //     render: (text,record) => {
            //         // console.log(text.getstatus.length)
            //         if(text.getstatus.length==1){
            //             return '未知'
            //         }else if(text.getstatus.length==2&&text.getstatus[1].role!='Primary'&& text.getstatus[1].role!='Secondary'){
            //             return '未知'
            //         }else{
            //             return text.getstatus[1].role
            //         }
            //     }

            // },
            // {
            //     title: '主机名',
            //     render: (text) => {
            //         if(text.getagentendpoint[0] == undefined){
            //             return 'null'
            //         }else{
            //             return text.getagentendpoint[0].address;
            //         }
            //     }
            // },
            // {
            //     title: '主客户端',
            //     render: (text,record) => {
            //     }

            // },
            {
                title:'状态',
                render: (text,record) => {
                    if(text.getlocalendpoint[0] == undefined){
                        return '未知'
                    }else{
                        if(text.getlocalendpoint[0].drbdstatus == undefined){
                            return '未知'
                        }else{
                            if(text.getlocalendpoint[0].drbdstatus[0]=='degraded')
                            {
                                if(text.getlocalendpoint[0].drbdstatus[1]=='degraded'){
                                    return <div><img src={require("../../public/img/on.png")} width="100px" height="44px"/></div>

                                }else if(text.getlocalendpoint[0].drbdstatus[1]=='online'){
                                    return <div><img src={require("../../public/img/right.png")} width="100px" height="44px"/></div>
                                }else if(text.getlocalendpoint[0].drbdstatus[1]=='unknown') {
                                    return <div><img src={require("../../public/img/off.png")} width="100px" height="44px"/></div>
                                }
                            }else if(text.getlocalendpoint[0].drbdstatus[0]=='online'){
                                if(text.getlocalendpoint[0].drbdstatus[1]=='degraded'){
                                    return <div><img src={require("../../public/img/left.png")} width="100px" height="44px"/></div>
                                }else if(text.getlocalendpoint[0].drbdstatus[1]=='online'){
                                    return <div><img src={require("../../public/img/success.png")} width="100px" height="44px"/></div>

                                }else{
                                    return <div id="mirror_arrows"><img src={require("../../public/img/error.png")} width="100px" height="44px"/></div>
                                }
                            
                            }else if(text.getlocalendpoint[0].drbdstatus[0]=='unknown'){
                                if(text.getlocalendpoint[0].drbdstatus[1]== 'unknown'){
                                    return <div id="mirror_arrows"><img src={require("../../public/img/unknown.png")} width="100px" height="44px"/></div>

                                }
                                if(text.getlocalendpoint[0].drbdstatus[1]== 'degraded'){
                                    return <div id="mirror_arrows"><img src={require("../../public/img/off.png")} width="100px" height="44px"/></div>

                                }
                            }else{
                                return <div id="mirror_arrows"><img src={require("../../public/img/error.png")} width="100px" height="44px"/></div>
                            }
                        }
                        
                    }
                }
                    
            },
           
           
            // {
            //     title: '元数据盘',
            //     render: (text,record) => {
            //         // console.log(text.getlocalendpoint[0].metadisk)
            //         if(text.getlocalendpoint[0].metadisk== null){
            //             return 'internal'
            //         }else{
            //             return text.getlocalendpoint[0].metadisk;
            //         }
            //     }

            // },
            {
                title:'连接类型',
                dataIndex:'connecttype',
            },
            {
                title:'配置',
                render: (text, record) => {
                    return (<Link to={`/mirrors/${record.id}`}>详情</Link>)
                },
            },
            {
                title: '操作',
                key: 'operation',
                render: (text, record) => 
                // {console.log(text.getagentendpoint[0].agent)}
                {   
                    var valueid=[];
                    var valuename=[]
                    for(let i=0;i<text.getagentendpoint.length;i++){
                        valueid.push(text.getagentendpoint[i].id) 
                        valuename.push(text.getagentendpoint[i].agentvolumename)
                    }
                    return(<Select ref='clearvalue'   value='请选择' dropdownStyle={{textAlign:'center',}} style={{width:150,textAlign:'center',}} onChange={this.handlechange.bind(this)} >
                        <Option  key='请选择' value='请选择'>请选择</Option>
                        <Option  key={record.id+':Install'} value={record.id +':Install'}>初始化</Option>
                        <Option  key={record.id+':Initialize'} value={record.id+':Initialize'}>开始传输</Option>
                        <Option  key={record.id+':Sync'} value={record.id+':Sync'}>同步</Option>
                        <Option  key={record.id+':Uninstall'} value={record.id+':Uninstall'}>卸载配置</Option>
                        <Option  key={record.id+':Installagent:'+valueid+':'+valuename} value={record.id+':Installagent:'+valueid+':'+valuename}>安装配置</Option>
                        <Option  key={record.id+':Syncstatus:'+valueid+':'+valuename} value={record.id+':Syncstatus:'+valueid+':'+valuename}>进度查询</Option>
                        <Option  key={record.id+':Pausesync:'+valueid+':'+valuename} value={record.id+':Pausesync:'+valueid+':'+valuename}>暂停同步</Option>
                        <Option  key={record.id+':Resumesync:'+valueid+':'+valuename} value={record.id+':Resumesync:'+valueid+':'+valuename}>继续同步</Option>
                        <Option  key={record.id+':Agentupordown:'+valueid+':'+valuename} value={record.id+':Agentupordown:'+valueid+':'+valuename}>起停客户端</Option>
                        
                        <Option  key={record.id+':Selectagenturl'} value={record.id+':Selectagenturl'}>修改客户端</Option>
                        <Option  key={record.id+':Getagentrole:'+valueid+':'+valuename} value={record.id+':Getagentrole:'+valueid+':'+valuename}>查询客户端角色</Option>
                        <Option  key={record.id+':Setagent:'+valueid+':'+valuename } value={record.id+':Setagent:'+valueid+':'+valuename}>设置客户端角色</Option>
                        <Option  key={record.id+':Prefermirror:'+valueid+':'+valuename } value={record.id+':Prefermirror:'+valueid+':'+valuename}>设置主机角色</Option>
                        <Option  key={record.id+':Pcsinstall:'+valueid+':'+valuename } value={record.id+':Pcsinstall:'+valueid+':'+valuename}>主机端镜像传输</Option>
                        <Option  key={record.id+':Clearmap:'+valueid+':'+valuename } value={record.id+':Clearmap:'+valueid+':'+valuename}>两端角色一致</Option>



                    </Select>)
                }
   
            }
            
            ];
            
        
        return (
            <div id="mirror">
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
   
    }

}

Mirror.propTypes = {


};

export default Mirror;