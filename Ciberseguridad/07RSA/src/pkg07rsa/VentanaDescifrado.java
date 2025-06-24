/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg07rsa;

import javax.swing.*;
import java.awt.*;
import java.math.BigInteger;

public class VentanaDescifrado extends JFrame {
    public VentanaDescifrado() {
        setTitle("Descifrado RSA");
        setLayout(new GridLayout(7, 2, 5, 5));

        JTextField campoD = new JTextField();
        JTextField campoN = new JTextField();
        JTextField campoCifrado = new JTextField();
        JTextArea areaDescifrado = new JTextArea(5, 20);
        JButton btnDescifrar = new JButton("Descifrar");
        JButton btnVolver = new JButton("Volver");

        add(new JLabel("Clave privada d:"));
        add(campoD);
        add(new JLabel("Clave pública n:"));
        add(campoN);
        add(new JLabel("Mensaje cifrado (números separados por espacio):"));
        add(campoCifrado);
        add(btnDescifrar);
        add(new JLabel(""));
        add(new JLabel("Mensaje descifrado:"));
        add(new JScrollPane(areaDescifrado));
        add(btnVolver);
        add(new JLabel(""));

        btnDescifrar.addActionListener(e -> {
            try {
                BigInteger d = new BigInteger(campoD.getText());
                BigInteger n = new BigInteger(campoN.getText());
                String[] partes = campoCifrado.getText().trim().split("\\s+");

                BigInteger[] cifrado = new BigInteger[partes.length];
                for (int i = 0; i < partes.length; i++) {
                    cifrado[i] = new BigInteger(partes[i]);
                }

                char[] mensaje = new char[cifrado.length];
                for (int i = 0; i < cifrado.length; i++) {
                    mensaje[i] = (char) cifrado[i].modPow(d, n).intValue();
                }

                areaDescifrado.setText(new String(mensaje));

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error al descifrar: " + ex.getMessage());
            }
        });

        btnVolver.addActionListener(e -> {
            dispose();
            new VentanaPrincipal();
        });

        setSize(600, 400);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);
    }
}

