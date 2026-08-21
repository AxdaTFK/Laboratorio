function AverageLatency(results) {
    if (!results || results.length === 0) {
        return 0;
    }
    const totalLatency = results.reduce((accum, current) => {
        return accum + (current.realTime - current.time);
    }, 0);
    return totalLatency / results.length;
}
/////Latencia mayor al indicado
function getEventsAboveLatency(results, threshold = 180) {
    return results.filter((result) => {
        return (result.realTime - result.time) > threshold;
    });
}
//////latencia es mayor al límite indicado
function getEventsAboveDeviation(results, threshold = 50) {
    return results.filter((result) => {
        return (result.realTime - result.time) > threshold;
    });
}
//////Eventos fuera de orden
function getOutOfOrderEvents(results) {
    let maxTime = -Infinity;

    return results.filter((result) => {
        if (result.time < maxTime) {
            return true;
        }
        maxTime = Math.max(maxTime, result.time);
        return false;
    });
}
module.exports = {
    AverageLatency,
    getEventsAboveLatency,
    getEventsAboveDeviation,
    getOutOfOrderEvents
};