import api from './api';
import type { Diario } from '../types/Diario';

export const diarioService = {
  async listarTodos(): Promise<Diario[]> {
    const response = await api.get<Diario[]>('/diario');
    return response.data;
  },

  async buscarPorData(data: string): Promise<Diario | null> {
    const response = await api.get<Diario | null>(`/diario/${data}`);
    return response.data;
  },

  async salvar(diario: Omit<Diario, 'id'> & { id?: number }): Promise<Diario> {
    const response = await api.post<Diario>('/diario', diario);
    return response.data;
  },

  async excluir(data: string): Promise<void> {
    await api.delete(`/diario/${data}`);
  }
};
