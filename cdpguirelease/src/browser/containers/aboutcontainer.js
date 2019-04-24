/**
 * Created by tanglinhai on 2016/9/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {

} from '../actions/aboutactions'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import About from '../components/about/about'
import auth from '../utils/auth'
const confirm = Modal.confirm;

class AboutContainer extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <About {...this.props.aboutState} dispatch={this.props.dispatch}></About>
        );
    }
}

AboutContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        aboutState: state.aboutState
    }
}

export default connect(mapStateToProps)(AboutContainer);