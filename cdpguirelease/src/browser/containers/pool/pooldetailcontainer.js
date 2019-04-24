import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {select_pool} from '../../actions/poolactions'
import PoolDetail from '../../components/storage/pooldetail'
import { Spin } from 'antd';
import {fetch_disks} from '../../actions/actions'
import {fetch_pools,fetch_pool_volume} from '../../actions/poolactions'

 
class PoolDetailContainer extends Component {
     constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        const poolId = this.props.params.poolId
        console.log(poolId)
        dispatch(select_pool(poolId))
        dispatch(fetch_pool_volume(poolId))
        const {disks,pools} = this.props
        if(disks.items.length==0){
            dispatch(fetch_disks())
        }
        if(pools.items.length==0){
            dispatch(fetch_pools())
            
        }

    }
    render() {
        var pool
        const {disks,pools} = this.props
        // console.log(pools)
        const id = window.location.hash.split('?')[0].split('/').pop()
        if(pools.items!=''){
            for(let i=0;i<pools.items.length;i++){
                if(pools.items[i].id==id){
                       pool = pools.items[i]
                }
            }
        }
        // console.log(pool)
        if (pool !== undefined){
        return (<div>
                {disks.isFetching?<Spin />:<PoolDetail item={pool} poolvolume={pools.poolvolume} disks={disks.items}/>}
            </div>)
        }
        else {
            return (
                <div>
                    <Spin/>
                </div>
            )
        }
    }
}

PoolDetailContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
     
    return {
        disks:state.disks,
        pools:state.pools,
    }
}
export default connect(mapStateToProps)(PoolDetailContainer)
