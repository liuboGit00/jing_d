/**
 * Created by tanglinhai on 2016/9/14.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import Operation from '../components/operation/operation'
import auth from '../utils/auth'
const confirm = Modal.confirm;

class OperationContainer extends Component{
    constructor(props){
        super(props);
        this.handleLookOperation = this.handleLookOperation.bind(this);

        this.state = {
            showOrHide: false
        };
    }
    handleLookOperation(e){
        this.setState({
            showOrHide: !this.state.showOrHide
        });
    }
    render() {
        return (
            <div className={this.state.showOrHide ? 'operations operationsActive' : 'operations'}>
                <div className="title"><Icon type="file-text"/>&nbsp;&nbsp;我的操作记录（最多存储最近操作70条记录）</div>
                <hr/>
                <div className="content">
                    <Operation {...this.props.operationState} dispatch={this.props.dispatch}/>
                </div>
                <div className="lookOperationBtn" onClick={this.handleLookOperation}><Icon type="message"/>&nbsp;&nbsp;日志<div></div></div>
            </div>
        );
    }
}

OperationContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        operationState: state.operationState
    }
}

export default connect(mapStateToProps)(OperationContainer);