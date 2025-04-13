/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg04aes;

import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        System.out.println("Ejemplo de Cifrado AES");
        String mensaje = "Había una vez un patito que decia miau miau";
        
        String mensajeCifrado = CifradorAES.encrypt(mensaje);
        System.out.println("El mensaje cifrado es: " + mensajeCifrado);
        
        String mensajeDescifrado = CifradorAES.decrypt(mensajeCifrado);
        System.out.println("El mensaje descifrado es: " + mensajeDescifrado);
    }
    
}
