import React, { Component } from 'react'

export default class TablaMultiplicar extends Component {
    state = {
        tabla: []
    }

    generarTablaMultiplicar = () => {
        var aux = [];
        var numero = this.props.numero;

        for(var x=1; x<=10; x++){
            var resultado = numero * x;
            aux.push(resultado);
        }

        this.setState({
            tabla: aux
        })
    }

    componentDidMount = () => {
        this.generarTablaMultiplicar();
    }

  render() {
    return (
      <div>
        <h1>Tabla multiplicar Rutas</h1>
        <h3 style={{color: "fuchsia"}}>{this.props.numero}</h3>
        <ul>
            {
                this.state.tabla.map((num, index) => {
                    return(<li key={index}>{num}</li>)
                })
            }
        </ul>
      </div>
    )
  }
}
