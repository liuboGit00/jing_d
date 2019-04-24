import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {fetch_cephclient,create_cephclient,echo_create_cephclient,
        close_create_cephclient,toggle_cephclient,delete_cephclient,
        fetch_cephcluster,
    } from '../../actions/cephaction'
import {fetch_host} from '../../actions/hostactions'
import Cephclient from '../../components/ceph/cephclient'
import CreateCephclient from '../../components/ceph/create_cephclient'

import auth from '../../utils/auth'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';


const confirm = Modal.confirm;
class CephclientContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handle_delete_cephclient = this.handle_delete_cephclient.bind(this),
        this.handle_create_cephclient = this.handle_create_cephclient.bind(this),
        this.handle_close_cephclient = this.handle_close_cephclient.bind(this),
        this.handle_submit_create_cephclient = this.handle_submit_create_cephclient.bind(this)

    }
    componentDidMount() {
        const {dispatch,host,cephclients} = this.props
        if(cephclients.items.length==0){
              dispatch(fetch_cephclient())
              dispatch(fetch_cephcluster())
        }
        if(host.items.length==0){
            dispatch(fetch_host())
        }
    }
    handleChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys,selectedRows)
        this.props.dispatch(toggle_cephclient(selectedRowKeys,selectedRows))
    }
     handle_delete_cephclient() {
        // console.log(this.props.cephclients.selectedRowKeys)
        const rowKeys = this.props.cephclients.selectedCephclient;
        console.log(rowKeys)
        if(!rowKeys || rowKeys.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要删除的记录！',
            });
        }else{
            confirm({
                title: 'CDP系统提示！',
                content: '您是否确认要删除选中的内容！',
                onOk: function() {
                    for(let i=0;i<rowKeys.length;i++){
                        this.props.dispatch(delete_cephclient(rowKeys[i].id));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    handle_create_cephclient(){
        const{dispatch}=this.props;

        dispatch(echo_create_cephclient())
    }
    // handle_modify_ceph_pool(){
    //     const{dispatch,cephpools}=this.props;
    //     const warning = Modal.warning;

    //     if (cephpools.selectedCephpool.length == 1) {//修改必须是单选
    //         dispatch(echo_create_ceph_pool())
    //     }else {
    //         warning({
    //             title: '请选择一个存储池',
    //             content: '请选择一个存储池进行修改',
    //         })
    //     }
        
    // }
    handle_close_cephclient(){
        const{dispatch}=this.props;
        dispatch(close_create_cephclient())

    }
    handle_submit_create_cephclient(cephclient){
        const{dispatch,cephclients}=this.props;
        dispatch(create_cephclient(cephclient))
    }


     render() {
        const {dispatch,cephclients,host} = this.props;
        // console.log(cephclients,host)
        return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />集群客户端</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button  icon='delete' className="cdp_button_right" onClick={this.handle_delete_cephclient}>删除</Button>
                        <Button  icon='plus' className="cdp_button_right" onClick={this.handle_create_cephclient}>创建</Button>
                    </Row>
                    <Row>
                        <Cephclient  ref="cephclients" filtertype={this.props.filtertype} host={host.items} cephclusters={cephclients.cephclusters} visible={cephclients.cephpool_modal} items={cephclients.items}  onChange={this.handleChange} selectedCephclient={cephclients.selectedCephclient} selectedRowKeys={cephclients.selectedRowKeys}/>
                            
                    </Row>
                    <Row>
                        <CreateCephclient  ref='CreateCephclient'  cephclients={cephclients} host={host.items}  visible={cephclients.cephclient_modal} onCancel={this.handle_close_cephclient} onOk={this.handle_submit_create_cephclient}/>
                    </Row>

                    

                </Row>
        )
        
    }
}

CephclientContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        cephclients:state.cephclients,
        host:state.host
    }
}
export default connect(mapStateToProps)(CephclientContainer)
