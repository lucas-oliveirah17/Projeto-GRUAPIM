import type { Categoria } from './Categoria';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  status: 'PENDENTE' | 'CONCLUIDA';
  categorias: Categoria[];
}

export interface TarefaRequest {
  titulo: string;
  descricao: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  categoriaIds: number[];
}