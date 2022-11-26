import { useEffect, useState } from 'react';
import Style from '../Style/Listagem.module.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Botao from '../Components/Botao';
import { useTimer } from 'react-timer-hook';




function Listagem(){

    if (localStorage.getItem("token") != null) {   

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const[denuncias, setDenuncias] = useState([]);
            const [erro, setErro] = useState();


            const token = {
                "token" : localStorage.getItem("token")
            }
        
            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/denuncias",token)
                .then((res) => setDenuncias(res.data))
                .catch((res) => setErro(res.response.data.message))
            },[]);

            const formatar_horario = (e) =>{
                const DataSeparada = e.split("T");
                const HorarioSeparado = DataSeparada[1].split(".")
                return HorarioSeparado[0];
            }

            const formatar_data = (e) =>{
                const DataSeparada = e.split("T");
                return DataSeparada[0];
            }
            if (erro == "denuncia not found"){
                return (
                    <div className={Style.ContainerPadrao}>
                        <div className={Style.DivRedirecionar}>
                            <h2>
                                Você ainda não cadatrou nenhuma denúncia! 
                            </h2>
                            <br />
                            <p className={Style.Tamanho}>
                                clique no boão a seguir para cadastrar sua primeira denúncia.
                            </p>
                        </div>
                        <div>
                            <Botao tipo="redirecionar" nome="Cadastrar denúncia" rota="/cadastro"></Botao>
                        </div>
                        {
                            console.clear()
                        }
                    </div>
                )
            }
            if (erro == undefined && denuncias == undefined) {
                return (
                    <div className={Style.ContainerPadrao}>
                        <div className={Style.Carregamento}></div>
                        {
                            console.clear()
                        }
                    </div>
                )
            }
            if (denuncias != undefined){

                const time = new Date ();
                time.setSeconds(time.getSeconds()+2);
                const expiryTimestamp = time;
                const [expirou, setExpirou] = useState();
                const {  } = useTimer({expiryTimestamp, onExpire: () => setExpirou(true)});

                if(expirou == true){


                return(
                    <div>
                        <div className={Style.ContainerMinimal}>
                            {denuncias.map((den,i)=> 
                            <div className={Style.DivItem} key={i}>
        
                                <div className={Style.DivImg}>
                                    <img  className={Style.Imagen} src={den.picture} alt="imagem da denúncia cadastrada" />
                                </div>
        
                                <div >
                                    <h4>
                                        Rua
                                    </h4>
                                    <p >
                                        {den.rua}
                                    </p>
                                </div>
        
                                <div >
                                    <h4>
                                        Data de cadastro:
                                    </h4>
                                    <p>
                                        {formatar_data(den["created_at"])}
                                    </p>
                                    <h4>
                                        Hora de cadastro:
                                    </h4 >
                                    <p>
                                        {formatar_horario(den["created_at"])}
                                    </p>
                                </div>
                                
                                <div className={Style.ContainerBtn}>
                                <Botao tipo="redirecionar" nome="Ver detalhes" estado={{from:denuncias[i]}} rota="/denuncia"></Botao>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                )                
                }
                else{
                    return (
                        <div className={Style.ContainerPadrao}>
                            <div className={Style.Carregamento}></div>
                            {
                                console.clear()
                            }
                        </div>
                    )
                }
            }
        }
        else{
            return <Navigate to="/login" />
        }
    }
    else{
        return <Navigate to="/login" />
    }
}

export default Listagem