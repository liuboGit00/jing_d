import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {fetch_osds,delete_osds,create_osds,update_osds,toggle_osds,
        echo_create_osds,close_create_osds,fetch_cephclient,fetch_cephcluster
    } from '../../actions/cephaction'
import {fetch_volumes} from '../../actions/actions'
import {fetch_host} from '../../actions/hostactions'
import Osds from '../../components/ceph/osds'
import CreateOsds from '../../components/ceph/create_osds'

import auth from '../../utils/auth'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';


const confirm = Modal.confirm;
class CephclientContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this),
        // this.getCheckboxProps = this.getCheckboxProps.bind(this),
        this.handle_delete_osds = this.handle_delete_osds.bind(this),
        this.handle_create_osds = this.handle_create_osds.bind(this),
        this.handle_close_osds = this.handle_close_osds.bind(this),
        this.handle_submit_create_osds = this.handle_submit_create_osds.bind(this),
        this.handle_update_osds = this.handle_update_osds.bind(this)

    }
    componentDidMount() {
        console.log(this.props)
        const {dispatch,osds,volumes,cephclients} = this.props
        if(osds.items<=0){
            dispatch(fetch_osds())
        }
        if(volumes.items<=0){
            dispatch(fetch_volumes())
        }
        if(cephclients.items<=0){
             dispatch(fetch_cephclient())
             dispatch(fetch_cephcluster())
        }

        
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys,selectedRows)
        // const {osds}=this.props
        // for(let i=0;i<osds.items.length;i++){
        //     for(let j=0;j<selectedRowKeys.length;j++){
        //         // console.log(selectedRowKeys[j],osds.items[i].ceph_id)
        //         if(selectedRowKeys[j]==osds.items[i].ceph_id){
        //              this.props.dispatch(toggle_osds([osds.items[i].id],[osds.items[i]]))
        //         }
        //     }
        // }
        this.props.dispatch(toggle_osds(selectedRowKeys,selectedRows))

    }
    // getCheckboxProps(record){
    //     console.log(record)
    //     disabled:record.name==='ceph'
    // }
     handle_delete_osds() {
        // console.log(this.props.cephclients.selectedRowKeys)
        const rowKeys = this.props.osds.selectedOsds;
        const {osds} = this.props;
        console.log(osds)
        console.log(rowKeys)
        

        if(!rowKeys || rowKeys.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要删除的记录！',
            });
        }else{
            if(!osds.items||osds.items.length>0){
                
                        confirm({
                            title: 'CDP系统提示！',
                            content: '您是否确认要删除选中的内容！',
                            onOk: function() {
                                for(let i=0;i<osds.items.length;i++){
                                    for(let j=0;j<rowKeys.length;j++){
                                        if(osds.items[i].ceph_id == rowKeys[j].id){
                                            console.log(osds.items[i].id)
                                            this.props.dispatch(delete_osds(osds.items[i].id));
                                        }
                                    }
                                }
                            }.bind(this),
                            onCancel() {},
                        });
                  
            }else{
                Modal.error({
                    title: 'CDP系统提示！',
                    content: '删除的数据不存在！',
                });
            }
            

           
        }
    }
    handle_create_osds(){
        const{dispatch}=this.props;

        dispatch(echo_create_osds())
    }

    handle_close_osds(){
        const{dispatch}=this.props;
        dispatch(close_create_osds())

    }
    handle_submit_create_osds(osds){
        const{dispatch}=this.props;
        dispatch(create_osds(osds))
    }
    handle_update_osds(){
        this.props.dispatch(update_osds())
    }


    render() {
        const {dispatch,cephclients,host,osds,volumes} = this.props;
        // console.log(osds)
        return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />集群客户端</label>
                    </Row>
                    <Row className="table_toolbar">
                    

                        <Button  icon='delete' className="cdp_button_right" onClick={this.handle_delete_osds}>删除</Button>
                        <Button  icon='reload' className="cdp_button_right" onClick={this.handle_update_osds}>更新</Button>
                        
                        <Button  icon='plus' className="cdp_button_right" onClick={this.handle_create_osds}>创建</Button>
                    
                    </Row>
                    <Row>
                        <Osds  ref="osds" dispatch={dispatch} refresh={osds.refresh} filtertype={this.props.filtertype}  cluster={cephclients.cephclusters} items={osds.items} /*getCheckboxProps={this.getCheckboxProps}*/  onChange={this.handleChange} selectedOsds={osds.selectedOsds} selectedRowKeys={osds.selectedRowKeys}/>
                            
                    </Row>
                    <Row>
                        <CreateOsds  ref='CreateOsds' visible={osds.osds_modal}  volumes={volumes.items}  cluster={cephclients.cephclusters}  onCancel={this.handle_close_osds} onOk={this.handle_submit_create_osds} dispatch={dispatch}/>
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
        host:state.host,
        osds:state.osds,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(CephclientContainer)

