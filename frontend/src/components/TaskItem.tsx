import type { Tarefa } from '../types/Tarefa';
import { PrioridadeDescricao, PrioridadeClasses } from '../utils/mapeamentos';

interface TaskItemProps {
  tarefa: Tarefa;
  onConcluir: (id: number) => void;
  onEditar: (tarefa: Tarefa) => void;
  onExcluir: (id: number) => void;
}

export default function TaskItem({ tarefa, onConcluir, onEditar, onExcluir }: TaskItemProps) {
  return (
    <li className={`task-item ${tarefa.status === 'CONCLUIDA' ? 'concluida' : 'pendente'}`}>
      <div className="task-content">
        <strong className={`task-title ${tarefa.status === 'CONCLUIDA' ? 'concluida' : ''}`}>
          {tarefa.titulo}
        </strong>

        <span className={`badge-prioridade ${PrioridadeClasses[tarefa.prioridade]}`}>
          {PrioridadeDescricao[tarefa.prioridade]}
        </span>
        
        {tarefa.categorias && tarefa.categorias.length > 0 && (
          <div className="category-badge-list">
            {tarefa.categorias.map(cat => (
              <span key={cat.id} className="category-badge">{cat.nome}</span>
            ))}
          </div>
        )}
        
        {tarefa.dataLimite && (
          <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📅</span> Prazo: {new Date(tarefa.dataLimite + 'T00:00:00').toLocaleDateString('pt-BR')}
          </div>
        )}
        
        {tarefa.descricao && <p style={{ margin: '8px 0 0 0', fontSize: '0.9em', color: '#555' }}>{tarefa.descricao}</p>}
      </div>
      
      <div className="task-actions">
        {tarefa.status === 'PENDENTE' && (
          <button onClick={() => onConcluir(tarefa.id)} className="btn-success">✔ Concluir</button>
        )}
        <button onClick={() => onEditar(tarefa)} className="btn-primary" style={{ backgroundColor: '#ffc107', color: '#000' }}>✎ Editar</button>
        <button onClick={() => onExcluir(tarefa.id)} className="btn-primary" style={{ backgroundColor: '#dc3545' }}>✖ Excluir</button>
      </div>
    </li>
  );
}