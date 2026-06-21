package br.edu.ifsp.gruapim.journaling.gestaotarefas.presentation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.CategoriaRequestDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.CategoriaResponseDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.service.CategoriaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
	private final CategoriaService categoriaService;
	
	public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }
	
	@PostMapping
    public ResponseEntity<CategoriaResponseDTO> criar(@RequestBody @Valid CategoriaRequestDTO dto) {
        CategoriaResponseDTO response = categoriaService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
	
	@GetMapping
    public ResponseEntity<List<CategoriaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id, 
            @RequestParam(defaultValue = "false") boolean force) {
        categoriaService.excluir(id, force);
        return ResponseEntity.noContent().build();
    }

}
