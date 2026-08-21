//Simulador de evento
const tReferencia = Date.now();

const eventos = [
  { id: 1, tipo: 'iniciosesion', programado: tReferencia + 500},
  { id: 2, tipo: 'descarga', programado: tReferencia + 1200},
  { id: 3, tipo: 'notificacion', programado: tReferencia + 330},
  { id: 4, tipo: 'cierre', programado: tReferencia + 450},
  { id: 5, tipo: 'actualizacion', programado: tReferencia + 1000},
  { id: 6, tipo: 'error', programado: tReferencia + 650},
  { id: 7, tipo: 'mensaje', programado: tReferencia + 220},
  { id: 8, tipo: 'alerta', programado: tReferencia + 580},
]

//Callbacks anidados
function getinicioSesion(callback) {
  setTimeout(() => {
    eventos[0].real = Date.now();
    console.log('Evento disparado:', eventos[0].tipo);
    callback(eventos[0]);
  }, 500);
}

function getDescarga(callback) {
  setTimeout(() => {
    eventos[1].real = Date.now();
    console.log('Evento disparado:', eventos[1].tipo);
    callback(eventos[1]);
  }, 1200);
}

function getNotificacion(callback) {
  setTimeout(() => {
    eventos[2].real = Date.now();
    console.log('Evento disparado:', eventos[2].tipo);
    callback(eventos[2]);
  }, 330);
}

function getCierre(callback) {
  setTimeout(() => {
    eventos[3].real = Date.now();
    console.log('Evento disparado:', eventos[3].tipo);
    callback(eventos[3]);
  }, 450);
}

function getActualizacion(callback) {
  setTimeout(() => {
    eventos[4].real = Date.now();
    console.log('Evento disparado:', eventos[4].tipo);
    callback(eventos[4]);
  }, 1000);
}

function getError(callback) {
  setTimeout(() => {
    eventos[5].real = Date.now();
    console.log('Evento disparado:', eventos[5].tipo);
    callback(eventos[5]);
  }, 650);
}

function getMensaje(callback) {
  setTimeout(() => {
    eventos[6].real = Date.now();
    console.log('Evento disparado:', eventos[6].tipo);
    callback(eventos[6]);
  }, 220);
}

function getAlerta(callback) {
  setTimeout(() => {
    eventos[7].real = Date.now();
    console.log('Evento disparado:', eventos[7].tipo);
    callback(eventos[7]);
  }, 580);
}

//Callbacks anidados - Callbacks Hell
const registro = [];

getinicioSesion((evento1) => {
  registro.push(evento1);
  getDescarga((evento2) => {
    registro.push(evento2);
    getNotificacion((evento3) => {
      registro.push(evento3);
      getCierre((evento4) => {
        registro.push(evento4);
        getActualizacion((evento5) => {
          registro.push(evento5);
          getError((evento6) => {
            registro.push(evento6);
            getMensaje((evento7) => {
              registro.push(evento7);
              getAlerta((evento8) => {
                registro.push(evento8);
                console.log('Todos los eventos han sido disparados:');
                console.table(registro);
                //Latencia
                const Latencia = registro.reduce((acum, actual) => {
                  return acum + (actual.real - actual.programado);
                }, 0);

                const PromLatencia = Latencia / registro.length;
                console.log('Latencia promedio:', PromLatencia, 'ms');

                //Desvíos mayores a 50ms
                const filtroEventos = registro.filter(eventos => {
                  return (eventos.real - eventos.programado) > 50;
                })
                console.log('Eventos de desvio mayor a 50');
                console.table(filtroEventos);

                const PrimerDesviacion = registro.find(eventos => {
                  return eventos.real - eventos.programado > 50;
                });

                //Evento fueras de orden
                let maxScheduleSoFar = -Infinity;

                const FOEvento = registro.find((eventos => {
                  if (eventos.programado < maxScheduleSoFar) {
                    return true;
                  }

                  maxScheduleSoFar = Math.max(maxScheduleSoFar, eventos.programado);
                }));

                console.log('Primer evento fuera de orden:', FOEvento);
              });
            });
          });
        });
      });
    });
  });
});

