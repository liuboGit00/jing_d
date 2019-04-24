import React, {Component, PropTypes} from 'react';
import { Modal, Button,Input } from 'antd';
import {agents} from '../../constants/test'

class ModifyAgent extends Component {
    handleOk() {
        this.props.onOk(this.refs)
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const {selectedAgents} = this.props
        //选择一个agent进行修改
        var selectedAgent = agents.items[0];
        return (
            <div>
                <Modal ref="modal"
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
                    <table width="300" height="150">
                        <tbody>
                            <tr>
                                <td>编号：</td>
                                <td>{selectedAgent.id}</td>
                            </tr>
                            <tr>
                                <td>客户端名称：</td>
                                <td><Input ref="agt_name" defaultValue={selectedAgent.name} /></td>
                            </tr>
                            <tr>
                                <td>IP地址：</td>
                                <td><Input ref='agt_ip' defaultValue={selectedAgent.ip} /></td>
                            </tr>
                            <tr>
                                <td>端口：</td>
                                <td><Input ref='agt_port' defaultValue={selectedAgent.port} /></td>
                            </tr>
                            <tr>
                                <td>initiator：</td>
                                <td><Input ref='agt_ini' defaultValue={selectedAgent.initiator} /></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            </div>
        );
    }
}

ModifyAgent.propTypes = {
    //onOk: PropTypes.func.isRequired
};

export default ModifyAgent;