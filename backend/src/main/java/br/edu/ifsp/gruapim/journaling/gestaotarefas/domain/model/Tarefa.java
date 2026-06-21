package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model;

import java.util.HashSet;
import java.util.Set;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.CampoObrigatorioException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.TarefaJaConcluidaException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_tarefa")
public class Tarefa {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String titulo;
	
	@Column(columnDefinition = "TEXT")
	private String descricao;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	private Prioridade prioridade;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	private StatusTarefa status;
	
	@ManyToMany
    @JoinTable(
        name = "tbl_tarefa_categoria",
        joinColumns = @JoinColumn(name = "tarefa_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
	private Set<Categoria> categorias = new HashSet<>();
	
	protected Tarefa() {
	}
	
	public Tarefa(String titulo, String descricao, Prioridade prioridade) {
		if (titulo == null || titulo.trim().isEmpty()) {
			throw new CampoObrigatorioException("Título");
        }
        if (prioridade == null) {
        	throw new CampoObrigatorioException("Prioridade");
        }
        
        this.titulo = titulo;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.status = StatusTarefa.PENDENTE;
	}
	
	public void concluir() {
        if (this.status == StatusTarefa.CONCLUIDA) {
            throw new TarefaJaConcluidaException();
        }
        this.status = StatusTarefa.CONCLUIDA;
    }
	
	public void alterarPrioridade(Prioridade novaPrioridade) {
        if (novaPrioridade == null) {
        	throw new CampoObrigatorioException("Nova Prioridade");
        }
        this.prioridade = novaPrioridade;
    }
	
	public void adicionarCategoria(Categoria categoria) {
        if (categoria == null) {
            throw new CampoObrigatorioException("Categoria");
        }
        this.categorias.add(categoria);
    }

    public void removerCategoria(Categoria categoria) {
        if (categoria != null) {
            this.categorias.remove(categoria);
        }
    }
	
	public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public Prioridade getPrioridade() { return prioridade; }
    public StatusTarefa getStatus() { return status; }
    public Set<Categoria> getCategoria() { return Set.copyOf(categorias); }
}
