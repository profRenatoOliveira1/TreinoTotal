import './App.css'; 
import AppRouter from './routes'; 

/**
 * Main app
 * @returns web page
 */
function App() {
  return (
    <>
      <AppRouter /> {/* Renderiza o componente de roteamento */}
    </>
  );
}

export default App; // Exporta o componente App como padrão
