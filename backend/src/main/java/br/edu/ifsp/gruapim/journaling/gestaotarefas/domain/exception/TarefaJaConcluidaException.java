package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception;

public class TarefaJaConcluidaException extends DomainException {
	private static final long serialVersionUID = 1L;

	public TarefaJaConcluidaException() {
		super("A tarefa já está concluída e não pode ser alterada.");
	}
}
