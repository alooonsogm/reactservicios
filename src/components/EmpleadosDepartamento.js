import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class EmpleadosDepartamento extends Component {
    urlEmpleados = Global.urlEmpleados;
    urlDepart = Global.urlDepart;
    cajaDepart = React.createRef();

    bucarEmpleados = (event) => {
        event.preventDefault();
        var depart = this.cajaDepart.current.value;
        var request = "api/Empleados/EmpleadosDepartamento/" + depart;
        axios.get(this.urlEmpleados + request).then(response => {
            console.log("Leyendo empleados");
            this.setState({
                empleados: response.data
            })
        });
    }

    cargarDepart = () => {
        var request = "webresources/departamentos";
        axios.get(this.urlDepart + request).then(response => {
            console.log("Leyendo depart");
            this.setState({
                depart: response.data
            })
        })
    }

    state = {
        empleados: [],
        depart: []
    }

    componentDidMount = () => {
        this.cargarDepart();
    }

  render() {
    return (
      <div>
        <h1>Empleados departamento</h1>
        <form>
            <label>Selecciona el departamento: </label>
            <select ref={this.cajaDepart}>
                {
                    this.state.depart.map((departamento, index) => {
                    return(<option value={departamento.numero} key={index}>{departamento.nombre}</option>)
                    })
                }
            </select>
            <button onClick={this.bucarEmpleados}>Buscar empleados</button>
        </form>
        <ul>
            {
                this.state.empleados.map((empleado, index) => {
                    return(<li key={index}>{empleado.apellido}</li>)
                })
            }
        </ul>
      </div>
    )
  }
}
