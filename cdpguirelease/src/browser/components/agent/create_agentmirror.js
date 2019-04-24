import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option

class CreateAgentmirror extends Component{
	handleSubmit(){
    console.log(this.props.form.getFieldsValue().agentname)
        
		this.props.onOk({
					'vgname':this.props.form.getFieldsValue().vgname,
					'agentname':this.props.form.getFieldsValue().agentname,
					'sourcedisk':this.props.form.getFieldsValue().sourcedisk,
					'destdisk':this.props.form.getFieldsValue().destdisk,
					'size':this.props.form.getFieldsValue().size,
        	})
	}
	checkScriptnameExist(rule, value, callback) {
        var parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文'));
        }
        const {items} = this.props
        for (var i = 0; i < items.length; i++) {
            // console.log(items[i].name)
            // console.log(value)
            if (items[i].name == value) {
                callback(new Error('抱歉，该名称已被占用'))
            } else { callback() }
        }
    }
	render(){
		const{items,agents,volumes,dispatch}=this.props
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const { getFieldProps} = this.props.form;
        const agents_arr=[];
        const volume_arr=[];
        if(agents!=undefined){
        	for(let i=0;i<agents.length;i++){
        		agents_arr.push(<Option key={agents[i].name}>{agents[i].name}</Option>)
        	}
       		if(this.props.form.getFieldsValue().agentname!=undefined){
       			for (let i=0;i<agents.length; i++) {
       				if(agents[i].name==this.props.form.getFieldsValue().agentname&&agents[i].saved_grains!=undefined){
       					for(let j in agents[i].saved_grains.partitions){
       						volume_arr.push(<Option key={j}>{j+':'+agents[i].saved_grains.partitions[j]+'M'}</Option>)
       					}
					}
       			};
       		}

       	}



		return (
        	    <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    closable={false}

                    title="创建小机镜像" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="卷组名"  {...formItemLayout}>
                            <Input {...getFieldProps('vgname', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkScriptnameExist.bind(this) }]
                            }) } type="text"  id='name'/>
                        </FormItem>
                        <FormItem label="客户端:"  {...formItemLayout}> 
                            <Select  {...getFieldProps('agentname', {}) } >
                                {agents_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="源卷:"  {...formItemLayout}>
                             <Select  {...getFieldProps('sourcedisk', {}) } >
                                {volume_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="目标卷:"  {...formItemLayout}>
                             <Select  {...getFieldProps('destdisk', {}) } >
                                {volume_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="目标卷的大小:"  {...formItemLayout}>
                             <Input  {...getFieldProps('size',{initialValue:8}) } />
                         </FormItem>
                         
                    </Form>
                </Modal>
        	    </div>
        	);
	}
}
export default createForm({
	mapPropsToFields(props){
		return{
			vgname:{name:'vgname'},
			agentname:{name:'agentname'},
			sourcedisk:{name:'sourcedisk'},
			destdisk:{name:'destdisk'},
			size:{name:'size'},
		}
	}
})(CreateAgentmirror)