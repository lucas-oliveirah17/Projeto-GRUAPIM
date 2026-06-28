export interface Diario {
  id?: number;
  data: string; // Formato YYYY-MM-DD
  titulo?: string;
  conteudo: string; // String HTML/Text
}
