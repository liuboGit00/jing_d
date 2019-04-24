import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_volumes,fetch_luns,echo_create_volume_modal,close_create_volume_modal,reload_volume,
        toggle_volumes,delete_volumes,create_volume,fetch_portals,echo_map_volume_modal,
        close_map_volume_modal,map_volume,fetch_agents,change_replay_time,select_display_content,
        fetch_volumes_search,loading_modal,fetch_snapshots_list,fetch_snapshots
    } from '../actions/actions'
import {fetch_pools} from '../actions/poolactions'
import Volumes from '../components/volume/volume'

import CreateVolume from '../components/volume/create_volume'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,Select} from 'antd';
import auth from '../utils/auth'
import MapVolume from '../components/volume/map_volume'
import {start_logdev,echo_logdev_modal,close_logdev_modal,replay_log,echo_replay_log_modal,close_replay_log_modal,fetch_log_detail,clone_and_replay,setSnaplist} from '../actions/devlogactions'
import StartLogdev from '../components/volume/start_logdev'
import ReplayLog from '../components/volume/replay_log'
import SearchInput from '../components/common/searchinput'
import {restapi,volumespath} from '../confs/host'
const Option = Select.Option;


class VolumesContainer extends Component {
    constructor(props) {
        super(props)
        this.handle_create_volume = this.handle_create_volume.bind(this)
        this.handle_close_volume = this.handle_close_volume.bind(this)
        this.handle_reload_volume = this.handle_reload_volume.bind(this)
        this.handle_delete_volume = this.handle_delete_volume.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit_create_volume = this.submit_create_volume.bind(this)
        this.handle_map_volume = this.handle_map_volume.bind(this)
        this.handle_close_map_volume = this.handle_close_map_volume.bind(this)
        this.submit_map_volume = this.submit_map_volume.bind(this)
        this.handle_start_logdev = this.handle_start_logdev.bind(this)
        this.handle_close_start_logdev = this.handle_close_start_logdev.bind(this)
        this.submit_start_logdev = this.submit_start_logdev.bind(this)
        this.handle_replay_log = this.handle_replay_log.bind(this)
        this.submit_replay_log = this.submit_replay_log.bind(this)
        this.handle_close_replay_log = this.handle_close_replay_log.bind(this)
        this.handleSearch = this.handleSearch.bind(this);
        this.handle_change_time = this.handle_change_time.bind(this);
    }
    componentDidMount() {
        const {dispatch,volumes} = this.props
        const {didInvalidate} = this.props.volumes
        const {pools} = this.props
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        if(pools.items.length <= 0){
            dispatch(fetch_pools())
        }
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
        // const {logdev} = this.props
        // if(logdev.items.length <= 0){
        //     dispatch(fetch_devLog())
        // }
    }

