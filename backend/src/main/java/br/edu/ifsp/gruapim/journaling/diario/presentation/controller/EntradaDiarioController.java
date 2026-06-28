package br.edu.ifsp.gruapim.journaling.diario.presentation.controller;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.gruapim.journaling.diario.application.dto.EntradaDiarioRequestDTO;
import br.edu.ifsp.gruapim.journaling.diario.application.dto.EntradaDiarioResponseDTO;
import br.edu.ifsp.gruapim.journaling.diario.application.service.EntradaDiarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/diario")
public class EntradaDiarioController {
    private final EntradaDiarioService entradaDiarioService;

    public EntradaDiarioController(EntradaDiarioService entradaDiarioService) {
        this.entradaDiarioService = entradaDiarioService;
    }

    @GetMapping
    public ResponseEntity<java.util.List<EntradaDiarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(entradaDiarioService.listarTodos());
    }

    @GetMapping("/{data}")
    public ResponseEntity<EntradaDiarioResponseDTO> buscarPorData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(entradaDiarioService.buscarPorData(data).orElse(null));
    }

    @PostMapping
    public ResponseEntity<EntradaDiarioResponseDTO> salvar(
            @RequestBody @Valid EntradaDiarioRequestDTO dto) {
        return ResponseEntity.ok(entradaDiarioService.salvarOuAtualizar(dto));
    }

    @DeleteMapping("/{data}")
    public ResponseEntity<Void> excluir(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        entradaDiarioService.excluirPorData(data);
        return ResponseEntity.noContent().build();
    }
}
