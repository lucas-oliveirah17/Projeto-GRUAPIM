package br.edu.ifsp.gruapim.journaling.diario.domain.model;

import java.time.LocalDate;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.CampoObrigatorioException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_entrada_diario")
public class EntradaDiario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate data;

    @Column
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String conteudo;

    protected EntradaDiario() {
    }

    public EntradaDiario(LocalDate data, String titulo, String conteudo) {
        if (data == null) {
            throw new CampoObrigatorioException("Data");
        }
        this.data = data;
        this.titulo = titulo;
        this.conteudo = conteudo;
    }

    public void atualizar(String titulo, String conteudo) {
        this.titulo = titulo;
        this.conteudo = conteudo;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getConteudo() {
        return conteudo;
    }
}
