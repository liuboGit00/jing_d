import React, {Component, PropTypes} from 'react';
import {Steps,Col, Modal, Button ,Select,notification ,message,Form,Input,AutoComplete} from 'antd';
import { Link} from 'react-router'
import {fetch_windows,require_sourceid_number} from '../../actions/mirroraction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
const Step = Steps.Step
class ModifyClone extends Component {
    handleOk() { 

        console.log(this.props.form.getFieldsValue().clone_dest_volumeid)
        const re=/^[a-zA-Z][a-zA-Z0-9]*$/;
        const {dispatch,selectedClone}=this.props;
        if(!re.test(this.props.form.getFieldsValue().agentvolumename)){
            message.error('用户名必须由英文字母开头由数字或英文字母字符串组成！')
        }else{   
            this.props.onOk({ 
                'id': selectedClone[0].id,
                'clone_source_agentvolumename': this.props.form.getFieldsValue().clone_source_agentvolumename,
                'clone_source_agentid':this.props.form.getFieldsValue().clone_source_agentid.split(':')[1],
                'clone_source_agentdepath': this.props.form.getFieldsValue().clone_source_agentdepath,
                'clone_source_agentdevsize': this.props.form.getFieldsValue().clone_source_agentdevsize.split('M')[0]*1024*1024+'',
                'clone_source_agentport': this.props.form.getFieldsValue().clone_source_agentport,
                'clone_source_agentaddress': this.props.form.getFieldsValue().clone_source_agentaddress.split(':').pop(),
                'clone_dest_volumeid': this.props.form.getFieldsValue().clone_dest_volumeid.split(':').shift(),
                'clone_dest_localport': this.props.form.getFieldsValue().clone_dest_localport,
                'clone_dest_localaddress': this.props.form.getFieldsValue().clone_dest_localaddress.split(':').shift() ,
            })
        }
    }
    changeBlur(){
        // console.log(this.props.form.getFieldsValue().clone_source_agentid)
        if(this.props.form.getFieldsValue().clone_source_agentid!=undefined){
           const num = this.props.form.getFieldsValue().clone_source_agentid.split(':').shift();
            const {dispatch,agents}=this.props;
            if(agents[num].saved_grains != null){
                if(agents[num].saved_grains.kernel == 'Windows'){
                    dispatch(fetch_windows(this.props.form.getFieldsValue().clone_source_agentid.split(':')[1]));
                }
            };
            dispatch(require_sourceid_number(num)); 
        }
        
    }

