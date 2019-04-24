import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class Initialize extends Component {
    
    handleOk() {
        const{hash}=this.props;
        console.log(hash)
        this.props.onOk(
            {
               'hash':hash

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
                    title="开始第一次传输" onOk={this.props.onOk} onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this) }>
                            传输
                        </Button>

                    ]}
                    >
                    <p id="install_drbd">是否开始第一次传输</p>
                    
                </Modal>
          </div>
        );
    }

 

}



Initialize.propTypes = {
    onOk: PropTypes.func.isRequired
};

export default Initialize;