<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Inicio de Sesión</title>
        <link rel="stylesheet" href="css/login.css">
    </head>
<body>
    <div class="form-container">
        <p class="title">Login</p>
        
        <!-- Formulario que envía los datos al servlet "Validar" -->
        <form class="form" action="Validar" method="POST">
            <div class="input-group">
                <label for="usuario">Usuario</label>
                <input type="text" name="usuario" id="usuario" required />
            </div>
            <div class="input-group">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" required />
                <div class="forgot">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
            <button type="submit" name="accion" value="Ingresar" class="sign">Entrar</button>
        </form>

        <p style="color:red; text-align:center; margin-top:10px;">
            <%
                String error = (String) request.getAttribute("mensaje");
                if (error != null) {
                    out.print(error);
                }
            %>
        </p>

        <div class="social-message">
            <div class="line"></div>
            <p class="message">Inicia sesión con redes sociales</p>
            <div class="line"></div>
        </div>

        <div class="social-icons">
            <button aria-label="Log in with Google" class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"></svg>
            </button>
            <button aria-label="Log in with Twitter" class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"></svg>
            </button>
            <button aria-label="Log in with GitHub" class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"></svg>
            </button>
        </div>

        <p class="signup">
            ¿No tienes una cuenta?
            <a href="#">Regístrate</a>
        </p>
    </div>
</body>
</html>