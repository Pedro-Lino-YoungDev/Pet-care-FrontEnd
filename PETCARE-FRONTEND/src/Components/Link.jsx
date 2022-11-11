import Style from '../Style/Link.module.css'
import {Link} from 'react-router-dom'

function link({nome,url}) {
    return(
    <Link className={Style.Link} to ={url}> {nome}</Link>
    )
}

export default link