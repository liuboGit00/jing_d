import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetch_disks,toggle_disk} from '../actions/actions'
import {fetch_target_reload} from '../actions/iscsiactions'

import Disk from '../components/disk/disk'
import {Spin,Row,Icon,Button} from 'antd'
import SearchInput from '../components/common/searchinput'

class DisksContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

    }

   
    componentDidMount() {
        const {dispatch} = this.props
        const {didInvalidate} = this.props.disks
        //if (didInvalidate === true) dispatch(fetch_disks())
        dispatch(fetch_disks())
    }

   

    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_disk(selectedRowKeys,selectedRows))
    }
    handleSearch(searchKey){
        this.props.dispatch(fetch_disks({searchKey:searchKey}))
    }
    handleScsirescan(){
        this.props.dispatch(fetch_target_reload())
    }
    render() {
        const {disks} = this.props
        // console.log(disks)
        // console.log(disks.items)
       
        return (
            <div>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="hdd" />硬盘列表</label>
                </Row>
                <Row className="table_toolbar">
                    <SearchInput placeholder="输入查询内容" className="cdp_button_right" onSearch={this.handleSearch.bind(this) } ref="searchInput"></SearchInput>
                    <Button type='target' icon='reload' className="cdp_button_right"  onClick={this.handleScsirescan.bind(this)}>扫描</Button>
                </Row>   
                {disks.isFetching ? <Spin /> : <Disk items={disks.items} onChange={this.handleChange} selectedDisks={disks.selectedDisks} selectedRowKeys={disks.selectedRowKeys}/>}
            </div>
        )
    }
}

DisksContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    
    
    return {
        disks:state.disks
    }
}
export default connect(mapStateToProps)(DisksContainer)
