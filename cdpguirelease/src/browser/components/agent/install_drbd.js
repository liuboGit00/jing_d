import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class InstallDrbd extends Component {
    
    handleOk() {
        
        const{add}=this.props;
        console.log(add)
        this.props.onOk(
            {
               'mirror_id':add

            })
    }

    render() {
        const {visible,mirrors,items} = this.props;

        return (
            <div>
                <Modal ref="modal"
                    width = {300}
                    closable={false}
                    visible={this.props.visible}
                    title="初始化配置" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this) }>
                            初始化
                        </Button>

                    ]}
                    >
                    <p id="install_drbd">是否初始化配置</p>
                    
                </Modal>
          </div>
        );
    }
}



InstallDrbd.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default InstallDrbd;