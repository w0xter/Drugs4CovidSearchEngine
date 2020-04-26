import React from 'react'
import { Collapse, Typography, Badge,Divider } from 'antd'
import Highlighter from "react-highlight-words";
import {FiExternalLink} from 'react-icons/fi'
const {Text} = Typography
const {Title} = Typography

const {Paragraph} = Typography

const {Panel} = Collapse

export default function RelatedArticles(props){
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        s = s.toLocaleLowerCase()
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    console.log(props.data[1])
    return(
        <>
        <Title level={3}>
            Related Articles:
        </Title>
        <Collapse defaultActiveKey={['0']}>
            {
                props.data.map((item, idx) => {
                    const link = item.article !== null && Object.keys(item.article).includes('url') ? item.article.url:'#'
                    const title = item.article !== null && Object.keys(item.article).includes('title') ? item.article.title:'Read the article' 
                    return(
                    <Panel key={idx.toString()}
                    header={
                        <>
                        <Text strong>{title} </Text>
                        { link !== "#" ?(
                            <a target="_blank" href={link}>
                            <FiExternalLink/>
                            </a>
                        ):''
                        }
                        </>
                        } 
                    key={idx.toString()}>
                        <Text strong>Section: {item.article.section}</Text>
                        <Paragraph className="text-justify">
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={props.relatedWords}
                            autoEscape={true}
                            textToHighlight={item.text}
                        />                        
                        
                        </Paragraph>
                    </Panel>
                    )
                })
            }
        </Collapse>
        <Divider></Divider>
        </>
    )
}