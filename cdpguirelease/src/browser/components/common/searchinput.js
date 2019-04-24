/**
 * Created by tanglinhai on 2016/8/23.
 */
import React, { Component,PropTypes } from 'react'
import { Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;

class SearchInput extends Component{
    constructor(props){
        super(props);
        this.state={
            value: '',
            focus: false,
        };
        this.handleSearch = this.handleSearch.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFocusBlur = this.handleFocusBlur.bind(this)
    }
    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });

    }
    handleFocusBlur(e) {

        this.setState({
            focus: e.target === document.activeElement,
        });

    }
    handleSearch(e) {
        console.log(this.state.value)

        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
        this.setState({
            value:''
        })
    }

    render() {
        const { style, size, placeholder } = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        return (
            <div className="cdp_searchInput"  style={style}>
                <InputGroup className={searchCls}>
                    <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
                    onPressEnter={this.handleSearch} onFocus={this.handleFocusBlur}  onBlur={this.handleFocusBlur}
                    />
                    <div className="ant-input-group-wrap">
                        <Button style={{height:26}} icon="search" className={btnCls} size={size} onClick={this.handleSearch} loading={this.props.loading}/>
                    </div>
                </InputGroup>
            </div>
        );
    }
};

export default SearchInput;
