import React, {Component, PropTypes} from 'react';
import {Modal,Table,Icon,Tooltip,Card,Button,Row} from 'antd'
import {Link} from 'react-router'
import {delete_auditlogs,search_auditlogs,fetch_auditlogs} from '../../actions/auditactions'
import SearchAuditlogs from './searchauditlogs'

class Audit extends Component {
    delete_auditlogs_handle(id){
        const {dispatch} = this.props
        // console.log(id)
        dispatch(delete_auditlogs(id))
    }
    handleAdvanceSearch(content){
        // console.log(content)
        var timeS
        var timeE
        var starttime
        var endtime 
        var status 
        if(content.startDate!=undefined){
            timeS=content.startDate._d;
            starttime = timeS.getFullYear()+'-'+(timeS.getMonth()+1)+'-'+timeS.getDate()+' '+timeS.getHours()+':'+timeS.getMinutes()+':'+timeS.getSeconds()
        }else{
            starttime=''
        }
        if(content.endDate!=undefined){
            timeE=content.endDate._d;
            endtime = timeE.getFullYear()+'-'+(timeE.getMonth()+1)+'-'+timeE.getDate()+' '+timeE.getHours()+':'+timeE.getMinutes()+':'+timeE.getSeconds()
        }else{
            endtime=''
        }
        if(content.status!=undefined){
            status=content.status
        }else{
            status=''
        }
        console.log(starttime,status,endtime)
        
        this.props.dispatch(search_auditlogs(starttime,status,endtime));
    }
    openSearchAdvance(e){
        const type = e.target.getAttribute('data-type');
        if(type == 'up'){
            this.refs.searchAdvance.setAttribute('class', 'search_advance search_advance_show');
            e.target.setAttribute('data-type', 'down');
            e.target.setAttribute('class', 'btn down');
        }else{
            this.refs.searchAdvance.setAttribute('class', 'search_advance');
            e.target.setAttribute('data-type', 'up');
            e.target.setAttribute('class', 'btn up');
        }
    }
    handle_delete_auditlogs(){
        const {dispatch} = this.props
        const confirm = Modal.confirm;
        confirm({
            title: '您是否确认要删除已选择的这些审计日志',
            content: '删除后将无法恢复',
            onOk() {
                dispatch(delete_auditlogs())
            },
            onCancel() { },
        });
    }
    handle_get_all_auditlogs(){
        this.props.dispatch(fetch_auditlogs())
    }
    render() {
        const {items,onChange,selectedConfig, selectedRowKeys} = this.props
        // console.log(items)
        
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)
        const json={
            "rsync.restapi":"同步模块",
            "agent.restapi":"客户端模块",
            "user.restapi":"用户模块",
            "host.restapi":"主机模块",
            "pool.restapi":"存储池模块",
            "volumes.restapi":"卷模块",
            "snapshot.restapi":"快照模块",
            "volumegroup.restapi":"卷组模块",
            "mirror.restapi":"镜像模块",
            "nfs.restapi":"网络文件系统模块",
            "lun.restapi":"映射模块",
            "connect.restapi":"ssh模块",
            "initiator.restapi":"客户端initiator模块",
            "clone.restapi":"克隆模块",
            "agentmirror.restapi":"小机镜像模块",
            "cephclient.restapi":"集群客户端模块",
            "cephpool.restapi":"集群存储池模块",
            "raid1.restapi":"raid模块",
            "osd.restapi":"集群硬盘节点模块",
            "cloud.restapi":"云主机模块",
            "register.restapi":"系统注册模块",
            "systemctl.restapi":"系统服务模块",
            "result.restapi":"已完成任务模块",
            "logdev.restapi":"日志模块",
            "comlog.restapi":"命令日志模块",
            "fileclone.restapi":"文件克隆模块",
            "hostinitiator.restapi":"主机端initiator模块",
            "iscsitarget.restapi":"iscsi模块",
            "iscsiportal.restapi":"iscsi模块",
            "remotemirror.restapi":"CDP复制模块",
            "sambashare.restapi":"samba模块",
            "script.restapi":"客户端脚本模块",
            "schedule.restapi":"调度任务模块",
            "auditlog.restapi":"审计模块",
            "vpc.restapi":"虚拟机模块",
            "lio.restapi":"Lio模块",
            "HA.restapi":"HA模块",

        }



        const columns = [
            {
                title: '用户',
                dataIndex: 'user',
                width:'15%',
            },
            {
                title: '命令',
                dataIndex: 'command',
                width:'15%',
            },{
                title: '开始时间',
                dataIndex: 'starttime',
                width:'15%',
            },{
                title: '结束时间',
                dataIndex: 'endtime',
                width:'15%',
            },{
                title: '模块',
                dataIndex: 'module',
                width:'15%',
                render:(text,record)=>{
                    for (var i in json){
                        if(i==text){
                            return json[i]
                        }
                    }
                }
            },{
                title: '详情',
                dataIndex:'request',
                width:'10%',
                render:(text,record)=>{
                    if(text=='{}'){
                        return '详情'
                    }else{
                        return (<Link to={`/audit/${record.id}`}>详情</Link>)
                    }
                }
            },{
                title: '操作',
                width:'10%',
                render:(text,record)=>{
                        return(<Button onClick={this.delete_auditlogs_handle.bind(this,text.id)}>删除</Button>)
                    }
            }];
        return (
            <Row>
                <div className="search_advance" ref="searchAdvance">
                    <div className="title"><Icon type="search" />&nbsp;高级搜索</div>
                    <div className="body">
                        <SearchAuditlogs {...this.props} onOk={this.handleAdvanceSearch.bind(this)} ref="formSearchAdvance"/>
                    </div>
                    <div className="btn up" onClick={this.openSearchAdvance.bind(this)} data-type="up"></div>
                </div>
                <Row className="table_toolbar">
                    <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_auditlogs.bind(this)}>全部删除</Button>
                    <Button type='ghost' icon='download' className="cdp_button_right" onClick={this.handle_get_all_auditlogs.bind(this)}>获取全部</Button>
                </Row>
                <Row>
                    <Table rowKey='id'  columns={columns} dataSource={items} />
                </Row>
        </Row>
        );
    }
}

Audit.propTypes = {

};

export default Audit;