import React from 'react'
import {Tabs, Tag, Row, Col, Space, Typography, Descriptions, List, Divider} from 'antd'
import {CaretDownOutlined} from '@ant-design/icons'
const {TabPane} = Tabs 
const {Title} = Typography
const {Text} = Typography

export default function MedicineCarousel({medicines}){
    const docTypes = ['Ficha Técnica','Prospecto', 'Informe Público Evaluación','Plan de gestión de riesgos']
    const imgTypes = {'formafarmac':'Forma farmacéutica', 'materialas':'Material de acondicionamiento secundario'}
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        s = s.toLocaleLowerCase()
        return s.charAt(0).toUpperCase() + s.slice(1)
      }    
    return(
        <div style={{background:'#fbfbfb', padding:16}}>
            <Title level={3}>You can find it as:</Title>
        <Tabs size="small">
            {
                medicines.map((medicine) => {
                    let aut = Object.keys(medicine.estado).includes('aut')? Date(medicine.estado.aut):0
                    let susp = Object.keys(medicine.estado).includes('susp')? Date(medicine.estado.susp):0
                    let rev = Object.keys(medicine.estado).includes('rev')? Date(medicine.estado.rev):0
                    let estado = aut !== 0 && (susp === 0 || aut > susp) && (rev === 0 || aut > rev )
                    let viasAdministracion = ''
                    let ppa = medicine.vtm.nombre.split(" + ")
                    let medicineDosis = medicine.dosis.split("/").length >= ppa.length ? medicine.dosis.split("/"):medicine.dosis.split("-")
                    let tabName = medicine.nombre.substring(0,25)
                    tabName = medicine.nombre.length > 25 ? tabName + '...':tabName
                    medicine.viasAdministracion.map((via) => viasAdministracion += via.nombre + ', ')
                    return(
                        <TabPane tab={tabName} key={medicine.nregistro}>
                            <Title level={4}>{medicine.nombre}</Title>
                            <Row gutter={[8,8]}>
                                {medicine.psum? (
                                    <Col>
                                    <Tag color="error">Problemas De Suministro</Tag>
                                    </Col>
                                ):''}
                                <Col>
                                    <Tag color={medicine.receta ?'warning':'blue'}>{medicine.cpresc}</Tag>                                
                                </Col>
                                {medicine.triangulo ? (<Col>
                                    <Tag color="warning">Triángulo Negro <CaretDownOutlined style={{color:'#000'}} /></Tag>
                                </Col>):''}
                                <Col>
                                {estado ?(
                                    <Tag color="success">Autorizado</Tag>
                                ):(
                                    <Tag color="error">Suspendido</Tag>
                                )}
                                </Col>
                            </Row>
                            <div>
                            <List header={<Title level={3}>Información General</Title>}>
                                <List.Item><Text strong>Forma Farmacéutica: </Text> {capitalize(medicine.formaFarmaceutica.nombre)}</List.Item>
                                <List.Item ><Text strong>Via de Administración: </Text>{capitalize(viasAdministracion)}</List.Item>
                                <List.Item><Text strong>Principio Activo: </Text> {medicine.vtm.nombre}</List.Item>
                                <List.Item><Text strong>Dosis:</Text></List.Item>
                                {medicineDosis.map((dosis, idx) =>(
                                    <>
                                {ppa.length > idx ? (<List.Item><Text strong>{capitalize(ppa[idx]) + ': '}</Text>{ dosis}</List.Item>):''}
                                </>
                                ))
                                }
                            </List>
                            </div>
                            {medicine.materialesInf === true ?(
                                <>
                                {Object.keys(medicine).includes('docs') && medicine.docs.length !== 0 ? (
                                <>
                                    <Title level={4}>Documentos Asociados</Title>
                                    <Space size="small" direction="vertical">
                                        {medicine.docs.map((doc) => (
                                            <a href={doc.url}>{docTypes[doc.tipo]}</a>
                                        ))}
                                    </Space>
                                </>
                                ):''}
                                {Object.keys(medicine).includes('fotos') && medicine.fotos.length !== 0 ? (
                                    <>
                                    <Title level={4}>Imagenes Asociadas</Title>
                                    <Row align="bottom" gutter={[16,16]}>
                                    {medicine.fotos.map((img) => (
                                        <Col xs={24} md={8} justify="center">
                                            <Row justify="center">
                                            <img src={img.url} alt="" className=" medicineImg responsiveImg"/>
                                            </Row>
                                            <Row justify="center">
                                                <Text type="secondary">{imgTypes[img.tipo]}</Text>
                                            </Row>
                                        </Col>
                                    ))}
                                    </Row>
                                    </>
                                ):''}

                                </>
                            ):''}
                        </TabPane>
                    )
                })
            }
        </Tabs>    
        </div>
    )
}