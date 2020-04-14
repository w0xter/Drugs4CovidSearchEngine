import React from 'react'
import Layout from '../components/Layout'
import SearchBar from '../components/Searchbar'
import DrugTabs from '../components/DrugTabs'
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            drugs:[]
        }
    }
    setDrugs(drugs){
        this.setState({drugs:drugs})
        console.log(drugs)
    }
    render(){
        return(
            <Layout>
                <SearchBar parentCallback={(drugs) => this.setDrugs(drugs)}></SearchBar>
                <DrugTabs data={this.state.drugs}></DrugTabs>
            </Layout>
        )
    }
}