import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input,Form,Select} from 'antd';
import {agents} from '../../constants/test'
const createForm = Form.create;
const FormItem = Form.Item;
Option = Select.Option
class SelectAgentUrl extends Component {
    handleOk() {
        if(this.props.form.getFieldsValue().url != undefined){
            this.props.onOk(
            {
                'url': this.props.form.getFieldsValue().url,
            })
        }
        
               
               
    }


    render() {
        const {mirrors} = this.props
        const {getFieldProps} = this.props.form
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19},
        };
        var url=[];
        for(let i=0;i<mirrors.items.length;i++){
            if(mirrors.modifyagentid == mirrors.items[i].id){
                // console.log(mirrors.items[i].getagentendpoint)
                for(let j=0;j<mirrors.items[i].getagentendpoint.length;j++){
                    // console.log(mirrors.items[i].getagentendpoint[j])
                    url.push(<Option key={mirrors.items[i].getagentendpoint[j].url} value={mirrors.items[i].getagentendpoint[j].url}>{mirrors.items[i].getagentendpoint[j].url}</Option>)
                }
            }
        }
        // console.log(url)

        return (
            <div>
                <Modal ref="modal"
                    width = {450}
                    closable={false}
                    visible={this.props.visible}
                    title="修改客户端信息" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk.bind(this) }>
                            确 定
                        </Button>

                    ]}
                    >
                    <Form layout='horizontal' style={{paddingTop:40,paddingBottom:10}}>
                        <FormItem  label="路径" {...formItemLayout}>
                            <Select {...getFieldProps('url',{})}  >
                                {url}
                            </Select>
                        </FormItem>
                        
                    </Form>

                </Modal>
            </div>
        );
    }
}

SelectAgentUrl.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default createForm({
    mapPropsToFields (props) {
        return {
            url:{name:'url'},

        }
    }
})(SelectAgentUrl);
