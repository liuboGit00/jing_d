/**
 * Created by tanglinhai on 2016/9/7.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'
import {fetch_devLog} from '../../actions/devlogactions'
import {cmdlogspath} from '../../confs/host'

class DevLogs extends Component {
    constructor(props) {
        super(props)
        this.showDevLogPage = this.showDevLogPage.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    handleSearch(searchKey){
        this.props.dispatch(fetch_devLog({
            searchKey: searchKey
        }, this.props.pagination.pageSize, 1));
    }
    showDevLogPage(current){
        this.props.dispatch(fetch_devLog({
            searchKey: this.refs.searchInput.state.value
        }, this.props.pagination.pageSize, current));
    }
    onShowSizeChange(current, pageSize){
        this.props.dispatch(fetch_devLog({
            searchKey: this.refs.searchInput.state.value
        }, pageSize, current));
    }

    render() {
        const {items} = this.props;
        //序号 日志驱动 日志模式 日志容量
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            sorter: true
        },
            {
                title: '日志驱动',
                dataIndex: 'usage.logdriver',
                sorter: true
            },
            {
                title: '日志模式',
                dataIndex: 'usage.logmode',
                sorter: true
            },
            {
                title: '日志容量',
                dataIndex: 'usage.logcapcity',
                sorter: true
            },
            {
                title: '操作',
                // key: 'operation',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => <div></div>
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
            onChange: this.showDevLogPage,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10','20','30','40'],
            showTotal: function(){return '总共'+this.props.pagination.total+'条数据';}.bind(this)
        }
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="calendar" />操作日志列表</label>
                </Row>
                <Row className="table_toolbar">
                    <Button type="ghost" icon="appstore-o" className="cdp_button_left" onClick={this.props.toggle_display}>切换显示</Button>
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this)} loading={this.props.isFetching} ref="searchInput"></SearchInput>
                    <Button type="ghost" icon="delete" loading={this.props.operation && this.props.operation.type == "del" && this.props.operation.state == "loading" ? true : false} className="cdp_button_right" onClick={this.props.del_devLogs_win}>删除</Button>
                </Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={items} rowSelection={rowSelection} loading={this.props.isFetching} pagination={pagination}/>
                </Row>
            </Row>
        )

    }
}

DevLogs.propTypes = {
    items: PropTypes.array.isRequired,
};

export default DevLogs;