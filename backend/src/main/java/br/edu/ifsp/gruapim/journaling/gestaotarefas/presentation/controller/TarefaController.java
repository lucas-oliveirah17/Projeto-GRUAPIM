package br.edu.ifsp.gruapim.journaling.gestaotarefas.presentation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.TarefaRequestDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.TarefaResponseDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.service.TarefaService;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Prioridade;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {
	private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }
    
    @PostMapping
    public ResponseEntity<TarefaResponseDTO> criar(@RequestBody @Valid TarefaRequestDTO dto) {
        TarefaResponseDTO response = tarefaService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TarefaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(tarefaService.listarTodas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> editar(
            @PathVariable Long id, 
            @RequestBody @Valid TarefaRequestDTO dto) {
        TarefaResponseDTO response = tarefaService.editar(id, dto);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<TarefaResponseDTO> concluir(@PathVariable Long id) {
        TarefaResponseDTO response = tarefaService.concluir(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/prioridade")
    public ResponseEntity<TarefaResponseDTO> alterarPrioridade(
            @PathVariable Long id, 
            @RequestParam Prioridade novaPrioridade) {
        TarefaResponseDTO response = tarefaService.alterarPrioridade(id, novaPrioridade);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        tarefaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
    
}
