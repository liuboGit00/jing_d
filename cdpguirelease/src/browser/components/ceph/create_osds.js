import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message,notification ,AutoComplete } from 'antd';
import {close_create_osds} from '../../actions/cephaction'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
var vpath ='';
class CreateOsds extends Component {

    handleSubmit() {
        if(
    		this.props.form.getFieldsValue().cluster !=undefined&&
            this.props.form.getFieldsValue().volume !=undefined&&
            this.props.form.getFieldsValue().logvolume !=undefined
    		){
    		this.props.onOk({
            'cluster':this.props.form.getFieldsValue().cluster,
            'volume':this.props.form.getFieldsValue().volume,
            'logvolume':this.props.form.getFieldsValue().logvolume,
	        })

    	}
        
    }
    
    onCancel(){
        const{dispatch}=this.props
        dispatch(close_create_osds())
    }

    render() {
        const { getFieldProps} = this.props.form;
        const { volumes,cluster} = this.props;
      // console.log(volumes)
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const Arr=[]
        const clusterArr=[]
        if(cluster){
            for(let i=0;i<cluster.length;i++){
                clusterArr.push(<Option key={cluster[i].url} value={cluster[i].url}>{cluster[i].name}</Option>)
            }
        }
        if(volumes!=''){
            // const volumesArr=volumes.filter(function(item){return(item.source_pool!=null)},volumes)
        	     	
            for(let i=0;i<volumes.length;i++){
                Arr.push(<Option key={volumes[i].url} value={volumes[i].url}>{volumes[i].name}</Option>)
            }

           
        }
       
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="创建集群硬盘节点"  onOk={this.handleSubmit.bind(this) } onCancel={this.onCancel.bind(this)}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="集群"  {...formItemLayout}>
                                <Select {...getFieldProps('cluster',{}) } >
                                    {clusterArr}
                                </Select>
                            </FormItem>
                            <FormItem label="卷设备"  {...formItemLayout}>
                                <Select {...getFieldProps('volume',{}) } >
                                	{Arr}
                                </Select>
                                
                            </FormItem>
                            <FormItem label="日志存储"  {...formItemLayout}>
                                <Select {...getFieldProps('logvolume',{}) } >
                                  	{Arr}
                                </Select>
                               
                            </FormItem>
                        </Form>

                    </Modal>
                </div>
             );
      
    }
}

export default createForm({
    mapPropsToFields (props) {
        return {
            cluster: {name: 'cluster'},
            volume :{name:'volume'},
            logvolume:{name:'logvolume'},
        }
    }
})(CreateOsds);
