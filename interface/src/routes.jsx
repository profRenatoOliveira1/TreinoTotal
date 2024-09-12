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
import AlunoUpdate from './pages/Aluno/AlunoUpdate';
import AparelhoUpdate from './pages/Aparelho/AparelhoUpdate';
import ExercicioUpdate from './pages/Exercicio/ExercicioUpdate';
import ProfessorUpdate from './pages/Professor/ProfessorUpdate';

// Componente de roteamento da aplicação
export default function AppRouter() {
    return (
        <BrowserRouter> {/* Componente de navegação de rotas */}
            <Routes> {/* Componente de rotas */}
                <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
                <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
                {/* Rotas protegidas */}
                {/* Rotas Aluno */}
                <Route path="/cadastro/aluno" element={<ProtectedRoute element={CadastroAluno} />} /> {/* Rota para o cadastro de aluno */}
                <Route path="/listagem/aluno" element={<ProtectedRoute element={ListarAluno} />} /> {/* Rota para listar alunos */}
                <Route path="/atualizar/aluno" element={<ProtectedRoute element={AlunoUpdate}/>} />
                
                {/* Rotas Professor */}
                <Route path="/cadastro/professor" element={<ProtectedRoute element={CadastroProfessor} />} /> {/* Rota para o cadastro de professor */}
                <Route path="/listagem/professor" element={<ProtectedRoute element={ListarProfessor} />} /> {/* Rota para listar professores */}
                <Route path="/atualizar/professor" element={<ProtectedRoute element={ProfessorUpdate}/>}/>
                <Route path="/ficha/professor" element={<ProtectedRoute element={FichaProfessor} />} />
                <Route path="/atualizar/senha/professor" element={<ProtectedRoute element={ProfessorAtualizarSenha} />} />

                {/* Rotas Exercicio */}
                <Route path="/cadastro/exercicio" element={<ProtectedRoute element={CadastroExercicio} />} /> {/* Rota para o cadastro de exercício */}
                <Route path="/listagem/exercicio" element={<ProtectedRoute element={ListarExercicio} />} /> {/* Rota para listar exercícios */}
                <Route path="/atualizar/exercicio" element={<ProtectedRoute element={ExercicioUpdate}/>}/>

                {/* Rotas Aparelho */}
                <Route path="/cadastro/aparelho" element={<ProtectedRoute element={CadastroAparelho} />} /> {/* Rota para o cadastro de aparelho */}
                <Route path="/listagem/aparelho" element={<ProtectedRoute element={ListarAparelho} />} /> {/* Rota para listar aparelhos */}
                <Route path='/atualizar/aparelho' element={<ProtectedRoute element={AparelhoUpdate}/>}/>
                
                {/* Rotas Aparelho */}
                <Route path="/cadastro/treino" element={<ProtectedRoute element={CadastroTreino} />} /> {/* Rota para listar aparelhos */}
                <Route path="/listagem/treino" element={<ProtectedRoute element={ListarTreino} />} /> {/* Rota para listar aparelhos */}                
            </Routes>
        </BrowserRouter>
    );
}
