import Style from '../Style/User.module.css'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


function users () { 

    if (sessionStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = sessionStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const [usuario,setUsuario] = useState();

            const token ={
                "token" : token_jwt
            }

            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/usuario/"+TokenDecodificado.id,token)
                .then((res) => setUsuario(res.data.user))
                .catch()
            },[]);


            return( 
                <div >
                    {usuario != null &&( 
                        <div className={Style.ContainerMinimal}>
                            <div className={Style.Container}>
                            <div className={Style.ContainerIMG}>
                            </div>
                            <div >
                                <h4>
                                    Nome do Usuario:
                                </h4>
                                <p>
                                    {usuario.name}
                                </p>
                                <h4>
                                    E-mail do Usuario:
                                </h4>
                                <p>
                                    {usuario.email}
                                </p>
                            </div>
                            </div>
                            <Link className={Style.Btn} to ="/modificarcadastrodousuario"  state={{from: usuario}}>
                                Modificar Cadastro
                            </Link>
                            <a href="/home" onClick={ () => {sessionStorage.removeItem("token")}} className={Style.Logout}>
                                Sair
                            </a>
                        </div>  
                    )
                    }
                </div>
            )
        }
        else{
            return <Navigate to="/login" />    
        }
    }
    else{
        return <Navigate to="/login" />    
    }
}

export default users;