import React, {Component, PropTypes} from 'react';
import {Table,Switch,Modal} from 'antd'
import {Link} from 'react-router'
import {fetch_fileclones_server} from '../../actions/filecloneaction'

class Fileclones extends Component {
    render() {
        const {dispatch,filersync,agents,items,onChange,selectedFileclones, selectedRowKeys,agentlocal,localagent,startServer,stopServer} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)

        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                width:'10%',

            },
            {
                title: '名字',
                dataIndex: 'name',
                width:'10%',

                
            },
            {
                title: '客户端',
                width:'10%',
                render:(text,record)=>{
                    for(let i=0;i<agents.length;i++){
                        if(agents[i].url==record.agent){
                            return agents[i].name
                        }
                    }
                }
            },
            {
                title: '客户端路径',
                dataIndex: 'agentpath',
                width:'10%',

            },
            // {
            //     title: '本地路径',
            //     dataIndex: 'localpath',
            //     width:'10%',

            // },
           
            {
                title: '本地节点',
                width:'10%',
                render:(text,record)=>{
                    for(let i=0;i<filersync.length;i++){
                        if(filersync[i].url==record.localend){
                            return filersync[i].name
                        }
                    }
                }

            },
            {
                title: '传输方向',
                width:'10%',
                render:(text,record)=>{
                    // console.log(text.direction)
                  if(text.direction!=undefined){
                    if(text.direction == 'local'){
                        return 'local';
                    }else if(text.direction == 'agent'){
                        return 'agent';
                    }else{
                        return '未知'
                    }
                  }else{
                    return '未知'
                  }
                }

            },

            {
                title: '状态',
                key:'state',
                width:'10%',
                render:(text,record)=>{
                    if(text.status !=undefined){
                        return text.status;
                    }else{
                        return '未知'
                    }
                   
                }

            },{
                title:'实时同步',
                width:'10%',
                render:(text,record)=>{
                    let stop = false
                    // console.log(text)
                    console.log(text.serverstatus)
                    if(text.serverstatus!=undefined&&text.serverstatus.result!=null&&text.serverstatus.result!=false){
                        const status = text.serverstatus.result.split(' ').pop()
                        console.log(status)
                        if(status=='running...'){
                            stop = true
                            return(<div><Switch checkedChildren="开" unCheckedChildren="关"   checked={stop}    onChange={stopServer.bind(this,record.id,)}/></div>)
                        }else{
                            return(<div><Switch checkedChildren="开" unCheckedChildren="关" checked={stop}   onChange={startServer.bind(this,record.id,)}/></div>)
                        }
                    }
                    // if (text.serverstatus!=undefined&&text.serverstatus.result!=null&&text.serverstatus.result==false) {
                        // Modal.warning({
                        //     title:'CDP系统提示！',
                        //     content:'无法开启实时同步，请联系系统管理员。',
                        // })
                    // };
                    return(<div><Switch checkedChildren="开" unCheckedChildren="关" checked={stop}   onChange={startServer.bind(this,record.id,)}/></div>)
                }
            },
            {
                title: '操作',
                key: 'operation',
                width:'10%',
                render: (text, record) => 
                    <div  className="agentclone">
                        <button onClick = {localagent.bind(this,record.id)} >本地到客户端</button>
                        <button onClick = {agentlocal.bind(this,record.id)} >客户端到本地 </button>
                    </div>,
               
                
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Fileclones.propTypes = {

};

export default Fileclones;