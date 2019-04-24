/**
 * Created by tanglinhai on 2016/9/2.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetch_users,
    del_users,
    open_add_user_win,
    close_add_user_win,
    add_user,
    update_user,
    open_update_user_win,
    close_update_user_win,
    checkbox_checked_users,
    receive_user_form_state,
    open_update_user_perm,
    close_update_user_perm,
    update_user_perm,

} from '../../actions/useractions'
import Users from '../../components/user/users'
import ModifyPerm from '../../components/user/modify_perm'
import NotFound from '../../components/common/notfound';
import Loading from '../../components/common/loading'
import  {Modal}  from 'antd'
const confirm = Modal.confirm;
class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.onListSelectChange = this.onListSelectChange.bind(this)
        this.del_user_win = this.del_user_win.bind(this)
        this.open_add_user_win = this.open_add_user_win.bind(this)
        this.close_add_user_win = this.close_add_user_win.bind(this)
        this.ok_add_user_win = this.ok_add_user_win.bind(this)
        this.open_update_user_win = this.open_update_user_win.bind(this)
        this.close_update_user_win = this.close_update_user_win.bind(this)
        this.ok_update_user_win = this.ok_update_user_win.bind(this)
        this.getItemById = this.getItemById.bind(this)
        this.getTableSelectRowKeys = this.getTableSelectRowKeys.bind(this)
        this.getUserForm = this.getUserForm.bind(this)
        this.handle_open_update_user_perm = this.handle_open_update_user_perm.bind(this)
        this.handle_close_update_user_perm = this.handle_close_update_user_perm.bind(this)
        this.handle_submit_update_user_perm = this.handle_submit_update_user_perm.bind(this)
    }

    del_user_win() {
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
                        this.props.dispatch(del_users(rowKeys[i]));
                    }
                }.bind(this),
                onCancel() {},
            });
        }
    }
    getUserForm(){
        return this.refs.users.refs.formAddUser;
    }
    open_add_user_win(){
        this.props.dispatch(open_add_user_win())
    }
    close_add_user_win(){
        this.props.dispatch(close_add_user_win())
    }
    ok_add_user_win(){
        const form = this.getUserForm()
        form.validateFields((errors, values) => {
            if (errors) {
                console.log('--------------%s------------', JSON.stringify(errors));
                const fields = form.fields;
                setTimeout(function(f, fes){f.setFields(fes);}.bind(this, form, fields), 10);
                const state = {}
                for(var key in errors){
                    if(errors[key].errors && errors[key].errors.length > 0){
                        state[key+'ValidateStatus'] = 'error'
                    }
                }
                this.props.dispatch(receive_user_form_state(state));
            }else{
                //const values = form.getFieldsValue();
                this.props.dispatch(add_user(form));
            }
        });
    }

    open_update_user_win(){
        const rowKeys = this.getTableSelectRowKeys();
        const form = this.getUserForm()
        if(rowKeys && rowKeys.length == 1){
            this.props.dispatch(open_update_user_win(this.getItemById(rowKeys[0])));
        }else{
            Modal.error({
                title: 'CDP系统提示！',
                content: !rowKeys || rowKeys.length == 0 ? '请选择一条记录更新！' : '每次只能选择一条记录更新！',
            });
        }
    }
    close_update_user_win(){
        this.props.dispatch(close_update_user_win())
    }
    ok_update_user_win(){
        const form = this.getUserForm()
        form.validateFields((errors, values) => {
            if (errors) {
                console.log('--------------%s------------', JSON.stringify(errors));
                const fields = form.fields;
                setTimeout(function(f, fes){f.setFields(fes);}.bind(this, form, fields), 10);
                const state = {}
                for(var key in errors){
                    if(errors[key].errors && errors[key].errors.length > 0){
                        state[key+'ValidateStatus'] = 'error'
                    }
                }
                this.props.dispatch(receive_user_form_state(state));
            }else{
                //const values = form.getFieldsValue();
                this.props.dispatch(update_user(form));
            }
        });
    }
    onListSelectChange(selectedRowKeys) {
        this.props.dispatch(checkbox_checked_users(selectedRowKeys));
    }
    getTableSelectRowKeys(){
        return this.props.userManageState.selectedRowKeys
    }
    getItemById(id){
        const items = this.props.userManageState.items;
        const itemLen = items.length;
        for(let i=0;i<itemLen;i++){
            if(items[i].id == id){
                return items[i];
            }
        }
        return null;
    }
    componentDidMount() {
        if (this.props.userManageState.didInvalidate===true) {
            this.props.dispatch(fetch_users())
        }
    }
    handle_open_update_user_perm(){
        const{userManageState}=this.props
        const rowKeys =userManageState.selectedRowKeys
        if(rowKeys && rowKeys.length == 1){
            this.props.dispatch(open_update_user_perm())
        }else{
            Modal.error({
                title: 'CDP系统提示！',
                content: !rowKeys || rowKeys.length == 0 ? '请选择一个用户进行修改！' : '每次只能选择一条记录更新！',
            });
        }

        
    }
    handle_close_update_user_perm(){
        this.props.dispatch(close_update_user_perm())
    }
    handle_submit_update_user_perm(per){
        const{dispatch,userManageState}=this.props
        // console.log()
        // console.log()
        dispatch(update_user_perm(userManageState.selectedRowKeys[0],per.permissions))

    }
    render() {
        const winevents = {
            onListSelectChange: this.onListSelectChange,
            del_user_win: this.del_user_win,
            open_add_user_win: this.open_add_user_win,
            close_add_user_win: this.close_add_user_win,
            ok_add_user_win: this.ok_add_user_win,
            open_update_user_win: this.open_update_user_win,
            close_update_user_win: this.close_update_user_win,
            ok_update_user_win: this.ok_update_user_win,
            getTableSelectRowKeys: this.getTableSelectRowKeys,
            open_update_user_perm:this.handle_open_update_user_perm,
            close_update_user_perm:this.handle_close_update_user_perm

        };
        const {userManageState}=this.props
        return (
            <div>
                <ModifyPerm users={userManageState} onOk={this.handle_submit_update_user_perm} onCancel={this.handle_close_update_user_perm} dispatch={this.props.dispatch} visible={userManageState.permission_modal} /> 
                <Users  {...this.props.userManageState} {...winevents} ref="users" dispatch={this.props.dispatch} />
            </div>
        )
    }
}

UsersContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        userManageState:state.userManageState
    }
}
export default connect(mapStateToProps)(UsersContainer)
