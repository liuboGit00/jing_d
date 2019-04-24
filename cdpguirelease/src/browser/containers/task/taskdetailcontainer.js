/**
 * Created by tanglinhai on 2016/9/12.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetch_task_detail} from '../../actions/taskdetailactions'
import TaskDetail from '../../components/task/taskdetail'
import Loading from '../../components/common/loading'
import { Spin,Button } from 'antd';

class TaskDetailContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const task_id = this.props.params.task_id
        this.props.dispatch(fetch_task_detail(task_id))
    }
    render() {
        const item = this.props.taskDetailState.item
        if (item !== undefined){
            return (
                <div>
                    <TaskDetail {...this.props.taskDetailState} />
                </div>
            )
        }
        else {
            return (
                <Loading loading="true"/>
            )
        }
    }
}

TaskDetailContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        taskDetailState:state.taskDetailState
    }
}
export default connect(mapStateToProps)(TaskDetailContainer)
