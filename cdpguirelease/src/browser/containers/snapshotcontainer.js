import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetch_snapshots,fetch_portals,fetch_luns,toggle_snapshots,echo_create_snapshot_modal,close_create_snapshot_modal,echo_map_snapshot_modal,
    close_map_snapshot_modal,fetch_agents,create_snapshot,delete_snapshots,echo_clone_snapshot_modal,close_clone_snapshot_modal,
    clone_snapshot,echo_map_volume_snapshot_modal,close_map_volume_snapshot_modal,map_volume_snapshot,fetch_volumes,
    set_pagination,
} from '../actions/actions'
import {Row, Col, Menu,Icon, Button, Input, Modal, Spin,Table,Alert} from 'antd'
import Snapshot from '../components/snapshot/snapshot'
import auth from '../utils/auth'
import CreateSnapshot from '../components/snapshot/create_snapshot'
import MapSnapshot from '../components/snapshot/map_snapshot'
import CloneSnapshot from '../components/snapshot/clone_snapshot'
import SearchInput from '../components/common/searchinput'
import MapVolume from '../components/volume/map_volume'


class SnapshotContainer extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handle_create_snapshot = this.handle_create_snapshot.bind(this)
        this.handle_close_create_snapshot = this.handle_close_create_snapshot.bind(this)
        this.handle_map_snapshot = this.handle_map_snapshot.bind(this)
        this.handle_close_map_snapshot = this.handle_close_map_snapshot.bind(this)
        this.submit_create_snapshot = this.submit_create_snapshot.bind(this)
        this.handle_delete_snapshot = this.handle_delete_snapshot.bind(this)
        this.handle_clone_snapshot = this.handle_clone_snapshot.bind(this)
        this.handle_close_clone_snapshot = this.handle_close_clone_snapshot.bind(this)
        this.submit_clone_snapshot = this.submit_clone_snapshot.bind(this)
        this.showSnapshotPage = this.showSnapshotPage.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
        this.handle_map_volume_snapshot = this.handle_map_volume_snapshot.bind(this)
        this.handle_close_map_volume_snapshot = this.handle_close_map_volume_snapshot.bind(this)
        this.submit_map_volume_snapshot = this.submit_map_volume_snapshot.bind(this)

    }
    componentWillMount() {
        const {url,portals,dispatch,agents,luns,volumes,} = this.props
        //const {didInvalidate} = this.props.snapshots
        //console.log('didInvalidate',didInvalidate)
        //console.log('snapshot url=',this.props.url)
        // console.log('url')
        dispatch(fetch_snapshots(url,auth))
        if(portals.items.length <= 0){
            dispatch(fetch_portals())
        }
        if(agents.items.length <= 0){
            dispatch(fetch_agents())
        }
        if(luns.items.length <= 0){
            dispatch(fetch_luns());
        }
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }

        
        
    }
    handle_create_snapshot(){
        const {dispatch} = this.props
        dispatch(echo_create_snapshot_modal())
    }
    handle_close_create_snapshot() {
        const {dispatch} = this.props
        dispatch(close_create_snapshot_modal())
    }
    handle_map_snapshot(){
        const {dispatch} = this.props
        dispatch(echo_map_snapshot_modal())
    }
    handle_close_map_snapshot() {
        const {dispatch} = this.props
        dispatch(close_map_snapshot_modal())
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_snapshots(selectedRowKeys, selectedRows))
    }
    fetch_agents(){
        const {dispatch} = this.props
        dispatch(fetch_agents())
    }
    submit_create_snapshot(snapshot){
        const {dispatch,snapshots} = this.props
        const {url} = this.props
        const pagination={}
        pagination.cur=snapshots.pagination.current;
        pagination.tot=snapshots.pagination.total+1;
        pagination.pag=snapshots.pagination.pageSize;
        let parent=/^[A-Za-z0-9_]+$/;
        if(snapshot&&parent.test(snapshot.snap_name)){
            dispatch(create_snapshot(snapshot,url,pagination,auth))
        }

    }
    handle_delete_snapshot() {
        const {dispatch,snapshots} = this.props
        const {selectedSnapshots} = this.props.snapshots
        const confirm = Modal.confirm;
        const pagination={}
        if ((snapshots.pagination.total)%(snapshots.pagination.pageSize)==1) {
            pagination.cur=snapshots.pagination.current-1;
        }else{
            pagination.cur=snapshots.pagination.current;
        };
        
        pagination.tot=snapshots.pagination.total-1;
        pagination.pag=snapshots.pagination.pageSize;
        if (selectedSnapshots.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_snapshots(selectedSnapshots,pagination,auth))
                },
                onCancel() { },
            });
        }
    }
    handle_clone_snapshot(){
        const warning = Modal.warning;
        const {dispatch} = this.props
        const {selectedSnapshots} = this.props.snapshots
        if (selectedSnapshots.length == 1) {//必须是单选
            dispatch(echo_clone_snapshot_modal())
        }
        else {
            warning({
                title: '请选择一个快照',
                content: '请选择一个快照进行克隆',
            })
        }
    }
    handle_close_clone_snapshot() {
        const {dispatch} = this.props
        dispatch(close_clone_snapshot_modal())
    }
    submit_clone_snapshot(name) {
        const {dispatch} = this.props
        const {selectedSnapshots} = this.props.snapshots
        const url = selectedSnapshots[0].url
        const snapshot = selectedSnapshots[0].snapshot
        // console.log(selectedSnapshots[0])
        let parent=/^[A-Za-z0-9_]+$/;
        if(snapshot&&parent.test(snapshot.clone_name)){
            dispatch(clone_snapshot(name,url,snapshot,auth))
        }
    }
    /*handleSearch(searchKey){
        const {url} = this.props
        this.props.dispatch(fetch_snapshots(url,auth,{
            searchKey: searchKey
        }, this.props.snapshots.pagination.pageSize, 1));
    }*/
    showSnapshotPage(current){
        const {url} = this.props
        this.props.dispatch(fetch_snapshots(url,auth,this.props.snapshots.pagination.pageSize, current,{
            searchKey: ''
        }));
    }
    onShowSizeChange(current, pageSize){
        const {url} = this.props
        this.props.dispatch(fetch_snapshots(url,auth, pageSize, current,{
            searchKey: ''
        }));
    }
    handle_map_volume_snapshot(){
        const {dispatch} = this.props
        const {snapshots} = this.props
        if (snapshots.selectedSnapshots.length == 1) {//单选
            dispatch(echo_map_volume_snapshot_modal())
        }
        else {
            Modal.warning({
                title: '请选择一个卷',
                content: '请选择一个卷进行映射',
            })
        }
        
        
    }
    submit_map_volume_snapshot(lun){
        const {dispatch} = this.props
        const {selectedSnapshots} = this.props.snapshots
        const volume_snapshot_id = selectedSnapshots[0].id
        dispatch(map_volume_snapshot(lun,volume_snapshot_id,auth))
    }
    handle_close_map_volume_snapshot(){
        const {dispatch} = this.props
        dispatch(close_map_volume_snapshot_modal())
    }
    render() {
        const {agents,portals,luns,snapshots,volumes} = this.props
        // console.log(snapshots.pagination)

        return ( 
            <div>
                <Row className="table_toolbar">
                <CreateSnapshot ref='createsnapshot' snapshots={snapshots.items}  visible={snapshots.create_snapshot_modal} onOk={this.submit_create_snapshot} onCancel={this.handle_close_create_snapshot} />
                {agents.items == undefined ? this.fetch_agents : <MapSnapshot ref='mapsnapshot' visible={snapshots.map_snapshot_modal} onOk={this.submit_map_snapshot} 
                onCancel={this.handle_close_map_snapshot} agents={agents.items} />}
                <CloneSnapshot ref='clonesnapshot' visible={snapshots.clone_snapshot_modal} volumes={volumes.items} item={snapshots.selectedSnapshots} onOk={this.submit_clone_snapshot} onCancel={this.handle_close_clone_snapshot} />
                    <Button type='ghost' icon='copy' className="cdp_button_right" onClick={this.handle_clone_snapshot}>克隆</Button>
                    <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_snapshot}>删除</Button>
                    <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_snapshot}>创建</Button>
                </Row>
                <MapVolume ref='mapvolume' portals={portals.items} visible={snapshots.map_volume_snapshot_modal} onOk={this.submit_map_volume_snapshot} onCancel={this.handle_close_map_volume_snapshot}
                        agents={agents.items} luns={luns.items}/>
                { snapshots.isFetching ? <Spin/> : <Snapshot items={snapshots.items} onChange={this.handleChange} selectedSnapshots={snapshots.selectedSnapshots}
                    selectedRowKeys={snapshots.selectedRowKeys} filtertype={this.props.filtertype} pagination={snapshots.pagination} dispatch={this.props.dispatch}
                    onShowSizeChange={this.onShowSizeChange} showSnapshotPage={this.showSnapshotPage}/>}
            </div>
        )
    }
}



function mapStateToProps(state) {

    return {
        snapshots:state.snapshots,
        agents:state.agents,
        luns:state.luns,
        portals:state.portals,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(SnapshotContainer)