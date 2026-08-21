const { AverageLatency, getEventsAboveLatency, getEventsAboveDeviation, getOutOfOrderEvents } = require("./Resultados.js");
const results = [];

const startTime = Date.now();

const events = [
  {
    number: 1,
    type: "Large Event",
    time: 3000,
  },
  {
    number: 2,
    type: "Large Event",
    time: 1000,
  },
  {
    number: 3,
    type: "Large Event",
    time: 7000,
  },
  {
    number: 4,
    type: "Large Event",
    time: 5000,
  },
  {
    number: 5,
    type: "Large Event",
    time: 8000,
  },
  {
    number: 6,
    type: "Large Event",
    time: 100,
  },
  {
    number: 7,
    type: "Large Event",
    time: 300,
  },
  {
    number: 8,
    type: "Large Event",
    time: 800,
  },
];

function processEvent(event) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const realTime = Date.now() - startTime;

      resolve({
        number: event.number,
        type: event.type,
        time: event.time,
        realTime: realTime,
      });
    }, event.time);
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
  console.log(results);

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
