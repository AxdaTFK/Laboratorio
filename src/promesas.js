const { AverageLatency, getEventsAboveDeviation, getOutOfOrderEvents } = require("./Resultados.js");
const results = [];

const startTime = Date.now();

//Simulador de evento
const events = [
  { id: 1, type: "LogIn", Stime: 500, },
  { id: 2, type: "Download", Stime: 1000, },
  { id: 3, type: "notification", Stime: 1800, },
  { id: 4, type: "closing", Stime: 1500, },
  { id: 5, type: "update", Stime: 2000, },
  { id: 6, type: "error", Stime: 800, },
  { id: 7, type: "message", Stime: 1200, },
  { id: 8, type: "alert", Stime: 600, },
];

function Event(event) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const realTime = Date.now() - startTime;
      console.log("Evento disparado:", event.type);
      resolve({
        id: event.id,
        type: event.type,
        Stime: event.Stime,
        realTime: realTime,
      });
    }, event.Stime);
  });
}

Event(events[0])
  .then((result) => {
    results.push(result);
    return Event(events[1]);
  })
  .then((result) => {
    results.push(result);
    return Event(events[2]);
  })
  .then((result) => {
    results.push(result);
    return Event(events[3]);
  })
  .then((result) => {
    results.push(result);
    return Event(events[4]);
  })
  .then((result) => {
    results.push(result);
    return Event(events[5]);
  })
  .then((result) => {
    results.push(result);
    return Event(events[6]);
  })
  .then((result) => {
    results.push(result);
    return Event(events[7]);
  })
  .then((result) => {
    results.push(result);

    console.log("Bitácora");
    console.table(results);
    const averageLatency = AverageLatency(results);
    console.log("Latencia Promedio:", averageLatency);
    const aboveDeviationEvents = getEventsAboveDeviation(results, 50);
    console.log("Eventos por encima de la desviación:", );
    console.table(aboveDeviationEvents);
    const outOfOrderEvents = getOutOfOrderEvents(results);
    console.log("Evento fuera de orden:", );
    console.table(outOfOrderEvents);
  });
