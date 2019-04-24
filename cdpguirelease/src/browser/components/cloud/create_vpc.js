import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form ,Checkbox,message} from 'antd';
import {select_all_volume_state,fetch_cloud_datacenter,fetch_cloud_datastore,
    fetch_cloud_network,fetch_cloud_resourcepool,fetch_cloud_host,} from '../../actions/cloudactions';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option



class CreateVPC extends Component {
    handleSubmit() {
        const {clouds}=this.props
        if(clouds.selectedClouds[0].cloudtype=='vmware'){
            let disk= this.props.form.getFieldsValue().devicename
            let diskArr=[]
            for(let i=0;i<disk.length;i++){
                diskArr.push({"devicename":disk[i]})
            }
            
            this.props.onOk({
                'name': this.props.form.getFieldsValue().name,
                'cpu': Number(this.props.form.getFieldsValue().cpu),
                'mme': Number(this.props.form.getFieldsValue().mme)*1048576,
                'bootide':this.props.form.getFieldsValue().bootide=='true'?true:false,
                'devicename':diskArr,
                'network':this.props.form.getFieldsValue().network,
                'host':this.props.form.getFieldsValue().host,
                'resourcepool':this.props.form.getFieldsValue().resourcepool,
                'datacenter':this.props.form.getFieldsValue().datacenter,
                'datastore':this.props.form.getFieldsValue().datastore,
                'type':'vmware',
                'id':clouds.selectedClouds[0].id,
            })
        }else{
            if(this.props.form.getFieldsValue().name&&this.props.form.getFieldsValue().kvmtype&&this.props.form.getFieldsValue().cpu&&this.props.form.getFieldsValue().mme&&this.props.form.getFieldsValue().volumes&&this.props.form.getFieldsValue().persist&&this.props.form.getFieldsValue().bootide){
                // console.log(this.props.form.getFieldsValue().name)
                const re = /^[a-zA-Z][a-zA-Z0-9_]+$/
                if(re.test(this.props.form.getFieldsValue().name)){
                    this.props.onOk({
                        'name': this.props.form.getFieldsValue().name,
                        'kvmtype': this.props.form.getFieldsValue().kvmtype,
                        'cpu': this.props.form.getFieldsValue().cpu,
                        'mme': this.props.form.getFieldsValue().mme,
                        'volumes':this.props.form.getFieldsValue().volumes,
                        'persist':this.props.form.getFieldsValue().persist,
                        'bootide':this.props.form.getFieldsValue().bootide,
                        'type':'local',
                    })
                }

            }else{
                message.error('请将信息填写完整')
            }
        }
			
    }
    componentDidMount() {
        const{dispatch,clouds}=this.props;
        let id = clouds.selectedClouds[0].id
        if( clouds.selectedClouds[0].cloudtype!='local'){
            if(!clouds.datacenter){
                 dispatch(fetch_cloud_datacenter(id))
            }
            if(!clouds.datastore){
                dispatch(fetch_cloud_datastore(id))
            }
            if(!clouds.network){
                dispatch(fetch_cloud_network(id)) 
            }
            if(!clouds.resourcepool){
                dispatch(fetch_cloud_resourcepool(id))
            }
            if(!clouds.list_host){
                dispatch(fetch_cloud_host(id)) 
            }
        }

        
        // console.log(clouds)
    }

