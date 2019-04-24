import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {modify_raid,fetch_raid,echo_raid,
		close_raid,create_raid,toggle_raid,
		delete_raid,echo_create_raid_modal,
		create_raid_loadresume,echo_create_raid_loadresume_modal,
		toggle_raid_loadresume,close_create_raid_loadresume_modal,fetch_volumes} from '../../actions/raidactions'
import Raid from '../../components/raid/raid'
//import {fetch_volumes} from '../../actions/actions'

import CreateRaid from '../../components/raid/create_raid'
import RaidLoadresume from '../../components/raid/raid_loadresume'
import { Spin,Button,Modal,Row,Icon,message,Tabs,Menu, Dropdown,} from 'antd';
import auth from '../../utils/auth'
import SearchInput from '../../components/common/searchinput'
import {restapi,hostpath} from '../../confs/host'
import {Link} from 'react-router'

class RaidContainer extends Component {
    constructor(props) {
        super(props)
       	this.handleChange = this.handleChange.bind(this);
        this.handle_create_raid = this.handle_create_raid.bind(this);
        this.handle_close_raid = this.handle_close_raid.bind(this);
        this.handle_delete_raid = this.handle_delete_raid.bind(this);
        this.submit_raid_loadresume =this.submit_raid_loadresume.bind(this);
        this.handle_create_raid_loadresume = this.handle_create_raid_loadresume.bind(this);
        this.handle_echo_create_raid_loadresume_modal=this.handle_echo_create_raid_loadresume_modal.bind(this);
        this.handle_close_create_raid_loadresume_modal = this.handle_close_create_raid_loadresume_modal.bind(this);
        this.submit_create_raid = this.submit_create_raid.bind(this)
    }
    componentDidMount() {
        const {dispatch,raid,volumes} = this.props
        if(raid.items.length<=0){
            dispatch(fetch_raid())
        }
        if(volumes.items.length<=0){
            dispatch(fetch_volumes())
        }
        
        
    }

    handle_create_raid(){
        const {dispatch} = this.props;
        dispatch(echo_raid('echo'))
    }
    handle_close_raid(){
        const {dispatch} = this.props;
        dispatch(close_raid())
    }
     handle_close_create_raid() {
        const {dispatch} = this.props
        dispatch(close_create_raid_modal())
    }

    handle_create_raid_loadresume(){
        const {dispatch} = this.props;
        dispatch(echo_create_raid_loadresume_modal('echo'))
    }
  
    submit_raid_loadresume(raidloadresume){
        const {dispatch}=this.props;
        dispatch(create_raid_loadresume_ok(raidloadresume,auth))
        dispatch(close_create_raid_loadresume_modal())
    }
    handle_echo_create_raid_loadresume_modal(id,raid){
    	console.log(raid,'ad')
        const {dispatch}=this.props;
        if(raid != null){
            dispatch(fetch_raid(raid))
            dispatch(echo_create_raid_loadresume_modal(id))
        }else{
            dispatch(echo_create_raid_loadresume_modal(id))
        }
        

    }
    handle_close_create_raid_loadresume_modal(){
        const {dispatch}=this.props;
        dispatch(close_create_raid_loadresume_modal())
    }
    
    
    handleChange(selectedRowKeys, selectedRows) {
        this.props.dispatch(toggle_raid(selectedRowKeys,selectedRows))
    }
    handle_delete_raid() {
        const {dispatch} = this.props
        const {selectedRaid} = this.props.raid
        const confirm = Modal.confirm;
        if (selectedRaid.length > 0) {
           // console.log(selectedRaid,'hhuy')

            confirm({
                title: '您是否确认要删除已选择的这些项内容',
                content: '删除后将无法恢复',
                onOk() {
                    dispatch(delete_raid(selectedRaid, auth))
                },
                onCancel() { },
            });
        }
    }

   submit_create_raid(fn){
    // console.log(fn)
        const {dispatch,raid} = this.props
        for(let i=0;i<raid.items.length;i++){ 
            if(fn.name == raid.items[i].name){
                return message.error('名称已被使用')
            }
        }
         dispatch(create_raid(fn,auth))
    }
   
  
    render() {
        const {dispatch,raid,volumes} = this.props

        const echo = raid.echo
        // console.log(volumes)
        
        const {selectedRaid} = this.props.raid
      
      //for循环进行赋值
      //名字的赋值
	for(let i=0;i<raid.items.length;i++){
		for(let n=0;n<volumes.items.length;n++){
			if(raid.items[i].volume == volumes.items[n].url  ){
				raid.items[i].name =  volumes.items[n].name

				}
			}
		}
		//卷1名字的赋值

		for(let i=0;i<raid.items.length;i++){
			for(let n=0;n<volumes.items.length;n++){
				if(raid.items[i].sourcevolume == volumes.items[n].url){
					raid.items[i].sourcevolume = volumes.items[n].name
					
				}
			}
		}

		//卷2名字的赋值

		for(let k=0;k<raid.items.length;k++){
			for(let g=0;g<volumes.items.length;g++){
				if(raid.items[k].dstvolume == volumes.items[g].url){
					raid.items[k].dstvolume = volumes.items[g].name
				}
			}
		}
      
        if(selectedRaid){
            return (
                <Row>
                    <Row className="table_title">
                        <label className="cdp_label"><Icon type="inbox" />RAID1的列表</label>
                    </Row>
                    <Row className="table_toolbar">
                        <Button type='ghost' icon='delete' className="cdp_button_right" onClick={this.handle_delete_raid}>删除</Button>
                        <Button type='ghost' icon='plus' className="cdp_button_right" onClick={this.handle_create_raid}>创建RAID1</Button>
                    </Row>
                   <Row >
                        <Raid volumes={volumes.items} items={raid.items} onChange={this.handleChange} selectedRaid={raid.selectedRaid} selectedRowKeys={raid.selectedRowKeys} onRaidLoadresume = {this.handle_echo_create_raid_loadresume_modal}

                            />
                    </Row>
                    <Row>
                        <CreateRaid ref='createraid' echo={echo} se={selectedRaid[0]} volumes={volumes.items}  items ={raid.items}  visible={raid.create_raid}  onOk={this.submit_create_raid} 
                            dispatch={dispatch}/>
                    </Row>
                    <Row>
                    	<RaidLoadresume ref='raidloadresume' visible={raid.create_raid_loadresume} onOk={this.submit_raid_loadresume} onCancel={this.handle_close_create_raid_loadresume_modal} volumes={volumes.items}  items ={raid.items}  id={raid.create_raid_loadresume}
                            dispatch={dispatch} /> 
                    </Row>
                 
                </Row>
            )
        
        }{
           return <div></div> 
        }
            
    }
}

RaidContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        raid:state.raid,
        volumes:state.volumes,
       
    }
}
export default connect(mapStateToProps)(RaidContainer)
