import Style from '../Style/Cadastro.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'



function Contato(){     

    if(localStorage.getItem("token") != null){

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const [tipo,setTipo] = useState("Cachorro");
            const [descriao,setDescricao] = useState();
            const [localizacao,setLocalizacao] = useState();
            const [rua,setRua] = useState();
            const [cor,setCor] = useState();
            const [bairro,setBairro] = useState("Aloísio Pinto");
            const [PR,setPR] = useState();
            const [foto,setFoto] = useState();
            const [erroCampos,setErroCampos] = useState();

            const [redirecionar, setRedirecionar] = useState();
            const [resposta, setRespost] = useState();
            const [error, setError] = useState();

            const denuncia = {
                "tipo" : tipo,
                "cor" : cor,
                "localizacao" : "localizacao",
                "rua" : rua,
                "bairro" : bairro,
                "pontoDeReferencia" : PR,
                "picture" : foto,
                "descricao" : descriao,
                "token" : token_jwt
            }
            const post = () => {
                axios.post("https://backend-petcare.herokuapp.com/denuncia",denuncia)
                .then((res) => setRespost(res))
                .catch((res) => setError(res))
                .then(() => setRedirecionar(true))
            }

            const verificiar_formulario = () =>{

                if (foto == null || foto == '' || tipo == null || tipo == ''  || 
                bairro == null || bairro == '' || rua == null || rua == '' || 
                PR == null || PR == '' || descriao == null || descriao == ''
                ){
                    return true;
                }
                else{
                    return false;
                }
            }
            const converter_imagem = (e) =>{
                if(e != undefined && e != null){
                    var imagemCarregada = e[0];
                    var arquivo = new FileReader ();

                    arquivo.onload = function (arquivoCarregado) {
                        var image= arquivoCarregado.target.result;
                        setFoto(image);
                    }
                    arquivo.readAsDataURL(imagemCarregada);
                }
            }
        
            return(
                <div className={Style.ContainerMinimal}>
                    <div className={Style.ContainerGeral}>
                        <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                            <div className={Style.ItemForm1}>  
                                <label htmlFor="PrimeiraImg">Imagem do Animal: </label>
                                <br />
                                <input className={Style.InputImg} type="file" accept="image/*" name="image" id="PrimeiraImg" onChange={(e) => {converter_imagem(e.target.files) , setErroCampos(false)}}/>
                            </div>
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                                <select className={Style.Input} name="EspecieDoAnimal" id="Especie" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false)}}>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                            {tipo != null && tipo != "Gato" && tipo != "Cachorro" &&(
                                <div className={Style.ItemForm}>
                                    <input className={Style.Input} type="Text" id= "Tipo" placeholder= "Exemplo: Cavalo" onChange={(e) => {setTipo(e.target.value) , setErroCampos(false)}}/>
                                </div>
                            )
                            }
                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                                <select className={Style.Input} name="Bairro" id= "Bairro" onChange={(e) => {setBairro(e.target.value) , setErroCampos(false)}}>
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
                                <input className={Style.Input} type="Text" id= "Cor" placeholder= "Exemplo: Caramelo" onChange={(e) => {setCor(e.target.value) , setErroCampos(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Rua">Rua</label>
                                <input className={Style.Input} type="Text" id= "Rua" placeholder= "Exemplo: Rua Agamenon Magalhães" onChange={(e) => {setRua(e.target.value) , setErroCampos(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                                <input className={Style.Input} type="Text" id= "PontoDeReferencia" placeholder= "Exemplo: Proximo ao Assaí" onChange={(e) => {setPR(e.target.value) , setErroCampos(false)}}/>
                            </div>

                            <div className={Style.ItemForm}>
                                <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                                <input className={Style.Descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} onChange={(e) => {setDescricao(e.target.value) , setErroCampos(false)}}/>
                            </div>
                            {erroCampos == true &&(
                            <div  className={Style.DivErro}>
                                <h4  className={Style.erro}>
                                    Preencha todos os campos para cadastrar a denúncia com sucesso*
                                </h4>
                            </div>
                            )
                            }
                        </form>
                    </div>

                    <div className={Style.ContainerBtn}>
                        {verificiar_formulario() == true  &&(
                            <Botao tipo="interno" nome="enviar" clique={() => {setErroCampos(true)}}></Botao>
                        )
                        }
                        {verificiar_formulario() == false &&(
                            <Botao tipo="interno" nome="enviar" clique={() => {post()}}></Botao>
                        )
                        }
                        {redirecionar == true &&(
                            <Navigate to="/home"/>
                        )
                        }
                    </div>
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

export default Contato