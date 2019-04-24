import React, {Component, PropTypes} from 'react';
import MirrorDetailContainer from '../../containers/agent/mirrordetailcontainer'
import {Row, Col, Menu,Icon, Button, Input, Modal, Spin,Table,Alert,Collapse } from 'antd'
import {fetch_initiators} from '../../actions/actions'
import {fetch_mirrors} from '../../actions/mirroraction'
import {Link} from 'react-router'
const Panel = Collapse.Panel;



class MirrorDetail extends Component {
    componentDidMount() {
    }

    render() {
        const {mirrordetail,volumes,agents,ipaddress,host} = this.props
        if(volumes != ''){
            mirrordetail.agentlog=[];
            if(mirrordetail.getagentendpoint!=''){
                for(let i=0;i<agents.length;i++){
                    for(let j=0;j<mirrordetail.getagentendpoint.length;j++){
                        if(mirrordetail.getagentendpoint[j].agent == agents[i].url){
                           mirrordetail.agentlog.push({agent_name:agents[i].name})
                        } 
                    }
                }
            }else{
                    mirrordetail.agentlog.push({agent_name:null})
            }
            for(let i=0;i<ipaddress.length;i++){
                if(mirrordetail.getlocalendpoint!=''&&mirrordetail.getlocalendpoint[0].ipaddress == ipaddress[i].url){
                   mirrordetail.agentlog.push({address:ipaddress[i].address}) 
                }
            }
            let vo
            if(mirrordetail.getlocalendpoint!=''){
                for(let i=0;i<volumes.length;i++){
                    if(volumes[i].url==mirrordetail.getlocalendpoint[0].volume){
                        vo = volumes[i].name
                        break
                    }
                    vo='未知'
                }
            }
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="laptop" />{mirrordetail.name}</label>
                    </Row>
                    <Row className="taskDetail">
                        <Row>
                            <Col className="col_left" span="5">id</Col>
                            <Col className="col_dot" span="1">：</Col>
                            <Col className="col_right" span="8">{mirrordetail.id}</Col>
                        </Row>
                        <Row>
                            <Col className="col_left" span="5">端口号</Col>
                            <Col className="col_dot" span="1">：</Col>
                            <Col className="col_right" span="8">{mirrordetail.port}</Col>
                        </Row>
                        <Row>
                            <Col className="col_left" span="5">传输协议</Col>
                            <Col className="col_dot" span="1">：</Col>
                            <Col className="col_right" span="8">{mirrordetail.protocol}</Col>
                        </Row>
                        <Row>
                            <Col className="col_left" span="5">传输速度</Col>
                            <Col className="col_dot" span="1">：</Col>
                            <Col className="col_right" span="8">{mirrordetail.syncer_rate}</Col>
                        </Row>
                        <Row>
                            <Col className="col_left" span="5">镜像卷</Col>
                            <Col className="col_dot" span="1">：</Col>
                            <Col className="col_right" span="8"><Link to={`/volumes/${mirrordetail.volume.split('/').pop()}`}>{mirrordetail.name}</Link></Col>
                        </Row>
                        {mirrordetail.getlocalendpoint==''?
                           (<Row>
                               <Col className="col_left" span="5">本地端1</Col>
                               <Col className="col_dot" span="1">：</Col>
                               <Col className="col_right" span="8">未知</Col>
                            </Row>):(
                            <Row className='clearfloat'>
                                <Collapse style={{float:'left', color:'rgb(90, 90, 90)', lineHeight:'40px',border:'none', width:'58.4%',borderRadius:'8px',backgroundColor:' #f1f1f1',}}>
                                    <Panel header='本地端1' showArrow={true} style={{border:'none'}}>
                                        <Row>
                                            <Col className="col_left" span="5">本地卷</Col>
                                            <Col className="col_dot" span="1">：</Col>
                                            <Col className="col_right" span="8">{mirrordetail.getlocalendpoint[0].volume?vo:'未知'}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">本地元盘</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.getlocalendpoint[0].metadisk?mirrordetail.getlocalendpoint[0].metadisk:'未知'}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">IP</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.agentlog[1].address}</Col>
                                        </Row><Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">镜像方向</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.getlocalendpoint[0].drbdenable==true?'本地端':'客户端'}</Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                            </Row>)}
                            {mirrordetail.gethostendpoint==''?
                            (<Row>
                               <Col className="col_left" span="5">本地端2</Col>
                               <Col className="col_dot" span="1">：</Col>
                               <Col className="col_right" span="8">未知</Col>
                            </Row>):(
                            <Row className='clearfloat'>
                                <Collapse style={{float:'left', color:'rgb(90, 90, 90)', lineHeight:'40px',border:'none', width:'58.4%',borderRadius:'8px',backgroundColor:' #f1f1f1',}}>
                                    <Panel header='本地端2' showArrow={true} style={{border:'none'}}>
                                        <Row>
                                            <Col className="col_left" span="5">id</Col>
                                            <Col className="col_dot" span="1">：</Col>
                                            <Col className="col_right" span="8">{mirrordetail.gethostendpoint[0].id}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">主机名称</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.gethostendpoint[0].host?host.map(function(item){if(item.url==mirrordetail.gethostendpoint[0].host){return item.name}},host):'未知'}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">设备路径</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.gethostendpoint[0].hostDevpath}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">主机地址</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.gethostendpoint[0].hostaddress}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">元盘</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.gethostendpoint[0].metadisk?mirrordetail.gethostendpoint[0].metadisk:'未知'}</Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                           <Col className="col_left" span="5">主机端对应连接id</Col>
                                           <Col className="col_dot" span="1">：</Col>
                                           <Col className="col_right" span="8">{mirrordetail.gethostendpoint[0].remoteconn_id}</Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                            </Row>)}
                            {mirrordetail.getagentendpoint!=''?(mirrordetail.getagentendpoint.length==1?(
                                <Row className='clearfloat'>
                                    <Collapse style={{float:'left', color:'rgb(90, 90, 90)', lineHeight:'40px',border:'none', width:'58.4%',borderRadius:'8px',backgroundColor:' #f1f1f1',}}>
                                        <Panel header='客户端1' showArrow={true} style={{border:'none'}}>
                                            <Row>
                                                <Col className="col_left" span="5">id</Col>
                                                <Col className="col_dot" span="1">：</Col>
                                                <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].id}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">客户端</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{<Link to={`/agents/${mirrordetail.getagentendpoint[0].agent.split('/').pop()}`}>{mirrordetail.agentlog[0].agent_name}</Link>}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">块设备</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].agentDevpath}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">设备号</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].agentDrbdminor}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">源ip</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].agentaddress}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">镜像名</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].agentvolumename}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">元设备</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].metadisk?mirrordetail.getagentendpoint[0].metadisk:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">端口号</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].port?mirrordetail.getagentendpoint[0].port:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">停止资源后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].downaf_cmd?mirrordetail.getagentendpoint[0].downaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">停止资源前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].downbf_cmd?mirrordetail.getagentendpoint[0].downbf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">主后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].primaryaf_cmd?mirrordetail.getagentendpoint[0].primaryaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">主前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].primarybf_cmd?mirrordetail.getagentendpoint[0].primarybf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">从后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].secondaryaf_cmd?mirrordetail.getagentendpoint[0].secondaryaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">从前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].secondarybf_cmd?mirrordetail.getagentendpoint[0].secondarybf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">启用资源后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].upaf_cmd?mirrordetail.getagentendpoint[0].upaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">启用资源前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[0].upbf_cmd?mirrordetail.getagentendpoint[0].upbf_cmd:'未知'}</Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Row>):<Row className='clearfloat'>
                                    <Collapse style={{float:'left', color:'rgb(90, 90, 90)', lineHeight:'40px',border:'none', width:'58.4%',borderRadius:'8px',backgroundColor:' #f1f1f1',}}>
                                        <Panel header='客户端2' showArrow={true} style={{border:'none'}}>
                                            <Row>
                                                <Col className="col_left" span="5">id</Col>
                                                <Col className="col_dot" span="1">：</Col>
                                                <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].id}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">客户端</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{<Link to={`/agents/${mirrordetail.getagentendpoint[1].agent.split('/').pop()}`}>{mirrordetail.agentlog[2].agent_name}</Link>}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">块设备</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].agentDevpath}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">设备号</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].agentDrbdminor}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">源ip</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].agentaddress}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">镜像名</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].agentvolumename}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">元设备</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].metadisk?mirrordetail.getagentendpoint[1].metadisk:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">端口号</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].port?mirrordetail.getagentendpoint[1].port:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">停止资源后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].downaf_cmd?mirrordetail.getagentendpoint[1].downaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">停止资源前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].downbf_cmd?mirrordetail.getagentendpoint[1].downbf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">主后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].primaryaf_cmd?mirrordetail.getagentendpoint[1].primaryaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">主前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].primarybf_cmd?mirrordetail.getagentendpoint[1].primarybf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">从后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].secondaryaf_cmd?mirrordetail.getagentendpoint[1].secondaryaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">从前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].secondarybf_cmd?mirrordetail.getagentendpoint[1].secondarybf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">启用资源后执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].upaf_cmd?mirrordetail.getagentendpoint[1].upaf_cmd:'未知'}</Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                               <Col className="col_left" span="5">启用资源前执行脚本</Col>
                                               <Col className="col_dot" span="1">：</Col>
                                               <Col className="col_right" span="8">{mirrordetail.getagentendpoint[1].upbf_cmd?mirrordetail.getagentendpoint[1].upbf_cmd:'未知'}</Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Row>):(<Row>
                                            <Collapse style={{float:'left', color:'rgb(90, 90, 90)', lineHeight:'40px',border:'none', width:'58.4%',borderRadius:'8px',backgroundColor:' #f1f1f1',}}>
                                                <Panel header='客户端' showArrow={true} style={{border:'none'}}> </Panel>
                                            </Collapse>
                                        </Row>)}
                            
                        
                    </Row>
                    
                </Row>
            );
        }else{
            return (<Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="laptop" />{mirrordetail.name}</label>
                    </Row>
                    
                </Row>)
        }
    }
}


export default MirrorDetail;
