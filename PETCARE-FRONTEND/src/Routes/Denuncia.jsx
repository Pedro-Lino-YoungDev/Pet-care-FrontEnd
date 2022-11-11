import Style from '../Style/Home.module.css'
import { useLocation } from 'react-router-dom';import { Link } from 'react-router-dom';
import ButtonStyle from '../Style/Botao.module.css';

function Denuncia(){

    const location = useLocation();
    const { from } = location.state;
    var validador = new Boolean(false);


    //Data e horario atual;
    const DataAtual = new Date();
    const AnoAtual = DataAtual.getFullYear();
    const MesAtual = DataAtual.getMonth()+1;
    const DiaAtual = DataAtual.getDate();
    const HoraAtual = DataAtual.getHours();
    const MinutosAtuais = DataAtual.getMinutes();

    //Dia da denúncia;
    const DataDenuncia = from.data;
    const DataFormatada = DataDenuncia.split("/");
    const DiaDenuncia = parseInt(DataFormatada[0]);
    const MesDenuncia = parseInt(DataFormatada[1]);
    const AnoDenuncia = parseInt(DataFormatada[2]);

    //Hora e minutos da denúncia;
    const HorarioDenuncia = from.horario;
    const HorarioSeparada = HorarioDenuncia.split(":");
    const HoraDenuncia = parseInt(HorarioSeparada[0]);
    const MinutosDenuncia = parseInt(HorarioSeparada[1]);
    

    //validando a data da denúncia;
    if(AnoAtual>AnoDenuncia){
        validador = true;
    }

    else{
        if(MesAtual>MesDenuncia){
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
                {from["Ponto de referencia"]}
            </p>
        </div>

        <div>
            <h4>Descrição:</h4>
            <p>{from.Descricao}</p>
        </div>
        
        { validador == false &&
        <div className={Style.ContainerBtn}> 
        <Link className={ButtonStyle.Btn} to ="/modificardenuncia"  state={{from:from}}>Modificar</Link>
        </div>
        }
        </div>
    </div>
 )
}

export default Denuncia;