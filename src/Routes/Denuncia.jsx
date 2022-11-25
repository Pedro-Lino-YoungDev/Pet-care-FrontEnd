import Style from '../Style/Denuncia.module.css'
import { Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ButtonStyle from '../Style/Botao.module.css';
import jwtDecode from 'jwt-decode'
import Botao from '../Components/Botao'



function Denuncia(){
    
    if (localStorage.getItem("token") != null) {

        const token_jwt = localStorage.getItem("token");
        const decodificado = jwtDecode(token_jwt);
        var validador = new Boolean(false);

        //Data e horario atual;
        const DataAtual = new Date();
        const AnoAtual = DataAtual.getFullYear();
        const MesAtual = DataAtual.getMonth()+1;
        const DiaAtual = DataAtual.getDate();
        const HoraAtual = DataAtual.getHours();
        const MinutosAtuais = DataAtual.getMinutes();
        const HorarioTokenFormatado = parseInt(DataAtual.valueOf()/1000)

        

        if (decodificado.exp > HorarioTokenFormatado) {

            const location = useLocation();
            const { from } = location.state;

            //Data completa da denúncia;
            const DataDenuncia = from["created_at"].split("T");

            //Dia da denúncia;
            const DataFormatada = DataDenuncia[0].split("-");
            const DiaDenuncia = parseInt(DataFormatada[2]);
            const MesDenuncia = parseInt(DataFormatada[1]);
            const AnoDenuncia = parseInt(DataFormatada[0]);

            //Hora e minutos da denúncia;
            const HorarioDenuncia = DataDenuncia[1].split(".");
            const HorarioSeparada = HorarioDenuncia[0].split(":");
            const HoraDenuncia = parseInt(HorarioSeparada[0]);
            const MinutosDenuncia = parseInt(HorarioSeparada[1]);

            //validando a data da denúncia;
            if(AnoAtual>AnoDenuncia ){
                validador = true;
            }
            else{
                if(MesAtual>MesDenuncia ){
                    validador = true;
                }
                else{
                    if (DiaAtual>DiaDenuncia+1){
                        validador = true;
                    }
                    else if(DiaAtual>DiaDenuncia){
                        if(HoraAtual>HoraDenuncia){
                            validador = true;
                        }
                        else if(HoraAtual==HoraDenuncia && MinutosAtuais>= MinutosDenuncia){
                            validador = true;
                        }
                    }
                }
        
            }

            const formatar_horario = (e) =>{
                const DataSeparada = e.split("T");
                const HorarioSeparado = DataSeparada[1].split(".")
                return HorarioSeparado[0];
            }

            const formatar_data = (e) =>{
                const DataSeparada = e.split("T");
                return DataSeparada[0];
            }

            return(
                <div className={Style.ContainerMinimal}>
                    <div>
                        <img className={Style.Banner} src={from.picture} alt="imagem do cachorro" />
                    </div> 
                    <div className={Style.DivText}>
                        <div>
                            <h4>
                                Tipo do animal:
                            </h4>
                            <p>
                                {from.tipo}
                            </p>
                        </div>
                
                        <div>
                            <h4>
                                Cor do animal:
                            </h4>
                            <p>
                                {from.cor}
                            </p>
                        </div>
                
                        <div>
                            <h4> 
                                Rua:
                            </h4>
                            <p>
                                {from.rua}
                            </p>
                        </div>
                
                        <div>
                            <h4>
                                Bairro:
                            </h4>
                            <p>
                                {from.bairro}
                            </p>
                        </div>
                
                        <div>
                            <h4>
                                Ponto de Referência:
                            </h4>
                            <p>
                                {from["pontoDeReferencia"]}
                            </p>
                        </div>
                        <div>
                            <h4>
                                Data de Cadastro:
                            </h4>
                            <p>
                            {formatar_data(from["created_at"])} as {formatar_horario(from["created_at"])}
                            </p>
                        </div>
                        <div>
                            <h4>
                                Ultima Atualização:
                            </h4>
                            <p>
                            {formatar_data(from["updated_at"])} as {formatar_horario(from["updated_at"])}
                            </p>
                        </div>
                        <div>
                             <h4>
                                Descrição
                             </h4>
                            <p>{from.descricao}</p>
                        </div>
                        
                        
                        <div className={Style.ContainerBtn}> 
                            {validador == false &&(
                                <Botao tipo="redirecionar" nome="Modificar" estado={{from:from}} rota="/modificardenuncia"></Botao>
                            )
                            }
                        </div>
                        
                    </div>
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

export default Denuncia;