import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { ROUTES } from './appconfig';
import Home from './pages/Home/Home'; 
import CadastroAparelho from './pages/Aparelho/AparelhoCadastro';
import ListarAparelho from './pages/Aparelho/AparelhoListagem'; 
import CadastroExercicio from './pages/Exercicio/ExercicioCadastro'; 
import ListarExercicio from './pages/Exercicio/ExercicioListagem'; 
import CadastroAluno from './pages/Aluno/AlunoCadastro'; 
import ListarAluno from './pages/Aluno/AlunoListagem'; 
import CadastroProfessor from './pages/Professor/ProfessorCadastro'; 
import ListarProfessor from './pages/Professor/ProfessorListagem';
import CadastroTreino from './pages/CriarTreino/CriarTreino';
import ListarTreino from './pages/FichaTreino/FichaTreino';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/Rotas/ProtectedRoute';
import ProfessorAtualizarSenha from './pages/Professor/ProfessorAtulizarSenha';
import FichaProfessor from './pages/FichaTreino/FichaProfessor';
import AlunoUpdate from './pages/Aluno/AlunoUpdate';
import AparelhoUpdate from './pages/Aparelho/AparelhoUpdate';
import ExercicioUpdate from './pages/Exercicio/ExercicioUpdate';
import ProfessorUpdate from './pages/Professor/ProfessorUpdate';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas principais */}
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />

                {/* Rotas protegidas */}
                {/* Rotas aluno */}
                <Route path={ROUTES.CADASTRO_ALUNO} element={<ProtectedRoute element={CadastroAluno} />} />
                <Route path={ROUTES.LISTAGEM_ALUNO} element={<ProtectedRoute element={ListarAluno} />} />
                <Route path={ROUTES.ATUALIZAR_ALUNO} element={<ProtectedRoute element={AlunoUpdate}/>} />
                
                {/* Rotas professor */}
                <Route path={ROUTES.CADASTRO_PROFESSOR} element={<ProtectedRoute element={CadastroProfessor} />} />
                <Route path={ROUTES.LISTAGEM_PROFESSOR} element={<ProtectedRoute element={ListarProfessor} />} />
                <Route path={ROUTES.ATUALIZAR_PROFESSOR} element={<ProtectedRoute element={ProfessorUpdate}/>} />
                <Route path={ROUTES.FICHA_PROFESSOR} element={<ProtectedRoute element={FichaProfessor} />} />
                <Route path={ROUTES.ATUALIZAR_SENHA_PROFESSOR} element={<ProtectedRoute element={ProfessorAtualizarSenha} />} />

                {/* Rotas exercicio */}
                <Route path={ROUTES.CADASTRO_EXERCICIO} element={<ProtectedRoute element={CadastroExercicio} />} />
                <Route path={ROUTES.LISTAGEM_EXERCICIO} element={<ProtectedRoute element={ListarExercicio} />} />
                <Route path={ROUTES.ATUALIZAR_EXERCICIO} element={<ProtectedRoute element={ExercicioUpdate}/>} />

                {/* Rotas aparelho */}
                <Route path={ROUTES.CADASTRO_APARELHO} element={<ProtectedRoute element={CadastroAparelho} />} />
                <Route path={ROUTES.LISTAGEM_APARELHO} element={<ProtectedRoute element={ListarAparelho} />} />
                <Route path={ROUTES.ATUALIZAR_APARELHO} element={<ProtectedRoute element={AparelhoUpdate}/>} />
                
                {/* Rotas treino */}
                <Route path={ROUTES.CADASTRO_TREINO} element={<ProtectedRoute element={CadastroTreino} />} />
                <Route path={ROUTES.LISTAGEM_TREINO} element={<ProtectedRoute element={ListarTreino} />} />                
            </Routes>
        </BrowserRouter>
    );
}
