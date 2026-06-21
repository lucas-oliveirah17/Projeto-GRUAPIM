import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Tarefa, TarefaRequest } from '../types/Tarefa';
import type { Categoria } from '../types/Categoria';
import { PrioridadeDescricao } from '../utils/mapeamentos';

interface TaskFormProps {
  tarefaEmEdicao: Tarefa | null;
  categoriasDisponiveis: Categoria[];
  onSubmit: (tarefa: TarefaRequest) => void;
  onCancel: () => void;
}

export default function TaskForm({ tarefaEmEdicao, categoriasDisponiveis, onSubmit, onCancel }: TaskFormProps) {
  const [titulo, setTitulo] = useState(tarefaEmEdicao?.titulo || '');
  const [descricao, setDescricao] = useState(tarefaEmEdicao?.descricao || '');
  const [prioridade, setPrioridade] = useState<'ALTA' | 'MEDIA' | 'BAIXA'>(tarefaEmEdicao?.prioridade || 'MEDIA');
  
  const [categoriaIds, setCategoriaIds] = useState<number[]>(
    tarefaEmEdicao?.categorias.map(c => c.id) || []
  );

  const toggleCategoria = (id: number) => {
    setCategoriaIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onSubmit({ titulo, descricao, prioridade, categoriaIds });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{tarefaEmEdicao ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
      
      <input 
        type="text" 
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título da tarefa..."
        className="task-input"
        required
      />
      
      <textarea 
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição detalhada..."
        className="task-input"
        rows={3}
      />
      
      <select 
        value={prioridade} 
        onChange={(e) => setPrioridade(e.target.value as 'ALTA' | 'MEDIA' | 'BAIXA')}
        className="task-input"
      >
        {Object.entries(PrioridadeDescricao).map(([valor, desc]) => (
          <option key={valor} value={valor}>
            Prioridade: {desc}
          </option>
        ))}
      </select>

      {categoriasDisponiveis.length > 0 && (
        <div className="category-manager">
          <strong>Categorias:</strong>
          <div className="category-list">
            {categoriasDisponiveis.map(cat => (
              <label key={cat.id}>
                <input 
                  type="checkbox" 
                  checked={categoriaIds.includes(cat.id)}
                  onChange={() => toggleCategoria(cat.id)}
                />
                {cat.nome}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {tarefaEmEdicao ? 'Salvar Alterações' : 'Criar Tarefa'}
        </button>
        {tarefaEmEdicao && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}