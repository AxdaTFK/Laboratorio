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

            console.log('Evento disparado:', eventos[0].tipo);

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

            console.log('Evento disparado:', eventos[1].tipo);

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

            console.log('Evento disparado:', eventos[2].tipo);

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

            console.log('Evento disparado:', eventos[3].tipo);

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

            console.log('Evento disparado:', eventos[4].tipo);

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

            console.log('Evento disparado:', eventos[5].tipo);

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

            console.log('Evento disparado:', eventos[6].tipo);

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

            console.log('Evento disparado:', eventos[7].tipo);

            resolve({
                id: 'promisealerta',
                tipo: eventos[7].tipo,
                programado: eventos[7].programado,
                real: Date.now(),
            });
        }, 580);
    });
}

//AsyncAways

async function runEventos() {
    const registro = [];

    registro.push(await promiseinicioSesion());
    registro.push(await promisedescarga());
    registro.push(await promisenotificacion());
    registro.push(await promisecierre());
    registro.push(await promiseactualizacion());
    registro.push(await promiseerror());
    registro.push(await promisemensaje());
    registro.push(await promisealerta());

    console.log('Todos los eventos han sido disparados:');
    console.table(registro);

    //Latencia
    const Latencia = registro.reduce((acum, actual) => {
        return acum + (actual.real - actual.programado);
    }, 0);

    const PromLatencia = Latencia / registro.length;
    console.log('Latencia promedio:', PromLatencia, 'ms');

    //Desvíos mayores a 200ms
    const filtroEventos = registro.filter(eventos => {
        return(eventos.real - eventos.programado) > 200;
    })
    console.log('Eventos de desvio mayor a 200');
    console.table(filtroEventos);

    const PrimerDesviacion = registro.find(eventos =>{
        return eventos.real - eventos.programado > 200;
    });

    //Evento fueras de orden
    let maxScheduleSoFar = -Infinity;

    const FOEvento = registro.find((eventos =>{
        if(eventos.programado < maxScheduleSoFar){
            return true;
        }

        maxScheduleSoFar = Math.max(maxScheduleSoFar, eventos.programado);
    }));

    console.log('Primer evento fuera de orden:', FOEvento);
}

runEventos();