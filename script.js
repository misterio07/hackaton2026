

import Transaccion from "./classes/Transaccion.js";


/* probando */
const sueldo = new Transaccion("ingreso", "sueldo", 5000, "trabajo");
const compra = new Transaccion("gasto", "kiosco", 1299, "Alfajor");
const historial = Transaccion.obtenerHistorial();

console.log(historial);

/* funcion calcular total ingreso y gasto*/

function calculo(valor, idElemento) {
    const ingreso = document.getElementById(idElemento);

    if (valor != "balance") {
       const mostrar = historial.filter(a => a.tipo === valor);
       
        ingreso.textContent = mostrar.reduce((acumulador, Transaccion) => {
            return acumulador + Transaccion.monto;
        }, 0
        );
    } else {
        const ingreso = historial.filter(a => a.tipo === "ingreso").reduce((acumulador, Transaccion) => {
            return acumulador + Transaccion.monto;
        }, 0)
        const gasto = historial.filter(a => a.tipo === "gasto").reduce((acumulador, Transaccion) => {
            return  acumulador + Transaccion.monto;
        }, 0)
        return balance.textContent = (ingreso-gasto)
    }

}

/*funcion diferencia mes anterior*/



calculo("gasto", "gasto");
calculo("ingreso", "ingreso");
calculo("balance", "balance")

