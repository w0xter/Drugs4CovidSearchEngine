import React, {useState, useEffect} from 'react'
import {Input,Row, Col,Button, Tooltip, Radio, Typography, List, Avatar} from 'antd'
import {atcAutocompete, activeIngredientAutocompete} from '../api/requests'
import SearchD4c from '../assets/SearchIcon.js'
import Icon from '@ant-design/icons';

const {Text} = Typography
const { Search } = Input;

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            suggestions:[],
            value:'',
            defaultRadio:'atc',
            radio:'atc'
        }
    }
    componentDidMount(){
    const searchTypes = ['atc', 'activeingredient', 'spanish']
    const url = document.location.href.split("/")
    const urlVal = url[url.length - 2]
    if(searchTypes.includes(urlVal))
        this.setState({defaultRadio:urlVal})
    }
    goTo = (value) => {
        const search = value !== undefined ? value:this.state.value
        document.location.href=`/search/atc/${search}`
    }
    onChangeRadio = (e) => {
        this.setState({radio:e.target.value})
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
    getAutoCompleteFunction(value){
        switch(this.state.radio){
            case 'atc':
                return atcAutocompete(value.trim().toUpperCase())
            case 'activeingredient':
                return activeIngredientAutocompete(value)
            default:
                return null
        }
    }
    getSuggestions = value => {
        return new Promise((resolve, reject) => {
            const inputValue = value;
            let allSuggestions = []
            if(inputValue.length > 1){
            this.getAutoCompleteFunction(inputValue).then((data) =>{
                resolve(data)
                console.log(allSuggestions)
            }).catch((err) => resolve([]))
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
                    <Row style={{marginTop:10}} gutter={[16, 16]} align="middle">
                        <Col>
                        <Text level={4} type="secondary">Search by: </Text>
                        </Col>
                        <Col>
                        <Radio.Group onChange={this.onChangeRadio} defaultValue={this.state.defaultRadio} size="small">
                            <Radio.Button value="activeingredient">Active ingredient</Radio.Button>
                            <Radio.Button value="atc">ATC code</Radio.Button>
                            <Radio.Button value="spanish">Spanish Trade name 🇪🇸</Radio.Button>
                        </Radio.Group>
                        </Col>
                    </Row>                
                    <Input
                        placeholder="Write at least two characters to search"
                        size="large"
                        suffix={<Icon onClick={() => this.goTo()} component={SearchD4c}/>}
                        onChange={e => {this.onSuggestionsFetchRequested(e); this.onChangeSearch(e)}}
                    />
                    {this.state.suggestions.length !== 0?(
                    <List
                    style={{background:'#fbfbfb'}}
                    dataSource={this.state.suggestions}
                    renderItem={(item) => (
                        <List.Item
                            style={{padding:10}}
                            actions={[
                            <Tooltip title="search">
                                <Button onClick={() => this.goTo(item.id)} type="link" />
                            </Tooltip>
                            ]}
                        >
                            <List.Item.Meta
                                title={<Text strong>{item.title} </Text>}
                                description={<a onClick={() => this.goTo(item.id)}>{item.value}</a>}
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