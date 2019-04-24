import React, {Component, PropTypes} from 'react';
import {Modal,Input,Select,Form,message,AutoComplete} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
var num = 0;
var sub= true;
var mapid='' 
class MapVolume extends Component {
    handleSubmit() {
        if(sub==true){
            this.props.onOk(
                {
                    'lun_id':this.props.form.getFieldsValue().lun_id,
                    'agent_id': this.props.form.getFieldsValue().agent_id,
                    'portal_id': this.props.form.getFieldsValue().portal_id,
                    'readonly': this.props.form.getFieldsValue().readonly,
                    'writeback': this.props.form.getFieldsValue().writeback,
                    'map_lunid':this.props.form.getFieldsValue().map_lunid,
                })
            sub = false;
        }else{
            message.error('请不要重复提交表单数据')
        }

       
    }
    change(value){
        const {luns} = this.props;
        for (let i=0;i<luns.length;i++){
             if(luns[i].lun_id == this.props.form.getFieldsValue().lun_id){
                message.error('映射编号已被使用');
            }
        }
        sub = true; 
        const agentid=[]
        for(let i=0;i<luns.length;i++){
            if (luns[i].agent.split('/').pop()==value) {
                agentid.push(luns[i].map_lunid)
            };
        }
        function sortnum(a,b){
            return a -b;
        }
        agentid.sort(sortnum)
        console.log(agentid)
        if(agentid.length==0){
            mapid=0
        }else{
            if (agentid.indexOf(0)==-1) {
                mapid=0;
                return;
            }
            for(let i=0;i<agentid.length;i++){
                
                if (agentid[i+1]-agentid[i]!=1) {
                    console.log(agentid[i])
                    mapid=agentid[i]+1;
                    console.log(mapid)
                    return;
                }
                mapid=(agentid[agentid.length-1])+1
                

            }
        }
        // console.log(mapid)
    }

    render() { 
        // console.log(mapid)

        const {agents, portals,luns} = this.props
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        var arr =[];
        function sortnum(a,b){
            return a -b;
        }
        function lose(a,b){
            return b-a;
        }
        if(luns){
            if(luns != ''){
                for(let i=0;i<luns.length;i++){
                    arr.push(luns[i].lun_id)
                    arr.sort(sortnum)
                }
                for(let j=0;j<arr.length;j++){
                    if((lose(arr[j],arr[j+1])!=1) ){
                        num = arr[j] + 1
                        break;
                    }else if((arr.length -j) ==2){
                         num = arr.pop() + 1;
                    }  
                }
            }
        }
        const agent_arr=[]
        agents.forEach(function(agent){
            if(agent.initiator_set!=''){
                agent_arr.push(agent)
            }
        })

        if(this.props.visible==false){
            mapid=''
        }

        return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    title="映射" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}>
                    <Form layout='horizontal'>
                        <FormItem label="映射编号"  {...formItemLayout}>
                            <AutoComplete
                                    {...getFieldProps('lun_id', {initialValue:num+''}) }  
                                />
                        </FormItem>
                        <FormItem label="选择客户端"  {...formItemLayout}>
                            <Select {...getFieldProps('agent_id', {onChange:this.change.bind(this)} ) }>
                                {agent_arr.map(agent =><Option  key={agent.id} >{agent.name}</Option>) }
                            </Select>
                        </FormItem>
                        <FormItem label="客户端映射编号"  {...formItemLayout}>
                            <AutoComplete
                                    {...getFieldProps('map_lunid', {initialValue:mapid+''}) }  
                                />
                        </FormItem>
                        <FormItem label="选择portal"  {...formItemLayout}>
                            <Select multiple {...getFieldProps('portal_id', {}) } >
                                {portals.map(portal => <Option  key={portal.id} >{portal.id}</Option>) }
                            </Select>
                        </FormItem>
                        <FormItem label="是否只读"  {...formItemLayout}>
                            <Select  {...getFieldProps('readonly', {initialValue:'false'}) } >
                               <Option key='true'>true</Option>
                               <Option key='false'>false</Option>
                            </Select>
                        </FormItem><FormItem label="是否回写"  {...formItemLayout}>
                            <Select  {...getFieldProps('writeback', {initialValue:'true'}) } >
                               <Option key='true'>true</Option>
                               <Option key='false'>false</Option>
                            </Select>
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        );
    }
}

MapVolume.propTypes = {

};

export default createForm({
    mapPropsToFields (props) {
        return {
            lun_id: {name: 'lun_id'},
            agent_id: {name: 'agent_id'},
            portal_id: {name: 'portal_id'},
            readonly: {name: 'readonly'},
            writeback: {name: 'writeback'},
            map_lunid: {name: 'map_lunid'},


        }
    }
})(MapVolume);