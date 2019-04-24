import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message,notification ,AutoComplete } from 'antd';
import {close_raid,echo_create_raid_modal} from '../../actions/raidactions'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class ModifyPerm extends Component {

    handleSubmit() {
        console.log(this.props.form.getFieldsValue().permissions)
        this.props.onOk({
            'permissions':this.props.form.getFieldsValue().permissions,
        })
    }
    
    render() {
        const { getFieldProps} = this.props.form;
        const {users} = this.props;
      
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 },
        };
        
        // 
        const Arr = [];
        const perArr =['cmdlog.delete_auditentry'];
        const defArr =[];

        // console.log(users)
        
        if(users&&users.selectedRowKeys!=undefined){
            const id = users.selectedRowKeys
            for(let i=0;i<users.items.length;i++){ 
                if (users.items[i].id==id[0]&&users.items[i].permissions!='') {
                    // console.log(users.items[i].permissions)
                    if(users.items[i].is_superuser){
                        defArr.push(perArr)
                    }else{
                        defArr.push(users.items[i].permissions)
                    }
                    
                }
            }
        }

        for(let i=0;i<perArr.length;i++){
            Arr.push(<Option key={perArr[i]}>{perArr[i]}</Option>)
        }
        console.log(defArr[0])
            return (
                <div>
                    <Modal ref="modal"
                        closable={false}
                        visible={this.props.visible}
                        title="修改权限"  
                        onOk={this.handleSubmit.bind(this) } 
                        onCancel={this.props.onCancel}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="权限"  {...formItemLayout} style={{paddingTop:'25px'}}>
                                <Select  mode='multiple' {...getFieldProps('permissions',{initialValue:defArr[0]}) } >
                                	{Arr}
                                </Select>
                            </FormItem>
                            
                                
                           
                        </Form>

                    </Modal>
                </div>
             );
      
    }
}
ModifyPerm.propTypes = {
  // onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            permissions: {name: 'permissions'},
        }
    }
})(ModifyPerm);
