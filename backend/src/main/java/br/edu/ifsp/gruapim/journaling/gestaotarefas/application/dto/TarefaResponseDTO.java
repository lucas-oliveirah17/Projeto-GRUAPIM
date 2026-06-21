package br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto;

import java.util.Set;
import java.util.stream.Collectors;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Prioridade;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.StatusTarefa;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Tarefa;

public record TarefaResponseDTO(
	Long id,
    String titulo,
    String descricao,
    Prioridade prioridade,
    StatusTarefa status,
    Set<CategoriaResponseDTO> categorias

) {
	public static TarefaResponseDTO fromEntity(Tarefa tarefa) {
        return new TarefaResponseDTO(
            tarefa.getId(),
            tarefa.getTitulo(),
            tarefa.getDescricao(),
            tarefa.getPrioridade(),
            tarefa.getStatus(),
            tarefa.getCategorias().stream()
                  .map(CategoriaResponseDTO::fromEntity)
                  .collect(Collectors.toSet())
        );
    }
}
