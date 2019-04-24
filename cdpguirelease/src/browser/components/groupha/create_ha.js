import React, {Component, PropTypes} from 'react';
import {Input,Select,Table,Icon,Form,Modal,message} from 'antd';
const Option = Select.Option
const createForm = Form.create;
const FormItem = Form.Item;
class CreateHa extends Component{
	handleSubmit() {
		const {agenthavisible,grouphavisible,modifyHa,echoagentha} = this.props
        // console.log(echoagentha)
		const  groupObj={
					"组名":this.props.form.getFieldsValue().name,
					"IP": this.props.form.getFieldsValue().ip,
		}
		const agentObj={
			"客户端":this.props.form.getFieldsValue().agent,
			"总状态":this.props.form.getFieldsValue().agentstatus,
			"客户端状态":this.props.form.getFieldsValue().saltstatus,
			"授权":this.props.form.getFieldsValue().rgt+'',
			"脚本路径":this.props.form.getFieldsValue().shpath,
			"主从模式":this.props.form.getFieldsValue().drbdrole,
			"网卡名":this.props.form.getFieldsValue().nic,
			"连接模式":this.props.form.getFieldsValue().connectmode,
			"IP地址":this.props.form.getFieldsValue().agentip,
			"登陆名":this.props.form.getFieldsValue().username,
			"密码":this.props.form.getFieldsValue().password,
			"HA组":echoagentha.url,
            "提升状态":this.props.form.getFieldsValue().promotedstatus ,
            "提升脚本":this.props.form.getFieldsValue().promotescript ,
            "降低脚本":this.props.form.getFieldsValue().demotescript ,

		}
        const agentObj1={
            "客户端":this.props.form.getFieldsValue().agent,
            "总状态":this.props.form.getFieldsValue().agentstatus,
            "客户端状态":this.props.form.getFieldsValue().saltstatus,
            "授权":this.props.form.getFieldsValue().rgt+'',
            "网卡名":this.props.form.getFieldsValue().nic,
            "连接模式":this.props.form.getFieldsValue().connectmode,
            "HA组":echoagentha.url,
            "提升状态":this.props.form.getFieldsValue().promotedstatus ,
            "提升脚本":this.props.form.getFieldsValue().promotescript ,
            "降低脚本":this.props.form.getFieldsValue().demotescript ,
            "主从模式":this.props.form.getFieldsValue().drbdrole,
            
        }
		if(grouphavisible){
			for(let k in groupObj){
                // console.log(groupObj[k])
                // console.log((groupObj[k]+'').indexOf(' '))
				if(!groupObj[k]){
					return(message.error('请填写:'+k))
				}else if((groupObj[k]+'').indexOf(' ')!=-1){
					return(message.error(k+':不可包含空格'))
				}
			}
            this.props.onOk({
                'name':this.props.form.getFieldsValue().name,
                'ip': this.props.form.getFieldsValue().ip,
                'promote': this.props.form.getFieldsValue().promote=='true'?true:false,
                'validate':'group'
            })
			
		}else if(modifyHa.echoStatus){
            this.props.onOk({
                'name':this.props.form.getFieldsValue().name,
                'ip': this.props.form.getFieldsValue().ip,
                'promote': this.props.form.getFieldsValue().promote=='true'?true:false,
                'validate':'modify',
                'id':modifyHa.echoHa.id,
            })
        }
        else{
            if(this.props.form.getFieldsValue().connectmode=='salt'){
                

            }else{
                
            }
			
            this.props.onOk({
                'agent' : this.props.form.getFieldsValue().agent,
                'agentstatus' : this.props.form.getFieldsValue().agentstatus,
                'saltstatus' : this.props.form.getFieldsValue().saltstatus,
                'rgt' : this.props.form.getFieldsValue().rgt,
                'nic' : this.props.form.getFieldsValue().nic,
                'connectmode' : this.props.form.getFieldsValue().connectmode,
                'agentip' : this.props.form.getFieldsValue().agentip,
                'username' : this.props.form.getFieldsValue().username,
                'password' : this.props.form.getFieldsValue().password,
                'promotedstatus':this.props.form.getFieldsValue().promotedstatus,
                'promotescript':this.props.form.getFieldsValue().promotescript,
                'demotescript':this.props.form.getFieldsValue().demotescript,
                'drbdrole':this.props.form.getFieldsValue().drbdrole,
                'group' : echoagentha.url,
            })
			
		}
        
    }
    checkName(rule, value, callback) {
        const parent=/^[A-Za-z0-9]+$/;
        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文'));
        }
        const {groupha} = this.props;
        if(groupha != undefined){
            for(let i=0;i<groupha.length;i++){
                if(value === groupha[i].group){
                	message.error('组名已被使用');
                }
            }
        }
    }
    checkRights(rules,value,callback){
    	if (100>parseInt(value)||parseInt(value)>10000) {
    		callback(new Error('权限小于10000大于100'));
    	}else{
    		callback()
    	}

    }
     render() {
        const { getFieldProps} = this.props.form;
        const {agenthavisible,grouphavisible,agents,groupha,agentha,modifyHa,scripts} = this.props;
        const agentArr = []
        const agentHaArr =[]
        const scriptArr=[]
        // console.log(modifyHa.echoHa,modifyHa.echoStatus)
       	if(agents!=undefined){
       		for(let i=0;i<agents.length;i++){
       			agentArr.push(<Option key={agents[i].url}>{agents[i].name}</Option>)
       		}
       		for(let i=0;i<agents.length;i++){
       			if(agentha.length==0){
       				agentHaArr.push(<Option key={agents[i].url}>{agents[i].name}</Option>)
       			}else{
       				for(let j=0;j<agentha.length;j++){
       					if(agents[i].url!=agentha[j].agent){
       						agentHaArr.push(<Option key={agents[i].url}>{agents[i].name}</Option>)
       					}
       				}
       			}
       			
       			
       		}
           }
        if (scripts != undefined){
            for(let i=0;i<scripts.length;i++){
                scriptArr.push(<Option key={scripts[i].url}>{scripts[i].name}</Option>)
            }
        }
       	// const haArr=[]
       	// if(groupha!=undefined){
       	// 	for(let i =0;i<groupha.length;i++){
       	// 		haArr.push(<Option key={groupha[i].url}>{groupha[i].group}</Option>)
       	// 	}
       	// }
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        // console.log(grouphavisible,agenthavisible,modifyHa.echoStatus)

        if(grouphavisible){
            return (
                <div>
                    <Modal ref="modal"
                        visible={grouphavisible}
                        title="增加组HA" 
                        onOk={this.handleSubmit.bind(this)} 
                        onCancel={this.props.onCancel.bind(this,'group')}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="组名"  {...formItemLayout}>
                                <Input  {...getFieldProps('name',{rules:[{ validator: this.checkName.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="IP"  {...formItemLayout}>
                                <Input placeholder='x.x.x.x/x' {...getFieldProps('ip',{}) } />
                            </FormItem>
                            
                            <FormItem label="是否提升"  {...formItemLayout}>
                                <Select  {...getFieldProps('promote', {initialValue:'false'}) } >
                                    <Option key='true'>true</Option> 
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem>
                            
                        </Form>

                    </Modal>
                </div>
            );
        
        }else if(agenthavisible){
        	return (
                <div>
                    <Modal ref="modal"
                        visible={agenthavisible}
                        title="增加节点" 
                        onOk={this.handleSubmit.bind(this) } 
                        onCancel={this.props.onCancel.bind(this,'agent')}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="客户端"  {...formItemLayout}>
                                <Select {...getFieldProps('agent', {}) } >
                                    {agentHaArr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="优先级"  {...formItemLayout}>
                                <Input placeholder='请输入整数' {...getFieldProps('rgt',{initialValue:50}) } />
                            </FormItem>
                            <FormItem label="网卡名"  {...formItemLayout}>
                               <Input placeholder='eg:eth0' {...getFieldProps('nic',{}) } />
                            </FormItem>
                            <FormItem label="连接模式"  {...formItemLayout}>
                                <Select {...getFieldProps('connectmode', {}) } >
                                 	<Option	key='salt'>salt</Option>  
                                 	<Option key='ssh'>ssh</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="提升状态"  {...formItemLayout}>
                                <Select {...getFieldProps('promotedstatus', {initialValue:'demoted'}) } >
                                    <Option key='promoted'>promoted</Option>  
                                    <Option key='demoted'>demoted</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="提升脚本"  {...formItemLayout}>
                                <Select {...getFieldProps('promotescript', {}) } >
                                    {scriptArr}
                                </Select>
                            </FormItem>
                            <FormItem label="降级脚本"  {...formItemLayout}>
                                <Select {...getFieldProps('demotescript', {}) } >
                                    {scriptArr}
                                </Select>
                            </FormItem>
                            <FormItem label="IP地址"  {...formItemLayout}>
                               <Input placeholder='x.x.x.x'  disabled={ this.props.form.getFieldsValue().connectmode=='salt'?true:false} {...getFieldProps('agentip',{}) } />
                            </FormItem>
                            <FormItem label="登陆名"   {...formItemLayout}>
                               <Input placeholder='root' disabled={ this.props.form.getFieldsValue().connectmode=='salt'?true:false} {...getFieldProps('username',{}) } />
                            </FormItem>
                            <FormItem label="密码"  {...formItemLayout}>
                               <Input placeholder='******' disabled={ this.props.form.getFieldsValue().connectmode=='salt'?true:false} {...getFieldProps('password',{}) } />
                            </FormItem>
                            


                        </Form>

                    </Modal>
                </div>
            );
        }else if(modifyHa.echoStatus){
            return(
                <div>
                    <Modal ref="modal"
                        visible={modifyHa.echoStatus}
                        title="修改组HA" 
                        onOk={this.handleSubmit.bind(this)} 
                        onCancel={this.props.onCancel.bind(this,'modify')}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="组名"  {...formItemLayout}>
                                <Input {...getFieldProps('name',{rules:[{ validator: this.checkName.bind(this) }],initialValue:modifyHa.echoHa.group}) } type="text"  />
                            </FormItem>
                            <FormItem label="IP"  {...formItemLayout}>
                                <Input placeholder='x.x.x.x/x' {...getFieldProps('ip',{initialValue:modifyHa.echoHa.webip}) } />
                            </FormItem>
                            
                            <FormItem label="是否提升"  {...formItemLayout}>
                                <Select  {...getFieldProps('promote', {initialValue:modifyHa.echoHa.auto_promote_flag+''}) } >
                                    <Option key='true'>true</Option> 
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem>
                            
                            
                            
                        </Form>

                    </Modal>
                </div>
            )
        }else{
        	return<div></div>
        }


    }

}
export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            runagent:{name:'runagent'},
			ip:{name:'ip'},
			rights:{name:'rights'},
			pools:{name:'pools'},
			switched:{name:'switched'},
			mssed:{name:'mssed'},
			agent:{name:'agent'},
			agentstatus:{name:'agentstatus'},
			saltstatus:{name:'saltstatus'},
			rgt:{name:'rgt'},
			nic:{name:'nic'},
			connectmode:{name:'connectmode'},
			agentip:{name:'agentip'},
			username:{name:'username'},
			password:{name:'password'},
			group:{name:'group'},
            onoff:{name:'onoff'},
            promotedstatus:{name:'promotedstatus'},
            promotescript:{name:'promotescript'},
            demotescript:{name:'demotescript'},
            drbdrole:{name:'drbdrole'}

        }
    }
})(CreateHa);

/*
 <FormItem label="脚本路径"  {...formItemLayout}>
                               <Input  {...getFieldProps('shpath',{}) } />
                            </FormItem>
                            <FormItem label="主备模式"  {...formItemLayout}>
                                <Select {...getFieldProps('drbdrole', {}) } >
                                    <Option key='primary'>primary</Option>  
                                    <Option key='secondary'>secondary</Option>
                                </Select>
                            </FormItem>
<FormItem label="授权"  {...formItemLayout}>
                                <Input placeholder='请输入整数' {...getFieldProps('rights',{rules:[{validator:this.checkRights.bind(this)}]}) } />
                            </FormItem>
                            <FormItem label="进程池"  {...formItemLayout}>
                                <Input {...getFieldProps('pools',{initialValue:2}) } />
                            </FormItem>
                            <FormItem label="是否切换"  {...formItemLayout}>
                                <Select  {...getFieldProps('switched', {initialValue:'true'}) } >
                                    <Option key='true'>true</Option> 
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="一主多从"  {...formItemLayout}>
                                <Select {...getFieldProps('mssed', {initialValue:'true'}) } >
                                    <Option key='true'>true</Option>  
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="HA开关"  {...formItemLayout}>
                                <Select {...getFieldProps('onoff', {initialValue:'on'}) } >
                                    <Option key='on'>on</Option> 
                                    <Option key='off'>off</Option>
                                </Select>
                            </FormItem>
<FormItem label="授权"  {...formItemLayout}>
                                <Input {...getFieldProps('rights',{rules:[{validator:this.checkRights.bind(this)}],initialValue:modifyHa.echoHa.rights}) } />
                            </FormItem>
                            <FormItem label="进程池"  {...formItemLayout}>
                                <Input {...getFieldProps('pools',{initialValue:modifyHa.echoHa.pools}) } />
                            </FormItem>
                            <FormItem label="是否切换"  {...formItemLayout}>
                                <Select {...getFieldProps('switched', {initialValue:modifyHa.echoHa.switched+''}) } >
                                    <Option key='true'>true</Option> 
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem><FormItem label="一主多从"  {...formItemLayout}>
                                <Select {...getFieldProps('mssed', {initialValue:modifyHa.echoHa.mssed+''}) } >
                                    <Option key='true'>true</Option>  
                                    <Option key='false'>false</Option>
                                </Select>
                            </FormItem>
                             <FormItem label="HA开关"  {...formItemLayout}>
                                <Select {...getFieldProps('onoff', {initialValue:modifyHa.echoHa.on_off}) } >
                                    <Option key='on'>on</Option> 
                                    <Option key='off'>off</Option>
                                </Select>
                                </FormItem>
*/