const { AverageLatency, getEventsAboveLatency, getEventsAboveDeviation, getOutOfOrderEvents } = require("./Resultados.js");

const results = [];

const startTime = Date.now();

//Simulador de evento
const events = [
    { id: 1, type: "loadLibrary", Stime: 3000 },
    { id: 2, type: "requestSong", Stime: 1000 },
    { id: 3, type: "playSong", Stime: 500 },
];

function processEvent(event, libraryReady) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const realTime = Date.now() - startTime;

            console.log("Evento disparado:", event.type);

            if (event.type === "requestSong" && !libraryReady) {

                reject({
                    id: event.id,
                    type: event.type,
                    Stime: event.Stime,
                    realTime: realTime,
                    error: "La biblioteca no está disponible"
                });

            } else {

                resolve({
                    id: event.id,
                    type: event.type,
                    Stime: event.Stime,
                    realTime: realTime,
                });
            }

        }, event.Stime);
    });
}

async function event() {

    let libraryReady = false;

    const loading = processEvent(events[0], true)
        .then(result => {
            libraryReady = true;
            return result;
        });

    try {

        results.push(
            await processEvent(events[1], libraryReady)
        );

    } catch (error) {

        console.error("Error capturado:", error);
        results.push(error);
    }

    results.push(await loading);

    results.push(
        await processEvent(events[2], libraryReady)
    );

    console.table(results);
}

event();