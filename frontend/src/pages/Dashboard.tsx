import { useEffect, useState } from 'react';
import api from '../services/api';
import { ApiError } from '../exceptions/ApiError';
import type { Tarefa, TarefaRequest } from '../types/Tarefa';
import type { Categoria } from '../types/Categoria';
import type { Diario } from '../types/Diario';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import CategoryManager from '../components/CategoryManager';
import Calendar from '../components/Calendar';
import DiaryEditor from '../components/DiaryEditor';
import { diarioService } from '../services/diarioService';
import './Dashboard.css';

export default function Dashboard() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [diarios, setDiarios] = useState<Diario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erroGlobal, setErroGlobal] = useState<string | null>(null);
  
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
  
  const [activeTab, setActiveTab] = useState<'tasks' | 'calendar'>('tasks');
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });

  const atualizarListas = async () => {
    try {
      const [resTarefas, resCategorias, resDiarios] = await Promise.all([
        api.get<Tarefa[]>('/tarefas'),
        api.get<Categoria[]>('/categorias'),
        diarioService.listarTodos()
      ]);
      setTarefas(resTarefas.data);
      setCategorias(resCategorias.data);
      setDiarios(resDiarios);
      setErroGlobal(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setErroGlobal(error.message);
      } else {
        setErroGlobal("Erro desconhecido ao carregar os dados.");
      }
    }
  };

  const atualizarDiarios = async () => {
    try {
      const res = await diarioService.listarTodos();
      setDiarios(res);
    } catch (error) {
      console.error("Erro ao recarregar diários:", error);
    }
  };

  useEffect(() => {
    let montado = true;

    const buscarInicial = async () => {
      try {
        const [resTarefas, resCategorias, resDiarios] = await Promise.all([
          api.get<Tarefa[]>('/tarefas'),
          api.get<Categoria[]>('/categorias'),
          diarioService.listarTodos()
        ]);
        if (montado) {
          setTarefas(resTarefas.data);
          setCategorias(resCategorias.data);
          setDiarios(resDiarios);
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
      <div className="dashboard-header-brand">
        <h1>📖 Journaling App</h1>
        <div className="dashboard-navigation">
          <button 
            className={`nav-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tasks')}
          >
            📋 Minhas Tarefas
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`} 
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendário & Diário
          </button>
        </div>
      </div>
      
      {erroGlobal && <div className="error-message"><strong>Erro:</strong> {erroGlobal}</div>}
      
      {activeTab === 'tasks' ? (
        <div className="tasks-tab-content">
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
      ) : (
        <div className="calendar-diario-tab-view">
          <div className="calendar-left-pane">
            <Calendar 
              selectedDateStr={selectedDateStr}
              onSelectDate={setSelectedDateStr}
              tarefas={tarefas}
              diarios={diarios}
            />
          </div>
          <div className="diario-right-pane">
            <DiaryEditor 
              selectedDateStr={selectedDateStr}
              onSaveSuccess={atualizarDiarios}
            />
          </div>
        </div>
      )}
    </div>
  );
}