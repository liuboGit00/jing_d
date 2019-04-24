import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,Form} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

Option = Select.Option

class Sync extends Component {
    
    handleOk() {
    	const{sync_id}=this.props;
        // console.log(this.props.form.getFieldsValue().add)
       this.props.onOk(
            {
               'sync_id':sync_id,
               'value': this.props.form.getFieldsValue().add

            })

    }

    
    render() {
        const {visible} = this.props;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return (
            <div>
                <Modal ref="modal"
                    width = {400}
                    closable={false}

                    visible={this.props.visible}
                    title="数据同步" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this) }>
                            同 步
                        </Button>
                    ]}
                    >
                    <Form layout='horizontal'>
                        <FormItem style={{marginTop:20}} label="同步方向" {...formItemLayout}>
                            <Select {...getFieldProps('add',{})} >
                                <Option style={{textIndent:15,}} key='agent' value='agent'>客户端</Option>
                                <Option style={{textIndent:15,}} key='local' value='local'>本地</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    
                </Modal>
          </div>
        );
    }
}



Sync.propTypes = {
    onOk: PropTypes.func.isRequired
};
export default createForm({
    mapPropsToFields (props) {
        return {
            add: {name: 'add'},
        }
    }
})(Sync);