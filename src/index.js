const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("#completevideo");
let recorder, stream;
let options = { mimeType: "video/webm;codecs=vp9,opus" };

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream, options);
  console.log(recorder);

  document.querySelector("#serial").addEventListener("click", async () => {
    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();
    console.log(port);
  });

  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = (e) => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
