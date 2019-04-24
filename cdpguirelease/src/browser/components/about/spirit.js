/**
 * Created by tanglinhai on 2016/9/13.
 */
import React, { Component,PropTypes } from 'react'
import  {Row, Col}  from 'antd'
class Spirit extends Component {
    render () {
        return (
            <div>
                <div className="aboutTitle">
                    <div className="aboutTitleLeft_6"><img src={require("../../public/img/about/title_spirit.png")} width="100%" height="109px"/></div>
                    <div className="aboutTitleRight_6"><img src={require("../../public/img/about/spirit1.jpg")} width="292px" height="299px"/></div>
                </div>
                <div className="contactText6">
                    <div className="contactHearder6" style={{width: 400+'px'}}>“时光之鸟，飞越无限”，中科同向将以科技为基本手段，不断发展、超越自我。</div><br/>


                    <p style={{width: 400+'px',textIndent:'30px'}}>中科同向将“非淡泊无以明志，非宁静无以致远”作为公司的立足理念，致力于中国信息技术的改善和提高，为中国政府和企业信息化提供一流的服务和技术，持续推动企业信息化和政府领域产品和技术的发展。</p>

                    <p style={{textIndent:'30px'}}>中科同向将“做客户终身的合作伙伴”作为公司的经营理念。只要客户选择了我们，我们会通过高质量的服务赢得客户的信赖，为客户提供终身服务，为客户提供全方位的服务，和客户一起成功，帮助客户成功。真诚地为用户设想，坚决抵制目前“网络泡沫”带动下的IT业 “浮躁”、“概念炒作”，提供最适用、可应用的技术，性价比最高的产品，从实际出发，为企业解决最紧急的问题，切实帮助客户改善管理、提高运作效率。</p>

                    <p style={{textIndent:'30px'}}>中科同向的首要任务就是“脚踏实地为客户提供信息技术服务”。国内IT业界历来最不缺乏的就是概念、思想、理念，在全球信息共享的条件下，对于引进最新IT技术，国内也不会落后，但是目前的情况国内信息化项目的成功率不容乐观，很大一部分原因在于“服务没有跟上”。所以我们立志于做信息技术服务工作，把先进的管理思想、理念和技术通过大量的服务工作，让客户得到成功应用，真正转化为客户腾飞发展的催化剂。我们认为 “软件就是服务”，“网络就是服务”，“信息技术成功的基础是服务”。我们会以服务为根本，和客户一起成功。</p>

                    <p style={{textIndent:'30px'}}>中科同向将以真诚服务客户为使命，致力于成为企业信息化和电子政务领域优秀的、值得信赖的合作伙伴，并遵循创新和专业化的技术方向，持续提升核心竞争力，为中国软件业的发展而不懈努力。</p>
                </div>
                <div className="fk_logo"><img src={require("../../public/img/about/spirit.jpg")}width="901px" height="394px"/></div>
            </div>
        )
    }
}

export default Spirit;