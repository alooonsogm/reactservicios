import React, { Component } from 'react'
import Trabajadores from './Trabajadores'
import axios from 'axios'
import Global from '../Global'

export default class HospitalesMultiples extends Component {
    selectHospital = React.createRef();
    cajaIncremento = React.createRef();
    urlHospitales = Global.apiHospitales;
    state = {
        hospitales: [],
        hospitalesSeleccionados: []
    }

    loadHospitales = () => {
        var request = "api/Hospitales";
        axios.get(this.urlHospitales + request).then(response => {
            console.log("Cargando hospitales");
            this.setState({
                hospitales: response.data
            })
        })
    }

    getHospitalesSeleccionados = (event) => {
        event.preventDefault();
        var aux = [];
        var options = this.selectHospital.current.options;
        for (var option of options) {
            if (option.selected == true) {
                aux.push(option.value);
            }
        }
        this.setState({
            hospitalesSeleccionados: aux
        })
    }

    incrementarSalario = (event) => {
        event.preventDefault();

        var incremento = parseInt(this.cajaIncremento.current.value);
        var url = "?incremento=" + incremento;

        var options = this.selectHospital.current.options;
        for (var option of options) {
            if (option.selected == true) {
                url += "&idhospital=" + option.value;
            }
        }

        var request = "api/Trabajadores/UpdateSalarioTrabajadoresHospitales" + url
        axios.put(this.urlHospitales + request).then(response => {
            console.log("Incrementado el salario");
            var aux = [];
            var options = this.selectHospital.current.options;
            for (var option of options) {
                if (option.selected == true) {
                    aux.push(option.value);
                }
            }
            this.setState({
                hospitalesSeleccionados: aux
            })
        })
    }

    componentDidMount = () => {
        this.loadHospitales();
    }

    render() {
        return (
            <div>
                <h1>Hospitales Multiples</h1>
                <form>
                    <label>Seleccione multiples hospitales: </label>
                    <select multiple ref={this.selectHospital} className='form-control' size="8">
                        {
                            this.state.hospitales.map((hospital, index) => {
                                return (<option key={index} value={hospital.idHospital}>{hospital.nombre}</option>)
                            })
                        }
                    </select>
                    {/*Aqui no se pone lambda () => ya que no esta dentro de un .map el boton con el onClick, si estuviese dentro si se pondria */}
                    <button onClick={this.getHospitalesSeleccionados} className='btn btn-warning'>Mostrar trabajadores</button>
                    <br />
                    <label>Introduce el incremento: </label>
                    <input type='text' ref={this.cajaIncremento} className='form-control' />
                    <button className='btn btn-danger' onClick={this.incrementarSalario}>Incrementar</button>
                </form>
                {
                    this.state.hospitalesSeleccionados.length != 0 &&
                    <Trabajadores idhospitales={this.state.hospitalesSeleccionados} />
                }
            </div>
        )
    }
}
