import Style from '../Style/Cadastro.module.css'
import { Navigate, useLocation } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode'


function ModificarCadastro(){

    if (sessionStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = sessionStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const location = useLocation();
            const { from } = location.state;
        
            const [tipo,setTipo] = useState(from.tipo);
            const [descricao,setDescricao] = useState(from.descricao);
            const [rua,setRua] = useState(from.rua);
            const [bairro,setBairro] = useState(from.bairro);
            const [PR,setPR] = useState(from["pontoDeReferencia"]);
            const [foto,setFoto] = useState(from.picture);
            const [cor,setCor] = useState(from.cor);
        
        
            const [redirecionar,setRedirecionar] = useState(false);
            const [error, setError] = useState();

            const denuncia = {
                "tipo" : tipo,
                "cor" : cor,
                "localizacao" : "localizacao",
                "rua" : rua,
                "bairro" : bairro,
                "pontoDeReferencia" : PR,
                "descricao" : descricao,
                "token" : sessionStorage.getItem("token")
            }

            const put = () => {
                axios.put("https://backend-petcare.herokuapp.com/denuncia/"+from.id , denuncia)
                .then((res) => setRespost(res))
                .catch((res) => setError(res))
                .then(() => setRedirecionar(true))
            }

            const verificiar_formulario = (e) =>{
                if (foto == null || foto == '' || tipo == null || tipo == ''  || 
                bairro == null || bairro == '' || rua == null || rua == '' || 
                PR == null || PR == '' || descricao == null || descricao == '')
                {
                    return true
                }
                else{
                    return false
                }
            }

            const verificiar_tipo = () =>{
                if(tipo == "Cachorro"){
                    return 1
                }
                else if(tipo == "Gato"){
                    return 2
                }
                else{
                    return 3
                }
            }

            return(
                <div className={Style.ContainerMinimal}>
                    <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                        <div className={Style.ItemForm1}>  
                            <label htmlFor="PrimeiraImg">Primeira imagem do Animal: </label>
                            <input className={Style.InputImg}  type="file" accept="image/*" name="image" id="PrimeiraImg" onChange={(e) => setFoto(e.target.value)}/>
                        </div>

                        {verificiar_tipo() == 2 &&(
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                <select className={Style.Select} value={tipo} name="EspecieDoAnimal" id="Especie" onChange={(e) => setTipo(e.target.value)}>
                                    <option value="Gato">Gato</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                        )
                        }
                        {verificiar_tipo() == 1  &&(
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                <select className={Style.Select} value={tipo} name="EspecieDoAnimal" id="Especie" onChange={(e) => setTipo(e.target.value)}>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                        )
                        }
                        {verificiar_tipo() == 3 &&(
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                <select className={Style.Select} value={tipo} name="EspecieDoAnimal" id="Especie" onChange={(e) => setTipo(e.target.value)}>
                                    <option value="Outros">Outros</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                </select>
                                <br />
                                <input className={Style.Input} value={tipo} type="Text" id= "Tipo" placeholder= "Exemplo: Cavalo" onChange={(e) => setTipo(e.target.value)}/>
                            </div>
                        )
                        }
                        
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                            <select className={Style.Input} value={bairro} name="Bairro" id= "Bairro" onChange={(e) => setBairro(e.target.value)}>
                                <option value="Aloísio Pinto">Aloísio Pinto</option>   
                                <option value="Boa Vista">Boa Vista</option>
                                <option value="Dom Hélder Câmara">Dom Hélder Câmara</option>
                                <option value="Dom Thiago Póstma">Dom Thiago Póstma</option>
                                <option value="Francisco Figueira">Francisco Figueira</option>
                                <option value="Heliópolis">Heliópolis</option>
                                <option value="José Maria Dourado">José Maria Dourado</option>
                                <option value="Magano">Magano</option>
                                <option value="Novo Heliópolis">Novo Heliópolis</option>
                                <option value="Santo Antônio">Santo Antônio</option>
                                <option value="São José">São José</option>
                                <option value="Severiano de Moraes Filho">Severiano de Moraes Filho</option>
                            </select>
                        </div>

                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Rua">Cor</label>
                            <input className={Style.Input} value={cor} type="Text" id= "Cor" placeholder= "Exemplo: Caramelo" onChange={(e) => setCor(e.target.value)}/>
                        </div>

                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Rua">Rua</label>
                            <input className={Style.Input} value={rua} type="Text" id= "Rua" placeholder= "Exemplo: Rua Agamenon Magalhães" onChange={(e) => setRua(e.target.value)}/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                            <input className={Style.Input} value={PR} type="Text" id= "PontoDeReferencia" placeholder= "Exemplo: Proximo ao Assaí" onChange={(e) => setPR(e.target.value)}/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                            <input className={Style.Descricao} value={descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} onChange={(e) => setDescricao(e.target.value)}/>
                        </div>
                    </form>
                    {verificiar_formulario() == true &&(
                        <a className={Style.Btn} > enviar </a>
                    )
                    }
                    {verificiar_formulario() == false &&(
                        <a className={Style.Btn} onClick={() => {put()}}>enviar</a>
                    )
                    }
                    {redirecionar == true &&(
                        <Navigate to="/home"/>
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

export default ModificarCadastro