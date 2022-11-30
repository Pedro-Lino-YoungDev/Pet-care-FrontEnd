import Style from '../Style/ModificarCadastroDoUsuario.module.css'
import {useState} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'


function modificarcadastrodousuario() {



    if (localStorage.getItem("token") != null) {

        const DataAtual = new Date();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000);

        const token_jwt = localStorage.getItem("token");
        const TokenDecodificado = jwtDecode(token_jwt);


        if (TokenDecodificado.exp > HorarioTokenFormatado) {

            const location = useLocation();
            const { from } = location.state;

            const [foto,setFoto] = useState();
            const [foto2,setFoto2] = useState();

            const [nome,setNome] = useState(from.name);
            const [senha,setSenha] = useState();
            const [novaSenha, setNovaSenha] = useState();
            const [senhaVerificada, setSenhaVerificada] = useState();
            const [validador,setValidador] = useState(false);
            const [cancelar,setCancelar] = useState(false);

            const [resposta,setResposta] = useState();
            const [erro,setErro] = useState();

            const [chave, setChave] = useState("1");
            const [erroGeral, setErroGeral] = useState();
            const [texto, setTexto] = useState("Adicionar Imagem");

            const validar_opcoes = () =>{
                if (foto == from.photo) {
                    if(nome == null || nome == ""){
                        return "Seu nome não foi preenchido"
                    }
                    else if(nome == from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando apenas a senha"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null ){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome == from.name && validador == false){
                        if (senha == null) {
                            return "Sua senha não está preenchida"
                        }
                        else{
                            return "Você não modificou nada no seu cadastro"
                        }
                    }
                    else if (nome != from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando senha e nome"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome != from.name && validador == false){
                        if(senha != null){
                            return "modificando apenas o nome"
                        }
                        else {
                            return "Sua senha não está preenchida"
                        }
                    }
                }
                else{
                    if(nome == null || nome == ""){
                        return "Seu nome não foi preenchido"
                    }
                    else if(nome == from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando senha e foto"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null ){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome == from.name && validador == false){
                        if (senha == null) {
                            return "Sua senha não está preenchida"
                        }
                        else{
                            return "modificando apenas a foto"
                        }
                    }
                    else if (nome != from.name && validador == true){
                        if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada == novaSenha){
                            return "modificando tudo"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha != senha && senhaVerificada != novaSenha){
                            return "sua nova senha está diferente na verificação"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada != null && novaSenha == senha){
                            return "sua nova senha está igual a sua senha atual"
                        }
                        else if(senha != null && novaSenha != null && senhaVerificada == null){
                            return "seu campo de confirmar a senha não está preenchido"
                        }
                        else if(senha != null){
                            return "Você não preencheu sua nova senha"
                        }
                        else if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                    }
                    else if(nome != from.name && validador == false){
                        if(senha == null){
                            return "Sua senha não está preenchida"
                        }
                        else {
                            return "modificando nome e foto"
                        }
                    }

                }
            }
            const dados_post = (e) =>{
                if(e == "sem senha nova"){
                    const user = {
                        "photo": foto,
                        "name": nome,
                        "email": from.email,
                        "password": senha,
                        "token" : token_jwt
                    }
                    return user;
                }
                else if (e == "com senha nova"){
                    const user = {
                        "photo":foto,
                        "name": nome,
                        "email": from.email,
                        "password": senha,
                        "newPassword": senhaVerificada,
                        "token" : token_jwt
                    }
                    return user
                }
            }
            const set_nome = (value) => {
                if (value == null || value == "") {
                    setNome(null);
                }
                else{
                    setNome(value);
                }
            }
            const set_senha = (value) =>{
                if (value == null || value == "") {
                    setSenha(null);
                }
                else{
                    setSenha(value);
                }        
            }
            const set_nova_senha = (value) =>{
                if (value == null || value == "") {
                    setNovaSenha(null);
                }
                else{
                    setNovaSenha(value);
                }        
            }
            const set_nova_senha_verificada = (value) =>{
                if (value == null || value == "") {
                    setSenhaVerificada(null);
                }
                else{
                    setSenhaVerificada(value);
                }
            }
            const validar = () =>{
                setValidador(!validador)
            }

            const put = (e) => {
                axios.put('https://backend-petcare.herokuapp.com/usuario/'+from.id,dados_post(e))
                .then((res) => setResposta(res.data.message))
                .catch((res) => setErro(res.response.data.message))   
            }
            const converter_imagem = (e) =>{
                if(e != undefined && e != null){
                    const imagemCarregada = e[0];
                    const arquivo = new FileReader ();

                    arquivo.onload = function (arquivoCarregado) {
                        const image= arquivoCarregado.target.result;
                        setFoto(image);
                    }
                    arquivo.readAsDataURL(imagemCarregada);
                }
            }

            return(
                <div className={Style.ContainerMinimal}>
                    <form className={Style.form} action="Cadastro" method="Post" encType="multipart/form-data">
                            <div className={Style.ItemForm}>
                                {foto != undefined &&(
                                    <img className={Style.Imagem} src={foto} alt="" />
                                )
                                }
                                {foto == undefined &&(
                                    <img className={Style.Imagem} src={null} alt="" />
                                )
                                }
                                <label className={Style.FileLabel} htmlFor="PrimeiraImg"> {texto} </label>
                                { foto != null &&(
                                <a className={Style.Logout} onClick={() => {setFoto(undefined) , setTexto("Adicionar Imagem") , setChave("2")}}>X</a>
                                )
                                }
                                <input className={Style.InputFile} key={chave} type="file" accept="image/*" name="image" id="PrimeiraImg" onChange ={(e) => {converter_imagem(e.target.files) , setTexto("") , setChave("1")}}/>
                            </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nome:</label>
                            <input className={Style.Input}  value={nome} type="Text" id= "Nome" placeholder= "Exemplo: Caramelo" onChange={(e) => {set_nome(e.target.value), setErroGeral(null)}}/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Email">Email:</label>
                            <input className={Style.Input} value={from.email} type="Text" id= "Email" placeholder= "Exemplo: Caramelo" disabled/>
                        </div>
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="senha">Senha Atual:</label>
                            <input className={Style.Input} value={senha} type="password" id= "Senha"onChange={(e) => {set_senha(e.target.value), setErroGeral(null)}}/>
                        </div>
                        <div>
                            <br />
                            <label className={Style.Label} htmlFor="check">Deseja Modificar a Senha?</label>
                            <input className={Style.Input} type="checkbox" id= "check" checked={validador} onChange={(e) => {validar(), set_nova_senha("") , set_nova_senha_verificada("") , setErroGeral(null)}}/>
                        </div>
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Nova Senha:</label>
                            <input className={Style.Input} value={novaSenha} type="password" id= "SenhaNova"onChange={(e) => {setNovaSenha(e.target.value), setErroGeral(null)}}/>
                        </div>
                        )
                        }
                        {validador == true &&(
                        <div className={Style.ItemForm}>
                            <label className={Style.Label} htmlFor="Nome">Confirmar Nova Senha:</label>
                            <input className={Style.Input} value={senhaVerificada} type="password" id= "SenhaVerificada"onChange={(e) => {setSenhaVerificada(e.target.value), setErroNovaSenha(false)}}/>
                        </div>
                        )
                        }
                        {erro == "login attempt failed" &&(
                            <h4 className={Style.error}>                
                                Oops! a sua senha está incorreta     
                            </h4>
                        )
                        }
                    </form>
                    {erroGeral != null &&(
                        <h4 className={Style.erro}>
                            {erroGeral}
                        </h4>
                    )
                    }
                    {validar_opcoes() == "Seu nome não foi preenchido" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Seu nome não foi preenchido")}>Enviar</a>
                        </div>
                    )
                    }
                    {validar_opcoes() == "Você não modificou nada no seu cadastro" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Você não modificou nada no seu cadastro")}>Enviar</a>
                        </div>
                    )
                    }
                    {validar_opcoes() == "Sua senha não está preenchida" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Sua senha não está preenchida")}>Enviar</a>
                        </div>      
                    )
                    }
                    {validar_opcoes() == "Você não preencheu sua nova senha" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("Você não preencheu sua nova senha")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "seu campo de confirmar a senha não está preenchido" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("seu campo de confirmar a senha não está preenchido")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "sua nova senha está igual a sua senha atual" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("sua nova senha está igual a sua senha atual")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "sua nova senha está diferente na verificação" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => setErroGeral("sua nova senha está diferente na verificação")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando apenas a foto" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("sem senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando apenas o nome" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("sem senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando nome e foto" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("sem senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando apenas a senha" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando senha e foto" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando senha e nome" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }
                    {validar_opcoes() == "modificando tudo" &&(
                        <div className={Style.DivBtn}>
                            <a className={Style.Btn} onClick={() => put("com senha nova")}>Enviar</a>
                        </div>   
                    )
                    }

                    <div className={Style.DivBtn}>
                        <a className={Style.Btn} onClick={() => setCancelar(true)}>
                            Cancelar
                        </a>
                    </div>
                    {cancelar == true &&(
                        <Navigate to="/usuario"/>
                    )
                    }
                    {resposta == "records updated successfully with new passowrd"&&(
                        <Navigate to="/home"/>
                    )
                    }
                    {resposta == "records updated successfully old password" &&(
                        <Navigate to="/home"/>
                    )}
                    {erro == "token has expired" &&(
                        <Navigate to="/login"/>
                    )
                    }
                </div>
            )
        }
        else{
            return <Navigate to="/login" />
        }
    }
    else{
        return <Navigate to="/login" />
    }
}
export default modificarcadastrodousuario