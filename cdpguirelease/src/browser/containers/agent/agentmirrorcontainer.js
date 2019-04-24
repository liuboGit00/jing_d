import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Agentmirror from '../../components/agent/agentmirror'
import CreateAgentmirror from '../../components/agent/create_agentmirror'
import {Row, Col, Menu,Icon, Button, Input, Modal, Spin,Table,Alert,message} from 'antd'
import {fetch_agents} from '../../actions/actions'
import{toggle_agentmirror,echo_create_agentmirror,close_create_agentmirror,
		fetch_agentmirror,create_agentmirror,refresh_modal,echo_remove_agentmirror,
        remove_agentmirror,close_remove_agentmirror,agentmirror_mirror,
        echo_agentmirror_extend,close_agentmirror_extend,hp_agentmirror,unagentmirror_hp,
        delete_agentmirror_hp,echo_hp_agentmirror,close_hp_agentmirror,
    } from '../../actions/agentmirroraction'
import RemoveAgentmirror from '../../components/agent/remove_agentmirror'
import AgentmirrorExtend from '../../components/agent/agentmirror_extend'
import HpAgentmirror from '../../components/agent/hpagentmirror'





class AgentmirrorContainer extends Component{
	constructor(props) {
        super(props)
        this.handlechange = this.handlechange.bind(this)
        this.handle_create_agentmirror = this.handle_create_agentmirror.bind(this)
        this.handle_close_create_agentmirror = this.handle_close_create_agentmirror.bind(this)
        this.handle_echo_create_agentmirror = this.handle_echo_create_agentmirror.bind(this)
        this.handle_echo_refresh = this.handle_echo_refresh.bind(this)
        this.handle_echo_remove_agentmirror = this.handle_echo_remove_agentmirror.bind(this)
        this.handle_close_remove_agentmirror = this.handle_close_remove_agentmirror.bind(this)
        this.handle_submit_remove_agentmirror = this.handle_submit_remove_agentmirror.bind(this)
        this.handle_echo_agentmirror_mirror= this.handle_echo_agentmirror_mirror.bind(this)
        this.handle_echo_agentmirror_extend= this.handle_echo_agentmirror_extend.bind(this)
        this.handle_close_agentmirror_extend = this.handle_close_agentmirror_extend.bind(this)
        this.handle_echo_hp_agentmirror = this.handle_echo_hp_agentmirror.bind(this)
        this.handle_close_hp_agentmirror = this.handle_close_hp_agentmirror.bind(this)
        this.handle_submit_hp_agentmirror = this.handle_submit_hp_agentmirror.bind(this)
    }
     handlechange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_agentmirror(selectedRows,selectedRowKeys))

    }
    componentDidMount() {
        const {dispatch,agentmirror,volumes,agents} = this.props
        if(agentmirror.items.length<=0){
        	dispatch(fetch_agentmirror())
        }
        if(agents.items.length<=0){
        	dispatch(fetch_agents())
        }

       
    }
    handle_create_agentmirror(agentmirror){
    	const{dispatch}=this.props
    	dispatch(create_agentmirror(agentmirror))
    }
    handle_echo_create_agentmirror(){
    	const{dispatch}=this.props
    	dispatch(echo_create_agentmirror())
    }
    handle_close_create_agentmirror(){
    	const{dispatch}=this.props
    	dispatch(close_create_agentmirror())
    }
    handle_echo_refresh(id,agentname,vgname){
    	const {dispatch} = this.props
        const confirm = Modal.confirm;
        confirm({
            title: '小机镜像',
            content: '您是否确认要刷新',
            onOk() {
                dispatch(refresh_modal(id,agentname,vgname))
            },
            onCancel() { },
        });
        
    }
    handle_echo_remove_agentmirror(id){

    	const{dispatch,agentmirror}=this.props
    	for(let i=0;i<agentmirror.items.length;i++){
    		if(id == agentmirror.items[i].id){
    			dispatch(echo_remove_agentmirror(agentmirror.items[i]))
    		}
    	}
    }
    handle_submit_remove_agentmirror(re){
        const{dispatch}=this.props
        if(re.os=='HPUX'){
            dispatch(delete_agentmirror_hp(re))
        }else{
            dispatch(remove_agentmirror(re))
        }
    }
    handle_close_remove_agentmirror(){
        const{dispatch}=this.props
        dispatch(close_remove_agentmirror())
    }
    handle_echo_agentmirror_mirror(id){
        const{dispatch}=this.props
        const confirm = Modal.confirm;
        confirm({
            title: '小机镜像',
            content: '您是否确认要做镜像',
            onOk() {
                dispatch(agentmirror_mirror(id,agentname,vgname))
            },
            onCancel(){},
        });
    }
    handle_echo_agentmirror_extend(id){
        const{dispatch,agentmirror}=this.props 
        for(let i=0;i<agentmirror.items.length;i++){
            if(id == agentmirror.items[i].id){
                // console.log(agentmirror.items[i])
                dispatch(echo_agentmirror_extend(agentmirror.items[i]))
            }
        }
    }
    handle_close_agentmirror_extend(){
        const{dispatch}=this.props
        dispatch(close_agentmirror_extend())
    }
    handle_echo_hp_agentmirror(id,va){

        const{dispatch,agentmirror}=this.props
        // console.log(id)
        // console.log(agentmirror)
        for(let i=0;i<agentmirror.items.length;i++){
            if(id == agentmirror.items[i].id){
                // console.log(agentmirror.items[i])
                dispatch(echo_hp_agentmirror(agentmirror.items[i],va))
            }
        }
    }
    handle_close_hp_agentmirror(){
        const{dispatch}=this.props
        dispatch(close_hp_agentmirror())
    }
    handle_submit_hp_agentmirror(hp){
        const{dispatch,agentmirror}=this.props
        // console.log(hp)
        if(agentmirror.hptask=='hpunmirror'){
            dispatch(unagentmirror_hp(hp))
        }else{
            dispatch(hp_agentmirror(hp))
        }
    }
    render(){
    	const{agents,agentmirror,dispatch}=this.props
        // console.log(agentmirror.hp)
    	return(
    		<Row>
    			<Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />小机镜像</label>
                 </Row>
    			<Row className="table_toolbar">
                    <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_echo_create_agentmirror}>新建</Button>
    			</Row>

    			<Agentmirror onHpmirror={this.handle_echo_hp_agentmirror}  onExtend={this.handle_echo_agentmirror_extend} onMirror={this.handle_echo_agentmirror_mirror}  onRemove={this.handle_echo_remove_agentmirror} onRefresh={this.handle_echo_refresh}  items={agentmirror.items} onChange={this.handlechange}  selectedRowKeys={agentmirror.selectedRowKeys}/>
    			<CreateAgentmirror  visible={agentmirror.agentmirror_modal} items={agentmirror.items} agents={agents.items}  onOk={this.handle_create_agentmirror} onCancel={this.handle_close_create_agentmirror} />
    			{(agentmirror.removeagentmirror!=undefined&&agentmirror.removeagentmirror!='')?<RemoveAgentmirror  removeagentmirror={agentmirror.removeagentmirror} visible={agentmirror.removeagentmirror_modal} onOk={this.handle_submit_remove_agentmirror} onCancel={this.handle_close_remove_agentmirror} />:<div></div>}
                {(agentmirror.extend!=undefined&&agentmirror.extend!='')?<AgentmirrorExtend visible={agentmirror.agentmirror_extend_modal} agents={agents.items} onOk={this.handle_submit_agentmirror_extend} onCancel={this.handle_close_agentmirror_extend} removeagentmirror={agentmirror.extend} />:<div></div>}
                {(agentmirror.hp!=undefined&&agentmirror.hp!='')?<HpAgentmirror  visible={agentmirror.hp_modal} hp={agentmirror.hp} onOk={this.handle_submit_hp_agentmirror} onCancel={this.handle_close_hp_agentmirror} />:<div></div>}
            </Row>

    	)
    }
}
function mapStateToProps(state) {
    return {
        agentmirror: state.agentmirror,
        agents:state.agents,
    }
}
export default connect(mapStateToProps)(AgentmirrorContainer)