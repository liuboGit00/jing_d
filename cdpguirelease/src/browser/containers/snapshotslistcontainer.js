import React, {Component, PropTypes} from 'react';
import SnapshotsList from '../components/snapshot/snapshots_list'
import {connect} from 'react-redux'
import {fetch_snapshots_list,toggle_snapshots_in_list,delete_snapshots,fetch_luns,fetch_portals,fetch_agents} from '../actions/actions'
import {Spin,Row,Button,Modal} from 'antd'
import auth from '../utils/auth'

class SnapshotsListContainer extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handle_delete_snapshot = this.handle_delete_snapshot.bind(this);
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetch_snapshots_list())
        const {portals} = this.props
        if(portals.items.length <= 0){
            dispatch(fetch_portals())
        }
        const {agents} = this.props
        if(agents.items.length <= 0){
            dispatch(fetch_agents())
        }
        const {luns} = this.props
        if(luns.items.length <= 0){
            dispatch(fetch_luns());
        }
    }
    handleChange(selectedRowKeys,selectedRows){
        this.props.dispatch(toggle_snapshots_in_list(selectedRowKeys, selectedRows))
    }
    handle_delete_snapshot() {
        const {dispatch} = this.props
        const {selectedSnapshots} = this.props.snapshotslist
        const confirm = Modal.confirm;
        if (selectedSnapshots.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_snapshots(selectedSnapshots, auth))
                },
                onCancel() { },
            });
        }
    }
    render() {
        const {snapshotslist,agents,luns,portals} = this.props;

        return (
            <div>
                {snapshotslist.isFetching? <Spin /> : <SnapshotsList snapshotslist={snapshotslist}  items={snapshotslist.items} agents={agents.items} portals={portals.items} luns={luns.items} onChange={this.handleChange} dispatch={this.props.dispatch}
                selectedSnapshots={snapshotslist.selectedSnapshots} selectedRowKeys={snapshotslist.selectedRowKeys} pagination={snapshotslist.pagination} onDelete={this.handle_delete_snapshot}/>}
            </div>
        );
    }
}

SnapshotsListContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        snapshotslist:state.snapshotslist,
        portals:state.portals,
        agents:state.agents,
        luns:state.luns,
    }
}
export default connect(mapStateToProps)(SnapshotsListContainer)