import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetch_snapshot_detail,toggle_clones,delete_clones,fetch_luns,fetch_portals,fetch_agents} from '../actions/actions'
import {Spin,Button,Modal,Row} from 'antd'
import SnapshotDetail from '../components/snapshot/snapshotdetail'
import auth from '../utils/auth'

class SnapDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_delete_clone = this.handle_delete_clone.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const snapshotId = this.props.params.snapshotId
        const {dispatch} = this.props
        dispatch(fetch_snapshot_detail(snapshotId))
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
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_clones(selectedRowKeys,selectedRows))
    }
    handle_delete_clone() {
        const {dispatch} = this.props
        const {selectedVolumes} = this.props.snapshotDetail
        const confirm = Modal.confirm;
        if (selectedVolumes.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_clones(selectedVolumes, auth))
                },
                onCancel() { },
            });
        }
    }
    render() {
        const snapshotId = this.props.params.snapshotId
        //console.log(snapshotId)
        const {snapshotDetail,portals,agents,luns} = this.props
        console.log(snapshotDetail)
        if(snapshotDetail.isFetchingSnap|| snapshotDetail.isFetchingClone|| snapshotDetail.didInvalidateSnap||snapshotDetail.didInvalidateClone){
            return <div><Spin/></div>
        } else {
            return (
                <div>
                    <SnapshotDetail dispatch={this.props.dispatch} agents={agents.items} portals={portals.items} luns={luns.items} snapshotDetail={snapshotDetail} cloneset={snapshotDetail.clones} snapdetail={snapshotDetail.snapdetail} onChange={this.handleChange} 
                    selectedVolumes={snapshotDetail.selectedVolumes} selectedRowKeys={snapshotDetail.selectedRowKeys} onDelete={this.handle_delete_clone}/>
                </div>
            );
        }
    }
}

SnapDetailContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        snapshotDetail:state.snapshotDetail,
        portals:state.portals,
        agents:state.agents,
        luns:state.luns,


    }
}
export default connect(mapStateToProps)(SnapDetailContainer)