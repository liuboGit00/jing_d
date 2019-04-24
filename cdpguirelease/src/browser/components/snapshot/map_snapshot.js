import React, {Component, PropTypes} from 'react';
import {Modal, Form, Button, Input, Select, Switch,Radio} from 'antd'

class MapSnapshot extends Component {
    handleOk() {
        this.props.onOk(
            {
                'agt_name': this.refs.agt_name.value
            })
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const {agents} = this.props
        const FormItem = Form.Item
        const Option = Select.Option
        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        const RadioGroup = Radio.Group
        /*function getInitialState(){
            return{
                value:byhour,
            }
        }
        function onChange(e){
            console.log('radio checked',e.target.value);
            this.setState({
                value:e.target.value,
            })
        }*/
        return (
            <div>
                <Modal ref="modal"
                    closable={false}
                    visible={this.props.visible}
                    title="映射快照" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk.bind(this) }>
                            确 定
                        </Button>

                    ]}
                    >
                    <Form layout='horizontal' onSubmit={this.handleSubmit}>
                        <FormItem label="选择客户端"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Select ref='snp_agt'
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择客户端"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                onChange={handleChange}
                                >
                                {agents.map(agent => <option key={agent.id} value={agent.url}>{agent.name}</option>) }
                            </Select>
                        </FormItem>
                        <FormItem label="选择磁盘"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Select ref='snp_agt'
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择磁盘"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                onChange={handleChange}
                                >
                                {agents.map(agent => <option key={agent.id} value={agent.url}>{agent.name}</option>) }
                            </Select>
                        </FormItem>
                        <FormItem label="日志"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Switch checkedChildren="开" unCheckedChildren="关" />（开启后自动捕捉操作动作）
                        </FormItem >
                        <FormItem label="时间调度"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <RadioGroup>
                            <Radio key={1} value="byhour">时控制</Radio>
                            <Radio key={2} value="byday">天控制</Radio>
                            <Radio key={3} value="byweek">周控制</Radio>
                            <Radio key={4} value="bymonth">月控制</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
                );
                }
                }

                MapSnapshot.propTypes = {

                };

                export default MapSnapshot;