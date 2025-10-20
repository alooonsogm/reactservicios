import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'

export default class Alumnos extends Component {
    urlCursos = Global.urlAlumnosCursos;

    state = {
        alumnos: []
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idcurso != this.props.idcurso){
            console.log("Cambiando...");
            this.loadAlumnos();
        }
    }

    componentDidMount = () => {
        console.log("Cargando component.")
        this.loadAlumnos();
    }

    loadAlumnos = () => {
        var idCurso = this.props.idcurso;
        var request = "api/Alumnos/FiltrarCurso/" + idCurso;
        axios.get(this.urlCursos + request).then(response => {
            console.log("Leyendo cursos");
            this.setState({
                alumnos: response.data
            })
        })
    }

  render() {
    return (
      <div>
        <h1>Alumnos Component {this.props.idcurso}</h1>
        <ul>
            {
                this.state.alumnos.map((alumno, index) => {
                    return(<li key={index}>
                        {alumno.nombre} {alumno.apellidos}<button onClick={ (event) => {
                            event.preventDefault();
                            this.props.detallesalumno(alumno)
                        } }>Detalles</button>
                    </li>)
                })
            }
        </ul>
      </div>
    )
  }
}
