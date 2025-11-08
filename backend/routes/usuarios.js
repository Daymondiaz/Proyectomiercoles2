const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ✅ Obtener todos los usuarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

router.get('/login', (req, res) => {
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
        email: user.email,
        contrasena: user.contrasena
      }
    });
  });
});

// ✅ Obtener usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(results[0]);
  });
});

// ✅ Crear nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, contrasena } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, contrasena], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear usuario' });
    res.status(201).json({ id: result.insertId, nombre, email, contrasena });
  });
});

// ✅ Actualizar usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, contrasena } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id = ?';
  db.query(query, [nombre, email, contrasena, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// ✅ Eliminar usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
