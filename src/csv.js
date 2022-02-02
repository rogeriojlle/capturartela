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

  while(true){
    const { value, done } = await reader.read();
    if (done) {
      break
    }
    parser.write(decoder.decode(value));
  }
};

iniciar.addEventListener('click', ler);
