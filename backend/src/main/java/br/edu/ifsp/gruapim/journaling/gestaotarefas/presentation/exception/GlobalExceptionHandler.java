package br.edu.ifsp.gruapim.journaling.gestaotarefas.presentation.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.DomainException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RecursoNaoEncontradoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RegistroDuplicadoException;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroResponse> handleRecursoNaoEncontrado(RecursoNaoEncontradoException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, "Recurso não encontrado", ex.getMessage(), request, null);
    }

    @ExceptionHandler(RegistroDuplicadoException.class)
    public ResponseEntity<ErroResponse> handleRegistroDuplicado(RegistroDuplicadoException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.CONFLICT, "Conflito de dados", ex.getMessage(), request, null);
    }

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<ErroResponse> handleDomainException(DomainException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, "Regra de negócio violada", ex.getMessage(), request, null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponse> handleValidacao(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ErroResponse.CampoErro> errosDeCampo = ex.getBindingResult().getFieldErrors().stream()
                .map(f -> new ErroResponse.CampoErro(f.getField(), f.getDefaultMessage()))
                .toList();
                
        return buildResponse(HttpStatus.BAD_REQUEST, "Erro de validação", "Os dados enviados possuem formato inválido ou estão incompletos.", request, errosDeCampo);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponse> handleErroGenerico(Exception ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno no servidor", "Ocorreu um erro inesperado. Tente novamente mais tarde.", request, null);
    }

    private ResponseEntity<ErroResponse> buildResponse(HttpStatus status, String erro, String mensagem, HttpServletRequest request, List<ErroResponse.CampoErro> detalhes) {
        ErroResponse response = new ErroResponse(
                LocalDateTime.now(),
                status.value(),
                erro,
                mensagem,
                request.getRequestURI(),
                detalhes
        );
        return ResponseEntity.status(status).body(response);
    }
}
