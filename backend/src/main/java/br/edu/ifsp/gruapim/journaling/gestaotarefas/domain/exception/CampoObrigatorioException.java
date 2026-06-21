package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception;

public class CampoObrigatorioException extends DomainException {
	private static final long serialVersionUID = 1L;

	public CampoObrigatorioException(String nomeDoCampo) {
		super(
			"O campo " + nomeDoCampo + " é obrigatório e não pode ser nulo ou vazio."
		);
	}
}
