import Style from '../Style/Botao.module.css';
import {Link} from 'react-router-dom';

function Botao({item, url}){
    return(
        <Link className={Style.Btn} to ={url}>{item}</Link>
    )
}

export default Botao;