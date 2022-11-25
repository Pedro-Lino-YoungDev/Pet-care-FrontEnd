import Style from '../Style/ModificarCadastroDoUsuario.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'



function modificarcadastrodousuario() {



    if (sessionStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = sessionStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const location = useLocation();
            const { from } = location.state;

            const [email,setEmail] = useState(from.email);
            const [nome,setNome] = useState(from.name);
            const [senha,setSenha] = useState("");
            const [novaSenha, setNovaSenha] = useState("");
            const [senhaVerificada, setSenhaVerificada] = useState("");
            const [validador,setValidador] = useState(false);
            const [cancelar,setCancelar] = useState(false);


            const [resposta,setResposta] = useState();
            const [erro,setErro] = useState();


            const [erro_imput, setErro_imput] = useState();
            const [erro_senha, setErro_senha] = useState();
            const [erroNovaSenha, setErroNovaSenha] = useState();


            const verificar_campos = () =>{
                if (nome == "" || nome == null){
                    return 1
                }
                else if(senha == "" || senha == null) {
                    return 2
                }
                else{
                    return 3
                }
            }
            const verificar_senha = (e) => {
                if(novaSenha == '' || novaSenha == null  || e == null || e == ''){
                    return 1
                }
                else if(novaSenha == senha){
                    return 2
                }
                else if (novaSenha == e ) {
                    return 3
                }

            }
            const dados_post = (e) =>{
                if(e == "sem senha nova"){
                    const user = {
                        "name": nome,
                        "email": email,
                        "password": senha,
                        "token" : sessionStorage.getItem("token")
                    }
                    return user;
                }
                else if (e == "com senha nova"){
                    const user = {
                        "name": nome,
                        "email": email,
                        "password": senha,
                        "newPassword": senhaVerificada,
                        "token" : sessionStorage.getItem("token")
                    }
                    return user
                }
            }

            const validar = () =>{
                setValidador(!validador)
            }


            const put = (e) => {
                axios.put('https://backend-petcare.herokuapp.com/usuario/'+from.id,dados_post(e))
                .then((res) => setResposta(res.data))
                .catch((res) => setErro(res.response.data.message))   
            }

            return(
                <div className={Style.ContainerMinimal}>
                    <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nome:</label>
                            <input className={Style.Input}  value={nome} type="Text" id= "Nome" placeholder= "Exemplo: Caramelo" onChange={(e) => {setNome(e.target.value), setErro_imput(false)}}/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Email">Email:</label>
                            <input className={Style.Input} value={email} type="Text" id= "Email" placeholder= "Exemplo: Caramelo" disabled/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="senha">Senha Atual:</label>
                            <input className={Style.Input} value={senha} type="password" id= "Senha"onChange={(e) => {setSenha(e.target.value), setErro_senha(false)}}/>
                        </div>
                        <div>
                            <br />
                            <label className={Style.Label} htmlFor="senha">Deseja Modificar a Senha?</label>
                            <input className={Style.Input} type="checkbox" id= "check" checked={validador} onChange={(e) => {validar(), setNovaSenha(""), setSenhaVerificada("")}}/>
                        </div>
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nova Senha:</label>
                            <input className={Style.Input} value={novaSenha} type="password" id= "SenhaNova"onChange={(e) => {setNovaSenha(e.target.value), setErroNovaSenha(false)}}/>
                        </div>
                        )
                        }
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Confirmar Nova Senha:</label>
                            <input className={Style.Input} value={senhaVerificada} type="password" id= "SenhaVerificada"onChange={(e) => {setSenhaVerificada(e.target.value), setErroNovaSenha(false)}}/>
                        </div>
                        )
                        }
                    </form>
                    {verificar_campos() == 1 && erro_imput == true &&(
                        <h4 className={Style.error}>
                            Oops! Por favor coloque um nome válido
                        </h4>
                    )
                    }
                    {verificar_campos() == 1 &&(
                        <a className={Style.Btn} onClick={() => {setErro_imput(true)}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 2 && erro_senha == true &&(
                        <h4 className={Style.error}>
                            Oops! Por faavor coloque uma senha válida
                        </h4>
                    )
                    }
                    {verificar_campos() == 2 &&(
                        <a className={Style.Btn} onClick={() => {setErro_senha(true)}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 3 && validador == false &&(
                        <a className={Style.Btn} onClick={() => {put("sem senha nova")}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 3 && verificar_senha(senhaVerificada) == 1 && erroNovaSenha == true && validador == true &&(
                        <h4 className={Style.error}>
                            Oops! Sua nova senha está vazia por favor Preencha todos os campos para alterar seus dados com sucesso!
                        </h4>
                    )
                    }
                    {verificar_campos() == 3 && verificar_senha(senhaVerificada) == 1 && validador == true &&(
                        <a className={Style.Btn} onClick={() => {setErroNovaSenha(true)}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 3 && verificar_senha(senhaVerificada) == 2 && erroNovaSenha == true && validador == true &&(
                        <h4 className={Style.error}>
                            Oops! Sua nova senha está igual a sua senha atual, por favor coloque uma senha diferente.
                        </h4>
                    )
                    }
                    {verificar_campos() == 3 && verificar_senha(senhaVerificada) == 2 && validador == true &&(
                        <a className={Style.Btn} onClick={() => {setErroNovaSenha(true)}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 3 && verificar_senha(senhaVerificada) == 3 && validador == true &&(
                        <a className={Style.Btn} onClick={() => {put("com senha nova")}}>
                            enviar
                        </a>
                    )
                    }
                    <div className={Style.DivBtn}>
                        <a className={Style.Btn} onClick={() => setCancelar(true)}>
                            Cancelar
                        </a>
                    </div>
                    {
                        console.log(validador)
                    }
                    { cancelar == true &&(
                        <Navigate to="/usuario"/>
                    )
                    }
                    { resposta &&(
                        <Navigate to="/home"/>
                    )
                    }
                    {erro == "token has expired" &&(
                        <Navigate to="/login"/>
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
export default modificarcadastrodousuario