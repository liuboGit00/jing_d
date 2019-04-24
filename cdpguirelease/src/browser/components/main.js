/**
 * Created by tanglinhai on 2016/8/22.
 */
import Header from './header'
import Footer from './footer'
import React, { Component,PropTypes } from 'react'
import  {Row, Col, BackTop, Menu,Icon}  from 'antd'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink,browserHistory} from 'react-router'
import {connect} from 'react-redux'
import auth from '../utils/auth'
import LoginContainer from '../containers/user/logincontainer'
import OperationContainer from '../containers/operationcontainer'
import {fetch_users} from '../actions/useractions'

const SubMenu = Menu.SubMenu
class Main extends Component {
    componentDidMount(){
        const{userManageState,dispatch} =this.props
        if(userManageState.items.length<=0){
            dispatch(fetch_users())
        }
    }
    set_volume_search_modal(){
        let volumes= this.props.volumes
        volumes.search_modal=false
        this.setState(volumes)
        // console.log(this.props.volumes)
    }
    render() {
        const isLogin = auth.loggedIn();
        // console.log(this.props.userManageState)
        //const isLogin = this.props.loginState.isLogin
        if(isLogin) {
            if(window.location.pathname == '/about'){
                return (
                    <Row className="layout-antd">
                        <Header/>
                        <Row className="about_logo"></Row>
                        <Row className="center">
                            { this.props.children }
                        </Row>
                        <Footer/>
                        <BackTop style={{bottom: 100}}>
                            <div className="backTopSubDiv">UP</div>
                        </BackTop>
                    </Row>
                );
            }
        

            return (
                <div className="layout-antd">
                    <Header user={this.props.userManageState.items}/>
                    <Row className="center">
                        <div id="leftMenu">
                            <Menu /*theme="dark"*/
                                style={{width: 185}}
                                // defaultOpenKeys={['agent', 'disk', 'pool', 'volume', 'log', 'snapshot', 'task', 'user', 'system','cloud','host']}
                                mode="inline">
                                <SubMenu key="agent" title={<span><Icon type="laptop"/><span>客户端管理</span></span>}>
                                    <Menu.Item key="4"><Link to="/agents">客户端列表</Link></Menu.Item>
                                   
                                    <Menu.Item key="13"><Link to="/clones">硬盘复制</Link></Menu.Item>
                                    <Menu.Item key="26"><Link to="/agentmirror">小机镜像</Link></Menu.Item>

                                    <Menu.Item key="12"><Link to="/mirrors">镜像</Link></Menu.Item>

                                </SubMenu>
                                <SubMenu key="host" title={<span><Icon type="export"/><span>CDP端管理</span></span>}>
                                    <Menu.Item key="14"><Link to="/hosts">cdp端列表</Link></Menu.Item>
                                    <Menu.Item key="15"><Link to="/remotemirrors">cdp复制</Link></Menu.Item>
                                    <Menu.Item key="32"><Link to="/hostgroups">cdp集群</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="disk" title={<span><Icon type="hdd"/><span>硬盘管理</span></span>}>
                                    <Menu.Item key="1"><Link to="/disks">硬盘设备</Link></Menu.Item>
                                    <Menu.Item key="16"><Link to="/iscsiportals">iscsi</Link></Menu.Item>
                               </SubMenu>
                               <SubMenu key="file" title={<span><Icon type="file"/><span>文件管理</span></span>}>
                                    <Menu.Item key="17"><Link to="/rsyncs">文件同步节点</Link></Menu.Item>
                                    <Menu.Item key="18"><Link to="/fileclones">文件克隆</Link></Menu.Item>
                                    <Menu.Item key="19"><Link to="/samba">samba共享</Link></Menu.Item>
                                    <Menu.Item key="20"><Link to="/nfs">nfs网络共享</Link></Menu.Item>

                               </SubMenu>
                                <SubMenu key="pool" title={<span><Icon type="cloud-download-o"/><span>存储池管理</span></span>}>
                                    <Menu.Item key="2"><Link to="/pools">存储池列表</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="volume" title={<span><Icon type="file-text"/><span>卷管理</span></span>}>
                                    <Menu.Item key="3"><Link to="/volumes" onClick={this.set_volume_search_modal.bind(this)}>卷列表</Link></Menu.Item>
                                    <Menu.Item key="11"><Link to="/luns">已映射列表</Link></Menu.Item>
                                    <Menu.Item key="24"><Link to="/volumegroup">卷组</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="log" title={<span><Icon type="calendar"/><span>日志管理</span></span>}>
                                    <Menu.Item key="Menu_cmdlogs"><Link to="/cmdlogs">命令日志</Link></Menu.Item>  
                                </SubMenu>
                                <SubMenu key="snapshot" title={<span><Icon type="copy"/><span>快照管理</span></span>}>
                                    <Menu.Item key="10"><Link to="/snapshotslist">快照列表</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key='ceph' title={<span><Icon type="share-alt"/><span>集群管理</span></span>}>
                                    <Menu.Item key="21"><Link to="/cephpools">集群存储池</Link></Menu.Item>
                                    <Menu.Item key="22"><Link to="/cephclients">集群客户端</Link></Menu.Item>
                                    <Menu.Item key="23"><Link to="/osds">集群硬盘节点</Link></Menu.Item>

                                </SubMenu>
                                <SubMenu key="task" title={<span><Icon type="book"/><span>任务</span></span>}>
                                    <Menu.Item key="task_2"><Link to="/schedules">进行中</Link></Menu.Item>
                                    <Menu.Item key="task_1"><Link to="/results">已完成</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="cloud" title={<span><Icon type="cloud-upload-o"/><span>云端管理</span></span>}>
                                    <Menu.Item key="clouds"><Link to="/clouds">云主机</Link></Menu.Item>
                                </SubMenu>
								<SubMenu key="raid_2" title={<span><Icon type="credit-card"/><span>RAID卷管理</span></span>}>
                                    <Menu.Item key="raids"><Link to="/raid">RAID1卷</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="groupHA" title={<span><Icon type="desktop"/><span>HA管理</span></span>}>
                                    <Menu.Item key="30"><Link to="/groupHA">HA组</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="user" title={<span><Icon type="user"/><span>用户管理</span></span>}>
                                    <Menu.Item key="5"><Link to="/role">角色管理</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/users">用户管理</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/user/:userId">个人设置</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="system" title={<span><Icon type="home"/><span>系统</span></span>}>
                                    <Menu.Item key="8"><Link to="/config">系统配置</Link></Menu.Item>
                                    <Menu.Item key="28"><Link to="/audit">审计系统</Link></Menu.Item>                                    
                                    <Menu.Item key="27"><Link to="/deadline">CDP注册</Link></Menu.Item>
                                    <Menu.Item key="29"><Link to="/echart">报表</Link></Menu.Item>


                                    <Menu.Item key="9"><Link to="/about">关于</Link></Menu.Item>
                                </SubMenu>
                                
                            </Menu>
                        </div>
                        <div id="rightWrap">
                            <div className="right-box">
                                { this.props.children }
                            </div>
                        </div>
                    </Row>
                    <Footer/>
                    <BackTop style={{bottom: 100}}>
                        <div className="backTopSubDiv">UP</div>
                    </BackTop>
                    <OperationContainer/>
                </div>
            )
        }else {
            return (
                <Row className="login clearfix">
                    <img src={require("../public/img/cdp_login.png")} className="login_bg"/>
                    <LoginContainer/>
                    <BackTop style={{bottom: 100}}>
                        <div className="backTopSubDiv">UP</div>
                    </BackTop>
                </Row>
            );
        }
    }
}


Main.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        userState:state.userState,
        loginState:state.loginState,
        volumes:state.volumes,
        userManageState:state.userManageState,

    }
}
export default connect(mapStateToProps)(Main)

 /*<Menu.Item key="Menu_logdev"><Link to="/logdev">存储日志</Link></Menu.Item>*/
