import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {Row,Spin,Icon,Button,Modal,message} from 'antd'
import {fetch_clouds,fetch_cloud_host,toggle_clouds_host,register_cloud_agent
} from '../../actions/cloudactions'
import auth from '../../utils/auth'
import Clouddetail from '../../components/cloud/clouddetail'
import {fetch_volumes,fetch_agents} from '../../actions/actions' 


class ClouddetailContainer extends Component {
    constructor(props) {
        super(props);
        this.handlechange = this.handlechange.bind(this)
        this.handle_register_cloud_agent =this.handle_register_cloud_agent.bind(this)
    }
    componentDidMount() {
        const {dispatch,clouds,agents} =this.props
        let id = window.location.href.split('?')[0].split('/').pop()
        if (clouds.items.length<=0){
            dispatch(fetch_clouds())
        }
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
        dispatch(fetch_cloud_host(id))
    }
    handle_register_cloud_agent(){
        const {dispatch,clouds}=this.props
        let id = window.location.href.split('?')[0].split('/').pop()

        if(clouds.selectedCloudshost&&clouds.selectedCloudshost.length>0){
            for (let i = 0; i < clouds.selectedCloudshost.length; i++) {
                dispatch(register_cloud_agent(clouds.selectedCloudshost[i].name,id))
            };
        }else{
            message.error('请选择客户端注册')
            
        }

    }
    handlechange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_clouds_host(selectedRowKeys, selectedRows))

    }
    render() {
        const {dispatch,clouds,agents} = this.props
            // console.log(clouds)
            let id = window.location.href.split('?')[0].split('/').pop()
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label">云主机</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' className="cdp_button_left" onClick={this.handle_register_cloud_agent} >注册主机</Button>
                    </Row>
                    <Row>
                        <Clouddetail items={clouds.list_host} id={id} agents={agents.items} onChange={this.handlechange} selectedRowKeys={clouds.selectedCloudRowKeys} selectedCloudshost={clouds.selectedCloudshost} />
                    </Row>
                </Row>
            );
        
    }
}

ClouddetailContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        clouds:state.clouds,
        agents:state.agents,
    }
}
export default connect(mapStateToProps)(ClouddetailContainer)