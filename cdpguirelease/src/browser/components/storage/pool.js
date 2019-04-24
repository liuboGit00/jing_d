import React, {Component, PropTypes} from 'react';
import {Table} from 'antd'
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin}  from 'antd'
import SearchInput from '../common/searchinput'
import FormAddPool from './form_addpool'
import {fetch_pools} from '../../actions/poolactions'
class Pools extends Component {
    constructor(props) {
        super(props)
    }
    handleSearch(searchKey){
        this.props.dispatch(fetch_pools({
            searchKey: searchKey
        }));
    }
    render() {
        const {items,disks,pools} = this.props;
        // console.log(this.props.winstate.winType)
        const columns = [{
            title: '存储池名',
            dataIndex: 'name',
            sorter: true,
            render: (text, record) => {
                //const path = "pools/" + record.id
                return (<Link to={`/pools/${record.id}`}>{text}</Link>)
            },
        },
            {
                title: '容量',
                dataIndex: 'usage.size_text',
                sorter: true,
            },
            {
                title: '空闲',
                dataIndex: 'usage.free_text',
                sorter: true,
            },
            {
                title: '状态',
                dataIndex: 'status.status',
                sorter: true,
            },
            {
                title: '操作',
                // key: 'operation',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => <div><Link to={`/pools/${record.id}`}>详情</Link>  <Link to={`/pool/setting/${record.id}/type/zvol`}>配置</Link></div>,
            }];
        const modalWin = {
            title: this.props.winstate && this.props.winstate.winType == 'add' ? '新建存储池' : '更新存储池',
            width: 700,
            maskClosable:false,
            visible: this.props.winstate && this.props.winstate.openAddPoolWin ? true : false,
            onCancel: this.props.winstate && this.props.winstate.winType == 'add' ? this.props.close_add_pool_win : this.props.close_update_pool_win,
            onOk: this.props.winstate && this.props.winstate.winType == 'add' ? this.props.ok_add_pool_win : this.props.ok_update_pool_win,
            confirmLoading: this.props.winstate && this.props.winstate.confirmLoading ? true : false
        }
        const {selectedRowKeys} = this.props;
        const rowSelection = {
            type:'checkbox',
            onChange: this.props.onListSelectChange,
            selectedRowKeys,
        };
        // console.log(pools)
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="hdd" />存储池</label>
                </Row>
                <Row className="table_toolbar">
                    <Button type="ghost" icon="appstore-o" className="cdp_button_left" onClick={this.props.toggle_display}>切换显示</Button>
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this)} loading={this.props.isFetching}></SearchInput>
                    <Button type="ghost" icon="delete" loading={this.props.operation && this.props.operation.type == "del" && this.props.operation.state == "loading" ? true : false} className="cdp_button_right" onClick={this.props.del_pool_win}>删除</Button>
                    <Button type="ghost" icon="edit" loading={this.props.winstate && this.props.winstate.updateBtnLoading ? true : false} className="cdp_button_right" onClick={this.props.open_update_pool_win}>修改</Button>
                    <Button type="ghost" icon="plus" loading={this.props.winstate && this.props.winstate.addBtnLoading ? true : false} className="cdp_button_right" onClick={this.props.open_add_pool_win}>新建</Button>
                </Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={items} rowSelection={rowSelection} loading={this.props.isFetching}/>
                </Row>
                <Modal {...modalWin}>
                    <FormAddPool {...this.props} pools={pools} diks={disks} ref="formAddPool" getFormValues={this.props.getFormValues} clearFormValues={this.props.clearFormValues}/>
                </Modal>

            </Row>
        )

    }
}

Pools.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Pools;