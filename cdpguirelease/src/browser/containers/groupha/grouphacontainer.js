import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_agents} from '../../actions/actions'
import {fetch_agentha,fetch_groupha,echo_agentha_modal,close_agentha_modal,create_agentha,
        echo_groupha_modal,close_groupha_modal,create_groupha,toggle_groupha,toggle_agentha,
        delete_agentha,delete_groupha,get_groupha_status,start_groupha,stop_groupha,
        set_start_group_ha,set_stop_group_ha,modify_ha,echo_modify_groupha_modal,
        close_modify_groupha_modal,echo_set_promoted,close_set_promoted,set_promoted} from '../../actions/grouphaaction'
        
import {fetch_script} from '../../actions/scriptaction'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import Groupha from '../../components/groupha/groupha'
import CreateHa from '../../components/groupha/create_ha'
import Setpromoted from '../../components/groupha/set_promoted'
import auth from '../../utils/auth'
const confirm = Modal.confirm;

class HaContainer extends Component{
    constructor(props){
        super(props);
        // this.handleChange = this.handleChange.bind(this)
        this.handle_submit_ha = this.handle_submit_ha.bind(this)
        this.handle_close_submit_ha = this.handle_close_submit_ha.bind(this)
        this.handle_echo_ha = this.handle_echo_ha.bind(this)
        this.handle_all_start_groupha = this.handle_all_start_groupha.bind(this)
        this.handle_all_stop_groupha = this.handle_all_stop_groupha.bind(this)
        this.handle_create_agentha = this.handle_create_agentha.bind(this)
        this.handlestartgroupha =this.handlestartgroupha.bind(this)
        this.handlestopgroupha = this.handlestopgroupha.bind(this)
        this.handle_modify_ha = this.handle_modify_ha.bind(this)
        this.handle_delete_ha = this.handle_delete_ha.bind(this)
        this.handle_set_promoted = this.handle_set_promoted.bind(this)
        this.handle_echo_set_promoted = this.handle_echo_set_promoted.bind(this)
        this.handle_close_set_promoted = this.handle_close_set_promoted.bind(this)
    }
    componentWillMount() {
        const {dispatch,ha,agents,scripts} = this.props
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
        if(scripts.items.length<=0){
            dispatch(fetch_script())
        }
        if(ha.agentha.length<=0){
            dispatch(fetch_agentha())
        }
        if (ha.groupha.length<=0) {
            dispatch(fetch_groupha())
        };
        
    }
    
    // handleChange(selectedRowKeys, selectedRows){
    //  dispatch(toggle_agentha())
    // }
    handle_echo_ha(){
        const{dispatch}=this.props
        dispatch(echo_groupha_modal())
    }
    handle_submit_ha(ha){
        console.log(ha)
        const {dispatch} = this.props
        if(ha.validate=='group'){
            dispatch(create_groupha(ha))
        }else if(ha.validate == 'modify'){
            dispatch(modify_ha(ha))
        }else{
            dispatch(create_agentha(ha))
        }
    }
    handle_close_submit_ha(ha){
        // console.log(ha)
        const {dispatch} = this.props
        if(ha=='group'){
            dispatch(close_groupha_modal())
        }else if(ha=='modify'){
            dispatch(close_modify_groupha_modal())
        }else{
            dispatch(close_agentha_modal())
        }
    }
    handle_delete_ha(ha,ex){
        const {dispatch} = this.props;
        const confirm = Modal.confirm;
        if (ex=='group') {
            confirm({
                title: '您是否确认要删除已选择的数据 ',
                content: '删除后将无法恢复 ',
                onOk() {
                   dispatch(delete_groupha(ha))
                },
                onCancel() { },
            });
        }else{
            confirm({
                title: '您是否确认要删除已选择的数据 ',
                content: '删除后将无法恢复 ',
                onOk() {
                   dispatch(delete_agentha(ha))
                },
                onCancel() { },
            });
        };
    }
    handle_all_stop_groupha(){
        const {dispatch} = this.props
        dispatch(stop_groupha())
    }
    handle_all_start_groupha(){
        const {dispatch} = this.props
        dispatch(start_groupha())
    }
    handle_create_agentha(father){
        console.log(father)
        const {dispatch} =this.props
        dispatch(echo_agentha_modal(father))
    }
    handlestartgroupha(id){
        const {dispatch} =this.props
        dispatch(set_start_group_ha(id))

    }
    handlestopgroupha(id){
        const {dispatch} =this.props
        dispatch(set_stop_group_ha(id))

    }
    handle_modify_ha(ha){
        const {dispatch}=this.props
        // console.log(ha)
        dispatch(echo_modify_groupha_modal(ha,true))
        // dispatch(modify_ha())
    }
    handle_echo_set_promoted(value){
        const {dispatch} =this.props
        dispatch(echo_set_promoted(value))
    }
    handle_close_set_promoted(){
        const {dispatch} =this.props
        dispatch(close_set_promoted())
    }
    handle_set_promoted(value){
        const{dispatch} = this.props
        if(value&&value==''){
            Modal.warning({
                title:'CDP系统提示！',
                content:'请选择要升级的客户端id。',
                onOk(){},
                onCancel(){},
            })
        }else{

            dispatch(set_promoted(value))
        }
    }
    render() {
        const {dispatch,ha,agents,scripts}=this.props
        console.log(ha,)

        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />HA信息 </label>
                </Row>
                <Row  className="table_toolbar">
                    
                    
                    <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_echo_ha}>新建 </Button>
                    
                </Row>
                <Row>
                {ha.groupha?<Groupha  dispatch={dispatch} onChange={this.handleChange} groupha={ha.groupha}  agents={agents.items} scripts={scripts.items} agentha={ha.agentha} 
                    onOk={this.handle_submit_ha} onCancel={this.close_submit_ha}  onDelete={this.handle_delete_ha} onCreateagentha={this.handle_create_agentha}
                    startGroupHa={this.handlestartgroupha} stopGroupHa={this.handlestopgroupha}  onModify={this.handle_modify_ha}  onPromoted={this.handle_echo_set_promoted} />:<Spin/>}   
                </Row>
                <Row>
                    <CreateHa agenthavisible ={ha.create_agentha_modal}  grouphavisible={ha.create_groupha_modal} scripts={scripts.items}
                        agents={agents.items} groupha={ha.groupha} agentha={ha.agentha} onCancel={this.handle_close_submit_ha}
                        onOk={this.handle_submit_ha} modifyHa={ha} echoagentha={ha.echoagentha} />
                
                </Row>
                <Row>
                    {ha.promoted_modal==true?<Setpromoted  dispatch={dispatch} agents={agents.items} onOk={this.handle_set_promoted}
                    agentha={ha.agentha} groupha={ha.promoted}   visible={ha.promoted_modal} onCancel={this.handle_close_set_promoted} />:<div></div>}
                </Row>
            </Row>
        );
    }
}
HaContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        agents:state.agents,
        ha:state.ha,    
        scripts:state.scripts}
}

export default connect(mapStateToProps)(HaContainer);
/*{ha.grouphastatus==false?<Button type='ghost' className="cdp_button_right" icon='play-circle-o' onClick={this.handle_all_start_groupha} >全部停止部署 </Button>
                    :<Button type='ghost' className="cdp_button_right" icon='pause-circle-o' onClick={this.handle_all_stop_groupha}>全部开始部署</Button>}*/