package br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Categoria;

public record CategoriaResponseDTO(
	Long id, 
	String nome
	
) {
	public static CategoriaResponseDTO fromEntity(Categoria categoria) {
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNome());
    }
}
