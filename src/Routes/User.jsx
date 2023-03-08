import Style from '../Style/User.module.css'
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useEffect , useState } from 'react'
import axios from 'axios'
import Botao from '../Components/Botao'

function users () { 

    if (localStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const [usuario,setUsuario] = useState();
            const [erro, setErro] = useState();
            const [animacao,setAnimacao] = useState(true);
            const [popup, setPopup] = useState(false);
            const [avanco, setAvanco] = useState(false);
            const [password, setPassword] = useState();
            const [resposta, setResposta] = useState();
            const [errodel, setErrodel] = useState();

            const token ={
                "token" : token_jwt
            }

            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/usuario/"+TokenDecodificado.id,token)
                .then((res) => setUsuario(res.data.user))
                .catch((res) => setErro(res))
                .finally(() => setAnimacao(false))
            },[]);

            while(animacao == true){
                return(
                    <div className={Style.ContainerMinimal}>
                        <div className={Style.Carregamento}></div>
                    </div>
                )
            }
            const del = () => {
                axios.delete("https://backend-petcare.herokuapp.com/usuario/"+TokenDecodificado.id,{
                "data":{
                    "password": password,
                    "token": token_jwt
                }
            })
                .then((res) => setResposta(res.data.message))
                .catch((res) => setErrodel(res.response.data.message))
            }
            return( 
                <div >
                    {usuario != null &&( 
                        
                        <div className={Style.ContainerMinimal}>
                            <div className={Style.Container}>
                            <div className={Style.ContainerIMG}>
                                <img src={usuario.photo} alt="" />
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
                            <Botao tipo="redirecionar" nome="Modificar Cadastro" estado={{from:usuario}} rota="/modificarcadastrodousuario"></Botao>
                            <a onClick = {()=> setPopup(true)} className={Style.Excluir}>
                                Excluir Conta
                            </a>
                            <a href="/home" onClick={ () => {localStorage.removeItem("token"), localStorage.removeItem("foto")}} className={Style.Logout}>
                                Sair
                            </a>
                            
                        </div>
                    )
                    }
                    {popup == true &&(
                    <div className={Style.popup}>
                        {avanco == false &&(
                        <div className={Style.Divisao}>
                        <h3>Atenção</h3>
                        <p className={Style.text}>
                            Ao excluir sua conta suas denúncias permaneceram em nosso banco de dados e você não tera mais acesso a elas
                        </p>
                        <a onClick = {()=> setAvanco(true)} className={Style.Cancelar}>
                            Avançar
                        </a>
                        <a onClick = {()=> setPopup(false)} className={Style.Cancelar}>
                            Cancelar
                        </a>
                        </div>
                        )}
                        {avanco == true &&(
                        <div className={Style.Divisao}>
                            <label className={Style.Label} htmlFor="password"> Digite sua senha para prosseguir:</label>
                            <input className={Style.Input} type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                            {errodel != null && errodel=="login attempt failed" &&(
                            <p className={Style.text} style={{color: 'red'}}>
                            *Senha incorreta
                        </p>
                        )}
                        <a onClick = {()=>del()} className={Style.Logout}>
                            Enviar
                        </a>
                        <a onClick = {()=> {setAvanco(false), setErrodel(null), setPassword(null)}} className={Style.Cancelar}>
                            Cancelar
                        </a>
                        </div>
                        )}
                    </div>
                    )}
                    {
                        resposta != null && resposta == "user records deleted" &&(
                        <>
                            {localStorage.removeItem("token")}
                            {console.clear()}
                            <Navigate to="/home" /> 
                        </>
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