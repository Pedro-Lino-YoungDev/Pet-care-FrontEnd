import { useEffect, useState } from 'react';
import Style from '../Style/Listagem.module.css';
import { Link } from 'react-router-dom';
import ButtonStyle from '../Style/Botao.module.css';

function Listagem(){
    const[denuncias, setDenuncias] = useState([]);
    var teste =0;
    useEffect(() => {
    fetch('http://localhost:5000/denuncia',{
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
    }) .then(res => res.json()).then(res => {setDenuncias(res)});
    },[]);
    return(
        
        <div className={Style.ContainerMinimal}>
            {denuncias.map((den,i)=> <div className={Style.DivItem}>
                <div className={Style.Ocult}>
                </div>
                
                <div>
                    <img key={den.picture} className={Style.Banner} src={den.picture} alt="imagem da denúncia cadastrada" />
                </div>
                <div>
                    <h4>
                    Rua
                    </h4>
                    <p key={den.rua}>
                        {den.rua}
                    </p>
                </div>
                <div>
                <h4>
                data de cadastro:
                </h4>
                <p key={den.data}>
                { den.data}  
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

export default Listagem