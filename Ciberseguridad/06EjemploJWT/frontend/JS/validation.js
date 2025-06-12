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
    
    alert("¡Registro exitoso!");
    form.reset();
  });
});
