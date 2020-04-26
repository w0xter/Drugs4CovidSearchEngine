import React, {useEffect, useState} from 'react'
import {Tabs,Typography, Tag, Row, Col, Space, Divider} from 'antd'
import AtcInfo from './AtcInfo'
import MeshInfo from './MeshInfo'
const { TabPane } = Tabs;
/*

atc_code: "N02BE01"
​​
atc_parent: "N02BE"
​​
cui: "C0000970"
​​
level: 5
​​
name: "paracetamol"
*/
export default function DrugTabs({type,drugs}){
    return(
        <>
        {drugs.length !== 0 ?(
        <Tabs>
            {drugs.map((drug) => {
                return(
                    <TabPane tab={drug.id} key={drug.id}>
                        {type === 'drug' ?(
                        <AtcInfo data={drug}/>
                        ):(
                            <MeshInfo data={drug}/>
                        )}
                    </TabPane>
                )
            })}
        </Tabs>
        ):''}
        </>
    )
}