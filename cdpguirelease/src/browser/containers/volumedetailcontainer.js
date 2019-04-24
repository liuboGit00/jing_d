import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

import VolumeDetail from '../components/volume/volumedetail'
import { Spin,Button,Row,message } from 'antd';
import {set_compress,set_dedupe,fetch_volumes,fetch_snapshots,fetch_disks} from '../actions/actions'
const ButtonGroup = Button.Group;

class VolumeDetailContainer extends Component {
     constructor(props) {
        super(props)
        this.handle_set_compress_on = this.handle_set_compress_on.bind(this);
        this.handle_set_compress_off = this.handle_set_compress_off.bind(this);
        this.handle_set_dedup_on = this.handle_set_dedup_on.bind(this);
        this.handle_set_dedup_off = this.handle_set_dedup_off.bind(this);
    }

    componentDidMount() {
        const {dispatch,volumes} = this.props
        const volumeId = this.props.params.volumeId
        if(volumes.items.length<=0){
           dispatch(fetch_volumes())
        }
       // dispatch(fetch_snapshots())
        
    }
    handle_set_compress_on(){
        const volumeId = this.props.params.volumeId
        var value='on'
        const {volumes} = this.props;
        const volume = volumes.items.find( item=> (item.id==volumeId) )
        if(volume.native.type.model=='zfs'){
            this.props.dispatch(set_compress(volumeId,value))
        }else{
            message.error('目前只支持文件系统的压缩')
        } 
    }
    handle_set_compress_off(){
        const volumeId = this.props.params.volumeId
        var value='off'
        const {volumes} = this.props;
        const volume = volumes.items.find( item=> (item.id==volumeId) )
        if(volume.native.type.model=='zfs'){
            this.props.dispatch(set_compress(volumeId,value))
        }else{
            message.error('目前只支持文件系统的压缩')
        } 
    }
    handle_set_dedup_on(){
        const volumeId = this.props.params.volumeId
        var value='on'
        this.props.dispatch(set_dedupe(volumeId,value))
    }
    handle_set_dedup_off(){
        const volumeId = this.props.params.volumeId
        var value='off'
        this.props.dispatch(set_dedupe(volumeId,value))
    }
    render() {
        const {volumes,dispatch} = this.props
        const volumeId = this.props.params.volumeId
        const volume = volumes.items.find( item=> (item.id==volumeId) )
       // console.info('volume=' + volume)
        if (volume !== undefined){
        return (
            <div>
                <Row className="table_toolbar">
                    {(volume.usage.compression == undefined || volume.usage.compression == 'unknown' || volume.usage.compression == '-') ? <div></div> :
                        <ButtonGroup>
                            <Button onClick={this.handle_set_compress_on}>开启压缩</Button>
                            <Button onClick={this.handle_set_compress_off}>关闭压缩</Button>
                        </ButtonGroup>}&nbsp; &nbsp;&nbsp; &nbsp;
                    {(volume.usage.dedup == undefined || volume.usage.dedup == 'unknown' || volume.usage.dedup == '-') ? <div></div> :
                        <ButtonGroup>
                            <Button onClick={this.handle_set_dedup_on}>开启重删</Button>
                            <Button onClick={this.handle_set_dedup_off}>关闭重删</Button>
                        </ButtonGroup>}
                </Row>
                <VolumeDetail item={volume} dispatch={dispatch} ke = {volumes.setTabKey} />
            </div>
        )
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

VolumeDetailContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
     
    return {
        volumes:state.volumes
    }
}
export default connect(mapStateToProps)(VolumeDetailContainer)
