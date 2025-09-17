package com.diegocoyote.ahorcado.repository;

import com.diegocoyote.ahorcado.model.Palabra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PalabraRepository extends JpaRepository<Palabra, Integer> {
    boolean existsByNombrePalabra(String nombrePalabra);
}
