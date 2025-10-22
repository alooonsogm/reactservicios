import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import TablaMultiplicar from './TablaMultiplicar'
import NotFound from './NotFound'
import { useParams } from 'react-router-dom'
import Collatz from './Collatz'
import MenuRutas from './MenuRutas'
import HospitalesMultiples from './HospitalesMultiples'

export default class Router extends Component {
  render() {
    function TablaMultiplicarElement(){
        //Esta funcion nos servira para capturar los parametros recibidos
        //en una ruta y enviarlos con props a nuestro component.
        //Voy a enviar un parametro llamado minumero
        let {minumero} = useParams();
        //Delvolvemos el component tabla multiplicar con sus props
        return <TablaMultiplicar numero={minumero}/>

    }

    function CollatzElement(){
        let {minumero} = useParams();
        return <Collatz numero={minumero}/>
    }

    return (
      <BrowserRouter>
      <MenuRutas/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tabla/:minumero" element={<TablaMultiplicarElement/>}/>
        <Route path="/collatz/:minumero" element={<CollatzElement/>}/>
        <Route path="/hospitales" element={<HospitalesMultiples/>}/>
        {/*Para incluir las rutas que no exiten con una pagina 404 debemos poner en el path
        un "*" y ademas debe ser la ultima de todas las rutas. */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}
