import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_samba,echo_samba,close_samba,create_samba,toggle_samba,delete_samba,
        } from '../../actions/sambaactions'
import Samba from '../../components/samba/samba'

import {fetch_volumes} from '../../actions/actions'
import CreateSamba from '../../components/samba/create_samba'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import SearchInput from '../../components/common/searchinput'
import {restapi,hostpath} from '../../confs/host'

class SambaContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handle_create_samba = this.handle_create_samba.bind(this);
        this.handle_close_samba = this.handle_close_samba.bind(this);
        this.handle_delete_samba = this.handle_delete_samba.bind(this);
        this.submit_create_samba = this.submit_create_samba.bind(this);
    }
    componentDidMount() {
        const {dispatch,samba,volumes} = this.props
        if(samba.items.length<=0){
            dispatch(fetch_samba())
        }
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }

    }

    handle_create_samba(){
        const {dispatch} = this.props;
        dispatch(echo_samba())
    }
    handle_close_samba(){
        const {dispatch} = this.props;
        dispatch(close_samba())
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_samba(selectedRowKeys,selectedRows))
    }
    handle_delete_samba() {
        const {dispatch} = this.props
        const {selectedSamba} = this.props.samba
        const confirm = Modal.confirm;
        if (selectedSamba.length > 0) {
            console.log(selectedSamba)

            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_samba(selectedSamba, auth))
                },
                onCancel() { },
            });
        }
    }

    submit_create_samba(sa){
        const {dispatch,samba} = this.props
        

        for(let i=0;i<samba.items.length;i++){
            if(sa.name == samba.items[i].name){
                return message.error('名称已被使用')
            }
        }
        dispatch(create_samba(sa,auth))

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
        const {dispatch,samba,volumes} = this.props
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />网络共享</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_samba}>删除网络共享</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_samba}>增加网络共享</Button>
                    </Row>
                    <Row >
                        <Samba  volumes={volumes.items} items={samba.items} onChange={this.handleChange} selectedSamba={samba.selectedSamba} selectedRowKeys={samba.selectedRowKeys}
                            />
                    </Row>
                    <Row>
                        <CreateSamba ref='createfilerclones' samba={samba.items} volumes={volumes.items}  visible={samba.create_samba} onOk={this.submit_create_samba}
                            dispatch={dispatch} onCancel={this.handle_close_samba}/>
                    </Row>
                     
                   
                </Row>
            ) 
    }
}

SambaContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        samba:state.samba,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(SambaContainer)
