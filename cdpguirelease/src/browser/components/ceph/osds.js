import React, {Component, PropTypes} from 'react';
import {Table,Button,progress,Tree,Row} from 'antd';
import {refresh_list} from '../../actions/cephaction'
const TreeNode = Tree.TreeNode;
var data =[];

class Osds extends Component {
    constructor(props) {
        super(props)
    }



  render() {
    const {items,onChange, selectedOsds,selectedRowKeys,filtertype,cluster,refresh,dispatch/*,getCheckboxProps*/} = this.props
    const rowSelection = {
      getCheckboxProps:record=>({
        disabled:(record.type==='root'||record.type==='host')
      })
    }
    rowSelection.onChange = onChange
    rowSelection.selectedRowKeys = selectedRowKeys     

    
    const columns=[
    {
      title:'name',
      dataIndex:'name',
      width:'34%',
      key:'name'
    },
    {
      title:'id',
      dataIndex:'id',
      width:'33%',
      key:'id'

    },
    {
      title:'type',
      dataIndex:'type',
      width:'33%',
      key:'type'

    }]
console.log(refresh)
  if(cluster!=undefined&&cluster!=''){
      for(let i=0;i<cluster.length;i++){
          for (let j=0;j<cluster[i].crushmap.crushmap.osdtree.nodes.length;j++){
              // data.push(cluster[i].crushmap.crushmap.osdtree.nodes)
              cluster[i].crushmap.crushmap.osdtree.nodes[j].key=cluster[i].crushmap.crushmap.osdtree.nodes[j].id
              
              if(cluster[i].crushmap.crushmap.osdtree.nodes[j].type=='root'){
                cluster[i].crushmap.crushmap.osdtree.nodes[j].name=cluster[i].name
               
                if(data.length>0){
                  data.map(function(item){
                    if(item.id!=cluster[i].crushmap.crushmap.osdtree.nodes[j].id){
                       data.push(cluster[i].crushmap.crushmap.osdtree.nodes[j])
                    }
                  })          
                }else{
                  data.push(cluster[i].crushmap.crushmap.osdtree.nodes[j])
                }

              }
              for(let m=0;m<data.length;m++){
                if(data[m].children!=undefined){
                  for(let n=0;n<data[m].children.length;n++){
                    if(data[m].children[n]==cluster[i].crushmap.crushmap.osdtree.nodes[j].id){
                      data[m].children[n]=cluster[i].crushmap.crushmap.osdtree.nodes[j];
                      break;
                    }
                  }
                }
                
              }
              for(let m=0;m<data.length;m++){
                if(data[m].children!=undefined){
                  for(let n=0;n<data[m].children.length;n++){
                    if(data[m].children[n].children!=undefined){
                      for(let x=0;x<data[m].children[n].children.length;x++){
                        if(data[m].children[n].children[x]==cluster[i].crushmap.crushmap.osdtree.nodes[j].id){
                          data[m].children[n].children[x]=cluster[i].crushmap.crushmap.osdtree.nodes[j];
                          break;
                        }
                      }
                    }
                    
                  }
                }
                
              }
        }
      }


    }
  if(refresh==true){
    if(cluster!=undefined&&cluster!=''){
      for(let i=0;i<cluster.length;i++){
          for (let j=0;j<cluster[i].crushmap.crushmap.osdtree.nodes.length;j++){
              // data.push(cluster[i].crushmap.crushmap.osdtree.nodes)
              cluster[i].crushmap.crushmap.osdtree.nodes[j].key=cluster[i].crushmap.crushmap.osdtree.nodes[j].id
              
              if(cluster[i].crushmap.crushmap.osdtree.nodes[j].type=='root'){
                cluster[i].crushmap.crushmap.osdtree.nodes[j].name=cluster[i].name
               
                if(data.length>0){
                  data.map(function(item){
                    if(item.id!=cluster[i].crushmap.crushmap.osdtree.nodes[j].id){
                       data.push(cluster[i].crushmap.crushmap.osdtree.nodes[j])
                    }
                  })          
                }else{
                  data.push(cluster[i].crushmap.crushmap.osdtree.nodes[j])
                }

              }
              for(let m=0;m<data.length;m++){
                if(data[m].children!=undefined){
                  for(let n=0;n<data[m].children.length;n++){
                    if(data[m].children[n]==cluster[i].crushmap.crushmap.osdtree.nodes[j].id){
                      data[m].children[n]=cluster[i].crushmap.crushmap.osdtree.nodes[j];
                      break;
                    }
                  }
                }
                
              }
              for(let m=0;m<data.length;m++){
                if(data[m].children!=undefined){
                  for(let n=0;n<data[m].children.length;n++){
                    if(data[m].children[n].children!=undefined){
                      for(let x=0;x<data[m].children[n].children.length;x++){
                        if(data[m].children[n].children[x]==cluster[i].crushmap.crushmap.osdtree.nodes[j].id){
                          data[m].children[n].children[x]=cluster[i].crushmap.crushmap.osdtree.nodes[j];
                          break;
                        }
                      }
                    }
                    
                  }
                }
                
              }
        }
      }


    }
    dispatch(refresh_list(false))
  }
    
    console.log(data)
   

  return(
      <Row>
        <Row>
          <Table rowKey='id' columns={columns} rowSelection={rowSelection} dataSource={data}  />
        </Row>
      </Row>
    );
    
  }
}

export default Osds;
