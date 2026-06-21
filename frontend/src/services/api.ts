import axios, { AxiosError } from 'axios';
import { ApiError } from '../exceptions/ApiError';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const data = error.response.data;
      throw new ApiError(
        data.mensagem || 'Ocorreu um erro inesperado no servidor.',
        error.response.status,
        data.errosDetalhes
      );
    } else if (error.request) {
      throw new ApiError('Não foi possível conectar ao servidor. Verifique sua conexão.');
    } else {
      throw new ApiError(error.message);
    }
  }
);

export default api;