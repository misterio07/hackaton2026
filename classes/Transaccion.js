/*clase transaccion*/

class Transaccion {
  static historial = [];
  static idIncremento = 1;
  constructor(tipo, descripcion, monto, categoria) {
    this.id = Transaccion.idIncremento++;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.monto = monto;
    this.categoria = categoria;

    Transaccion.historial.push(this);
  }
  static obtenerHistorial(){
    return Transaccion.historial ;
  }
}


export default Transaccion;