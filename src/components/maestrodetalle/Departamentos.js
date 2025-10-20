import React, { Component } from 'react'
import Empleados from './Empleados'
import Global from '../../Global';
import axios from 'axios';

export default class Departamentos extends Component {
    urlDepartamento = Global.urlDepart;
    selectDepartamento = React.createRef();

    state = {
        departamentos: [],
        idDepartamento: 0
    }

    loadDepart = () => {
        var request = "/webresources/departamentos";
        axios.get(this.urlDepartamento + request).then(response => {
            console.log("Leyendo departamentos.");
            this.setState({
                departamentos: response.data
            })
        })
    }

    //Se ejecuta solo una vez, cuando el component es creado por el padre
    componentDidMount = () => {
        this.loadDepart();
    }

    buscarEmpleados = (event) => {
        event.preventDefault();
        var idDepartamento = this.selectDepartamento.current.value;
        this.setState({
            idDepartamento: idDepartamento
        })
    }

  render() {
    return (
      <div>
        <h1>Departamentos Component</h1>
        <form>
            <select ref={this.selectDepartamento}>
                {
                    this.state.departamentos.map((depart, index) => {
                        return(<option key={index} value={depart.numero}>{depart.nombre}</option>)
                    })
                }
            </select>
            <button onClick={this.buscarEmpleados}>Buscar empleados</button>
        </form>
        {
            this.state.idDepartamento != 0 &&
            <Empleados iddepartamento={this.state.idDepartamento}/>
        }
      </div>
    )
  }
}
