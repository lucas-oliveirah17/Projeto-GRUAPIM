package br.edu.ifsp.gruapim.journaling.diario.application.service;

import java.time.LocalDate;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifsp.gruapim.journaling.diario.application.dto.EntradaDiarioRequestDTO;
import br.edu.ifsp.gruapim.journaling.diario.application.dto.EntradaDiarioResponseDTO;
import br.edu.ifsp.gruapim.journaling.diario.domain.model.EntradaDiario;
import br.edu.ifsp.gruapim.journaling.diario.domain.repository.EntradaDiarioRepository;
import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.exception.RecursoNaoEncontradoException;

@Service
public class EntradaDiarioService {
    private final EntradaDiarioRepository entradaDiarioRepository;

    public EntradaDiarioService(EntradaDiarioRepository entradaDiarioRepository) {
        this.entradaDiarioRepository = entradaDiarioRepository;
    }

    @Transactional(readOnly = true)
    public java.util.List<EntradaDiarioResponseDTO> listarTodos() {
        return entradaDiarioRepository.findAll().stream()
                .map(EntradaDiarioResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<EntradaDiarioResponseDTO> buscarPorData(LocalDate data) {
        return entradaDiarioRepository.findByData(data)
                .map(EntradaDiarioResponseDTO::fromEntity);
    }

    @Transactional
    public EntradaDiarioResponseDTO salvarOuAtualizar(EntradaDiarioRequestDTO dto) {
        Optional<EntradaDiario> existente = entradaDiarioRepository.findByData(dto.data());
        
        EntradaDiario entrada;
        if (existente.isPresent()) {
            entrada = existente.get();
            entrada.atualizar(dto.titulo(), dto.conteudo());
        } else {
            entrada = new EntradaDiario(dto.data(), dto.titulo(), dto.conteudo());
        }
        
        EntradaDiario salva = entradaDiarioRepository.save(entrada);
        return EntradaDiarioResponseDTO.fromEntity(salva);
    }

    @Transactional
    public void excluirPorData(LocalDate data) {
        EntradaDiario entrada = entradaDiarioRepository.findByData(data)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Entrada de diário"));
        entradaDiarioRepository.delete(entrada);
    }
}
