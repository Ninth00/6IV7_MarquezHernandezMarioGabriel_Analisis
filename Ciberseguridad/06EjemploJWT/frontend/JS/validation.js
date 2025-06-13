document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const segundoNombre = form.segundoNombre.value.trim();
    const apellidoPaterno = form.apellidoPaterno.value.trim();
    const apellidoMaterno = form.apellidoMaterno.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !segundoNombre || !apellidoPaterno || !apellidoMaterno || !email || !password || !confirmPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!onlyLetters.test(nombre) ||
        !onlyLetters.test(segundoNombre) ||
        !onlyLetters.test(apellidoPaterno) ||
        !onlyLetters.test(apellidoMaterno)) {
      alert("Los campos de nombre y apellidos deben contener solo letras.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
<<<<<<< HEAD

    // ✅ Enviar datos al backend
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          nombre,
          segundoNombre,
          apellidoPaterno,
          apellidoMaterno,
          email,
          password
        })
      });


      if (response.ok) {
        alert("¡Registro exitoso! Ahora inicia sesión.");
        form.reset()
        window.location.href = '/bienvenida.html';
      } else {
        const errText = await response.text();
        alert("Error al registrar: " + errText);
      }
    } catch (error) {
      console.error("Error de red o servidor:", error);
      alert("Ocurrió un error al enviar el formulario.");
    }
=======
    
    alert("¡Registro exitoso!");
    form.reset();
>>>>>>> 3d7c14de40d7157a96049b1c74692a2a394c68a9
  });
});
