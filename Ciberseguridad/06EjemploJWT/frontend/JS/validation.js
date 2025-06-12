document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (e) {
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

    // ✅ Verificar campos vacíos
    if (!nombre || !segundoNombre || !apellidoPaterno || !apellidoMaterno || !email || !password || !confirmPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // ✅ Verificar solo letras
    if (!onlyLetters.test(nombre) ||
        !onlyLetters.test(segundoNombre) ||
        !onlyLetters.test(apellidoPaterno) ||
        !onlyLetters.test(apellidoMaterno)) {
      alert("Los campos de nombre y apellidos deben contener solo letras.");
      return;
    }

    // ✅ Validar formato del email
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // ✅ Validar coincidencia de contraseñas
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // ✅ Si todo está bien
    alert("¡Registro exitoso!");
    form.reset();
  });
});
