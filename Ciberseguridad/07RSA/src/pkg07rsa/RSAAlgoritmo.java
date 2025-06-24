/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg07rsa;

import java.math.BigInteger;
import java.util.Random;

public class RSAAlgoritmo {
    BigInteger n, p, q, fi, e, d;

    // Asignar p y q directamente desde el usuario
    public void setPrimos(int pValor, int qValor) {
        this.p = BigInteger.valueOf(pValor);
        this.q = BigInteger.valueOf(qValor);
    }

    // Genera claves públicas y privadas
    public void generarClaves() {
        try {
            n = p.multiply(q);
            fi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));
            do {
                e = new BigInteger(8, new Random());
            } while ((e.compareTo(BigInteger.ONE) <= 0 || e.compareTo(fi) >= 0 || !e.gcd(fi).equals(BigInteger.ONE)));
            d = e.modInverse(fi);
        } catch (Exception ex) {
            System.out.println("Error al generar claves: " + ex.getMessage());
        }
    }

    public BigInteger getN() { return n; }
    public BigInteger getE() { return e; }
    public BigInteger getD() { return d; }
    public BigInteger getP() { return p; }
    public BigInteger getQ() { return q; }
    public BigInteger getFi() { return fi; }

    public BigInteger[] cifrar(String mensaje) {
        try {
            byte[] bytes = mensaje.getBytes();
            BigInteger[] resultado = new BigInteger[bytes.length];
            for (int i = 0; i < bytes.length; i++) {
                resultado[i] = BigInteger.valueOf(bytes[i]).modPow(e, n);
            }
            return resultado;
        } catch (Exception ex) {
            System.out.println("Error al cifrar: " + ex.getMessage());
            return null;
        }
    }

    public String descifrar(BigInteger[] cifrado) {
        try {
            char[] chars = new char[cifrado.length];
            for (int i = 0; i < cifrado.length; i++) {
                chars[i] = (char) (cifrado[i].modPow(d, n).intValue());
            }
            return new String(chars);
        } catch (Exception ex) {
            System.out.println("Error al descifrar: " + ex.getMessage());
            return "";
        }
    }
}
