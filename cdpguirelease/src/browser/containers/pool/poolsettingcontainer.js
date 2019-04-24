/**
 * Created by tanglinhai on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetch_pool,
    checkbox_checked_pool_volumes,
    del_pool_volumes,
    open_add_volume_win,
    close_add_volume_win,
    open_update_volume_win,
    close_update_volume_win,
    add_volume
} from '../../actions/poolsettingactions'
import {fetch_volumes} from '../../actions/actions'
import PoolSetting from '../../components/storage/poolsetting'
import NotFound from '../../components/common/notfound';
import Loading from '../../components/common/loading'
import  {Modal}  from 'antd'
const confirm = Modal.confirm;
class PoolSettingContainer extends Component {
    constructor(props) {
        super(props)
        this.onListSelectChange = this.onListSelectChange.bind(this)
        this.del_volume_win = this.del_volume_win.bind(this)
        this.open_add_volume_win = this.open_add_volume_win.bind(this)
        this.close_add_volume_win = this.close_add_volume_win.bind(this)
        this.ok_add_volume_win = this.ok_add_volume_win.bind(this)
        this.open_update_volume_win = this.open_update_volume_win.bind(this)
        this.close_update_volume_win = this.close_update_volume_win.bind(this)
        this.ok_update_volume_win = this.ok_update_volume_win.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.getTableSelectRowKeys = this.getTableSelectRowKeys.bind(this)
        this.getVolumeForm = this.getVolumeForm.bind(this)
    }

    del_volume_win() {
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
                        this.props.dispatch(del_pool_volumes(this.props.poolSetting.pool.id, rowKeys[i], this.props.params.type));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    getVolumeForm(){
        return this.refs.poolSetting.refs.formAddVolume;
    }
    open_add_volume_win(){
        const form = this.getVolumeForm()
        form && form.resetFields();
        this.props.dispatch(open_add_volume_win())
    }
    close_add_volume_win(){
        this.props.dispatch(close_add_volume_win())
    }
    ok_add_volume_win(){
        const {dispatch} = this.props;
        const form = this.getVolumeForm()

        this.formvalues = form.getFieldsValue();
        form.validateFields((errors, values) => {
            if (errors) {
                console.log('--------------%s------------', JSON.stringify(errors));
            }else{
                //const values = form.getFieldsValue();
                dispatch(add_volume(this.props.params.poolId, form, this.props.params.type));
            }
        });
    }

    open_update_volume_win(){
        const rowKeys = this.getTableSelectRowKeys();
        const form = this.getVolumeForm()
        if(rowKeys && rowKeys.length == 1){
            this.props.dispatch(open_update_volume_win(this.getItemById(rowKeys[0])));
        }else{
            Modal.error({
                title: 'CDP系统提示！',
                content: !rowKeys || rowKeys.length == 0 ? '请选择一条记录更新！' : '每次只能选择一条记录更新！',
            });
        }
    }
    close_update_volume_win(){
        this.props.dispatch(close_update_volume_win())
    }
    ok_update_volume_win(){
        alert('ok_update_volume_win');
    }
    onListSelectChange(selectedRowKeys) {
        this.props.dispatch(checkbox_checked_pool_volumes(selectedRowKeys, this.props.params.type));
    }
    getTableSelectRowKeys(){
        if(this.props.params.type == 'zvol'){
            return this.props.poolSetting.selectedZvolRowKeys
        }else
            return this.props.poolSetting.selectedZfsRowKeys

    }
    getItemById(id){
        const items = this.props.poolSetting.volumes.items;
        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    componentDidMount() {
        if (this.props.poolSetting.didInvalidate===true) {
            this.props.dispatch(fetch_pool(this.props.params.poolId))
        }else if(this.props.poolSetting.pool.id != this.props.params.poolId) {
            this.props.dispatch(fetch_pool(this.props.params.poolId))
        }
        this.props.dispatch(fetch_volumes())
    }
    render() {
        const winevents = {
            onListSelectChange: this.onListSelectChange,
            del_volume_win: this.del_volume_win,
            open_add_volume_win: this.open_add_volume_win,
            close_add_volume_win: this.close_add_volume_win,
            ok_add_volume_win: this.ok_add_volume_win,
            open_update_volume_win: this.open_update_volume_win,
            close_update_volume_win: this.close_update_volume_win,
            ok_update_volume_win: this.ok_update_volume_win,
            getTableSelectRowKeys: this.getTableSelectRowKeys
        };
        const volumelist = this.props.volumes
        if (this.props.poolSetting.pool !== undefined){
            return (
                <PoolSetting {...this.props.poolSetting} {...winevents} ref="poolSetting" dispatch={this.props.dispatch} listType={this.props.params.type} currPoolId={this.props.params.poolId}
                volumelist={volumelist}/>
            )
        }
        else {
            return (
                <Loading loading={this.props.poolSetting.isFetching} hasBg='false'/>
            )
        }
    }
}

PoolSettingContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        poolSetting:state.poolSetting,
        volumes:state.volumes
    }
}
export default connect(mapStateToProps)(PoolSettingContainer)
