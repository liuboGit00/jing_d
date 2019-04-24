import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Clouds from '../../components/cloud/cloud'
import {Row,Spin,Icon,Button,Modal,Form} from 'antd'
import {fetch_clouds,echo_create_connection_modal,close_create_connection_modal,echo_create_vpc_modal,
    close_create_vpc_modal,fetch_clones,toggle_clouds,create_connection,create_vpc,delete_clouds,
    set_vpc_switch_on,set_vpc_switch_off,create_cloud_newvm,fetch_cloud_host_luns,fetch_cloud_host,
} from '../../actions/cloudactions'
import CreateConnection from '../../components/cloud/create_connection'
import CreateVPC from '../../components/cloud/create_vpc'
import auth from '../../utils/auth'
import {fetch_volumes,} from '../../actions/actions'
import {Link} from 'react-router'


class CloudContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_create_connection = this.handle_create_connection.bind(this);
        this.handle_close_connection = this.handle_close_connection.bind(this);
        this.handle_close_vpc = this.handle_close_vpc.bind(this);
        this.handle_create_vpc = this.handle_create_vpc.bind(this);
        this.submit_create_connection = this.submit_create_connection.bind(this);
        this.submit_create_vpc = this.submit_create_vpc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handle_delete_cloud = this.handle_delete_cloud.bind(this);
    }
    componentDidMount() {
        const{clouds,volumes,clones}=this.props
        if(clones.items.length<=0){
            this.props.dispatch(fetch_clones())
        }
        if(clouds.items.length<=0){
            this.props.dispatch(fetch_clouds())
        }
        if(volumes.items.length<=0){
            this.props.dispatch(fetch_volumes())
        }
    }

    handle_create_connection(){
        this.props.dispatch(echo_create_connection_modal())
    }
    handle_create_vpc(){
        const {dispatch,clouds} = this.props
        const {selectedClouds} = this.props.clouds
        const confirm = Modal.confirm
        console.log(selectedClouds[0])
        
       
            if (selectedClouds.length == 1) {//单选
                console.log(clouds.list_lun)
                if(clouds.list_lun||selectedClouds[0].cloudtype=='local'){
                    dispatch(echo_create_vpc_modal())
                }else{
                    confirm({
                        title: 'CDP系统提示！',
                        content: '未扫描到硬盘组，请映射卷到客户端并重新扫描。',
                        onOk() {
                            const href = window.location.href.split('?')[0]
                            window.location.href=href+'/'+'luns/'+selectedClouds[0].name+'/'+ selectedClouds[0].id
                            console.log(window.location.href)
                            dispatch(fetch_cloud_host(selectedClouds[0].id))
                        },
                        onCancel() {},
                    });
                }
            }else {
                Modal.warning({
                    title: '请选择一个主机',
                    content: '请选择一个云端主机创建虚拟机',
                })
            }
       
       
    }
    handle_close_connection(){
        this.props.dispatch(close_create_connection_modal())
        this.props.dispatch(set_vpc_switch_off())

    }
    submit_create_connection(connection){
        const {dispatch} = this.props
        console.log(connection)
        dispatch(create_connection(connection,auth))
    }
    submit_create_vpc(vpc){
        const {dispatch} = this.props
        const {selectedClouds} = this.props.clouds
        var url = selectedClouds[0].url
        // console.log(vpc)
        if(vpc.type=='vmware'){
            dispatch(create_cloud_newvm(vpc))
        }else{
            dispatch(create_vpc(url,vpc,auth))
        }
    }
    handle_close_vpc(){
        this.props.dispatch(close_create_vpc_modal())
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_clouds(selectedRowKeys, selectedRows))
    }
    handle_delete_cloud() {
        const {dispatch} = this.props
        const {selectedClouds} = this.props.clouds
        const confirm = Modal.confirm;
        if (selectedClouds.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_clouds(selectedClouds, auth))
                },
                onCancel() { },
            });
        }
    }
    render() {
        const {clouds, clones,volumes,dispatch} = this.props
        // console.log(clouds.list_lun)
        if (clouds.isFetching || clones.isFetching) { return <Spin /> } else {
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="cloud-upload-o" />云主机信息</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' className="cdp_button_left" icon='link></Link>' onClick={this.handle_create_connection}>创建连接配置</Button>
                        <Button type='ghost' className="cdp_button_left" icon='plus' onClick={this.handle_create_vpc}>创建虚拟机</Button>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_cloud}>删除</Button>
                    </Row>
                    <Clouds items={clouds.items} onChange={this.handleChange} selectedClouds={clouds.selectedClouds} selectedRowKeys={clouds.selectedRowKeys}/>
                    {clouds.create_connection_modal?<CreateConnection ref='createconnection' content={clouds.content} dispatch={dispatch} vpcswitch={clouds.vpcswitch} visible={clouds.create_connection_modal} onOk={this.submit_create_connection} clouds={clouds.items}
                                            onCancel={this.handle_close_connection}/>:<div></div>}
                    {clouds.create_vpc_modal?<CreateVPC ref='createvpc' list_lun={clouds.list_lun} clouds={clouds} clones={clones.items} visible={clouds.create_vpc_modal} onOk={this.submit_create_vpc} dispatch={dispatch}
                        onCancel={this.handle_close_vpc} volumes={volumes}/>:<div></div>}
                </Row>
            );
        }
    }
}

CloudContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        clouds:state.clouds,
        clones:state.clones,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(CloudContainer)