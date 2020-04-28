import React from 'react'
import {Row,Col, Button, Card, Input,Checkbox, Tag, Typography, Slider,Switch, message, Table, Tabs, InputNumber, Empty} from 'antd'
import axios from 'axios'
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons'
import {FiExternalLink} from 'react-icons/fi'
import ReactJson from 'react-json-view'
const {Title, Text, Paragraph} = Typography
const { TabPane } = Tabs;
const {Search} = Input
const options = {
        params:['keywords', 'size', 'level'],
        uri:'https://librairy.linkeddata.es/bio-api/',
        keys:[
            {label:'Drugs',value:'drugs', type:'drug',result:[]}, 
            {label:'Diseases', value:'diseases', type:'disease',result:[]}, 
            {result:[],label:'Articles', type:null,value:'texts'}
        ]}

const createUrl = (url, key) => {
    return url+key
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    s = s.toLocaleLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
const columns = (type) =>   [
    {
        title:'Name',
        dataindex:'name',
        key:'name',
        render: item => <Text strong> {capitalize(item.name)}</Text>
    },
    {
        title:'Code',
        dataindex:'code',
        key:'code',
        render: item => <Tag color="blue"> {item.code}</Tag>
    },
    {
        title:'Level',
        dataindex:'level',
        key:'level',
        render: item => item.level
    },        
    {
        title:'Frequecy',
        dataindex:'freq',
        key:'freq',
        render: item => item.freq
    },
    {
        title:'Learn more',
        dataindex:'code',
        key:'url',
        render: item => <a href={"/search/" + type + "/" + item.code}><FiExternalLink/></a>
    }
]

export default class CustomSearchPage extends React.Component{
     constructor(props){
         super(props);
         this.state = {
            question:this.props.data.question,
            type:this.props.data.type,
            search:this.props.data.search,
            keywordParam:'',
            keywords:this.props.data.keywords,
            atcLevel:Object.keys(this.props.data).includes('atc')?this.props.data.atc:1,
            filterAtcLevel:Object.keys(this.props.data).includes('atc'),
            filterMeshLevel:Object.keys(this.props.data).includes('mesh'),
            meshLevel:Object.keys(this.props.data).includes('mesh')?this.props.data.mesh:1,
            showQuery:this.props.expanded,
            sizeParam:'?size=3',
            size:3,
            data:{
                drugs:{label:'Drugs',url:`${options.uri}drugs`, search:false, result:[], columns:columns('drug')}, 
                diseases:{label:'Diseases', url:`${options.uri}diseases`, search:false, result:[],  columns:columns('disease')}, 
                texts:{label:'Articles', url:`${options.uri}texts`, search:false, result:[]}
            }
            }
         }
     alterUrls = (keys) => {
        this.setState({search:keys})
     } 
     alterSize = (val) => {
         this.setState({sizeParam:'?size='+val.toString()})
         this.setState({size:val})
     }
     createParams = (values) => {
         let params = `&keywords=`
         this.setState({keywords:values})
         values.split(",").map((value) => {
             let cleanValue = value.replace(/^[ \t]+/gm, '');
             cleanValue = cleanValue.replace(/[ \t]+$/gm, '')
             if(cleanValue.length !== 0)
                params += `'${cleanValue}',`
         })
         params = params.slice(0,-1)
         this.setState({keywordParam:params})
     }
     cleanResults = (key) => {
        let data = this.state.data[key]
        data.result = []
        this.setState({[key]:data})
     }
     search = () => {
        this.state.search.map((key) => {
            this.sendRequest(key)
        })
     }
     filterAtcLevel = () => {
         const next = !this.state.filterAtcLevel
         this.setState({filterAtcLevel:next})
     }
     filterMeshLevel = () => {
        const next = !this.state.filterMeshLevel
        this.setState({filterMeshLevel:next})
    }     
     changeAtcLevel = val => {this.setState({atcLevel:typeof(val) === "number"?val:1})}
     changeMeshLevel = val => {this.setState({meshLevel:typeof(val) === "number"?val:1})}
     getLevelParam = (key) => {
         let result = '' 
         if(key === 'drugs' && this.state.filterAtcLevel)
            result = '&level='+this.state.atcLevel.toString()
        else if(key === 'diseases' && this.state.filterMeshLevel)
            result = '&level='+this.state.meshLevel.toString()
        return result
     }

     keyWordSearch = () => (
            <>
                <Row gutter={[8,8]} align="middle">
                    <Col>
                        <Text strong>Search: </Text>
                    </Col>
                    <Col>
                    <Checkbox.Group
                    defaultValue={this.state.search}
                    options={options.keys}
                    onChange={(key) => this.alterUrls(key)}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Search
                            value={this.state.keywords}
                            size="large"
                            enterButton="Search"
                            placeholder='Split the keywords with a coma (e.g:viral vaccine,fever,coronavirus)'
                            onChange={e => this.createParams(e.target.value)}
                            onSearch={ () => this.search()}
                        />
                        <Text strong>Number of results: {this.state.size}</Text>
                        <Row align="middle" gutter={[8,8]}>
                            <Col span={18}>
                            <Slider
                                min={1}
                                max={100}
                                onChange={this.alterSize}
                                value={typeof this.state.size === 'number' ? this.state.size : 0}
                            /> 
                            </Col>
                        </Row>
                        <Row align="middle" gutter={[16,16]}>
                            {
                                this.state.search.includes("drugs") ?(
                                    <Col>
                                        <Row gutter={[8,8]} align="middle">
                                            <Col>
                                            <Text>Filter by ATC Level:</Text>
                                            </Col>
                                            <Col>
                                            <InputNumber
                                            type="number"
                                            value={this.state.atcLevel}
                                            disabled={!this.state.filterAtcLevel}
                                            min={1}
                                            max={5}
                                            key="0"
                                            onChange={e => this.changeAtcLevel(e)}
                                            />                                            
                                            </Col>
                                            <Col>
                                            <Switch
                                            key="0" 
                                            checked={this.state.filterAtcLevel} 
                                            size="small" 
                                            onChange={() => this.filterAtcLevel()}
                                            />
                                            </Col>
                                        </Row>
                                    </Col>
                                ):''
                            }
                                                        {
                                this.state.search.includes("diseases") ?(
                                    <Col>
                                        <Row gutter={[8,8]} align="middle">
                                            <Col>
                                            <Text>Filter by MESH Level:</Text>
                                            </Col>
                                            <Col>
                                            <InputNumber
                                            type="number"
                                            value={this.state.meshLevel}
                                            disabled={!this.state.filterMeshLevel}
                                            min={1}
                                            max={20}
                                            key="1"
                                            onChange={e => this.changeMeshLevel(e)}
                                            />                                            
                                            </Col>
                                            <Col>
                                            <Switch
                                            checked={this.state.filterMeshLevel} 
                                            key="1"
                                            size="small" 
                                            onChange={() => this.filterMeshLevel()}
                                            />
                                            </Col>
                                        </Row>
                                    </Col>
                                ):''
                            }
                        </Row>                       
                    </Col>
                </Row>
            </>
     )
     sendRequest = (key) => {
         let data = this.state.data[key]
         data.search = true
         const query = data.url+this.state.sizeParam+this.state.keywordParam+this.getLevelParam(key)
         if(this.state.keywordParam.length !== 0){
                axios.get(query).then(async (response) => {
                    data.result  = await response.data
                    this.setState({[key]:data})
                    console.log(this.state[key])
                }).catch((err) => {
                    message.error("Sorry somenthing goes wrong...")
                })   
         }else{
             message.warning("First you need to search somenthing!")
         }
     }
     ChangeShowQueryState = () => {
         const next = !this.state.showQuery;
         this.setState({showQuery:next})
     }
     async componentDidMount(){
        if(this.props.data.keywords.length != 0){
            await this.createParams(this.props.data.keywords)
            if(this.state.keywords.length !== 0)
                this.search()
        }

     }
     render(){
        return(
            <Card className="shadowEffect">
                <Row align="top"  gutter={[8,8]}>
                    <Col>
                        <Title level={4}>{this.state.question}</Title>                    
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Button onClick={() => this.ChangeShowQueryState()}>
                         {this.state.showQuery?'Hide':'Show'} Query {this.state.showQuery?<EyeInvisibleOutlined/>:<EyeOutlined/>}
                     </Button>
                </Col>
                </Row>
                {this.state.showQuery?(
                <>
                {this.state.type === 'keywords' ?(
                    this.keyWordSearch()
                ):''}

                {this.state.search.map((key) => {
                return(
                    <div>
                        <Row gutter={[16,16]}>
                            <Col>
                                <Title level={4}>Related {this.state.data[key].label} with: {this.state.keywords}</Title>
                            </Col>
                            <Col>
                                <Button onClick={() => this.sendRequest(key)}>Search</Button>
                            </Col>
                        </Row>
                        <Row align="middle" gutter={[8,8]}>
                            <Col>
                                <Text strong>
                                    Request: 
                                </Text>
                            </Col>
                            <Col>
                            <Text code>curl -X GET {this.state.data[key].url + this.state.sizeParam + this.state.keywordParam + this.getLevelParam(key)}</Text>
                            </Col>
                        </Row>
                        {this.state.data[key].result.length !== 0 ?(
                            <>
                            <Button onClick={() => this.cleanResults(key)}>Hide Results</Button>
                            <Tabs>
                                {
                                    key !== 'texts'?(
                                        <TabPane tab="Table" key="0">
                                        <Table
                                            columns={this.state.data[key].columns}
                                            dataSource={this.state.data[key].result}
                                        />
                                    </TabPane>
                                    ):''
                                }
                            <TabPane tab="JSON" key="1">
                                <ReactJson src={this.state.data[key].result} />
                            </TabPane>
                            </Tabs>
                            </>
                        ):this.state.data[key].search?(
                            <Empty></Empty>
                        ):''}
                    </div>
                )})}
                </>
                ):''}
            </Card>
        )
     }
 }