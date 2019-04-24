
 import React, { Component,PropTypes } from 'react'
 import  {Row, Col}  from 'antd'
 class Join extends Component {
     render () {
         return (
             <div>
                 <div className="aboutTitle">
                     <div className="aboutTitleLeft_4"><img src={require("../../public/img/about/title_join.png")} width="100%" height="109px"/></div>
                 </div>

                <div className="welfare">
                    <div className="welfareTitle division">
                        员工福利
                    </div>
                    <div className="welfareContent">
                        <div className="employeeWealth">
                            <div className="imgBox"><img src={require("../../public/img/about/fl01.jpg")} width="267px" height="97px"/></div>
                            <div className="wealthTitle">加薪&amp;年终奖</div>
                            <div className="wealthText">
                                除了定期培训、完善的晋升机制，员工还
                                享有每年两次的调薪机会，年终奖励福利
                                。
                            </div>
                            <div className="wealthTitle">社保&amp;住房公积金</div>
                            <div className="wealthText">
                                公司为一入职的员工即缴纳养老、医疗、
                                工伤、失业、生育保险、住房公积金，给
                                员工安心的社会保障。
                            </div>
                            <div className="wealthTitle">贴心福利</div>
                            <div className="wealthText">
                                除了零食，每位中科同向人都能享受节日礼品
                                、生日礼物、入职周年礼物、结婚礼金、
                                生育礼金、员工吃喝玩乐腐败金。
                            </div>
                        </div>

                        <div className="life">
                            <div className="imgBox"><img src={require("../../public/img/about/fl02.jpg")} width="267px" height="97px"/></div>
                            <div className="lifeTitle">体育协会</div>
                            <div className="lifeText">
                                每周定期组织足球、篮球、羽毛球，已各
                                有两支专业、业余团队，除了工作，一定
                                要锻炼好身体。
                            </div>
                            <div className="lifeTitle">带薪休假</div>
                            <div className="lifeText">
                                双休、法定节假日休息，享有婚假、产假
                                、陪产假及带薪年假。
                            </div>
                            <div className="lifeTitle">年度旅游</div>
                            <div className="lifeText">
                                每年举行一次旅游，我们拒绝省内游。
                            </div>
                        </div>

                        <div className="health">
                            <div className="imgBox"><img src={require("../../public/img/about/fl03.jpg")} width="267px" height="97px"/></div>
                            <div className="healthTitle">年度体检</div>
                            <div className="healthText">
                                为中科同向人提供一年一度的身体健康检查，
                                全面检测大家的身体状况，尽早预防各类
                                健康风险。
                            </div>
                            <div className="healthTitle">意外保险</div>
                            <div className="healthText" style={{height:229+'px'}}>
                                为满足条件的员工购买意外保险，为年轻
                                人“出来嗨”保驾护航。
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contactText grayContent">
                    <div className="focusText">请点击以下网站关注中科同向相关职位信息</div>
                </div>
                <div className="focusHref">
				<span>
					<a href="http://company.zhaopin.com/北京中科同向信息科技有限公司_CC297781228.html" target="_blank">
						<img src={require("../../public/img/about/zlzp.jpg")} width="148px" height="44px;"/>
					</a>
					</span>
                    <span>
					<a href="http://search.51job.com/list/co,c,2509094,000000,10,1.html" target="_blank">
						<img src={require("../../public/img/about/qcwy.png")} width="148px" height="44px;"/>
					</a>
				</span>
                    <span>
					<a href="http://www.lagou.com/gongsi/j1311.html" target="_blank">
						<img src={require("../../public/img/about/lgw.png")} width="148px" height="44px;"/>
					</a>
				</span>
                </div>
             </div>
         )
     }
 }

 export default Join;