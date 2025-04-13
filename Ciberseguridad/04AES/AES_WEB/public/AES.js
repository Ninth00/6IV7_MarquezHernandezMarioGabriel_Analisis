function showTab(id) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function encryptMessage() {
    const message = document.getElementById('encryptMessage').value;
    const password = document.getElementById('encryptPassword').value;

    if (password.length < 8) {
        alert("La clave debe tener al menos 8 caracteres.");
        return;
    }

    fetch('/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, password })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al cifrar");
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "mensaje_cifrado.txt";
        a.click();
    })
    .catch(err => alert(err.message));
}

function decryptMessage() {
    const file = document.getElementById('decryptFile').files[0];
    const password = document.getElementById('decryptPassword').value;

    if (!file || password.length < 8) {
        alert("Debes seleccionar un archivo y usar una clave válida (mínimo 8 caracteres).");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    fetch('/decrypt', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('decryptedMessage').value = data.message;
    })
    .catch(() => alert("Error al descifrar. Verifica la clave o el archivo."));
}