    handleCancel(e) {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    createvolumeChange(text){
        this.props.agentcloneVolume()
        

    }
  

    addMirrorName(){
        const{items}=this.props;
        for(let i=0;i<items.length;i++){
            if(this.props.form.getFieldsValue().clone_source_agentvolumename == items[i].name){
                return message.error('用户名已被使用')
            }
        } 
    }

    localpoint(){
        const{items}=this.props;
        
        for(let i=0;i<items.length;i++){
            if(items[i].getlocalendpoint!=''&&this.props.form.getFieldsValue().clone_dest_localport == items[i].getlocalendpoint[0].port){
                return message.error('端口号已被占用')
            }
        }
    }
    render() {
        const {visible,items,volumes,agents,num,windows,ipaddresses,selectedClone} = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const {getFieldProps} = this.props.form;
        const arr=[];
        const agentsdepath_arr=[];
        const localvolumeid_arr=[];
        const localaddress_arr=[];
        const agentsIp_arr = [];


        if(ipaddresses != undefined){
            for (let i = 0; i < agents.length; i++) {
                arr.push(<Option  key={i+':'+agents[i].id+':' +agents[i].name}>{i+':'+agents[i].id+':' +agents[i].name}</Option>); 
            }

            for (let i = 0; i < volumes.length; i++) {
                localvolumeid_arr.push(<Option  key={volumes[i].id+':' +volumes[i].name +':'+volumes[i].usage.bd_megs}>{volumes[i].id+':' +volumes[i].name +':'+volumes[i].usage.bd_megs}</Option>); 
            }
            for(let i=0;i<ipaddresses.length;i++){
                localaddress_arr.push(<Option  key={ipaddresses[i].url.split('/').pop()+':'+ipaddresses[i].primary_address +' '+ipaddresses[i].address}>{ipaddresses[i].url.split('/').pop()+':'+ipaddresses[i].primary_address +': '+ipaddresses[i].address}</Option>);
            }
            for(let i=0;i<agents.length;i++){
                if(agents[i].saved_grains != null){
                    if(agents[i].saved_grains.ipv4 != null){
                        for(let j=0;j<agents[i].saved_grains.ipv4.length;j++){
                            agentsIp_arr.push(<Option  key={agents[i].id + ':' +agents[i].saved_grains.ipv4[j]}>{agents[i].id + ':' +agents[i].saved_grains.ipv4[j]}</Option>
                                );
                        }
                    }
                    
                }
            }
        }


        if(num != undefined){
            console.log(agents[num])
            if(agents[num].saved_grains != undefined){
                if(agents[num].saved_grains.kernel== 'Linux'){
                    for(let key in agents[num].saved_grains.partitions){
                         agentsdepath_arr.push(<Option  key={agents[num].name+'&' +'/dev/'+key+'&'+agents[num].saved_grains.partitions[key]/1024 +'M'}>{'/dev/'+key+':'+agents[num].saved_grains.partitions[key]/1024 +'M'}</Option>);
                    }
                }else if(agents[num].saved_grains.kernel== 'Windows'){
                    if(windows!=null){
                        for(let key in windows){
                            // console.log(key)
                            if(key.split(':').shift() !='A' && key.split(':').shift() !='B' && windows[key]['1K-blocks'] !=null){
                                agentsdepath_arr.push(<Option  key={agents[num].name+'&' +key+'\\'+'&'+parseInt(windows[key]['1K-blocks']/1024)+'M'}>{key.split(':').shift()+':'+parseInt(windows[key]['1K-blocks']/1024)+'M'}</Option>);
                            }
                        }
                    }
                }
                
            }
        }

        if(selectedClone!=undefined&&selectedClone.length==1){
            if(selectedClone[0].getlocalendpoint!=''&&selectedClone[0].getagentendpoint[0].agent!=undefined){
 
                for(let i=0;i<arr.length;i++){
                    if(selectedClone[0].getagentendpoint[0].agent.split('/').pop()==arr[i].key.split(':')[1]){
                       
                        var defaultKey=arr[i].key
                    }
                }                
                for(let i=0;i<agentsIp_arr.length;i++){
                    if(selectedClone[0].getagentendpoint[0].agentaddress==agentsIp_arr[i].key.split(':')[1]){
                        var defaultip=agentsIp_arr[i].key.split(':')[1]         
                    }
                }
                for(let i=0;i<localvolumeid_arr.length;i++){
                    if(selectedClone[0].getlocalendpoint[0].volume.split('/').pop()==localvolumeid_arr[i].key.split(':')[0]){
                        var defaultvolume = localvolumeid_arr[i].key
                    }
                }
                for(let i=0;i<localaddress_arr.length;i++){
                    if(selectedClone[0].getlocalendpoint[0].ipaddress.split('/').pop()==localaddress_arr[i].key.split(':')[0]){
                        var defaultaddress = localaddress_arr[i].key
                    }
                }
            }
            return (
                <div>
                    <Modal ref="modal"
                        width = {750}
                        closable={false}
                        visible={this.props.visible}
                        title="修改硬盘复制" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                            <Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this) }>
                                创 建
                            </Button>
    
                        ]}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="任务名称"  {...formItemLayout}> 
                                    <Input placeholder="只支持英文或英文数字组合" onBlur={this.addMirrorName.bind(this)} {...getFieldProps('clone_source_agentvolumename',{initialValue:selectedClone[0].name}) } />
                            </FormItem>
                            <div style={{textAlign:'center',paddingBottom:20,fontSize:15,color:'rgba(0,0,0,1.85)'}}>源端信息</div>
                            <FormItem label="源客户端:"  {...formItemLayout}>
                                <Select  disabled={true} onBlur = {this.changeBlur.bind(this)} {...getFieldProps('clone_source_agentid', {initialValue:defaultKey}) } >
                                    {arr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="源端的块设备:"  {...formItemLayout}>
                                <Select  disabled={true}  {...getFieldProps('clone_source_agentdepath', {initialValue:selectedClone[0].getagentendpoint[0].agentDevpath==undefined?'':selectedClone[0].getagentendpoint[0].agentDevpath}) } >
                                    {agentsdepath_arr}
                                </Select>
                            </FormItem>
                            <FormItem label="源盘的大小:"  {...formItemLayout}> 
                                    <Input  disabled={true} {...getFieldProps('clone_source_agentdevsize',{initialValue:selectedClone[0].getagentendpoint[0].agentDevsize==undefined?'':selectedClone[0].getagentendpoint[0].agentDevsize/1024/1024+'M'}) } />
                            </FormItem>
                            <FormItem label="源端端口号:"  {...formItemLayout}> 
                                    <Input disabled={true} placeholder='从9000开始' {...getFieldProps('clone_source_agentport',{initialValue:selectedClone[0].getagentendpoint[0].port==undefined?'':selectedClone[0].getagentendpoint[0].port}) } />
                            </FormItem>
                            <FormItem label="源端硬盘关系的ip:"  {...formItemLayout}>
                                 <Select  disabled={true} {...getFieldProps('clone_source_agentaddress', {initialValue:defaultip}) } >
                                    {agentsIp_arr}
                                </Select>
                            </FormItem>
                            <div style={{textAlign:'center',paddingBottom:20,fontSize:15,color:'rgba(0,0,0,1.85)'}}>目的端信息</div>
                            <FormItem label="本地端块设备:"  {...formItemLayout}>
                                <Select disabled={true} {...getFieldProps('clone_dest_volumeid', {initialValue:defaultvolume}) } >
                                    {localvolumeid_arr}
                                </Select>
                                
                            </FormItem>
                            <FormItem label="本地端口号:"  {...formItemLayout}> 
                                    <Input disabled={true} onBlur={this.localpoint.bind(this)} placeholder='从9000开始' {...getFieldProps('clone_dest_localport',{initialValue:selectedClone[0].getagentendpoint[0].port}) } />
                            </FormItem>
                            <FormItem label="本地IP编号:"  {...formItemLayout}>
                                <Select  disabled={true} {...getFieldProps('clone_dest_localaddress', {initialValue:defaultaddress}) } >
                                    {localaddress_arr}
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



ModifyClone.propTypes = {
    onOk: PropTypes.func.isRequired

};
export default createForm({
    mapPropsToFields (props) {
        return {
            clone_source_agentvolumename:{name:'clone_source_agentvolumename'},
            clone_source_agentid:{name:'clone_source_agentid'},
            clone_source_agentdepath:{name:'clone_source_agentdepath'},
            clone_source_agentdevsize:{name:'clone_source_agentdevsize'},
            clone_source_agentport:{name:'clone_source_agentport'},
            clone_source_agentaddress:{name:'clone_source_agentaddress'},
            clone_dest_volumeid:{name:'clone_dest_volumeid'},
            clone_dest_localport:{name:'clone_dest_localport'},
            clone_dest_localaddress:{name:'clone_dest_localaddress'},
            
            
        }
    }
})(ModifyClone);
/*<div className='create_mirror_volume' onClick={this.createvolumeChange.bind(this)} >+</div>
<AutoComplete
                                    dataSource={agentsIp_arr}
                                    {...getFieldProps('clone_source_agentaddress', {initialValue:defaultip}) }

                                />*/