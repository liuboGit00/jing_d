import React, {Component, PropTypes} from 'react';
import {Table,Button,progress,Icon,Switch,Select,Progress} from 'antd'
Option=Select.Option
import {Link} from 'react-router'
import {fetch_one_agent_clone,} from '../../actions/mirroraction'

class Agentclone extends Component {
    handleChange(value){
        console.log(value)
        const{onAgentlocal,onLocalagent,onLocalanyagent}=this.props
        const taskname = value.split(';')[1]
        const taskid = value.split(';')[0]
        const taskstatus = value.split(';')[2]
        if(taskname=='agentlocal'){
            onAgentlocal(taskid,taskstatus)
        }else if(taskname =='localagent'){
            onLocalagent(taskid,taskstatus)
        }else if(taskname=='localanyagent'){
            onLocalanyagent(taskid,taskstatus)
        }
    }
    render() {
        const {ipaddresses,onLocalanyagent,clonespeed,clonetime,volumes,items,agent,address,onChange, selectedClone,selectedRowKeys,onAgentlocal,onLocalagent,onOff} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        console.log(items)



        const columns = [
            {
                title:'任务名称',
                render:(text,record)=>{
                    return text.name
                }

            },
            {
                title:'客户端',
                className:'clonetitle',
                children:[
                    {
                        title: '名称',
                        className:'cloneborder',
                        render: (text,record)=>{

                            if(agent!=undefined&&agent!=''&&text.getagentendpoint[0]!=undefined&&text.getagentendpoint[0]!=''){
                                for(let i=0;i<agent.length;i++){
                                    if(text.getagentendpoint[0].agent==agent[i].url){
                                        return <Link to={`/agents/${agent[i].id}`}>{agent[i].name} </Link>
                                    }
                                }
                            }else{
                                return 'null'
                            }
                            
                                        
                        }
        
                    },
                    {
                        title: '源盘',
                        className:'cloneborder',
                        render: (text,record) => {
                            if(text.getagentendpoint[0] == undefined){
                                return 'null'
                            }else{
                                return text.getagentendpoint[0].agentDevpath;
                            }
                            
                        }
        
                    },
                    {
                        title: 'IP',
                        className:'cloneborder',

                        render: (text) => {
                            if(text.getagentendpoint[0] == undefined){
                                return 'null'
                            }else{
                                return text.getagentendpoint[0].agentaddress;
                            }
                        }
                    }]
            },{
                title:'传输',
                className:'clonetitle',

                children:[
                    {
                        title:'速度',
                        className:'cloneborder',
                        render:(text,record)=>{
                        if(text.task==null){
                            return '0Kb/s'
                        }else{
                            if(clonespeed != undefined&&clonespeed !=''){
                                for(let i=0;i<clonespeed.length;i++){
                                    if(clonespeed[i].url==text.task){
                                        if(clonespeed[i].status=='PROGRESS'){
                                            const clonespeed1 =clonespeed[i].native.result.split("'").join('"')
                                            
                                            const clonespeed2=clonespeed1.split('L').join('')
                                            const clonespeed3 = clonespeed2.split(',')
                                            clonespeed3.splice(2,1)
                                            const clonespeed4=clonespeed3.join(',')
                                            var obj=JSON.parse(clonespeed4)
                                            // console.log(obj)
                                            var speed = (obj.size/obj.elapsetime/1024).toFixed(2)
                                            if(obj.elapsetime == 0){
                                                return '0Kb/s'
                                            }else if(speed>1000){
                                                return (speed/1024).toFixed(2)+'M/s'
                                            }else{
                                                return (speed+'Kb/s')
                                            }
                                        }else{
                                            return '0Kb/s'
                                        }
                                    }
                                }
                            }
                        }

                            
                            
                            
                            
                        }

                    },{
                        title:'进度',
                        className:'cloneborder',
                        render:(text,record)=>{
                        if(text.task==null){
                            return <Progress type='circle' percent={0} width={60} status='exception'/>
                        }else{
                            if(clonespeed != undefined&&clonespeed !=''){
                                for(let i=0;i<clonespeed.length;i++){
                                    if(clonespeed[i].url==text.task){
                                        if(clonespeed[i].task == 'clone.tasks.clone2agentjob'){
                                            if(clonespeed[i].status== 'PROGRESS'){
                                                return <Progress type='circle' percent={85} width={60}/>
                                            }else if(clonespeed[i].status== 'SUCCESS'){
                                                return <Progress type='circle' percent={100} width={60}/>
                                            }else{
                                                return <Progress type='circle' percent={0} width={60} status='exception'/>
                                            }
                                           
                                        }else if(clonespeed[i].task == 'clone.tasks.partclonejob'){
                                            if(clonespeed[i].status== 'PROGRESS'){
                                                const  cloneprogress =clonespeed[i].native.result.split("'").join('"')
                                                const cloneprogress1=cloneprogress.split('L').join('')
                                                const cloneprogress2 = cloneprogress1.split(',')
                                                cloneprogress2.splice(2,1)
                                                const cloneprogress3=cloneprogress2.join(',')                                
                                                const progress=JSON.parse(cloneprogress3)
                                                return <Progress type='circle' percent={parseInt(progress.current)} width={60}/>

                                            }else if(clonespeed[i].status== 'SUCCESS'&& (clonespeed[i].native.result.split(',')).pop()==" 'remote part clone completed!']"){
                                                return <Progress type='circle' percent={100} width={60}/>
                                            }else{
                                                return <Progress type='circle' percent={0} width={60} status='exception'/>
                                            }
                                        }else {
                                            if(clonespeed[i].status== 'PROGRESS'){
                                                const  cloneprogress =clonespeed[i].native.result.split("'").join('"')
                                                const cloneprogress1=cloneprogress.split('L').join('')
                                                const cloneprogress2 = cloneprogress1.split(',')
                                                cloneprogress2.splice(2,1)
                                                const cloneprogress3=cloneprogress2.join(',')                                
                                                const progress=JSON.parse(cloneprogress3)
                                                return <Progress type='circle' percent={parseInt(progress.current)} width={60}/>
                                            }else if(clonespeed[i].status== 'SUCCESS'&& (clonespeed[i].native.result.split(',')[4])==" 'remote clone mission completed!'"){
                                                return <Progress type='circle' percent={100} width={60}/>
                                            }else{
                                                return <Progress type='circle' percent={0} width={60} status='exception'/>
                                            }
                                        }
                                    }
                                }
                            }
                        }
                            

                        }

                    },{
                        title:'状态',
                        className:'cloneborder',

                        render: (text,record) => {
                            // console.log(text.task)
                            // console.log(text.status != undefined)
                            if(text.task == null){
                                return <div style={{color:'#f5222d'}}>null</div>;
                            }else if(text.status != undefined){
                                    // console.log(text)

                                if(text.status.status == 'SUCCESS'){
                                    if(text.getagentendpoint[0].agentDevsize>text.clonepos>0 && (text.status.task.split('.')[2]).split('l')[0]=='c' ){
                                        return <div style={{color:'#faad14'}}>中断</div>
                                    }else if(text.status.native.result=='None'){
                                        return <div style={{color:'#f5222d'}}>失败</div>;
                                    }else{
                                        return <div style={{color:'#52c41a'}}>成功</div>;
                                    }
                                    
                                }else if(text.status.status == 'PENDING'){
                                    return <div style={{color:'#faad14'}}>阻塞</div>;
                                }else if(text.status.status == 'FAILURE'){
                                    return <div style={{color:'#f5222d'}}>失败</div>;
                                }else if(text.status.status == 'PROGRESS'){
                                    return <div style={{color:'#1890ff'}}>正在工作</div>;
                                }else{
                                    return <div style={{color:'#f5222d'}}>null</div>;
                                }
                            }else{
                                return <div style={{color:'#f5222d'}}>null</div>;
                            }
                        }
                    }]
            },{
                title:'本地端',
                className:'clonetitle',
                children:[
                    {
                        title: '目标盘',
                        className:'cloneborder',
                        render: (text,record) => {
                            if(text.getlocalendpoint[0] == undefined){
                                return 'null'
                            }else {
                                var vo =  volumes.filter(function(item){return (item.id ==text.getlocalendpoint[0].volume.split('/').pop())})
                                if(vo!=''){
                                    return vo[0].native.path
                                }
                            }
                            
                        }
        
                    },
                    {
                        title: '端口',
                        className:'cloneborder',
                        render: (text,record) => {
                            if(text.getlocalendpoint[0] == undefined){
                                return 'internal'
                            }else{
                                return text.getlocalendpoint[0].port;
                            }
                        }
        
                    },
                    {
                        title:'ip',
                        className:'cloneborder',
                        render: (text,record) => {
                            if(text.getlocalendpoint[0] == undefined){
                                return 'null'
                            }else{
                                if(ipaddresses!=undefined&&ipaddresses!=''){
                                    for(let i=0;i<ipaddresses.length;i++){
                                        if(ipaddresses[i].url==text.getlocalendpoint[0].ipaddress){
                                            return ipaddresses[i].address
                                            
                                        }
                                    }
                                }else{
                                    return 'null'
                                }
                                
                            }
                            
                        }
                    }]
            },
            {
                title: '操作',
                className:'clonetitle',
                children:[
                    {
                        title:'详情',
                        className:'cloneborder',
                        render: (text, record) =>
                        {   
                            // console.log(text)
                            // console.log(text.status.task)
                            let  startOption = '请选择'
                            const clonestatusobj={
                                "clonejob":text.id+';agentlocal;'+text.task,
                                "clone2agentjob":text.id+';localagent;'+text.task,
                                "partclonejob":text.id+';agentlocal;'+text.task,
                                "partclone2agentjob":text.id+';localagent;'+text.task,
                                "ntfsclonejob":text.id+';agentlocal;'+text.task,
                                "ntfsclone2agentjob":text.id+';localagent;'+text.task,
                                

                            }
                            if(text.status!=undefined&&text.status.task!=undefined){
                                
                                if(text.status.task!=''){
                                    for(let i in clonestatusobj){
                                        if((text.status.task.split('.').pop())==i){
                                            startOption =clonestatusobj[i];
                                        } 
                                    }

                                }else{
                                    let va = (text.status.native.result.split(',')[0]).split("'")[3]
                                    for(let i in clonestatusobj){
                                        if(va==i){
                                            startOption =clonestatusobj[i];
                                        }
                                    } 

                                }

                                return(<Select defaultValue={startOption}  dropdownStyle={{textAlign:'center',}} style={{width:120,textAlign:'center',}} onChange={this.handleChange.bind(this)}>
                                    <Option key='请选择'>请选择</Option>
                                    <Option key={text.id+';agentlocal;'+text.task}    value={text.id+';agentlocal;'+text.task}   >客户端到本地<Icon type='right'/></Option>
                                    <Option key={text.id+';localagent;'+text.task}    value={text.id+';localagent;'+text.task}   ><Icon type='left'/>本地到客户端</Option>
                                    <Option key={text.id+';localanyagent;'+text.task} value={text.id+';localanyagent;'+text.task}><Icon type='left'/>本地到任意客户端</Option>
                                </Select>)

                            }
                            console.log(startOption)
                            return(<Select defaultValue='请选择'  dropdownStyle={{textAlign:'center',}} style={{width:120,textAlign:'center',}} onChange={this.handleChange.bind(this)}>
                                <Option key='请选择'>请选择</Option>
                                <Option key={text.id+';agentlocal;'+text.task}    value={text.id+';agentlocal;'+text.task}   >客户端到本地<Icon type='right'/></Option>
                                <Option key={text.id+';localagent;'+text.task}    value={text.id+';localagent;'+text.task}   ><Icon type='left'/>本地到客户端</Option>
                                <Option key={text.id+';localanyagent;'+text.task} value={text.id+';localanyagent;'+text.task}><Icon type='left'/>本地到任意客户端</Option>
                            </Select>)
                        
                           
                        }
                          
                        
                    },{
                        title:'定时刷新',
                        className:'cloneborder',
                        render:(text,record)=>{
                                if (record.onoff=='start') {
                            
                                    return(<Switch  checkedChildren='开' unCheckedChildren='关'  onChange={onOff.bind(this,record.id,'stop',record.task)}/>)
                                    
                                }else {
                                    return(<Switch  checkedChildren='关' unCheckedChildren='关' onChange={onOff.bind(this,record.id,'start',record.task)}/>)

                                    
                                };
                            
                        }
                    }
                ]
            }];
            
        
        return (
            <div id="mirror">
                <Table rowKey='id' bordered  rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
   
    }

}


export default Agentclone;
