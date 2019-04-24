import React, {Component, PropTypes} from 'react';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'

import {fetch_echarts_width} from '../../actions/poolactions'
class Echart extends Component{
    componentDidMount(){
        const{dispatch}=this.props
        this.getoption()
        // window.addEventListener('resize', this.onWindowResize.bind(this,dispatch))
    }
    onWindowResize(dispatch){
        // const {pools}=this.props

        // console.log(dispatch)
        // let echartWidth = document.body.clientWidth
        // dispatch(fetch_echarts_width(echartWidth))
        // // console.log(echartWidth)
    }
    componentDidUpdate(){
        this.getoption()
    }
    getoption(){
        const {items,pools}=this.props
        let datanum={
            "克隆设备":0,
            "块设备":0,
            "文件系统":0,
            "日志卷":0,
            "镜像设备":0,
            "集群卷":0,
            "硬盘设备":0,
        }
        for(let i=0;i<items.length;i++){
            if(items[i].native.type.model=='zvol'){
                if(items[i].clonefrom!==null){
                    datanum.克隆设备+=1
                }else{
                    datanum.块设备+=1
                }
            }else if(items[i].native.type.model=='zfs'){
                datanum.文件系统+=1
            }else if(items[i].native.type.model=='logdevice'){
                datanum.日志卷+=1
            }else if(items[i].native.type.model=='connection'){
                datanum.镜像设备+=1
            }else if(items[i].native.type.model=='image'){
                datanum.集群卷+=1
            }else if(items[i].native.type.model=='genericdisk'){
                datanum.硬盘设备+=1
            }
        }
        let legenddata=[]
        let seriesdata = []
        for (let k in datanum){
            if(datanum[k]!=0){
                legenddata.push(k);
                seriesdata.push({value:datanum[k],name:k,itemStyle:{normal:{borderWidth: 5,
                    borderColor: '#fff',}}})
            }
        }
        let myChart = echarts.init(document.getElementById('main'))
        let myChartPool = echarts.init(document.getElementById('mainTwo'))
        let option = {
            title:{
                text:'所有卷',
                x:'left',
                textStyle:{
                    color:'rgba(0, 0, 0, 0.65)',
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%) '
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                y: 20,
                data:legenddata,


            },
            color:['rgb(24, 144, 255)','rgb(19, 194, 194)','rgb(47, 194, 91)','rgb(133, 67, 224)','rgb(240, 72, 100)','rgb(250, 204, 20)','#33d7fb'],
            series: [
                {
                    name:'所有卷',
                    type:'pie',
                    radius: ['45%','65%'],
                    center:['50%','50%'],
                    avoidLabelOverlap: false,
                    hoverOffset:5,
                    label: {
                        normal: {
                            show: true,
                            formatter: function(){
                                return  '所有卷个数\n'+ items.length
                            },
                            position: 'center',
                            textStyle:{
                                fontSize:'25',
                                color:'rgba(0, 0, 0, 0.4)',
                            }
                        },
                        
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:seriesdata
                },
            ]
        };
        let placeHolderStyle = {
            normal : {
                borderColor: 'white',
            }, 

        };
        let xArr=[]
        let dataArrFree=[]
        let dataArrSize =[]
        for(let i=0;i<pools.length;i++){
            if(pools[i].usage!=undefined&&pools[i].usage.free!=undefined){
                xArr.push(pools[i].name)
                dataArrFree.push(parseInt((pools[i].usage.size-pools[i].usage.free)/1024*100)/100)
                dataArrSize.push(parseInt(pools[i].usage.free/1024*100)/100)
            }
        }
        let poolContent=[pools[0].name,parseInt(pools[0].usage.free*100/1024)/100,parseInt((pools[0].usage.size-pools[0].usage.free)*100/1024)/100,parseInt(pools[0].usage.size*100/1024)/100]
        let optionPool={
            title:{
                text:'存储池',
                x:'left',
                textStyle:{
                    color:'rgba(0, 0, 0, 0.65)',
                }
            },
            legend: {
                y:20,
                data:['已使用','未使用']
            },
            color:['rgb(24, 144, 255)','#C6E8FF'],
            animation:false,
            grid: {
                right: '50%',
                containLabel: true
            },
            tooltip:{},
            xAxis : [
                {
                    type : 'category',
                    data : xArr,
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '存储池容量 (G)'
                }
            ],
            
            series : [
                {
                    name:'已使用',
                    type:'bar',
                    stack: '总量',
                    barWidth: '20%',
                    data:dataArrFree,
                },
                {
                    name:'未使用',
                    type:'bar',
                    stack: '总量',
                    data:dataArrSize,
                    barWidth: '20%',
                },
                {
                    name:'存储池',
                    type:'pie',
                    radius:['45%','60%'],
                    center:['75%','50%'],
                    avoidLabelOverlap: false,
                    zlevel:2,
                    hoverAnimation: false,
                    hoverOffset:5,
                    label:{
                        normal: {
                            show: true,
                            formatter: function(){
                                return poolContent[0] +'\n\n'+poolContent[3]+'G'
                            },
                            position: 'center',
                            textStyle:{
                                fontSize:'25',
                                color:'rgba(0, 0, 0, 0.4)',
                            }
                        },
                        emphasis:{
                            show:true
                        }
                        
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[  
                        {
                            value:poolContent[2],     
                            name:'已使用' 
                        },
                        {
                            value:poolContent[1] ,     
                            name:'未使用',
                            itemStyle : placeHolderStyle
                        }

                    ],
                },{
                    name:'存储池总容量',
                    type:'pie',
                    radius:['45%','60%'],
                    center:['75%','50%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    hoverOffset:5,
                    zlevel:1,
                    label: {
                        normal: {
                            show: false,
                            formatter: function(){
                                return  100+'G'
                            },
                            position: 'center',
                            textStyle:{
                                fontSize:'25',
                                color:'rgba(0, 0, 0, 0.4)',
                            }
                        },
                        emphasis:{
                            show:false
                        }
                        
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {
                            value:360,
                            name:'存储池总容量'
                        },
                        {
                            value:0,
                            name:'未使用',
                            itemStyle : placeHolderStyle
                        }
                    ],
                },
            ]
                
    
            }
        myChartPool.on('click',function(parme){
            // console.log(parme.name)
            poolContent=[]
            for(let i=0;i<pools.length;i++){
                if(pools[i].name==parme.name){
                    poolContent.push(pools[i].name,parseInt(pools[i].usage.free*100/1024)/100,parseInt((pools[i].usage.size-pools[i].usage.free)*100/1024)/100,parseInt(pools[i].usage.size*100/1024)/100)
                }
            }
            // console.log(poolContent)
        
            // console.log(poolContent)
            optionPool={
                title:{
                    text:'存储池',
                    x:'left',
                    textStyle:{
                        color:'rgba(0, 0, 0, 0.65)',
                    }
                },
                legend: {
                    data:['已使用','未使用']
                },
                color:['rgb(24, 144, 255)','#C6E8FF'],
                animation:false,
                grid: {
                    right: '50%',
                    containLabel: true
                },
                tooltip:{},
                xAxis : [
                    {
                        type : 'category',
                        data : xArr,
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name: '存储池容量 (G)'
                    }
                ],
                
                series : [
                    {
                        name:'已使用',
                        type:'bar',
                        stack: '总量',
                        barWidth: '20%',
                        data:dataArrFree,
                    },
                    {
                        name:'未使用',
                        type:'bar',
                        stack: '总量',
                        data:dataArrSize,
                        barWidth: '10%',
                    },
                    {
                        name:'存储池',
                        type:'pie',
                        radius:['45%','60%'],
                        center:['75%','50%'],
                        avoidLabelOverlap: false,
                        zlevel:2,
                        hoverAnimation: false,
                        hoverOffset:5,
                        label:{
                            normal: {
                                show: true,
                                formatter: function(){
                                    return poolContent[0] +'\n\n'+poolContent[3]+'G'
                                },
                                position: 'center',
                                textStyle:{
                                    fontSize:'25',
                                    color:'rgba(0, 0, 0, 0.4)',
                                }
                            },
                            emphasis:{
                                show:true
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[  
                            {
                                value:poolContent[2],     
                                name:'已使用' 
                            },
                            {
                                value:poolContent[1] ,     
                                name:'未使用',
                                itemStyle : placeHolderStyle
                            }
    
                        ],
                    },{
                        name:'存储池总容量',
                        type:'pie',
                        radius:['45%','60%'],
                        center:['75%','50%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false,
                        hoverOffset:5,
                        zlevel:1,
                        label: {
                            normal: {
                                show: false,
                                formatter: function(){
                                    return  100+'G'
                                },
                                position: 'center',
                                textStyle:{
                                    fontSize:'25',
                                    color:'rgba(0, 0, 0, 0.4)',
                                }
                            },
                            emphasis:{
                                show:false
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {
                                value:360,
                                name:'存储池总容量'
                            },
                            {
                                value:0,
                                name:'未使用',
                                itemStyle : placeHolderStyle
                            }
                        ],
                    },
                ]
                    
    
            }
            myChartPool.setOption(optionPool)
        })
        myChart.setOption(option)
        myChartPool.setOption(optionPool)
        
       
        

    }
    render(){
        const {dispatch}=this.props

        return(

            <div className='clearfloat'>
                <div id='mainTwo' style={{width:'800',height:'400',float:'left'}}></div>
                <div id='main' style={{width:400,height:400,float:'left',marginLeft:20,background:'red'}}></div>
                
            </div>
        )}
}
export default Echart;