import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,notification ,message,Form,Input,AutoComplete} from 'antd';
import { Link} from 'react-router'
import {close_agent_agentorlocal_modal,echo_create_mirror_modal,get_previous_agent} from '../../actions/mirroraction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option


class Agentorlocal extends Component {
    handleOk() {        
        const re=/^[a-zA-Z][a-zA-Z0-9]*$/;
        const {agentorlocal} = this.props;
        if(!re.test(this.props.form.getFieldsValue().agentvolumename)){
            message.error('用户名必须由英文字母开头由数字或英文字母字符串组成！')
        }else if(this.props.form.getFieldsValue().mir_dest_volumeid == this.props.form.getFieldsValue().mir_local_source_metadisk){
             message.error('本地端块设备和本地端元设备卷重复，请重新选择卷')
        }else if(
                this.props.form.getFieldsValue().mir_dest_volumeid !=undefined&&
                this.props.form.getFieldsValue().mir_dest_localaddress !=undefined
            ){
                let agentsize=agentorlocal.mir_source_agentdepath.split(':')[2];
                let localsize = this.props.form.getFieldsValue().mir_dest_volumeid.split(':').pop();
                const screenArr = {"M":1,"G":1024,"T":1048576}
                // console.log(agentsize,localsize)
                let agentsizechild
                let localsizechild
                for(let i in screenArr){
                    if(agentsize.slice(-1)==i){
                        agentsizechild=parseInt(agentsize)*screenArr[i]
                        
                    }
                    if(localsize.slice(-1)==i){
                        localsizechild=parseInt(localsize)*screenArr[i]
                    }
                }
                console.log(localsizechild,agentsizechild)

                console.log(localsizechild-agentsizechild>=0)
                if(localsizechild-agentsizechild>=0){
                    this.props.onOk({
                        'mir_dest_volumeid': (this.props.form.getFieldsValue().mir_dest_volumeid.split(' ').shift()).split(':').pop(),
                        'mir_dest_localaddress': this.props.form.getFieldsValue().mir_dest_localaddress,
                        'mir_dest_metadisk': this.props.form.getFieldsValue().mir_local_source_metadisk ==undefined?'': (this.props.form.getFieldsValue().mir_local_source_metadisk.split(' ').shift()).split(':').pop(),
                        'drbdenable':true,
                    });
                }else{
                    message.error('本地盘小于源端块设备')
                }

            
            
        }
        
    }
    createmirrorChange(){
        this.props.mirrorVolume()
    }
    agentdrbdminer(){
        const{items}=this.props;
        for(let i=0;i<items.length;i++){
            if(this.props.form.getFieldsValue().agentid.split(':').pop() == items[i].getagentendpoint.address){
                return message('设备号已被使用')
            }

        }
    }
    getPreviousAgent(){
        const{dispatch}=this.props;
        dispatch(close_agent_agentorlocal_modal());
        dispatch(echo_create_mirror_modal());
        dispatch(get_previous_agent())
    }

    render() {
        const {visible,items,select,ipaddress,agentorlocal} = this.props;
       // console.log(select)

        const volumesArr=select.filter(function(item){return((item.native.is_volumepool!=true&&item.native.type.model!='genericdisk'))},select)
        // console.log(volumesArr) 
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const { getFieldProps} = this.props.form;
        const arr=[];
        const ipaddress_arr =[];
        if(ipaddress != undefined){

            for (let i = 0; i < volumesArr.length; i++) {
                if(volumesArr[i].native.type.model !='zfs'){
                    if(volumesArr[i].native.type.model=='logdevice'){
                        arr.push(<Option  key={'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].megs+'M')}>{'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].usage.size_text=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.size_text)}</Option>);

                    }else{
                        arr.push(<Option  key={'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].usage.bd_megs=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.bd_megs)}>{'id:'+volumesArr[i].id +"  "+ '名字:'+volumesArr[i].name +"  "+  '大小:'+(volumesArr[i].usage.bd_megs=='unknown'?volumesArr[i].megs+'M':volumesArr[i].usage.bd_megs)}</Option>);

                    }
                } 
            }
            for(let i=0;i<ipaddress.length;i++){
                ipaddress_arr.push(<Option  key={ipaddress[i].url.split('/').pop()}>{ipaddress[i].url.split('/').pop()+':'+ipaddress[i].primary_address +' '+ipaddress[i].address}</Option>);
            }
            

        }
        return (
                <div>
                    <Modal ref="modal"
                        width = {600}
                        maskClosable={false}
                        visible={this.props.visible}
                        title="本地" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="previous"  size="large" onClick={this.getPreviousAgent.bind(this)}>上一步</Button>,
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
                            <Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this) }>
                                确定
                            </Button>
                        ]}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="本地端块设备:"  {...formItemLayout}>
                                <Select {...getFieldProps('mir_dest_volumeid', {}) } >
                                    {arr}
                                </Select>
                                <div className='create_mirror_volume' onClick={this.createmirrorChange.bind(this)} >+</div>
                            </FormItem>
                            <FormItem label="本地元设备:"  {...formItemLayout}>
                                <Select {...getFieldProps('mir_local_source_metadisk', {}) } >
                                    {arr}
                                </Select>
                                <div className='create_mirror_volume' onClick={this.createmirrorChange.bind(this)} >+</div>
                            </FormItem>
                            <FormItem label="本地IP编号:"  {...formItemLayout}>
                                <Select {...getFieldProps('mir_dest_localaddress', {}) } >
                                    {ipaddress_arr}
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
        ); 
    }
}
Agentorlocal.propTypes = {
    onOk: PropTypes.func.isRequired

};
export default createForm({
    mapPropsToFields (props) {
        return {
            mir_local_source_metadisk:{name:'mir_local_source_metadisk'},
            mir_dest_volumeid:{name:'mir_dest_volumeid'},
            mir_dest_localaddress:{name:'mir_dest_localaddress'},
        }
    }
})(Agentorlocal);
                    
