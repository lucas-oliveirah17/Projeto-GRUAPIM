package br.edu.ifsp.gruapim.journaling.gestaotarefas.presentation.exception;

import java.time.LocalDateTime;
import java.util.List;

public record ErroResponse(
    LocalDateTime timestamp,
    Integer status,
    String erro,
    String mensagem,
    String path,
    List<CampoErro> errosDetalhes
) {
    public record CampoErro(String campo, String mensagem) {}
}