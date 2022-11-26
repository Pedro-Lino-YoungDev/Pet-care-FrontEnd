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
        if(localStorage.getItem("token") != null){
            const token_jwt = localStorage.getItem("token");
            const TokenDecodificado = jwtDecode(token_jwt);
            return TokenDecodificado.exp
        }
    }
    if (localStorage.getItem("token") == null || VerificarToken() < HorarioTokenFormatado) {
        
        const [nome, setNome] = useState();
        const [email, setEmail] = useState();
        const [senha, setSenha] = useState();
        const [senha_verificada, setSenha_verificada] = useState();

        const [validador,setValidador] = useState(false);
        const [erro_imput, setErro_imput] = useState();
        const [erro_senha, setErro_senha] = useState();

        const [resposta, setResposta] = useState();
        const [error, setError] = useState();
        const [carregamento, setCarregamento] = useState(false);

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
        const verificar_email = () => {
            
        }

        const alterar_dados = (e) =>{
            if(e == "sem foto"){
                const user =
                {
                    "name": nome,
                    "email": email,
                    "password": senha_verificada
                }
                return user
            }
            else if(e == "com foto"){
                const user =
                {
                    "name": nome,
                    "email": email,
                    "password": senha_verificada,
                    "picture": "picture"
                }
                return user
            }
        }

        const post = (e) => {
            axios.post('https://backend-petcare.herokuapp.com/usuario',alterar_dados("sem foto"))
            .then((res) => setResposta(res.data.message))
            .catch((res) => setError(res.response.data.message))   
        }

        return(
            <div className={Style.ContainerMinimal}>
                <div className={Style.Container}>
                    <form action="Registro" method="Post">
                        <div className={Style.ContainerItem1}>
                            <label htmlFor="Email">Email:</label>
                            <br />
                            <input className={Style.Input} type="Email" onChange={(e) =>{setEmail(e.target.value) , setErro_imput(false) , setCarregamento(false) , setError(null)}}/>
                        </div>
                        <div className={Style.ContainerItem}>
                            <label htmlFor="Name">Nome do Usurio :</label>
                            <br />
                            <input className={Style.Input} type="Name" onChange={(e) =>{setNome(e.target.value) , setErro_imput(false) , setCarregamento(false) , setError(null)}}/>
                        </div>
                        <div className={Style.ContainerItem}>
                            <label htmlFor="Password">Senha:</label>
                            <br />
                            <input className={Style.Input} type="Password" onChange={(e) =>{setSenha(e.target.value) , setErro_imput(false) , setErro_senha(false) , setCarregamento(false) , setError(null)}}/>
                        </div>
                        <div className={Style.ContainerItem}>
                            <label htmlFor="PasswordConfirm">Confirmar Senha:</label>
                            <input className={Style.Input} type="Password" onChange={(e) =>{setSenha_verificada(e.target.value) , setErro_imput(false) , setErro_senha(false) , setCarregamento(false) , setError(null)}}/>
                        </div>
                    </form>
                    <div>
                        <h4>
                            Já possui conta? Clique para
                            <Link tipo="interno" nome="Entrar" url="/Login"/>
                        </h4>
                    </div>
                    {resposta == null && error == null && carregamento == true &&(
                        <div>
                            <div className={Style.Carregamento}></div>
                        </div>
                    )
                    }
                    {verificar_senha(senha_verificada) == 1 && erro_imput == true &&(
                        <div>
                            <h4 className={Style.error}>
                                Oops! Preencha todos os campos para se cadastrar com sucesso.
                            </h4>
                        </div>
                    )
                    }
                    {verificar_senha(senha_verificada) == 2&& erro_senha == true &&(
                        <div>
                            <h4 className={Style.error}>
                                Oops as 2 senhas estão diferentes*
                            </h4>
                        </div>
                    )
                    }
                    {error == "user already exists" &&(
                        <div>
                            <h4 className={Style.error}>
                                Oops! esse Email já possui uma conta vinculada.
                            </h4>
                        </div>
                    )
                    }
                    {verificar_senha(senha_verificada) == 1 &&(
                        <div className={Style.DivBotao}>
                            <Botao tipo="interno" nome="Cadastrar" clique={() => {setErro_imput(true)}}></Botao>
                        </div>
                    )
                    }

                    {verificar_senha(senha_verificada) == 2 &&(
                        <div className={Style.DivBotao}>
                            <Botao tipo="interno" nome="Cadastrar" clique={() => {setErro_senha(true)}}></Botao>
                        </div>
                    )
                    } 
                    {verificar_senha(senha_verificada) == 3&&(
                        <div className={Style.DivBotao}>
                            <Botao tipo="interno" nome="Cadastrar" clique={(e) => {post(), setCarregamento(true)}}></Botao>
                        </div>
                    )
                    }
                    {resposta == "user record created" &&(
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