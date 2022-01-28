const { generate, parse, stringify, transform } = require('csv');

console.log({ generate, parse, stringify, transform });

const cidasc = document.querySelector('#cidasc');

const iniciar = document.querySelector('#iniciar');

const ler = (evt) => {
  evt.preventDefault();
  const reader = new FileReader();

  reader.onloadend = (...args) => {
    console.log(args);
  };

  console.log(cidasc.files[0]);

  //console.log(reader.readAsText(cidasc.files[0]));
};
iniciar.addEventListener('click', ler);
