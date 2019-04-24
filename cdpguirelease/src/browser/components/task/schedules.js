import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'

class Schedules extends Component {
    handleStartSchedule(scheduleId){
        this.props.onStartSchedule(scheduleId)
    }
    handleStopSchedule(scheduleId){
        this.props.onStopSchedule(scheduleId)
    }
    render() {
        const {schedules,onChange,selectedSchedules, selectedRowKeys} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(schedules)
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '任务名称',
                dataIndex: 'name',
            },
            {
                title: '任务类型',
                dataIndex: 'task',
                render: (text, record) =>{
                    // console.log(text)
                    if(text=='volumes.tasks.task_replay_to'){return '回放任务'}
                    else if(text=='volumes.tasks.auto_create_snap'){return '快照任务'}
                    else if(text=='volumes.tasks.auto_create_groupsnap'){return '卷组任务'}
                    else{return '文件克隆'}
                }
            },
            // {
            //     title:'对象卷id',
            //     dataIndex:'args',
            //     render: (text,record) =>{
            //         var id = text.replace(/[^0-9]/ig,"");
            //         return id
            //     }
            // },
            {
                title:'对象名称',
                dataIndex:'vm',
                render:(text,record)=>{
                    console.log(text)
                    if(text==undefined){
                        return "未知"
                    }else{
                        return text
                    }
                }
                
            },
            {
                title: '时间调度',
                dataIndex: 'schedule',
                render: (text,record) =>{
                    var period = text.split(':')[1].trim()
                    var time =period.split(' ').pop()
                    if(period.indexOf('e',0) != -1){
                        period = period.split('every')[1].trim()
                        console.log(parseInt(period.split(' ')[0]))
                        if(parseInt(period.split(' ')[0])>0){
                            period = parseInt(period.split(' ')[0])
                            time = time.replace(/seconds>/g,'秒')
                            time = time.replace(/second>/g,'秒')
                            time = time.replace(/minutes>/g,'分钟')
                            time = time.replace(/minute>/g,'分钟')
                            time = time.replace(/hours>/g,'小时')
                            time = time.replace(/hour>/g,'小时')
                            time = time.replace(/days>/g,'天')
                            time = time.replace(/day>/g,'天')
                            return period + time 
                        }else{
                            return '未知'
                        }
                        
                    }else{

                        period = period.split('(')[0]
                        period = period.split(' ')
                        // console.log(period)
                        period = (period[4]=='0'||period[4]=='*'?'每':period[4])+'月'+ (period[3]=='0'||period[3]=='*'?'每':period[3]) +'日'+(period[2]=='0'||period[2]=='*'?'每星期':':星期'+period[2]+ ':')  + (period[1]=='0'||period[1]=='*'?'每':period[1])+'时'+(period[0]=='0'||period[0]=='*'?'每':period[0])+'分'

                        return period

                    }
                    
                    
                }
            },
            {
                title:'最大保存数量',
                dataIndex:'kwargs',
                render: (text,record) =>{
                    var str =JSON.parse(text)
                    return (str.max_snap_num)
                }
            },
            {
                title: '状态',
                dataIndex: 'enabled',
                render: (text, record) =>{
                    if(text){
                        return '开启'
                    }else{
                        return '关闭'
                    }
                }
            },
            {
                title: '任务操作',
                render: (text, record) => {
                    return (
                        <div>
                            <a onClick={this.handleStartSchedule.bind(this, record.id) }>开启</a> &nbsp; &nbsp;
                            <a onClick={this.handleStopSchedule.bind(this, record.id) }>关闭</a>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={schedules} />
            </div>
        );
    }
}

Schedules.propTypes = {

};

export default Schedules;