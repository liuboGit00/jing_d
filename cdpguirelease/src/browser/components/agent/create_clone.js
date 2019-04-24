import React, {Component, PropTypes} from 'react';
import {Steps,Col, Modal, Button ,Select,notification ,message,Form,Input,AutoComplete} from 'antd';
import { Link} from 'react-router'
import {fetch_windows,require_sourceid_number} from '../../actions/mirroraction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
const Step = Steps.Step
var portsourcenum=9000
var portlocalnum=9000
// const option = Select.option;
var agentsIp_arr=[]
var filterArr=[]
var size
class CreateClone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout:'horizontal'
        }
    }
    handleOk() { 
        const re=/^[a-zA-Z][a-zA-Z0-9]*$/;
        const {dispatch,modifyStatus}=this.props;
        console.log(this.props.form.getFieldsValue().clone_source_agentvolumename)
        console.log(re.test(this.props.form.getFieldsValue().clone_source_agentvolumename))
        if(!re.test(this.props.form.getFieldsValue().clone_source_agentvolumename)){
            message.error('用户名必须由英文字母开头由数字或英文字母字符串组成！')
        }else if(
            this.props.form.getFieldsValue().clone_source_agentvolumename !=undefined &&
            this.props.form.getFieldsValue().clone_source_agentid !=undefined &&
            this.props.form.getFieldsValue().clone_source_agentdepath !=undefined &&
            this.props.form.getFieldsValue().clone_source_agentport !=undefined &&
            this.props.form.getFieldsValue().clone_source_agentaddress !=undefined &&
            this.props.form.getFieldsValue().clone_dest_volumeid !=undefined &&
            this.props.form.getFieldsValue().clone_dest_localport !=undefined &&
            this.props.form.getFieldsValue().clone_dest_localaddress !=undefined 
            ){   
                if(size>0){
                    this.props.onOk({   
                        'clone_source_agentvolumename': this.props.form.getFieldsValue().clone_source_agentvolumename,
                        'clone_source_agentid':this.props.form.getFieldsValue().clone_source_agentid.split(':')[1],
                        'clone_source_agentdepath': this.props.form.getFieldsValue().clone_source_agentdepath.split('&')[1],
                        'clone_source_agentdevsize': this.props.form.getFieldsValue().clone_source_agentdepath.split('&').pop().split('M')[0]*1024*1024+'',
                        'clone_source_agentport': this.props.form.getFieldsValue().clone_source_agentport,
                        'clone_source_agentaddress': this.props.form.getFieldsValue().clone_source_agentaddress.split(':').pop(),
                        'clone_dest_volumeid': this.props.form.getFieldsValue().clone_dest_volumeid.split(':').shift(),
                        'clone_dest_localport': this.props.form.getFieldsValue().clone_dest_localport,
                        'clone_dest_localaddress': this.props.form.getFieldsValue().clone_dest_localaddress.split(':').shift() ,
                    })
                }
            }else{
                message.error('数据不能为空')
            }
    }
    changeBlur(){
        if(this.props.form.getFieldsValue().clone_source_agentid==undefined){return false}else{
            const num = this.props.form.getFieldsValue().clone_source_agentid.split(':').shift();
            const {dispatch,agents}=this.props;
            if(agents[num].saved_grains != null){
                if(agents[num].saved_grains.kernel == 'Windows'){
                    dispatch(fetch_windows(this.props.form.getFieldsValue().clone_source_agentid.split(':')[1]));
                }
            };
            
            for(let i=0;i<agents.length;i++){
                if(this.props.form.getFieldsValue().clone_source_agentid.split(':')[1]==agents[i].id&&agents[i].saved_grains != null&&agents[i].saved_grains.ipv4 != null){
                    filterArr=agents[i].saved_grains.ipv4.filter(function(item){
                        return item.split('.').pop()!='127.0.0.1'
                    })
                   
                }
            }
            agentsIp_arr=[]
            for(let i=0;i<filterArr.length;i++){

                agentsIp_arr.push(<Option  key={filterArr[i]}>{filterArr[i]}</Option>);
            }
            dispatch(require_sourceid_number(num));
        }
        
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
    checkLocalVolume(rule, value, callback) {

        // console.log(value)
        let sourcesize = this.props.form.getFieldsValue().clone_source_agentdepath.split('&').pop()
        console.log(sourcesize)
        let localsize = value.split(':').pop()
        if(localsize.indexOf('G')!=-1){
            localsize = parseFloat(localsize)*1024
        }else if (localsize.indexOf('T')!=-1) {
            localsize = parseFloat(localsize)*1024*1024
        };
        // console.log(localsize)
        sourcesize = parseFloat(sourcesize)
        localsize = parseFloat(localsize)
        console.log(sourcesize,localsize)
        size =localsize-sourcesize
        if(size<=0){
            callback(new Error('请选择大于源端块设备的本地端设备！'));
        }
        callback()
        
    }
    render() {
        const {visible,items,volumes,agents,num,windows,ipaddresses} = this.props;
        const{formLayout}=this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const {getFieldProps} = this.props.form;
        const arr=[];
        const agentsdepath_arr=[];
        const localvolumeid_arr=[];
        const localaddress_arr=[];
        // console.log(volumes)
        // for(let i=0;i<volumes.length;i++){
        //     if(volumes[i].native.is_blockvolume&&volumes[i].native.is_blockvolume==true){
        //          console.log(volumes[i].name+':'+volumes[i].native.type.model)
        //     }
           
        // }
// (item.native.type.model=='zvol')||(item.native.type.model=='zfs')||(item.native.type.model=='logdevice')||(item.native.is_blockvolume==false)
        const volumesArr=volumes.filter(function(item){return((item.native.is_blockvolume==true)&&(item.native.type.model!='genericdisk'))},volumes)
        // console.log(volumesArr)
        if(ipaddresses != undefined){
            for (let i = 0; i < agents.length; i++) {
                arr.push(<Option  key={i+':'+agents[i].id+':' +agents[i].name}>{agents[i].name}</Option>); 
            }

            for (let i = 0; i < volumesArr.length; i++) {
                if(volumesArr[i].native.type.model=='logdevice'){
                    localvolumeid_arr.push(<Option  key={volumesArr[i].id+':' +volumesArr[i].name +':'+volumesArr[i].megs+'M'}>{volumesArr[i].name +':'+volumesArr[i].megs+'M'}</Option>); 
                }else{
                    // console.log(volumesArr[i].megs)
                    localvolumeid_arr.push(<Option  key={volumesArr[i].id+':' +volumesArr[i].name +':'+(volumesArr[i].usage.bd_megs=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.bd_megs)}>{volumesArr[i].name +':'+(volumesArr[i].usage.bd_megs=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.bd_megs)}</Option>); 
                }

            }
            for(let i=0;i<ipaddresses.length;i++){
                localaddress_arr.push(<Option  key={ipaddresses[i].url.split('/').pop()+':'+ipaddresses[i].primary_address +' '+ipaddresses[i].address}>{ipaddresses[i].primary_address +': '+ipaddresses[i].address}</Option>);
            }
        }


        if(num != undefined){
            // console.log(agentsIp_arr)
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
        // console.log(agentsdepath_arr)
        function front(a,b){
            return a -b;
        }
        function after(a,b){
            return b-a;
        }
        const portArrSource=[]
        const portArrLocal=[]
        if(items!=''){
            for(let i=0;i<items.length;i++){
                if(items[i].getagentendpoint!=''&&items[i].getagentendpoint[0]!=undefined){
                    portArrSource.push(items[i].getagentendpoint[0].port)
                    portArrSource.sort(front)
                }
            }
            for(let i=0;i<items.length;i++){
                if(items[i].getlocalendpoint!=''&&items[i].getlocalendpoint[0]!=undefined){
                    portArrLocal.push(items[i].getlocalendpoint[0].port)
                    portArrLocal.sort(front)
                }
            }
        }
        for(let i=0;i<portArrSource.length;i++){
            if(portArrSource[0]!=9000){
                portsourcenum=9000;
                break;
            }else if(after(portArrSource[i],portArrSource[i+1])!=1){
                portsourcenum=portArrSource[i]+1;
                break;
            }else if(portArrSource.length-i==2){
                portsourcenum=portArrSource.pop()+1
            }
        }
        for(let i=0;i<portArrLocal.length;i++){
            if(portArrLocal[0]!=9000){
                portlocalnum=9000;
                break;
            }else if(after(portArrLocal[i],portArrLocal[i+1])!=1){
                portlocalnum=portArrLocal[i]+1;
                break;

            }else if(portArrLocal.length-i==2){
                portlocalnum=portArrLocal.pop()+1
            }
        }

        return (
                <div>
                    <Modal ref="modal"
                        width = {750}
                        maskClosable={false}
                        
                        visible={this.props.visible}
                        title="创建任务" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                            <Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this) }>
                                创 建
                            </Button>
    
                        ]}
                        >
                        <Form layout={formLayout}>
                            <FormItem label="任务名称:"  {...formItemLayout}> 
                                    <Input placeholder="只支持英文或英文数字组合" onBlur={this.addMirrorName.bind(this)} {...getFieldProps('clone_source_agentvolumename',{initialValue:this.props.form.getFieldsValue().clone_source_agentvolumename}) } />
                            </FormItem>
                            <div style={{textAlign:'center',paddingBottom:20,fontSize:15,color:'rgba(0,0,0,1.85)'}}>源端信息</div>
                            
                            <FormItem label="源客户端:"  {...formItemLayout}>
                                <Select  onBlur = {this.changeBlur.bind(this)} {...getFieldProps('clone_source_agentid', {initialValue:this.props.form.getFieldsValue().clone_source_agentid}) } >
                                    {arr}
                                </Select>
                            </FormItem>
                            <FormItem label="源端ip:"  {...formItemLayout}>
                                <Select   {...getFieldProps('clone_source_agentaddress', {}) } >
                                    {agentsIp_arr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="源端的块设备:"  {...formItemLayout}>
                                <Select   {...getFieldProps('clone_source_agentdepath', {}) } >
                                    {agentsdepath_arr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label=" 源端端口号:"  {...formItemLayout}> 
                                    <Input placeholder='从9000开始' {...getFieldProps('clone_source_agentport',{initialValue:portsourcenum}) } />
                            </FormItem>
                            
                            <div style={{textAlign:'center',paddingBottom:20,fontSize:15,color:'rgba(0,0,0,1.85)'}}>目的端信息</div>

                            <FormItem label="本地端块设备:"  {...formItemLayout}>
                                <Select  {...getFieldProps('clone_dest_volumeid', {rules:[{ validator: this.checkLocalVolume.bind(this)}]}) } >
                                    {localvolumeid_arr}
                                </Select>
                            </FormItem>
                            <FormItem label="本地端口号:"  {...formItemLayout}> 
                                    <Input onBlur={this.localpoint.bind(this)} placeholder='从9000开始' {...getFieldProps('clone_dest_localport',{initialValue:portlocalnum}) } />
                            </FormItem>
                            <FormItem label="本地IP:"  {...formItemLayout}>
                                <Select  {...getFieldProps('clone_dest_localaddress', {}) } >
                                    {localaddress_arr}
                                </Select>
                            </FormItem>
                            <FormItem label="传输速度:"  {...formItemLayout}>
                                    <Input placeholder='默认以M为单位' {...getFieldProps('clone_speed',{}) } />
                                
                            </FormItem>
                            <FormItem label="传输级别:"  {...formItemLayout}>
                                <Select  {...getFieldProps('clone_level', {}) } >
                                    <Option key='1'>1</Option>
                                    <Option key='2'>2</Option>
                                    <Option key='3'>3</Option>
                                    <Option key='4'>4</Option>
                                    <Option key='5'>5</Option>

                                </Select>
                            </FormItem>
                        </Form>


                    </Modal>
                    

                </div>
        ); 
        
    }

 

}



CreateClone.propTypes = {
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
})(CreateClone);
