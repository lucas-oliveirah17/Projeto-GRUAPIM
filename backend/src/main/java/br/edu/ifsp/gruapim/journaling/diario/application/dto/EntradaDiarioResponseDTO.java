package br.edu.ifsp.gruapim.journaling.diario.application.dto;

import java.time.LocalDate;
import br.edu.ifsp.gruapim.journaling.diario.domain.model.EntradaDiario;

public record EntradaDiarioResponseDTO(
    Long id,
    LocalDate data,
    String titulo,
    String conteudo
) {
    public static EntradaDiarioResponseDTO fromEntity(EntradaDiario entrada) {
        if (entrada == null) return null;
        return new EntradaDiarioResponseDTO(
            entrada.getId(),
            entrada.getData(),
            entrada.getTitulo(),
            entrada.getConteudo()
        );
    }
}
