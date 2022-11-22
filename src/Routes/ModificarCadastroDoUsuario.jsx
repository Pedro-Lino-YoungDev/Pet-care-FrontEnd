import Style from '../Style/ModificarCadastroDoUsuario.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'


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
            const [novaSenha, setNovaSenha] = useState();
            const [senhaVerificada, setSenhaVerificada] = useState();
            const [validador,setValidador] = useState(false);

            const [resposta,setResposta] = useState();
            const [erro,setErro] = useState();


            const [erro_imput, setErro_imput] = useState();
            const [erro_senha, setErro_senha] = useState();

            const verificar_campos = () =>{
                if (senha == "" && senha == null){
                    return 1
                }
                if (email == "" && email == null && nome == "" && nome == null && senha == "" && senha == null) {
                    return 2
                }else{
                    return 3
                }
            }
            const verificar_senha = (e) => {
                if(novaSenha == '' || novaSenha == null  || e == null || e == ''){
                    return 1
                }
                else if (novaSenha == e ) {
                    return 2
                }
                else if(novaSenha == senha){
                    return 3
                }
            }
            

            const user = {
                "name": nome,
                "email": email,
                "password": senha,
                "token" : sessionStorage.getItem("token")
            }

            const validar = () =>{
                setValidador(!validador)
            }


            const put = () => {
                axios.put('https://backend-petcare.herokuapp.com/usuario/'+from.id,user)
                .then((res) => setResposta(res.data))
                .catch((res) => setErro(res.response.data.message))   
            }

            return(
                <div className={Style.ContainerMinimal}>
                    <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nome:</label>
                            <input className={Style.Input}  value={nome} type="Text" id= "Nome" placeholder= "Exemplo: Caramelo" onChange={(e) => setNome(e.target.value)}/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Email">Novo Email:</label>
                            <input className={Style.Input} value={email} type="Text" id= "Email" placeholder= "Exemplo: Caramelo" onChange={(e) => setEmail(e.target.value)} disabled/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="senha">Senha Atual:</label>
                            <input className={Style.Input} value={senha} type="password" id= "Senha"onChange={(e) => setSenha(e.target.value)}/>
                        </div>
                        <div>
                            <br />
                            <label className={Style.Label} htmlFor="senha">Deseja Modificar a Senha?</label>
                            <input className={Style.Input} type="checkbox" id= "check" checked={validador} onChange={validar}/>
                        </div>
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nova Senha:</label>
                            <input className={Style.Input} value={senha} type="password" id= "SenhaNova"onChange={(e) => setNovaSenha(e.target.value)}/>
                        </div>
                        )
                        }
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Confirmar Nova Senha:</label>
                            <input className={Style.Input} value={senha} type="password" id= "SenhaVerificada"onChange={(e) => setSenhaVerificada(e.target.value)}/>
                        </div>
                        )
                        }
                    </form>
                    {verificar_campos() == 2 && erro_imput == true &&(
                        <h4 className={Style.error}>
                            Oops! Preencha corretamente para atualizar seus dados
                        </h4>
                    )
                    }
                    {verificar_campos() == 2 &&(
                        <a className={Style.Btn} onClick={() => {setErro_imput(true)}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 1 && erro_senha == true &&(
                        <h4 className={Style.error}>
                            Oops! coloque uma senha valida para se cadastrar com sucesso
                        </h4>
                    )
                    }
                    {verificar_campos() == 1 &&(
                        <a className={Style.Btn} onClick={() => {setErro_senha(true)}}>
                            enviar
                        </a>
                    )
                    }
                    {verificar_campos() == 3 &&(
                        <a className={Style.Btn} onClick={() => {put()}}>
                            enviar
                        </a>
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