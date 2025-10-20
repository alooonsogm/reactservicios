import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'

export default class Empleados extends Component {
    url = Global.urlEmpleados;

    state = {
        empleados: [],
        texto: ""
    }

    componentDidUpdate = (oldProps) => {
        //Dibujamos las nuevas y las antiguas.
        console.log("Current: " + this.props.iddepartamento);
        console.log("OLD: " + oldProps.iddepartamento);
        //Solamente actualizamos state si props ha cambiado.
        if(oldProps.iddepartamento != this.props.iddepartamento){
            this.setState({
                texto: "Update: " + this.props.iddepartamento
            })
            this.loadEmpleados();
        }
    }

    loadEmpleados = () => {
        var idDepart = this.props.iddepartamento;
        var request = "api/Empleados/EmpleadosDepartamento/" + idDepart;
        axios.get(this.url + request).then(response => {
            console.log("Leyendo empleados");
            this.setState({
                empleados: response.data
            })
        })
    }

    //Aqui no vale usar componentDidMount ya que queremos que se ejecute
    //mas de una vez. Por eso en estos casos se usa componentDidUpdate()
    //Este metodo se ejecuta cuando ha cambiado algo del component
    //En este caso, sus props.
    componentDidMount = () => {
        console.log("Cargando component.")
        this.loadEmpleados();
    }

  render() {
    return (
      <div>
        <h1 style={{color: "blue"}}>
            Empleados Component {this.props.iddepartamento}
        </h1>
        <h3>{this.state.texto}</h3>
        <ul>
            {
                this.state.empleados.map((empleado, index) => {
                    return(<li key={index}>
                        {empleado.apellido} - {empleado.oficio} - {empleado.departamento}
                    </li>)
                })
            }
        </ul>
      </div>
    )
  }
}
