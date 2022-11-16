import Style from '../Style/Login.module.css'
import Link from "../Components/LinkInterno"
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [redirecionar, setRedirecionar] = useState();
    const [erro, setErro] = useState();

    const [resposta, setRespost] = useState();
    const [error, setError] = useState();

    const user =

        {
            "email" : email,
            "password" : senha
        }
    
    
    const post = () => {

        axios.post("https://backend-petcare.herokuapp.com/login",user)
        .then((res) => setRespost(res.data))
        .catch((res) => setError(res))
        .then(() => setRedirecionar(true))
    }

    const Verificar_campos = (e,s) => {
        if(e != null && e != '' && s != null && s != ''){
            return true
        }
        else{
            return false
        }
    }

    return(
        <div className={Style.ContainerMinimal}>
            <form action="Login" method="Post">

                <div className={Style.ContainerItem1}>
                <label htmlFor="Email">Email:</label>
                <br />
                <input className={Style.Input} type="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="Email">Senha:</label>
                <br />
                <input className={Style.Input} type="Password" onChange={(e) =>{setSenha(e.target.value)}}/>
                </div>
                <h4>
                    Não possui conta? Clique para se
                    <Link nome="Registrar" url="/Registro"/>
                </h4>
            </form>

            {
                erro == true && Verificar_campos(email, senha) == false &&(
                    <h4  className={Style.error}>
                        Digite todas as informações para prosseguir*
                    </h4>
                )
            }

            {
                Verificar_campos(email,senha) == true &&(
                    <a className={Style.Btn} onClick={() => {post()}}>
                        entrar
                    </a>
                )
            }
                        {
                Verificar_campos(email,senha) == false &&(
                    <a className={Style.Btn} onClick={() => {setErro(true)}}>
                        entrar
                    </a>
                )
            }

            { redirecionar == true &&(
                sessionStorage.setItem("token",resposta.token),
                <Navigate to="/home"/>
            )
            }

        </div>
    )
}

export default Login