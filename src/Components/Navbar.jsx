import Style from '../Style/Navbar.module.css'
import Links from './Link'
import {Link, useLocation, Navigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

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
     const navegar = () =>{
        return <Navigate to="/usuario"/>
     }
    return(
        <nav className= {Style.Nav}>
            <div className={Style.NavLogo}>
                <Link to="/home">
                    <img className={Style.PetCareLogo} src="/Imagens/logo-v1(1).png" alt="Logo Pet Care" />
                </Link>
            </div>


            <div className={Style.NavItem}>

                {verificar(validador.pathname) == "com token válido" &&(
                   <Links tipo="navegação" nome = "Cadastrar" url = "/cadastro"/>
                )
                }
                {verificar(validador.pathname) == "sem token válido" &&(
                    <Links tipo="navegação" nome = "Registrar-se" url = "/registro"/>  
                )
                }
                
            </div>
            <div className={Style.NavItem}>


            {verificar(validador.pathname) == "com token válido" &&(
                <Links tipo="navegação" nome = "Ver Denúncias" url = "/listagem"/>
                )
            }

            {verificar(validador.pathname) == "sem token válido" &&(
                    <Links tipo="navegação" nome = "Entrar" url = "/login"/>  
                )
            }

            </div>
            {localStorage.getItem("foto") != null &&(
                <div className={Style.NavPerfil}>
                    <Links tipo="navegação"nome ={
                    <img onClick={<Navigate to="/usuario"/>} src={localStorage.getItem("foto")} alt="" />
                    } 
                    url = "/usuario"/>
                </div>
            )
            }
            {localStorage.getItem("foto") == null&&(
                <div className={Style.NavPerfil}>
                    <Links tipo="navegação"nome ={
                    <img src="data:image/png;base64,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" alt="" onClick={navegar()}/>}
                    url = "/usuario"/>
                </div>
            )
            }

                
        </nav>
)
}

export default Navbar