import Style from '../Style/Registro.module.css'

function Registro(){
    return(
        <div className={Style.ContainerMinimal}>
            <form action="Login" method="Post">

                <div className={Style.ContainerItem1}>
                <label htmlFor="Email">Email:</label>
                <br />
                <input className={Style.Input} type="Email" />
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="Name">Nome do Usurio :</label>
                <br />
                <input className={Style.Input} type="Name" />
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="Password">Senha:</label>
                <br />
                <input className={Style.Input} type="Password" />
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="PasswordConfirm">Confirmar Senha:</label>
                <br />
                <input className={Style.Input} type="Password" />
                </div>

                <input className={Style.InputBtn} type="submit" />
            </form>
        </div>
    )
}

export default Registro