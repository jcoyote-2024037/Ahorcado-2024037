<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
  <div class="login-box">
    <h2>Iniciar Sesión</h2>

    <!-- Formulario que envía los datos al servlet "controlador" -->
    <form action="Controlador" method="POST">
      <input type="text" name="usuario" placeholder="Usuario" required><br>
      <input type="password" name="password" placeholder="Contraseña" required><br>
      <button type="submit" name="accion" value="Ingresar">Entrar</button>
    </form>

    <p style="color:red;">
      <%
        String error = (String) request.getAttribute("mensaje");
        if (error != null) {
            out.print(error);
        }
      %>
    </p>
  </div>
</body>
</html>
