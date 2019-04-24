import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_auditlogs,toggle_auditlogs,delete_auditlogs} from '../../actions/auditactions'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import Audit from '../../components/config/audit'
import auth from '../../utils/auth'
const confirm = Modal.confirm;

class AuditContainer extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        const {dispatch,audit} = this.props
        if(audit.items.length<=0){
            dispatch(fetch_auditlogs())
        }
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        const {dispatch,audit} = this.props
        dispatch(toggle_auditlogs(selectedRowKeys,selectedRows))
    }


    render() {
        const {dispatch,audit}=this.props
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />审计信息</label>
                </Row>
                <Row>
                    <Audit dispatch={dispatch} items={audit.items} onChange={this.handleChange} selectedRowKeys={audit.selectedRowKeys} selectedAudit={audit.selectedAudit} />
                </Row>
            </Row>
        );
    }
}

AuditContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        audit: state.audit
    }
}

export default connect(mapStateToProps)(AuditContainer);