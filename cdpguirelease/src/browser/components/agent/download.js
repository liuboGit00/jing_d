import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class Download extends Component {


    
    render() {
        const {download,visible} = this.props;
       
        if(download != undefined&&download !=''){ 
        // console.log((download[0].native.result.split(',')[4]).trim()=="'remote clone mission completed!'")
        // console.log(download[0].native.result.split("'"))
        if(download[0].status== 'PROGRESS'){
            // console.log(download[0].native.result)
            const  str =download[0].native.result.split("'").join('"')
            const str1=str.split('L').join('')
            // console.log(str1)
            const str2 = str1.split(',')
            // console.log(str2)
            str2.splice(2,1)
            const str3=str2.join(',')
            // const str4 = str3.split('u').join('')
            // console.log(str4)
            var obj=JSON.parse(str3)
            // console.log(obj)
        }
        

            if(download[0].task == 'clone.tasks.clone2agentjob'){
                return (
                    <div>
                    <Modal ref="modal"
                        closable={false}
                        width = {300}
                        visible={this.props.visible}
                        title="同步完成的进度"  onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                            
                        ]}
                        >
                        {download[0].status== 'PROGRESS'? <p id="install_drbd">85%</p>:
                         (download[0].status== 'SUCCESS'?<p id="install_drbd">传输成功</p>:<p style={{textAlign:'center'}}>传输失败</p>)}

                    </Modal>
                    </div>
                );
            }else{
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
                       {download[0].status== 'PROGRESS'? <p id="install_drbd">{parseInt(obj.current)}%</p> :
                         ((download[0].status== 'SUCCESS' && (download[0].native.result.split(',')[4])==" 'remote clone mission completed!'")?<p id="install_drbd">success</p>:
                            (download[0].status== 'SUCCESS' &&download[0].native.result.split(',')[4]==" 'Warning:only received 0 size"?<p >only received 0 size, please check dest data!</p>:<p style={{textAlign:'center'}}>transmission data error</p>))}

                    </Modal>
                    </div>
                ); 
            }
            
        }else{
            return (<div></div>)
        }
        
    }
}



export default Download;