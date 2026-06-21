package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model;

public enum StatusTarefa {
	PENDENTE("Pendente"),
	CONCLUIDA("Concluída");
	
	private final String descricao;
	
	StatusTarefa(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return descricao;
	}
}
