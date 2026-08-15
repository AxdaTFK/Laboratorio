const myCallback = (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Resultado:', data);
};

const ejecutarCallback = (callback) => {
  const resultado = 'Este es el resultado del callback';
  callback(null, resultado);
};

ejecutarCallback(myCallback);

module.exports = { myCallback, ejecutarCallback };
