

import Transaccion from "./classes/Transaccion.js";


/* probando */
const sueldo = new Transaccion("ingreso", "sueldo", 5000, "trabajo", '2026-10-27');
const compra = new Transaccion("ingreso", "kiosco", 6299, "Alfajor", '2026-09-27');
const sueldo1 = new Transaccion("gasto", "sueldo", 6400, "trabajo", '2026-10-27');
const compra2 = new Transaccion("gasto", "kiosco", 6299, "Alfajor", '2026-09-27');
const historial = Transaccion.obtenerHistorial();

console.log(historial);

/* funcion calcular total ingreso y gasto*/

function calculo(valor, idElemento, fecha = new Date().toISOString().slice(0, 10)) {
    const ingreso = document.getElementById(idElemento);
    const mesAnio = fecha.slice(0, 7);
    if (valor != "balance") {
        const mostrar = historial.filter(a => a.tipo === valor && a.fecha.slice(0, 7) === mesAnio);

        ingreso.textContent = mostrar.reduce((acumulador, Transaccion) => {
            return acumulador + Transaccion.monto;
        }, 0
        );
    } else {
        const ingreso = historial.filter(a => a.tipo === "ingreso" && a.fecha.slice(0, 7) === mesAnio).reduce((acumulador, Transaccion) => {
            return acumulador + Transaccion.monto;
        }, 0)
        const gasto = historial.filter(a => a.tipo === "gasto" && a.fecha.slice(0, 7) === mesAnio).reduce((acumulador, Transaccion) => {
            return acumulador + Transaccion.monto;
        }, 0)
        return balance.textContent = (ingreso - gasto)
    }

}

/*funcion diferencia mes anterior*/

function porcentaje(valor, id, fecha = new Date().toISOString().slice(0, 10)) {
    
    const ingresoP = document.getElementById(id);
    const fechaActual = new Date(fecha + "T12:00:00");
    const fechaAnterior = new Date(fechaActual);

    fechaAnterior.setMonth(fechaAnterior.getMonth() - 1);
    const mesAnio = fechaActual.getFullYear() + "-" +
        String(fechaActual.getMonth() + 1).padStart(2, "0");
    const mesAnterior = fechaAnterior.getFullYear() + "-" +
        String(fechaAnterior.getMonth() + 1).padStart(2, "0");

    const actual = historial
        .filter(a => a.tipo === valor && a.fecha.slice(0, 7) === mesAnio)
        .reduce((acumulador, transaccion) => acumulador + transaccion.monto, 0);
    
    const anterior = historial
        .filter(a => a.tipo === valor && a.fecha.slice(0, 7) === mesAnterior)
        .reduce((acumulador, transaccion) => acumulador + transaccion.monto, 0);
    
    let resultado;

    if (anterior === 0) {
        resultado = actual === 0 ? 0 : null;
    } else {
        resultado = ((actual - anterior) / anterior) * 100;
    }

    ingresoP.innerHTML = resultado === null
        ? "Sin datos del mes anterior"
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
                stroke="#16A34A"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>+${resultado.toFixed(2)}% vs mes anterior </div>`
            : `<div class="flex  justify-center items-center "><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <path
                d="M32 32 L67 67 M43 67 H67 V43"
                fill="none"
                stroke="#DC2626"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>${resultado.toFixed(2)}% vs mes anterior </div>`;
}

porcentaje("ingreso", "ingresosP")
porcentaje("gasto","gastoP")

calculo("gasto", "gasto");
calculo("ingreso", "ingreso");
calculo("balance", "balance")

