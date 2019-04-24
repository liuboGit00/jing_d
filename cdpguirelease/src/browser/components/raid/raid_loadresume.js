import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message,notification ,AutoComplete } from 'antd';
import {close_create_raid_loadresume_modal,echo_create_raid_loadresume_modal} from '../../actions/raidactions'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
var vpath ='';
class RaidLoadresume extends Component {

    handleSubmit() {
    	const{id}=this.props;
    	if(this.props.form.getFieldsValue().sourcevolume == this.props.form.getFieldsValue().dstvolume){
    		message.error('原始卷和目标卷有重复，请重新选择卷')
    	}else if(
    		 this.props.form.getFieldsValue().sourcevolume !=undefined&&
             this.props.form.getFieldsValue().dstvolume !=undefined
    		){
    		this.props.onOk({
    		'id':id,
            'sourcevolume':this.props.form.getFieldsValue().sourcevolume.split('/').pop(),
            'dstvolume':this.props.form.getFieldsValue().dstvolume.split('/').pop(),
            'sync':this.props.form.getFieldsValue().sync,
	        })
	      vpath=''

    	}
        
    }
    
    onCancel(){
        const{dispatch}=this.props
        dispatch(close_create_raid_loadresume_modal())
        vpath=''
    }
    getPath(){
        const {volumes} = this.props;
        var url=this.props.form.getFieldsValue().volume
        console.log(url,'jh')
        if(url !=''&&volumes!=''){
        for(let i=0;i<volumes.length;i++){
                 if(url == volumes[i].url){
                    vpath = volumes[i].native.path
                 }

            }
        }
    }
    
    
    render() {
        const { getFieldProps} = this.props.form;
        const { volumes,se,echo,items,id} = this.props;
     // console.log(items,'iii')
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
     
        var fileArr = [];
        var rollArr = [];
        if(volumes!=''){
        	for (let i=0;i<volumes.length;i++){
        		if(volumes[i].native.type.model !== 'genericdisk'){
        			rollArr.push(<Option key={volumes[i].url} value={volumes[i].url}>{volumes[i].name}</Option>)
        		}
        	}
        	     	
            for(let i=0;i<volumes.length;i++){
                fileArr.push(<Option key={volumes[i].url} value={volumes[i].url}>{volumes[i].name}</Option>)
            }
           
        }
       
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="重新开始"  onOk={this.handleSubmit.bind(this) } onCancel={this.onCancel.bind(this)}
                        >
                        <Form horizontal>
                            <FormItem label="原始卷"  {...formItemLayout}>
                                <Select {...getFieldProps('sourcevolume',{}) } >
                                	{fileArr}
                                </Select>
                                
                            </FormItem>
                            <FormItem label="目标卷"  {...formItemLayout}>
                                <Select {...getFieldProps('dstvolume',{}) } >
                                  	{rollArr}
                                </Select>
                               
                            </FormItem>
                            
                            <FormItem label="是否同步"  {...formItemLayout}>
                                <Select {...getFieldProps('sync', {initialValue:'false'}) } >
                                    <Option key='true' value='true'>true</Option>
                                	<Option key='false' value='false'>false</Option>
                                </Select>
                        	</FormItem>
                                
                           
                        </Form>

                    </Modal>
                </div>
             );
      
    }
}
RaidLoadresume.propTypes = {
  // onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            sourcevolume :{name:'sourcevolume'},
            dstvolume:{name:'dstvolume'},
            sync:{name:'sync'},
        }
    }
})(RaidLoadresume);
