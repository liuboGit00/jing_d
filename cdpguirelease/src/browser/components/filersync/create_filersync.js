import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message } from 'antd';
import {close_filersync,} from '../../actions/filersyncaction'

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
var vpath ='';
class CreateFilersync extends Component {

    handleSubmit() {
        this.props.form.validateFields((err,value)=>{
            if(err){
                console.log(err)
            }else{
                this.props.onOk({
                    'name':this.props.form.getFieldsValue().name,
                    'path':this.props.form.getFieldsValue().path,
                    'comment':this.props.form.getFieldsValue().comment,
                    'volume':this.props.form.getFieldsValue().volume,

                })
                vpath='' 
            }
        })
        
    }
    onCancel(){
        const{dispatch}=this.props
        dispatch(close_filersync())
        vpath=''
    }
    checkVolumeName(rule, value, callback) {
        const parent=/^[A-Za-z0-9]+$/;
        if(value && parent.test(value)){
            callback();
        }else{
            callback(new Error('不可包含空格和中文以及特殊字符'));
        }
        const {items} = this.props;
            // console.log(items)

        if(value != undefined){
            for(let i=0;i<items.length;i++){

                if(value === items[i].name){
                    message.error('节点名已被使用')
                }
            }
        }
    }
    getPath(rule, value, callback){
        const {volumes} = this.props;
        var url=this.props.form.getFieldsValue().volume
        if(url !=''&&volumes!=''){
        for(let i=0;i<volumes.length;i++){
                 if(url == volumes[i].url){
                    vpath = volumes[i].native.path
                 }
            }
        }
        callback()
       
    }
    render() {
        const { getFieldProps} = this.props.form;
        const { volumes,se,echo} = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };

        var volumeArr=[];
        var fileArr = [];
        if(volumes!=''){
            for(let i=0;i<volumes.length;i++){
                if(volumes[i].native.type.model == 'zfs'){
                    volumeArr.push(volumes[i])
                }
            }
            console.log(volumeArr)

            for(let i=0;i<volumeArr.length;i++){
                fileArr.push(<Option key={i} value={volumeArr[i].url}>{volumeArr[i].name}</Option>)
            }
        }
        if(echo =='echo'){
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="增加同步节点" onOk={this.handleSubmit.bind(this) } onCancel={this.onCancel.bind(this)}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="名字"  {...formItemLayout}>
                                <Input {...getFieldProps('name',{rules:[{max:25,message:'名字不能超过25个字符'},{ validator: this.checkVolumeName.bind(this) }]}) } type="text"  />
                            </FormItem>
                            <FormItem label="卷名"  {...formItemLayout}>
                                <Select {...getFieldProps('volume', {rules:[{ validator: this.getPath.bind(this) }]}) } >
                                    {fileArr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="地址"  {...formItemLayout}>
                                <Input {...getFieldProps('path',{  initialValue: vpath }) } />
                            </FormItem>
                            <FormItem label="注释"  {...formItemLayout}>
                                <Input {...getFieldProps('comment',{}) } />
                            </FormItem>
                            
                                
                           
                        </Form>

                    </Modal>
                </div>
            );
        
        }else if(se!='' && se!=undefined){
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="修改同步节点" onOk={this.handleSubmit.bind(this) } onCancel={this.onCancel.bind(this)}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="名字"  {...formItemLayout}>
                                <Input {...getFieldProps('name',{rules:[{ validator: this.checkVolumeName.bind(this) }],initialValue: se.name}) } type="text"  />
                            </FormItem>
                            <FormItem label="卷名"  {...formItemLayout}>
                                <Select {...getFieldProps('volume', {rules:[{ validator: this.getPath.bind(this) }],initialValue: se.volume}) } >
                                    {fileArr}
                                </Select>
                            </FormItem>
                            
                            <FormItem label="地址"  {...formItemLayout}>
                                <Input {...getFieldProps('path',{ initialValue: vpath==''?se.path:vpath}) } />
                            </FormItem>
                            <FormItem label="注释"  {...formItemLayout}>
                                <Input {...getFieldProps('comment',{initialValue: se.comment}) } />
                            </FormItem>
                            
                                
                           
                        </Form>

                    </Modal>
                </div>
            );
        }else{
            return(<div></div>)
        }


    }
}

CreateFilersync.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            name: {name: 'name'},
            path: {name: 'path'},
            comment: {name: 'comment'},
            volume: {name: 'volume'},


        }
    }
})(CreateFilersync);