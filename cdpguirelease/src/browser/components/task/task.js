/**
 * Created by tanglinhai on 2016/9/15.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import SearchInput from '../common/searchinput'
import {fetch_tasks, fetch_tasks_advance_search,fetch_schedules} from '../../actions/taskactions'
import {cmdlogspath} from '../../confs/host'
import htmlUtils from '../../utils/htmlutils'
import FormSearchAdvance from './formsearchadvance'

class Task extends Component {
    constructor(props) {
        super(props)
        this.state={
            searchvalue:''
        }
        this.showTaskPage = this.showTaskPage.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
        this.openSearchAdvance = this.openSearchAdvance.bind(this);
        this.handleAdvanceSearch = this.handleAdvanceSearch.bind(this);
        

    }
    openSearchAdvance(e){
        const type = e.target.getAttribute('data-type');
        if(type == 'up'){
            this.refs.searchAdvance.setAttribute('class', 'search_advance search_advance_show');
            e.target.setAttribute('data-type', 'down');
            e.target.setAttribute('class', 'btn down');
        }else{
            this.refs.searchAdvance.setAttribute('class', 'search_advance');
            e.target.setAttribute('data-type', 'up');
            e.target.setAttribute('class', 'btn up');
        }
    }
    handleSearch(searchKey){
        
        this.setState({
            searchvalue:searchKey
        })
        this.props.dispatch(fetch_tasks({
            searchKey: searchKey
        }, this.props.pagination.pageSize, 1, ReactDOM.findDOMNode(this.refs.taskTable)));
    }
    handleAdvanceSearch(e){
        e.preventDefault();
        this.props.dispatch(fetch_tasks_advance_search(this.props.searchAdvanceForm, this.props.pagination.pageSize, 1, ReactDOM.findDOMNode(this.refs.taskTable)));
    }
    showTaskPage(current){
        const resultType = ReactDOM.findDOMNode(this.refs.taskTable).getAttribute('data-resultType');
        // console.log(resultType)
        // console.log( this.refs.searchInput.state.value)
        // console.log(current)
        
        console.log(this.state.searchvalue)
        if(resultType == 'normal'){
            this.props.dispatch(fetch_tasks({
                searchKey: this.state.searchvalue
            }, this.props.pagination.pageSize, current, ReactDOM.findDOMNode(this.refs.taskTable)));
        }else{
            this.props.dispatch(fetch_tasks_advance_search(this.props.searchAdvanceForm, this.props.pagination.pageSize, current, ReactDOM.findDOMNode(this.refs.taskTable)));
        }
    }
    onShowSizeChange(current, pageSize){
        
        const resultType = ReactDOM.findDOMNode(this.refs.taskTable).getAttribute('data-resultType');
        if(resultType == 'normal') {
            this.props.dispatch(fetch_tasks({
                searchKey: this.refs.searchInput.state.value
            }, pageSize, current, ReactDOM.findDOMNode(this.refs.taskTable)));
        }else{
            this.props.dispatch(fetch_tasks_advance_search(this.props.searchAdvanceForm, pageSize, current, ReactDOM.findDOMNode(this.refs.taskTable)));
        }
    }

    render() {
        const events = {
            handleAdvanceSearch : this.handleAdvanceSearch
        };
        const {items,schedules} = this.props;
        console.log(schedules.items)
        const columns = [{
                title: '序号',
                dataIndex: 'id',
                // sorter: true
            },
            {
                title: '任务',
                dataIndex: 'task',
                // sorter: true
            },
            {
                title: '任务源名称',
                dataIndex: 'native.args',
                render:(text,record)=>{
                    if(text=='[]'){
                        return '未知'
                    }else{
                        const schedulesDetail= schedules.items;
                        for(let i=0;i<schedulesDetail.length;i++){  
                            if (eval( "("+ schedulesDetail[i].args + ")")[0] == eval( "("+text + ")")[0]  && schedulesDetail[i].task==record.task) {
                                return (schedulesDetail[i].name)
                            }
                        }
                        return '未知'
                        
                    }
                }
            },
            {
                title: '任务状态',
                dataIndex: 'status',
                // sorter: true,
                render: (text, record) => <div>{text == 'SUCCESS' ? '成功' : '失败'}</div>
            },
            {
                title: '执行结果',
                dataIndex: 'native.result',
                width:'40%',
                // sorter: true
            },
            {
                title: '执行时间',
                dataIndex: 'native.submit_at',
                // sorter: true
            },
            {
                title: '结束时间',
                dataIndex: 'native.done_at',
                // sorter: true
            },
            {
                title: '操作',
                // key: 'operation',
                // width: 100,
                render: (text, record) => <div><Link to={`/results/${record.task_id}`}>详情</Link></div>
            }];
        const {selectedRowKeys} = this.props;
        const rowSelection = {
            type:'checkbox',
            onChange: this.props.onListSelectChange,
            selectedRowKeys,
        };
        // console.log(this.props.pagination.pageSize)
        const pagination = {
            current: this.props.pagination.current,
            total: this.props.pagination.total,
            pageSize: this.props.pagination.pageSize,
            onChange: this.showTaskPage,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10','20','30','40'],
            showTotal: function(){return '总共'+this.props.pagination.total+'条数据';}.bind(this),
        }
        return (
            <Row>
                <Row className="table_title" style={{marginBottom: 15+'px'}}>
                    <label className="cdp_label"><Icon type="clock-circle-o" />已完成任务列表</label>
                </Row>
                <div className="search_advance" ref="searchAdvance">
                    <div className="title"><Icon type="search" />&nbsp;高级搜索</div>
                    <div className="body">
                        <FormSearchAdvance {...this.props} {...events} ref="formSearchAdvance"/>
                    </div>
                    <div className="btn up" onClick={this.openSearchAdvance} data-type="up"></div>
                </div>
                <Row className="table_toolbar">
                    <Button type="ghost" icon="appstore-o" className="cdp_button_left" onClick={this.props.toggle_display}>切换显示</Button>
                    <SearchInput placeholder="输入查询内容" onSearch={this.handleSearch.bind(this)} loading={this.props.isFetching} ref="searchInput"></SearchInput>
                    <Button type="ghost" icon="delete" loading={this.props.operation && this.props.operation.type == "del" && this.props.operation.state == "loading" ? true : false} className="cdp_button_right" onClick={this.props.del_tasks_win}>删除</Button>
                </Row>
                <Row>
                    <Table rowKey='id' columns={columns} dataSource={items} rowSelection={rowSelection} loading={this.props.isFetching} pagination={pagination} data-resultType="normal" ref="taskTable"/>
                </Row>
            </Row>
        )

    }
}

Task.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Task;