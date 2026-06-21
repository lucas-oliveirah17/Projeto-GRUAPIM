package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.CampoObrigatorioException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_categoria")
public class Categoria {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String nome;
	
	protected Categoria() {
	}
	
	public Categoria(String nome) {
		if (nome == null || nome.trim().isEmpty()) {
            throw new CampoObrigatorioException("Nome da Categoria");
        }
		
		// Para evitar duplicatas de capitalização diferente
		this.nome = nome.trim().toLowerCase();
	}
	
	public Long getId() { return id; }
    public String getNome() { return nome; }
}
