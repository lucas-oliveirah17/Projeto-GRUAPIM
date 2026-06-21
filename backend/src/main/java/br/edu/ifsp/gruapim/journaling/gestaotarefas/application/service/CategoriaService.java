package br.edu.ifsp.gruapim.journaling.gestaotarefas.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.CategoriaRequestDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.CategoriaResponseDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RecursoNaoEncontradoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RegistroDuplicadoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Categoria;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.repository.CategoriaRepository;

@Service
public class CategoriaService {
	private final CategoriaRepository categoriaRepository;
	
	public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
	
	@Transactional
    public CategoriaResponseDTO criar(CategoriaRequestDTO dto) {
        String nomeFormatado = dto.nome().trim().toLowerCase();
        
        categoriaRepository.findByNome(nomeFormatado)
            .ifPresent(_ -> {
                throw new RegistroDuplicadoException("Categoria: " + dto.nome());
            });

        Categoria novaCategoria = new Categoria(dto.nome());
        
        Categoria categoriaSalva = categoriaRepository.save(novaCategoria);

        return CategoriaResponseDTO.fromEntity(categoriaSalva);
    }
	
	@Transactional(readOnly = true)
	public List<CategoriaResponseDTO> listarTodas() {
        return categoriaRepository.findAll().stream()
            .map(CategoriaResponseDTO::fromEntity)
            .toList();
    }
	
	@Transactional
    public void excluir(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Categoria");
        }
        // Nota: O JPA vai tentar deletar. Se a categoria estiver vinculada a uma Tarefa, 
        // vai estourar um erro de integridade do banco (DataIntegrityViolationException).
        // Trataremos isso globalmente na camada de API (ControllerAdvice) depois!
        categoriaRepository.deleteById(id);
    }
}
