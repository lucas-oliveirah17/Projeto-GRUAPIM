package br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifsp.gruapim.journaling.gestaotarefas.domain.model.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
