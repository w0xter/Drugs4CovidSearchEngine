import React, {useState, useEffect} from 'react'
import {Input,Row, Col,Button, Tooltip, Radio, Typography, List, Avatar} from 'antd'
import {atcAutocomplete, activeIngredientAutocomplete, autocomplete} from '../api/requests'
import SearchD4c from '../assets/SearchIcon.js'
import Icon from '@ant-design/icons';
import {MdClear} from 'react-icons/md'

const {Text} = Typography
const { Search } = Input;

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            suggestions:[],
            value:'',
        }
    }
    clear = () => {
        this.setState({value:''})
         this.onSuggestionsClearRequested()
    }
    goTo = (type, value) => {
        const search = value !== undefined ? value:this.state.value
        document.location.href=`/search/${type}/${search}`
    }
    onSuggestionsFetchRequested = (e) => {
        
        this.getSuggestions(e.target.value).then((data) => {
            this.setState({suggestions:data});
        }).catch((err) => console.log(err))
      };
    onSuggestionsClearRequested = () => {
    this.setState({
        suggestions: []
    });
    };


    getSuggestions = value => {
        return new Promise(async (resolve, reject) => {
            if(value.length > 1){
                const results = await autocomplete(value)
                let result = []
                await results.map((list) => {
                    result = result.concat(list)
                })
                const filteredResult = await result.filter(el =>
                    el.value.toLowerCase().slice(0, value.length) === value.toLowerCase()
                  )
                resolve(filteredResult)
            }else{
                resolve([])
            }
        })
      };
      onChangeSearch = (e) => {
        this.setState({
          value: e.target.value
        });
      };

      render(){
        return(    
            <div style={{marginBottom:16}}>           
                    <Input
                        placeholder="Write at least two characters to search"
                        size="large"
                        value={this.state.value}
                        suffix={this.state.value.length === 0 ? <Icon component={SearchD4c}/>:<Button onClick={() => this.clear()} size="large" type="link" icon={<MdClear/>}/>}
                        onChange={e => {this.onSuggestionsFetchRequested(e); this.onChangeSearch(e)}}
                    />
                    {this.state.suggestions.length !== 0?(
                    <List
                    style={{background:'#fbfbfb'}}
                    dataSource={this.state.suggestions}
                    renderItem={(item) => (
                        <List.Item
                            onClick={() => this.goTo(item.search,item.id)}
                            style={{padding:10}}
                            className="hoverEffect"

                        >
                            <List.Item.Meta
                                title={<Text strong>{item.title} </Text>}
                                description={<a onClick={() => this.goTo(item.search,item.id)}>{item.value}</a>}
                            />
                            </List.Item>
                        )}
                    />
                    ):''}
                    {this.state.suggestions.length === 0 && this.state.value.length > 2?(
                    <List
                    style={{background:'#fbfbfb'}}
                    >
                        <List.Item style={{padding:10}}>
                            <Text strong>Sorry we didn't find anything about {this.state.value}</Text>
                        </List.Item>
                    </List>

                    ):''}                    
            </div>
    
          )
        }
}