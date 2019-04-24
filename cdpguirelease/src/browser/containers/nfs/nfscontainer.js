import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {modify_nfs,fetch_nfs,echo_nfs,close_nfs,create_nfs,toggle_nfs,delete_nfs} from '../../actions/nfsactions'
import Nfs from '../../components/nfs/nfs'
import {fetch_volumes} from '../../actions/actions'

import CreateNfs from '../../components/nfs/create_nfs'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import SearchInput from '../../components/common/searchinput'
import {restapi,hostpath} from '../../confs/host'

class NfsContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handle_create_nfs = this.handle_create_nfs.bind(this);
        this.handle_close_nfs = this.handle_close_nfs.bind(this);
        this.handle_delete_nfs = this.handle_delete_nfs.bind(this);
        this.submit_create_nfs = this.submit_create_nfs.bind(this);
        this.handle_modify_nfs = this.handle_modify_nfs.bind(this);
        this.handle_echo_modify_nfs = this.handle_echo_modify_nfs.bind(this)
    }
    componentDidMount() {
        const {dispatch,volumes,nfs} = this.props
        if(nfs.items.length<=0){
            dispatch(fetch_nfs())
        }
        if(volumes.items.length<=0){
           dispatch(fetch_volumes())
        }
        
        
    }

    handle_create_nfs(){
        const {dispatch} = this.props;
        dispatch(echo_nfs('echo'))
    }
    handle_close_nfs(){
        const {dispatch} = this.props;
        dispatch(close_nfs())
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_nfs(selectedRowKeys,selectedRows))
    }
    handle_delete_nfs() {
        const {dispatch} = this.props
        const {selectedNfs} = this.props.nfs
        const confirm = Modal.confirm;
        if (selectedNfs.length > 0) {
            console.log(selectedNfs)

            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_nfs(selectedNfs, auth))
                },
                onCancel() { },
            });
        }
    }

    submit_create_nfs(fn){
        const {dispatch,nfs} = this.props
        

        for(let i=0;i<nfs.items.length;i++){
            if(fn.name == nfs.items[i].name){
                return message.error('名称已被使用')
            }
        }
        dispatch(create_nfs(fn,auth))

    }
    handle_modify_nfs(modify){
        const {dispatch} = this.props
        const {selectedNfs} = this.props.nfs
        if (selectedNfs.length == 1) {
            dispatch(modify_nfs(modify,selectedNfs[0].id,auth))
        }
    }
    handle_echo_modify_nfs(){
        const {dispatch} = this.props
        const {selectedNfs} = this.props.nfs
        const confirm = Modal.confirm;
        if(selectedNfs.length ==1){
            dispatch(echo_nfs())
        }else{
            confirm({
                title: '请选择一个需要修改的节点',
                onOk() {},
                onCancel() { },
            });
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
        const {dispatch,nfs,volumes} = this.props
        
        const echo = nfs.echo
        // console.log(echo)
        const {selectedNfs} = this.props.nfs
        if(selectedNfs){
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />NFS网络共享</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='edit' className="cdp_button_right" onClick={this.handle_echo_modify_nfs}>修改nfs共享</Button>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_nfs}>删除nfs共享</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_nfs}>创建nfs共享</Button>
                    </Row>
                    <Row >
                        <Nfs items={nfs.items} onChange={this.handleChange} selectedNfs={nfs.selectedNfs} selectedRowKeys={nfs.selectedRowKeys}
                            volumes={volumes.items}/>
                    </Row>
                    <Row>
                        <CreateNfs ref='createnfs' echo={echo} se={selectedNfs[0]} volumes={volumes.items} items ={nfs.items}  visible={nfs.create_nfs} onOk={echo !='echo'?this.handle_modify_nfs:this.submit_create_nfs}
                            dispatch={dispatch}/>
                    </Row>
                </Row>
            )
        
        }{
           return <div></div> 
        }
            
    }
}

NfsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        nfs:state.nfs,
        volumes:state.volumes,
       
    }
}
export default connect(mapStateToProps)(NfsContainer)
