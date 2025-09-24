package com.diegocoyote.ahorcado.service;

import com.diegocoyote.ahorcado.model.Usuario;
import com.diegocoyote.ahorcado.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario getUsuarioById(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        // Validar el formato del nombre de usuario manualmente
        String regex = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|yahoo\\.com|kinal\\.edu\\.gt)$";
        if (!usuario.getNombreUsuario().matches(regex)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de usuario debe ser un correo válido de dominio gmail.com, yahoo.com o kinal.edu.gt.");
        }

        // Validar si el nombre de usuario ya existe
        if (usuarioRepository.existsByNombreUsuario(usuario.getNombreUsuario())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre de usuario ya existe.");
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Integer id, Usuario usuario) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));

        // Validar si el nombreUsuario ya existe en otro usuario
        if (usuarioRepository.existsByNombreUsuario(usuario.getNombreUsuario()) &&
                !existingUsuario.getNombreUsuario().equals(usuario.getNombreUsuario())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre de usuario ya existe.");
        }

        existingUsuario.setNombreUsuario(usuario.getNombreUsuario());
        existingUsuario.setContrasena(usuario.getContrasena());

        return usuarioRepository.save(existingUsuario);
    }

    @Override
    public void deleteUsuario(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado.");
        }
        usuarioRepository.deleteById(id);
    }
}
