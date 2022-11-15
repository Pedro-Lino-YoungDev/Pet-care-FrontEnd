import axios from 'axios'
import { useState , useEffect} from 'react'
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
    const [erro_imput, setErro_imput] = useState();
    const [erro_senha, setErro_senha] = useState();
    const [token_csrf, setToken_csrf] = useState();

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

    const user = [
        {
            "name": nome,
            "email": email,
            "password": senha_verificada
        }
    ]

    /*
        useEffect(() => {
        axios.get('https://backend-petcare.herokuapp.com/token')
        .then((res) => setToken_csrf(res))
        },[]);
    */

        const post = () => {
        
        axios.post('https://backend-petcare.herokuapp.com/usuario',user)
        .then((res) => setRespost(res))
        .catch((res) => setError(res))    
    }

    return(
        <div className={Style.ContainerMinimal}>

                <form action="Registro" method="Post">
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

            {verificar_senha(senha_verificada) == 1 && erro_imput == true &&(
                <h4 className={Style.error}>
                    Oops! Preencha todos os campos para se cadastrar com sucesso
                </h4>
            )
            }

            {verificar_senha(senha_verificada) == 1 &&(
                 <a className={Style.Btn} onClick={() => {setErro_imput(true)}}>
                    enviar
                </a>
            )
            }

            {verificar_senha(senha_verificada) == 2&& erro_senha == true &&(
                <h4 className={Style.error}>
                Oops as 2 senhas estão diferentes*
                </h4>
            )
            }

            {verificar_senha(senha_verificada) == 2 &&(
                <a className={Style.Btn} onClick={() => {setErro_senha(true)}}>enviar
                </a>
            )
            }



            {verificar_senha(senha_verificada) == 3&&(
                <a className={Style.Btn} onClick={() => {setRedirecionar(true)}}>
                    enviar
                </a>
                )
            }

            { redirecionar == true &&(
                sessionStorage.setItem("token","token_registro"),
                <Navigate to="/home"/>
            )
            }

                <a className={Style.Btn} onClick={post}>
                    testar api
                </a>

        </div>
    )
}

export default Registro