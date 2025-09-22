package modelo;

import config.Conexion;
import java.sql.*;

public class UsuarioDAO {
    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
public Usuario validar(String nombreUsuario, String contrasena) {
        Usuario usuario = null;
        String sql = "{CALL sp_ValidarUsuario(?, ?)}"; // Llamada al procedimiento

        try {
            con = cn.Conexion(); // Obtiene la conexión
            ps = con.prepareStatement(sql);
            ps.setString(1, nombreUsuario);
            ps.setString(2, contrasena);

            rs = ps.executeQuery();

            if (rs.next()) {
                usuario = new Usuario();
                usuario.setCodigoUsuario(rs.getInt("codigoUsuario"));
                usuario.setNombreUsuario(rs.getString("nombreUsuario"));
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
        } finally {
            // Cierra recursos para evitar fugas de memoria
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                e.printStackTrace(System.out);
            }
        }
        return usuario;
    }
}
