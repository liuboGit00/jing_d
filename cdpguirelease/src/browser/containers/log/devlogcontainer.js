/**
 * Created by tanglinhai on 2016/9/7.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetch_devLog,
    del_devLogs,
    checkbox_checked_devLog
} from '../../actions/devlogactions'
import DevLogs from '../../components/log/devlogs'
import NotFound from '../../components/common/notfound';
import Loading from '../../components/common/loading'
import  {Modal}  from 'antd'
const confirm = Modal.confirm;
class DevLogContainer extends Component {
    constructor(props) {
        super(props)
        this.onListSelectChange = this.onListSelectChange.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.getTableSelectRowKeys = this.getTableSelectRowKeys.bind(this)
        this.del_devLogs_win = this.del_devLogs_win.bind(this)
    }
    del_devLogs_win(){
        const rowKeys = this.getTableSelectRowKeys();
        if(!rowKeys || rowKeys.length == 0){
            Modal.error({
                title: 'CDP系统提示！',
                content: '请选择要删除的记录！',
            });
        }else{
            confirm({
                title: 'CDP系统提示！',
                content: '您是否确认要删除选中的内容！',
                onOk: function() {
                    for(let i=0;i<rowKeys.length;i++){
                        this.props.dispatch(del_devLogs(rowKeys[i], this.props.pagination));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    onListSelectChange(selectedRowKeys) {
        this.props.dispatch(checkbox_checked_devLog(selectedRowKeys));
    }
    getTableSelectRowKeys(){
        return this.props.devLogState.selectedRowKeys
    }
    getItemById(id){
        const items = this.props.devLogState.items;
        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    componentDidMount() {
        if (this.props.devLogState.didInvalidate===true) {
            this.props.dispatch(fetch_devLog())
        }
    }
    render() {
        const winevents = {
            onListSelectChange: this.onListSelectChange,
            del_devLogs_win: this.del_devLogs_win,
            getTableSelectRowKeys: this.getTableSelectRowKeys
        };
        return (
            <DevLogs {...this.props.devLogState} {...winevents} dispatch={this.props.dispatch} />
        )
    }
}

DevLogContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        devLogState:state.devLogState
    }
}
export default connect(mapStateToProps)(DevLogContainer)
