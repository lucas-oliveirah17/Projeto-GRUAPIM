import type { Categoria } from './Categoria';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  status: 'PENDENTE' | 'CONCLUIDA';
  categorias: Categoria[];
  dataLimite?: string; // YYYY-MM-DD
}

export interface TarefaRequest {
  titulo: string;
  descricao: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  categoriaIds: number[];
  dataLimite?: string; // YYYY-MM-DD
}