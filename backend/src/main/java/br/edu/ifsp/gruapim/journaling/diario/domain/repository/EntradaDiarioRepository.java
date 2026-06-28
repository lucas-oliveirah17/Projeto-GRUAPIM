package br.edu.ifsp.gruapim.journaling.diario.domain.repository;

import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.edu.ifsp.gruapim.journaling.diario.domain.model.EntradaDiario;

@Repository
public interface EntradaDiarioRepository extends JpaRepository<EntradaDiario, Long> {
    Optional<EntradaDiario> findByData(LocalDate data);
}
