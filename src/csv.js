import { parse } from 'csv-parse/dist/esm';

const cidasc = document.querySelector('#cidasc');
const iniciar = document.querySelector('#iniciar');

const ler = async (evt) => {
  evt.preventDefault();
  //const reader = new FileReader();
  const decoder = new TextDecoder();

  const parser = parse({
    columns: true,
    trim: true,
    cast: true
  });
  const c = cidasc.files[0];
  const reader = cidasc.files[0].stream().getReader();

  parser.on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
      console.log(record);
    }
  });

  const loop = async (r) => {
    const { value, done } = await r.read();
    if (!done) {
      loop(r);
      parser.write(decoder.decode(value));
    }
  };

  loop(reader);
};

iniciar.addEventListener('click', ler);
