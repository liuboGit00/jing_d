import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_volumes} from '../../actions/actions'
import {fetch_pools,} from '../../actions/poolactions'

import  {Row, Col, Menu,Icon, Button, Input, Modal, Spin, Table}  from 'antd'
import Echart from '../../components/config/echart'
import auth from '../../utils/auth'
const confirm = Modal.confirm;

class EchartContainer extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount() {
        const {dispatch,volumes,pools} = this.props
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        if(pools.items.length<=0){
            dispatch(fetch_pools())
        }
    }
    
    handleChange(selectedRowKeys, selectedRows){
    }


    render() {
        const {dispatch,volumes,pools}=this.props
        let pool=[]
        if(pools.items.length>0){
            for(let i=0;i<pools.items.length;i++){
                if(pools.items[i].usage!=undefined&&pools.items[i].usage.free!=undefined){
                    pool.push(pools.items[i])
                }
            }
        }
        
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="laptop" />报表信息</label>
                </Row>
                <Row>
                {pools.items.length>0?<Echart  dispatch={dispatch} items={volumes.items}  pools={pool} />:<div></div>}   
                </Row>
            </Row>
        );
    }
}
EchartContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        volumes:state.volumes,
        pools:state.pools,  
    }
}

export default connect(mapStateToProps)(EchartContainer);