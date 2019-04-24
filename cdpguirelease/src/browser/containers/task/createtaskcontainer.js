import React, {Component, PropTypes} from 'react';
import TaskType from '../../components/task/tasktype'
import {select_task_type} from '../../actions/taskactions'
import {connect} from 'react-redux'

class CreateTaskContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_select_task = this.handle_select_task.bind(this);
    }
    
    handle_select_task(task) {
        const {dispatch} = this.props
        dispatch(select_task_type(task.task_name,task.ptask_name))
        console.log(task)
    }
    render() {
        return (
            <div>
                <TaskType onSelect={this.handle_select_task}/>
            </div>
        );
    }
}

CreateTaskContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        taskState:state.taskState,
    }
}
export default connect(mapStateToProps)(CreateTaskContainer)