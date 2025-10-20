import React, { Component } from 'react'
import Alumnos from './Alumnos'
import Global from '../../Global'
import axios from 'axios'

export default class Cursos extends Component {
    urlCursos = Global.urlAlumnosCursos;
    selectCurso = React.createRef();

    state = {
        cursos: [],
        idCurso: 0,
        elAlumno: null
    }

    cargarCursos = () => {
        var request = "api/Alumnos/Cursos";
        axios.get(this.urlCursos + request).then(response => {
            console.log("Leyendo cursos");
            this.setState({
                cursos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarCursos();
    }

    buscarAlumnos = (event) => {
        event.preventDefault();
        var idCurso = this.selectCurso.current.value;
        this.setState({
            idCurso: idCurso
        })
    }

    detallesAlumno = (alumno) => {
        this.setState({
            elAlumno: alumno
        })
    }

    render() {
        return (
            <div>
                <h1>Cursos Component</h1>
                <form>
                    <select ref={this.selectCurso}>
                        {
                            this.state.cursos.map((curso, index) => {
                                return (<option key={index} value={curso}>{curso}</option>)
                            })
                        }
                    </select>
                    <button onClick={this.buscarAlumnos}>Buscar alumnos</button>
                </form>
                {
                    this.state.elAlumno != null &&
                    <div>
                        <h1>{this.state.elAlumno.nombre} {this.state.elAlumno.apellidos}</h1>
                        <h3>Id curso: {this.state.elAlumno.idCurso}</h3>
                        <h3>Id alumno: {this.state.elAlumno.idAlumno}</h3>
                        <img src={this.state.elAlumno.imagen} alt="foto" />
                    </div>
                }
                {
                    this.state.idCurso != 0 &&
                    <Alumnos idcurso={this.state.idCurso} detallesalumno={this.detallesAlumno} />
                }
            </div>
        )
    }
}
