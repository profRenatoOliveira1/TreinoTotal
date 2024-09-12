import { useLocation } from 'react-router-dom';
import Navegacao from '../../components/Navegacao/Navegacao';
import { FiUser } from "react-icons/fi";
import style from "./Ficha.module.css";

function FichaProfessor() {
    const location = useLocation();
    const objetoProfessor = location.state.professor;

    return (
        <>
            <Navegacao />

            <div className={style.fichaProfessor}>
                <div className={style.fotoPerfil}>
                    <FiUser style={{ fontSize: '60px', color: 'white' }} />
                </div>
                <h1>{objetoProfessor.nome}</h1>
                
                <div className={style.detalhes}>
                    <div>
                        <strong>CPF</strong>
                        <p>{objetoProfessor.cpf}</p>
                    </div>
                    <div>
                        <strong>NASCIMENTO</strong>
                        <p>{objetoProfessor.data_nascimento}</p>
                    </div>
                    <div className={style.endereco}>
                        <strong>ENDEREÇO</strong>
                        <p>{objetoProfessor.endereco}</p>
                    </div>
                    <div>
                        <strong>CELULAR</strong>
                        <p>{objetoProfessor.celular}</p>
                    </div>
                    <div>
                        <strong>DT CONTRATAÇÃO</strong>
                        <p>{objetoProfessor.data_contratacao}</p>
                    </div>
                    <div>
                        <strong>FORMAÇÃO</strong>
                        <p>{objetoProfessor.formacao}</p>
                    </div>
                    <div>
                        <strong>ESPECIALIDADE</strong>
                        <p>{objetoProfessor.especialidade}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FichaProfessor;