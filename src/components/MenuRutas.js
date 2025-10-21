import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MenuRutas extends Component {
  render() {
    return (
      <div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/tabla/21">Tabla multiplicar 21</NavLink>
            </li>
            <li>
                <NavLink to="/tabla/7">Tabla multiplicar 7</NavLink>
            </li>
            <li>
                <NavLink to="/tabla/10">Tabla multiplicar 10</NavLink>
            </li>
            <li>
                <NavLink to="/collatz/100">Collatz 100</NavLink>
            </li>
            <li>
                <NavLink to="/collatz/56">Collatz 56</NavLink>
            </li>
        </ul>
      </div>
    )
  }
}
