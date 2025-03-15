//obtener los datos para cifrar
const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");

//obtener los datos para descifrar
const desplazamiento2 = document.getElementById("desplazamiento2");
const texto2 = document.getElementById("texto2");
const textoCifrado2 = document.getElementById("cifrado2");

//vamos a crear una funcion que se encargue de el algoritmo de cesar

function cifrado(){

    //obtener el texto que se ingreso para cifrar
    const textoIngresado = texto.value;
    //debo de obtener cada caracter de la cadena y validar unicamente caraceres
    textoCifrado.value = textoIngresado.split('').map( c => {
        let mayus = (c === c.toUpperCase())? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        
        if(valorEntero >= 97 && valorEntero <= 122){
            //son letras
            //entonces las cifro
            const valorDesplazamiento = parseInt(desplazamiento.value);
            if(valorEntero + valorDesplazamiento > 122){
                valorEntero = 97 + (valorEntero - 122 ) + valorDesplazamiento - 1;
            }else{
                valorEntero = valorEntero + valorDesplazamiento;
            }
        }
        //debo juntar los elementos para la cadena de cifrado
        
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
        
    }).join('');
    console.log("Texto cifrado:", textoCifrado.value);
}

function descifrado() {
    // Obtener el texto que se ingresó para descifrar
    const textoIngresado = texto2.value;

    // Debo de obtener cada carácter de la cadena y validar únicamente caracteres alfabéticos
    textoCifrado2.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);

        // Solo proceder si el carácter es una letra
        if (valorEntero >= 97 && valorEntero <= 122) {
            // Es una letra (de la a a la z)
            const valorDesplazamiento = parseInt(desplazamiento2.value);

            // Descifrar: restar el desplazamiento
            valorEntero = valorEntero - valorDesplazamiento;

            // Si el valor entra fuera del rango 'a' (97) a 'z' (122), ajustar
            if (valorEntero < 97) {
                valorEntero = 123 - (97 - valorEntero);
            }
        }
        
        // Convertir el código ASCII de vuelta a carácter
        let descifrado = String.fromCharCode(valorEntero);
        return mayus ? descifrado.toUpperCase() : descifrado;
    }).join('');

    console.log("Texto descifrado:", textoCifrado2.value);
}

texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado)

texto2.addEventListener("keyup", descifrado);
desplazamiento2.addEventListener("change", descifrado)