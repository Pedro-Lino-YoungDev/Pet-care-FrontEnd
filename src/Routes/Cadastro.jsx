import Style from '../Style/Cadastro.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Contato(){

    const [tipo,setTipo] = useState("Cachorro");
    const [descriao,setDescricao] = useState();
    const [localizacao,setLocalizacao] = useState();
    const [rua,setRua] = useState();
    const [bairro,setBairro] = useState("Aloísio Pinto");
    const [PR,setPR] = useState();
    const [foto,setFoto] = useState();

    const [redirecionar, setRedirecionar] = useState();
    const [resposta, setRespost] = useState();
    const [error, setError] = useState();

    const denuncia =[
        
        {
            "descricao" : descriao,
            "tipo" : tipo,
            "localizacao" : localizacao,
            "rua" : rua,
            "bairro" : bairro,
            "pontoDeReferencia" : PR,
            "picture" : foto
        }
    ]

    

    const post = () => {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
        .then((res) => setRespost(res))
        .catch((res) => setError(res))
    }

    const verificiar_formulario = (e) =>{
        if (foto == null || foto == '' || tipo == null || tipo == ''  || 
        bairro == null || bairro == '' || rua == null || rua == '' || 
        PR == null || PR == '' || descriao == null || descriao == ''
        ){
            return true;
        }
    }
    
    if (sessionStorage.getItem("token") != null) {
        
    
    return(
        <div className={Style.ContainerMinimal}>
            <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                <div className={Style.ItemForm1}>  
                    <label htmlFor="PrimeiraImg">Primeira imagem do Animal: </label>
                    <input className={Style.InputImg} type="file" accept="image/*" name="image" id="PrimeiraImg" onChange={(e) => setFoto(e.target.value)}/>
                </div>
                <div className={Style.ItemForm}>
                    <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                    <select className={Style.Select} name="EspecieDoAnimal" id="Especie" onChange={(e) => setTipo(e.target.value)}>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                {tipo != null && tipo != "Gato" && tipo != "Cachorro" &&(
                    <div className={Style.ItemForm}>
                        <input className={Style.Input} type="Text" id= "Tipo" placeholder= "Exemplo: Cavalo" onChange={(e) => setTipo(e.target.value)}/>
                    </div>
                )
                }
                
                <div className={Style.ItemForm}>
                    <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                    <select className={Style.Input} name="Bairro" id= "Bairro" onChange={(e) => setBairro(e.target.value)}>
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
                    <label className={Style.Label} htmlFor="Rua">Rua</label>
                    <input className={Style.Input} type="Text" id= "Rua" placeholder= "Exemplo: Rua Agamenon Magalhães" onChange={(e) => setRua(e.target.value)}/>
                </div>
                <div className={Style.ItemForm}>
                    <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                    <input className={Style.Input} type="Text" id= "PontoDeReferencia" placeholder= "Exemplo: Proximo ao Assaí" onChange={(e) => setPR(e.target.value)}/>
                </div>
                <div className={Style.ItemForm}>
                    <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                    <input className={Style.Descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} onChange={(e) => setDescricao(e.target.value)}/>
                </div>
            </form>
            {
                verificiar_formulario() == true &&(
                    <a className={Style.Btn} > enviar </a>
                )
            }
            {
                verificiar_formulario() == false &&(
                    <a className={Style.Btn} onClick={() => {setRedirecionar(true)}}>enviar</a>
                )
            }
            { redirecionar == true &&(
                <Navigate to="/home"/>
            )
            }
        </div>
    )
}
    else{
        return(
            <Navigate to="/login" />
        )
    }
}

export default Contato