import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_host,echo_create_host,close_create_host,create_host,toggle_host,delete_host,modify_host,echo_modify_host,close_modify_host} from '../../actions/hostactions'
import Host from '../../components/hosts/hosts'
import ModifyHost from '../../components/hosts/modify_host'


import CreateHost from '../../components/hosts/create_host'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import SearchInput from '../../components/common/searchinput'
import {restapi,hostpath} from '../../confs/host'
import {fetch_users} from '../../actions/useractions' 

class HostContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handle_create_host = this.handle_create_host.bind(this);
        this.handle_close_host = this.handle_close_host.bind(this);
        this.handle_delete_host = this.handle_delete_host.bind(this);
        this.submit_create_host = this.submit_create_host.bind(this);
        this.handle_echo_modify_host = this.handle_echo_modify_host.bind(this);
        this.submit_modify_host = this.submit_modify_host.bind(this);
        this.handle_close_modify_host = this.handle_close_modify_host.bind(this);
    }
    componentDidMount() {
        const {dispatch,host,userManageState} = this.props
        if(host.items.length<=0){
            dispatch(fetch_host())
        }if(userManageState.items.length<=0){
            dispatch(fetch_users())
        }
        
    }

    handle_create_host(){
        const {dispatch} = this.props;
        dispatch(echo_create_host())
    }
    handle_close_host(){
        const {dispatch} = this.props;
        dispatch(close_create_host())
    }
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_host(selectedRowKeys,selectedRows))
    }
    handle_delete_host() {
        const {dispatch} = this.props
        const {selectedHost} = this.props.host
        const confirm = Modal.confirm;
        // console.log(selectedHost)

        if (selectedHost.length > 0) {
            for(let i=0;i<selectedHost.length;i++){
                if(selectedHost[i].netdevice_set!=''){
                    confirm({
                        title: '您是否确认要删除已选择的这些项内容',
                        content: '不能删除本地主机',
                        onOk() {},
                        onCancel() { },
                    });
                    break;
                }else{
                    confirm({
                        title: '您是否确认要删除已选择的这些项内容',
                        content: '删除后将无法恢复',
                        onOk() {
                            dispatch(delete_host(selectedHost, auth))
                        },
                        onCancel() { },
                    });
                    break;
                }
            }
            
        }
    }

    submit_create_host(ho){
        const {dispatch,host} = this.props
        const parent=/^[a-zA-Z][A-Za-z0-9-]+$/;
        const text = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
        for(let i=0;i<host.items.length;i++){
            if(ho.host_name == host.items[i].name){
                return message.error('主机名已被使用')
            }
        }
        console.log((ho.url.split('//')[1]).split('/')[0])
        console.log(text.test((ho.url.split('//')[1]).split('/')[0]))
        if(ho.name==undefined||ho.name==''){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写主机名',
            });
        }else if(!text.test((ho.url.split('//')[1]).split('/')[0])){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写正确的主机地址',
            });
        }else if(ho.token==undefined||ho.token==''){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写token',
            });
        }else if(!parent.test(ho.name)){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写符合规则的主机名',
            });
        }else{
            dispatch(create_host(ho,auth))
        }


    }
    handle_echo_modify_host(){
        const{dispatch,host}=this.props;
        if(host.selectedHost.length==1){
            dispatch(echo_modify_host())
        }else{
            message.error('请选择一个主机')
        }
        
    }
    handle_close_modify_host(){
        const{dispatch}=this.props;
        dispatch(close_modify_host())
    }
    submit_modify_host(hostl){
        const {dispatch,host} = this.props
        const parent=/^[a-zA-Z][A-Za-z0-9-]+$/;
        const text = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
        for(let i=0;i<host.items.length;i++){
            if(hostl.host_name == host.items[i].name){
                return message.error('卷名已被使用')
            }
        }
        if(hostl.name==undefined||hostl.name==''){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写主机名',
            });
        }else if(!text.test((hostl.url.split('//')[1]).split('/')[0])){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写正确的主机地址',
            });
        }else if(hostl.token==undefined||hostl.token==''){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写token',
            });
        }else if(!parent.test(hostl.name)){
            Modal.error({
                title: 'CDP系统提示！',
                content:'请填写符合规则的主机名',
            });
        }else{
           dispatch(modify_host(hostl,auth))
        }
    }

    // handleSearch(searchKey){
    //     const{dispatch} = this.props
    //     if (this.props.url == undefined) {
    //         dispatch(fetch_volumes({ 'baseURI': restapi, 'path':volumespath, 'auth':auth ,'searchKey':searchKey}))
    //     } else {
    //         dispatch(fetch_volumes({ 'baseURI': restapi, 'path':volumespath, 'auth':auth,'searchKey':searchKey}))
    //     }
    // }
    
    render() {
        const {dispatch,host,userManageState,volumes, pools, portals, agents,snapshots,logdev,luns} = this.props
        // console.log(host.selectedHost)
        // console.log(host.modify_host_modal)
        // console.log()
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />CDP主机</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='edit' className="cdp_button_right" onClick={this.handle_echo_modify_host}>修改主机</Button>

                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_host}>删除主机</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_host}>创建主机</Button>
                    </Row>
                    <Row >
                        <Host items={host.items} onChange={this.handleChange} selectedhost={host.selectedhost} selectedRowKeys={host.selectedRowKeys}
                            filtertype={this.props.filtertype}  user={userManageState.items}/>
                        
                    </Row>
                    <Row>
                        <CreateHost ref='createhost' items ={host.items}  visible={host.create_host} onOk={this.submit_create_host}
                            onCancel={this.handle_close_host}/>
                    </Row>
                    <Row>
                        <ModifyHost ref='createhost' modifyhost={host.selectedHost} user={userManageState.items} items ={host.items}  visible={host.modify_host_modal} onOk={this.submit_modify_host}
                            onCancel={this.handle_close_modify_host}/>
                    </Row>
                </Row>
            )
        
    }
}

HostContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        host:state.host,
        userManageState:state.userManageState,
    }
}
export default connect(mapStateToProps)(HostContainer)