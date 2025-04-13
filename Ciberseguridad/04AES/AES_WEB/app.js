const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// --- AES Settings ---
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // 128 bits

function getKeyFromPassword(password) {
    return crypto.createHash('sha256').update(password).digest();
}

app.post('/encrypt', (req, res) => {
    const { message, password } = req.body;

    if (!password || password.length < 8) {
        return res.status(400).send('Clave demasiado corta. Mínimo 8 caracteres.');
    }

    const key = getKeyFromPassword(password);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(message, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    const output = `${iv.toString('hex')}:${encrypted}`;
    const filePath = path.join(__dirname, 'encrypted', 'mensaje_cifrado.txt');

    fs.writeFileSync(filePath, output);
    res.download(filePath, 'mensaje_cifrado.txt');
});

app.post('/decrypt', upload.single('file'), (req, res) => {
    const password = req.body.password;

    if (!password || password.length < 8) {
        return res.status(400).send('Clave demasiado corta. Mínimo 8 caracteres.');
    }

    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const [ivHex, encrypted] = fileContent.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = getKeyFromPassword(password);

    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        res.send({ message: decrypted });
    } catch (err) {
        res.status(400).send('Clave incorrecta o archivo corrupto.');
    } finally {
        fs.unlinkSync(req.file.path); // limpiar archivo temporal
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
