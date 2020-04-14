import React, {useEffect, useState} from 'react'
import {Tabs} from 'antd'

const { TabPane } = Tabs;

export default function DrugTabs(props){
    const [drugs, setDrugs] = useState([0]);

    useEffect(() => {
        setDrugs(props.data)
        console.log(props.data)
    },[])
    return(
        <>
        {drugs.length !== 0 ?(
        <Tabs>
            {props.data.map((drug) => {
                return(
                    <TabPane tab={drug.name} key={drug.name}>
                        Content of Tab Pane 1
                    </TabPane>
                )
            })}
        </Tabs>
        ):''}
        </>
    )
}