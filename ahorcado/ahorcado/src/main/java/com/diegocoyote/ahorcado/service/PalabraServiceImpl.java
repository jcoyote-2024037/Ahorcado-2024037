package com.diegocoyote.ahorcado.service;

import com.diegocoyote.ahorcado.model.Palabra;
import com.diegocoyote.ahorcado.repository.PalabraRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PalabraServiceImpl implements PalabraService {

    private final PalabraRepository palabraRepository;

    public PalabraServiceImpl(PalabraRepository palabraRepository) {
        this.palabraRepository = palabraRepository;
    }

    @Override
    public List<Palabra> getAllPalabras() {
        return palabraRepository.findAll();
    }

    @Override
    public Palabra getPalabraById(Integer id) {
        return palabraRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Palabra no encontrada."));
    }

    @Override
    public Palabra savePalabra(Palabra palabra) {
        if (palabraRepository.existsByNombrePalabra(palabra.getNombrePalabra())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La palabra ya existe.");
        }
        return palabraRepository.save(palabra);
    }

    @Override
    public Palabra updatePalabra(Integer id, Palabra palabra) {
        Palabra existingPalabra = palabraRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Palabra no encontrada."));

        // Validar si el nombre ya existe en otra palabra
        if (palabraRepository.existsByNombrePalabra(palabra.getNombrePalabra()) &&
                !existingPalabra.getNombrePalabra().equals(palabra.getNombrePalabra())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La palabra ya existe.");
        }

        existingPalabra.setNombrePalabra(palabra.getNombrePalabra());
        existingPalabra.setPista1(palabra.getPista1());
        existingPalabra.setPista2(palabra.getPista2());
        existingPalabra.setPista3(palabra.getPista3());

        return palabraRepository.save(existingPalabra);
    }

    @Override
    public void deletePalabra(Integer id) {
        if (!palabraRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Palabra no encontrada.");
        }
        palabraRepository.deleteById(id);
    }
}
