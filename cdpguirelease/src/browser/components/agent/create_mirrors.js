import React, {Component, PropTypes} from 'react';
import {Steps,Col, Modal, Button ,Select,notification ,message,Form,Input,AutoComplete} from 'antd';
import { Link} from 'react-router'
import {fetch_windows,require_sourceid_number,close_create_mirror_modal,
        echo_agent_localoragent_modal,close_agent_localoragent_modal,get_agent_mirror,
        echo_agent_agentorlocal_modal,close_agent_agentorlocal_modal,
    } from '../../actions/mirroraction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
const Step = Steps.Step
var agentsIp_arr =[]

class CreateMirror extends Component {
    handleOk(key){
        const re=/^[a-zA-Z][a-zA-Z0-9]*$/;
        const {dispatch,previousagentstate}=this.props;
        const {items}=this.props;
        for(let i=0;i<items.length;i++){
            if(items[i].name==this.props.form.getFieldsValue().agentvolumename){
                return message.error('用户名已被使用')
            }
        }

        if(!re.test(this.props.form.getFieldsValue().agentvolumename)){
            message.error('用户名必须由英文字母开头由数字或英文字母字符串组成！')
        }else if(
            this.props.form.getFieldsValue().protocol !=undefined &&
            this.props.form.getFieldsValue().sync_rate !=undefined &&
            this.props.form.getFieldsValue().agentvolumename !=undefined &&
            this.props.form.getFieldsValue().agentdepath !=undefined &&
            this.props.form.getFieldsValue().agentdrbdminor !=undefined &&
            this.props.form.getFieldsValue().agentaddress !=undefined &&
            this.props.form.getFieldsValue().agentid !=undefined 
            ){
            if(this.agentdrbdminer()==true){
                if(previousagentstate==true){
                        this.props.onOk({
                            'protocol':this.props.form.getFieldsValue().protocol,
                            'mir_rate':this.props.form.getFieldsValue().sync_rate,
                            'mir_source_agentvolumename': this.props.form.getFieldsValue().agentvolumename,
                            'mir_source_agentdepath': this.props.form.getFieldsValue().agentdepath,
                            'mir_source_agentdrbdminor': this.props.form.getFieldsValue().agentdrbdminor,
                            'mir_source_agentaddress':this.props.form.getFieldsValue().agentaddress,
                            'mir_source_metadisk':this.props.form.getFieldsValue().mir_source_metadisk,
                            'mir_source_agentid': this.props.form.getFieldsValue().agentid,
                           
                        });

                    }else{
                        this.props.onOk({
                            'protocol':this.props.form.getFieldsValue().protocol,
                            'mir_rate': isNaN(this.props.form.getFieldsValue().sync_rate)?this.props.form.getFieldsValue().sync_rate:this.props.form.getFieldsValue().sync_rate+'M',
                            'mir_source_agentvolumename': this.props.form.getFieldsValue().agentvolumename,
                            'mir_source_agentdepath': this.props.form.getFieldsValue().agentdepath,
                            'mir_source_agentdrbdminor': this.props.form.getFieldsValue().agentdrbdminor,
                            'mir_source_agentaddress':this.props.form.getFieldsValue().agentaddress.split(':').pop(),
                            'mir_source_metadisk':(this.props.form.getFieldsValue().mir_source_metadisk ==undefined||this.props.form.getFieldsValue().mir_source_metadisk == '')?'':(this.props.form.getFieldsValue().mir_source_metadisk.split(':').length==3)?(this.props.form.getFieldsValue().mir_source_metadisk.split(':').splice(1,1)[0]):(this.props.form.getFieldsValue().mir_source_metadisk.split(':')[1].length==1)?(this.props.form.getFieldsValue().mir_source_metadisk.split(':')[1]):this.props.form.getFieldsValue().mir_source_metadisk,
                            'mir_source_agentid': this.props.form.getFieldsValue().agentid.split(':').splice(1,1)[0],
                           
                        });
                    }
                dispatch(close_create_mirror_modal())
                if(key == 'local'){
                    dispatch(echo_agent_agentorlocal_modal())
                }else{
                    dispatch(echo_agent_localoragent_modal())
                }
            }else{
                message.error('设备号已被使用')
            }
        }else{
            message.error('数据不能为空')
        }
  
    }
    onFieldsChange(){
        const {dispatch,agentsId,items}=this.props;
        if(this.props.form.getFieldsValue().agentid !=undefined){
            const setagentid = this.props.form.getFieldsValue().agentid
            const num = setagentid.split(':').shift();
            if(setagentid != ''){
                if(agentsId[num].saved_grains != undefined){
                    if(agentsId[num].saved_grains.kernel == 'Windows'){
                        dispatch(fetch_windows(setagentid.split(':')[1]));
                    }
                };
            }
            dispatch(require_sourceid_number(num));
        }
        agentsIp_arr=[]
        for(let i=0;i<agentsId.length;i++){
            if(agentsId[i].saved_grains != null&&agentsId[i].saved_grains.ipv4 != null){
                if(agentsId[i].id == this.props.form.getFieldsValue().agentid.split(':')[1]){
                    for(let j=0;j<agentsId[i].saved_grains.ipv4.length;j++){
                        agentsIp_arr.push(<Option  key={agentsId[i].saved_grains.ipv4[j]}>{agentsId[i].saved_grains.ipv4[j]}</Option>);
                    }
                    return
    
                }
                    
                
            }
            
        }
    }

