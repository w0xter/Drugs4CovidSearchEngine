import React from 'react'
import { Collapse, Typography, Badge,Divider } from 'antd'
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
                    const link = item.article != null ? item.article.url_s:'#'
                    const title = item.article != null && Object.keys(item.article).includes('name_s') ? item.article.name_s:'Read the article' 
                    return(
                    <Panel header={
                        <>
                        <Text strong>{title} </Text>
                        <a target="_blank" href={link}>
                            <FiExternalLink/>
                        </a>
                        </>
                        } 
                    key={idx.toString()}>
                        <Text strong>Section: {item.paragraph.section_s}</Text>
                        <Paragraph className="text-justify">
                        {item.paragraph.text_t}
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