import React, {Component, PropTypes} from 'react';
import {fetch_schedules,delete_schedules,toggle_schedules,start_schedule,stop_schedule,
    echo_modify_schedul,close_modify_schedul,modify_schedul_content,modify_schedul_time
} from '../../actions/taskactions'
import {connect} from 'react-redux'
import Schedules from '../../components/task/schedules'
import {Link} from 'react-router'
import auth from '../../utils/auth'
import {fetch_volumes} from '../../actions/actions'
import {fetch_fileclones} from '../../actions/filecloneaction'
import {fetch_volumegroup} from '../../actions/volumegroupaction'
import ModifySchedules from '../../components/task/modify_schedules'
import {fetch_script} from '../../actions/scriptaction'
import {Spin,Row,Icon,Button,Modal} from 'antd'

    


class ScheduleContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_delete_schedule = this.handle_delete_schedule.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handle_start_schedule = this.handle_start_schedule.bind(this);
        this.handle_stop_schedule = this.handle_stop_schedule.bind(this);
        this.handle_modify_schedule = this.handle_modify_schedule.bind(this)
        this.handle_echo_modify_schedule = this.handle_echo_modify_schedule.bind(this)
        this.handle_close_modify_schedule = this.handle_close_modify_schedule.bind(this)
    }
    componentDidMount() {
        const {schedules,volumegroup,fileclones,volumes,scripts} = this.props
        const {dispatch} = this.props
        if(schedules.items.length==0){
            dispatch(fetch_schedules())
        }
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        if(fileclones.items.length<=0){
            dispatch(fetch_fileclones())
        }
        if(volumegroup.items.length<=0){
            dispatch(fetch_volumegroup())
        }
        if(scripts.items.length<=0){
            dispatch(fetch_script())
        }
    }
    handle_delete_schedule(){
        const {dispatch} = this.props
        const {selectedSchedules} = this.props.schedules
        const  confirm = Modal.confirm;
        console.log(selectedSchedules)
        confirm({
            title: '您确定要删除所选内容吗',
            content: '删除后将无法恢复',
            onOk() {
                dispatch(delete_schedules(selectedSchedules, auth))
            },
            onCancel() { },
        });
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_schedules(selectedRowKeys, selectedRows))
    }
    handle_start_schedule(scheduleId){
        this.props.dispatch(start_schedule(scheduleId,auth))
    }
    handle_stop_schedule(scheduleId){
        this.props.dispatch(stop_schedule(scheduleId,auth))
    }
    handle_echo_modify_schedule(){
        const{dispatch}=this.props
        const {selectedSchedules}=this.props.schedules
        const  confirm = Modal.confirm;
        console.log(selectedSchedules)
        if(selectedSchedules.length==1){
            dispatch(echo_modify_schedul(selectedSchedules))
        }else{
            confirm({
                title: '修改任务调度',
                content: '请选择一个任务进行修改',
                onOk(){},
                onCancel(){},
            });}
    }
    handle_modify_schedule(text){
        const{dispatch,schedules}=this.props
        const parent=/^[A-Za-z0-9_]+$/;
        // console.log(text)
        // console.log(schedules.time_schedule_modal)
        if(schedules.time_schedule_modal){
            dispatch(modify_schedul_time(schedules.selectedSchedules[0].id,text))
        }else{
            // console.log(text , parent.test(text.ptask_name))
            if(text && parent.test(text.ptask_name)){
                dispatch(modify_schedul_content(schedules.selectedSchedules[0].id,text))
            }
        }

    }
    handle_close_modify_schedule(){
        const{dispatch}=this.props
        dispatch(close_modify_schedul())
    }
    render() {
        const {schedules,volumes,fileclones,volumegroup,dispatch,scripts} = this.props
        if(schedules.items!=''&&volumes.items!=''){
            for(let j=0;j<schedules.items.length;j++){
                // console.log(schedules)
                if(schedules.items[j].task.split('.')[0]=='clone'){
                    for(let i=0;i<fileclones.items.length;i++){
                        if(fileclones.items[i].id == schedules.items[j].args.replace(/[^0-9]/ig,"")){
                            schedules.items[j].vm=fileclones.items[i].name
                        }  
                    }
                }else if(schedules.items[j].task.split('_').pop()=='groupsnap'){
                    for(let i=0;i<volumegroup.items.length;i++){
                        if(volumegroup.items[i].id == schedules.items[j].args.replace(/[^0-9]/ig,"")){
                            schedules.items[j].vm=volumegroup.items[i].groupname
                        }  
                    }
                }else{
                    for(let i=0;i<volumes.items.length;i++){
                        if(volumes.items[i].id == schedules.items[j].args.replace(/[^0-9]/ig,"")){
                            schedules.items[j].vm=volumes.items[i].name
                        }
                    }
                }
            }
        }
        return (
            <div>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="clock-circle-o" />调度任务列表</label>
                </Row>
                <Row className="table_toolbar">
                    <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_schedule}>删除任务</Button>
                    <Button type='ghost' icon='reload' className="cdp_button_right" onClick={this.handle_echo_modify_schedule}>修改任务</Button>
                    <Link to={`/createtask`} className="cdp_button_right"><Button type="ghost"  icon='plus' >新建调度任务</Button></Link>
                </Row>
                {schedules.isFetching?<Spin />:<Schedules schedules={schedules.items} selectedSchedules={schedules.selectedSchedules} selectedRowKeys={schedules.selectedRowKeys}
                onChange={this.handleChange} onStartSchedule={this.handle_start_schedule} onStopSchedule={this.handle_stop_schedule}/>}
                <ModifySchedules  scripts={scripts.items} volumes={volumes.items} schedules={schedules} dispatch={dispatch} visible={schedules.schedule_modal} timevisible={schedules.time_schedule_modal} contentvisible={schedules.content_schedule_modal} onOk={this.handle_modify_schedule}  onCancel={this.handle_close_modify_schedule}/>
            </div>
        );
    }
}

ScheduleContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        schedules:state.schedules,
        volumes:state.volumes,
        fileclones:state.fileclones,
        volumegroup:state.volumegroup,
        scripts:state.scripts,
    }
}
export default connect(mapStateToProps)(ScheduleContainer)
