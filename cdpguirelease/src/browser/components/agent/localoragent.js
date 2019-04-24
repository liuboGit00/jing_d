
import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,notification ,message,Form,Input,AutoComplete} from 'antd';
import { Link} from 'react-router'
import {get_previous_agent,fetch_windows,require_sourceid_number,close_agent_localoragent_modal,echo_create_mirror_modal} from '../../actions/mirroraction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option


class Localoragent extends Component {
    handleOk() {        
        const re=/^[a-zA-Z][a-zA-Z0-9]*$/;
        const {localoragent}=this.props
        if(!re.test(this.props.form.getFieldsValue().local_agentvolumename)){
            message.error('用户名必须由英文字母开头由数字或英文字母字符串组成！')
        }else if(this.props.form.getFieldsValue().mir_dest_volumeid !=undefined&&
                this.props.form.getFieldsValue().mir_dest_localaddress !=undefined&&
                this.props.form.getFieldsValue().local_agentid !=undefined&&
                this.props.form.getFieldsValue().local_agentaddress !=undefined&&
                this.props.form.getFieldsValue().local_agentvolumename !=undefined&&
                this.props.form.getFieldsValue().local_agentdepath!=undefined){
            let agentsize=localoragent.mir_source_agentdepath.split(':')[2];
            let localsize = this.props.form.getFieldsValue().mir_dest_volumeid.split(':').pop();
            let localblocksize = this.props.form.getFieldsValue().local_agentdepath.split(':').pop()
            const screenArr = {"M":1,"G":1024,"T":1048576}
            

            let agentsizechild
            let localsizechild
            let localblocksizechild
            for(let i in screenArr){
                if(agentsize.slice(-1)==i){
                    agentsizechild=parseInt(agentsize)*screenArr[i]
                    
                }
                if(localsize.slice(-1)==i){
                    localsizechild=parseInt(localsize)*screenArr[i]
                }
                if(localblocksize.slice(-1)==i){
                    localblocksizechild =parseInt(localblocksize)*screenArr[i]
                }
            }
            console.log(agentsizechild)
            console.log(localsizechild)
            console.log(localblocksizechild)
            if(localsizechild-agentsizechild<0){
                message.error('本地卷小于源端块设备')
            }else if(localblocksizechild-localsizechild<0){
                message.error('本地快设备小于本地卷')                
            }else{
                this.props.onOk({
                    'mir_dest_volumeid': (this.props.form.getFieldsValue().mir_dest_volumeid.split(' ').shift()).split(':').pop(),
                    'mir_dest_localaddress': this.props.form.getFieldsValue().mir_dest_localaddress.split(':').shift() ,
                    'local_agentid':this.props.form.getFieldsValue().local_agentid.split(':').splice(1,1)[0],
                    'local_agentaddress':this.props.form.getFieldsValue().local_agentaddress.split(':').pop(),
                    'local_agentvolumename':this.props.form.getFieldsValue().local_agentvolumename,
                    'local_agentdepath':this.props.form.getFieldsValue().local_agentdepath.split(':').length>1?this.props.form.getFieldsValue().local_agentdepath.split(':').splice(1,1)[0]:this.props.form.getFieldsValue().local_agentdepath,
                    'local_agentdrbdminor':this.props.form.getFieldsValue().local_agentdrbdminor,
                    'mir_local_source_metadisk':(this.props.form.getFieldsValue().mir_local_source_metadisk ==undefined||this.props.form.getFieldsValue().mir_local_source_metadisk =='')?'':(this.props.form.getFieldsValue().mir_local_source_metadisk.split(':').length==3)?(this.props.form.getFieldsValue().mir_local_source_metadisk.split(':').splice(1,1)[0]):(this.props.form.getFieldsValue().mir_local_source_metadisk.split(':')[1].length==1)?(this.props.form.getFieldsValue().mir_local_source_metadisk.split(':')[1]):this.props.form.getFieldsValue().mir_local_source_metadisk,
                    'drbdenable':false,
                });
            }
        }else{
            message.error('数据不能为空')
        }
        
    }
    createmirrorChange(){
        this.props.mirrorVolume()
    }
    onFieldsChange(){
        if(this.props.form.getFieldsValue().local_agentid !=undefined){
            const setagentid = this.props.form.getFieldsValue().local_agentid
            const{items} = this.props 
            // console.log(setagentid)
            const num = setagentid.split(':').shift();
            const {dispatch,agentsId}=this.props;
            if(this.props.form.getFieldsValue().local_agentid != ''){
                if(agentsId[num].saved_grains != undefined){
                    if(agentsId[num].saved_grains.kernel == 'Windows'){
                        dispatch(fetch_windows(setagentid.split(':')[1]));
                    }
                };
            }
            
            dispatch(require_sourceid_number(num));
        }

    }
    getPreviousAgent(){
        const{dispatch}=this.props;
        dispatch(close_agent_localoragent_modal());
        dispatch(echo_create_mirror_modal());
        dispatch(get_previous_agent())
    }




