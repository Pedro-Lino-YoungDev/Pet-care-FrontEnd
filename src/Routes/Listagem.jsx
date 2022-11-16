import { useEffect, useState } from 'react';
import Style from '../Style/Listagem.module.css';
import { Link, Navigate } from 'react-router-dom';
import ButtonStyle from '../Style/Botao.module.css';
import axios from 'axios';


function Listagem(){
    
    const[denuncias, setDenuncias] = useState([]);


    const token = {
        "token" : sessionStorage.getItem("token")
    }

    useEffect(() => {
    axios.post("https://backend-petcare.herokuapp.com/denuncias",token)
    .then((res) => setDenuncias(res.data))
    .catch()

    },[]);

    

    if (sessionStorage.getItem("token") != null) {   
    
    return(
        
        

        <div className={Style.ContainerMinimal}>
            {
                denuncias &&(
                    console.log(denuncias)
                )
            }
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
                <p key={den["created_at"]}>
                {den["created_at"]}  
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
    return(
        <Navigate to="/login" />
    )
}
}

export default Listagem