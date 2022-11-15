import Style from '../Style/Home.module.css'
import Boton from '../Components/Botao'
import { Navigate } from 'react-router-dom'

function Home(){

    console.log(sessionStorage.getItem("token"))

    if (sessionStorage.getItem("token") != null) {
        return(
        <div className={Style.ContainerMinimal}>
            <div>
                <img className={Style.Banner} src="src/Imagens/BannerCachorro.jpg" alt="Imagem de um resgate de animal" />
            </div>
            <div className={Style.DivText}>
                <h3>
                    Ajude-nos nessa luta
                </h3>
                <p>
                    Animais em situação de rua é algo recorrente na atualidade e isso afeta 
                    tanto a saúde dos animais quanto a saúde e segurança das pessoas. Para 
                    tentar por um fim nessa situação nós desenvolvemos o Pet Care, para 
                    contribuir conosco basta cadastrar um animal que você encontrar em situação 
                    de rua, desde já agradecemos sua ateção e contriubuição.
                </p>
            </div>
            <div className={Style.ContainerBtn}>
                <div className={Style.ContainerItem1}>
                    <Boton item="Ver Denuncias Cadastradas" url="/listagem"/>
                </div>
                <div className={Style.ContainerItem2}>
                    <Boton item="Cadastrar Nova Denuncia" url="/cadastro"/>            
                </div>
        </div>
        </div>
    ) 
    }
    else{
        return(
            <Navigate to="/login" />
        )
    }
}

export default Home