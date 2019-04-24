import React, {Component, PropTypes} from 'react';
import { Modal, Button ,Select} from 'antd';


class Clonespeed extends Component {


    
    render() {
        const {clonespeed,visible} = this.props;
        // console.log(visible)
       
        if(clonespeed != undefined&&clonespeed !=''){
            // console.log(clonespeed[0].status)
            if(clonespeed[0].status=='PROGRESS'){
                const  str =clonespeed[0].native.result.split("'").join('"')
                const str1=str.split('L').join('')
                // console.log(str1)
                const str2 = str1.split(',')
                // console.log(str2)
                str2.splice(2,1)
                const str3=str2.join(',')
                // const str4 = str3.split('u').join('')
                var obj=JSON.parse(str3)
                console.log(obj)
                var speed = (obj.size/obj.elapsetime/1024).toFixed(2)
                return (
                    <div>
                        <Modal ref="modal"
                            closable={false}

                            width = {300}
                            visible={this.props.visible}
                            title="传输速度"  onCancel={this.props.onCancel}
                            footer={[
                                <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                                
                            ]}
                            >
                            {speed>1000?<p style={{textAlign:'center',padding:20,fontSize:20}}>{(speed/1024).toFixed(2)+'M/s'}</p>:<p style={{textAlign:'center',padding:20,fontSize:20}}>{speed+'Kb/s'}</p>}
                        </Modal>
                    </div>
                );
            }else{
                return (
                    <div>
                    <Modal ref="modal"
                        closable={false}
                        width = {300}
                        visible={this.props.visible}
                        title="传输速度"  onCancel={this.props.onCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取 消</Button>,
                            
                        ]}
                        >
                        <p style={{textAlign:'center',padding:20,fontSize:20}}>未知</p>
    
                    </Modal>
                    </div>
                );
            }}else{
            return (<div></div>)
        }
        
    }
}



export default Clonespeed;