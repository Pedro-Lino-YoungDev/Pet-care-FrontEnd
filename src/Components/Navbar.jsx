import Nav from '../Style/Navbar.module.css'
import LogoStyle from '../Style/Logo.module.css'
import Links from './Link'
import {Link, useLocation} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'

function Navbar(){

    const validador = useLocation();    
     
     const verificar = (e) =>{

        if (sessionStorage.getItem("token") != null) {
 
             const DataAtual = new Date();
             const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);
 
             const token_jwt = sessionStorage.getItem("token");
             const TokenDecodificado = jwtDecode(token_jwt);
 
             if (TokenDecodificado.exp > HorarioTokenFormatado) {
                 return "com token válido"
             }
             else{
                 return "sem token válido"
             }
             
         }
         else{
             return "sem token válido"
         }
     }
    return(
        <nav className= {Nav.Nav}>
            <div className={Nav.NavLogo}>
                <Link to="/home">
                    <img className={LogoStyle.PetCare} src="/Imagens/Logo.png" alt="Logo Pet Care" />
                </Link>
            </div>


            <div className={Nav.NavItem}>

                {verificar(validador.pathname) == "com token válido" &&(
                   <Links nome = "Cadastrar" url = "/cadastro"/>
                )
                }
                {verificar(validador.pathname) == "sem token válido" &&(
                    <Links nome = "Registrar-se" url = "/registro"/>  
                )
                }


            </div>
            <div className={Nav.NavItem}>


            {verificar(validador.pathname) == "com token válido" &&(
                <Links nome = "Ver Denúncias" url = "/listagem"/>
                )
            }

            {verificar(validador.pathname) == "sem token válido" &&(
                    <Links nome = "Entrar" url = "/login"/>  
                )
            }

            </div>
            <div className={Nav.NavPerfil}>
                <Link className={Nav.NavIMG} to="/usuario"></Link>
            </div>
                
        </nav>
)
}

export default Navbar