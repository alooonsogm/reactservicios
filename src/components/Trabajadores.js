import axios from 'axios';
import React, { Component } from 'react'
import Global from '../Global';

export default class Trabajadores extends Component {
    url = Global.apiTrabajadores;
    state = {
        mensaje: "",
        trabajadores: []
    }

    loadTrabajadores = () => {
        //Recuperamos el array de ids de hospitales por props
        var idHospitales = this.props.idhospitales;
        var url = "";
        for(var id of idHospitales){
            url += "idhospital=" + id + "&"
        }
        //Eliminamos el ultimo caracter del string ya que no queremos el & del final
        url = url.substring(0, url.length - 1);
        this.setState({
            mensaje: url
        })

        var request = "api/Trabajadores/TrabajadoresHospitales?" + url
        axios.get(this.url + request).then(response => {
            this.setState({
                trabajadores: response.data
            })
        });
    }

    componentDidMount = () => {
        this.loadTrabajadores();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idhospitales != this.props.idhospitales){
            this.loadTrabajadores();
        }
    }

  render() {
    return (
      <div>
        <h1 style={{color: "blue"}}>Trabajadores</h1>
        <h2 style={{color: "red"}}>{this.state.mensaje}</h2>
        <table className='table table-primary'>
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Oficio</th>
                    <th>Salario</th>
                    <th>ID hospital</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.trabajadores.map((trabajador, index) => {
                        return(<tr key={index}>
                            <td>{trabajador.apellido}</td>
                            <td>{trabajador.oficio}</td>
                            <td>{trabajador.salario}</td>
                            <td>{trabajador.idHospital}</td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
