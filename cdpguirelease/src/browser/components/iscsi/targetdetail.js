import React, {Component, PropTypes} from 'react';
import {Tabs,Table,Row,Button,Pagination}  from 'antd'
import {fetch_targetdetail} from '../../actions/iscsiactions'

const TabPane = Tabs.TabPane;

class TargetDetail extends Component {
    componentDidMount() {
        
    }
    render() {
        const {targetdetail,onChange,selectedRowKeys,echooption} = this.props
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = selectedRowKeys
        rowSelection.type = 'radio'
        var content=[];
        for(let key in targetdetail){
        content.push({
            id:key,
            value:targetdetail[key]
        })
        }
        const columns=[
            {
                title:'编号',
                render:(text,recode)=>{
                    return text.id
                }
            },
            {
                title:'选项',
                render:(text,recode)=>{
                    return text.value
                }
            }
        ]
        return (
            <div>
                <Tabs defaultActiveKey='1' tabPosition='top' type='card'>
                    
                    <TabPane tab="高级设置" key="1">
                        <Row className="table_toolbar">
                            <Button type='target' icon='edit' className="cdp_button_left" onClick={echooption} >修改</Button>
                        </Row>
                        <Table rowKey='id' rowSelection={rowSelection} dataSource={content} columns={columns} />
                    </TabPane>
                </Tabs>
                
            </div>
        );
    }
}

TargetDetail.propTypes = {

};

export default TargetDetail;