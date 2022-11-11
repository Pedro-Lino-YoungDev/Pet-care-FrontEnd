import Style from '../Style/Cadastro.module.css'
import {useState} from 'react'

function Contato(){
    const [animal,setAnimal] = useState();
    
    return(
        <div className={Style.ContainerMinimal}>
            <form action="Cadastro" method="Post" encType="multipart/form-data">
            <div className={Style.ItemForm1}>  
                <label htmlFor="PrimeiraImg">Primeira imagem do Animal: </label>
                <input className={Style.InputImg} type="file" accept="image/*" name="image" id="PrimeiraImg"/>
                <label htmlFor="SegundaImg">Segunda imagem do Animal: </label>
                <input className={Style.InputImg} type="file" name="image" id="SegundaImg"/>
                <label htmlFor="TerceiraImg">Terceira imagem do Animal: </label>
                <input className={Style.InputImg} type="file" name="image" id="TerceiraImg"/>
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Especie">Tipo de animal</label>
                <select className={Style.Select} name="EspecieDoAnimal" id="Especie" onChange={(e) => setAnimal(e.target.value)}>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            {animal == "Outros" &&(
 <div className={Style.ItemForm}>
 <input className={Style.Input} type="Text" id= "Tipo" placeholder= "Exemplo: Cavalo"/>
</div>
            )
            
            }
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
                <input className={Style.Input} type="Text" id= "Rua" placeholder= "Exemplo: Rua Agamenon Magalhães" />
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="PontoDeReferencia">Ponto de Referência</label>
                <input className={Style.Input} type="Text" id= "PontoDeReferencia" placeholder= "Exemplo: Proximo ao Assaí" />
            </div>
            <div className={Style.ItemForm}>
                <label className={Style.Label} htmlFor="Descricao">Dê um breve resumo sobre a situção do animal:</label>
                <input className={Style.Descricao} type="Text" id= "Descricao" placeholder= "Máximo de 100 Caracteres" maxLength={100} />
            </div>
            <input className={Style.Btn} type="Submit" id="Submit"/>
            </form>
        </div>
    )
}

export default Contato