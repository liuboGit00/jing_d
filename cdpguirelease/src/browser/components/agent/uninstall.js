import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class Uninstall extends Component {
    
    handleOk() {
    	const{uninstall_id}=this.props;
        console.log( uninstall_id)
       this.props.onOk(
            {
               'uninstall_id':uninstall_id

            })

    }

    
    render() {
        const {visible} = this.props;
  
        return (
            <div>
                <Modal ref="modal"
                    width = {300}
                    closable={false}
                    visible={this.props.visible}
                    title="卸载配置" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this) }>
                            卸 载
                        </Button>

                    ]}
                    >
                    <p id="install_drbd">是否卸载客户端上配置</p>
                </Modal>
          </div>
        );
    }

 

}



Uninstall.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default Uninstall;