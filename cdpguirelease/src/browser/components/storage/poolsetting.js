/**
 * Created by tanglinhai on 2016/8/30.
 */
import React, {Component, PropTypes} from 'react';
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'
import FormAddVolume from './form_addvolume'
import {fetch_pool, fetch_pool_volumes} from '../../actions/poolsettingactions'
import {Link} from 'react-router'

class PoolSetting extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(searchKey){
        this.props.dispatch(fetch_pool_volumes({
            poolId: this.props.pool.id,
            searchKey: searchKey,
            volumeType: this.props.listType
        }));
    }
    render() {
        const pool = this.props.pool
        const items = [];
        if(this.props.volumelist.items && this.props.volumelist.items.length > 0){
            const temps = this.props.volumelist.items;
            for(let i=0;i<temps.length;i++){
                // console.log(this.props.listType , temps[i].native.type.model)
                if(this.props.listType == temps[i].native.type.model&&temps[i].source_pool==pool.url)
                    items.push(temps[i]);
            }
        }
        // console.log(pool)
        // console.log(items)
        const columns = [{
                title: '编号',
                dataIndex: 'id',
                sorter: true,
                /*render: (text, record) => {
                    //const path = "pools/" + record.id
                    return (<Link to={`/pools/${record.id}`}>{text}</Link>)
                },*/
            },
            {
                title: '磁盘名称',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: '空间大小',
                dataIndex: 'megs',//bd_megs
                sorter: true,
                render:(text,record) => {
                    if(text>=1024){
                        console.log(text/1024)
                      return ((text/1024).toFixed(2)+'G')
                    }else{
                       return (text+'M')
                    }
                    
                }
            },
            {
                title: '磁盘路径',
                dataIndex: 'native.path',
                sorter: true,
            },
            {
                title: '磁盘状态',
                dataIndex: 'status.status',
                sorter: true,
            },
            {
                title: '创建日期',
                dataIndex: 'createdate',
                render: (text, record) => {
                    var timestamp = Date.parse(new Date(text));
                    var newDate = new Date();
                    newDate.setTime(timestamp)
                    return ( newDate.toLocaleString() )
                },
                sorter: true,
            },
            {
                title: '操作',
                // key: 'operation',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => <div><Link to={`/volumes/${record.id}`}>详情</Link>  <Link to={`/volumes/${record.id}/snapshots`}>配置</Link></div>,
            }];
        const modalWin = {
            title: this.props.winstate && this.props.winstate.winType == 'add' ? '新建卷' : '更新卷',
            width: 700,
            visible: this.props.winstate && this.props.winstate.openFormWin ? true : false,
            onCancel: this.props.winstate && this.props.winstate.winType == 'add' ? this.props.close_add_volume_win : this.props.close_update_volume_win,
            onOk: this.props.winstate && this.props.winstate.winType == 'add' ? this.props.ok_add_volume_win : this.props.ok_update_volume_win,
            confirmLoading: this.props.winstate && this.props.winstate.confirmLoading ? true : false
        }
        const selectedRowKeys = this.props.getTableSelectRowKeys();
        const rowSelection = {
            type:'checkbox',
            onChange: this.props.onListSelectChange,
            selectedRowKeys,
        };
        let link_;
        if(this.props.listType == 'zvol'){
            link_ = <span>块设备卷列表 | <Link to={`/pool/setting/${this.props.pool.id}/type/zfs`}>文件卷列表</Link></span>
        }else
            link_ = <span><Link to={`/pool/setting/${this.props.pool.id}/type/zvol`}>块设备卷列表</Link> | 文件卷列表</span>
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label">
                        <Link to={`/pools/${this.props.pool.id}`}><Icon type="hdd" />{pool.name}存储池</Link> >
                        {link_}
                    </label>
                </Row>
                <Row className="table_toolbar">
                    <Button type="ghost" icon="appstore-o" className="cdp_button_left">切换显示</Button>
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch} loading={this.props.volumes.isFetching}></SearchInput>
                    <Button type="ghost" icon="minus-circle-o" loading={this.props.operation && this.props.operation.type == "del" && this.props.operation.state == "loading" ? true : false} className="cdp_button_right" onClick={this.props.del_volume_win}>删除</Button>
                    
                    <Button type="ghost" icon="plus-circle-o" loading={this.props.winstate && this.props.winstate.addBtnLoading ? true : false} className="cdp_button_right" onClick={this.props.open_add_volume_win}>新建</Button>
                </Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={items} rowSelection={rowSelection} loading={this.props.volumelist.isFetching}/>
                </Row>
                <Modal {...modalWin}>
                    <FormAddVolume {...this.props} ref="formAddVolume"/>
                </Modal>
            </Row>
        )

    }
}
//<Button type="ghost" icon="edit" loading={this.props.winstate && this.props.winstate.updateBtnLoading ? true : false} className="cdp_button_right" onClick={this.props.open_update_volume_win}>修改</Button>

PoolSetting.propTypes = {
    dispatch: PropTypes.func.isRequired,
    pool: PropTypes.object.isRequired
};

export default PoolSetting;