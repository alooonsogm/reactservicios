import React, { Component } from 'react'
import axios from 'axios'

export default class ServicioApiCustomers extends Component {
    state = {
        customers: []
    }

    url = "https://services.odata.org/V4/Northwind/Northwind.svc/Customers";
    //Creamos un metodo para captar los clientes
    loadCustomrs = () => {
        console.log("Antes de servicio.");
        axios.get(this.url).then(response => {
            console.log("Leyendo");
            //La informacion vienen en el response.data
            this.setState({
                customers: response.data.value
            })
        });
        console.log("Despues de servicio.");
    }

    // Se ejecuta ANTES de dibujar el component
    componentDidMount = () => {
        console.log("creando component");
        this.loadCustomrs();
    }

  render() {
    return (
      <div>
        <h1>Servicio Api Customers</h1>
        <button>
            Load Customers
        </button>
        {
            this.state.customers.map((cliente, index) => {
                return(<h3 style={{color: "blue"}} key={index}>{cliente.ContactName}</h3>); 
            })
        }
      </div>
    )
  }
}
