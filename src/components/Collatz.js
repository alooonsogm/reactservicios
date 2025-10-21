import React, { Component } from 'react'

export default class Collatz extends Component {
    state = {
        tablaCollatz: []
    }

    generarCollatz = () => {
        var aux = [];
        var numero = this.props.numero;

        while(numero != 1){
            if(numero % 2 == 0){
                numero = numero / 2;
            } else {
                numero = (numero * 3) + 1;
            }
            aux.push(numero);
        }

        this.setState({
            tablaCollatz: aux
        })
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.numero != this.props.numero){
            this.generarCollatz();
        }
    }

    componentDidMount = () => {
        this.generarCollatz();
    }

  render() {
    return (
      <div>
        <h1>Collatz</h1>
        <h3 style={{color: "fuchsia"}}>{this.props.numero}</h3>
        <ul>
            {
                this.state.tablaCollatz.map((num, index) => {
                    return(<li key={index}>{num}</li>)
                })
            }
        </ul>
      </div>
    )
  }
}
