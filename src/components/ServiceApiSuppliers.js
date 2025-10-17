import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';

export default class ServiceApiSuppliers extends Component {
    url = Global.urlNorthwind;
    idSupplier = React.createRef();
    state = {
        suppliers: [],
        elsupplier: null
    }

    cargarSuppliers = () => {
        var request = "Suppliers"
        axios.get(this.url + request).then(response => {
            this.setState({
                suppliers: response.data.value
            })
        })
    }

    mostratDatosSupplier = (event) => {
        event.preventDefault();
        var request = "Suppliers";
        var id = parseInt(this.idSupplier.current.value);
        axios.get(this.url + request).then(response => {
            for (var supplier of response.data.value) {
                if (supplier.SupplierID == id) {
                    this.setState({
                        elsupplier: supplier
                    })
                }
            }
        })
    }

    componentDidMount = () => {
        this.cargarSuppliers();
    }

    render() {
        return (
            <div>
                <h1>Service Api Suppliers</h1>
                <form onSubmit={this.mostratDatosSupplier}>
                    <label>Buscar ID: </label>
                    <input type="text" ref={this.idSupplier} />
                <button>Mostrar datos supplier</button>
                </form>
                <hr />
                    {
                        this.state.elsupplier != null &&
                        <div>
                            <h2>{this.state.elsupplier.ContactName}</h2>
                            <p>{this.state.elsupplier.CompanyName}</p>
                            <p>{this.state.elsupplier.City}</p>
                            <p>{this.state.elsupplier.Country}</p>
                            <p>{this.state.elsupplier.Phone}</p>
                        </div>
                    }
                <hr />
                <ul>
                    {
                        this.state.suppliers.map((objeto, index) => {
                            return (<li key={index}>ID supplier: {objeto.SupplierID} -- Nombre: {objeto.ContactName}</li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}
