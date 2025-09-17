package com.diegocoyote.ahorcado.controller;

import com.diegocoyote.ahorcado.model.Palabra;
import com.diegocoyote.ahorcado.service.PalabraService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/palabras")
public class PalabraController {

    private final PalabraService palabraService;

    public PalabraController(PalabraService palabraService) {
        this.palabraService = palabraService;
    }

    @GetMapping
    public List<Palabra> getAllPalabras() {
        return palabraService.getAllPalabras();
    }

    @GetMapping("/{id}")
    public Palabra getPalabraById(@PathVariable Integer id) {
        return palabraService.getPalabraById(id);
    }

    @PostMapping
    public Palabra createPalabra(@RequestBody Palabra palabra) {
        return palabraService.savePalabra(palabra);
    }

    @PutMapping("/{id}")
    public Palabra updatePalabra(@PathVariable Integer id, @RequestBody Palabra palabra) {
        return palabraService.updatePalabra(id, palabra);
    }

    @DeleteMapping("/{id}")
    public void deletePalabra(@PathVariable Integer id) {
        palabraService.deletePalabra(id);
    }
}
