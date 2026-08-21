const { AverageLatency, getEventsAboveLatency, getEventsAboveDeviation, getOutOfOrderEvents } = require("./Resultados.js");
const results = [];

//Simulador de evento 
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

function getlogIn(callback) {
  setTimeout(() => {
    events[0].realTime = Date.now() - startTime;
    console.log('Evento disparado:', events[0].type);
    callback(events[0]);
  }, 500);
}

function getdownload(callback) {
  setTimeout(() => {
    events[1].realTime = Date.now() - startTime;
    console.log('Evento disparado:', events[1].type);
    callback(events[1]);
  }, 1000);
}

function getnotification(callback) {
  setTimeout(() => {
    events[2].realTime = Date.now() - startTime;
    console.log('Evento disparado:', events[2].type);
    callback(events[2]);
  }, 1800);
}

function getclosing(callback) {
  setTimeout(() => {
    events[3].realTime = Date.now() - startTime;
    console.log('Evento disparado:', events[3].type);
    callback(events[3]);
  }, 1500);
}

function getupdate(callback) {
  setTimeout(() => {
    events[4].realTime = Date.now() - startTime;
    console.log('Evento disparado:', events[4].type);
    callback(events[4]);
  }, 2000);
}

function geterror(callback) {
  setTimeout(() => {
    events[5].realTime = Date.now() - startTime;
    console.log('Evento disparado:', events[5].type);
    callback(events[5]);
  }, 800);
}

function getmessage(callback) {
  setTimeout(() => {
    events[6].realTime = Date.now()- startTime;
    console.log('Evento disparado:', events[6].type);
    callback(events[6]);
  }, 1200);
}

function getalert(callback) {
  setTimeout(() => {
    events[7].realTime = Date.now()- startTime;
    console.log('Evento disparado:', events[7].type);
    callback(events[7]);
  }, 600);
}

//Callbacks anidados - Callbacks Hell 
getlogIn((event1) => {
  results.push(event1);
  getdownload((event2) => {
    results.push(event2);
    getnotification((event3) => {
      results.push(event3);
      getclosing((event4) => {
        results.push(event4);
        getupdate((event5) => {
          results.push(event5);
          geterror((event6) => {
            results.push(event6);
            getmessage((event7) => {
              results.push(event7);
              getalert((event8) => {
                results.push(event8);

                console.log("Bitacora");
                console.table(results);
                const averageLatency = AverageLatency(results);
                console.log("Latencia Promedio:", averageLatency);
                const aboveLatencyEvents = getEventsAboveLatency(results, 180);
                console.log("Eventos por encima de la latencia:",);
                console.table(aboveLatencyEvents);
                const aboveDeviationEvents = getEventsAboveDeviation(results, 50);
                console.log("Eventos por encima de la desviación:",);
                console.table(aboveDeviationEvents);
                const outOfOrderEvents = getOutOfOrderEvents(results);
                console.log("Eventos fuera de orden:",);
                console.table(outOfOrderEvents);
              });
            });
          });
        });
      });
    });
  });
});