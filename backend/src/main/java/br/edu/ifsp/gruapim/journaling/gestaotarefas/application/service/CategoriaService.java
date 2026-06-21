package br.edu.ifsp.gruapim.journaling.gestaotarefas.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.CategoriaRequestDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.CategoriaResponseDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.CategoriaEmUsoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RecursoNaoEncontradoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RegistroDuplicadoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Categoria;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Tarefa;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.repository.CategoriaRepository;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.repository.TarefaRepository;

@Service
public class CategoriaService {
	private final CategoriaRepository categoriaRepository;
	private final TarefaRepository tarefaRepository;
	
	public CategoriaService(CategoriaRepository categoriaRepository, TarefaRepository tarefaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.tarefaRepository = tarefaRepository;
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
    public void excluir(Long id, boolean force) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException("Categoria"));

        boolean emUso = tarefaRepository.existsByCategorias_Id(id);

        if (emUso && !force) {
            throw new CategoriaEmUsoException(categoria.getNome());
        }

        if (emUso && force) {
            List<Tarefa> tarefas = tarefaRepository.findByCategorias_Id(id);
            for (Tarefa tarefa : tarefas) {
                tarefa.removerCategoria(categoria);
                tarefaRepository.save(tarefa);
            }
        }

        categoriaRepository.delete(categoria);
    }
}
