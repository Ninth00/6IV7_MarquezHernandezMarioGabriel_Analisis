/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg07rsa;

import javax.swing.*;
import java.awt.*;

public class VentanaPrincipal extends JFrame {
    public VentanaPrincipal() {
        setTitle("Sistema RSA");
        setLayout(new FlowLayout());

        JButton btnCifrar = new JButton("Cifrar Mensaje");
        JButton btnDescifrar = new JButton("Descifrar Mensaje");

        btnCifrar.addActionListener(e -> {
            dispose();
            new VentanaCifrado();
        });

        btnDescifrar.addActionListener(e -> {
            dispose();
            new VentanaDescifrado();
        });

        add(btnCifrar);
        add(btnDescifrar);

        setSize(300, 120);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);
    }
}
