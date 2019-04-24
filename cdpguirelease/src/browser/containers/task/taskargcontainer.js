import React, {Component, PropTypes} from 'react';
import {select_task_type,create_snap_task} from '../../actions/taskactions'
import SnapTaskArg from '../../components/task/snaptaskarg'
import ReplayTaskArg from '../../components/task/replaytaskarg'
import {connect} from 'react-redux'
import {Spin,Button} from 'antd'
import {fetch_volumes} from '../../actions/actions'
import {fetch_fileclones} from '../../actions/filecloneaction'
import {fetch_volumegroup} from '../../actions/volumegroupaction'
import {fetch_script} from '../../actions/scriptaction'


import {Link} from 'react-router'


class TaskArgContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_create_snap_task = this.handle_create_snap_task.bind(this);
    }
    
    componentDidMount() {
        const {dispatch} = this.props
        const {volumes,fileclones,volumegroup,scripts} = this.props
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
    handle_create_snap_task(snaptask){
        // console.log(snaptask)
        const {dispatch} = this.props
        var args=[parseInt(snaptask.volumeId)]
        const arr = []
        if(snaptask.scripts!=undefined){
            for(let i=0;i<snaptask.scripts.length;i++){
                arr.push(parseInt(snaptask.scripts[i]))
            }
        }
        
        var kwargs={"max_snap_num":parseInt(snaptask.maxnum),'scripts':arr,'check_befsnap':snaptask.check_befsnap}
        // console.log(args)
        // console.log(kwargs)
        dispatch(create_snap_task(args,kwargs,snaptask.copy,snaptask.crontab))
    }
    
    render() {
        const {task_name} = this.props.taskState
        const {volumes,taskState,fileclones,volumegroup,scripts} = this.props
        // console.log(taskState.crontab)
        console.log(volumegroup)

        switch (task_name) {
            case 'volumes.tasks.auto_create_snap':
                return (
                    <div>
                        {volumes.isFetching?<Spin />:<SnapTaskArg  scripts={scripts.items} volumes={volumes.items} onSnapTask={this.handle_create_snap_task}/>}
                    </div>
                );
            case 'volumes.tasks.task_replay_to':
                return (
                    <div>
                        <ReplayTaskArg />
                    </div>
                );
            case 'clone.tasks.fileclone2local':
                return (
                    <div>
                        {volumes.isFetching?<Spin />:<SnapTaskArg scripts={scripts.items} fileclones={fileclones.items} onSnapTask={this.handle_create_snap_task}/>}
                    </div>
                );
            case 'volumes.tasks.auto_create_groupsnap':
                 return (
                    <div>
                        {volumes.isFetching?<Spin />:<SnapTaskArg scripts={scripts.items} volumegroup={volumegroup.items} onSnapTask={this.handle_create_snap_task}/>}
                    </div>
                );
            default:
                return (
                    <div>请选择任务类型！<br/><br/>
                    <Button type="primary" ><Link to={`/createtask`}>上一步</Link></Button>
                    </div>
                )
        }
    }
}

TaskArgContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        taskState:state.taskState,
        volumes:state.volumes,
        fileclones:state.fileclones,
        volumegroup:state.volumegroup,
        scripts:state.scripts,
    }
}
export default connect(mapStateToProps)(TaskArgContainer)