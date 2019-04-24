/**
 * Created by tanglinhai on 2016/9/13.
 */
import React, { Component,PropTypes } from 'react'
import  {Row, Col}  from 'antd'
class Contact extends Component {
    render () {
        return (
            <div>
                <div className="aboutTitle">
                    <div className="aboutTitleLeft_3"><img src={require("../../public/img/about/title_contact.png")} width="100%" height="109px"/></div>
                    <div className="aboutTitleRight_3"><img src={require("../../public/img/about/contact.jpg")} width="349px" height="220px"/></div>
                </div>
                <div className="contactText grayContent" style={{paddingTop:12+'px'}}>
                    <div className="conTextLine address" style={{marginBottom:5+'px'}}>地址：北京市海淀区知春路太月园1号楼泰跃商务中心4层</div>
                    <div className="conTextLine qq" style={{height:'auto',lineHeight:50+'px'}}>
                        <span>产品咨询电话：010-59797888  （9:00--19:00）</span>
                        <br/>
                        <span>传真：010-62576168</span>
                    </div>
                    <div className="conTextLine cooperation">商务合作QQ：
                        <a hidefocus="true" href="http://wpa.qq.com/msgrd?v=3&amp;uin=21212121212&amp;site=qq&amp;menu=yes" target="_blank">21212121212</a>
                    </div>
                    <div className="conTextLine email">邮箱：admin@heartsone.net</div>
                </div>
            </div>
        )
    }
}

export default Contact;