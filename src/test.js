//Simulador de evento

const eventos = [
  {id: 1, tipo: 'iniciosesion', programado: 500, real: null},
  {id: 2, tipo: 'descarga', programado: 1200, real: null},
  {id: 3, tipo: 'notificacion', programado: 1800, real: null},
  {id: 4, tipo: 'cierre', programado: 3000, real: null},
  {id: 5, tipo: 'actualizacion', programado: 2400, real: null},
  {id: 6, tipo: 'error', programado: 2500, real: null},
  {id: 7, tipo: 'mensaje', programado: 3200, real: null},
  {id: 8, tipo: 'alerta', programado: 1500, real: null},
]
const tInicio = Date.now();

for (let i = 0; i < eventos.length; i++) {
  setTimeout(() => {
    const tReal = Date.now();
    console.log('Evento disparado:', eventos[i].tipo);
    const tiempoReal = tReal - tInicio;
    eventos[i].real = tiempoReal;
  }, eventos[i].programado);
}

setTimeout(() => {
  console.log('Todos los eventos han sido disparados:');
  console.table(eventos);
}, 3500);