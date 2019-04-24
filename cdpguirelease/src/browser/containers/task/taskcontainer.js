/**
 * Created by tanglinhai on 2016/9/12.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetch_tasks,
    del_tasks,
    checkbox_checked_task,
    fetch_schedules,
} from '../../actions/taskactions'
import Task from '../../components/task/task'
import NotFound from '../../components/common/notfound';
import Loading from '../../components/common/loading'
import  {Modal,Button}  from 'antd'
import {Link} from 'react-router'
const confirm = Modal.confirm;
class TaskContainer extends Component {
    constructor(props) {
        super(props)
        this.onListSelectChange = this.onListSelectChange.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.getTableSelectRowKeys = this.getTableSelectRowKeys.bind(this)
        this.del_tasks_win = this.del_tasks_win.bind(this)
    }
    del_tasks_win(){
        const rowKeys = this.getTableSelectRowKeys();
        if(!rowKeys || rowKeys.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要删除的记录！',
            });
        }else{
            confirm({
                title: 'CDP系统提示！',
                content: '您是否确认要删除选中的内容！',
                onOk: function() {
                    for(let i=0;i<rowKeys.length;i++){
                        this.props.dispatch(del_tasks(rowKeys[i], this.props.pagination));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    onListSelectChange(selectedRowKeys) {
        this.props.dispatch(checkbox_checked_task(selectedRowKeys));
    }
    getTableSelectRowKeys(){
        return this.props.taskState.selectedRowKeys
    }
    getItemById(id){
        const items = this.props.taskState.items;
        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    componentDidMount() {
        if (this.props.taskState.didInvalidate===true) {
            this.props.dispatch(fetch_tasks())
            this.props.dispatch(fetch_schedules())

        }
    }
    render() {
        const winevents = {
            onListSelectChange: this.onListSelectChange,
            del_tasks_win: this.del_tasks_win,
            getTableSelectRowKeys: this.getTableSelectRowKeys
        };
        const {schedules} = this.props
        return (
            <div>
                <Task {...this.props.taskState} schedules={schedules} {...winevents} dispatch={this.props.dispatch} />
            </div>
        )
    }
}

TaskContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        taskState:state.taskState,
        schedules:state.schedules,

    }
}
export default connect(mapStateToProps)(TaskContainer)
