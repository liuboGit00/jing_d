import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class CreateRemotemirrors extends Component {
    handleSubmit() {
        const {remotemirrors} =this.props
        if(remotemirrors.update_remotemirror_modal){
            this.props.onOk({
                'operation':'updateremotemirror',
                'id':remotemirrors.selectedRemotemirrors[0].id,
                'updatesrcHost':this.props.form.getFieldsValue().updatesrcHost,
                'updatedstHost':this.props.form.getFieldsValue().updatedstHost,
                'updatesrcvolid':this.props.form.getFieldsValue().updatesrcvolid,
                'updatedstvolid':this.props.form.getFieldsValue().updatedstvolid,
                'updatedstport':this.props.form.getFieldsValue().updatedstport,
                'updategzip':this.props.form.getFieldsValue().updategzip,
                'updatemax_snap':this.props.form.getFieldsValue().updatemax_snap,
                'updatestarted':this.props.form.getFieldsValue().updatestarted=='true'?true:false,
            })
        }else{
            this.props.onOk({
                'srcHost':this.props.form.getFieldsValue().srcHost.split(':')[0],
                'dstHost':this.props.form.getFieldsValue().dstHost.split(':')[0],
                'srcvolid':this.props.form.getFieldsValue().srcvolid.split(':')[0],
                'dstvolid':this.props.form.getFieldsValue().dstvolid.split(':')[0],
                'dstport':this.props.form.getFieldsValue().dstport,
                'gzip':this.props.form.getFieldsValue().gzip,
                'max_snap':this.props.form.getFieldsValue().max_snap,
                'started':this.props.form.getFieldsValue().started=='true'?true:false,
                'operation':'createremotemirror',
            })
        }
        
    }

    render() {
        const { getFieldProps } = this.props.form;
        const {hosts,volumes,remotemirrors,hostName,user} = this.props;
        // console.log(hosts)
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const srcHostArr=[]
        const volumeArr = [];
        const volumeArrS = [];
        if(hosts!=''){
            // console.log(user)
            srcHostArr.push(<Option key={hosts[(hosts.length)-1].id+':'+hosts[(hosts.length)-1].name+':'+hosts[(hosts.length)-1].hosturl} value={hosts[(hosts.length)-1].id+':'+hosts[(hosts.length)-1].name+':'+hosts[(hosts.length)-1].url.split('/host')[0]}>{hosts[(hosts.length)-1].name}</Option>);
        }
        
        for (let i = 0; i < hosts.length; i++) {
        // console.log(hostName)

            if(hostName==hosts[i].name){

                // console.log(hosts[i])
                srcHostArr.push(<Option key={hosts[i].id+':'+hosts[i].name+':'+hosts[i].hosturl} value={hosts[i].id+':'+hosts[i].name+':'+hosts[i].hosturl}>{hosts[i].name}</Option>)
            }
        }

        if(remotemirrors.localvolume!=undefined && remotemirrors.localvolume.length>=1){
            
            for (let j=0;j<remotemirrors.localvolume.length;j++){
                for (let i = 0; i < remotemirrors.localvolume[j].length; i++) {
                    if(this.props.form.getFieldsValue().srcHost!=undefined){
                     console.log(this.props.form.getFieldsValue().srcHost)

                        let srcHostValue=this.props.form.getFieldsValue().srcHost.split('//')[1].split('/').length==4?this.props.form.getFieldsValue().srcHost.split('//')[1]:this.props.form.getFieldsValue().srcHost.split('//')[1]+'/'
                        if(remotemirrors.localvolume[j][i].native.type.model!='genericdisk'&&remotemirrors.localvolume[j][i].native.type.model!='connection'&&srcHostValue==remotemirrors.localvolume[j][0].url.split('//')[1].split('vo')[0]){
                            volumeArr.push(<Option key={remotemirrors.localvolume[j][i].id+':'+remotemirrors.localvolume[j][i].name+j+i} value={remotemirrors.localvolume[j][i].id+':'+remotemirrors.localvolume[j][i].name+j+i}>{i+'、'+(remotemirrors.localvolume[j][i].url.split('//')[1]).split('/volumes')[0]+':'+remotemirrors.localvolume[j][i].name}</Option>)
                        }
                    }
                }
            }
            for (let j=0;j<remotemirrors.localvolume.length;j++){
                for (let i = 0; i < remotemirrors.localvolume[j].length; i++) {
                     // console.log(this.props.form.getFieldsValue().dstHost)
                     // console.log(this.props.form.getFieldsValue().dstHost.split('//')[1].split('/').length)
                     // console.log(remotemirrors.localvolume[j][0].url.split('//')[1].split('vo')[0].split('/').length)
                    if(this.props.form.getFieldsValue().dstHost!=undefined){
                        console.log(this.props.form.getFieldsValue().dstHost)
                        let dstHostValue=this.props.form.getFieldsValue().dstHost.split('//')[1].split('/').length==4?this.props.form.getFieldsValue().dstHost.split('//')[1]:this.props.form.getFieldsValue().dstHost.split('//')[1]+'/'
                        
                        // console.log(remotemirrors.localvolume[j][0].url.split('//')[1].split('vo')[0])
                        if(remotemirrors.localvolume[j][i].native.type.model!='genericdisk'&&remotemirrors.localvolume[j][i].native.type.model!='connection'&&dstHostValue==remotemirrors.localvolume[j][0].url.split('//')[1].split('vo')[0]){
                            // console.log(remotemirrors.localvolume[j][i])
                            volumeArrS.push(<Option key={remotemirrors.localvolume[j][i].id+':'+remotemirrors.localvolume[j][i].name+j+i} value={remotemirrors.localvolume[j][i].id+':'+remotemirrors.localvolume[j][i].name+j+i}>{i+'、'+(remotemirrors.localvolume[j][i].url.split('//')[1]).split('/volumes')[0]+':'+remotemirrors.localvolume[j][i].name}</Option>)
                        }
                     }
                    
                   
                       
                }
            }
        }
            // console.log(JSON.parse(remotemirrors.selectedRemotemirrors[0].options))

        if(hosts!=''){
            if(remotemirrors.update_remotemirror_modal){
                return (<div>
                    <Modal 
                        closable={false}
                        visible={remotemirrors.update_remotemirror_modal}
                        title="修改远程镜像" onOk={this.handleSubmit.bind(this) } onCancel={this.props.closeUpdate}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="源主机"  {...formItemLayout}>
                                <Input disabled {...getFieldProps('updatesrcHost', {initialValue:remotemirrors.selectedRemotemirrors[0].srcHost}) } type="text"  />
                            </FormItem>
                            <FormItem label="目的主机"  {...formItemLayout}>
                                <Input disabled {...getFieldProps('updatedstHost', {initialValue:remotemirrors.selectedRemotemirrors[0].dstHost}) } type="text"  />
                            </FormItem>
                            <FormItem label="源卷"  {...formItemLayout}>
                                <Input disabled {...getFieldProps('updatesrcvolid', {initialValue:remotemirrors.selectedRemotemirrors[0].srcvolid}) } type="text"  />
                            </FormItem>
                            <FormItem label="目的卷"  {...formItemLayout}>
                                <Input disabled {...getFieldProps('updatedstvolid', {initialValue:remotemirrors.selectedRemotemirrors[0].dstvolid}) } type="text"  />
                            </FormItem>
                            <FormItem label="目的端口号"  {...formItemLayout}>
                                <Input disabled {...getFieldProps('updatedstport', {initialValue:remotemirrors.selectedRemotemirrors[0].id}) } type="text"  />
                            </FormItem>
                            <FormItem label="最多快照"  {...formItemLayout}>
                                <Input {...getFieldProps('updatemax_snap', {initialValue:JSON.parse(remotemirrors.selectedRemotemirrors[0].options).max_snap}) } type="text" placeholder="默认最大快照数为200" />
                            </FormItem>
                            <FormItem label="压缩"  {...formItemLayout}>
                                <Select {...getFieldProps('updategzip', {initialValue:JSON.parse(remotemirrors.selectedRemotemirrors[0].options).gzip+''}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="开启传输"  {...formItemLayout}>
                                <Select {...getFieldProps('updatestarted', {initialValue:remotemirrors.selectedRemotemirrors[0].is_started+''}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>);
            }else{
                return (<div>
                    <Modal 
                        closable={false}
                        visible={this.props.visible}
                        title="创建远程镜像" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="源主机"  {...formItemLayout}>
                                <Select {...getFieldProps('srcHost', {}) } >
                                    {srcHostArr}
                                </Select>
                            </FormItem>
                            <FormItem label="目的主机"  {...formItemLayout}>
                                <Select {...getFieldProps('dstHost', {}) } >
                                    {srcHostArr}
                                </Select>
                            </FormItem>
                            <FormItem label="源卷"  {...formItemLayout}>
    
                                <Select {...getFieldProps('srcvolid', {}) } >
                                    {volumeArr}
                                </Select>
                            </FormItem>
                            <FormItem label="目的卷"  {...formItemLayout}>
                                <Select {...getFieldProps('dstvolid', {}) } >
                                    {volumeArrS}
                                </Select>
                            </FormItem>
                            <FormItem label="目的端口号"  {...formItemLayout}>
                                <Input {...getFieldProps('dstport', {}) } type="text"  />
                            </FormItem>
                            <FormItem label="最多快照"  {...formItemLayout}>
                                <Input {...getFieldProps('max_snap', {}) } type="text" placeholder="默认最大快照数为200" />
                            </FormItem>
                            <FormItem label="压缩"  {...formItemLayout}>
                                <Select {...getFieldProps('gzip', {}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="开启传输"  {...formItemLayout}>
                                <Select {...getFieldProps('started', {initialValue:'true'}) } >
                                    <Option key='true' value="true">true</Option>
                                    <Option key='false' value="false">false</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>);
            }
            
        }else{
            return <div></div>
        }
    }
}

CreateRemotemirrors.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            srcHost:{name: 'srcHost'},
            dstHost:{name: 'dstHost'},
            srcvolid:{name: 'srcvolid'},
            dstvolid:{name: 'dstvolid'},
            dstport:{name: 'dstport'},
            gzip:{name: 'gzip'},
            max_snap:{name: 'max_snap'},
            started:{name:'started'},
            updatesrcHost:{name:'updatesrcHost'},
            updatedstHost:{name:'updatedstHost'},
            updatesrcvolid:{name:'updatesrcvolid'},
            updatedstvolid:{name:'updatedstvolid'},
            updatedstport:{name:'updatedstport'},
            updatemax_snap:{name:'updatemax_snap'},
            updategzip:{name:'updategzip'},
            updatestarted:{name:'updatestarted'},
        }
    }
})(CreateRemotemirrors);
