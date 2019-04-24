import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {fetch_script}from '../../actions/scriptaction'
import ScriptsDetail from '../../components/agent/scriptdetail'
import {fetch_agents} from '../../actions/actions'
import auth from '../../utils/auth'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
const confirm = Modal.confirm;
class ScriptDetailContainer extends Component{
    componentDidMount() {
        // console.log(this.props)
        const {dispatch,scripts,agents} = this.props
        console.log(scripts,agents)
        if(scripts.items.length<=0){
            dispatch(fetch_script())
        }
        if(agents.items.length<=0){
            dispatch(fetch_agents())
        }
        
    }


    render() {
        const {dispatch,scripts,agents} = this.props;
        // console.log(scripts)
        return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="file-text" />客户端脚本内容</label>
                    </Row>
                    <Row>
						<ScriptsDetail  items={scripts.items}/>
					</Row>
                </Row>
        )
        
    }
}

ScriptDetailContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state){
	return{
		agents:state.agents,
		scripts:state.scripts,

	}
}
export default connect(mapStateToProps)(ScriptDetailContainer)




