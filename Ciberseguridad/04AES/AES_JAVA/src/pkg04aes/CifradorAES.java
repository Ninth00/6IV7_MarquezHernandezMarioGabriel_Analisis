/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg04aes;

import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class CifradorAES {
    
    // Generar las subllaves y los métodos para cifrar y descifrar

    // Crear un método para la llave
    public static final byte[] keyvalue = new byte[] {
        /*
        Recordemos que dentro de AES se van a manejar diferentes tamaños
        de la llave de acuerdo al tipo de operación
        128 16 caracteres 9 rondas
        192 24 caracteres 11 rondas
        256 32 caracteres 13 rondas
        */
        
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i'
    };
    
    // Vamos a definir la instancia del algoritmo
    private static final String instancia = "AES";
    
    public static String encrypt(String Data) throws Exception {
        // Para poder cifrar debemos generar las subclaves necesarias 
        // para ejecutar el algoritmo acorde al número de rondas, para ello
        // vamos a ocupar un método de generación de llaves
        Key subllave = generateKey();
        
        // Inicializamos el cifrado
        Cipher cifrado = Cipher.getInstance(instancia);
        cifrado.init(Cipher.ENCRYPT_MODE, subllave);
        
        // Vamos a obtener el mensaje que se quiere cifrar y
        // lo transformamos en bytes
        byte[] encValores = cifrado.doFinal(Data.getBytes());
        
        // Imprimir el mensaje cifrado en formato de bytes (opcional)
        System.out.println("Mensaje Cifrado (en bytes): " + Base64.getEncoder().encodeToString(encValores));
        
        // Aplicamos codificación Base64 a los datos cifrados
        String valoresEncriptadosFormato = Base64.getEncoder().encodeToString(encValores);
        
        return valoresEncriptadosFormato;
    }
    
    public static String decrypt(String valoresEncriptados) throws Exception {
        // Para poder descifrar debemos generar las subclaves necesarias 
        // para ejecutar el algoritmo acorde al número de rondas
        Key subllave = generateKey();
        
        // Inicializamos el cifrado
        Cipher cifrado = Cipher.getInstance(instancia);
        cifrado.init(Cipher.DECRYPT_MODE, subllave);
        
        // Decodificamos el texto cifrado de Base64
        byte[] decValores = Base64.getDecoder().decode(valoresEncriptados);
        
        // Realizamos el descifrado
        byte[] originalData = cifrado.doFinal(decValores);
        
        // Imprimir el mensaje descifrado (en bytes, opcional)
        System.out.println("Mensaje Descifrado (en bytes): " + new String(originalData));
        
        // Convertimos el resultado en una cadena y lo retornamos
        String valoresDescifrados = new String(originalData);
        return valoresDescifrados;
    }

    private static Key generateKey() throws Exception {
        // Vamos a ocupar llaves a partir de SecretKeySpec
        Key subllaveKawaii = new SecretKeySpec(keyvalue, instancia);
        return subllaveKawaii;
    }
}

