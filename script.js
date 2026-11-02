import Transaccion from "./classes/Transaccion.js";

/* probando */
/* const sueldo = new Transaccion(
  "ingreso",
  "sueldo",
  100000,
  "trabajo",
  "2026-10-28",
);
const compra = new Transaccion(
  "gasto",
  "kiosco",
  40000,
  "Alfajor",
  "2026-10-28",
);
const sueldo1 = new Transaccion(
  "ingreso",
  "sueldo",
  80000,
  "trabajo",
  "2026-09-28",
);
const compra2 = new Transaccion(
  "gasto",
  "kiosco",
  60000,
  "Alfajor",
  "2026-09-28",
); */

let historial = Transaccion.obtenerHistorial();

/*funcion para guardar historial en localStorage */
const datosGuardados = localStorage.getItem("historial");

if (datosGuardados) {
  Transaccion.historial = JSON.parse(datosGuardados);
  actualizarTarjetas();
  historial = Transaccion.obtenerHistorial();
  Transaccion.idIncremento =
    Math.max(...Transaccion.historial.map((t) => t.id)) + 1;
}
/*funcion  para guardar una copia del historial actual en el localStorage*/
function guardarHistoria() {
  localStorage.setItem("historial", JSON.stringify(Transaccion.historial));
}
guardarHistoria();

/* calcular ingresos y gasto mes actual */

function calculo(
  valor,
  idElemento,
  fecha = new Date().toISOString().slice(0, 10),
) {
  const tarjeta = document.getElementById(idElemento);
  const mesAnio = fecha.slice(0, 7); /*2026-10 */

  const mostrar = historial.filter(
    (a) => a.tipo === valor && a.fecha.slice(0, 7) === mesAnio,
  );
  const resultado = mostrar.reduce((acumulador, Transaccion) => {
    return acumulador + Transaccion.monto;
  }, 0);
  tarjeta.textContent = resultado;
  return resultado;
}

/* calcular ingresos y gastos mes anterior */
function calculo2(valor, fecha = new Date().toISOString().slice(0, 10)) {
  const fechaAnterior = new Date(fecha + "T12:00:00");
  fechaAnterior.setDate(1);
  fechaAnterior.setMonth(fechaAnterior.getMonth() - 1);
  const mesAnterior =
    fechaAnterior.getFullYear() +
    "-" +
    String(fechaAnterior.getMonth() + 1).padStart(2, "0");

  const resultado = historial
    .filter((a) => a.tipo === valor && a.fecha.slice(0, 7) === mesAnterior)
    .reduce((acumulador, transaccion) => acumulador + transaccion.monto, 0);

  return resultado;
}

/*funcion para calcular la diferencia entre un mes y otro */

