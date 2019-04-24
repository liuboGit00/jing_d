import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Loading from '../../components/common/loading'
import { Spin,Button,Modal,Row,Icon} from 'antd';
import {fetch_hostgroup_property,set_hostgroup_property,fetch_hostgroup,echo_hostgroup_property,
        close_hostgroup_property,set_hostgroup_property_id} from '../../actions/hostgroupaction'
import HostgroupProperty from '../../components/hosts/hostgroup_property'
import SetHostgroupProperty from '../../components/hosts/set_hostgroup_property'


class HosrgroupPropertyContainer extends Component {
    constructor(props) {
        super(props)
        this.handle_echo_hostgroup_property = this.handle_echo_hostgroup_property.bind(this)
        this.handle_close_hostgroup_property = this.handle_close_hostgroup_property.bind(this)
        this.handle_submit_hostgroup_property = this.handle_submit_hostgroup_property.bind(this)
    }
    handle_echo_hostgroup_property(){
        const {dispatch} =this.props
        dispatch(echo_hostgroup_property())
    }
    handle_close_hostgroup_property(){
        const {dispatch} =this.props
        dispatch(close_hostgroup_property())
    }
    handle_submit_hostgroup_property(property){
        const {dispatch} =this.props
        // console.log(property)
        dispatch(set_hostgroup_property(property))
    }
    componentDidMount() {
        let id = window.location.href.split('?')[0].split('/').pop()
        let property_id = this.props.hostgroup.hostgroupid==undefined?id:this.props.hostgroup.hostgroupid
        this.props.dispatch(fetch_hostgroup())
        this.props.dispatch(fetch_hostgroup_property(property_id))
        this.props.dispatch(set_hostgroup_property_id(id))
    }
    render() {
        const {hostgroup,dispatch,} = this.props
        let onlyhostgroup = hostgroup.items.filter(function(item){return(item.id==hostgroup.hostgroupid)},hostgroup)
        // console.log(hostgroup.items)
        if (hostgroup.property !== undefined){
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />属性详情</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='edit' className="cdp_button_right" onClick={this.handle_echo_hostgroup_property}>修改属性</Button>
                    </Row>
                    <Row >
                        {hostgroup.property?<HostgroupProperty  property={hostgroup.property}/>:<HostgroupProperty  />}
                    </Row>
                    <Row>
                        <SetHostgroupProperty visible={hostgroup.hostgroup_property_modal}  hostgroup={onlyhostgroup}  property={hostgroup.property} onOk={this.handle_submit_hostgroup_property} onCancel={this.handle_close_hostgroup_property}/>
                    </Row>
                    
                </Row>
            )
        }
        else {
            return (
                <Loading loading="true"/>
            )
        }
    }
}

HosrgroupPropertyContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        hostgroup:state.hostgroup
    }
}
export default connect(mapStateToProps)(HosrgroupPropertyContainer)
