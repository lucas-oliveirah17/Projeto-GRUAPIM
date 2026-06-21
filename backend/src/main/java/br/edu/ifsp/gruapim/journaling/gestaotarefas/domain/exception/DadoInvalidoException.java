package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception;

public class DadoInvalidoException extends DomainException {
	private static final long serialVersionUID = 1L;

	public DadoInvalidoException(String mensagem) {
		super(mensagem);
	}
}
