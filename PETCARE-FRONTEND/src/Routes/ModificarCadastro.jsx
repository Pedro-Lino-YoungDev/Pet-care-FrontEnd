import Style from '../Style/ModificarCadastro.module.css'
import { useLocation } from 'react-router-dom';
import {useState} from 'react'

function ModificarCadastro(){ 
    const [animal,setAnimal] = useState();
    const location = useLocation();
    const { from } = location.state;

    return(
         <div className={Style.ContainerMinimal}>
            <form action="Cadastro" method="Post" encType="multipart/form-data">
            <div className={Style.ItemForm1}>
            <img className={Style.Banner} src={from.picture} alt="imagem do cachorro" />
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                <input className={Style.Input} type="Text" id = "tipo"  value={from.tipo} readOnly/>
            </div>

            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Bairro">Bairro:</label>
                <select className={Style.Input} name="Bairro" id= "Bairro">
                <option value="">Santo Antônio</option>
                <option value="">Heliópolis</option>
                <option value="">Aloísio Pinto</option>   
                <option value="">Boa Vista</option>
                <option value="">Magano</option>
                <option value="">Dom Thiago Póstma</option>
                <option value="">Severiano de Moraes Filho</option>
                <option value="">José Maria Dourado</option>
                <option value="">Dom Hélder Câmara</option>
                <option value="">Novo Heliópolis</option>
                <option value="">Francisco Figueira</option>
                <option value="">São José</option>
                </select>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Rua">Rua</label>
                <input className={Style.Input} type="Text" id= "Rua" placeholder= "Elemplo: Rua Agamenon Magalhães" value={from.rua}/>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                <input className={Style.Input} type="Text" id= "PontoDeReferencia" placeholder= "Elemplo: Proximo ao Assaí" value= {from["Ponto de referencia"]}/>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                <input className={Style.Descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} value={from.Descricao}/>
            </div>
            <input className={Style.Btn} type="Submit" id="Submit"/>
            </form>
        </div>
    )
}

export default ModificarCadastro