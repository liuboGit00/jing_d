import React, {Component, PropTypes} from 'react';
import Hostinitiators from '../../components/hosts/hostinitiators'
import {connect} from 'react-redux'
import auth from '../../utils/auth'
import {fetch_host_targets,fetch_host_fcports,fetch_host_initiators,fetch_host,
        create_host_initiators,echo_create_host_initiators,close_create_host_initiators,
        delete_host_initiators,toggle_host_initiators,
        post_target_enable,post_target_disable,
        } from '../../actions/hostactions'
import CreateHostinitiator from '../../components/hosts/create_hostinitiators'
import {Button,Spin,Modal,Icon,Row} from 'antd'

class HostInitiatorsContainer extends Component {
    constructor(props){
        super(props)
        this.submit_create_host_initiator = this.submit_create_host_initiator.bind(this)
        this.handle_close_create_host_initiator = this.handle_close_create_host_initiator.bind(this)
        this.handle_delete_host_initiator = this.handle_delete_host_initiator.bind(this);
        this.handle_echo_create_host_initiators = this.handle_echo_create_host_initiators.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handle_target = this.handle_target.bind(this);
        this.handle_initiator = this.handle_initiator.bind(this)
    }
    componentWillMount(){
        const {dispatch,host,hostinitiators} = this.props
        console.log(hostinitiators)
        dispatch(fetch_host_fcports())
        dispatch(fetch_host_targets())

        if(host.items.length<=0){
            dispatch(fetch_host())
        }
        if(hostinitiators.hostinitiators.length<=0){
            dispatch(fetch_host_initiators())
        }
        
    }
    handle_echo_create_host_initiators() {
        const {dispatch} = this.props
        //const {initiatorname} = this.props.agentdetail
        dispatch(echo_create_host_initiators())

    }
    submit_create_host_initiator(initiator){
        const {dispatch} = this.props
        const hostsId = this.props.params.hostsId
        dispatch(create_host_initiators(initiator,hostsId,auth))
        dispatch(close_create_host_initiators())

    }
    handle_close_create_host_initiator(){
        const {dispatch} = this.props
        dispatch(close_create_host_initiators())
    }
    handle_delete_host_initiator() {
        const {dispatch} = this.props
        const {selectedInits} = this.props.hostinitiators
        const confirm = Modal.confirm;
        confirm({
            title: '您确定要删除所选内容吗',
            content: '删除后将无法恢复',
            onOk() {
                dispatch(delete_host_initiators(selectedInits, auth))
            },
            onCancel() {},
        });
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_host_initiators(selectedRowKeys, selectedRows))
    }
    handle_initiator(disable){
        // console.log(disable)
        const {dispatch} = this.props
        dispatch(post_target_disable(disable,auth))

    }
    handle_target(enable){
        // console.log(enable)
        const {dispatch} = this.props
        dispatch(post_target_enable(enable,auth))
    }
    render() {
        const {hostinitiators,host} = this.props
        console.log(hostinitiators.targets)
        if(host.items.length>0&&hostinitiators!=undefined){
            if (host.isFetching) { return <p></p> } else {
            const hostsId = this.props.params.hostsId
            const hostini = host.items.find(item => (item.id == hostsId))


            return (
                <div>
                    <Row className="table_title">
                        {hostini==undefined?<label className="cdp_label"><Icon type="file-text" />CDP主机:</label>:<label className="cdp_label"><Icon type="file-text" />CDP主机:{hostini.name}</label>}
                        
                    </Row>
                    <Hostinitiators  
                        hostini={hostini} enable_disable={hostinitiators}  hostinitiators={hostinitiators.hostinitiators} targets={hostinitiators.targets} fcports={hostinitiators.fcports}
                        onChange={this.handleChange} selectedInits={hostinitiators.selectedInits} selectedRowKeys={hostinitiators.selectedRowKeys} 
                        onDelete={this.handle_delete_host_initiator}
                        onCreate={this.handle_echo_create_host_initiators}
                        onTarget={this.handle_target}
                        onInitiator={this.handle_initiator}
                        />
                    <CreateHostinitiator visible={hostinitiators.create_hostinitiator_modal} fcports={hostinitiators.fcports} hostinitiators={host.saved_grains} onOk={this.submit_create_host_initiator}
                        onCancel={this.handle_close_create_host_initiator} />
                </div>
            )}
        }else{
            return false
        }

    
    }
}

HostInitiatorsContainer.propTypes = {

};

function mapStateToProps(state) {


    return {
        hostinitiators: state.hostinitiators,
        host: state.host
    }
}
export default connect(mapStateToProps)(HostInitiatorsContainer)