    agentdrbdminer(){
        const{items}=this.props;

        for(let i=0;i<items.length;i++){
            if(items[i].getagentendpoint.length>1&&this.props.form.getFieldsValue().local_agentdrbdminor== items[i].getagentendpoint[1].agentDrbdminor){
                return message.error('设备号已被使用')
            }

        }
    }
    render() {
        const {value,visible,items,select,ipaddress,agentsId,windows,num} = this.props;
        // console.log(agentsId)
        // console.log(num)


        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const { getFieldProps} = this.props.form;
        const cc=[]
        const arr=[];
        const metadisk_arr = [];
        const agentsdepath_arr=[];
        const ipaddress_arr =[];
        const agentsId_arr = [];
        const agentsIp_arr = [];
        if(ipaddress != undefined){
            const volumesArr=select.filter(function(item){return((item.native.is_volumepool!=true&&item.native.type.model!='genericdisk'))},select)

            for (let i = 0; i < volumesArr.length; i++) {
                if(volumesArr[i].native.type.model !='zfs'){
                    if(volumesArr[i].native.type.model=='logdevice'){
                        arr.push(<Option  key={'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].megs+'M')}>{'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].usage.size_text=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.size_text)}</Option>);

                    }else{
                        arr.push(<Option  key={'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].megs+'M')}>{'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].usage.bd_megs=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.bd_megs)}</Option>);

                    }
                }
            }
            for(let i=0;i<ipaddress.length;i++){
                ipaddress_arr.push(<Option  key={ipaddress[i].url.split('/').pop()+':'+ipaddress[i].primary_address +' '+ipaddress[i].address}>{ipaddress[i].url.split('/').pop()+':'+ipaddress[i].primary_address +' '+ipaddress[i].address}</Option>);

            }
            for(let i=0;i<agentsId.length;i++){
                agentsId_arr.push(<Option  key={i+':'+agentsId[i].id+':'+agentsId[i].name}>{i+':'+agentsId[i].id+':'+agentsId[i].name}</Option>);
            }


            for(let i=0;i<agentsId.length;i++){
                if(agentsId[i].saved_grains != null){
                    if(agentsId[i].saved_grains.ipv4 != null){
                        for(let j=0;j<agentsId[i].saved_grains.ipv4.length;j++){
                            agentsIp_arr.push(<Option  key={agentsId[i].id + ':' +agentsId[i].saved_grains.ipv4[j]}>{agentsId[i].id + ':' +agentsId[i].saved_grains.ipv4[j]}</Option>);
                        }
                    }
                    
                }
            }

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
                         cc.push(agentsId[num].name+':' +'/dev/'+key+':'+agentsId[num].saved_grains.partitions[key]/1024 +'M');
                    }
                }else if(agentsId[num].saved_grains.kernel== 'Windows'){
                    if(windows!=null){
                        for(let key in windows){
                            // console.log(agentsId[num].name)

                            if(key.split(':').shift() !='A' && key.split(':').shift() !='B' && key.split(':').shift() !='C'){
                             cc.push(agentsId[num].name+':' +key.split(':').shift());
                            }
                        }
                    }
                }
                
            }else{
                    cc;
            }
        }

        return (
                <div>
                    <Modal ref="modal"
                        width = {800}
                        maskClosable={false}
                        visible={this.props.visible}
                        title="客户端2" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="previous"  size="large" onClick={this.getPreviousAgent.bind(this)}>上一步</Button>,
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
                            <Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this) }>
                                确定
                            </Button>

                        ]}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="本地id:"  {...formItemLayout}> 
                                <Select  onBlur ={this.onFieldsChange.bind(this)} {...getFieldProps('local_agentid', {initialValue: visible==false?'':this.props.form.getFieldsValue().local_agentid}) } >
                                    {agentsId_arr}
                                </Select>
                            </FormItem>
                            <FormItem label="本地ip:"  {...formItemLayout}>
                                <Select  {...getFieldProps('local_agentaddress', {initialValue: visible==false?'':this.props.form.getFieldsValue().local_agentaddress}) } >
                                    {agentsIp_arr}
                                </Select>
                            </FormItem>
                            <FormItem label="镜像名字:"  {...formItemLayout}>
                                <Input  {...getFieldProps('local_agentvolumename',{initialValue: visible==false?'':this.props.form.getFieldsValue().local_agentvolumename}) } />
                            </FormItem>
                            
                            <FormItem label="本地设备号:"  {...formItemLayout}>
                                <Input {...getFieldProps('local_agentdrbdminor',{initialValue: visible==false?'':this.props.form.getFieldsValue().local_agentdrbdminor}) } />
                                
                            </FormItem>
                            
                            <FormItem label="本地卷:"  {...formItemLayout}>
                                <Select {...getFieldProps('mir_dest_volumeid', {initialValue: visible==false?'':this.props.form.getFieldsValue().mir_dest_volumeid}) } >
                                    {arr}
                                </Select>
                                

                            </FormItem>
                            <FormItem label="本地块设备:"  {...formItemLayout}>
                                <AutoComplete
                                    dataSource={cc}
                                    {...getFieldProps('local_agentdepath', {initialValue: visible==false?'':this.props.form.getFieldsValue().local_agentdepath}) }  
                                />
                            </FormItem>
                            <FormItem label="元设备:"  {...formItemLayout}>
                                
                                <AutoComplete
                                    dataSource={cc}
                                    {...getFieldProps('mir_local_source_metadisk', {initialValue: visible==false?'':this.props.form.getFieldsValue().mir_local_source_metadisk}) }  
                                />
                                <div className='create_mirror_volume' onClick={this.createmirrorChange.bind(this)} >+</div>

                            </FormItem>
                            <FormItem label="IP编号:"  {...formItemLayout}>
                                <Select {...getFieldProps('mir_dest_localaddress', {onBlur:this.agentdrbdminer.bind(this)}) } >
                                    {ipaddress_arr}
                                </Select>
                            </FormItem>

                        </Form>

                    </Modal>
                </div>
        );

    }

 

}



Localoragent.propTypes = {
    onOk: PropTypes.func.isRequired

};
export default createForm({
    mapPropsToFields (props) {
        return {
            
            local_agentid:{name:'local_agentid'},
            local_agentaddress:{name:'local_agentaddress'},
            local_agentvolumename:{name:'local_agentvolumename'},
            local_agentdepath:{name:'local_agentdepath'},
            local_agentdrbdminor:{name:'local_agentdrbdminor'},
            mir_local_source_metadisk:{name:'mir_local_source_metadisk'},
            mir_dest_volumeid:{name:'mir_dest_volumeid'},
            mir_dest_localaddress:{name:'mir_dest_localaddress'},
        }
    }
})(Localoragent);

/*<div className='create_mirror_volume' onClick={this.createmirrorChange.bind(this)} >+</div>*/