import React, { Component, Fragment } from 'react';
import Producto from '../Producto/Producto';
import Buscador from '../Buscador/Buscador';
import axios from 'axios';
import './Productos.css';

class Productos extends Component {
     state = {
          productos : [],
          terminoBusqueda : ''
     }

     componentWillMount() {
          this.apiCall();
     }

     busquedaProducto = (busqueda) => {
          if(busqueda.length > 3) {

          //Obtener los productos del state
          let productos = [...this.state.productos];
          //filtrar
          let resultado;

          resultado = productos.filter(producto => (
               producto.nombre.toLowerCase().indexOf( busqueda.toLowerCase()  ) !== -1
          ))


          //enviar al state los productos filtrados y busqueda


            this.setState({
              terminoBusqueda : busqueda,
              productos: resultado
            })
          } else {
             this.setState({
               terminoBusqueda: ''
             }, () => {
                this.apiCall()  
             })
          }
        }

     apiCall = () => {
          const { getAccessToken } = this.props.auth;
          const headers = {'Authorization': `Bearer ${getAccessToken()}`};

          const url = 'http://localhost:5000/productos';

          return axios.get(url, { headers })
               .then(response => this.setState({productos: response.data}))

     }

     login = () => {
          this.props.auth.login();
     }

     render() { 
          const { isAuthenticated } = this.props.auth;
          return ( 
               <div className="productos">

                    {
                         isAuthenticated() && (
                              <Fragment>
                                   <h2>Nuestros Productos</h2>
                                   <Buscador
                                        busqueda={this.busquedaProducto}
                                   />
                                   <ul className="lista-productos">
                                   {Object.keys(this.state.productos).map(producto => (
                                        <Producto
                                             informacion={this.state.productos[producto]}
                                             key={producto}
                                        />
                                   )) }
                                   </ul>
                              </Fragment>
                         )
                    }

                    {
                         !isAuthenticated() && (
                              <div className='contenedor-boton'> 
                                   <p>Para ver el contenido debes estar logeado:</p>
                                   <a className='boton' onClick={this.login}>Iniciar sesion</a>
                              </div>
                         )
                    }
               </div>
           )
     }
}
 
export default Productos;