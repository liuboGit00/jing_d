/**
 * Created by tanglinhai on 2016/9/13.
 */
import React, { Component,PropTypes } from 'react'
import  {Row, Col}  from 'antd'
class Introduce extends Component {
    render () {
        return (
            <div className="companyProfile" style={{height:'auto'}}>
                <div className="aboutTitle">
                    <div className="aboutTitleLeft"><img src={require("../../public/img/about/title_introduce.png")}  width="100%" height="109px"/></div>
                    <div className="aboutTitleRight"><img src={require("../../public/img/about/introduce.jpg")} width="354px" height="220px"/></div>
                </div>
                <div className="aboutContent">
                    <div className="aboutText grayContent" style={{height:'auto',width:422+'px',paddingLeft:73+'px',paddingTop:70+'px'}}>
                        <h2>企业文化</h2>
                        <p>价值观：与客户同向，成就客户梦想。</p>
                        <p>使命：与民族发展同向，扛起数据安全民族大旗。</p>
                        <p>愿景：与技术创新同向，提升人类安全与幸福感受。</p>
                        <div style={{marginTop:0+'px', width:800+'px'}}>
                            <p style={{textIndent:'30px'}}>中科同向（HeartsOne Technology Inc.）成立于2007年，是领先的大数据、云计算、云存储、云备份提供商，是我国信息安全及数据存储备份与容灾行业研发最长、综合实力最强的企业之一。
                            公司拥有完全自主知识产权，掌握核心技术。自主研发的云计算平台能够帮助政府，军队，企事业单位建立各操作系统、管理应用系统与存储介质之间的跨平台无缝连接，为用户提供数据存储、备份、安全、高可用、数据迁移以及数据容灾等不同层次的一体化存储解决方案和专业而完善的服务。在政府、教育、军工、能源、医疗、金融、证券，化工、食品、电力等领域拥有超过1000家以上成功案例。</p>

                            <p style={{textIndent:'30px'}}>中科同向（HeartsOne Technology Inc.）是北京市政府认定的高新技术企业和软件企业，公司依次获得国家高新技术企业证书、双软认证，中国国家信息安全产品认证证书、国家保密局涉密信息系统产品检测证书、公安部认证销售许可证书，解放军信息安全认证，工信部信息安全培训基地等重要资质，产品荣获北京市自主创新产品，公司所有产品均通过ISO9001质量管理体系认证，安全可靠。
                            公司拥有信息、数据、网络安全领域庞大的自主研发产品家族，包括云匣子大数据采集器、邮件安全防护网、数据备份软件（HeartsOne Backup V8.0，CDP持续数据保护产品， DR应用级容灾产品），HA双机、Cluster集群高可用产品，DOC文档管理系统，VTL虚拟带库，网络监控，VM虚拟化软件，CM云计算管理平台、工业控制安全网关等全面的产品与解决方案等。</p>
                            <p style={{textIndent:'30px'}}>中科同向（HeartsOne Technology Inc.）从成立之初便屡获殊荣，曾先后荣获“2009年中国计算机信息防护优秀解决方案”、“2010中国数据管理领域政府行业最具影响力品牌”、“辉煌十年·2009-2010年度中国软件和信息服务业存储备份行业领军企业”等奖项。2011年，公司获得北京市科委创新企业奖，产品获得创新产品奖，公司总经理获得杰出领导奖。2013年，公司获得中国质量、服务、信誉AAA级企业,国家信息安全测评信息安全服务资质-灾难恢复类一级证书。2014年，公司获得“2014信息安全技术值得信赖品牌”奖、“电力信息化国产化推进先锋”称号。
                            公司拥有一流的技术队伍和咨询队伍，为客户提供专业化的售前咨询和快捷的售后维护服务以及年保服务。公司是工信部授权的信息安全培训基地，华北电力大学研究生工作站，公司同中科院、北京大学、清华大学、华北电力大学建立了战略合作伙伴关系，形成了知识共享、技术共享、管理思想共享网络，打造成了一个具有高度核心竞争力的团队。</p>
                            <p style={{textIndent:'30px'}}>中科同向（HeartsOne Technology Inc.）本着取之于社会、服务于社会的宗旨，与广大客户的方向一致，与合作伙伴的方向一致，与公司股东与员工的方向一致，共同实践“同一个方向，同一个梦想”。</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduce;