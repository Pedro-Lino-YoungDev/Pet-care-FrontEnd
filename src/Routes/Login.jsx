import Style from '../Style/Login.module.css'
import Link from "../Components/Link"
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'


function Login(){

    const DataAtual = new Date();
    const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);
    
    const VerificarToken = () => {
        if(sessionStorage.getItem("token") != null){
            const token_jwt = sessionStorage.getItem("token");
            const TokenDecodificado = jwtDecode(token_jwt);
            return TokenDecodificado.exp
        }
    }
    if (sessionStorage.getItem("token") == null || VerificarToken() < HorarioTokenFormatado) {
        const [email, setEmail] = useState();
        const [senha, setSenha] = useState();
        const [finnaly, setFinnaly] = useState();
        const [erro, setErro] = useState();

        const [resposta, setRespost] = useState();
        const [error, setError] = useState();

        const user ={
            "email" : email,
            "password" : senha
        }
    
        const post = () => {
            axios.post("https://backend-petcare.herokuapp.com/login",user)
            .then((res) => setRespost(res.data))
            .catch((res) => setError(res.response.data))
            .then(() => setFinnaly(true))
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
                <form className={Style.formulario} action="Login" method="Post">

                    <div className={Style.ContainerItem1}>
                        <label htmlFor="Email">Email:</label>
                        <br />
                        <input className={Style.Input} type="Email" onChange={(e) =>{setEmail(e.target.value) , setErro(null) , setError(null)}}/>
                    </div>

                    <div className={Style.ContainerItem}>
                        <label htmlFor="Email">Senha:</label>
                        <br />
                        <input className={Style.Input} type="Password" onChange={(e) =>{setSenha(e.target.value) , setErro(null) , setError(null)}}/>
                    </div>
                    <h4>
                        Não possui conta? Clique para se
                        <Link tipo="interno" nome="Registrar" url="/Registro"/>
                    </h4>
                </form>

                {erro == true && Verificar_campos(email, senha) == false &&(
                    <div className={Style.DivErro}>
                    <h4  className={Style.erro}>
                        Digite todas as informações para prosseguir*
                    </h4>
                    </div>
                )
                }
                { finnaly == true && error != null && error.message == "login attempt failed" &&
                    <div className={Style.DivErro}>
                    <h4  className={Style.erro}>
                        seu email ou senha estão incorretos tente novamente*
                    </h4>
                    </div>
                }

                {Verificar_campos(email,senha) == true &&(
                    <Botao tipo="interno" nome="entrar" clique={() => {post()}}></Botao>
                )
                }
                {Verificar_campos(email,senha) == false &&(
                    <Botao tipo="interno" nome="entrar" clique={() => {setErro(true)}}></Botao>
                )
                }



                { finnaly == true  && resposta != null && resposta.message == "successfully logged in" &&(
                    sessionStorage.setItem("token",resposta.token),
                    sessionStorage.setItem("token",resposta.token),
                    <Navigate to="/home"/>
                )
                }

            </div>
        )
    }
    else{
        return <Navigate to="/home"/>
    }
}

export default Login