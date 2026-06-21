package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception;

public class RecursoNaoEncontradoException extends DomainException {
	private static final long serialVersionUID = 1L;

	public RecursoNaoEncontradoException(String recurso) {
		super(recurso + " não encontrado(a) no sistema.");
	}
}
