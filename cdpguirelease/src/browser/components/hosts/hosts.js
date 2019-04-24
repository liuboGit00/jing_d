import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd'
import {Link} from 'react-router'

class Host extends Component {
    render() {
        const {items,onChange, selectedRowKeys,user} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        // console.log(items)
        const columns = [
            {
                title: '主机名称',
                width:'30%',
                render: (text, record) => {
                    return (<Link to={`/hosts/${text.id}`}>{text.name}</Link>)
                },
            },

            {
                title: '主机地址',
                width:'30%',
                render: (text, record) => {
                    // console.log(text.url)
                    return (record.hosturl==null ?(text.url.split('//')[1]).split('/hosts')[0]:record.hosturl.split('//')[1]);
                },
            },
            {
                title: 'token',
                width:'30%',
                render: (text, record) => {
                    console.log(user[0])
                    // console.log(text.token)

                    return  (text.token==null?(user[0]==undefined?null:user[0].token.token):text.token);
                },
            },{
                title: '机器码',
                dataIndex:'machine_code',
                width:'10%',
                render: (text, record) => {
                    // console.log(text)
                    if(text==''){
                        return '未知'
                    }else{
                        return  text;
                    }

                   
                },
            }];
        return (
            <div>
                <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={items} />
            </div>
        );
    }
}

Host.propTypes = {
    // items: PropTypes.array.isRequired,
};

export default Host;