/**
 * Created by tanglinhai on 2016/9/5.
 */
import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber, Row, Col, DatePicker, Select} from 'antd';
import Loading from '../common/loading'
import {receive_addOrUpdate_searchAdvanceForm, receive_searchAdvanceForm_state} from '../../actions/taskactions'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import classNames from 'classnames';

function noop() {
    return false;
}

class FormSearchAdvance extends Component{
    constructor(props){
        super(props);
        this.keywordChangeHandle = this.keywordChangeHandle.bind(this)
        this.statusChangeHandle = this.statusChangeHandle.bind(this)
        this.handleFieldCommon = this.handleFieldCommon.bind(this)
        this.disabledStartDate = this.disabledStartDate.bind(this)
        this.disabledEndDate = this.disabledEndDate.bind(this)
        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.handleStartDateToggle = this.handleStartDateToggle.bind(this)
        this.handleEndDateToggle = this.handleEndDateToggle.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }

//----------------------------------------------datePicker function start--------------------------------------------
disabledStartDate(startValue){
    if(!startValue || !this.props.searchAdvanceForm.endDate){
        return false;
    }
    // console.log(startValue)
    // return startValue.getTime() >= this.props.searchAdvanceForm.endDate.getTime();
    return startValue.valueOf() >= this.props.searchAdvanceForm.endDate.valueOf();

}
disabledEndDate(endValue){
    if(!endValue || !this.props.searchAdvanceForm.startDate){
        return false;
    }
    // console.log(endValue.valueOf())
    // return endValue.getTime() <= this.props.searchAdvanceForm.startDate.getTime();
    return endValue.valueOf() <= this.props.searchAdvanceForm.startDate.valueOf();

}
onStartDateChange(value){
    this.handleFieldCommon('startDate', value);
    if(!this.props.searchAdvanceForm.endDate)
        this.props.dispatch(receive_searchAdvanceForm_state({endOpen: true}))
}
onEndDateChange(value){
    this.handleFieldCommon('endDate', value);
}
handleStartDateToggle({ open }){
    /*if(!open){
        this.props.dispatch(receive_searchAdvanceForm_state({endOpen: true}))
    }*/
}
handleEndDateToggle({ open }){
    this.props.dispatch(receive_searchAdvanceForm_state({endOpen: open}))
}
//----------------------------------------------datePicker function end--------------------------------------------

//----------------------------------------------change handle function start--------------------------------------------
    keywordChangeHandle(e){
        this.handleFieldCommon('keyword', e.target.value);
    }
    statusChangeHandle(value){
        this.handleFieldCommon('status', value);
    }
//----------------------------------------------change handle function end----------------------------------------------

//----------------------------------------------my function start----------------------------------------------------
    handleFieldCommon(fieldName, newValue){
        const values = this.props.form.getFieldsValue();
        values[fieldName] = newValue;
        this.props.form.setFieldsValue(values);
        /*this.props.form.validateFields([fieldName], (errors, values) => {
            const res = {};
            if (errors) {
                res[fieldName+'ValidateStatus'] = 'error';
                this.props.dispatch(receive_login_form_state(Object.assign(this.props.searchAdvanceFormState, res)))
            }else{
                res[fieldName+'ValidateStatus'] = 'success';
                this.props.dispatch(receive_login_form_state(Object.assign(this.props.searchAdvanceFormState, res)))
            }
        });*/
        const temp = {};
        temp[fieldName] = newValue;
        this.props.dispatch(receive_addOrUpdate_searchAdvanceForm(Object.assign(this.props.searchAdvanceForm, temp)))
    }
    resetForm(e){
        this.props.dispatch(receive_addOrUpdate_searchAdvanceForm({
            keyword: '',
            status: '',
            startDate: null,
            endDate: null
        }))
    }
//----------------------------------------------my function end----------------------------------------------

//----------------------------------------------check function start----------------------------------------------------
    /*checkPass(rule, value, callback) {
        const form = this.props.form;
        callback();
    }
    checkUsernameExist(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该名称已被占用。')]);
                } else {
                    callback();
                }
            }, 400);
        }
    }*/
//----------------------------------------------check function end------------------------------------------------------

    render() {

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
        };
        const keywordProps = getFieldProps('keyword', {
            onChange: this.keywordChangeHandle
        });
        const statusProps = getFieldProps('status', {
            onChange: this.statusChangeHandle
        });
        const endDateProps = getFieldProps('endDate', {
            onChange: this.onEndDateChange,
            placeholder: "结束日期",
            value: this.props.searchAdvanceForm.endDate
        });

        const startDateProps = getFieldProps('startDate', {
            onChange: this.onStartDateChange,
            placeholder: "开始日期",
            value: this.props.searchAdvanceForm.startDate
        });
        return (
            <Form layout='horizontal' onSubmit={this.props.handleAdvanceSearch} action="/aaaa" id="searchAdvanceForm">
                <Row gutter={16}>
                    <Col sm={8}>
                        <FormItem {...formItemLayout} label="关键字">
                            <Input type="text" className="cdp_input" {...keywordProps} placeholder="请输入关键字" value={this.props.searchAdvanceForm.keyword}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="结束时间">
                            <DatePicker size="default" {...endDateProps} toggleOpen={this.handleEndDateToggle} disabledDate={this.disabledEndDate}
                                        open={this.props.searchAdvanceFormState.endOpen} style={{width: '100%'}}/>
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem {...formItemLayout} label="任务状态">
                            <Select type="text" className="cdp_input" {...statusProps} placeholder="请选择状态" value={this.props.searchAdvanceForm.status}>
                                <Option value="FAILURE">失败</Option>
                                <Option value="PENDING">暂停</Option>
                                <Option value="RECEIVED">处理中</Option>
                                <Option value="RETRY">重试的</Option>
                                <Option value="REVOKED">撤销的</Option>
                                <Option value="STARTED">已经启动</Option>
                                <Option value="SUCCESS">成功</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem {...formItemLayout} label="开始时间">
                            <DatePicker size="default" {...startDateProps} toggleOpen={this.handleStartDateToggle} disabledDate={this.disabledStartDate} style={{width: '100%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={12} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit" style={{marginRight: 15+'px'}}>搜索</Button>
                        <Button style={{marginRight: 50+'px'}} onClick={this.resetForm}>清除条件</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            "keyword": {name: 'keyword',value:props.searchAdvanceForm.keyword},
            "status": {name: 'status',value:props.searchAdvanceForm.status},
            "startDate": {name: 'startDate',value:props.searchAdvanceForm.startDate},
            "endDate": {name: 'endDate',value:props.searchAdvanceForm.endDate}
        }
    }
})(FormSearchAdvance);

