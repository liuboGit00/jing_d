/**
 * Created by tanglinhai on 2016/9/7.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetch_cmdlogs,
    del_cmdlogs,
    checkbox_checked_cmdlogs
} from '../../actions/cmdlogsactions'
import CmdLogs from '../../components/log/cmdlogs'
import NotFound from '../../components/common/notfound';
import Loading from '../../components/common/loading'
import  {Modal}  from 'antd'
const confirm = Modal.confirm;
class CmdlogsContainer extends Component {
    constructor(props) {
        super(props)
        this.onListSelectChange = this.onListSelectChange.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.getTableSelectRowKeys = this.getTableSelectRowKeys.bind(this)
        this.del_cmdLogs_win = this.del_cmdLogs_win.bind(this)
        this.toggle_display = this.toggle_display.bind(this)
    }

    del_cmdLogs_win(){
        const rowKeys = this.getTableSelectRowKeys();
        console.log(rowKeys)
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
                        this.props.dispatch(del_cmdlogs(rowKeys[i], this.props.pagination));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    onListSelectChange(selectedRowKeys) {
        this.props.dispatch(checkbox_checked_cmdlogs(selectedRowKeys));
    }
    getTableSelectRowKeys(){
        return this.props.cmdlogsState.selectedRowKeys
    }
    getItemById(id){
        const items = this.props.cmdlogsState.items;
        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    componentDidMount() {
        if (this.props.cmdlogsState.didInvalidate===true) {
            this.props.dispatch(fetch_cmdlogs())
        }
    }
    toggle_display(){
       this.props.dispatch(fetch_cmdlogs())
    }
    render() {
        const winevents = {
            onListSelectChange: this.onListSelectChange,
            del_cmdLogs_win: this.del_cmdLogs_win,
            getTableSelectRowKeys: this.getTableSelectRowKeys,
            toggle_display:this.toggle_display
        };
        return (
            <CmdLogs {...this.props.cmdlogsState} {...winevents} dispatch={this.props.dispatch} />
        )
    }
}

CmdlogsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        cmdlogsState:state.cmdlogsState
    }
}
export default connect(mapStateToProps)(CmdlogsContainer)