    handle_create_volume(){
        const {dispatch} = this.props
        dispatch(echo_create_volume_modal())
    }
    handle_close_volume(){
        const {dispatch} = this.props
        dispatch(close_create_volume_modal())
    }
    handle_reload_volume(){
        const {dispatch} = this.props
        dispatch(reload_volume())
        if (this.props.url == undefined) {
            dispatch(fetch_volumes())
        } else {
            dispatch(fetch_volumes({ 'baseURI': this.props.url, 'path':'', 'auth':auth,'searchKey':''}))
        }

    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_volumes(selectedRowKeys,selectedRows))
    }
    handle_delete_volume() {
        const {dispatch} = this.props
        const {selectedVolumes} = this.props.volumes
        const confirm = Modal.confirm;
        if (selectedVolumes.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_volumes(selectedVolumes, auth))
                },
                onCancel() { },
            });
        }
    }

    submit_create_volume(volume){
        console.log(volume)
        const {dispatch,volumes} = this.props
        dispatch(loading_modal())
        var parent = /^[A-Za-z0-9]+$/
        if(!volume.vol_name || !parent.test(volume.vol_name)){
            return message.error('请输入卷名')
        }
        for(let i=0;i<volumes.items.length;i++){
            console.log(volumes.vol_name)
            if(volume.vol_name == volumes.items[i].name){
                return message.error('卷名已被使用')
            }
        }

        dispatch(create_volume(volume,auth))


    }
    handle_map_volume(){
        const {dispatch} = this.props
        const {selectedVolumes} = this.props.volumes
        if (selectedVolumes.length == 1) {//单选
            dispatch(echo_map_volume_modal())
        }
        else {
            Modal.warning({
                title: '请选择一个卷',
                content: '请选择一个卷进行映射',
            })
        }
        
        
    }
    submit_map_volume(lun){
        const {dispatch} = this.props
        const {selectedVolumes} = this.props.volumes
        const volume_id = selectedVolumes[0].id
        console.log(lun)
        // console.log(volume_id)
        dispatch(map_volume(lun,volume_id,auth))
    }
    handle_close_map_volume(){
        const {dispatch} = this.props
        dispatch(close_map_volume_modal())
    }
    handle_start_logdev(srcvolId){
        this.props.dispatch(echo_logdev_modal(srcvolId))
        // console.log(srcvolId)
    }
    submit_start_logdev(logdev){
        const {dispatch} = this.props
        const {srcvolId} = this.props.volumes
        dispatch(start_logdev(srcvolId,logdev,auth))
    }
    handle_close_start_logdev(){
        this.props.dispatch(close_logdev_modal())
    }
    handle_replay_log(volumeId){
        const {dispatch} = this.props
        //dispatch(echo_replay_log_modal(logdevId))
        const {items} = this.props.volumes
        const volume=items.find(item=>(item.id==volumeId))
        const url = volume.url
        //dispatch(fetch_snapshots_list({ 'baseURI':url, 'path': '/snapshots', 'username': auth.username, 'password': auth.password }))
        // const logdevs = this.props.logdev.items
        // console.log(logdevs)
        // const logdev = logdevs.find(logdev=>(logdev.volume==url))
        // console.log(volume.native.logdev)

        const logvolumeUrl = volume.native.logdev.logvolume
        const logdevId = logvolumeUrl.split('volumes/')[1]
        //console.log(logdevId)
        /*const logvolume=items.find(item=>(item.url==logvolumeUrl))
        console.log(logvolume)
        const logdevId = logvolume.id*/
        // dispatch(fetch_log_detail(logvolumeUrl,auth))
        // const {entries} = this.props.logdetail.items
        // console.log(entries)
        // const {snapshots} = this.props
        // var time=snapshots.items[0].createdate
        // console.log(time)
        // var cTime=time.getTime()
        // console.log(cTime)
        // var timestamp = Date.parse(new Date(time))
        // console.log(timestamp)
        // var newDate = new Date()
        // var timestamp2 = Date.parse(new Date(newDate))
        // console.log(timestamp2)
        // console.log(newDate.toISOString())
        //if (snapshots.length > 0) {
            //console.log(entries[0].timestamp,entries[entries.length - 1].timestamp)
            // var snaplist = new Array()
            // snapshots.items.forEach(function (element) {
            //     var snaptime = Date.parse(new Date(element.createdate))
            //     snaptime = snaptime/1000
            //     // var newDate = new Date();
            //     // newDate.setTime(snaptime * 1000);
            //     // console.log(newDate.toLocaleString())
            //     //console.log(snaptime)
            //     if (snaptime <= entries[0].timestamp && snaptime >= entries[entries.length - 1].timestamp) {
            //         snaplist.push(element)
            //     }
            // })
            // console.log(snaplist)
            // dispatch(echo_replay_log_modal(logdevId,snaplist))
        /*} else {
            Modal.warning({
                title: '无法回放',
                content: '缺少快照',
            })
        }*/
        dispatch(setSnaplist(url, auth, logvolumeUrl,logdevId))
    }
    handle_close_replay_log(){
        this.props.dispatch(close_replay_log_modal())
    }
    submit_replay_log(datetime){
        // var ctime = log.datetime.getTime()
        // console.log(datetime)
        const {dispatch} = this.props
        //const {items} = this.props.logdetail
        // const {logdevId} = this.props.volumes
        // const {items} = this.props.volumes
        // const volume=items.find(item=>(item.id==logdevId))
        // const url = volume.snapshots
        //dispatch(fetch_log_detail(url,auth))
        const {entries} = this.props.logdetail.items
        // console.log(this.props.logdetail.items.last_timestamp)
        var pos = 0
        for(var i=0;i<entries.length;i++){
            console.log(entries[i].timestamp,datetime)
            if(entries[i].timestamp>datetime){
                pos++
            }
        }
        console.log(pos)
        console.log(entries)

        var entry = entries[pos]
        var startdir = entry.dirno
        // console.log(startdir)
        //dispatch(replay_log(url,))
        const {snaplist} = this.props.volumes
        // console.log(snaplist)
        var pos2 = 0
        for(var i=0;i<snaplist.length;i++){
            // console.log(datetime)
            // console.log(snaplist[i])
            console.log(Date.parse(new Date(snaplist[i].createdate+"+08:00"))/1000)
            if((Date.parse(new Date(snaplist[i].createdate+"+08:00"))/1000)<=datetime){
                pos2++
            }
        }
        // console.log(pos2)
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        // console.log(snaplist)
        var name = snaplist[pos2-1].name + timestamp
        // console.log(name)
        const {logdevId} = this.props.volumes
        // console.log(snaplist[pos2-1].url,name,startdir,logdevId,datetime)
        dispatch(clone_and_replay(snaplist[pos2-1].url,name,auth,startdir,logdevId,datetime))
        // dispatch(clone_for_replay(snaplist[pos2].url,name,auth))
        // const {clonevolume,logdevId} = this.props.volumes
        // dispatch(replay_log(clonevolume.url,auth,startdir,logdevId,datetime))
    }
    handleSearch(searchKey){
        const{dispatch} = this.props
        if (this.props.url == undefined) {
            dispatch(fetch_volumes_search({ 'baseURI': restapi, 'path':volumespath, 'auth':auth ,'searchKey':searchKey}))
        } else {
            dispatch(fetch_volumes_search({ 'baseURI': restapi, 'path':volumespath, 'auth':auth,'searchKey':searchKey}))
        }
    }
    handle_change_time(timeNumber,time){
        const{dispatch} = this.props
        dispatch(change_replay_time(timeNumber,time))
    }
    select_display_list(value){
        const {dispatch}=this.props;
        dispatch(select_display_content(value))
    }
    
    render() {
        const {dispatch,volumes, pools, portals, agents,snapshots,logdev,luns,showtype,poolvolume} = this.props
        // console.log(showtype,url)
        if (volumes.isFetching || pools.isFetching || portals.isFetching || agents.isFetching) {
            return <div><Spin /></div>
        } else {

            // let  pooldelitevolumeitem=null
            // if (showtype=='pool') {
            //     for (let i=0;i<volumes.items.length;i++){

            //     }
            // };
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />卷列表</label>
                    </Row>
                    <Row className="table_toolbar">
                        <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this)} ref="searchInput"></SearchInput>
                        <Button type='ghost' icon='link' className="cdp_button_left" onClick={this.handle_map_volume}>映射</Button>
                        <Button type='ghost' icon='reload' className="cdp_button_right" onClick={this.handle_reload_volume}>刷新</Button>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_volume}>删除卷</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_volume} >创建卷</Button>
                        <Select className="cdp_button_left" style={{width:88}} defaultValue='all' onChange={this.select_display_list.bind(this)}>
                            <Option value='all'>所有设备</Option>
                            <Option value='zvol'>块设备</Option>
                            <Option value='logdevice'>日志卷</Option>
                            <Option value='zfs'>文件系统</Option>
                            <Option value='clone'>克隆设备</Option>
                            <Option value='connection'>镜像设备</Option>
                            <Option value='image'>集群设备</Option>
                            <Option value='genericdisk'>硬盘设备</Option>
                        </Select>



                    </Row>
                    <Row >
                        {volumes.search_modal==true?<Volumes selectcontent={volumes.selectContent} items={volumes.searchVolumes} onChange={this.handleChange} selectedVolumes={volumes.selectedVolumes} selectedRowKeys={volumes.selectedRowKeys}
                         poolurl={this.props.url}   filtertype={this.props.filtertype} onStartLog={this.handle_start_logdev} onReplayLog={this.handle_replay_log}  pools={pools.items}/>
                         :<Volumes selectcontent={volumes.selectContent} items={showtype=='pool'?poolvolume:volumes.items} onChange={this.handleChange} selectedVolumes={volumes.selectedVolumes} selectedRowKeys={volumes.selectedRowKeys}
                         poolurl={this.props.url}   filtertype={this.props.filtertype} onStartLog={this.handle_start_logdev} onReplayLog={this.handle_replay_log}  pools={pools.items}/>}
                    </Row>
                    <Row>
                        <CreateVolume ref='createvolume' loading={volumes.loading} items ={volumes.items} pools={pools.items} selectpool={pools.selectpool} visible={volumes.create_volume_modal} onOk={this.submit_create_volume}
                            onCancel={this.handle_close_volume}/>
                        <MapVolume ref='mapvolume' portals={portals.items} visible={volumes.map_volume_modal} onOk={this.submit_map_volume} onCancel={this.handle_close_map_volume}
                            agents={agents.items} luns={luns.items}/>
                        <StartLogdev ref='startlogdev' volumes={volumes.items} visible={volumes.start_logdev_modal} onOk={this.submit_start_logdev} onCancel={this.handle_close_start_logdev}
                            pools={pools.items} onCreate={this.handle_create_volume}/>
                        {volumes.snaplist == undefined|| volumes.snaplist ==''? <div></div>
                            : <ReplayLog ref='replaylog' visible={volumes.replay_log_modal} onOk={this.submit_replay_log} onCancel={this.handle_close_replay_log} snaplist={volumes.snaplist} lasttime={this.props.logdetail}
                            onChangeTime={this.handle_change_time} replaytime={volumes.replay_time} replaytimeNumber={volumes.replay_time_number}/>}
                    </Row>
                </Row>
            )
        }
    }
}

VolumesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        volumes:state.volumes,
        pools:state.pools,
        portals:state.portals,
        agents:state.agents,
        logdetail:state.logdetail,
        snapshots:state.snapshots,
        luns:state.luns,
    }
}
export default connect(mapStateToProps)(VolumesContainer)