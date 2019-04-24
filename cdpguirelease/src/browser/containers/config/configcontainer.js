import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_config,toggle_config,set_config_status} from '../../actions/configaction'
import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import Config from '../../components/config/config'
import auth from '../../utils/auth'
const confirm = Modal.confirm;

class ConfigContainer extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        const {dispatch,config} = this.props
        if(config.items.length<=0){
            dispatch(fetch_config())
        }
    }
    handleChange(selectedRowKeys, selectedRows) {
        // console.log(selectedRowKeys, selectedRows)
        const {dispatch,config} = this.props
        dispatch(toggle_config(selectedRowKeys,selectedRows))
    }

    render() {
        const {dispatch,config}=this.props
        return (
            <Config dispatch={dispatch} items={config.items} onChange={this.handleChange} selectedRowKeys={config.selectedRowKeys} selectedConfig={config.selectedConfig} ></Config>
        );
    }
}

ConfigContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        config: state.config
    }
}

export default connect(mapStateToProps)(ConfigContainer);