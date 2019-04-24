import React, {Component, PropTypes} from 'react';
import {Table,Button,progress,Icon,Switch,Select} from 'antd'
Option=Select.Option
class Localanyagent extends Component{
	handleOk(){
		this.props.onOk({

		})
	}
	render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        return (
            <div>
                <Modal ref="modal"
                visible={this.props.visible}
                width={450}
                closable={false}
                title="数据传输" onOk={this.handleOk.bind(this) } onCancel={this.props.onCancel}
                >
                <Form layout='horizontal'>
                    <FormItem label="复制类型"  {...formItemLayout}>
                        <Select {...getFieldProps('copysize',{}) } >
                            <Option key='dd' value="dd">dd</Option>
                            <Option key='ntfsclone' value="ntfsclone">ntfsclone</Option>
                            <Option key='windd' value="windd">windd</Option>
                            <Option key='partclone' value="partclone">partclone</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="起始位置"  {...formItemLayout}>
                        <Input disabled={true}  {...getFieldProps('offset',{initialValue:0}) } />
                    </FormItem>
                    
                    <FormItem label="块大小"  {...formItemLayout}>
                        <Select disabled={true} {...getFieldProps('bs',{initialValue:'1024'}) } >
                            <Option key='1024'  value="1024">1024</Option>
                        </Select>
                    </FormItem>
                </Form>
                </Modal>
            </div>)
        
    }
}
export default createForm({
    mapPropsToFields (props) {
        return {
            bs: {name: 'bs'},
            offset: {name: 'offset'},
            copysize: {name: 'copysize'},


        }
    }
})(Localanyagent);