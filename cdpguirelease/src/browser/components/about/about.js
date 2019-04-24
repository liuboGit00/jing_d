/**
 * Created by tanglinhai on 2016/9/13.
 */
import React, { Component,PropTypes } from 'react'
import Contact from './contact'
import Culture from './culture'
import Introduce from './introduce'
import Join from './join'
import Spirit from './spirit'
import  {Row, Col}  from 'antd'
import {show_current_menu} from '../../actions/aboutactions'

class About extends Component {
    constructor(props){
        super(props);
        this.menuChange = this.menuChange.bind(this)
    }
    menuChange(e){
        const type = e.target.getAttribute('data-menuType');
        this.props.dispatch(show_current_menu(type));
    }
    render () {
        return (
            <div className="webAbout">
                <div className="aboutContentLeft">
                    <ul id="tabs">
                        <li className={this.props.menuIndex == '1' ? 'tabsLi curMenu' : 'tabsLi'}>
                            <a data-menuType="1" href="javascript:void(0);" onClick={this.menuChange}>公司简介</a><span className="iconLi" onClick={this.menuChange}></span>
                            <div className="hr_border"></div>
                        </li>
                        <li className={this.props.menuIndex == '2' ? 'tabsLi curMenu' : 'tabsLi'}>
                            <a data-menuType="2" href="javascript:void(0);" onClick={this.menuChange}>企业文化</a><span className="iconLi" onClick={this.menuChange}></span>
                            <div className="hr_border"></div>
                        </li>
                        <li className={this.props.menuIndex == '6' ? 'tabsLi curMenu' : 'tabsLi'}>
                            <a data-menuType="6" href="javascript:void(0);" onClick={this.menuChange}>企业精神</a><span className="iconLi" onClick={this.menuChange}></span>
                            <div className="hr_border"></div>
                        </li>
                        <li className={this.props.menuIndex == '3' ? 'tabsLi curMenu' : 'tabsLi'}>
                            <a data-menuType="3" href="javascript:void(0);" onClick={this.menuChange}>联系我们</a><span className="iconLi" onClick={this.menuChange}></span>
                            <div className="hr_border"></div>
                        </li>
                        <li className={this.props.menuIndex == '4' ? 'tabsLi curMenu' : 'tabsLi'}>
                            <a data-menuType="4" href="javascript:void(0);" onClick={this.menuChange}>加入我们</a><span className="iconLi" onClick={this.menuChange}></span>
                        </li>
                    </ul>
                </div>

                <div className="aboutContentRight">
                    <div className="aboutPaper aboutPaper1 clearfix" style={{display: this.props.menuIndex == '1' ? 'block' : 'none'}}><Introduce/></div>
                    <div className="aboutPaper aboutPaper2 clearfix" style={{display: this.props.menuIndex == '2' ? 'block' : 'none'}}><Culture/></div>
                    <div className="aboutPaper aboutPaper3 clearfix" style={{display: this.props.menuIndex == '3' ? 'block' : 'none'}}><Contact/></div>
                    <div className="aboutPaper aboutPaper4 clearfix" style={{display: this.props.menuIndex == '4' ? 'block' : 'none'}}><Join/></div>
                    <div className="aboutPaper aboutPaper6 clearfix" style={{display: this.props.menuIndex == '6' ? 'block' : 'none'}}><Spirit/></div>
                </div>
            </div>
        )
    }
}

export default About;
