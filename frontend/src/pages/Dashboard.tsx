import { useEffect, useState } from 'react';
import api from '../services/api';
import { ApiError } from '../exceptions/ApiError';
import type { Tarefa, TarefaRequest } from '../types/Tarefa';
import type { Categoria } from '../types/Categoria';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import CategoryManager from '../components/CategoryManager'; // <-- Importado
import './Dashboard.css';

export default function Dashboard() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erroGlobal, setErroGlobal] = useState<string | null>(null);
  
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);

  const atualizarListas = async () => {
    try {
      const [resTarefas, resCategorias] = await Promise.all([
        api.get<Tarefa[]>('/tarefas'),
        api.get<Categoria[]>('/categorias')
      ]);
      setTarefas(resTarefas.data);
      setCategorias(resCategorias.data);
      setErroGlobal(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setErroGlobal(error.message);
      } else {
        setErroGlobal("Erro desconhecido ao carregar os dados.");
      }
    }
  };

  useEffect(() => {
    let montado = true;

    const buscarInicial = async () => {
      try {
        const [resTarefas, resCategorias] = await Promise.all([
          api.get<Tarefa[]>('/tarefas'),
          api.get<Categoria[]>('/categorias')
        ]);
        if (montado) {
          setTarefas(resTarefas.data);
          setCategorias(resCategorias.data);
          setErroGlobal(null);
        }
      } catch (error) {
        if (montado) {
          if (error instanceof ApiError) setErroGlobal(error.message);
          else setErroGlobal("Erro desconhecido ao carregar os dados.");
        }
      } finally {
        if (montado) setCarregando(false);
      }
    };

    buscarInicial();
    return () => { montado = false; };
  }, []);

  const criarCategoria = async (nome: string) => {
    try {
      setErroGlobal(null);
      await api.post('/categorias', { nome });
      await atualizarListas();
    } catch (error) {
      if (error instanceof ApiError) setErroGlobal(`Erro ao criar categoria: ${error.message}`);
      throw error;
    }
  };

  const excluirCategoria = async (id: number, force: boolean = false) => {
    if (!force && !window.confirm("Deseja excluir esta categoria?")) return;
    
    try {
      setCarregando(true);
      setErroGlobal(null);
      await api.delete(`/categorias/${id}?force=${force}`);
      await atualizarListas();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          const confirmarForcado = window.confirm(
            `${error.message}\n\nDeseja removê-la das tarefas e excluir mesmo assim?`
          );
          
          if (confirmarForcado) {
            await excluirCategoria(id, true);
          }
        } else {
          setErroGlobal(`Erro ao excluir categoria: ${error.message}`);
        }
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvarTarefa = async (dadosDaTarefa: TarefaRequest) => {
    try {
      setCarregando(true); 
      setErroGlobal(null);
      
      if (tarefaEditando) {
        await api.put(`/tarefas/${tarefaEditando.id}`, dadosDaTarefa);
      } else {
        await api.post('/tarefas', dadosDaTarefa);
      }
      
      setTarefaEditando(null);
      await atualizarListas();
    } catch (error) {
      if (error instanceof ApiError) setErroGlobal(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const concluirTarefa = async (id: number) => {
    try {
      setCarregando(true);
      setErroGlobal(null);
      await api.patch(`/tarefas/${id}/concluir`);
      await atualizarListas();
    } catch (error) {
      if (error instanceof ApiError) setErroGlobal(`Erro ao concluir: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  const excluirTarefa = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    try {
      setCarregando(true);
      setErroGlobal(null);
      await api.delete(`/tarefas/${id}`);
      await atualizarListas();
    } catch (error) {
      if (error instanceof ApiError) setErroGlobal(`Erro ao excluir: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Painel de Tarefas</h2>
      
      {erroGlobal && <div className="error-message"><strong>Erro:</strong> {erroGlobal}</div>}
      
      <CategoryManager 
        categorias={categorias} 
        onAdd={criarCategoria} 
        onDelete={excluirCategoria} 
      />
      
      <TaskForm 
        key={tarefaEditando ? tarefaEditando.id : 'nova'}
        tarefaEmEdicao={tarefaEditando}
        categoriasDisponiveis={categorias}
        onSubmit={handleSalvarTarefa}
        onCancel={() => setTarefaEditando(null)}
      />

      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada. Crie a primeira!</p>
      ) : (
        <ul className="task-list">
          {tarefas.map(tarefa => (
            <TaskItem 
              key={tarefa.id}
              tarefa={tarefa}
              onConcluir={concluirTarefa}
              onEditar={setTarefaEditando}
              onExcluir={excluirTarefa}
            />
          ))}
        </ul>
      )}
    </div>
  );
}