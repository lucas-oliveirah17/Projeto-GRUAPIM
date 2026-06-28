package br.edu.ifsp.gruapim.journaling.diario.application.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;

public record EntradaDiarioRequestDTO(
    @NotNull(message = "A data é obrigatória.")
    LocalDate data,
    
    String titulo,
    
    String conteudo
) {}
