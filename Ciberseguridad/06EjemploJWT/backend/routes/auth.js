const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../bd');
const verificarToken = require('../middleware/verifyToken'); 


//ruta para el registro
router.post('/register', async (req, res) => {
  const {
    nombre,
    segundoNombre,
    apellidoPaterno,
    apellidoMaterno,
    email,
    password
  } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuarios
      (nombre, segundo_nombre, apellido_paterno, apellido_materno, email, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [nombre, segundoNombre, apellidoPaterno, apellidoMaterno, email, hashed];

    db.query(query, values, (err, result) => {
      if (err) {
        console.log('Error al registrar al usuario', err);
        return res.status(500).send('Error al registrar');
      }

      console.log("Usuario registrado con ID:", result.insertId);
      res.status(200).send('Usuario registrado exitosamente');
    });

  } catch (error) {
    console.log('Error en el servidor al registrar:', error);
    res.status(500).send('Error interno del servidor');
  }
});


//ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log('Error en la consulta del login: ', err);
            return res.status(500).send('Error en el servidor');
        }

        if (result.length === 0) {
            console.log('Usuario no encontrado: ', email);
            return res.status(401).send('Credenciales inválidas');
        }

        const user = result[0];
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            console.warn("Contraseña incorrecta para usuario:", email);
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Token generado para:', user.email);
        res.json({ token });
    });
});

router.get('/perfil', verificarToken, (req, res) => {
  const userId = req.user.id; // ID decodificado desde el JWT

  db.query('SELECT id, nombre, segundo_nombre, apellido_paterno, apellido_materno, email FROM usuarios WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error al obtener datos del perfil:', err);
      return res.status(500).send('Error en el servidor');
    }

    if (result.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    const user = result[0];

    res.json({
      id: user.id,
      nombreCompleto: `${user.nombre} ${user.segundo_nombre} ${user.apellido_paterno} ${user.apellido_materno}`,
      email: user.email
    });
  });
});


//cambio
module.exports = router