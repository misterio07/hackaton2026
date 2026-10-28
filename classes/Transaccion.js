/*clase transaccion*/

class Transaccion {

  static historial = [];
  static idIncremento = 1;

  constructor(tipo, descripcion, monto, categoria,fecha) {
    this.id = Transaccion.idIncremento++;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.monto = monto;
    this.categoria = categoria;
    this.fecha = fecha;

    Transaccion.historial.push(this);
  }

  static obtenerHistorial(){
    return Transaccion.historial ;
  }
  

}


export default Transaccion;