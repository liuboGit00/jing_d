/**
 * Created by tanglinhai on 2016/8/19.
 */

import React, { Component,PropTypes } from 'react'
import  {Row, Col}  from 'antd'
import {VERSION} from '../confs/version'
class Footer extends Component {
    render () {
        return (
            <Row className="footer">
                <div>网页版本{VERSION}</div>
                <div>Copyright © 2010-2018 北京中科同向信息技术有限公司</div>
            </Row>
        )
    }
}

export default Footer;