function diferencia(id, valor, actual, anterior) {
  const elemento = document.getElementById(id);
  let resultado = actual - anterior;

  let cambiar;

  if (resultado === 0) {
    cambiar = "#9CA3AF";
  } else if (valor === "gasto") {
    cambiar = resultado > 0 ? "#dc2626" : "#16A34A";
  } else {
    cambiar = resultado > 0 ? "#16A34A" : "#dc2626";
  }
  elemento.innerHTML =
    resultado === 0
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
      : resultado > 0
        ? `<div class="flex  justify-center items-center ">
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
/*funcion para actializar las tarjetas */
function actualizarTarjetas() {
  const gasto = calculo("gasto", "gasto");
  const ingreso = calculo("ingreso", "ingreso");

  const gasto2 = calculo2("gasto");
  const ingreso2 = calculo2("ingreso");

  const a = ingreso - gasto;
  const b = ingreso2 - gasto2;

  document.getElementById("balance").textContent = a;

  diferencia("ingresoP", "ingreso", ingreso, ingreso2);
  diferencia("gastoP", "gasto", gasto, gasto2);
  diferencia("balanceP", "balance", a, b);
}

actualizarTarjetas();

/* Código de Ivo */

/* Para las class https://lenguajejs.com/javascript/oop/que-es/ 
 https://www.youtube.com/watch?v=aozaIKnxygA
 es un problema del seccion pq el historial tambien se ve asi
 investigar en el input como ocultar el texto que sobresalga
 en el javascript:
 traer todos los elementos del formulario
 usar la clase y guardar los value en la clase
 en el array guardar el historial(se hace automatico)--> */

const descripción = document.getElementById("descripción");
const monto = document.getElementById("monto");
const tipo = document.getElementById("tipo");
const categoría = document.getElementById("categoría");
const fecha = document.getElementById("fecha");
const formulario = document.getElementById("formulario");
let verificado = false;

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  verificado = true;

  /* Validación Formulario */

  descripción.classList.add(
    event.target[0].value.length === 0 ?  "border-red-600 " : "border-green-600",
  );
  monto.classList.add(
    event.target[0].value.length === 0 ? "border-red-600" : "border-green-600",
  );

  if (event.target[0].value.length <= 3) {
    descripción.classList.replace("border-green-600", "border-red-600");
    msgDescripcion.textContent =
      "Colocar una descripcion de al menos 4 carácteres";
    verificado = false;
  } else {
    descripción.classList.remove();
    descripción.classList.replace("border-red-600", "border-green-600");
    msgDescripcion.textContent = "";
  }

  if (event.target[1].value.length < 1) {
    monto.classList.replace("border-green-600", "border-red-600");
    msgMonto.textContent = "Dar un monto";
    verificado = false;
  } else {
    monto.classList.replace("border-red-600", "border-green-600");
    msgMonto.textContent = "";
  }

  /* Guardar Registro */

  if (verificado === true) {
    new Transaccion(
      tipo.value,
      descripción.value,
      Number(monto.value),
      categoría.value,
      fecha.value,
    );
    console.log(historial);
    localStorage.setItem("historial", JSON.stringify(Transaccion.historial));
    actualizarTarjetas();
    mostrarTabla(historial);
    botonEliminar();
    descripción.value = "";
    monto.value = "";
    verificado = false;
    descripción.classList.remove("border-green-600");
    monto.classList.remove("border-green-600");
  }
});
actualizarTarjetas();

const msgDescripcion = document.getElementById("msgDescripción");
const msgMonto = document.getElementById("msgMonto");
fecha.value = `${new Date().toISOString().slice(0, 10)}`;

const tabla = document.getElementById("tabla");
const textoTabla = document.getElementById("textoTabla");

const mostrarTabla = (parametro) => {
  tabla.innerHTML=""
  /* const filtro = parametro.filter((e) => e.id > historial.length - 4);

  const filtrado = filtro */
  const ordenados = [...parametro].sort((a, b) => 
  new Date(b.fecha) - new Date(a.fecha)
);

const filtro = ordenados.slice(0, 4);
    const filtrado = filtro.map(
      (e) =>
        `
            <tr class="${e.tipo === "ingreso" 
  ? "bg-green-100 text-green-700 sombra-verde" 
  : "bg-red-100 text-red-700 sombra-roja"}">
                <td class="p-1">${e.descripcion}</td>
                <td>${e.categoria}</td>
                <td>${e.monto}</td>
                <td>${e.fecha.slice(5,10)}</td>
                <td class="flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
<path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
</svg></td>
            </tr>`,
    )
    .join("");
  tabla.innerHTML = filtrado;
  if (tabla.children.length == 0) {
    textoTabla.classList.replace("invisible", "visible");
  } else {
    textoTabla.classList.replace("visible", "invisible");
  }
};

mostrarTabla(historial);

const botonEliminar = () => {
  const botones = document.querySelectorAll("td svg");
  botones.forEach((b) => {
    b.addEventListener("click", (event) => {
      let tr = event.target.closest("tr");
      let td = tr.querySelectorAll("td");
      eliminarRegistro(td[0].textContent, td[1].textContent, td[2].textContent);
    });
  });
};
botonEliminar();
const eliminarRegistro = (descripcion, categoria, monto) => {
  const elementoEliminar = historial.find(
    (e) =>
      e.descripcion == descripcion &&
      e.categoria == categoria &&
      e.monto == monto,
  );
  historial.splice(historial.indexOf(elementoEliminar), 1);
  localStorage.setItem("historial", JSON.stringify(historial));
  mostrarTabla(historial);
  botonEliminar();
};

const select = document.getElementById("filtroCategoria");

select.addEventListener("change", (e) => {
  if (e.target.value !== "todos") {
    const filtro = historial.filter((r) => r.tipo == e.target.value);
    mostrarTabla(filtro);
  } else {
    mostrarTabla(historial);
  }
});
