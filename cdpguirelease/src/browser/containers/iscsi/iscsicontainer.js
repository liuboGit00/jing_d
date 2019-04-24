import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {login_target,logout_target,fetch_login_target,fetch_iscsi_target,fetch_iscsi,toggle_iscsi,create_iscsi,echo_create_iscsi,close_create_iscsi,delete_iscsi

        } from '../../actions/iscsiactions'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import Iscsi from '../../components/iscsi/iscsi'
import CreateIscsi from '../../components/iscsi/create_iscsi'

class IscsiContainer extends Component {
    constructor(props) {
        super(props)
        this.handle_delete_iscsi = this.handle_delete_iscsi.bind(this)
        this.handle_create_iscsi = this.handle_create_iscsi.bind(this)
        this.handle_echo_iscsi = this.handle_echo_iscsi.bind(this)
        this.handle_close_iscsi = this.handle_close_iscsi.bind(this)
        this.handle_toggle_iscsi = this.handle_toggle_iscsi.bind(this)
        this.handle_login_iscsitarget = this.handle_login_iscsitarget.bind(this)
        this.handle_logout_iscsitarget = this.handle_logout_iscsitarget.bind(this)

    }
    componentDidMount() {
        const {dispatch,iscsi} = this.props
        
        dispatch(fetch_iscsi_target())
        dispatch(fetch_login_target())
        if(iscsi.items.length<=0){
            dispatch(fetch_iscsi())
        }


    }
    handle_login_iscsitarget(login,id,name,text){
        console.log(login,id)
        const{dispatch}=this.props
        dispatch(login_target(login,id,name,text,auth))

    }
    handle_logout_iscsitarget(logout,id,name,text){
        console.log(logout,id)
        const{dispatch}=this.props
        dispatch(logout_target(logout,id,name,text,auth))

    }
    handle_create_iscsi(iscsi){
        const {dispatch} = this.props
        dispatch(create_iscsi(iscsi,auth))
        dispatch(close_create_iscsi())
    }
    handle_delete_iscsi(){
        const {dispatch} = this.props
        const {selectedIscsi} = this.props.iscsi
        const confirm = Modal.confirm;
        confirm({
            title: '您是否确认要删除已选择的这些iscsi存储',
            content: '删除后将无法恢复',
            onOk() {
                dispatch(delete_iscsi(selectedIscsi, auth))
            },
            onCancel() { },
        });
    }
    handle_close_iscsi(){
        const {dispatch} = this.props
        dispatch(close_create_iscsi())
    }
    handle_echo_iscsi(){
        const {dispatch} = this.props
        dispatch(echo_create_iscsi())
    }
    handle_toggle_iscsi(selectedRowKeys, selectedRows){
        const {dispatch} = this.props
        dispatch(toggle_iscsi(selectedRowKeys, selectedRows))
    }
    render() {
        const {dispatch,iscsi} = this.props
        if(!iscsi){
            return<div></div>
        }else{
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />ISCSI列表</label>
                    </Row>
                    <Row>
                        <Iscsi 
                            dispatch={dispatch}
                            onDelete={this.handle_delete_iscsi} onCreate={this.handle_echo_iscsi} login_iscsitarget={this.handle_login_iscsitarget} logout_iscsitarget={this.handle_logout_iscsitarget}
                            login={iscsi.login} target={iscsi.target} items={iscsi.items} onChange={this.handle_toggle_iscsi} selectedIscsi={iscsi.selectedIscsi} selectedRowKeys={iscsi.selectedRowKeys}
                        />
                    </Row>
                    <Row>
                        <CreateIscsi ref='createiscsi' visible={iscsi.create_iscsi} onOk={this.handle_create_iscsi} onCancel={this.handle_close_iscsi} dispatch={dispatch}
                        />
                    </Row>
                    
                </Row>
            )}
        
    }
}

IscsiContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        iscsi:state.iscsi
    }
}
export default connect(mapStateToProps)(IscsiContainer)