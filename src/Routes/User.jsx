import Style from '../Style/User.module.css'
import Boton from '../Components/Botao'
import { Navigate } from 'react-router-dom'

function users () {
    
    if (sessionStorage.getItem("token") != null) {
        return(
        <div className={Style.ContainerMinimal}>
            <div className={Style.ContainerIMG}>
            </div>
            <div>
                <div>
                    <h1>
                        Nome do Usuario:
                    </h1>
                    <p>
                        Pedro
                    </p>
                    <h1>
                        E-mail do Usuario:
                    </h1>
                    <p>
                        Pedro:
                    </p>
                </div>
            </div>
            <a className={Style.Btn}> Modificar cadastro</a> 
            <a className={Style.Logout}>Sair</a>
                               
        </div>
    ) 
    {
        sessionStorage.removeItem("token");
    }
    }
    else{
        return(
            <Navigate to="/login" />
        )
    }
}

export default users;