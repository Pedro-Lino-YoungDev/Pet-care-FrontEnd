import ContainerStyle from '../Style/Container.module.css'
import Nav from '../Style/Navbar.module.css'
import LogoStyle from '../Style/Logo.module.css'
import Links from './Link'
import {Link} from 'react-router-dom'


function Navbar(){

    return(
        <nav className= {Nav.Nav}>
            <div className={Nav.NavLogo}>
                <Link to="/home">
                    <img className={LogoStyle.PetCare} src="src/Imagens/Logo.png" alt="Logo Pet Care" />
                </Link>
            </div>
            <div className={Nav.NavItem}>
                <Links nome = "Cadastrar Denúncia" url = "/cadastro"/>
            </div>
            <div className={Nav.NavItem}>
                <Links nome = "Ver Denúncias Cadastradas" url = "/listagem"/>
            </div>
            <div className={Nav.NavPerfil}>

            </div>
        </nav>
)
}
export default Navbar