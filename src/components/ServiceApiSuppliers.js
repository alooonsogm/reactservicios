import React, { Component } from 'react'
import axios from 'axios'

export default class ServiceApiSuppliers extends Component {
    url = "https://services.odata.org/V4/Northwind/Northwind.svc/Suppliers";
    idSupplier = React.createRef();
    state = {
        suppliers: [],
        NombreSupplier: "",
        NombreEmpresa: "",
        ciudad: "",
        pais: "",
        telefono: ""
    }

    cargarSuppliers = () => {
        axios.get(this.url).then(response => {
            this.setState({
                suppliers: response.data.value
            })
        })
    }

    mostratDatosSupplier = (event) => {
        event.preventDefault();
        var id = parseInt(this.idSupplier.current.value);
        var validar = false;
        axios.get(this.url).then(response => {
            for (var supplier of response.data.value) {
                if (supplier.SupplierID == id) {
                    this.setState({
                        NombreSupplier: supplier.ContactName,
                        NombreEmpresa: "Empresa: " + supplier.CompanyName,
                        ciudad: "Ciudad: " + supplier.City,
                        pais: "Pais: " + supplier.Country,
                        telefono: "Telefono: " + supplier.Phone
                    })
                    validar = true;
                }
            }
            if (validar == false) {
                this.setState({
                    NombreSupplier: "ID no encontrado",
                    NombreEmpresa: "",
                    ciudad: "",
                    pais: "",
                    telefono: ""
                })
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
                <input type="text" ref={this.idSupplier} />
                <button onClick={this.mostratDatosSupplier}>Mostrar datos supplier</button>
                <hr />
                <div>
                    <h2>{this.state.NombreSupplier}</h2>
                    <p>{this.state.NombreEmpresa}</p>
                    <p>{this.state.ciudad}</p>
                    <p>{this.state.pais}</p>
                    <p>{this.state.telefono}</p>
                </div>
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
