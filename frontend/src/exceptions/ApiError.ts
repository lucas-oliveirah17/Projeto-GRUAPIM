export class ApiError extends Error {
  public status?: number;
  public detalhes?: any[];

  constructor(message: string, status?: number, detalhes?: any[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detalhes = detalhes;
  }
}