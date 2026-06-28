package br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto;

import java.time.LocalDate;
import java.util.Set;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Prioridade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TarefaRequestDTO(
	@NotBlank(message = "O título da tarefa é obrigatório.")
    String titulo,
    
    String descricao,
    
    @NotNull(message = "A prioridade é obrigatória.")
    Prioridade prioridade,
    
    Set<Long> categoriaIds,
    
    LocalDate dataLimite
) {}
