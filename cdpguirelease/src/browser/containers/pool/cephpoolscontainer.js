import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {fetch_ceph_pools,del_ceph_pool,echo_create_ceph_pool,close_create_ceph_pool,
        toggle_ceph_pool,modify_cephpool} from '../../actions/poolactions'
import Cephpool from '../../components/storage/cephpool'
import ModifyCephpool from '../../components/storage/modify_cephpool'

import auth from '../../utils/auth'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';


const confirm = Modal.confirm;
class CephpoolsContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handle_delete_ceph_pool = this.handle_delete_ceph_pool.bind(this)
        this.handle_modify_ceph_pool = this.handle_modify_ceph_pool.bind(this)
        // this.handle_create_ceph_pool = this.handle_create_ceph_pool.bind(this)
        this.handle_close_ceph_pool = this.handle_close_ceph_pool.bind(this)
        this.handle_submit_modify_ceph_pool = this.handle_submit_modify_ceph_pool.bind(this)


    }
    componentDidMount() {
        const {dispatch,cephpools} = this.props
        if(cephpools.items.length<=0){
            dispatch(fetch_ceph_pools())
        }
        
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys,selectedRows)
        this.props.dispatch(toggle_ceph_pool(selectedRowKeys,selectedRows))
    }
     handle_delete_ceph_pool() {
        const rowKeys = this.props.cephpools.selectedCephpool;
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
                        this.props.dispatch(del_ceph_pool(rowKeys[i].id));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    // handle_create_ceph_pool(){
    //     const{dispatch}=this.props;
    //     dispatch(echo_create_ceph_pool())
    // }
    handle_modify_ceph_pool(){
        const{dispatch,cephpools}=this.props;
        const warning = Modal.warning;

        if (cephpools.selectedCephpool.length == 1) {//修改必须是单选
            dispatch(echo_create_ceph_pool())
        }else {
            warning({
                title: '请选择一个存储池',
                content: '请选择一个存储池进行修改',
            })
        }
        
    }
    handle_close_ceph_pool(){
        const{dispatch}=this.props;
        dispatch(close_create_ceph_pool())

    }
    handle_submit_modify_ceph_pool(cephpool){
        const{dispatch}=this.props;
        dispatch(modify_cephpool(cephpool))
    }


     render() {
        const {dispatch,cephpools} = this.props;
        return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />集群存储池</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button  icon='delete' className="cdp_button_right" onClick={this.handle_delete_ceph_pool}>删除</Button>
                        <Button  icon='edit' className="cdp_button_right" onClick={this.handle_modify_ceph_pool}>修改</Button>
                    </Row>
                    <Row>
                        <Cephpool filtertype={this.props.filtertype} visible={cephpools.cephpool_modal} ref="cephpool" items={cephpools.items}  onChange={this.handleChange} selectedCephpool={cephpools.selectedCephpool} selectedRowKeys={cephpools.selectedRowKeys}/>
                    </Row>
                    <Row>
                        <ModifyCephpool  ref='ModifyCephpool' items={cephpools.selectedCephpool}  visible={cephpools.cephpool_modal} onCancel={this.handle_close_ceph_pool} onOk={this.handle_submit_modify_ceph_pool}/>
                    </Row>
                </Row>
        )
        
    }
}

CephpoolsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        cephpools:state.cephpools
    }
}
export default connect(mapStateToProps)(CephpoolsContainer)
/*<Row >
                        <Remotemirrors items={remotemirrors.items} host={host.items}  onChange={this.handleChange} selectedRemotemirrors={remotemirrors.selectedRemotemirrors} selectedRowKeys={remotemirrors.selectedRowKeys}
                            filtertype={this.props.filtertype}  volumes = {remotemirrors.localvolume}/>
                    </Row>
                    <Row>
                        <CreateRemotemirrors ref='createremotemirrors' user={userManageState.items} hostName={remotemirrors.remotemirrorsHostName} remotemirrors={remotemirrors} hosts={host.items} volumes={volumes.items} visible={remotemirrors.create_remotemirrors} onOk={this.submit_create_remotemirrors}
                         onCancel={this.handle_close_remotemirrors}/>
                    </Row>
                    <Row>
                        <CreateTokenandurl ref='createretokenandurl' hosts={host} dispatch={dispatch}  visible={remotemirrors.create_tokenandurl} onOk={this.handle_create_tokenandurl}
                         onCancel={this.handle_close_tokenandurl} point ={this.point}/>
                    </Row>



                        <Button  icon='plus' className="cdp_button_right" onClick={this.handle_create_ceph_pool}>创建存储池</Button>

                    */