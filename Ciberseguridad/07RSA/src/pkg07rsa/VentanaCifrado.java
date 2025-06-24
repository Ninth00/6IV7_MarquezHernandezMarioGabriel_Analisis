/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg07rsa;

import javax.swing.*;
import java.awt.*;
import java.math.BigInteger;

public class VentanaCifrado extends JFrame {
    RSAAlgoritmo rsa = new RSAAlgoritmo();

    public VentanaCifrado() {
        setTitle("Cifrado RSA");
        setLayout(new GridLayout(10, 2, 5, 5));

        JTextField campoP = new JTextField();
        JTextField campoQ = new JTextField();
        JTextField campoMensaje = new JTextField();
        JTextArea areaResultados = new JTextArea(5, 20);
        JTextArea areaCifrado = new JTextArea(5, 20);

        JButton btnGenerar = new JButton("Generar Claves");
        JButton btnCifrar = new JButton("Cifrar");
        JButton btnVolver = new JButton("Volver");

        add(new JLabel("p (primo < 1000):"));
        add(campoP);
        add(new JLabel("q (primo < 1000):"));
        add(campoQ);
        add(btnGenerar);
        add(new JLabel(""));
        add(new JLabel("Mensaje a cifrar:"));
        add(campoMensaje);
        add(btnCifrar);
        add(new JLabel(""));

        add(new JLabel("Claves y operaciones:"));
        add(new JScrollPane(areaResultados));
        add(new JLabel("Mensaje cifrado:"));
        add(new JScrollPane(areaCifrado));
        add(btnVolver);
        add(new JLabel(""));

        btnGenerar.addActionListener(e -> {
            try {
                int p = Integer.parseInt(campoP.getText());
                int q = Integer.parseInt(campoQ.getText());
                if (!esPrimo(p) || !esPrimo(q) || p >= 1000 || q >= 1000) {
                    JOptionPane.showMessageDialog(this, "p y q deben ser primos menores de 1000.");
                    return;
                }

                rsa.setPrimos(p, q);
                rsa.generarClaves();

                areaResultados.setText("p: " + rsa.getP() + "\nq: " + rsa.getQ() + "\nn: " + rsa.getN() +
                        "\nfi: " + rsa.getFi() + "\ne: " + rsa.getE() + "\nd: " + rsa.getD());

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error en generación: " + ex.getMessage());
            }
        });

        btnCifrar.addActionListener(e -> {
            try {
                String mensaje = campoMensaje.getText();
                BigInteger[] cifrado = rsa.cifrar(mensaje);
                StringBuilder salida = new StringBuilder();
                for (BigInteger b : cifrado) {
                    salida.append(b.toString()).append(" ");
                }
                areaCifrado.setText(salida.toString().trim());
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error al cifrar: " + ex.getMessage());
            }
        });

        btnVolver.addActionListener(e -> {
            dispose();
            new VentanaPrincipal();
        });

        setSize(600, 500);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);
    }

    private boolean esPrimo(int num) {
        if (num <= 1) return false;
        for (int i = 2; i <= Math.sqrt(num); i++)
            if (num % i == 0) return false;
        return true;
    }
}