    handleCancel(e) {
        // console.log(e);
        this.props.form.getFieldsValue().sync_rate=''
    }
    createmirrorChange(){
        this.props.mirrorVolume()
    }
    agentdrbdminer(){

        const{items}=this.props;
        // console.log(items[0])
        // console.log(this.props.form.getFieldsValue().agentid.split(':').splice(1,1)[0])

        if(items!=''){
            for(let i=0;i<items.length;i++){
                if(items[i].getagentendpoint[0]!=undefined){
                    if(this.props.form.getFieldsValue().agentid.split(':').splice(1,1)[0]==items[i].getagentendpoint[0].agent.split('/').pop()&&this.props.form.getFieldsValue().agentdrbdminor == items[i].getagentendpoint[0].agentDrbdminor){
                        return false
                    }
                     
                }
            }
            return true
        }else{
            return true
        }
        
    }
    render() {
        const {value,visible,items,select,ipaddress,agentsId,windows,num,previousagent,previousagentstate} = this.props;
        // console.log(previousagent)
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const { getFieldProps} = this.props.form;
        const agentBlockArr=[]
        const arr=[];
        const metadisk_arr = [];
        const agentsdepath_arr=[];
        const ipaddress_arr =[];
        const agentsId_arr = [];
        // const agentsIp_arr = [];
        if(ipaddress != undefined){

            for (let i = 0; i < select.length; i++) {
                if(select[i].native.type.model !='zfs'){
                    arr.push(<Option  key={'id:'+select[i].id +"  "+ '名字:'+select[i].name +"  "+  '大小:'+select[i].usage.bd_megs}>{'id:'+select[i].id +"  "+ '名字:'+select[i].name +"  "+  '大小:'+select[i].usage.bd_megs}</Option>);
                }
            }
            for(let i=0;i<ipaddress.length;i++){
                ipaddress_arr.push(<Option  key={ipaddress[i].url.split('/').pop()+':'+ipaddress[i].primary_address +' '+ipaddress[i].address}>{ipaddress[i].url.split('/').pop()+':'+ipaddress[i].primary_address +' '+ipaddress[i].address}</Option>);

            }
            for(let i=0;i<agentsId.length;i++){
                agentsId_arr.push(<Option  key={i+':'+agentsId[i].id+':'+agentsId[i].name}>{agentsId[i].name}</Option>);
            }


            // for(let i=0;i<agentsId.length;i++){
            //     if(agentsId[i].saved_grains != null){
            //         if(agentsId[i].saved_grains.ipv4 != null){
            //             for(let j=0;j<agentsId[i].saved_grains.ipv4.length;j++){
            //                 agentsIp_arr.push(<Option  key={agentsId[i].id + ':' +agentsId[i].saved_grains.ipv4[j]}>{agentsId[i].id + ':' +agentsId[i].saved_grains.ipv4[j]}</Option>);
            //             }
            //         }
                    
            //     }
            // }

        }
        
        if(num != '请选择'&&agentsId[num]!=undefined){
            if(agentsId[num].saved_grains != null){
                if(agentsId[num].saved_grains.kernel== 'Linux'){
                    for(let key in agentsId[num].saved_grains.partitions){

                         agentsdepath_arr.push(<Option  key={agentsId[num].name+':' +'/dev/'+key+':'+agentsId[num].saved_grains.partitions[key]/1024 +'M'}>{agentsId[num].name+':' +'/dev/'+key+':'+agentsId[num].saved_grains.partitions[key]/1024 +'M'}</Option>);
                    }
                }else if(agentsId[num].saved_grains.kernel== 'Windows'){
                    if(windows!=null){
                        for(let key in windows){
                            if(key.split(':').shift() !='A' && key.split(':').shift() !='B' && key.split(':').shift() !='C'){
                             agentsdepath_arr.push(<Option  key={agentsId[num].name+':' +key.split(':').shift()}>{agentsId[num].name+':' +key.split(':').shift()}</Option>);
                            }
                        }
                    }
                }
                
            }else{
                    agentsdepath_arr.push(<Option  key={'1'+agentsId[num]}>{}</Option>);
            }
        }
        if(num != '请选择'&&agentsId[num]!=undefined){
            if(agentsId[num].saved_grains != null){
                if(agentsId[num].saved_grains.kernel== 'Linux'){
                    for(let key in agentsId[num].saved_grains.partitions){
                        metadisk_arr.push(<Option  key={agentsId[num].name+':' +'/dev/'+key+':'+agentsId[num].saved_grains.partitions[key]/1024 +'M'}>{agentsId[num].name+':' +'/dev/'+key+':'+agentsId[num].saved_grains.partitions[key]/1024 +'M'}</Option>);
                    }
                }else if(agentsId[num].saved_grains.kernel== 'Windows'){
                    metadisk_arr;
                
                }
                
            }else{
                    metadisk_arr.push(<Option  key={'1'+agentsId[num]}>{}</Option>);
            }
        }
        if(num != '请选择'&&agentsId[num]!=undefined){
            if(agentsId[num].saved_grains != null){
                if(agentsId[num].saved_grains.kernel== 'Linux'){
                    for(let key in agentsId[num].saved_grains.partitions){
                        // console.log(agentsId[num].name)
                         agentBlockArr.push(agentsId[num].name+':' +'/dev/'+key+':'+parseInt(agentsId[num].saved_grains.partitions[key]/1024) +'M');
                    }
                }else if(agentsId[num].saved_grains.kernel== 'Windows'){
                    if(windows!=null){
                        for(let key in windows){

                            // console.log(windows['G:\\']['1K-blocks'])
                            // console.log(key)


                            if(key.split(':').shift() !='A' && key.split(':').shift() !='B' && key.split(':').shift() !='C'){
                             agentBlockArr.push(agentsId[num].name+':'+key.split(':').shift()+':'+ parseInt(windows[key]['1K-blocks']/1024)+'M');
                            }
                        }
                    }
                }
                
            }else{
                    agentBlockArr;
            }
        }
        
        if(previousagentstate==true){
            return (
                <div>
                    <Modal ref="modal"
                        width = {750}
                        closable={false}

                        visible={this.props.visible}
                        title="客户端1" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
                            <Button key="echolocal" type="ghost" size="large"  onClick={this.handleOk.bind(this,'local')}>本地</Button>,
                            <Button key="echolocalagent" type="ghost" size="large"  onClick={this.handleOk.bind(this,'agent')}>客户端2</Button>,
                        ]}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="源id:"  {...formItemLayout}> 
                                <Select  onBlur ={this.onFieldsChange.bind(this)} {...getFieldProps('agentid', {initialValue:previousagent.mir_source_agentid}) } >
                                    {agentsId_arr}
                                </Select>
                            </FormItem>
                            
                            <FormItem  label="协议:"  {...formItemLayout}>
                                <Select  {...getFieldProps('protocol', {initialValue:previousagent.protocol}) } >
                                    <Option value="A"  >Protocol A: 传输速度最快，一发送就返回.</Option>
                                    <Option value="B"  >Protocol B: 传输速度中等，建立连接才返回.</Option>
                                    <Option value="C"  >Protocol C: 传输速度最慢，最安全两端同步.</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="同步速度:"  {...formItemLayout}>
                                <Input placeholder='同步传输带宽,在500K到1000M之间,默认单位为M.' {...getFieldProps('sync_rate',{initialValue:previousagent.mir_rate}) } />
                            </FormItem>
                            <FormItem label="镜像名字:"  {...formItemLayout}>
                                <Input placeholder='用户名必须由英文字母开头由数字或英文字母字符串组成.' {...getFieldProps('agentvolumename',{initialValue:previousagent.mir_source_agentvolumename}) } />
                            </FormItem>
                            <FormItem label="块设备:"  {...formItemLayout}>
                                <AutoComplete
                                    dataSource={agentBlockArr}
                                    {...getFieldProps('agentdepath', {initialValue:previousagent.mir_source_agentdepath}) }  
                                />
                            </FormItem>
                            <FormItem label="元设备:"  {...formItemLayout}>
                                
                                <AutoComplete
                                    dataSource={agentBlockArr}
                                    {...getFieldProps('mir_source_metadisk', {initialValue:previousagent.mir_source_metadisk}) }  
                                />
                            </FormItem>
                            <FormItem label="设备号:"  {...formItemLayout}>
                                <Input onBlur={this.agentdrbdminer.bind(this)} {...getFieldProps('agentdrbdminor',{initialValue:previousagent.mir_source_agentdrbdminor}) } />
                            </FormItem>
                            <FormItem label="源ip:"  {...formItemLayout}>
                                <Select  {...getFieldProps('agentaddress', {initialValue:previousagent.mir_source_agentaddress}) } >
                                    {agentsIp_arr}
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            );
        }else{
            return (
                <div>
                    <Modal ref="modal"
                        width = {750}
                        closable={false}
                        
                        visible={this.props.visible}
                        title="客户端1" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
                            <Button key="echolocal" type="ghost" size="large"  onClick={this.handleOk.bind(this,'local')}>本地</Button>,
                            <Button key="echolocalagent" type="ghost" size="large"  onClick={this.handleOk.bind(this,'agent')}>客户端2</Button>,
                        ]}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="源id:"  {...formItemLayout}> 
                                <Select  onBlur ={this.onFieldsChange.bind(this)} {...getFieldProps('agentid', {initialValue: visible==false?'':this.props.form.getFieldsValue().agentid}) } >
                                    {agentsId_arr}
                                </Select>
                            </FormItem>
                            
                            <FormItem  label="协议:"  {...formItemLayout}>
                                <Select  {...getFieldProps('protocol', {initialValue: visible==false?'':this.props.form.getFieldsValue().protocol}) } >
                                    <Option value="A"  >Protocol A: 传输速度最快，一发送就返回.</Option>
                                    <Option value="B"  >Protocol B: 传输速度中等，建立连接才返回.</Option>
                                    <Option value="C"  >Protocol C: 传输速度最慢，最安全两端同步.</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="同步速度:"  {...formItemLayout}>
                                <Input placeholder='同步传输带宽,在500K到1000M之间,默认单位为M.' {...getFieldProps('sync_rate',{initialValue: visible==false?'':this.props.form.getFieldsValue().sync_rate}) } />
                            </FormItem>
                            <FormItem label="镜像名字:"  {...formItemLayout}>
                                <Input placeholder='用户名必须由英文字母开头由数字或英文字母字符串组成.' {...getFieldProps('agentvolumename',{initialValue: visible==false?'':this.props.form.getFieldsValue().agentvolumename}) } />
                            </FormItem>
                            <FormItem label="块设备:"  {...formItemLayout}>
                                <AutoComplete
                                    dataSource={agentBlockArr}
                                    {...getFieldProps('agentdepath', {initialValue: visible==false?'':this.props.form.getFieldsValue().agentdepath}) }  
                                />
                            </FormItem>
                            <FormItem label="元设备:"  {...formItemLayout}>
                                
                                <AutoComplete
                                    dataSource={agentBlockArr}
                                    {...getFieldProps('mir_source_metadisk', {initialValue: visible==false?'':this.props.form.getFieldsValue().mir_source_metadisk}) }  
                                />
                            </FormItem>
                            <FormItem label="设备号:"  {...formItemLayout}>
                                <Input onBlur={this.agentdrbdminer.bind(this)} {...getFieldProps('agentdrbdminor',{initialValue: visible==false?'':this.props.form.getFieldsValue().agentdrbdminor}) } />
                            </FormItem>
                            <FormItem label="源ip:"  {...formItemLayout}>
                                <Select  {...getFieldProps('agentaddress', {initialValue: visible==false?'':this.props.form.getFieldsValue().agentaddress}) } >
                                    {agentsIp_arr}
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            );
        }
         

        
    }

 

}



CreateMirror.propTypes = {
    onOk: PropTypes.func.isRequired

};
export default createForm({
    mapPropsToFields (props) {
        return {
            agentid:{name:'agentid'},
            agentaddress:{name:'agentaddress'},
            protocol:{name:'protocol'},
            sync_rate:{name:'sync_rate'},
            agentvolumename:{name:'agentvolumename'},
            agentdepath:{name:'agentdepath'},
            agentdrbdminor:{name:'agentdrbdminor'},
            mir_source_metadisk:{name:'mir_source_metadisk'},
            
        }
    }
})(CreateMirror);
