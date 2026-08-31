//Latencia Promedio
function AverageLatency(results) {
    if (!results || results.length === 0) {
        return 0;
    }
    const totalLatency = results.reduce((accum, current) => {
        return accum + (current.realTime - current.Stime);
    }, 0);
    return totalLatency / results.length;
}
//////Latencia es mayor al límite indicado (Umbral definido = 50) 
function getEventsAboveDeviation(results, threshold = 50) { 
    return results.map((result) => { 
        if ((result.realTime - result.Stime) > threshold) { 
            return result.id; 
        } 
    }); 
}

//////Eventos fuera de orden
function getOutOfOrderEvents(results) {
    let maxTime = -Infinity;

    return results.find((result) => {
        if (result.Stime < maxTime) {
            return true;
        }
        maxTime = Math.max(maxTime, result.Stime);
        return false;
    });
}
module.exports = {
    AverageLatency,
    getEventsAboveDeviation,
    getOutOfOrderEvents
};