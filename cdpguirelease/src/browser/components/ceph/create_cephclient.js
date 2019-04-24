import React, {Component, PropTypes} from 'react';
import {Modal, Form, Button, Input,Select,AutoComplete} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateCephclient extends Component {
    handleSubmit() {
        this.props.onOk(
            {
                'cluster': this.props.form.getFieldsValue().cluster,
                'host': this.props.form.getFieldsValue().host
            })
    }

    render() {
        const {cephclients,host} = this.props
        const clusterArr=[];
        const hostArr = [];
        if(cephclients.cephclusters!=undefined){
            for(let i=0;i<host.length;i++){
                hostArr.push(<Option key={host[i].url}>{host[i].name}</Option>)
            }
            for(let i=0;i<cephclients.cephclusters.length;i++){
                clusterArr.push(<Option key={cephclients.cephclusters[i].url}>{cephclients.cephclusters[i].url.split('//')[1]}</Option>)
            }
        }


        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Modal ref="modal"
                    visible={this.props.visible}
                    width={450}
                    closable={false}

                    title="创建集群客户端" onOk={this.handleSubmit.bind(this) } onCancel={this.props.onCancel}
                    >
                    <Form layout='horizontal'>
                        <FormItem label="集群"  {...formItemLayout}>
                            <Select {...getFieldProps('cluster', {})} >
                               {clusterArr}
                            </Select>
                        </FormItem>
                        <FormItem label="客户端"  {...formItemLayout}>
                            <Select {...getFieldProps('host', {})} >
                                {hostArr}
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
            host: {name: 'host'}
        }
    }
})(CreateCephclient);