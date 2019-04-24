import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Cloudlun from '../../components/cloud/cloudlun'
import {Row,Spin,Icon,Button,Modal} from 'antd'
import {scan_cloud_host_lun,fetch_clouds,fetch_cloud_host_luns,fetch_cloud_host,
} from '../../actions/cloudactions'
import {fetch_volumes} from '../../actions/actions'
import {Link} from 'react-router'


class CloudlunContainer extends Component {
    constructor(props) {
        super(props);
        this.handle_scan_lun = this.handle_scan_lun.bind(this);
        this.handle_get_cloud_host = this.handle_get_cloud_host.bind(this);
    }
    componentWillMount() {
        const id =window.location.href.split('?')[0].split('/').pop()
        const{clouds,volumes,clones,dispatch}=this.props
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        if(clouds.items.length<=0){
            dispatch(fetch_clouds())
        }
        if(!clouds.list_host){
            dispatch(fetch_cloud_host(id))
        }
        
    }
    
    handle_get_cloud_host(){
        const {dispatch,clouds} =this.props
        const id =window.location.href.split('?')[0].split('/').pop()
        if(clouds.list_host){
           for(let i=0;i<clouds.list_host.length;i++){
                dispatch(fetch_cloud_host_luns(id,clouds.list_host[i]))
           } 
        }
    }
    handle_scan_lun(){
        const {dispatch,clouds} =this.props
        let arr = window.location.href.split('?')[0].split('/')
        if(clouds.list_host){
           for(let i=0;i<clouds.list_host.length;i++){
            // console.log(arr[arr.length-1],clouds.list_host[i],arr[arr.length-2])
                dispatch(scan_cloud_host_lun(arr[arr.length-1],clouds.list_host[i],arr[arr.length-2]))
           } 
        }
    }   
    render() {
        const {dispatch,clouds,volumes} = this.props
        // console.log(clouds.list_lun)
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"><Icon type="cloud-upload-o" />vmware客户端映射卷</label>
                </Row>
                <Row className="table_toolbar">
                    <Link to={`/clouds`} className="cdp_button_right"><Button type='ghost'   icon='rollback'>返回</Button></Link>

                    <Button type='ghost' className="cdp_button_left" icon='download' onClick={this.handle_get_cloud_host}>获取所有盘</Button>

                    <Button type='ghost' className="cdp_button_left" icon='scan' onClick={this.handle_scan_lun}>扫描映射卷</Button>
                </Row>
                <Cloudlun  luns={clouds.list_lun}  hosts={clouds.list_host}  volumes={volumes.items} />
                
            </Row>
        );
        
    }
}

CloudlunContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        clouds:state.clouds,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(CloudlunContainer)