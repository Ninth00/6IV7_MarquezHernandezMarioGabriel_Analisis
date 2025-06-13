async function cargarPerfil() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("No hay sesión iniciada");
    window.location.href = '/bienvenida.html';
    return;
  }

  try {
    const res = await fetch('/api/auth/perfil', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });

    if (res.ok) {
      const data = await res.json();
      document.getElementById('userInfo').textContent =
        `Bienvenido/a ${data.nombreCompleto} (${data.email})`;
    } else {
      // Si el token es inválido o expiró, borramos el token y redirigimos
      localStorage.removeItem('token');
      alert('Sesión expirada o acceso denegado. Por favor, inicia sesión de nuevo.');
      window.location.href = '/bienvenida.html';
    }

  } catch (err) {
    console.error(err);
    alert("Error al cargar el perfil");
  }
}

function setupLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/bienvenida.html';
    });
  }
}

cargarPerfil();
setupLogoutButton();
