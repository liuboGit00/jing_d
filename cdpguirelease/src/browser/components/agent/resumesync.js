import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select,Form} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;


class Resumesync extends Component {
    
    handleOk() {
        const{mirror_id,agentid}=this.props;
        // console.log( agentid)
       this.props.onOk(
            {
                'id':mirror_id,
                'agentid':this.props.form.getFieldsValue().agentid,

            })

    }

    
    render() {
        const {visible,agentid,agentname} = this.props;
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10},
        };
        // console.log(agentname)
        let selsctArr=[];
        if(agentid !=undefined&&agentid !=''){
            const arr = agentid.split(',');
            const nameArr = agentname.split(',')
            
            for(let i=0;i<arr.length;i++){
                selsctArr.push(<Option key={arr[i]}>{nameArr[i]}</Option>)
            }
           
        }
         return (
                <div>
                    <Modal ref="modal"
                        width = {400}
                        closable={false}
                        
                        visible={this.props.visible}
                        title="继续同步" onOk={this.props.onOk} onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                            <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this) }>
                                确 定
                            </Button>
                        ]}
                        >
                        <Form layout='horizontal'>
                            <FormItem style={{marginTop:20}} label="客户端" {...formItemLayout}>
                                <Select  {...getFieldProps('agentid',{})}  >
                                   {selsctArr}
                                </Select>
                            </FormItem>
                            
                        </Form>
                    </Modal>
                </div>
            );
    }
}


Resumesync.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            agentid:{name:'agentid'},
        }
    }
})(Resumesync);