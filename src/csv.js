import { parse } from 'csv-parse/dist/esm';

const cidasc = document.querySelector('#cidasc');
const iniciar = document.querySelector('#iniciar');

const ler = async (evt) => {
  evt.preventDefault();

  const decoder = new TextDecoder();
  const reader = cidasc.files[0].stream().getReader();
  const parser = parse({
    columns: false,
    trim: true,
    cast: true
  }).on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
      console.log(record);
    }
  });

  const loop = async () => {
    const { value, done } = await reader.read();
    if (!done) {
      parser.write(decoder.decode(value));
      loop();
    }
  };

  loop();
};

iniciar.addEventListener('click', ler);
