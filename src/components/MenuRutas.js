import React, { Component } from 'react'

export default class MenuRutas extends Component {
  render() {
    return (
      <div>
        <ul>
            <li>
                <a href='/'>Home</a>
            </li>
            <li>
                <a href='/tabla/21'>Tabla multiplicar 21</a>
            </li>
            <li>
                <a href='/tabla/7'>Tabla multiplicar 7</a>
            </li>
            <li>
                <a href='/tabla/10'>Tabla multiplicar 10</a>
            </li>
            <li>
                <a href='/collatz/100'>Collatz 100</a>
            </li>
            <li>
                <a href='/collatz/56'>Collatz 56</a>
            </li>
        </ul>
      </div>
    )
  }
}
