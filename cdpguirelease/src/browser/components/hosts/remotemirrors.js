import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd'
import {Link} from 'react-router'

class Remotemirrors extends Component {
    render() {
        const {items,host,volumes,onChange, selectedRowKeys,task} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        if(host!=''){
            host[host.length-1].hosturl=host[host.length-1].url.split('/host')[0]
        }
        const columns = [
            // {
            //     title: '地址',
            //     render: (text, record) => {
            //         return record.url;
            //     },
            // },
            {
                title: '源端主机',
                render: (text, record) => {
                    if(host){
                        for(let i=0;i<host.length;i++){
                            if(host[i].url == text.srcHost){
                                return host[i].name
                            }
                        }
                    }{
                        return null;
                    }
                        
                },
            },
            {
                title: '目的端主机',
                render: (text, record) => {
                    if(host){
                        for(let i=0;i<host.length;i++){
                            if(host[i].url == text.dstHost){
                                return host[i].name
                            }
                        }
                    }{
                        return null;
                    }
                }, 
            },
            {
                title: '源卷',
                render: (text, record) => {
                    // console.log(text.srcHost.split('/hosts')[0],text.dstHost.split('/hosts')[0],text.url.split('/remote')[0])
                   // console.log(host)
                    for(let i=0;i<host.length;i++){

                        if(host[i].url==text.srcHost){
                            // console.log(host[i].url)
                            // console.log(text.srcHost)

                            // console.log(host[i])
                            // console.log(text)


                            if(host[i].hosturl!=text.url.split('/remote')[0]){
                                return (text.srcvolid)
                            }else{
                                return  (<Link to={`/volumes/${text.srcvolid}`}>{text.srcvolid}</Link>);
                            }
                        }
                    }
                    
                },
            },
            {
                title: '目的卷',
                render: (text, record) => {
                    for(let i=0;i<host.length;i++){
                        if(host[i].url==text.dstHost){
                            // console.log(host[i])
                            if(host[i].hosturl!=text.url.split('/remote')[0]){
                                return(text.dstvolid)
                            }else{
                                return  (<Link to={`/volumes/${text.dstvolid}`}>{text.dstvolid}</Link>);

                            }
                        }
                    }
                },
            },{
                title:'最多快照',
                dataIndex:'options',
                render:(text,record)=>{
                    let value = JSON.parse(text)
                    return (value.max_snap)
                }
            },{
                title: '主机地位',
                dataIndex:'ur',
                render: (text, record) => {
                    // console.log(text)
                    // console.log(record.dstport)
                    if(text==undefined){
                        return "未知"
                    }else{
                        if(record.dstport == 0){
                            if(text.split('_')[1] == 'recv'){
                                return '接收'
                             }else if(text.split('_').length>1){
                                
                                return '发送'
                             }else{
                                return '未知'
                             }
                        }else{
                            if(text.split('_')[1] == 'send'){
                                return '发送'
                            }else if(text.split('_')[1] == 'recv'){
                                return '接收'
                            }else{
                                
                                return '未知'
                            }
                        } 
                    }
                    
                     
                },
            },{
                title:'自动开启传输',
                dataIndex:'is_started',
                render:(text,record)=>{
                    if(text==true){
                        return '开启'
                    }else{
                        return '关闭'
                    }
                }
            },{
                title: '传输状态',
                dataIndex:'status',
                render: (text, record) => {
                    // console.log(text)
                    if(text==undefined){
                        return '未知'
                    }else{
                        return text
                    };
                },
            },];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Remotemirrors.propTypes = {
    // items: PropTypes.array.isRequired,
};

export default Remotemirrors;