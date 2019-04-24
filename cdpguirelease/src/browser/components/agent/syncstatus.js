import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class Syncstatus extends Component {


    
    render() {
        const {sync,visible,} = this.props;
        // console.log(sync)
        return (
            <div>
                <Modal ref="modal"
                    width = {300}
                    closable={false}

                    visible={this.props.visible}
                    title="同步完成的进度"  onCancel={this.props.onCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                        
                    ]}
                    >

                    {this.props.sync==  undefined ? <p id="install_drbd">未知</p> : (this.props.sync== 'unknown'? <p id="install_drbd">{this.props.sync}</p> : <p id="install_drbd">{this.props.sync}%</p>)}
                   
                </Modal>
          	</div>
        );
    }
}



export default Syncstatus;