    select_all_volume(e){
        const {dispatch} = this.props;
        dispatch(select_all_volume_state(e.target.checked))
    }
    checkAgentnameExist(rule, value, callback) {
        var parent=/^[a-zA-Z][A-Za-z0-9_]+$/;
        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('首字母为英文不可包含空格,中文和非法字符。'));
        }
    }
    render() {
        const {visible,clones,volumes,clouds,list_lun} = this.props
        console.log(clouds)
        // console.log(clouds.datacenter)
        // console.log(clouds.network)
        // console.log(clouds.resourcepool)
        // console.log(clouds.list_lun)
        const datastoreType= clouds.selectedClouds[0].cloudtype;
        const datacenterType= clouds.selectedClouds[0].cloudtype;
        const networkType= clouds.selectedClouds[0].cloudtype;
        const resourcepoolType= clouds.selectedClouds[0].cloudtype;
        const datastoreName= clouds.selectedClouds[0].name;
        const datacenterName= clouds.selectedClouds[0].name;
        const networkName= clouds.selectedClouds[0].name;
        const resourcepoolName= clouds.selectedClouds[0].name;
        let datastoreStr=null;
        let datacenterStr=null;
        let networkStr=null;
        let resourcepoolStr=null;
        let datastoreArr=[];
        let datacenterArr=[];
        let networkArr=[];
        let resourcepoolArr=[];
        let hostArr=[];
        let deviceArr = [];
        console.log(clouds.list_host,clouds.list_lun)
        if(datastoreType!='local'){
            if(clouds.list_host&&clouds.list_lun){
                let str = clouds.list_lun[datastoreName][datastoreType];
                for(let i=0;i<clouds.list_host.length;i++){
                    let host =(clouds.list_host)[i]
                    host = str[host]
                    for(let j=0;j<host.length;j++){
                            deviceArr.push(<Option key={host[j].deviceName}>{host[j].deviceName}</Option>)
                            for(let m=0;m<volumes.items.length;m++){
                                if(volumes.items[m].uuid.split('-').join('').slice(0,25)==host[j].uuid.slice(17,42)){
                                    // console.log(host[j])
                                    deviceArr.splice(j,1,<Option key={host[j].deviceName}>{volumes.items[m].name}</Option>)
                                }
                               
                            }            
    
                    }
                }
            }
            if(clouds.datastore&&clouds.datastore!=''&&clouds.datastore!=undefined){
                 datastoreStr=clouds.datastore[datastoreName][datastoreType];
                for (let i=0;i<datastoreStr.Datastores.length;i++){
                    datastoreArr.push(<Option key={datastoreStr.Datastores[i]}>{datastoreStr.Datastores[i]}</Option>)
                }
            }
            if(clouds.datacenter&&clouds.datacenter!=''&&clouds.datacenter!=undefined){
                 datacenterStr=clouds.datacenter[datacenterName][datacenterType];
                // console.log(datacenterStr.Datacenters)
                for (let i=0;i<datacenterStr.Datacenters.length;i++){
                    datacenterArr.push(<Option key={datacenterStr.Datacenters[i]}>{datacenterStr.Datacenters[i]}</Option>)
                }
            }
            if(clouds.network&&clouds.network!=''&&clouds.network!=undefined){
                 networkStr=clouds.network[networkName][networkType];
                for (let i=0;i<networkStr.Networks.length;i++){
                    networkArr.push(<Option key={networkStr.Networks[i]}>{networkStr.Networks[i]}</Option>)
                }
            }
            if(clouds.resourcepool&&clouds.resourcepool!=''&&clouds.resourcepool!=undefined){
                 resourcepoolStr=clouds.resourcepool[resourcepoolName][resourcepoolType];
                 // console.log(resourcepoolStr)
                 // console.log(resourcepoolStr['Resource Pools'])
                for (let i=0;i<resourcepoolStr['Resource Pools'].length;i++){
                    resourcepoolArr.push(<Option key={resourcepoolStr['Resource Pools'][i]}>{resourcepoolStr['Resource Pools'][i]}</Option>)
                }
            } 
            if(clouds.list_host){
                for(let i=0;i<clouds.list_host.length;i++){
                    // console.log((clouds.list_host)[i])
                    hostArr.push(<Option key={(clouds.list_host)[i]}>{(clouds.list_host)[i]}</Option>)
                    // console.log(hostArr)
                }
            }    
        }

        const arr=[];
        if(volumes!= undefined){
            for(let i=0;i<volumes.items.length;i++){
                if(volumes.items[i].native.type.model == 'zvol'){
                    arr.push(volumes.items[i])
                }
            }
        }
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        // console.log(this.props.form.getFieldsValue().name)
        if(clouds.selectedClouds[0].cloudtype=='vmware'){
            return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    title="创建虚拟机" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel} >
                    <Form layout='horizontal'>
                        <FormItem label="虚拟机名称"  {...formItemLayout}>
                            <Input {...getFieldProps('name', {initialValue:this.props.form.getFieldsValue().name,rules:[{validator: this.checkAgentnameExist.bind(this)}]}) } type="text" id='name' />
                        </FormItem>
                        <FormItem label="硬盘组"  {...formItemLayout}>
                            <Select multiple {...getFieldProps('devicename', {}) } >
                                   {deviceArr} 
                            </Select>
                            
                        </FormItem>
                        <FormItem label="引导盘为IDE"{...formItemLayout}>
                           <Select {...getFieldProps('bootide', {initialValue:(this.props.form.getFieldsValue().bootide==undefined?'false':this.props.form.getFieldsValue().bootide)})} >
                                <Option  key='false' value='false'>false</Option>
                                <Option  key='true' value='true'>true</Option>
                           </Select>
                        </FormItem>
                        <FormItem label="网络配置"  {...formItemLayout}>
                            <Select  {...getFieldProps('network', {}) } >
                                {networkArr}
                            </Select>
                        </FormItem>
                        <FormItem label="宿主机名"  {...formItemLayout}>
                            <Select  {...getFieldProps('host', {}) } >
                                {hostArr}
                            </Select>
                        </FormItem>
                        <FormItem label="源存储池"  {...formItemLayout}>
                            <Select  {...getFieldProps('resourcepool', {}) } >
                                {resourcepoolArr}
                            </Select>
                        </FormItem>
                        <FormItem label="中心数据"  {...formItemLayout}>
                            <Select  {...getFieldProps('datacenter', {}) } >
                                {datacenterArr}
                            </Select>
                        </FormItem>
                        <FormItem label="数据库"  {...formItemLayout}>
                            <Select  {...getFieldProps('datastore', {}) } >
                                {datastoreArr}
                            </Select>
                        </FormItem>
                        <FormItem label="CPU数量"  {...formItemLayout}>
                            <InputNumber {...getFieldProps('cpu', {initialValue:(this.props.form.getFieldsValue().cpu==undefined?'2':this.props.form.getFieldsValue().cpu)}) } type="text" id='cpu' />
                        </FormItem>
                        <FormItem label="内存数量"  {...formItemLayout}>
                            <InputNumber {...getFieldProps('mme', {initialValue:(this.props.form.getFieldsValue().mme==undefined?'1':this.props.form.getFieldsValue().mme)}) } type="text" id='mme' />G
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
        }else{
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="创建虚拟机" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel} >
                        <Form layout='horizontal'>
                            <FormItem label="虚拟机名称"  {...formItemLayout}>
                                <Input {...getFieldProps('name', {initialValue:this.props.form.getFieldsValue().name,rules:[{validator: this.checkAgentnameExist.bind(this)}]}) } type="text" id='name' />
                            </FormItem>
                            <FormItem label="虚拟机格式"  {...formItemLayout}>
                               <Select {...getFieldProps('kvmtype', {initialValue:(this.props.form.getFieldsValue().kvmtype==undefined?'kvm':this.props.form.getFieldsValue().kvmtype)})} >
                                    <Option  key='qemu' value='qemu'>qemu</Option>
                                    <Option  key='kvm' value='kvm'>kvm</Option>
                               </Select>
                            </FormItem>
                            <FormItem label="是否持久"  {...formItemLayout}>
                               <Select {...getFieldProps('persist', {initialValue:(this.props.form.getFieldsValue().persist==undefined?'false':this.props.form.getFieldsValue().persist)})} >
                                    <Option  key='false' value = 'false'>false</Option>
                                    <Option  key='true' value = 'true'>true</Option>
                               </Select>
                            </FormItem>
                            <FormItem label="引导盘为IDE"{...formItemLayout}>
                               <Select {...getFieldProps('bootide', {initialValue:(this.props.form.getFieldsValue().bootide==undefined?'false':this.props.form.getFieldsValue().bootide)})} >
                                    <Option  key='false' value='false'>false</Option>
                                    <Option  key='true' value='true'>true</Option>
                               </Select>
                            </FormItem>
                            <FormItem label="CPU数量"  {...formItemLayout}>
                                <InputNumber {...getFieldProps('cpu', {initialValue:(this.props.form.getFieldsValue().cpu==undefined?'2':this.props.form.getFieldsValue().cpu)}) } type="text" id='cpu' />
                            </FormItem>
                            <FormItem label="内存数量"  {...formItemLayout}>
                                <InputNumber {...getFieldProps('mme', {initialValue:(this.props.form.getFieldsValue().mme==undefined?'1':this.props.form.getFieldsValue().mme)}) } type="text" id='mme' />G
                            </FormItem>
                            <FormItem label="硬盘卷"  {...formItemLayout}>
                                <Select multiple {...getFieldProps('volumes', {}) } >
                                    {clouds.allvolume == true?volumes.items.map(clone => <Option  key={clone.id} >{clone.name}</Option>):clones.map(clone => <Option  key={clone.id} >{clone.name}</Option>)}
                                </Select>
                                
                            </FormItem>
                            <Checkbox className='vpc_checkbox' onChange={this.select_all_volume.bind(this,)}>所有卷</Checkbox>
                        </Form>
                    </Modal>
                </div>
            );
        }
        
    }
}

CreateVPC.propTypes = {

};

export default createForm({
    mapPropsToFields(props) {
        return {
            name: { name: 'name' },
            kvmtype: { name: 'kvmtype' },
            cpu: { name: 'cpu' },
            mme: { name: 'mme' },
            volumes: {name: 'volumes'},
            persist:{name:'persist'},
            bootide:{name:'bootide'},
            devicename:{name:'devicename'},
            network:{name:'network'},
            host:{name:'host'},
            resourcepool:{name:'resourcepool'},
            datacenter:{name:'datacenter'},
            datastore:{name:'datastore'},
        }
    }
})(CreateVPC);
