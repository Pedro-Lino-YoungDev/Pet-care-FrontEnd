import axios from 'axios'
import { useState } from 'react'
import Style from '../Style/Registro.module.css'
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Link from '../Components/Link'
import Botao from '../Components/Botao'


function Registro(){

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
        
        const [nome, setNome] = useState();
        const [email, setEmail] = useState();
        const [senha, setSenha] = useState();
        const [senha_verificada, setSenha_verificada] = useState();

        const [redirecionar, setRedirecionar] = useState();
        const [erro_imput, setErro_imput] = useState();
        const [erro_senha, setErro_senha] = useState();

        const [resposta, setRespost] = useState();
        const [error, setError] = useState();

        const verificar_senha = (e) => {

            if(senha == '' || senha == null  || e == null || e == '' || nome == '' || nome == null || email == null || email == ''){
                return 1
            }
            else if (senha != e ) {
                return 2
            }
            else if(senha == e){
                return 3
            }
        }
        const verificar_email = (e) => {
            
        }

        const user ={
            "name": nome,
            "email": email,
            "password": senha_verificada
        }

        const post = () => {
            axios.post('https://backend-petcare.herokuapp.com/usuario',user)
            .then((res) => setRespost(res))
            .catch((res) => setError(res))   
            .then(() => setRedirecionar(true))
        }

        return(
            <div className={Style.ContainerMinimal}>
                <div className={Style.Container}>
                <form action="Registro" method="Post">
                    <div className={Style.ContainerItem1}>
                        <label htmlFor="Email">Email:</label>
                        <br />
                        <input className={Style.Input} type="Email" onChange={(e) =>{setEmail(e.target.value) , setErro_imput(false)}}/>
                    </div>
                    <div className={Style.ContainerItem}>
                        <label htmlFor="Name">Nome do Usurio :</label>
                        <br />
                        <input className={Style.Input} type="Name" onChange={(e) =>{setNome(e.target.value) , setErro_imput(false)}}/>
                    </div>
                    <div className={Style.ContainerItem}>
                        <label htmlFor="Password">Senha:</label>
                        <br />
                        <input className={Style.Input} type="Password" onChange={(e) =>{setSenha(e.target.value) , setErro_imput(false) , setErro_senha(false)}}/>
                    </div>
                    <div className={Style.ContainerItem}>
                        <label htmlFor="PasswordConfirm">Confirmar Senha:</label>
                        <input className={Style.Input} type="Password" onChange={(e) =>{setSenha_verificada(e.target.value) , setErro_imput(false) , setErro_senha(false)}}/>
                        <h4>
                            Já possui conta? Clique para
                            <Link tipo="interno" nome="Entrar" url="/Login"/>
                        </h4>
                    </div>

                </form>
                {verificar_senha(senha_verificada) == 1 && erro_imput == true &&(
                    <div>
                    <h4 className={Style.error}>
                        Oops! Preencha todos os campos para se cadastrar com sucesso.
                    </h4>
                    <br />
                    </div>
                )
                }
                {verificar_senha(senha_verificada) == 1 &&(
                    <Botao tipo="interno" nome="Cadastrar" clique={() => {setErro_imput(true)}}></Botao>
                )
                }
                {verificar_senha(senha_verificada) == 2&& erro_senha == true &&(
                    <div>
                    <h4 className={Style.error}>
                        Oops as 2 senhas estão diferentes*
                    </h4>
                    <br />
                    </div>
                )
                }
                {verificar_senha(senha_verificada) == 2 &&(
                    <Botao tipo="interno" nome="Cadastrar" clique={() => {setErro_senha(true)}}></Botao>
                )
                } 
                {verificar_senha(senha_verificada) == 3&&(
                    <Botao tipo="interno" nome="Cadastrar" clique={post}></Botao>
                    )
                }
                {redirecionar == true &&(
                    <Navigate to="/login"/>
                )
                }
                </div>
            </div>
        )
    }
    else{
        return <Navigate to="/home"/>
    }
}

export default Registro