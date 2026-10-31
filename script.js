import Transaccion from "./classes/Transaccion.js";

/* probando */
const sueldo = new Transaccion("ingreso", "sueldo", 100000, "trabajo", '2026-10-28');
const compra = new Transaccion("gasto", "kiosco", 40000, "Alfajor", '2026-10-28');
const sueldo1 = new Transaccion("ingreso", "sueldo", 80000, "trabajo", '2026-09-28');
const compra2 = new Transaccion("gasto", "kiosco", 60000, "Alfajor", '2026-09-28');
 
let historial = Transaccion.obtenerHistorial();


/*funcion para guardar historial en localStorage */
const datosGuardados = localStorage.getItem("historial");

if (datosGuardados){
    Transaccion.historial = JSON.parse(datosGuardados);
    actualizarTarjetas()
    historial = Transaccion.obtenerHistorial();
    Transaccion.idIncremento = Math.max(...Transaccion.historial.map(t=>t.id)) + 1
    
}
/*funcion  para guardar una copia del historial actual en el localStorage*/
  function guardarHistoria(){
     localStorage.setItem("historial",JSON.stringify(Transaccion.historial));
    
}
guardarHistoria() 



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
const boton = document.getElementById("boton");
let bandera = false;

boton.addEventListener("click", (event) => {
    event.preventDefault();
    validarForm()
    if(bandera === true){
    new Transaccion(tipo.value, descripción.value, Number(monto.value), categoría.value,fecha.value); 
    console.log(historial);
    localStorage.setItem(
        "historial",
        JSON.stringify(Transaccion.historial)
    );
    actualizarTarjetas()
    mostrarTabla(historial)
    botonEliminar();
    tipo.value = "";
    descripción.value = "";
    monto.value = "";
    categoría.value = "";
    }
})
actualizarTarjetas();

const msgDescripcion = document.getElementById("msgDescripción")
const msgMonto = document.getElementById("msgMonto")
fecha.value = `${new Date().toISOString().slice(0,10)}`;

const validarForm = () => {
  const inputs = document.querySelector(".inputs")
  bandera = true;
  inputs.children[0].addEventListener("change", (e) => {
    if(e.target.value === "" || e.target.value.length < 3){
      msgDescripcion.textContent = "Colocar una descripcion de al menos 3 carácteres"
      bandera = false;
      return 
    }else{
      msgDescripcion.textContent = "";
    }
  })
  inputs.children[2].addEventListener("change", (e) => {
    if(e.target.value.length < 1){
      msgMonto.textContent = "Dar un monto";
      bandera = false;
      return
    }else{
      msgMonto.textContent = "";
    }
  })
  /* Por alguna razon, la bandera nunca cambia, tal vez habria que cambiar el evento para que no sea  change sino otro */
}


/* Que no se pueda enviar el form vacio(validaciones)
historial boton borrar y verificacion de categoria vacia.
local storage
un minimo de 4 */

const tabla = document.getElementById("tabla");
const textoTabla = document.getElementById("textoTabla");

const mostrarTabla = (parametro) => {
  const filtro = parametro.filter((e) => e.id > historial.length - 4);

    const filtrado = filtro
    .map(
      (e) =>
        `
            <tr>
                <td>${e.descripcion}</td>
                <td>${e.categoria}</td>
                <td>${e.monto}</td>
                <td><img src="./assets/borrar.png"></td>
            </tr>`,
    )
    .join("");
  tabla.innerHTML = filtrado;
  if(tabla.children.length == 0){
    textoTabla.classList.replace('invisible', 'visible')
  }else{
    textoTabla.classList.replace('visible', 'invisible')
  }
};

mostrarTabla(historial);


const botonEliminar = () => {
  const botones = document.querySelectorAll("td img");
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

/* Cuando Se Agrega registros en el form supera los 4 elementos de la tabla */
