import React, {Component, PropTypes} from 'react';
import TargetDetail from '../../components/iscsi/targetdetail'
import {connect} from 'react-redux'
import auth from '../../utils/auth'
import {fetch_targetdetail,fetch_iscsi,toggle_targetdetail,echo_modify_option,
        close_modify_option,create_modify} from '../../actions/iscsiactions'
import ModifyOption from '../../components/iscsi/modify_option'
import {Button,Spin,Modal,Icon} from 'antd'

class TargetDetailContainer extends Component {
    constructor(props){
        super(props)
        this.handle_modify_option = this.handle_modify_option.bind(this)
        this.submit_modify_option = this.submit_modify_option.bind(this)
        this.handle_close_modify_option = this.handle_close_modify_option.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        const {dispatch} = this.props
        const {iscsi} = this.props
        var id = this.props.params.targetId
        if(iscsi.items.length<=0){
            dispatch(fetch_iscsi())
        }
        
        dispatch(fetch_targetdetail(id))
    }
    handle_modify_option() {
        const {dispatch,iscsi} = this.props
        
        const std = iscsi.selectedTargetdetail
        if(std.length==1){
            dispatch(echo_modify_option())
        }
    }
    submit_modify_option(modify){
        const {dispatch} = this.props
        const targetId = this.props.params.targetId
        const confirm = Modal.confirm;
        confirm({
            title: '您确定要修改高级选项吗',
            content: '请确定了解高级选项的内容',
            onOk() {
                dispatch(create_modify(modify,targetId,auth))
            },
            onCancel() {},
        });
    }
    handle_close_modify_option(){
        const {dispatch} = this.props
        dispatch(close_modify_option())
    }

    handleChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys,selectedRows)
        this.props.dispatch(toggle_targetdetail(selectedRowKeys, selectedRows))
    }
    render() {
        const {iscsi} = this.props
        if(iscsi.items.length>0){
            if (iscsi.isFetching) { return <Spin /> } else {
            return (
                <div>
                    <TargetDetail targetdetail={iscsi.targetdetail} onChange={this.handleChange} selectedRowKeys={iscsi.selectedRowKeys} echooption={this.handle_modify_option}/>
                    <ModifyOption  ref="modifyoption"  visible={iscsi.modify_option} onOk={this.submit_modify_option}  onCancel={this.handle_close_modify_option}  targetdetail={iscsi.targetdetail} targetmodify={iscsi.selectedTargetdetail}/>
                </div>

            )}
        }else{
            return false
        }

    
    }
}

TargetDetailContainer.propTypes = {

};

function mapStateToProps(state) {


    return {
        iscsi: state.iscsi,
    }
}
export default connect(mapStateToProps)(TargetDetailContainer)