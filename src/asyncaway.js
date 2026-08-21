const { AverageLatency, getEventsAboveLatency, getEventsAboveDeviation, getOutOfOrderEvents } = require("./Resultados.js");
const results = [];

const startTime = Date.now();

const events = [
  { id: 1, type: "logIn", Stime: 500, },
  { id: 2, type: "download", Stime: 1000, },
  { id: 3, type: "notification", Stime: 1800, },
  { id: 4, type: "closing", Stime: 1500, },
  { id: 5, type: "update", Stime: 2000, },
  { id: 6, type: "error", Stime: 800, },
  { id: 7, type: "message", Stime: 1200, },
  { id: 8, type: "alert", Stime: 600, },
];


function processEvent(event) {
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

async function event() {
  results.push(await processEvent(events[0]));
  results.push(await processEvent(events[1]));
  results.push(await processEvent(events[2]));
  results.push(await processEvent(events[3]));
  results.push(await processEvent(events[4]));
  results.push(await processEvent(events[5]));
  results.push(await processEvent(events[6]));
  results.push(await processEvent(events[7]));

  console.log("Bitacora");
  console.table(results);

  const averageLatency = AverageLatency(results);
  console.log("Latencia Promedio:", averageLatency);
  const aboveLatencyEvents = getEventsAboveLatency(results, 180);
  console.log("Eventos por encima de la latencia:");
  console.table(aboveLatencyEvents);
  const aboveDeviationEvents = getEventsAboveDeviation(results, 50);
  console.log("Eventos por encima de la desviación:");
  console.table(aboveDeviationEvents);
  const outOfOrderEvents = getOutOfOrderEvents(results);
  console.log("Eventos fuera de orden:");
  console.table(outOfOrderEvents);
}
event();
