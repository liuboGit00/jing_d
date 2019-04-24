import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class Openrole extends Component {


    
    render() {
        const {agentrole} = this.props;
        // console.log(agentrole)
        if(agentrole!=undefined ){
            return (
                <div>
                    <Modal ref="modal"
                        width = {300}
                        closable={false}
                        
                        visible={this.props.visible}
                        title="客户端地位"  onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,   
                        ]}
                        >
                        {agentrole[0]=='Primary'||agentrole[0]=='Secondary'?<p id="install_drbd">{agentrole[0]}</p>:<p id="install_drbd">unknown</p>}
                    </Modal>
                </div>
            );
        }else {
            return <div></div>
        }
        
    }
}



export default Openrole;