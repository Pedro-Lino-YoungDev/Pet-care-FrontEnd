import Nav from '../Style/Navbar.module.css'
import LogoStyle from '../Style/Logo.module.css'
import Links from './Link'
import {Link, useLocation} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'

function Navbar(){

    const validador = useLocation();    
     
     const verificar = (e) =>{

        if (localStorage.getItem("token") != null) {
 
             const DataAtual = new Date();
             const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);
 
             const token_jwt = localStorage.getItem("token");
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
                    <img className={LogoStyle.PetCare} src="/Imagens/logo-v1(1).png" alt="Logo Pet Care" />
                </Link>
            </div>


            <div className={Nav.NavItem}>

                {verificar(validador.pathname) == "com token válido" &&(
                   <Links tipo="navegação" nome = "Cadastrar" url = "/cadastro"/>
                )
                }
                {verificar(validador.pathname) == "sem token válido" &&(
                    <Links tipo="navegação" nome = "Registrar-se" url = "/registro"/>  
                )
                }


            </div>
            <div className={Nav.NavItem}>


            {verificar(validador.pathname) == "com token válido" &&(
                <Links tipo="navegação" nome = "Ver Denúncias" url = "/listagem"/>
                )
            }

            {verificar(validador.pathname) == "sem token válido" &&(
                    <Links tipo="navegação" nome = "Entrar" url = "/login"/>  
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