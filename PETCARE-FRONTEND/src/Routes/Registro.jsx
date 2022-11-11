import axios from 'axios'
import { useState } from 'react'
import Style from '../Style/Registro.module.css'
import ButtonStyle from '../Style/Botao.module.css';
import { Navigate } from 'react-router-dom';


function Registro(){

    const [token,setToken] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senha_verificada, setSenha_verificada] = useState();
    const [redirecionar, setRedirecionar] = useState();

    const [resposta, setRespost] = useState();
    const [error, setError] = useState();

    const verificar_senha = (e) => {
        if (senha == '' && e == '' || senha == null && e == null || senha == null && e == '' || senha =='' && e == null) {
            return 1
        }
        else if(senha == e && nome == '' || nome == null || email == null || email == ''){
            return 3
        }
        else if(senha == e){
            return 2
        }
        
        else{
            return 4
        }
    }

    const user = [
        {
            "name": nome,
            "email": email,
            "password": senha_verificada
        }
    ]

    const post = () => {
        axios.post("https://backend-petcare.herokuapp.com/usuario",user)
        .then((res) => setRespost(res))
        .catch((res) => setError(res))
    }
    sessionStorage.setItem("token",token)

    console.log(senha)
    console.log(senha_verificada)

    return(
        <div className={Style.ContainerMinimal}>
            <form action="Login" method="Post">

                <div className={Style.ContainerItem1}>
                <label htmlFor="Email">Email:</label>
                <br />
                <input className={Style.Input} type="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="Name">Nome do Usurio :</label>
                <br />
                <input className={Style.Input} type="Name" onChange={(e) =>{setNome(e.target.value)}}/>
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="Password">Senha:</label>
                <br />
                <input className={Style.Input} type="Password" onChange={(e) =>{setSenha(e.target.value)}}/>
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="PasswordConfirm">Confirmar Senha:</label>
                <input className={Style.Input} type="Password" onChange={(e) =>{setSenha_verificada(e.target.value)}}/>
                
                </div>
                <br />
            </form>
            {verificar_senha(senha_verificada) == 1
            }
            {verificar_senha(senha_verificada) == 2 && email && nome &&(
                <a className={Style.Btn} onClick={() => {setRedirecionar(true)}}>enviar
                </a>
                )
            }
            {verificar_senha(senha_verificada) == 3&&(
                <h4 className={Style.error}>
                    Oops! Preencha todos os campos para se cadastrar com sucesso
                </h4>
            )
            }
            {verificar_senha(senha_verificada) == 4 &&(
                <h4 className={Style.error}>
                Oops as 2 senhas estão diferentes*
                </h4>
            )
            } 
            { redirecionar == true &&(
                sessionStorage.setItem("token","token_registro"),
                <Navigate to="/home"/>
            )
            }
        </div>
    )
}

export default Registro