import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    toggle_volumegroup,fetch_volumegroup,create_volumegroup,echo_volumegroup_modal,
    close_volumegroup_modal,delete_volumegroup,
} from '../actions/volumegroupaction'
import {fetch_volumes} from '../actions/actions'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import Volumegroup from '../components/volume/volumegroup'
import CreateVolumegroup from '../components/volume/create_volumegroup'

import auth from '../utils/auth'
const confirm = Modal.confirm;

class  VolumegroupContainer extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handle_delete_volumegroup = this.handle_delete_volumegroup.bind(this)
        this.handle_create_volumegroup = this.handle_create_volumegroup.bind(this)
        this.submit_create_volumegroup = this.submit_create_volumegroup.bind(this)
        this.handle_close_volumegroup = this.handle_close_volumegroup.bind(this)

    }
    componentDidMount() {
        const {dispatch,volumes,volumegroup}=this.props
        if(volumegroup.items.length<=0){
            dispatch(fetch_volumegroup())
        }
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
    }

    handleChange(selectedRowKeys, selectedRows){
        console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_volumegroup(selectedRowKeys, selectedRows))
    }
    handle_create_volumegroup(){
        this.props.dispatch(echo_volumegroup_modal())
    }
    handle_delete_volumegroup(){
        const {dispatch} = this.props
        const {selectedVolumegroup} = this.props.volumegroup
        const confirm = Modal.confirm;
        if(selectedVolumegroup!=''){
            confirm({
                title: '您是否确认要删除已选择的这些卷组',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_volumegroup(selectedVolumegroup,auth))
                },
                onCancel() { },
            });
        }else{
            confirm({
                title: '请选择你要删除的卷组',
                content: '请选择一个或多个卷组进行删除',
                onOk() {},
                onCancel() {},
            });
        }
        
        
    }
    handle_close_volumegroup(){
        this.props.dispatch(close_volumegroup_modal())
    }
    submit_create_volumegroup(volumegroup){
        this.props.dispatch(create_volumegroup(volumegroup))
    }
    render() {
        const {volumes,volumegroup,dispatch}=this.props
        // console.log(volumegroup)
        return (
            <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />卷组列表</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_volumegroup}>删除卷组</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_volumegroup}>创建卷组</Button>
                    </Row>
                    <Row > 
                        <Volumegroup ref='volumegroup' items={volumegroup.items} dispatch={dispatch} onChange={this.handleChange} selectedVolumegroup={volumegroup.selectedVolumegroup} selectedRowKeys={volumegroup.selectedRowKeys} />
                    </Row>
                    <Row>
                        <CreateVolumegroup ref='createvolumegroup'  items={volumegroup.items} volumes ={volumes.items}  visible={volumegroup.create_volumegroup_modal} onOk={this.submit_create_volumegroup}
                            onCancel={this.handle_close_volumegroup}/>
                       </Row>
                </Row>
        );
    }
}

   VolumegroupContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        volumes: state.volumes,
        volumegroup: state.volumegroup,

    }
}

export default connect(mapStateToProps)(   VolumegroupContainer);