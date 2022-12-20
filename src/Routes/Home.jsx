import Style from '../Style/Home.module.css'
import Boton from '../Components/Botao'
import jwtDecode from 'jwt-decode';



function Home(){

    const verificar_token = () =>{
        if (localStorage.getItem("token") != null) {
            const DataAtual = new Date();
            const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

            const token_jwt = localStorage.getItem("token");
            const TokenDecodificado = jwtDecode(token_jwt); 
            if (TokenDecodificado.exp > HorarioTokenFormatado) {
                return "token válido"
            }
            else{
                return "token inválido"
            }
        }
        else{
            return "token expirado"
        }
    }

    return(
        <div className={Style.ContainerMinimal}>
            <div className={Style.ContainerBanner}>
                <img className={Style.Banner} src="/Imagens/BannerCachorro.jpg" alt="Imagem de um resgate de animal" />
            </div>
            <div className={Style.DivText}>
                <h3>
                    Ajude-nos nessa luta!
                </h3>
                <p>
                    &emsp;Animais em situação de rua é algo recorrente na atualidade, o que afeta 
                    tanto a saúde dos animais quanto a saúde e segurança das pessoas. Para 
                    por um fim nesse quadro nós desenvolvemos o Pet Care. Para 
                    contribuir conosco basta cadastrar um animal que você encontrar em situação 
                    de rua, desde já agradecemos sua ateção e contriubuição.
                </p>
            </div>
            <div className={Style.ContainerBtn}>
                { verificar_token() == "token válido" &&(
                    <div className={Style.ContainerItem1}>
                        <Boton tipo="redirecionar" nome="Denúncias cadastradas" rota="/listagem"/>
                    </div>
                )
                }
                <div className={Style.ContainerItem2}>
                    <Boton tipo="redirecionar" nome="Cadastrar denúncia" rota="/cadastro"/>            
                </div>
            </div>
        </div>
    ) 
}

export default Home