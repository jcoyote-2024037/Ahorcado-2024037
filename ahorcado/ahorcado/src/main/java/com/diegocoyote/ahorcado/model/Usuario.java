package com.diegocoyote.ahorcado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "Usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigoUsuario")
    private Integer codigoUsuario;

    @NotBlank(message = "El nombre de usuario no puede estar vacío.")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|yahoo\\.com|kinal\\.edu\\.gt)$", message = "El nombre de usuario debe ser un correo válido de dominio gmail.com, yahoo.com o kinal.edu.gt.")
    @Column(name = "nombreUsuario", nullable = false)
    private String nombreUsuario;

    @NotBlank(message = "La contraseña no puede estar vacía.")
    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    // Getters y Setters
    public Integer getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(Integer codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}