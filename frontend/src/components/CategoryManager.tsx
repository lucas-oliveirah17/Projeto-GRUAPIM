import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Categoria } from '../types/Categoria';

interface CategoryManagerProps {
  categorias: Categoria[];
  onAdd: (nome: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function CategoryManager({ categorias, onAdd, onDelete }: CategoryManagerProps) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    
    setLoading(true);
    try {
      await onAdd(nome);
      setNome(''); // Limpa o input se der sucesso
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', background: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Categorias</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da nova categoria..."
          className="task-input"
          disabled={loading}
          required
        />
        <button type="submit" className="btn-primary" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
          + Criar
        </button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {categorias.length === 0 ? (
          <span style={{ fontSize: '0.85em', color: '#666' }}>Nenhuma categoria disponível.</span>
        ) : (
          categorias.map(cat => (
            <span 
              key={cat.id} 
              style={{ 
                background: '#e2e8f0', 
                padding: '5px 12px', 
                borderRadius: '15px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '0.85em',
                color: '#334155',
                fontWeight: 'bold'
              }}
            >
              {cat.nome}
              <button 
                onClick={() => onDelete(cat.id)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#ef4444', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  fontSize: '1.2em',
                  lineHeight: '1',
                  padding: 0
                }} 
                title="Excluir Categoria"
              >
                &times;
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
}