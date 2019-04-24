import React, {Component, PropTypes} from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, InputNumber, Row, Col, DatePicker, Select} from 'antd';
import Loading from '../common/loading'
import {search_auditlogs,} from '../../actions/auditactions'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import classNames from 'classnames';
import moment from 'moment'
class SearchAuditlogs extends Component{
    constructor(props){
        super(props);
        this.handleAdvanceSearch=this.handleAdvanceSearch.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }
    handleAdvanceSearch(){
        this.props.onOk({
            'status': this.props.form.getFieldsValue().status,
            'startDate': this.props.form.getFieldsValue().startDate,
            'endDate': this.props.form.getFieldsValue().endDate,
        })
    }
    resetForm(){
        this.props.form.setFields({
            status:'',
            startDate:null,
            endDate:null,

        })
        
    }
    render() {

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        };
        const statusProps = getFieldProps('status', {
        });
        const endDateProps = getFieldProps('endDate', {
            placeholder: "结束日期",
            value:this.props.form.getFieldsValue().endDate,
        });

        const startDateProps = getFieldProps('startDate', {
            placeholder: "开始日期",
        });
        return (
            <Form layout='horizontal'  action="/aaaa" id="searchAdvanceForm">
                <Row gutter={16}>
                    <Col sm={8}>
                        <FormItem {...formItemLayout} label="开始时间">
                            <DatePicker size="default" format='YYYY-MM-DD HH:mm:ss' showTime={{defaultValue:moment('00:00:00','HH:mm:ss')}} {...startDateProps}  style={{width: '100%'}}/>
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem {...formItemLayout} label="任务状态">
                            <Select type="text" className="cdp_input" {...statusProps} placeholder="请选择状态"  defaultValue={this.props.form.getFieldsValue().status}>
                                <Option value="201">201</Option>
                                <Option value="202">202</Option>
                                <Option value="204">204</Option>
                                <Option value="400">400</Option>
                                <Option value="404">404</Option>
                                <Option value="500">500</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem {...formItemLayout} label="结束时间">
                            <DatePicker size="default" format='YYYY-MM-DD HH:mm:ss' showTime={{defaultValue:moment('00:00:00','HH:mm:ss')}} {...endDateProps}  style={{width: '100%'}} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11} offset={12} style={{textAlign: 'right',marginTop:20}}>
                        <Button type="primary" htmlType="submit" style={{marginRight: 15+'px'}} onClick={this.handleAdvanceSearch}>搜索</Button>
                        <Button style={{marginRight: 40+'px'}} onClick={this.resetForm}>清除条件</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
};


export default Form.create({
    mapPropsToFields (props) {
        return {
            "status": {name: 'status',},
            "startDate": {name: 'startDate',},
            "endDate": {name: 'endDate',}
        }
    }
})(SearchAuditlogs);

