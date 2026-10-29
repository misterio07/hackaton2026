

import Transaccion from "./classes/Transaccion.js";


/* probando */
const sueldo = new Transaccion("ingreso", "sueldo", 1000, "trabajo", '2026-10-28');
const compra = new Transaccion("gasto", "kiosco", 900, "Alfajor", '2026-10-28');
const sueldo1 = new Transaccion("ingreso", "sueldo", 1200, "trabajo", '2026-09-28');
const compra2 = new Transaccion("gasto", "kiosco", 800, "Alfajor", '2026-09-28');
const historial = Transaccion.obtenerHistorial();

console.log(historial);

/* calcular ingresos y gasto mes actual */

function calculo(valor, idElemento, fecha = new Date().toISOString().slice(0, 10)) {
    const tarjeta = document.getElementById(idElemento);
    const mesAnio = fecha.slice(0, 7);/*2026-10 */

    const mostrar = historial.filter(a => a.tipo === valor && a.fecha.slice(0, 7) === mesAnio);
    const resultado = mostrar.reduce((acumulador, Transaccion) => {
        return acumulador + Transaccion.monto;
    }, 0
    );
    tarjeta.textContent = resultado
    return resultado
}

/* calcular ingresos y gastos mes anterior */
function calculo2(valor, fecha = new Date().toISOString().slice(0, 10)) {
    const fechaAnterior = new Date(fecha + "T12:00:00");
    fechaAnterior.setMonth(fechaAnterior.getMonth() - 1);
    const mesAnterior = fechaAnterior.getFullYear() + "-" +
        String(fechaAnterior.getMonth() + 1).padStart(2, "0");

    const resultado = historial
        .filter(a => a.tipo === valor && a.fecha.slice(0, 7) === mesAnterior)
        .reduce((acumulador, transaccion) => acumulador + transaccion.monto, 0);

    return resultado
}

/*designar resultado de funciones a variables para reutilizar */
const gasto = calculo("gasto", "gasto");
const ingreso = calculo("ingreso", "ingreso");
const gasto2 = calculo2("gasto");
const ingreso2 = calculo2("ingreso");

/* calcular balance mes altual */
function balanceActual() {
    const balance = document.getElementById("balance")
    const resultado2 = ingreso - gasto
    balance.textContent = resultado2

    return resultado2
}
/* calcular balance mes anterior*/
function balanceAnterior() {
    const resultado2 = ingreso2 - gasto2
    return resultado2
}

/* designar resultado de funciones a variables para reutilizar*/
const a = balanceActual()
const b = balanceAnterior()
console.log(a,b)
function porcentaje(id, valor) {
    const elemento = document.getElementById(id)
    let resultado
    if (valor === "ingreso") {
        resultado = ingreso - ingreso2
    } else if (valor === "gasto") {
        resultado = gasto - gasto2 
    } else {
        resultado = a - b
        console.log(resultado)
    }
    
    let cambiar;

if (resultado === 0) {
    cambiar = "#9CA3AF";
} else if (valor === "gasto") {
    cambiar = resultado > 0 ? "#dc2626" : "#16A34A";
} else {
    cambiar = resultado > 0 ? "#16A34A" : "#dc2626";
}
    elemento.innerHTML = resultado === 0
        ? `<div class="flex  justify-center items-center "><svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="20"
  height="20"
>
  <path
    d="M15 50 H80 M60 30 L80 50 L60 70"
    fill="none"
    stroke="#9CA3AF"
    stroke-width="7"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>$${resultado} vs mes anterior</div>`
        : resultado > 0 ?
            `<div class="flex  justify-center items-center ">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <path
                d="M32 68 L67 33 M43 33 H67 V57"
                fill="none"
                stroke="${cambiar}"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>$${resultado.toFixed(2)} vs mes anterior </div>`
            : `<div class="flex  justify-center items-center "><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <path
                d="M32 32 L67 67 M43 67 H67 V43"
                fill="none"
                stroke="${cambiar}"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>$${resultado.toFixed(2)} vs mes anterior </div>`;
}

porcentaje("ingresoP", "ingreso")
porcentaje("gastoP", "gasto")
porcentaje("balanceP","balance")




/* Código de Ivo */

/* Para las class https://lenguajejs.com/javascript/oop/que-es/ 
 https://www.youtube.com/watch?v=aozaIKnxygA
 es un problema del seccion pq el historial tambien se ve asi
 investigar en el input como ocultar el texto que sobresalga
 en el javascript:
 traer todos los elementos del formulario
 usar la clase y guardar los value en la clase
 en el array guardar el historial(se hace automatico)--> */

const descripción = document.getElementById("descripción")
const monto = document.getElementById("monto")
const tipo = document.getElementById("tipo")
const categoría = document.getElementById("categoría")
const fecha = document.getElementById("fecha")
const boton = document.getElementById("boton")


boton.addEventListener("click", (event) => {
    event.preventDefault();
    new Transaccion(tipo.value, descripción.value, Number(monto.value), categoría.value,fecha.value); 
    console.log(historial);
    porcentaje("ingreso", "ingresosP")
    porcentaje("gasto","gastoP")

    calculo("gasto", "gasto");
    calculo("ingreso", "ingreso");
    calculo("balance", "balance")

    tipo.value = ""
    descripción.value = ""
})



/* Que no se pueda enviar el form vacio(validaciones)
historial(despues de que guille haga las funciones)
local storage
un minimo de 4 */