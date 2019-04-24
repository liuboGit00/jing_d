import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {modify_filersync,fetch_filersync,echo_filersync,close_filersync,create_filersync,toggle_filersync,delete_filersync} from '../../actions/filersyncaction'
import Filersync from '../../components/filersync/filersync'
import {fetch_volumes} from '../../actions/actions'

import CreateFilersync from '../../components/filersync/create_filersync'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import SearchInput from '../../components/common/searchinput'
import {restapi,hostpath} from '../../confs/host'

class FilersyncContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handle_create_filersync = this.handle_create_filersync.bind(this);
        this.handle_close_filersync = this.handle_close_filersync.bind(this);
        this.handle_delete_filersync = this.handle_delete_filersync.bind(this);
        this.submit_create_filersync = this.submit_create_filersync.bind(this);
        this.handle_modify_filersync = this.handle_modify_filersync.bind(this);
        this.handle_echo_modify_filersync = this.handle_echo_modify_filersync.bind(this)
    }
    componentDidMount() {
        const {dispatch,filersync,volumes} = this.props
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        if(filersync.items.length<=0){
           dispatch(fetch_filersync())
        }
        
        
    }

    handle_create_filersync(){
        const {dispatch} = this.props;
        dispatch(echo_filersync('echo'))
    }
    handle_close_filersync(){
        const {dispatch} = this.props;
        dispatch(close_filersync())
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_filersync(selectedRowKeys,selectedRows))
    }
    handle_delete_filersync() {
        const {dispatch} = this.props
        const {selectedFilersync} = this.props.filersync
        const confirm = Modal.confirm;
        if (selectedFilersync.length > 0) {
            console.log(selectedFilersync)

            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_filersync(selectedFilersync, auth))
                },
                onCancel() { },
            });
        }
    }

    submit_create_filersync(fn){
        const {dispatch,filersync} = this.props
        

        for(let i=0;i<filersync.items.length;i++){
            if(fn.name == filersync.items[i].name){
                return message.error('名称已被使用')
            }
        }
        dispatch(create_filersync(fn,auth))

    }
    handle_modify_filersync(modify){
        const {dispatch} = this.props
        const {selectedFilersync} = this.props.filersync
        if (selectedFilersync.length == 1) {
            dispatch(modify_filersync(modify,selectedFilersync[0].id,auth))
        }
    }
    handle_echo_modify_filersync(){
        const {dispatch} = this.props
        const {selectedFilersync} = this.props.filersync
        const confirm = Modal.confirm;
        if(selectedFilersync.length ==1){
            dispatch(echo_filersync())
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
        const {dispatch,filersync,volumes} = this.props
        
        const echo = filersync.echo
        // console.log(echo)
        const {selectedFilersync} = this.props.filersync
        if(selectedFilersync){
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />同步节点</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='edit' className="cdp_button_right" onClick={this.handle_echo_modify_filersync}>修改同步节点</Button>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_filersync}>删除同步节点</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_filersync}>增加同步节点</Button>
                    </Row>
                    <Row >
                        <Filersync items={filersync.items} onChange={this.handleChange} selectedFilersync={filersync.selectedFilersync} selectedRowKeys={filersync.selectedRowKeys} volumes={volumes.items}
                            />
                    </Row>
                    <Row>
                        <CreateFilersync ref='createfilersync' echo={echo} se={selectedFilersync[0]} volumes={volumes.items} items ={filersync.items}  visible={filersync.create_filersync} onOk={echo !='echo'?this.handle_modify_filersync:this.submit_create_filersync}
                            dispatch={dispatch}/>
                    </Row>
                </Row>
            )
        
        }{
           return <div></div> 
        }
            
    }
}

FilersyncContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        filersync:state.filersync,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(FilersyncContainer)
