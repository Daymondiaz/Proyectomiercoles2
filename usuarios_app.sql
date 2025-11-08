CREATE DATABASE usuarios_app;

USE usuarios_app;

CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
contrasena varchar(100),
telefono VARCHAR(20),
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, contrasena, telefono) VALUES
('Juan Pérez', 'juan.perez@email.com', 1234, '3001234567'),
('María García', 'maria.garcia@email.com', 1234, '3109876543'),
('Carlos López', 'carlos.lopez@email.com', 1234, '3157654321'),
('Ana Martínez', 'ana.martinez@email.com', 1234, '3208765432'),
('Luis Rodríguez', 'luis.rodriguez@email.com', 1234, '3156789012');