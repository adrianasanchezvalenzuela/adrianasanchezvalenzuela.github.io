var tarjetas = [
    "1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg",
    "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg",
    "7.jpg", "7.jpg", "8.jpg", "8.jpg", "9.jpg", "9.jpg",
];

var esperando, imagen_temporal = false;
var contador = 0;
var cronometro;
var tiempo = 0;
var record = localStorage.getItem('record') || 'N/A'; // Cargar el récord del localStorage o mostrar "N/A" si no existe.

function cambiarImagen(imagen, indice) {
    imagen.src = "./img/" + tarjetas[indice];
    imagen.removeAttribute("onclick");
    if (!esperando) {
        imagen_temporal = imagen; // Guardar la primera imagen seleccionada
    } else {
        // Comparar si las dos imágenes coinciden
        if (imagen_temporal.src === imagen.src) {
            // Son iguales (par encontrado)
            DesaparecerPar(imagen_temporal, imagen);
        } else {
            // No son iguales (no es un par)
            setTimeout(function() {
                Regresar(imagen_temporal, imagen); // Restaurar las imágenes después de 500 ms
            }, 500);
        }
    }
    esperando = !esperando;
}

function Regresar(imagen1, imagen2){
    imagen1.src = "./img/0.jpg";
    imagen2.src = "./img/0.jpg";
    imagen1.setAttribute("onclick", `cambiarImagen(this, ${imagen1.id})`);
    imagen2.setAttribute("onclick", `cambiarImagen(this, ${imagen2.id})`);
}

function DesaparecerPar(imagen1, imagen2) {
    imagen1.style.visibility = "hidden";
    imagen2.style.visibility = "hidden";
    imagen1.removeAttribute("onclick");
    imagen2.removeAttribute("onclick");
    contador++;
    if (contador != 9){
        document.getElementById("contador").innerHTML = `Pares Encontrados: ${contador}`;
    } else {
        document.getElementById("contador").innerHTML = `Pares Encontrados: ${contador} ¡Ganaste!`;
        detenerCronometro();
    }
}

function revolver() {
    for (let i = tarjetas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tarjetas[i], tarjetas[j]] = [tarjetas[j], tarjetas[i]];
    }
}

function Fondo(){
    var fondo = Math.floor(Math.random() * 3) + 1;
    document.getElementById("tablita").style = `background-image: url("./img/fondo${fondo}.jpg");`;
}

function Reiniciar(){
    location.reload();
}

// Funciones para el cronómetro
function iniciarCronometro() {
    cronometro = setInterval(function() {
        tiempo++;
        document.getElementById("cronometro").innerText = `Tiempo: ${tiempo}s`;
    }, 1000);
}

function detenerCronometro() {
    clearInterval(cronometro);
    guardarRecord();
}

function guardarRecord() {
    // Verificar si es el mejor tiempo
    if (record === 'N/A' || tiempo < parseInt(record)) {
        localStorage.setItem('record', tiempo);
        record = tiempo;
        document.getElementById("record").innerText = `Mejor Tiempo: ${record}s`;
    }
}

window.onload = function() {
    revolver();
    Fondo();
    iniciarCronometro();
    document.getElementById("record").innerText = `Mejor Tiempo: ${record}s`;
}

