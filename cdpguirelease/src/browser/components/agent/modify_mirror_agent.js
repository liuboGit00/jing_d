import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select} from 'antd';
import {agents} from '../../constants/test'
const createForm = Form.create;
const FormItem = Form.Item;
Option = Select.Option
class ModifyMirrorAgent extends Component {
    handleOk() {

        this.props.onOk({
            'primarybf_cmd':this.props.form.getFieldsValue().primarybf_cmd,
            'primaryaf_cmd':this.props.form.getFieldsValue().primaryaf_cmd,
            'secondarybf_cmd':this.props.form.getFieldsValue().secondarybf_cmd,
            'secondaryaf_cmd':this.props.form.getFieldsValue().secondaryaf_cmd,
            'upbf_cmd':this.props.form.getFieldsValue().upbf_cmd,
            'upaf_cmd':this.props.form.getFieldsValue().upaf_cmd,
            'downbf_cmd':this.props.form.getFieldsValue().downbf_cmd,
            'downaf_cmd':this.props.form.getFieldsValue().downaf_cmd,
            'port':this.props.form.getFieldsValue().port,
            'agent':this.props.form.getFieldsValue().agent,
            'metadisk':this.props.form.getFieldsValue().metadisk,
            'agentaddress':this.props.form.getFieldsValue().agentaddress,
            'agentDrbdminor':this.props.form.getFieldsValue().agentDrbdminor,
            'agentDevpath':this.props.form.getFieldsValue().agentDevpath,
            'agentvolumename':this.props.form.getFieldsValue().agentvolumename,
            'url':this.props.form.getFieldsValue().url,
            'id':this.props.form.getFieldsValue().url.split('/').pop(),
        })
                     
    }
    render() {
        const {mirrors,scripts} = this.props
        const {getFieldProps} = this.props.form
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16},
        };
        var str = [];
        if(mirrors.selectagenturl !=undefined){
            for(let i=0;i<mirrors.items.length;i++){
                for(let j=0;j<mirrors.items[i].getagentendpoint.length;j++){
                    if(mirrors.selectagenturl.url == mirrors.items[i].getagentendpoint[j].url){
                        str.push(mirrors.items[i].getagentendpoint[j])
                    }
                }

            }
        }
         const scriptsArr=[]
        if(scripts!=undefined&&scripts!=''){
            for(let i=0;i<scripts.length;i++){
                scriptsArr.push(<Option key={scripts[i].url}>{scripts[i].name+'['+scripts[i].shelltype+']'}</Option>)
            }
            
        }
        // console.log(str)
        if(str != ''){
            return (
                <div>
                <Modal ref="modal"
                    width={600}
                    closable={false}
                    visible={this.props.visible}
                    title="修改客户端信息" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk.bind(this) }>
                            确 定
                        </Button>

                    ]}
                    >
                    <Form layout='horizontal' >
                        <FormItem label="地址"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('url',{initialValue:str[0].url}) } />
                        </FormItem>
                        <FormItem label="镜像名"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('agentvolumename',{initialValue:str[0].agentvolumename}) } />
                        </FormItem>
                        <FormItem label="快设备"  {...formItemLayout}>
                                <Input  disabled={true} {...getFieldProps('agentDevpath',{initialValue:str[0].agentDevpath}) } />
                        </FormItem>
                        <FormItem label="设备号"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('agentDrbdminor',{initialValue:str[0].agentDrbdminor}) } />
                        </FormItem>
                        <FormItem label="源ip"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('agentaddress',{initialValue:str[0].agentaddress}) } />
                        </FormItem>
                        <FormItem label="元设备"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('metadisk',{initialValue:str[0].metadisk}) } />
                        </FormItem>
                        <FormItem label="客户端"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('agent',{initialValue:str[0].agent}) } />
                        </FormItem>
                        <FormItem label="端口号"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('port',{initialValue:str[0].port}) } />
                        </FormItem>
                        <FormItem label="主前执行脚本"  {...formItemLayout}>
                            <Select  {...getFieldProps('primarybf_cmd',{initialValue:str[0].primarybf_cmd}) }  >
                                {scriptsArr}
                            </Select>
                        </FormItem>
                        <FormItem label="主后执行脚本"  {...formItemLayout}>
                            <Select   {...getFieldProps('primaryaf_cmd',{initialValue:str[0].primaryaf_cmd}) } >
                                {scriptsArr}
                            </Select>    
                        </FormItem>
                        <FormItem label="从前执行脚本"  {...formItemLayout}>
                            <Select    {...getFieldProps('secondarybf_cmd',{initialValue:str[0].secondarybf_cmd}) }>
                                    {scriptsArr}
                                </Select> 
                        </FormItem>
                        <FormItem label="从后执行脚本"  {...formItemLayout}>
                                <Select    {...getFieldProps('secondaryaf_cmd',{initialValue:str[0].secondaryaf_cmd}) }>
                                    {scriptsArr}
                                </Select> 
                        </FormItem>
                        <FormItem label="启用后执行脚本"  {...formItemLayout}>
                                <Select   {...getFieldProps('upaf_cmd',{initialValue:str[0].upaf_cmd}) } >
                                    {scriptsArr}
                                </Select> 
                        </FormItem>
                        <FormItem label="启用前执行脚本"  {...formItemLayout}>
                                <Select    {...getFieldProps('upbf_cmd',{initialValue:str[0].upaf_cmd}) }>
                                    {scriptsArr}
                                </Select> 
                        </FormItem>
                        <FormItem label="禁用前执行脚本"  {...formItemLayout}>
                                <Select    {...getFieldProps('downbf_cmd',{initialValue:str[0].downbf_cmd}) }>
                                    {scriptsArr}
                                </Select> 
                        </FormItem>
                        <FormItem label="禁用后执行脚本"  {...formItemLayout}>
                                <Select    {...getFieldProps('downaf_cmd',{initialValue:str[0].downaf_cmd}) }>
                                    {scriptsArr}
                                </Select> 
                        </FormItem>
                    </Form>

                </Modal>
                </div>
            );
        }else{
            return <div></div>
        }
        
    }
}

ModifyMirrorAgent.propTypes = {
};

export default createForm({
    mapPropsToFields (props) {
        return {
            url:{name:'url'},
            primarybf_cmd:{name:'primarybf_cmd'},
            primaryaf_cmd:{name:'primaryaf_cmd'},
            secondarybf_cmd:{name:'secondarybf_cmd'},
            secondaryaf_cmd:{name:'secondaryaf_cmd'},
            upbf_cmd:{name:'upbf_cmd'},
            upaf_cmd:{name:'upaf_cmd'},
            downbf_cmd:{name:'downbf_cmd'},
            downaf_cmd:{name:'downaf_cmd'},
            port:{name:'port'},
            agent:{name:'agent'},
            metadisk:{name:'metadisk'},
            agentaddress:{name:'agentaddress'},
            agentDrbdminor:{name:'agentDrbdminor'},
            agentDevpath:{name:'agentDevpath'},
            agentvolumename:{name:'agentvolumename'},
        }
    }
})(ModifyMirrorAgent);

