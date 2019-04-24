import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {toggle_script,fetch_script,create_script,delete_script,update_script,
	echo_create_script,close_create_script,echo_update_script}from '../../actions/scriptaction'
import Scripts from '../../components/agent/script'
import CreateScript from '../../components/agent/createscript'
import {fetch_agents} from '../../actions/actions'
import auth from '../../utils/auth'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
const confirm = Modal.confirm;
class Scriptcontainer extends Component{
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this),
        this.handle_delete_script = this.handle_delete_script.bind(this)
        this.handle_create_script = this.handle_create_script.bind(this)
        this.handle_close_script = this.handle_close_script.bind(this)
        this.handle_submit_create_script = this.handle_submit_create_script.bind(this)
        this.handle_update_script = this.handle_update_script.bind(this)
        this.handle_echo_update_script = this.handle_echo_update_script.bind(this)

    }
    componentDidMount() {
        console.log(this.props)
        const {dispatch,scripts,agents} = this.props
        if(scripts.items.length<=0){
            dispatch(fetch_script())
        }
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }

        
    }
    handleChange(selectedRowKeys, selectedRows) {
    	console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_script(selectedRows,selectedRowKeys))

    }
     handle_delete_script() {
        // console.log(this.props.cephclients.selectedRowKeys)
        const rowKeys = this.props.scripts.selectedScript;
        const {scripts} = this.props;
        console.log(scripts)
        console.log(rowKeys)
        

        if(!rowKeys || rowKeys.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要删除的数据！',
            });
        }else{
            if(!scripts.items||scripts.items.length>0){
                        confirm({
                            title: 'CDP系统提示！',
                            content: '您是否确认要删除选中的内容！',
                            onOk: function() {
                                for(let i=0;i<scripts.items.length;i++){
                                    for(let j=0;j<rowKeys.length;j++){
                                        if(scripts.items[i].id == rowKeys[j].id){
                                            this.props.dispatch(delete_script(scripts.items[i].id));
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
    handle_create_script(){
        const{dispatch}=this.props;

        dispatch(echo_create_script())
    }

    handle_close_script(){
        const{dispatch}=this.props;
        dispatch(close_create_script())

    }
    handle_submit_create_script(script){
        const{dispatch,scripts}=this.props;
        // console.log(script)
        // console.log(scripts.update_switch)
        if(scripts.update_switch==true){
        	dispatch(update_script(script))
        }else{
        	dispatch(create_script(script))
        }
    }
    handle_echo_update_script(){
    	const{dispatch}=this.props;
    	const row = this.props.scripts.selectedScript;
        console.log(row)
        if(!row || row.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要更新的数据！',
            });
        }else if(row.length === 1){
            dispatch(echo_update_script(row))
            dispatch(echo_create_script())
        }else{
        	Modal.error({
                title: 'CDP系统提示！',
                content: '请选择一条数据进行修改！',
            });
        }
    	
    	
    }
    handle_update_script(){
		// const row = this.props.scripts.selectedScript;
  //       console.log(row)
  //       if(!row || row.length == 0){
  //           Modal.error({
  //               title: 'CDP系统提示！',
  //               content: '请选择要更新的数据！',
  //           });
  //       }else if(row.length === 1){
  //           this.props.dispatch(update_script(row[0]))
  //       }else{
  //       	Modal.error({
  //               title: 'CDP系统提示！',
  //               content: '请选择一条数据进行修改！',
  //           });
  //       }
    }


    render() {
        const {dispatch,scripts,agents} = this.props;
        // console.log(scripts)
        return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />客户端脚本</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button  icon='delete' className="cdp_button_right" onClick={this.handle_delete_script}>删除</Button>
                        <Button  icon='edit' className="cdp_button_right" onClick={this.handle_echo_update_script}>修改</Button>
                        <Button  icon='plus' className="cdp_button_right" onClick={this.handle_create_script}>创建</Button>
                    </Row>
                    <Row>
						<Scripts onChange={this.handleChange} items={scripts.items} selectedRowKeys={scripts.selectedRowKeys} agents={agents.items} />
					</Row>
                    <Row>
						<CreateScript ref='CreateScript' scripts={scripts.items}  visible={scripts.script_modal} updatecontent={scripts.updatecontent} updateSwitch={scripts.update_switch} agents={agents.items} items={scripts.items} selectedScript={scripts.selectedScript} onOk={this.handle_submit_create_script} onCancel={this.handle_close_script}/>
					</Row>
                </Row>
        )
        
    }
}

Scriptcontainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state){
	return{
		agents:state.agents,
		scripts:state.scripts,

	}
}
export default connect(mapStateToProps)(Scriptcontainer)




