import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'

class Cloudlun extends Component {
    render() {
        const {hosts,luns,volumes} = this.props
        console.log(hosts,luns)
        let item=[]
        if(hosts&&luns){
            const vm = window.location.href.split('?')[0].split('/')
            const length = vm.length
            const cloudName = vm[length-2]
            // console.log(cloudName)
            item = luns[vm[length-2]].vmware[hosts[0]]
        }
        
        // console.log(item)
        const columns = [
            {
                title: '名字',
                dataIndex: 'deviceName',
                render:(text,recod)=>{
                    // console.log(text)
                    if(volumes&&volumes!=[]){
                        for(let i=0;i<volumes.length;i++){
                            if(recod.uuid.slice(17,42)==volumes[i].uuid.split('-').join('').slice(0,25)){
                                return <div className='qwe'>{volumes[i].name}</div>
                            }
                        }
                        return text
                    }else{
                        return text
                    }
                }

            }];
        return (
            <div>
                <Table rowKey='uuid' loading={luns==undefined?true:false}  columns={columns} dataSource={item} />
            </div>
        );
    }
}

Cloudlun.propTypes = {

};

export default Cloudlun;