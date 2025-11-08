const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ✅ Login sin roles
router.post('/login', (req, res) => {
  const { email, contrasena } = req.body;

  // Validar datos
  if (!email || !contrasena) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Buscar usuario en la base de datos
  const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
  db.query(query, [email, contrasena], (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = results[0];

    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });
  });
});

module.exports = router;
