import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd'
import {Link} from 'react-router'

class ScriptsDetail extends Component {
    render() {
        const {items} = this.props
         console.log(items)
        var id = window.location.href.split('?')[0].split('/').pop()
        if(items!=''){
            for(let i=0;i<items.length;i++){
                if(id==items[i].id){
                    return (
                        <div>
                           <p>{items[i].scriptcontent} </p>
                        </div>
                    ); 
                }
            }  
        }else{
            return (
                <div>
                   <p></p>
                </div>
            ); 
        }
        
        
    }
}

ScriptsDetail.propTypes = {
    items: PropTypes.array.isRequired,
};

export default ScriptsDetail;