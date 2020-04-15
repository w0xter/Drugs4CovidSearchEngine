import React from 'react'
import {Tabs, Tag, Row, Col, Space, Typography, Descriptions, List, Divider} from 'antd'
import {CaretDownOutlined} from '@ant-design/icons'
const {TabPane} = Tabs 
const {Title} = Typography
const {Text} = Typography
/**
 * 
 * {
  "nregistro": "81012",
  "nombre": "ABACAVIR/LAMIVUDINA DR. REDDYS 600 MG/300 MG COMPRIMIDOS RECUBIERTOS CON PELICULA EFG",
  "labtitular": "Reddy Pharma Iberia S.A.",
  "cpresc": "Uso Hospitalario",
  "estado": {
    "aut": 1466978400000
  },
  "comerc": true,
  "receta": true,
  "generico": true,
  "conduc": false,
  "triangulo": false,
  "huerfano": false,
  "biosimilar": false,
  "nosustituible": {
    "id": 0,
    "nombre": "N/A"
  },
  "psum": false,
  "notas": false,
  "materialesInf": true,
  "ema": false,
  "docs": [
    {
      "tipo": 1,
      "url": "https://cima.aemps.es/cima/pdfs/ft/81012/FT_81012.pdf",
      "urlHtml": "https://cima.aemps.es/cima/dochtml/ft/81012/FT_81012.html",
      "secc": true,
      "fecha": 1552696434000
    },
    {
      "tipo": 2,
      "url": "https://cima.aemps.es/cima/pdfs/p/81012/P_81012.pdf",
      "urlHtml": "https://cima.aemps.es/cima/dochtml/p/81012/P_81012.html",
      "secc": true,
      "fecha": 1540245746000
    }
  ],
  "fotos": [
    {
      "tipo": "materialas",
      "url": "https://cima.aemps.es/cima/fotos/thumbnails/materialas/81012/81012_materialas.jpg",
      "fecha": 1570105172000
    },
    {
      "tipo": "formafarmac",
      "url": "https://cima.aemps.es/cima/fotos/thumbnails/formafarmac/81012/81012_formafarmac.jpg",
      "fecha": 1570105174000
    }
  ],
  "viasAdministracion": [
    {
      "id": 48,
      "nombre": "VÍA ORAL"
    }
  ],
  "formaFarmaceutica": {
    "id": 42,
    "nombre": "COMPRIMIDO RECUBIERTO CON PELÍCULA"
  },
  "formaFarmaceuticaSimplificada": {
    "id": 10,
    "nombre": "COMPRIMIDO"
  },
  "vtm": {
    "id": 413381000,
    "nombre": "abacavir + lamivudina"
  },
  "dosis": "600 mg/300 mg"
}
 */
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
                                    <Tag color="blue">{medicine.cpresc}</Tag>                                
                                </Col>
                                <Col>
                                    <Tag color="warning">{medicine.receta ? 'Con Receta':'Sin Receta'}</Tag>                                
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
                                { medicine.comerc?(
                                    <Col>
                                        <Tag color="success">Comercial</Tag>
                                    </Col>):''
                                }
                            </Row>
                            <div>
                            <List header={<Title level={3}>Información General</Title>}>
                                <List.Item><Text strong>Forma Farmacéutica: </Text> {capitalize(medicine.formaFarmaceutica.nombre)}</List.Item>
                                <List.Item ><Text strong>Via de Administración: </Text>{capitalize(viasAdministracion)}</List.Item>
                                <List.Item><Text strong>Principio Activo: </Text> {medicine.vtm.nombre}</List.Item>
                                <List.Item><Text strong>Dosis</Text></List.Item>
                                {medicine.dosis.split("/").map((dosis, idx) =>(
                                    <>
                                {medicine.vtm.nombre.split(' + ').length > idx ? (<List.Item><Text strong>{capitalize(medicine.vtm.nombre.split(' + ')[idx]) + ': '}</Text>{ dosis}</List.Item>):''}
                                </>
                                ))
                                }
                            </List>
                            </div>
                            {medicine.materialesInf === true ?(
                                <>
                                {medicine.docs.length !== 0 ? (
                                <>
                                    <Title level={4}>Documentos Asociados</Title>
                                    <Space size="small" direction="vertical">
                                        {medicine.docs.map((doc) => (
                                            <a href={doc.url}>{docTypes[doc.tipo]}</a>
                                        ))}
                                    </Space>
                                </>
                                ):''}
                                {medicine.fotos.length !== 0 ? (
                                    <>
                                    <Title level={4}>Imagenes Asociadas</Title>
                                    <Row gutter={[16,16]}>
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