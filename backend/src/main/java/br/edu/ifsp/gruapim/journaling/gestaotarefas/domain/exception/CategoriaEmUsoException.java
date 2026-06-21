package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception;

public class CategoriaEmUsoException extends DomainException {
	private static final long serialVersionUID = 1L;
	
	public CategoriaEmUsoException(String categoriaNome) {
        super("A categoria '" + categoriaNome + "' está em uso por uma ou mais tarefas.");
    }
}
