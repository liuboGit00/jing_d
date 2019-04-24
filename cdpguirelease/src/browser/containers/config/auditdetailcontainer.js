import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_auditlogs,toggle_auditlogs,} from '../../actions/auditactions'
import {fetch_volumes,} from '../../actions/actions'
import {Link} from 'react-router'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import AuditDetail from '../../components/config/auditdetail'
import auth from '../../utils/auth'
const confirm = Modal.confirm;

class AuditDetailContainer extends Component{
    componentDidMount() {
        const {dispatch,audit,volumes} = this.props
        if(audit.items.length<=0){
            dispatch(fetch_auditlogs())
        }
    }
    render() {
        const {dispatch,audit}=this.props
        // console.log(audit)
                    
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />信息详情</label>
                </Row>
                <Row className="table_toolbar">
                    <Link to="/audit" style={{marginLeft:5}} className="cdp_button_right"><Button type='ghost'  icon='rollback'>返回</Button></Link>
                </Row>
                <Row>
                    <AuditDetail dispatch={dispatch} items={audit.items}  />
                </Row>
            </Row>


            
        );
    }
}

AuditDetailContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        audit: state.audit,
    }
}

export default connect(mapStateToProps)(AuditDetailContainer);