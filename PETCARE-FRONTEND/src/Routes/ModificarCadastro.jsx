import Style from '../Style/ModificarCadastro.module.css'
import { Navigate, useLocation } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios';

function ModificarCadastro(){ 
    const [animal,setAnimal] = useState();
    const location = useLocation();
    const { from } = location.state;

    const [tipo,setTipo] = useState(from.tipo);
    const [descricao,setDescricao] = useState(from.descriao);
    const [rua,setRua] = useState(from.rua);
    const [bairro,setBairro] = useState(from.bairro);
    const [PR,setPR] = useState(from["Ponto de referencia"]);
    const [foto,setFoto] = useState(from.picture);

    const denuncia =[
        {
            "descricao" : descricao,
            "tipo" : tipo,
            "localizacao" : localizacao,
            "rua" : rua,
            "bairro" : bairro,
            "pontoDeReferencia" : PR,
            "picture" : foto
        }
    ]

    const put = () => {
        axios.put("https://backend-petcare.herokuapp.com/denuncia/"+from.id , denuncia)
        .then((res) => setRespost(res))
        .catch((res) => setError(res))
    }

    const verificiar_formulario = (e) =>{
        if (foto == null || foto == '' || tipo == null || tipo == ''  || 
        bairro == null || bairro == '' || rua == null || rua == '' || 
        PR == null || PR == '' || descricao == null || descricao == '') {
            return true
        }
        else{
            return false
        }
    } 

    if (sessionStorage.getItem("token") != null) {

    return(
        <div className={Style.ContainerMinimal}>
        <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
            <div className={Style.ItemForm1}>  
                <label htmlFor="PrimeiraImg">Primeira imagem do Animal: </label>
                <input className={Style.InputImg} type="file" value={foto} accept="image/*" name="image" id="PrimeiraImg" onChange={(e) => setFoto(e.target.value)}/>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                <select className={Style.Select} name="EspecieDoAnimal" value={tipo} id="Especie" onChange={(e) => setTipo(e.target.value)}>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            {tipo != null && tipo != "Gato" && tipo != "Cachorro" &&(
                <div className={Style.ItemForm}>
                    <input className={Style.Input} type="Text" id= "Tipo" value={tipo} placeholder= "Exemplo: Cavalo" onChange={(e) => setTipo(e.target.value)}/>
                </div>
            )
            }
            
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                <select className={Style.Input} name="Bairro" value={bairro} id= "Bairro" onChange={(e) => setBairro(e.target.value)}>
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
                <input className={Style.Input} type="Text" id= "Rua" value={rua} placeholder= "Exemplo: Rua Agamenon Magalhães" onChange={(e) => setRua(e.target.value)}/>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                <input className={Style.Input} type="Text" id= "PontoDeReferencia"value={PR} placeholder= "Exemplo: Proximo ao Assaí" onChange={(e) => setPR(e.target.value)}/>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                <input className={Style.Descricao} type="Text" id= "Descricao" value={descricao} placeholder= "Máximo de 100 Caracteres" maxLength={100} onChange={(e) => setDescricao(e.target.value)}/>
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

export default ModificarCadastro