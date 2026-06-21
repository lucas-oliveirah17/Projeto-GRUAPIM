package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception;

public class RegistroDuplicadoException extends DomainException {
	private static final long serialVersionUID = 1L;

	public RegistroDuplicadoException(String nomeDoRegistro) {
		super("O registro '" + nomeDoRegistro + "' já existe no sistema e não pode ser duplicado.");
	}
}
