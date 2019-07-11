import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navegacion.css';


class Navegacion extends Component {

     iniciarSesion = () => {
          this.props.auth.login();
     }

     cerrarSesion = () => {
          this.props.auth.logout();
     }

     render(){
          const { isAuthenticated } = this.props.auth;

          let resultado;

          if( isAuthenticated() ) {
               resultado =  <a onClick={this.cerrarSesion}>Cerrar sesion</a>
          } else {
               resultado =  <a onClick={this.iniciarSesion}>Iniciar sesion</a>
          }
          return(
               <nav className="navegacion">
                    <NavLink to={'/nosotros'} activeClassName="activo">Nosotros</NavLink>
                    <NavLink to={'/productos'} activeClassName="activo">Productos</NavLink>
                    <NavLink to={'/contacto'} activeClassName="activo">Contacto</NavLink>
                    { resultado }
               </nav>
          )
     }
}
 
export default Navegacion;