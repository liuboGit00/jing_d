/**
 * Created by tanglinhai on 2016/9/2.
 */
import React, {Component, PropTypes} from 'react';
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'
import FormAddUser from './formadduser'
import {fetch_users} from '../../actions/useractions'
import {Link} from 'react-router'

class Users extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(searchKey){
        this.props.dispatch(fetch_users({
            searchKey: searchKey
        }));
    }
    render() {

        const columns = [{
                title: '编号',
                dataIndex: 'id',
                /*render: (text, record) => {
                 //const path = "pools/" + record.id
                 return (<Link to={`/pools/${record.id}`}>{text}</Link>)
                 },*/
            },
            {
                title: '登入名',
                dataIndex: 'username',
            },
            {
                title: '邮件',
                dataIndex: 'email',
            },
            {
                title: '姓名',
                render: (text, record) => <span>{record.first_name+record.last_name}</span>
            },
            {
                title: '是否激活',//is_active
                render: (text, record) => <span>{record.is_active? '是' : '否'}</span>
            },
            {
                title: '是否员工',//
                render: (text, record) => <span>{record.is_staff? '是' : '否'}</span>
            },
            {
                title: '是否管理员',//
                render: (text, record) => <span>{record.is_superuser? '是' : '否'}</span>
            },
            {
                title: 'token',//
                render: (text, record) => <span>{text.token.token}</span>
            },
            {
                title: '创建时间',
                dataIndex: 'date_joined',
                render: (text, record) => {
                    var timestamp = Date.parse(new Date(text));
                    var newDate = new Date();
                    newDate.setTime(timestamp)
                    return ( newDate.toLocaleString() )
                },
            },
            {
                title: '最近登入时间',
                dataIndex: 'last_login',
                render: (text, record) => {
                    // var timestamp = Date.parse(new Date(text));
                    // var newDate = new Date();
                    // console.log(timestamp)
                    // newDate.setTime(timestamp)
                    
                    // console.log(newDate)

                    // return ( newDate.toLocaleString() )
                   //  console.log(record)
                   // console.log(text)
                    if(text!=null){
                        var timestamp = Date.parse(new Date(text));
                        var newDate = new Date();
                        newDate.setTime(timestamp)
                        return ( newDate.toLocaleString() )
                        
                    }else{
                        var timestamp = Date.parse(new Date(record.date_joined));
                        var newDate = new Date();
                        newDate.setTime(timestamp)
                        return ( newDate.toLocaleString() )
                    }

                },
            }];
        const modalWin = {
            title: this.props.winstate && this.props.winstate.winType == 'add' ? '创建用户' : '修改用户',
            width: 700,
            visible: this.props.winstate && this.props.winstate.openFormWin ? true : false,
            onCancel: this.props.winstate && this.props.winstate.winType == 'add' ? this.props.close_add_user_win : this.props.close_update_user_win,
            onOk: this.props.winstate && this.props.winstate.winType == 'add' ? this.props.ok_add_user_win : this.props.ok_update_user_win,
            confirmLoading: this.props.winstate && this.props.winstate.confirmLoading ? true : false
        }
        const selectedRowKeys = this.props.getTableSelectRowKeys();
        const rowSelection = {
            type:'checkbox',
            onChange: this.props.onListSelectChange,
            selectedRowKeys,
        };
        // console.log(this.props.items)

        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="hdd" />用户列表</label>
                </Row>
                <Row className="table_toolbar">
                    <Button type="ghost" icon="appstore-o" className="cdp_button_left">切换显示</Button>
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch} loading={this.props.isFetching}></SearchInput>
                    <Button type="ghost" icon="edit" className="cdp_button_right" onClick={this.props.open_update_user_perm}>修改权限</Button>

                    <Button type="ghost" icon="edit" loading={this.props.winstate && this.props.winstate.updateBtnLoading ? true : false} className="cdp_button_right" onClick={this.props.open_update_user_win}>修改用户</Button>
                    <Button type="ghost" icon="minus-circle-o" loading={this.props.operation && this.props.operation.type == "del" && this.props.operation.state == "loading" ? true : false} className="cdp_button_right" onClick={this.props.del_user_win}>删除</Button>

                    <Button type="ghost" icon="plus-circle-o" loading={this.props.winstate && this.props.winstate.addBtnLoading ? true : false} className="cdp_button_right" onClick={this.props.open_add_user_win}>新建</Button>
                </Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={this.props.items} rowSelection={rowSelection} loading={this.props.isFetching}/>
                </Row>
                <Modal {...modalWin}>
                    <FormAddUser {...this.props} ref="formAddUser"/>
                </Modal>
            </Row>
        )

    }
}

Users.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default Users;