import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {fetch_pools, open_add_pool_win, open_update_pool_win, close_add_pool_win, close_update_pool_win, add_pool, update_pool, checkbox_checked_poll, del_pool} from '../../actions/poolactions'
import {fetch_disks} from '../../actions/actions'
import Pools from '../../components/storage/pool'
import  {Modal}  from 'antd'
const confirm = Modal.confirm;
class PoolsContainer extends Component {
    constructor(props) {
        super(props)
        this.open_add_pool_win = this.open_add_pool_win.bind(this)
        this.close_add_pool_win = this.close_add_pool_win.bind(this)
        this.ok_add_pool_win = this.ok_add_pool_win.bind(this)
        this.open_update_pool_win = this.open_update_pool_win.bind(this)
        this.close_update_pool_win = this.close_update_pool_win.bind(this)
        this.ok_update_pool_win = this.ok_update_pool_win.bind(this)

        this.del_pool_win = this.del_pool_win.bind(this)
        this.toggle_display = this.toggle_display.bind(this)
        this.onListSelectChange = this.onListSelectChange.bind(this)
        this.getItemById = this.getItemById.bind(this)
    }
    onListSelectChange(selectedRowKeys,selectedPools) {
        // console.log(selectedRowKeys,selectedPools)
        this.props.dispatch(checkbox_checked_poll(selectedRowKeys,selectedPools));
    }
    ok_add_pool_win(){
        const {dispatch} = this.props;
        const form = this.refs.pools.refs.formAddPool

        this.formvalues = form.getFieldsValue();
        form.validateFields((errors, values) => {
            if (errors) {
                // console.log(errors.pool_name)
                console.log('--------------%s------------', JSON.stringify(errors));
            }else{
                const values = form.getFieldsValue();
                // console.log(values)
                dispatch(add_pool({
                    /* 磁盘disks 79 暂时可以用，后面改成动态获取可用磁盘 */
                    'disks':values.pool_disks,
                    name:values.pool_name,
                    //size:values.pool_size,
                    options:{
                        type:'zfs',
                        raidtype:values.pool_type,
                        name:'test1111'
                    }
                }, form));
            }
        });
    }
    close_add_pool_win(){
        const {dispatch} = this.props
        dispatch(close_add_pool_win())
    }
    open_add_pool_win() {
        const form = this.refs.pools.refs.formAddPool
        if(form){
            form.resetFields();
            //fix the bug of antdesign about can't reset checkbox selected style class after call resetfiled method.
            /*const checkboxs = ReactDOM.findDOMNode(form.getFieldInstance('pool_disks')).children;
            for(let i=0;i<checkboxs.length;i++){
                checkboxs[i].children[0].setAttribute('class', 'ant-checkbox');
            }*/
        }
        const {dispatch} = this.props
        dispatch(open_add_pool_win())
    }
    getItemById(id){
        const items = this.props.pools.items;
        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    open_update_pool_win() {
        const rowKeys = this.props.pools.selectedRowKeys;
        const form = this.refs.pools.refs.formAddPool
        if(rowKeys && rowKeys.length == 1){
            this.props.dispatch(open_update_pool_win(this.getItemById(rowKeys[0])));
        }else{
            Modal.error({
                title: 'CDP系统提示！',
                content: !rowKeys || rowKeys.length == 0 ? '请选择一条记录更新！' : '每次只能选择一条记录更新！',
            });
        }
    }
    close_update_pool_win(){
        this.props.dispatch(close_update_pool_win());
    }
    ok_update_pool_win(){
        const {dispatch} = this.props;
        const form = this.refs.pools.refs.formAddPool
        this.formvalues = form.getFieldsValue();
        form.validateFields((errors, values) => {
            if (errors) {
                console.log('--------------%s------------', JSON.stringify(errors));
            }else{
                const values = form.getFieldsValue();
                dispatch(update_pool({
                    id: values.pool_id,
                    'disks':values.pool_disks,
                    name:values.pool_name,
                    //size:values.pool_size,
                    options:{
                        type:'zfs',
                        raidtype:values.pool_type,
                        name:'test1111'
                    }
                }, form));
            }
        });
    }

    del_pool_win() {
        const rowKeys = this.props.pools.selectedRowKeys;
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
                        this.props.dispatch(del_pool(rowKeys[i]));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }

    toggle_display() {
        this.props.dispatch(fetch_pools())
    }

    componentDidMount() {
        const {dispatch} = this.props
        const {didInvalidate} = this.props.pools
        //console.info('PoolsContainer did mount')
        //if (didInvalidate===true) dispatch(fetch_pools())
        dispatch(fetch_pools())
        dispatch(fetch_disks())
    }


    render() {
        const {pools,disks} = this.props
        const {dispatch} = this.props
        const winevents = {
            open_add_pool_win : this.open_add_pool_win,
            close_add_pool_win : this.close_add_pool_win,
            ok_add_pool_win : this.ok_add_pool_win,
            open_update_pool_win : this.open_update_pool_win,
            close_update_pool_win : this.close_update_pool_win,
            ok_update_pool_win : this.ok_update_pool_win,

            del_pool_win : this.del_pool_win,
            toggle_display : this.toggle_display,

            onListSelectChange : this.onListSelectChange
        };
        // console.log(pools)
        return (
            <div>
                <Pools {...pools} {...winevents} ref="pools" dispatch={dispatch} disks={disks.items} pools={pools}/>
            </div>
        )
    }
}

PoolsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        pools:state.pools,
        disks:state.disks
    }
}
export default connect(mapStateToProps)(PoolsContainer)