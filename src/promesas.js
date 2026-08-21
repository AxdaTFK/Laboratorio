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

function Event(event) {
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

    console.log("Bitacora");
    console.log(results);
    const averageLatency = AverageLatency(results);
    console.log("Latencia Promedio:", averageLatency);
    const aboveLatencyEvents = getEventsAboveLatency(results, 180);
    console.log("Eventos por encima de la latencia:", );
    console.table(aboveLatencyEvents);
    const aboveDeviationEvents = getEventsAboveDeviation(results, 50);
    console.log("Eventos por encima de la desviación:", );
    console.table(aboveDeviationEvents);
    const outOfOrderEvents = getOutOfOrderEvents(results);
    console.log("Eventos fuera de orden:", );
    console.table(outOfOrderEvents);
  });
