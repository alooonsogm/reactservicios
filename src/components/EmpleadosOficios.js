import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class EmpleadosOficios extends Component {
    urlEmpleados = Global.urlEmpleados;
    selectOficio = React.createRef();

    cargarOficios = () => {
        var request = "api/Empleados";
        axios.get(this.urlEmpleados + request).then(response => {
            console.log("Leyendo oficios");
            var auxOficios = [];
            for(var empleado of response.data){
                var comodin = true;
                for(var oficioAyuda of auxOficios){
                    if(oficioAyuda == empleado.oficio){
                        comodin = false;
                    }
                }
                if(comodin == true){
                    auxOficios.push(empleado.oficio);
                }
            }
            this.setState({
                oficios: auxOficios
            })
        })
    }

    cargarEmpleados = (event) => {
        event.preventDefault();
        var oficio = this.selectOficio.current.value;
        var request = "api/Empleados/EmpleadosOficio/" + oficio;
        axios.get(this.urlEmpleados + request).then(response => {
            console.log("Leyendo empleados");
            this.setState({
                empleados: response.data
            })
        })
    }

    state = {
        oficios: [],
        empleados: []
    }

    componentDidMount = () => {
        this.cargarOficios();
    }

  render() {
    return (
      <div>
        <h1>Empleados oficio</h1>
        <form>
            <label>Selecciona el oficio: </label>
            <select ref={this.selectOficio}>
                {
                    this.state.oficios.map((oficio, index) => {
                    return(<option value={oficio} key={index}>{oficio}</option>)
                    })
                }
            </select>
            <button onClick={this.cargarEmpleados}>Buscar empleados</button>
        </form>
        <table border={1}>
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Oficio</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.empleados.map((empleado, index) => {
                    return(<tr key={index}>
                        <td>{empleado.apellido}</td>
                        <td>{empleado.oficio}</td>
                        <td>{empleado.salario}</td>
                    </tr>)
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
