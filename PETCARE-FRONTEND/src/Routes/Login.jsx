import Style from '../Style/Login.module.css'
import Link from "../Components/LinkInterno"

function Login(){
    
    useEffect(() => {
    fetch('http://localhost:4000/users',{
        method: 'Post',
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
    }) .then(res => res.json()).then(res => {setDenuncias(res)});
    },[]);

    return(
        <div className={Style.ContainerMinimal}>
            <form action="Login" method="Post">

                <div className={Style.ContainerItem1}>
                <label htmlFor="Email">Email:</label>
                <br />
                <input className={Style.Input} type="Email" />
                </div>

                <div className={Style.ContainerItem}>
                <label htmlFor="Email">Senha:</label>
                <br />
                <input className={Style.Input} type="Password" />
                </div>
                <h4>
                    Não possui conta? Clique para se
                    <Link nome="Registrar" url="/Registro"/>
                </h4>
                <input className={Style.InputBtn} type="submit"/>
            </form>
        </div>
    )
}

export default Login