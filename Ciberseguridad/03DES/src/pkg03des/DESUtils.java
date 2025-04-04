/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg03des;

/**
 *
 * @author Alumno
 */
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.security.Key;
import java.util.Base64;

public class DESUtils {
    private static final String ALGORITHM = "DES";
    private static final String CLAVE_ARCHIVO = "clave.key";  // Archivo para guardar la clave

    // Cargar clave o generar una nueva
    private static Key obtenerClave() {
        File archivoClave = new File(CLAVE_ARCHIVO);
        if (archivoClave.exists()) {
            return cargarClaveDesdeArchivo();
        } else {
            return generarYGuardarClave();
        }
    }

    // Método para generar y guardar la clave
    private static Key generarYGuardarClave() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance(ALGORITHM);
            keyGen.init(56);
            SecretKey clave = keyGen.generateKey();

            // Guardar clave en un archivo
            FileOutputStream fos = new FileOutputStream(CLAVE_ARCHIVO);
            fos.write(clave.getEncoded());
            fos.close();

            return clave;
        } catch (Exception e) {
            throw new RuntimeException("Error al generar la clave DES");
        }
    }

    // Método para cargar la clave desde un archivo
    private static Key cargarClaveDesdeArchivo() {
        try {
            FileInputStream fis = new FileInputStream(CLAVE_ARCHIVO);
            byte[] claveBytes = new byte[8]; // DES usa claves de 8 bytes
            fis.read(claveBytes);
            fis.close();
            return new SecretKeySpec(claveBytes, ALGORITHM);
        } catch (IOException e) {
            throw new RuntimeException("Error al cargar la clave DES");
        }
    }

    // Método para cifrar un archivo
    public static void cifrarArchivo(File inputFile, File outputFile) {
        try {
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, obtenerClave());

            byte[] inputBytes = leerArchivoBytes(inputFile);
            byte[] outputBytes = cipher.doFinal(inputBytes);

            escribirArchivo(outputFile, outputBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Método para descifrar un archivo
    public static void descifrarArchivo(File inputFile, File outputFile) {
        try {
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, obtenerClave());

            byte[] inputBytes = leerArchivoBytes(inputFile);
            byte[] outputBytes = cipher.doFinal(inputBytes);

            escribirArchivo(outputFile, outputBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Método para leer un archivo como bytes
    private static byte[] leerArchivoBytes(File file) throws IOException {
        FileInputStream fis = new FileInputStream(file);
        byte[] bytes = new byte[(int) file.length()];
        fis.read(bytes);
        fis.close();
        return bytes;
    }

    // Método para escribir bytes en un archivo
    private static void escribirArchivo(File file, byte[] content) throws IOException {
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(content);
        fos.close();
    }

    // Método para leer un archivo como String
    public static String leerArchivo(File file) {
        StringBuilder contenido = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                contenido.append(linea).append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contenido.toString();
    }
}

