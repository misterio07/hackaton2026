

import Transaccion from "./classes/Transaccion.js";


/* probando */
const sueldo = new Transaccion("ingreso","sueldo",5000,"trabajo");
const compra = new Transaccion("gasto","kiosco",1299,"Alfajor");
const historial = Transaccion.obtenerHistorial();

console.log(historial);