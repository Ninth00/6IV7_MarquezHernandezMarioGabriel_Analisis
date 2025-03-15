// Definición del objeto Vigenère para cifrado y descifrado
var vigenere = vigenere || (function() {

    var proceso = function(txt, desp, action) {
        var replace = (function() {
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var longitud = abc.length;

            return function(c) {
                var i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        // Cifrar
                        pos += desp;
                        pos = (pos >= longitud) ? pos - 1 : pos;
                    } else {
                        // Descifrar
                        pos -= desp;
                        pos = (pos < 0) ? pos + longitud : pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();

        var re = (/([a-z])/ig);
        return String(txt).replace(re, function(match) {
            return replace(match);
        });
    };

    return {
        encode: function(txt, desp) {
            return proceso(txt, desp, true);
        },
        decode: function(txt, desp) {
            return proceso(txt, desp, false);
        }
    };

})();

// Función para cifrar texto utilizando la clave
function codificar(texto, clave) {
    var resultado = "";
    var indiceclave = 0;
    var charartexto = texto.split('');

    for (var i = 0; i < charartexto.length; i++) {
        var desp = obindiceClave(clave.charAt(indiceclave));
        var chartexto = charartexto[i];

        resultado += vigenere.encode(chartexto, (desp >= 26) ? desp % 26 : desp);
        indiceclave++;

        if (indiceclave >= clave.length) {
            indiceclave = 0;
        }
    }
    return resultado;
}

// Función para obtener el índice de la clave
function obindiceClave(reco) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

// Función para decodificar texto utilizando la clave
function decodificar(texto, clave) {
    var resultado = "";
    var indiceclave = 0;
    var charartexto = texto.split('');

    for (var i = 0; i < charartexto.length; i++) {
        var desp = obindiceClave(clave.charAt(indiceclave));
        var chartexto = charartexto[i];

        resultado += vigenere.decode(chartexto, (desp >= 26) ? desp % 26 : desp);
        indiceclave++;

        if (indiceclave >= clave.length) {
            indiceclave = 0;
        }
    }
    return resultado;
}

// Función para manejar eventos y DOM
document.addEventListener('DOMContentLoaded', function() {
    const txt = document.getElementById("txt");
    const txtclave = document.getElementById("txtclave");
    const respuesta = document.getElementById("respuesta");

    // Función para cifrar
    function cifrar() {
        const texto = txt.value;
        const clave = txtclave.value;
        if (texto && clave) {
            const resultado = codificar(texto, clave);
            respuesta.value = resultado;
        } else {
            alert("Por favor ingrese texto y clave.");
        }
    }

    // Función para descifrar
    function descifrar() {
        const texto = txt.value;
        const clave = txtclave.value;
        if (texto && clave) {
            const resultado = decodificar(texto, clave);
            respuesta.value = resultado;
        } else {
            alert("Por favor ingrese texto y clave.");
        }
    }

    // Función para reiniciar los campos
    function reiniciar() {
        txt.value = '';
        txtclave.value = '';
        respuesta.value = '';
    }

    // Función para copiar el resultado al portapapeles
    function copiar() {
        respuesta.select();
        document.execCommand("copy");
    }

    // Asignar eventos a los botones
    document.getElementById("btnCifrar").addEventListener("click", cifrar);
    document.getElementById("btnDescifrar").addEventListener("click", descifrar);
    document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
    document.getElementById("btnCopiar").addEventListener("click", copiar);
});
