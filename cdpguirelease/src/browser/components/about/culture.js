/**
 * Created by tanglinhai on 2016/9/13.
 */
import React, { Component,PropTypes } from 'react'
import  {Row, Col}  from 'antd'
class Culture extends Component {
    render () {
        return (
            <div className="aboutPaper_culture">
                <div className="aboutTitle">
                    <div className="aboutTitleLeft_2"><img src={require("../../public/img/about/title_culture.png")} width="100%" height="109px"/></div>
                    <div className="aboutTitleRight_2"><img src={require("../../public/img/about/culture.jpg")} width="354px" height="220px"/></div>
                </div>
                <div className="aboutContent">
                    <div className="aboutText grayContent">
                        <div>&nbsp; &nbsp; </div><br/>
                        <span className="title1">愿景</span>
                        <br/>
                            有影响力的互联网企业。<br/><br/>
                            <span className="title1">使命</span>
                            <br/>
                                通过互联网服务助力中小企业成长。<br/><br/>
                                <span className="title1">价值观</span>
                                <br/>
                                    正直：遵守国家法律与公司制度，绝不触犯企业高压线；做人德为先，诚实、守信。<br/>
                                    敬业：尽职尽责，高效执行；专业执着，精益求精。<br/>
                                    合作共赢：注重团队合作，共享共担；乐于分享，与团队共同成长。<br/>
                                    持续改进：不断学习改进，追求卓越；敢于突破，勇于创新。<br/>
                                    <br/>
                                        <span className="title1">经营理念</span>
                                        <br/>
                                            与客户一同成长，不断完善产品和服务，助力客户企业不断发展。<br/>
                                            <br/>
                                                <span className="title1">管理理念</span>
                                                <br/>
                                                    充分尊重和信任员工，建立互信合作的团队，达到个人和公司的双赢。<br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Culture;