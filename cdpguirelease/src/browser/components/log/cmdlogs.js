/**
 * Created by tanglinhai on 2016/9/7.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'
import {fetch_cmdlogs} from '../../actions/cmdlogsactions'
import {cmdlogspath} from '../../confs/host'

class CmdLogs extends Component {
    constructor(props) {
        super(props)
        this.showCmdLogsPage = this.showCmdLogsPage.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    handleSearch(searchKey){
        this.props.dispatch(fetch_cmdlogs({
            searchKey: searchKey
        }, this.props.pagination.pageSize, 1));
    }
    showCmdLogsPage(current){
        this.props.dispatch(fetch_cmdlogs({
            searchKey: this.refs.searchInput.state.value
        }, this.props.pagination.pageSize, current));
    }
    onShowSizeChange(current, pageSize){
        this.props.dispatch(fetch_cmdlogs({
            searchKey: this.refs.searchInput.state.value
        }, pageSize, current));
    }

    render() {
        const {items} = this.props;
        //编号， 命令名称  操作用户 操作结果 开始时间 结束时间
        const columns = [{
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '命令名称',
                dataIndex: 'command',
            },
            {
                title: '操作用户',
                dataIndex: 'user',
            },
            {
                title: '操作结果',
                dataIndex: 'status.status',
                width: '30%',
                render: (text, record) => {
                    return (<span>{record.exitcode == 0 ? '正确：'+record.text : '错误：'+record.text}</span>)
                }
            },
            {
                title: '开始时间',
                dataIndex: 'starttime',
            },
            {
                title: '结束时间',
                dataIndex: 'endtime',
            }];
        const {selectedRowKeys} = this.props;
        const rowSelection = {
            type:'checkbox',
            onChange: this.props.onListSelectChange,
            selectedRowKeys,
        };
        const pagination = {
            current: this.props.pagination.current,
            total: this.props.pagination.total,
            pageSize: this.props.pagination.pageSize,
            onChange: this.showCmdLogsPage,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10','20','30','40'],
            showTotal: function(){return '总共'+this.props.pagination.total+'条数据';}.bind(this)
        }
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="calendar" />命令日志列表</label>
                </Row>
                <Row className="table_toolbar">
                    <Button type="ghost" icon="appstore-o" className="cdp_button_left" onClick={this.props.toggle_display}>切换显示</Button>
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this)} loading={this.props.isFetching} ref="searchInput"></SearchInput>
                    <Button type="ghost" icon="delete" loading={this.props.operation && this.props.operation.type == "del" && this.props.operation.state == "loading" ? true : false} className="cdp_button_right" onClick={this.props.del_cmdLogs_win}>删除</Button>
                </Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={items} rowSelection={rowSelection} loading={this.props.isFetching} pagination={pagination}/>
                </Row>
            </Row>
        )

    }
}

CmdLogs.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CmdLogs;