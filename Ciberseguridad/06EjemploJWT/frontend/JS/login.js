document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      alert('Login exitoso');
      // Puedes redirigir al usuario a una página protegida si quieres
      window.location.href = '/perfil.html';
    } else {
      alert(data.message || 'Login fallido');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error en el servidor');
  }
});
