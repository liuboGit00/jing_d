import React, {Component, PropTypes} from 'react';
import {Input,Select,Table,Icon,Form,Modal,message} from 'antd';
const Option = Select.Option
const createForm = Form.create;
const FormItem = Form.Item;


class Setpromoted extends Component{
	handleSubmit(){
		// console.log(typeof parseInt(this.props.form.getFieldsValue().promoted.split('/').pop()))
		const {groupha} = this.props
		const ha = groupha.groupHA_set
		const demoted =[]
		for(let i=0;i<ha.length;i++){
			const id = Number(ha[i].split('').pop())
			if(id!=this.props.form.getFieldsValue().promoted.split('/').pop()){
				demoted.push(id)
			}
		}
		this.props.onOk({
			promoted:[Number(this.props.form.getFieldsValue().promoted.split('/').pop())],
			demoted:demoted,
			id:groupha.id
		})
		
	}
	render(){
		const {agents,dispatch,visible,agentha,groupha,} = this.props
		const { getFieldProps} = this.props.form;
		const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        // console.log(agentha,groupha)
        const ha = []
		const agentArr=[]
		for (var i = 0; i < agentha.length; i++) {
			for (var j = 0; j < groupha.groupHA_set.length; j++) {
				if(agentha[i].url==groupha.groupHA_set[j]){
					ha.push(agentha[i].agent+'%'+agentha[i].url)
				}
			};
		};
		for (var i = 0; i < ha.length; i++) {
			for (var j = 0; j < agents.length; j++) {
				if(ha[i].split('%')[0]==agents[j].url){
					agentArr.push(<Option key={ha[i].split('%')[1]}>{agents[j].name}</Option>)
				}
			};
		};
		// console.log(agentArr)

		return(
			<div>
                <Modal ref="modal"
                    visible={visible}
                    title="增加组HA" 
                    onOk={this.handleSubmit.bind(this)} 
                    onCancel={this.props.onCancel.bind(this)}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="升级的HA"  {...formItemLayout}>
                            <Select  {...getFieldProps('promoted', {}) } >
                            	{agentArr}
                            </Select>
                        </FormItem>
                        
                    </Form>
                </Modal>
            </div>
		)
	}
}
export default createForm({
    mapPropsToFields (props) {
        return {
            promoted: {name: 'promoted'},
        }
    }
})(Setpromoted);