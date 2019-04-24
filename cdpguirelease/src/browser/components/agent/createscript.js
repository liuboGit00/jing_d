import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select } from 'antd';
const {TextArea}=Input
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
// console.log(TextArea)
class CreateScript extends Component{
    handleSubmit() {
    	const{updatecontent,updateSwitch}=this.props
    	if(updateSwitch==true&&updatecontent!=''){
    		this.props.onOk({
    			'id':updatecontent[0].id,
        		'name':this.props.form.getFieldsValue().name,
				'agents':this.props.form.getFieldsValue().agents,
				'scriptcontent':this.props.form.getFieldsValue().scriptcontent,
				'shelltype':this.props.form.getFieldsValue().shelltype,
				'when':this.props.form.getFieldsValue().when,
				'runas':this.props.form.getFieldsValue().runas,
				'passwd':this.props.form.getFieldsValue().passwd,
				'args':this.props.form.getFieldsValue().args,
        	})

    	}else{
    		this.props.onOk({
        		'name':this.props.form.getFieldsValue().name,
				'agents':this.props.form.getFieldsValue().agents,
				'scriptcontent':this.props.form.getFieldsValue().scriptcontent,
				'shelltype':this.props.form.getFieldsValue().shelltype,
				'when':this.props.form.getFieldsValue().when,
				'runas':this.props.form.getFieldsValue().runas,
				'passwd':this.props.form.getFieldsValue().passwd,
				'args':this.props.form.getFieldsValue().args,
        	})
    	}
        
    }
    checkScriptnameExist(rule, value, callback) {
        var parent=/^[A-Za-z0-9]+$/;

        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文'));
        }
        const {scripts} = this.props
        
        for (var i = 0; i < scripts.length; i++) {
            // console.log(scripts[i].name)
            // console.log(value)
            if (scripts[i].name == value) {
                callback(new Error('抱歉，该名称已被占用'))
            } else { callback() }
        }
    }
    render() {
        const{agents,updatecontent,updateSwitch} = this.props
        // console.log(updateSwitch)
        // console.log(updatecontent)

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const { getFieldProps} = this.props.form;
        const when = ['beforesnap','aftersnap','primary_bf','primary_af','secondary_bf','secondary_af','premote_ha','demote_ha','up_af','up_bf','down_af','down_bf','manual']
        const agents_arr=[];
        const when_arr=[];
        for(let i=0;i<when.length;i++){
        	when_arr.push(<Option key={when[i]}>{when[i]}</Option>)
        }
        if(agents!=''){
            const id = window.location.href.split('?')[0].split('/').pop()
        	for(let i=0;i<agents.length;i++){
                if(id == agents[i].id){
                    agents_arr.push(<Option key={agents[i].url}>{agents[i].name}</Option>)
                }
        	}
        }
        if(updatecontent!=''&&updateSwitch==true){
        	return (
        	    <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    closable={false}

                    title="修改客户端脚本" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="名字"  {...formItemLayout}>
                            <Input {...getFieldProps('name', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkScriptnameExist.bind(this) }],
                                initialValue:updatecontent[0].name
                            }) } type="text"  id='name'/>
                        </FormItem>
                        <FormItem label="客户端:"  {...formItemLayout}> 
                            <Select  {...getFieldProps('agents', {initialValue:updatecontent[0].agent}) } >
                                {agents_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="脚本内容:"  {...formItemLayout}>
                             <Input  {...getFieldProps('scriptcontent',{initialValue:updatecontent[0].scriptcontent}) } />
                         </FormItem>
                         <FormItem label="脚本类型:"  {...formItemLayout}>
                             <Select  {...getFieldProps('shelltype', {initialValue:updatecontent[0].shelltype}) } >
                                 <Option value="/bin/sh"  >/bin/sh</Option>
                                 <Option value="powershell"  >powershell</Option>
                                 <Option value="python"  >python</Option>
                             </Select>
                         </FormItem>
                         <FormItem label="脚本运行类型:"  {...formItemLayout}> 
                            <Select  {...getFieldProps('when', {initialValue:updatecontent[0].when}) } >
                                {when_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="脚本运行身份:"  {...formItemLayout}>
                             <Input  {...getFieldProps('runas',{initialValue:updatecontent[0].runas}) } />
                         </FormItem>
                         <FormItem label="脚本运行密码:"  {...formItemLayout}>
                             <Input  {...getFieldProps('passwd',{initialValue:updatecontent[0].passwd}) } />
                         </FormItem>
                         <FormItem label="脚本运行参数:"  {...formItemLayout}>
                             <Input  {...getFieldProps('args',{initialValue:updatecontent[0].args}) } />
                         </FormItem>
                    </Form>
                </Modal>
        	    </div>
        	);

        }else{
        	return (
        	    <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    closable={false}

                    title="创建客户端脚本" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="名字"  {...formItemLayout}>
                            <Input {...getFieldProps('name', {
                                rules: [{
                                    max: 50,
                                    message: '客户端名称最多为50个字符'
                                }, { validator: this.checkScriptnameExist.bind(this) }],
                                initialValue:''
                            }) } type="text"  id='name'/>
                        </FormItem>
                        <FormItem label="客户端:"  {...formItemLayout}> 
                            <Select  {...getFieldProps('agents', {initialValue:''}) } >
                                {agents_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="脚本内容:"  {...formItemLayout}>
                             <Input type='textarea' autosize={{maxRows:6}} {...getFieldProps('scriptcontent',{initialValue:''}) } />
                         </FormItem>
                         <FormItem label="脚本类型:"  {...formItemLayout}>
                             <Select  {...getFieldProps('shelltype', {initialValue:''}) } >
                                 <Option value="/bin/sh"  >/bin/sh</Option>
                                 <Option value="powershell"  >powershell</Option>
                                 <Option value="python"  >python</Option>
                                 <Option value="cmd"  >windows cmd</Option>

                             </Select>
                         </FormItem>
                         <FormItem label="脚本运行类型:"  {...formItemLayout}> 
                            <Select  {...getFieldProps('when', {initialValue:''}) } >
                                {when_arr}
                            </Select>
                         </FormItem>
                         <FormItem label="脚本运行身份:"  {...formItemLayout}>
                             <Input  {...getFieldProps('runas',{initialValue:''}) } />
                         </FormItem>
                         <FormItem label="脚本运行密码:"  {...formItemLayout}>
                             <Input  {...getFieldProps('passwd',{initialValue:''}) } />
                         </FormItem>
                         <FormItem label="脚本运行参数:"  {...formItemLayout}>
                             <Input  {...getFieldProps('args',{initialValue:''}) } />
                         </FormItem>
                    </Form>
                </Modal>
        	    </div>
        	);
        }
        
    }
}



export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            agents: {name: 'agents'},
            scriptcontent: {name: 'scriptcontent'},
            shelltype: {name: 'shelltype'},
            when: {name: 'when'},
            runas: {name: 'runas'},
            passwd: {name: 'passwd'},
            args: {name: 'args'},

        }
    }
})(CreateScript);
