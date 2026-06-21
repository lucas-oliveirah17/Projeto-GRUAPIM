import type { Tarefa } from '../types/Tarefa';

export const PrioridadeDescricao: Record<Tarefa['prioridade'], string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta'
};

export const StatusDescricao: Record<Tarefa['status'], string> = {
  PENDENTE: 'Pendente',
  CONCLUIDA: 'Concluída'
};

export const PrioridadeClasses: Record<Tarefa['prioridade'], string> = {
  BAIXA: 'badge-prioridade-baixa',
  MEDIA: 'badge-prioridade-media',
  ALTA: 'badge-prioridade-alta'
};