/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pkg03des;

/**
 *
 * @author Alumno
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

public class DES_GUI extends JFrame {
    private JTextArea textArea;
    private JButton btnCargar, btnCifrar, btnDescifrar;
    private File archivoSeleccionado;

    public DES_GUI() {
        setTitle("Cifrado y Descifrado con DES");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Área de texto
        textArea = new JTextArea();
        textArea.setEditable(false);
        add(new JScrollPane(textArea), BorderLayout.CENTER);

        // Panel de botones
        JPanel panelBotones = new JPanel();
        btnCargar = new JButton("Cargar Archivo");
        btnCifrar = new JButton("Cifrar");
        btnDescifrar = new JButton("Descifrar");

        panelBotones.add(btnCargar);
        panelBotones.add(btnCifrar);
        panelBotones.add(btnDescifrar);
        add(panelBotones, BorderLayout.SOUTH);

        // Eventos de los botones
        btnCargar.addActionListener(e -> cargarArchivo());
        btnCifrar.addActionListener(e -> cifrarArchivo());
        btnDescifrar.addActionListener(e -> descifrarArchivo());

        setVisible(true);
    }

    private void cargarArchivo() {
        JFileChooser fileChooser = new JFileChooser();
        int seleccion = fileChooser.showOpenDialog(this);
        if (seleccion == JFileChooser.APPROVE_OPTION) {
            archivoSeleccionado = fileChooser.getSelectedFile();
            textArea.setText(DESUtils.leerArchivo(archivoSeleccionado));
        }
    }

    private void cifrarArchivo() {
        if (archivoSeleccionado != null) {
            File archivoCifrado = new File(archivoSeleccionado.getAbsolutePath() + ".cifrado");
            DESUtils.cifrarArchivo(archivoSeleccionado, archivoCifrado);
            JOptionPane.showMessageDialog(this, "Archivo cifrado guardado en: " + archivoCifrado.getName());
        } else {
            JOptionPane.showMessageDialog(this, "Primero, carga un archivo.");
        }
    }

    private void descifrarArchivo() {
        if (archivoSeleccionado != null) {
            File archivoCifrado = new File(archivoSeleccionado.getAbsolutePath());
            File archivoDescifrado = new File(archivoSeleccionado.getAbsolutePath() + ".descifrado");
            DESUtils.descifrarArchivo(archivoCifrado, archivoDescifrado);
            textArea.setText(DESUtils.leerArchivo(archivoDescifrado));
            JOptionPane.showMessageDialog(this, "Archivo descifrado guardado en: " + archivoDescifrado.getName());
        } else {
            JOptionPane.showMessageDialog(this, "Primero, carga un archivo.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(DES_GUI::new);
    }
}
