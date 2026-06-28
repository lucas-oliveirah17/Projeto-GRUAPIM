package br.edu.ifsp.gruapim.journaling.gestaotarefas.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.TarefaRequestDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.application.dto.TarefaResponseDTO;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RecursoNaoEncontradoException;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Categoria;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Prioridade;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Tarefa;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.repository.CategoriaRepository;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.repository.TarefaRepository;

@Service
public class TarefaService {
	private final TarefaRepository tarefaRepository;
    private final CategoriaRepository categoriaRepository;
    
    public TarefaService(TarefaRepository tarefaRepository, CategoriaRepository categoriaRepository) {
        this.tarefaRepository = tarefaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional
    public TarefaResponseDTO criar(TarefaRequestDTO dto) {
        Tarefa novaTarefa = new Tarefa(dto.titulo(), dto.descricao(), dto.prioridade(), dto.dataLimite());

        if (dto.categoriaIds() != null && !dto.categoriaIds().isEmpty()) {
            List<Categoria> categoriasEncontradas = categoriaRepository.findAllById(dto.categoriaIds());
            categoriasEncontradas.forEach(novaTarefa::adicionarCategoria);
        }

        Tarefa tarefaSalva = tarefaRepository.save(novaTarefa);
        return TarefaResponseDTO.fromEntity(tarefaSalva);
    }
    
    @Transactional(readOnly = true)
    public List<TarefaResponseDTO> listarTodas() {
        return tarefaRepository.findAll().stream()
            .map(TarefaResponseDTO::fromEntity)
            .toList();
    }
    
    @Transactional
    public TarefaResponseDTO concluir(Long id) {
        Tarefa tarefa = buscarTarefa(id);
        
        tarefa.concluir();
        
        return TarefaResponseDTO.fromEntity(tarefaRepository.save(tarefa));
    }
    
    @Transactional
    public TarefaResponseDTO alterarPrioridade(Long id, Prioridade novaPrioridade) {
        Tarefa tarefa = buscarTarefa(id);
        
        tarefa.alterarPrioridade(novaPrioridade);
        
        return TarefaResponseDTO.fromEntity(tarefaRepository.save(tarefa));
    }
    
    @Transactional
    public TarefaResponseDTO editar(Long id, TarefaRequestDTO dto) {
        Tarefa tarefa = buscarTarefa(id);
        
        tarefa.atualizar(dto.titulo(), dto.descricao(), dto.prioridade(), dto.dataLimite());
        
        if (dto.categoriaIds() != null && !dto.categoriaIds().isEmpty()) {
            List<Categoria> categoriasEncontradas = categoriaRepository.findAllById(dto.categoriaIds());
            tarefa.sincronizarCategorias(new java.util.HashSet<>(categoriasEncontradas));
        } else {
            tarefa.sincronizarCategorias(new java.util.HashSet<>());
        }
        
        return TarefaResponseDTO.fromEntity(tarefaRepository.save(tarefa));
    }
    
    @Transactional
    public void excluir(Long id) {
        Tarefa tarefa = buscarTarefa(id);
        tarefaRepository.delete(tarefa);
    }
    
    private Tarefa buscarTarefa(Long id) {
        return tarefaRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException("Tarefa"));
    }
}
