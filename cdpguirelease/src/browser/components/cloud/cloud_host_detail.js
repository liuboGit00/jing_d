import React, {Component, PropTypes} from 'react';
import {Tabs,Table,Row,Button,}  from 'antd'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane;
var str = '1'

class CloudhostDetail extends Component {
    componentDidMount() {
        const{dispatch} = this.props
        
    }
    handle_click(key){
        str = key
        // console.log(str)
    }
    render() {
        const {hosthba,IscsitgtselectedRowKeys,onChange,deliscsitgt,addiscsitgt,hostlun,clouds,volumes} = this.props
        // console.log(clouds)
        // console.log(hostlun)

        let hostname = window.location.href.split('?')[0].split('/').pop()
        let Arr=[];
        let hbaArr=[];
        let iscsitgtArr=[];
        let lunArr = [];
        for(let k in hosthba){
            for(let i in hosthba[k]){
                Arr.push(hosthba[k][i])
            }
        };
        for(let i=0;i<Arr.length;i++){
            for(let k in Arr[i]){
                Arr[i][k].name=k
                hbaArr.push(Arr[i][k])
            }
        }
        // console.log(hbaArr)
        if(hbaArr.length>0){
            Arr=[]
            for(let i=0;i<hbaArr.length;i++){
                if(hbaArr[i].type=='InternetScsiHba'){
                    Arr.push(hbaArr[i].iscsitgts,hbaArr[i].name)
                }
            }
            // console.log(Arr)
            for(let i=0;i<Arr[0].length;i++){
                iscsitgtArr.push({'name':Arr[0][i],'id':i,'hba':Arr[1],'hostname':hostname})
            }
        }
        if(hostlun){
            let id = window.location.href.split('?')[0].split('/')[5]
            let lunname = null
            let lunnameT = null
            for(let i=0;i<clouds.length;i++) {
                if(clouds[i].id==id){
                    lunname = clouds[i].name
                    lunnameT = clouds[i].cloudtype
                }
            }

            
            let lunvo = hostlun[lunname][lunnameT][hostname]
            for(let i=0;i<lunvo.length;i++){
                    // console.log(lunvo[i].uuid)

                for(let j=0;j<volumes.length;j++){
                    if ((lunvo[i].uuid.slice(17,42))==(volumes[j].uuid.split('-').join('').slice(0,25))) {
                        // console.log(volumes[j].name)
                        lunArr.push({"name":volumes[j].name,'id':volumes[j].id})
                    };
                }
            }
        }
        const hba = [
            {
                title: '名字',
                dataIndex: 'name',
                className:'hba'
            },{
                title: '状态',
                dataIndex: 'status',
                className:'hba',
                render:(text,recod)=>{
                    // console.log(text)
                    if(text=='online'){
                        return text
                    }
                    return ('offline')
                }
            },{
                title: '类型',
                dataIndex: 'type',
                className:'hba'
            },
            
        ];
        const iscsitgt=[
        {
            title:'名字',
            dataIndex:'name',

        },
        ]
        const lun=[
        {
            title:'',
            dataIndex:'id',
            width:'5%',
            render:(text,recod)=>{
                return ''
            }
        },{
            title:'卷名',
            dataIndex:'name',
            className:'vmlun',
            render:(text,recod)=>{
                // console.log(text)
                return <Link to={`/volumes/${recod.id}`}>{text}</Link>
            }

        },]
        const rowSelection = {}
        rowSelection.onChange = onChange
        rowSelection.selectedRowKeys = IscsitgtselectedRowKeys
        return (
            <div>
                <Tabs onTabClick={this.handle_click.bind(this)}   defaultActiveKey={str} tabPosition='top' type='card'>
                    <TabPane tab="hba" key="1">
                        <Table rowKey='name' columns={hba}  dataSource={hbaArr}/>
                    </TabPane>
                    <TabPane tab='iscsitgt' key='2'>
                        <Row className="table_toolbar">
                            <Button type='ghost' icon='delete' className="cdp_button_right" onClick={deliscsitgt} >删除iscsitgt</Button>
                            <Button type='ghost' icon='plus'  className="cdp_button_right" onClick={addiscsitgt} >添加iscsitgt</Button>
                        </Row>
                        <Table rowKey='id' columns={iscsitgt} dataSource={iscsitgtArr} rowSelection={rowSelection} />
                    </TabPane>
                    <TabPane tab='lun' key='3'>
                        <Table  rowKey='id' columns={lun} dataSource={lunArr}  />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

CloudhostDetail.propTypes = {

};

export default CloudhostDetail;
