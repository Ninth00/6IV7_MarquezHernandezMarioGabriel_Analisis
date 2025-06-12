CREATE DATABASE IF NOT EXISTS registro_usuarios;
USE registro_usuarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);
