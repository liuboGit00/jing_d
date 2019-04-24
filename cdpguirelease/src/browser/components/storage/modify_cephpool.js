import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select,message } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option
class ModifyCephpool extends Component {
    handleSubmit() {
        // console.log(this.props.form.getFieldsValue().size)
        const {items} = this.props;
        this.props.onOk({
            'id':this.props.form.getFieldsValue().id,
            'size':this.props.form.getFieldsValue().size,
            'min_size':this.props.form.getFieldsValue().min_size,
            'ceph_id':items[0].ceph_id,
            'cluster':items[0].cluster,
        })
    }

    render() {
        const { getFieldProps} = this.props.form;
        const {items} = this.props;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        if(items!=undefined&&items!=''){
            return (
                <div>
                    <Modal ref="modal"
                        width={450}
                        closable={false}
                        visible={this.props.visible}
                        title="修改集群存储池" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                        >
                        <Form layout='horizontal'>
                            <FormItem label="id"  {...formItemLayout}>
                                <Input disabled={true} {...getFieldProps('id',{initialValue:items[0].id}) } type="text"  />
                            </FormItem>
                           <FormItem label="默认副本数"  {...formItemLayout}>
                                <Input {...getFieldProps('size',{initialValue:items[0].size}) } type="text"  />
                            </FormItem>
                            <FormItem label="最小副本数"  {...formItemLayout}>
                                <Input {...getFieldProps('min_size',{initialValue:items[0].min_size}) } />
                            </FormItem>
                        </Form>

                    </Modal>
                </div>
            );
        }else{
            return <div></div>
        }
            

    }
}



export default createForm({
    mapPropsToFields (props) {
        return {
            size:{name: 'size'},
            min_size:{name:'min_size'},

        }
    }
})(ModifyCephpool);