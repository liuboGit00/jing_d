/**
 * Created by tanglinhai on 2016/9/14.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'
import {add_operation, del_operation, fetch_operations} from '../../actions/operationactions'

class Operation extends Component {
    constructor(props) {
        super(props)
        this.handleDel = this.handleDel.bind(this);
        this.showOperationsPage = this.showOperationsPage.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);

    }
    handleDel(e){
        this.props.dispatch(del_operation(e.target.getAttribute('data-id')));
    }
    showOperationsPage(current){
        this.props.dispatch(fetch_operations({
            searchKey: '',/*this.refs.searchInput.state.value*/
        }, this.props.pagination.pageSize, current));
    }
    onShowSizeChange(current, pageSize){
        this.props.dispatch(fetch_operations({
            searchKey: '',/*this.refs.searchInput.state.value*/
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
                title: '操作内容',
                dataIndex: 'content',
                sorter: true,
                render:(text,record) =>{
                  return (text.split(':')[0] =='回放卷' ? <Link to={`/volumes/${text.split(':')[1]}`}>{text}</Link>:text)
                }
            },
            {
                title: '操作结果',
                dataIndex: 'result',
                sorter: true,
                render: (text, record) => <div>{text == 'success' ? '成功' : '失败'}</div>
            },
            {
                title: '操作日期',
                dataIndex: 'date',
                sorter: true
            },
            {
                title: '操作',
                // key: 'operation',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => <Icon className="delOperationBtn" data-id={record.id} type="cross-circle-o" onClick={this.handleDel}/>
            }];
        const pagination = {
            current: this.props.pagination.current,
            total: this.props.pagination.total,
            pageSize: this.props.pagination.pageSize,
            onChange: this.showOperationsPage,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5','10','15','20'],
            showTotal: function(){return '总共'+this.props.pagination.total+'条数据';}.bind(this)
        }
        return (
             <Table rowKey='id' columns={columns} dataSource={items} pagination={pagination}/>
        )

    }
}

Operation.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Operation;