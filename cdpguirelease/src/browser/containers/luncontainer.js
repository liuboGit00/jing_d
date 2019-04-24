import React, {Component, PropTypes} from 'react';
import {fetch_luns,toggle_luns,delete_luns,fetch_agents,fetch_volumes,fetch_portals} from '../actions/actions'
import Lun from '../components/volume/lun'
import auth from '../utils/auth'
import { Spin,Button,Modal,Row,Icon } from 'antd';
import {connect} from 'react-redux'

class LunContainer extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handle_delete_lun = this.handle_delete_lun.bind(this)
    }
    componentDidMount(){
        const{dispatch} = this.props
        dispatch(fetch_luns())
        const {agents} = this.props
        if(agents.items.length <= 0){
            dispatch(fetch_agents())
        }
        const {volumes} = this.props
        if(volumes.items.length <= 0){
            dispatch(fetch_volumes())
        }
        const {portals} = this.props
        if(portals.items.length <= 0){
            dispatch(fetch_portals())
        }
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_luns(selectedRowKeys,selectedRows))
    }
    handle_delete_lun(){
        const {dispatch} = this.props
        const {selectedLuns} = this.props.luns
        if (selectedLuns.length > 0) {
            Modal.confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_luns(selectedLuns, auth))
                },
                onCancel() { },
            });
        }else{
            Modal.confirm({
                title: '请选择您要删除的内容',
                onOk(){},
                onCancel() { },
            });
        }
    }
    render() {
        const {luns, agents, portals,volumes} = this.props
        if (luns.isFetching || agents.isFetching || portals.isFetching ||volumes.isFetching) { return <Spin/> } else {
            var lunlist = []
            luns.items.forEach(function (element) {
                var portallist = ""
                const agent = agents.items.find(item => item.url == element.agent)
                const volume = volumes.items.find(item => item.url == element.volume)
                element.portals.forEach(function (item) {
                    var portal = portals.items.find(item2 => item2.url == item)
                    { portallist == "" ? portallist = portal.ipaddress : portallist = portallist + ' , ' + portal.ipaddress }
                })
                lunlist[lunlist.length] = { 'id': element.id, 'agent': agent.name+'/'+agent.id, 'volume': volume.name+'/'+volume.id, 'portals': portallist, 'url': element.url, 'lun_id': element.lun_id,'map_lunid':element.map_lunid }
            })
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="link" />已映射列表</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_lun}>删除</Button>
                    </Row>
                    <Lun items={lunlist} onChange={this.handleChange} selectedLuns={luns.selectedLuns} selectedRowKeys={luns.selectedRowKeys}
                        filtertype={this.props.filtertype} volumes={volumes.items} />
                </Row>
            );
        }
    }
}

LunContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        luns:state.luns,
        agents:state.agents,
        volumes:state.volumes,
        portals:state.portals
    }
}
export default connect(mapStateToProps)(LunContainer)