import { useEffect, useState } from 'react';
import Style from '../Style/Listagem.module.css';
import { Link, Navigate } from 'react-router-dom';
import ButtonStyle from '../Style/Botao.module.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode'



function Listagem(){

    if (sessionStorage.getItem("token") != null) {   

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = sessionStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);

        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const[denuncias, setDenuncias] = useState([]);
            const [error, setError] = useState();


            const token = {
                "token" : sessionStorage.getItem("token")
            }
        
            useEffect(() => {
                axios.post("https://backend-petcare.herokuapp.com/denuncias",token)
                .then((res) => setDenuncias(res.data))
                .catch((res) => setError(res))
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
    
            return(
                <div className={Style.ContainerMinimal}>
                    {denuncias.map((den,i)=> 
                    <div className={Style.DivItem} key={i}>

                        <div >
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
                            <Link className={ButtonStyle.Btn} to ="/denuncia"  state={{from:denuncias[i]}}>Modificar</Link>
                        </div>
                    </div>
                    )}
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

export default Listagem