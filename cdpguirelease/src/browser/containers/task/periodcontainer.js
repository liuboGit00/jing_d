import React, {Component, PropTypes} from 'react';
import Period from '../../components/task/period'
import Crontab from '../../components/task/crontab'

import {select_task_period,create_schedule} from '../../actions/taskactions'
import {connect} from 'react-redux'
import {Spin,Button} from 'antd'


class PeriodContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_submit_create_task = this.handle_submit_create_task.bind(this);
    }
    
    handle_submit_create_task(period){
        // console.log(period.period)
        // console.log(period.every)
        const {dispatch} = this.props
        const {task_name,ptask_name,args,kwargs,crontab} = this.props.taskState
        // dispatch(select_task_period(period))
        console.log(period,task_name,ptask_name,args,kwargs,crontab)
        // const eve=parseFloat(period.every)
        dispatch(create_schedule(ptask_name,task_name,args,kwargs,crontab,period))
    }
    render() {
        const{copy} = this.props.taskState
        const{taskState} = this.props
        // console.log(taskState.crontab)

        return (
            <div>
                {taskState.crontab=='true'? <Crontab onOk={this.handle_submit_create_task} />:<Period onOk={this.handle_submit_create_task}/>}
            </div>
        );
    }
}

PeriodContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        taskState:state.taskState,
    }
}
export default connect(mapStateToProps)(PeriodContainer)