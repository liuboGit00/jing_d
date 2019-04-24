import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {Row,Spin,Icon,Button,Modal,message} from 'antd'
import {fetch_clouds,fetch_cloud_host,register_cloud_agent,toggle_clouds_host_iscsitgt,fetch_cloud_host_hba,
    add_cloud_host_iscsitgt,echo_cloud_host_iscsitgt,close_cloud_host_iscsitgt,delete_cloud_host_iscsitgt,
    fetch_cloud_host_luns,

} from '../../actions/cloudactions'
import auth from '../../utils/auth'
import Cloudhostdetail from '../../components/cloud/cloud_host_detail'
import CreateIscsitgt from '../../components/cloud/create_iscsitgt'
import {fetch_volumes} from '../../actions/actions'

class CloudhostdetailContainer extends Component {
    constructor(props) {
        super(props);
        // this.handlechange = this.handlechange.bind(this)
        // this.handle_register_cloud_agent =this.handle_register_cloud_agent.bind(this)
        this.handleiscsitgtchange = this.handleiscsitgtchange.bind(this)
        this.handledeleteiscsitgt = this.handledeleteiscsitgt.bind(this)
        this.handleaddiscsitgt = this.handleaddiscsitgt.bind(this)
        this.handle_submit_iscsitgt = this.handle_submit_iscsitgt.bind(this)
        this.handle_close_iscsitgt = this.handle_close_iscsitgt.bind(this)
    }
    componentDidMount() {
        const{dispatch,clouds,volumes}=this.props
        let id = window.location.href.split('?')[0].split('/')[5]
        let name = window.location.href.split('?')[0].split('/').pop()


        if(clouds.items.length<=0){
            dispatch(fetch_clouds())
        }
        if(!clouds.list_host){
            dispatch(fetch_cloud_host(id))
        }
        if(!clouds.host_hba){
            dispatch(fetch_cloud_host_hba(id))
        }
        if(!clouds.list_lun){
            dispatch(fetch_cloud_host_luns(id,name))
        }
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        
        
    }
    handleiscsitgtchange(selectedRowKeys, selectedRows){
        // console.log(selectedRowKeys, selectedRows)
        this.props.dispatch(toggle_clouds_host_iscsitgt(selectedRowKeys, selectedRows))
    }
    handledeleteiscsitgt(){
        const {dispatch,clouds} =this.props
        let del = clouds.selectedCloudshostiscsitgt
        let id = window.location.href.split('?')[0].split('/')[5]
        const confirm = Modal.confirm;
        if(del.length==0){
            confirm({
                title: 'CDP系统提示！',
                content: '请选择你要删除的内容。',
                onOk() {},
                onCancel() {},
            });
        }else{
             confirm({
                title: '您是否确认要删除已选择的内容',
                content: '删除后将无法恢复',
                onOk() {
                    for (var i = 0; i < del.length; i++) {
                        dispatch(delete_cloud_host_iscsitgt(del[i],id))
                    };
                },
                onCancel() { },
            });
            
        }
        
    }
    handleaddiscsitgt(){
        const {dispatch} = this.props
        dispatch(echo_cloud_host_iscsitgt())
       
    }
    handle_submit_iscsitgt(iscsitgt){
        const {dispatch}=this.props
        console.log(iscsitgt)
         dispatch(add_cloud_host_iscsitgt(iscsitgt))
    }
    handle_close_iscsitgt(){
        const {dispatch}=this.props
        dispatch(close_cloud_host_iscsitgt())

    }
    render() {
        const {dispatch,clouds,volumes} = this.props
        let listname = window.location.href.split('?')[0].split('/').pop()
        let hosthba = clouds.host_hba;
        let Arr=[];
        let hbaArr=[];
        let hbaname=[];
        if(hosthba){
            for(let k in hosthba){
                for(let i in hosthba[k]){
                    Arr.push(hosthba[k][i])
                }
            };
            for(let i=0;i<Arr.length;i++){
                for(let k in Arr[i]){
                    Arr[i][k].name=k
                    hbaArr.push(Arr[i][k])
                }
            }
            for(let i=0;i< hbaArr.length;i++){
                if(hbaArr[i].type=='InternetScsiHba'){
                    hbaname.push(hbaArr[i].name)
                }
            }
        }
        // console.log(clouds.list_lun)
        return (
            <Row>
                <Row className="table_title">
                    <label className="cdp_label"> <Icon type="file" />{listname}</label>
                </Row>
                <Row>
                    <Cloudhostdetail  IscsitgtChange={this.handleiscsitgtchange}  hosthba={clouds.host_hba} IscsitgtselectedRowKeys={clouds.selectedCloudiscsitgtRowKeys}
                      volumes={volumes.items}  clouds={clouds.items}  hostlun={clouds.list_lun} onChange={this.handleiscsitgtchange} deliscsitgt={this.handledeleteiscsitgt} addiscsitgt={this.handleaddiscsitgt}
                    />
                </Row>
                <Row>
                    {clouds.create_iscsitgt_modal?<CreateIscsitgt hba={hbaname} iscsitgtloading={clouds.add_iscsitgt_loading}  visible={clouds.create_iscsitgt_modal} onOk={this.handle_submit_iscsitgt} onCancel={this.handle_close_iscsitgt} />:<div></div>}
                </Row>
            </Row>
        );
        
    }
}

CloudhostdetailContainer.propTypes = {

};

function mapStateToProps(state) {

    return {
        clouds:state.clouds,
        volumes:state.volumes,
    }
}
export default connect(mapStateToProps)(CloudhostdetailContainer)