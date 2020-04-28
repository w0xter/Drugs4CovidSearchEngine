import React from 'react'
import Layout from '../components/Layout'
import SearchBar from '../components/Searchbar'
import DrugTabs from '../components/DrugTabs'
import { Row, Col, Typography} from 'antd';
import MedicalResearch from '../assets/medical_research.svg'

const {Title} = Typography
const {Paragraph} = Typography
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            drugs:[]
        }
    }
    setDrugs(drugs){
        this.setState({drugs:drugs})
    }
    render(){
        return(
            <Layout>
                <SearchBar parentCallback={(drugs) => this.setDrugs(drugs)}></SearchBar>
                {this.state.drugs.length !== 0 ? (<DrugTabs drugs={this.state.drugs}></DrugTabs>):(
                    <div>
                    <Row align="top">
                        <Col xs={24} md={12}>
                            <Title level={2}>
                            D4C Search Engine
                            </Title>
                            <Paragraph style={{textAlign:'justify'}}>
                            An open web service to exploit the existing scientific literature about coronavirus (more than 60,000 papers) identifying drugs, diseases and articles and displaying their relations inside the corpus. You can search by ATC code, Generic Name, Disease Name or MESH code.
                            </Paragraph>
                        </Col>
                        <Col xs={24} md={12}>
                            <img className="responsiveImg" src={MedicalResearch}/>
                        </Col>                         
                    </Row>
                    <Row>
                       
                    </Row>
                    </div>
                )}
            </Layout>
        )
    }
}