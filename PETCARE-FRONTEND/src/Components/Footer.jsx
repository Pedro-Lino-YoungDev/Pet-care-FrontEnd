import Style from '../Style/Footer.module.css'
import Container from '../Style/Container.module.css'
import Link from './Link'
function footer(){
 return(
   <>
    <footer className={Style.Footer}>
      <div className={Style.FooterItem1}>
         <Link nome ="Sobre" url="Página Sobre"/>
      </div>
      <div  className={Style.FooterItem2}>
      <Link nome ="Fale Conosco" url="Página Fale Conosco"/>
      </div>
      <div className={Style.FooterItem3}>
      <Link nome ="Contato" url="Página Contato"/>
      </div>
    </footer>
    <div className={Style.Copyright}><h4 className={Style.h4}>© 2022 Copyright:</h4> 
    <Link nome ="YoungDev.com" url="Página Contato"/>
    </div>
    </>
 )
}

export default footer;