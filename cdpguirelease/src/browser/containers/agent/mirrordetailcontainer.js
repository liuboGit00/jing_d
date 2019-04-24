import React, {Component, PropTypes} from 'react';
import MirrorDetail from '../../components/agent/mirrordetail'
import {connect} from 'react-redux'
import auth from '../../utils/auth'
import {fetch_mirrors,fetch_ipaddresses} from '../../actions/mirroraction'
import {fetch_volumes,fetch_agents,} from '../../actions/actions'
import {fetch_host} from '../../actions/hostactions'


import {Button,Spin,Modal,Icon} from 'antd'

class MirrorDetailContainer extends Component {
    componentWillMount(){
        const {dispatch} = this.props
        const {mirrors,volumes,agents,host} = this.props
        if(mirrors.items.length==0){
            dispatch(fetch_mirrors())
            dispatch(fetch_ipaddresses())
        }
        if(volumes.items.length==0){
            dispatch(fetch_volumes())
        }
        if(agents.items.length==0){
            dispatch(fetch_agents())
        }
        if(host.items.length==0){
            dispatch(fetch_host())
        }
        
    }
    render() {
        const {mirrors,volumes,agents,host} = this.props
        // console.log(mirrors.items,mirrors.isFetching)
        if(mirrors.items.length>0){
            if (mirrors.isFetching) { return <Spin /> } else {
                // console.log(1)
            const mirrorId = this.props.params.mirrorsId
            // console.log(mirrorId)
            const mirror = mirrors.items.find(item => (item.id == mirrorId))
            // console.log(mirror)
            return (
                <div>
                    <MirrorDetail host={host.items}  ipaddress={mirrors.address} agents={agents.items} volumes={volumes.items}  mirrordetail={mirror}  dispatch={this.props.dispatch}  />
                </div>   
            )}
        }else{
            return false
        }

    
    }
}

MirrorDetailContainer.propTypes = {

};

function mapStateToProps(state) {


    return {
        mirrors: state.mirrors,
        volumes: state.volumes,
        agents: state.agents,
        host:state.host,


    }
}
export default connect(mapStateToProps)(MirrorDetailContainer)