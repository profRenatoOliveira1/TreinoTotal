import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
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

// Componente de roteamento da aplicação
export default function AppRouter() {
    return (
        <BrowserRouter> {/* Componente de navegação de rotas */}
            <Routes> {/* Componente de rotas */}
                <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
                <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
                {/* Rotas protegidas */}
                <Route path="/Cadastro/Aluno" element={<ProtectedRoute element={CadastroAluno} />} /> {/* Rota para o cadastro de aluno */}
                <Route path="/Listagem/Aluno" element={<ProtectedRoute element={ListarAluno} />} /> {/* Rota para listar alunos */}
                <Route path="/Cadastro/Professor" element={<ProtectedRoute element={CadastroProfessor} />} /> {/* Rota para o cadastro de professor */}
                <Route path="/Listagem/Professor" element={<ProtectedRoute element={ListarProfessor} />} /> {/* Rota para listar professores */}
                <Route path="/Cadastro/Exercicio" element={<ProtectedRoute element={CadastroExercicio} />} /> {/* Rota para o cadastro de exercício */}
                <Route path="/Listagem/Exercicio" element={<ProtectedRoute element={ListarExercicio} />} /> {/* Rota para listar exercícios */}
                <Route path="/Cadastro/Aparelho" element={<ProtectedRoute element={CadastroAparelho} />} /> {/* Rota para o cadastro de aparelho */}
                <Route path="/Listagem/Aparelho" element={<ProtectedRoute element={ListarAparelho} />} /> {/* Rota para listar aparelhos */}
                <Route path="/Cadastro/Treino" element={<ProtectedRoute element={CadastroTreino} />} /> {/* Rota para listar aparelhos */}
                <Route path="/Listagem/Treino" element={<ProtectedRoute element={ListarTreino} />} /> {/* Rota para listar aparelhos */}
                <Route path="/Atualizar/Senha/Professor" element={<ProtectedRoute element={ProfessorAtualizarSenha} />} />
                <Route path="/ficha/professor" element={<ProtectedRoute element={FichaProfessor} />} />
            </Routes>
        </BrowserRouter>
    );
}
