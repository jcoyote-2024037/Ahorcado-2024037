package modelo;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author informatica
 */
public class PalabrasDAO {
    
    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    int resp;
    int codigoPalabra;

    public List<Palabras> listar() {
        String sql = "{call sp_ListarPalabras()}";
        List<Palabras> listaPalabras = new ArrayList<>();
        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                Palabras pa = new Palabras();
                pa.setCodigoPalabra(rs.getInt(1));
                pa.setNombrePalabra(rs.getString(2));
                pa.setPista1(rs.getString(3));
                pa.setPista2(rs.getString(4));
                pa.setPista3(rs.getString(5));
                listaPalabras.add(pa);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listaPalabras;

    }
    
    
}
