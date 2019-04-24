import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {toggle_hostgroup,fetch_hostgroup,echo_hostgroup,close_hostgroup,create_hostgroup,
        apply_hostgroup,delete_hostgroup,fetch_hostgroup_property,set_hostgroup_property,
        set_hostgroup_property_id,} from '../../actions/hostgroupaction'
import {fetch_host} from '../../actions/hostactions'
import Hostgroup from '../../components/hosts/hostgroup'
import CreateHostgroup from '../../components/hosts/create_hostgroup'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'

class HostgroupContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange=this.handleChange.bind(this)
        this.handle_apply_hostgroup=this.handle_apply_hostgroup.bind(this)
        this.handle_delete_hostgroup=this.handle_delete_hostgroup.bind(this)
        this.handle_echo_hostgroup=this.handle_echo_hostgroup.bind(this)
        this.handle_close_hostgroup=this.handle_close_hostgroup.bind(this)
        this.handle_cerate_hostgroup = this.handle_cerate_hostgroup.bind(this)
        this.handle_set_hostgroup = this.handle_set_hostgroup.bind(this)

    }
    componentWillMount() {
        const {dispatch,host,hostgroup} = this.props
        console.log(hostgroup.items)
        if(host.items.length<=0){
            dispatch(fetch_host())
        }if(hostgroup.items.length<=0){
            dispatch(fetch_hostgroup())
        }
        
    }
    handleChange(selectedRowKeys, selectedRows){
        this.props.dispatch(toggle_hostgroup(selectedRowKeys, selectedRows))
    }
    handle_apply_hostgroup(){
        const {dispatch} =this.props
        const {selectedHostgroup} = this.props.hostgroup
        const confirm = Modal.confirm;
        console.log(selectedHostgroup)
        if (selectedHostgroup.length > 0) {
            dispatch(apply_hostgroup(selectedHostgroup))
        }else{
            confirm({
                title: '主机集群',
                content: '请选择想要生效的主机集群。',
                onOk(){},
                onCancel(){},
            })
        }

    }
    handle_delete_hostgroup(){
        const {dispatch} =this.props
        const {selectedHostgroup} = this.props.hostgroup
        const confirm = Modal.confirm;
        console.log(selectedHostgroup)
        if (selectedHostgroup.length > 0) {
            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_hostgroup(selectedHostgroup))
                },
                onCancel() { },
            });
        }else{
            confirm({
                title: '主机集群',
                content: '请选择想要删除的任务。',
                onOk(){},
                onCancel(){},
            })
        }
    }
    handle_echo_hostgroup(){
        const {dispatch,host} =this.props
        const confirm = Modal.confirm;
        if(host.items.length>0){
            dispatch(echo_hostgroup())
        }else{
            confirm({
                title: 'CDP系统提示',
                content: '未获取到主机',
                onOk(){},
                onCancel(){},
            })
        }
    }
    handle_cerate_hostgroup(hostgroup){
        console.log(hostgroup)
        const {dispatch} =this.props
        const confirm = Modal.confirm
        var parent=/^[a-zA-Z][A-Za-z0-9-_]+$/
        console
        if(parent.test(hostgroup.name)){
                if(hostgroup.name&&hostgroup.url){
                dispatch(create_hostgroup(hostgroup))
            }else if(hostgroup.name){
                confirm({
                    title: '主机集群',
                    content: '请填写主机地址',
                    onOk(){},
                    onCancel(){},
                }) 
            }else{
                confirm({
                    title: '主机集群',
                    content: '请填写任务名称',
                    onOk(){},
                    onCancel(){},
                })
            }
        }else{
            confirm({
                title: '主机集群',
                content: '首字母为大写或小写英文字母,不可包含空格和中文及特殊字符',
                onOk(){},
                onCancel(){},
            })
        }
    }
    handle_close_hostgroup(){
        const {dispatch} =this.props
        dispatch(close_hostgroup())
    }
    handle_set_hostgroup(id){
        console.log(id)
        const {dispatch} = this.props
        dispatch(set_hostgroup_property_id(id))
    }
    render() {
        const {dispatch,host,hostgroup} = this.props
        // console.log(hostgroup)
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />CDP主机集群</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button loading={hostgroup.loading} type='ghost'  className="cdp_button_right" onClick={this.handle_apply_hostgroup}>开启主机集群</Button>
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_hostgroup}>删除主机集群</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_echo_hostgroup}>创建主机集群</Button>
                    </Row>
                    <Row>
                        <Hostgroup items={hostgroup.items} onChange={this.handleChange} selectedHostgroup={hostgroup.selectedHostgroup} selectedRowKeys={hostgroup.selectedRowKeys} hosts={host.items} setProperty={this.handle_set_hostgroup} />
                        
                    </Row>
                    <Row >
                        {host.items.length>0?<CreateHostgroup visible={hostgroup.hostgroup_modal} onCancel={this.handle_close_hostgroup}  onOk={this.handle_cerate_hostgroup} hosts={host.items} items={hostgroup.items} />:<div></div>}
                        
                    </Row>
                </Row>
            )
        
    }
}

HostgroupContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        host:state.host,
        hostgroup:state.hostgroup,
    }
}
export default connect(mapStateToProps)(HostgroupContainer)