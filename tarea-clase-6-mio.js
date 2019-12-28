//TAREA 1
const $calcularEdades = document.querySelector("#calcular-edades");
const infoEdades = document.querySelector("#info-edades");
const $resetear = document.querySelector("#reiniciar");
const familia = document.querySelector("#familia");
const integrantes = document.querySelector("#integrantes");
let $botonCalcularIntegrantes = document.querySelector("#calcular-integrantes")

$botonCalcularIntegrantes.onclick = function () {
    let $ingresarFamilia = document.querySelector("#ingresar-familia").value
    borrarIntegrantes()
    calcularIntegrantes($ingresarFamilia)
}

function calcularIntegrantes($ingresarFamilia) {

    for (let i = 1; i <= $ingresarFamilia; i++) {
        const div = document.createElement("div");
        div.className = "integrante"
        const label = document.createElement("label");
        label.textContent = `Edad del familiar ${i}:  `
        const input = document.createElement("input");
        input.type = "number";
        input.id = `edad-${i}`;
        div.appendChild(label);
        div.appendChild(input);
        integrantes.appendChild(div);
    }
    event.preventDefault();
}

function borrarIntegrantes() {
    const $integrantes = document.querySelectorAll(".integrante")
    for (let i = 0; i < $integrantes.length; i++) {
        $integrantes[i].remove()
    }
    event.preventDefault();
}

function menorNodo(edades) {
    let menor = Number(edades[0].value);
    for (let el of edades) {
        if (Number(el.value) < menor) {
            menor = Number(el.value);
        }
    }
    return menor;
}

function mayorNodo(nodo) {
    let mayor = Number(nodo[0].value);
    for (let el of nodo) {
        if (Number(el.value) > mayor) {
            mayor = Number(el.value);
        }
    }
    return mayor;
}

function promedioNodo(nodo) {
    let promedio = 0;
    for (let el of nodo) {
        promedio += Number(el.value);
    }
    return promedio / nodo.length;
}

function agregarALista(lista, texto) {
    const txt = document.createTextNode(texto);
    const div = document.createElement("div");
    lista.appendChild(txt);
    lista.appendChild(div);
}

$calcularEdades.onclick = function () {
    const edades = document.querySelectorAll(".edad");
    agregarALista(infoEdades, `La persona mas chica tiene ${menorNodo(edades)} años.`);
    agregarALista(infoEdades, `La persona mas grande tiene ${mayorNodo(edades)} años.`);
    agregarALista(infoEdades, `La edad promedio es de ${promedioNodo(edades).toFixed(2)} años.`);
    $calcularEdades.disabled = true;
    return false;
}

$resetear.onclick = function () {
    document.getElementById("familia").reset();
    while (infoEdades.hasChildNodes()) {
        infoEdades.removeChild(infoEdades.childNodes[0]);
    }
    while (familia.hasChildNodes()) {
        familia.removeChild(familia.childNodes[0]);
    }
    $calcularEdades.disabled = false;
    $botonCalcularIntegrantes.disabled = false;
    location.reload();
    return false;
}

//TAREA 2

const infoSueldos = document.querySelector("#info-sueldos");
const sueldos = document.querySelector("#sueldos");
const $agregarSueldo = document.querySelector("#agregar-sueldo");
const $quitarSueldo = document.querySelector("#quitar-sueldo");
const $calcularSueldos = document.querySelector("#calcular-sueldos");
let sum = 0

function agregarSueldos() {
    sum++;
    let contadorSueldos = (sueldos.childNodes.length);
    const label = document.createElement("label");
    const sueldoFamiliar = document.createTextNode(`Sueldo mensual del familiar ${sum}:`);
    const input = document.createElement("input");
    input.type = "number";
    input.classList.add("sueldo");
    input.id = `sueldo-${contadorSueldos}`;
    const div = document.createElement("div");
    label.appendChild(sueldoFamiliar);
    sueldos.appendChild(label);
    sueldos.appendChild(input);
    sueldos.appendChild(div);
}

function filtrarInputsVacios(nodo) {
    let filtrados = [];
    for (let i = 0; i < nodo.length; i++) {
        if (nodo[i].value !== "") {
            filtrados.push(nodo[i]);
        }
    }
    return filtrados;
}

$agregarSueldo.onclick = function () {
    agregarSueldos()
    return false;
}

$quitarSueldo.onclick = function () {
    for (let i = 0; i < 3; i++) {
        sueldos.removeChild(sueldos.lastChild);
    }
    return false;
}

$calcularSueldos.onclick = function () {
    while (infoSueldos.hasChildNodes()) {
        infoSueldos.removeChild(infoSueldos.childNodes[0]);
    }
    const sueldos = document.querySelectorAll(".sueldo");
    const sueldosFiltrados = filtrarInputsVacios(sueldos);
    agregarALista(infoSueldos, `El menor sueldo mensual es de $${menorNodo(sueldosFiltrados)}`);
    agregarALista(infoSueldos, `El mayor sueldo mensual es de $${mayorNodo(sueldosFiltrados)}`);
    agregarALista(infoSueldos, `El sueldo mensual promedio es de $${promedioNodo(sueldosFiltrados).toFixed(2)}`);
    agregarALista(infoSueldos, `El sueldo anual promedio es de $${(promedioNodo(sueldosFiltrados)* 12).toFixed(2)}`);
    return false;
}