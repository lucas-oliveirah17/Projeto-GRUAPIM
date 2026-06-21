package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model;

public enum Prioridade {
	ALTA("Alta"),
	MEDIA("Média"),
	BAIXA("Baixa");
	
	private final String descricao;
	
	Prioridade(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return descricao;
	}
}
