// import React, {Component, PropTypes} from 'react';
// import { Modal, Button,Input } from 'antd';
// import {mirrors} from '../../constants/test'



// class ModifyMirror extends Component {
//     handleOk() {
//         this.props.onOk(this.refs)
//     }
//     handleCancel(e) {
//         console.log(e);
//         this.setState({
//             visible: false,
//         });
//     }

//     render() {
//         const {selectedMirrors} = this.props
//         //选择一个Mirror进行修改
//         var selectedMirror = mirrors.items[0];
//         return (
//             <div>
//                 <Modal ref="modal"
//                     visible={this.props.visible}
//                     title="修改客户端信息" onOk={this.props.onOk} onCancel={this.props.onCancel}
//                     footer={[
//                         <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
//                         <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk.bind(this) }>
//                             确 定
//                         </Button>

//                     ]}
//                     >
//                     <table width="300" height="150">
//                         <tbody>
//                             <tr>
//                                 <td>编号：</td>
//                                 <td>{selectedMirror.id}</td>
//                             </tr>
//                             <tr>
//                                 <td>客户端名称：</td>
//                                 <td><Input ref="mir_name" defaultValue={selectedMirror.name} /></td>
//                             </tr>
//                             <tr>
//                                 <td>IP地址：</td>
//                                 <td><Input ref='mir_ip' defaultValue={selectedMirror.ip} /></td>
//                             </tr>
//                             <tr>
//                                 <td>端口：</td>
//                                 <td><Input ref='mir_port' defaultValue={selectedMirror.port} /></td>
//                             </tr>
//                             <tr>
//                                 <td>initiator：</td>
//                                 <td><Input ref='mir_ini' defaultValue={selectedMirror.initiator} /></td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </Modal>
//             </div>
//         );
//     }
// }

// ModifyMirror.propTypes = {
//     //onOk: PropTypes.func.isRequired
// };

// export default ModifyMirror;