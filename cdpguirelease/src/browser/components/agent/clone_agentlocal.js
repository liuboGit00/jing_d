import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Select,InputNumber,Form,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item
const Option = Select.Option

class Agentlocal extends Component {
    
    handleOk() {
        const{id}=this.props;
        this.props.onOk(
            {
                'id':id,
                'bs':this.props.form.getFieldsValue().bs,
                'offset': this.props.form.getFieldsValue().offset,
                'copysize': this.props.form.getFieldsValue().copysize,
            })

    } 

    
    render() {
        const { getFieldProps} = this.props.form;
        const {items,id,download} = this.props;
        let start=0;
        if(items.length>0 && download!=undefined){
            for(let i=0;i<items.length;i++){
                if(download[0] !=undefined){
                    // console.log((download[0].task.split('.').pop()).split('l'))
                    if(items[i].id == id && (download[0].task.split('.').pop()).split('l')[0] == 'c'&& (download[0].task.split('.').pop()).split('clone')[1] == 'job'){
                        start = items[i].clonepos
                        // console.log(start)
                        // console.log(items[i].getagentendpoint[0].agentDevsize)
                        if(start==items[i].getagentendpoint[0].agentDevsize){
                            start =0;
                        }
                    }else if((download[0].task.split('.').pop()).split('l')[0] == 'ntfsc'){
                            start =0;
                        }
                }

                // console.log(start)
            }
           
        }

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        // console.log(this.props.form.getFieldsValue().bs)
        // console.log(this.props.form.getFieldsValue().copysize)
        if(this.props.form.getFieldsValue().copysize=='partclone'){
            return (
                <div>
                    <Modal ref="modal"
                    visible={this.props.visible}
                    width={450}
                    closable={false}
                    title="数据传输" onOk={this.handleOk.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="复制类型"  {...formItemLayout}>
                            <Select {...getFieldProps('copysize',{}) } >
                                <Option key='dd' value="dd">dd</Option>
                                <Option key='ntfsclone' value="ntfsclone">ntfsclone</Option>
                                <Option key='windd' value="windd">windd</Option>
                                <Option key='partclone' value="partclone">partclone</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="起始位置"  {...formItemLayout}>
                            <Input disabled={true}  {...getFieldProps('offset',{initialValue:0}) } />
                        </FormItem>
                        
                        <FormItem label="块大小"  {...formItemLayout}>
                            <Select disabled={true} {...getFieldProps('bs',{initialValue:'1024'}) } >
                                <Option key='1024'  value="1024">1024</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Modal>
                </div>
                )
        }else{
            return(
                <div>
                    <Modal ref="modal"
                    visible={this.props.visible}
                    width={450}
                    closable={false}
                    title="数据传输" onOk={this.handleOk.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="复制类型"  {...formItemLayout}>
                            <Select {...getFieldProps('copysize',{initialValue:'dd'}) } >
                                <Option key='dd' value="dd">dd</Option>
                                <Option key='ntfsclone' value="ntfsclone">ntfsclone</Option>
                                <Option key='windd' value="windd">windd</Option>
                                <Option key='partclone' value="partclone">partclone</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="起始位置"  {...formItemLayout}>
                            <Input {...getFieldProps('offset',{  initialValue: start }) } />
                        </FormItem>
                        
                        <FormItem label="块大小"  {...formItemLayout}>
                            <Select  {...getFieldProps('bs',{initialValue:'512'}) } >
                                <Option key='512'   value="512">512</Option>
                                <Option key='1024'  value="1024">1024</Option>
                                <Option key='2048'  value="2048">2048</Option>
                                <Option key='4096'  value="4096">4096</Option>
                                <Option key='8192'  value="8192">8192</Option>
                                <Option key='16384' value="16384">16384</Option>
                                <Option key='32768' value="32768">32768</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Modal>
                </div>
                )
        }
    }
}
Agentlocal.propTypes = {
    onOk: PropTypes.func.isRequired
};
export default createForm({
    mapPropsToFields (props) {
        return {
            bs: {name: 'bs'},
            offset: {name: 'offset'},
            copysize: {name: 'copysize'},


        }
    }
})(Agentlocal);