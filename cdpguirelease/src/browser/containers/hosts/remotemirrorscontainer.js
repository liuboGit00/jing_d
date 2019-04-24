import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {echo_tokenandurl,close_tokenandurl,fetch_tokenandurl,fetch_remotemirrors_task,
    fetch_remotemirrors,echo_remotemirrors,close_remotemirrors,create_remotemirrors,
    toggle_remotemirrors,delete_remotemirrors,echo_update_remotemirror,update_remotemirror,
    close_update_remotemirror,
} from '../../actions/remotemirrorsactions'
import {fetch_host} from '../../actions/hostactions'
import {fetch_volumes} from '../../actions/actions'
import {fetch_users} from '../../actions/useractions' 



import Remotemirrors from '../../components/hosts/remotemirrors'

import CreateRemotemirrors from '../../components/hosts/create_remotemirrors'
import CreateTokenandurl from '../../components/hosts/create_tokenandurl'

import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import {restapi,hostpath} from '../../confs/host'

class RemotemirrorsContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handle_create_remotemirrors = this.handle_create_remotemirrors.bind(this);
        this.handle_close_remotemirrors = this.handle_close_remotemirrors.bind(this);
        this.handle_delete_remotemirrors = this.handle_delete_remotemirrors.bind(this);
        this.submit_create_remotemirrors = this.submit_create_remotemirrors.bind(this);
        this.handle_echo_tokenandurl = this.handle_echo_tokenandurl.bind(this)
        this.handle_close_tokenandurl = this.handle_close_tokenandurl.bind(this)
        this.handle_create_tokenandurl = this.handle_create_tokenandurl.bind(this)
        this.point = this.point.bind(this)
        this.handle_update_remotemirror = this.handle_update_remotemirror.bind(this)
        this.handle_close_update_remotemirror = this.handle_close_update_remotemirror.bind(this)

    }
    componentDidMount() {
        const {dispatch,remotemirrors,host,userManageState,volumes} = this.props
        if(remotemirrors.items.length<=0){
            dispatch(fetch_remotemirrors())
        }
        if(host.items.length<=0){
            dispatch(fetch_host())
        }
        if(userManageState.items.length<=0){
            dispatch(fetch_users())
        }
        if(volumes.items.length<=0){
             dispatch(fetch_volumes())
        }
        
    }

    handle_create_remotemirrors(){
        const {dispatch} = this.props;
        dispatch(echo_remotemirrors())

    }
    handle_close_remotemirrors(){
        const {dispatch} = this.props;
        dispatch(close_remotemirrors())
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_remotemirrors(selectedRowKeys,selectedRows))
    }
    handle_delete_remotemirrors() {
        const {dispatch} = this.props
        const {selectedRemotemirrors} = this.props.remotemirrors
        const confirm = Modal.confirm;
        // console.log(selectedRemotemirrors)
        if (selectedRemotemirrors.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_remotemirrors(selectedRemotemirrors, auth))
                },
                onCancel() { },
            });
        }
    }

    submit_create_remotemirrors(re){
        const {dispatch,remotemirrors} = this.props
        if(re.operation=='createremotemirror'){
            dispatch(create_remotemirrors(re,auth))
        }else{
            dispatch(update_remotemirror(re,auth))
        }
    }
    handle_echo_tokenandurl(){
        const {dispatch,remotemirrors} = this.props;
        dispatch(echo_tokenandurl())

    }
    handle_close_tokenandurl(){
        const {dispatch} = this.props;
        dispatch(close_tokenandurl())
        

    }
    handle_create_tokenandurl(tokenandurl,auth){
        const {dispatch} = this.props;
        dispatch(fetch_tokenandurl(tokenandurl,auth))
        dispatch(close_tokenandurl())
        dispatch(echo_remotemirrors())
    }
    point(){
        const {dispatch} = this.props;
        dispatch(close_tokenandurl())
        dispatch(echo_remotemirrors())
    }
    // handleSearch(searchKey){
    //     const{dispatch} = this.props
    //     if (this.props.url == undefined) {
    //         dispatch(fetch_volumes({ 'baseURI': restapi, 'path':volumespath, 'auth':auth ,'searchKey':searchKey}))
    //     } else {
    //         dispatch(fetch_volumes({ 'baseURI': restapi, 'path':volumespath, 'auth':auth,'searchKey':searchKey}))
    //     }
    // }
    handle_update_remotemirror(){
        const {dispatch,remotemirrors} =this.props
        const {selectedRemotemirrors} = this.props.remotemirrors
        const confirm = Modal.confirm;
        // console.log(selectedRemotemirrors)
        if (selectedRemotemirrors.length==1) {
            dispatch(echo_update_remotemirror())
        }else{
            confirm({
                title: 'CDP复制',
                content: '请选择一条数据进行更新',
                onOk(){},
                onCancel(){},
            }); 
        }
        
    }
    handle_close_update_remotemirror(){
        this.props.dispatch(close_update_remotemirror())
    }
    render() {
        const {dispatch,remotemirrors,host,volumes,userManageState} = this.props;
        // console.log(userManageState)
        // && remotemirrors.task.length == remotemirrors.items.length 
        if(remotemirrors.task != undefined ){
            for(let i=0;i<remotemirrors.items.length;i++){
                 for(let j=0;j<remotemirrors.task.length;j++){
                        // console.log(remotemirrors.items[i].task ,remotemirrors.task[j].url)

                    if(remotemirrors.items[i].task == remotemirrors.task[j].url){
                        // console.log(remotemirrors.task[j].task)
                        remotemirrors.items[i].ur = remotemirrors.task[j].task;
                        remotemirrors.items[i].status = remotemirrors.task[j].status;
                        // console.log(remotemirrors.items[i].ur)
                    }
                }
            }
            
        }
        if(remotemirrors.localvolume!=undefined&&remotemirrors.localvolume.length==0){
            remotemirrors.localvolume.unshift(volumes.items)
        }
        // console.log(host.items)
        return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />CDP复制</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button  icon='edit' className="cdp_button_right" onClick={this.handle_update_remotemirror}>修改远程CDP连接</Button>
                        <Button  icon='delete' className="cdp_button_right" onClick={this.handle_delete_remotemirrors}>取消远程CDP连接</Button>
                        <Button  icon='plus' className="cdp_button_right" onClick={this.handle_echo_tokenandurl}>创建远程CDP连接</Button>

                    </Row>
                    <Row >
                        <Remotemirrors items={remotemirrors.items} host={host.items}  onChange={this.handleChange} selectedRemotemirrors={remotemirrors.selectedRemotemirrors} selectedRowKeys={remotemirrors.selectedRowKeys}
                            filtertype={this.props.filtertype}  volumes = {remotemirrors.localvolume}/>
                    </Row>
                    <Row>
                        {remotemirrors.create_remotemirrors==true?<CreateRemotemirrors ref='createremotemirrors' user={userManageState.items} hostName={remotemirrors.remotemirrorsHostName} remotemirrors={remotemirrors} hosts={host.items} volumes={volumes.items} visible={remotemirrors.create_remotemirrors} onOk={this.submit_create_remotemirrors}
                         onCancel={this.handle_close_remotemirrors} closeUpdate={this.handle_close_update_remotemirror} />:<div></div>}
                    </Row>
                    <Row>
                        <CreateTokenandurl ref='createretokenandurl' hosts={host} dispatch={dispatch}  visible={remotemirrors.create_tokenandurl} onOk={this.handle_create_tokenandurl}
                         onCancel={this.handle_close_tokenandurl} point ={this.point}/>
                    </Row>

                </Row>
        )
        
    }
}

RemotemirrorsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        remotemirrors:state.remotemirrors,
        host:state.host,
        volumes:state.volumes,
        userManageState:state.userManageState,
    }
}
export default connect(mapStateToProps)(RemotemirrorsContainer)