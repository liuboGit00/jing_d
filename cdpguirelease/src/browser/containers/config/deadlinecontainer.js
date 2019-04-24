import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Deadline from '../../components/config/deadline'
import RegisterDeadline from '../../components/config/register_deadline'
import {fetch_deadline,toggle_deadline,echo_register_deadline,close_register_deadline,register_deadline,
} from '../../actions/configaction'
import {Modal, Form, Button, Input,Select,Row,Icon} from 'antd'


class Deadlinecontainer  extends Component{
	constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handle_submit_deadline = this.handle_submit_deadline.bind(this)
        this.handle_echo_register_deadline = this.handle_echo_register_deadline.bind(this)
        this.handle_close_register_deadline = this.handle_close_register_deadline.bind(this)
    }
    componentDidMount() {
        const {dispatch,deadline} = this.props
        if(deadline.items.length<=0){
            dispatch(fetch_deadline())
        }
    }
    handleChange(selectedRowKeys,selectedRows){
    	const {dispatch} = this.props
    	dispatch(toggle_deadline(selectedRowKeys,selectedRows))
    }
    handle_echo_register_deadline(){
    	this.props.dispatch(echo_register_deadline())
    }
    handle_close_register_deadline(){
    	this.props.dispatch(close_register_deadline())
    }
    handle_submit_deadline(code){
    	const{dispatch}=this.props
    	dispatch(register_deadline(code))
    }
    render() {
        const {dispatch,deadline}=this.props
        return (
        	 <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="edit" />CDP注册</label>
                    </Row>
                    <Row className="table_toolbar">
             			<Button type='ghost'  className="cdp_button_left" onClick={this.handle_echo_register_deadline}>注册</Button>
                    
                    </Row>
                    <Row>
            			<Deadline ref='deadline' dispatch={dispatch} items={deadline.items} onChange={this.handleChange} selectedRowKeys={deadline.selectedRowKeys} selectedDeadline={deadline.selectedDeadline} /> 
                    </Row>
                    <Row>
            			<RegisterDeadline ref='registerdeadline' visible={deadline.deadline_modal} dispatch={dispatch} onOk={this.handle_submit_deadline} onCancel={this.handle_close_register_deadline}  />
                    </Row>

                    

                </Row>
        );
    }
}
function mapStateToProps(state){
    return {
        deadline: state.deadline
    }
}

export default connect(mapStateToProps)(Deadlinecontainer);
