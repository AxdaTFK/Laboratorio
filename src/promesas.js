//Simulador de evento
const tReferencia = Date.now();

const eventos = [
    { id: 1, tipo: 'iniciosesion', programado: tReferencia + 500, real: null },
    { id: 2, tipo: 'descarga', programado: tReferencia + 1200, real: null },
    { id: 3, tipo: 'notificacion', programado: tReferencia + 330, real: null },
    { id: 4, tipo: 'cierre', programado: tReferencia + 450, real: null },
    { id: 5, tipo: 'actualizacion', programado: tReferencia + 1000, real: null },
    { id: 6, tipo: 'error', programado: tReferencia + 650, real: null },
    { id: 7, tipo: 'mensaje', programado: tReferencia + 220, real: null },
    { id: 8, tipo: 'alerta', programado: tReferencia + 580, real: null },
]

//Promesas 
function promiseinicioSesion() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promiseinicioSesion',
                tipo: eventos[0].tipo,
                programado: eventos[0].programado,
                real: Date.now(),
            });
        }, 500);
    });
}

function promisedescarga() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promisedescarga',
                tipo: eventos[1].tipo,
                programado: eventos[1].programado,
                real: Date.now(),
            });
        }, 1200);
    });
}

function promisenotificacion() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promisenotificacion',
                tipo: eventos[2].tipo,
                programado: eventos[2].programado,
                real: Date.now(),
            });
        }, 330);
    });
}

function promisecierre() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promisecierre',
                tipo: eventos[3].tipo,
                programado: eventos[3].programado,
                real: Date.now(),
            });
        }, 450);
    });
}

function promiseactualizacion() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promiseactualizacion',
                tipo: eventos[4].tipo,
                programado: eventos[4].programado,
                real: Date.now(),
            });
        }, 1000);
    });
}

function promiseerror() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promiseerror',
                tipo: eventos[5].tipo,
                programado: eventos[5].programado,
                real: Date.now(),
            });
        }, 650);
    });
}

function promisemensaje() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promisemensaje',
                tipo: eventos[6].tipo,
                programado: eventos[6].programado,
                real: Date.now(),
            });
        }, 220);
    });
}

function promisealerta() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'promisealerta',
                tipo: eventos[7].tipo,
                programado: eventos[7].programado,
                real: Date.now(),
            });
        }, 580);
    });
}

//Promesas con then
const registro = [];

promiseinicioSesion()
    .then((evento1) => {
        registro.push(evento1);
        console.log('Evento disparado:', eventos[0].tipo);
        return promisedescarga();
    })
    .then((evento2) => {
        registro.push(evento2);
        console.log('Evento disparado:', eventos[1].tipo);
        return promisenotificacion();
    })
    .then((evento3) => {
        registro.push(evento3);
        console.log('Evento disparado:', eventos[2].tipo);
        return promisecierre();
    })
    .then((evento4) => {
        registro.push(evento4);
        console.log('Evento disparado:', eventos[3].tipo);
        return promiseactualizacion();
    })
    .then((evento5) => {
        registro.push(evento5);
        console.log('Evento disparado:', eventos[4].tipo);
        return promiseerror();
    })
    .then((evento6) => {
        registro.push(evento6);
        console.log('Evento disparado:', eventos[5].tipo);
        return promisemensaje();
    })
    .then((evento7) => {
        registro.push(evento7);
        console.log('Evento disparado:', eventos[6].tipo);
        return promisealerta();
    })
    .then((evento8) => {
        registro.push(evento8);
        console.log('Todos los eventos han sido disparados:');
        console.table(registro);
        const Latencia = registro.reduce((acum, actual) => {
            return acum + (actual.real - actual.programado);
        }, 0);

        const PromLatencia = Latencia / registro.length;
        console.log('Latencia promedio:', PromLatencia, 'ms');
    })

