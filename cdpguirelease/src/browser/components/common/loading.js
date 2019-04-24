/**
 * Created by tanglinhai on 2016/8/29.
 */
import React, { Component,PropTypes } from 'react'
import { Spin  } from 'antd';

class Loading extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const style = {
            display: this.props.loading ? 'block' : 'none'
        }
        if(this.props.hasBg === 'false'){
            return (
                <div className="loadingDiv"  style={style}>
                    <Spin size="large" />
                </div>
            );
        }else{
            return (
                <div className="loadingDiv"  style={style}>
                    <div className="loadingDivBg"></div>
                    <Spin size="large" />
                </div>
            );
        }
    }
};
export default Loading;
