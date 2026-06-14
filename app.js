const camera = document.querySelector("#camera");
const kiriko = document.querySelector("#kiriko");
const startPanel = document.querySelector("#startPanel");
const startCamera = document.querySelector("#startCamera");
const message = document.querySelector("#message");

let scale = 1;
let position = { x: 0, y: 0 };
let dragStart = null;

function updateKiriko() {
  kiriko.style.setProperty("--scale", scale.toFixed(2));
  kiriko.style.setProperty("--x", `${position.x}px`);
  kiriko.style.setProperty("--y", `${position.y}px`);
}

async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });

    camera.srcObject = stream;
    document.body.classList.add("is-running");
    message.textContent = "キリコを指で動かせます。ボタンで大きさを変えられます。";
  } catch (error) {
    message.textContent =
      "カメラを起動できませんでした。スマホではHTTPSのページで開いてください。";
  }
}

function setScale(nextScale) {
  scale = Math.min(1.7, Math.max(0.55, nextScale));
  updateKiriko();
}

startCamera.addEventListener("click", start);
document.querySelector("#smaller").addEventListener("click", () => setScale(scale - 0.12));
document.querySelector("#larger").addEventListener("click", () => setScale(scale + 0.12));
document.querySelector("#reset").addEventListener("click", () => {
  scale = 1;
  position = { x: 0, y: 0 };
  updateKiriko();
});

kiriko.addEventListener("pointerdown", (event) => {
  kiriko.setPointerCapture(event.pointerId);
  dragStart = {
    pointerX: event.clientX,
    pointerY: event.clientY,
    kirikoX: position.x,
    kirikoY: position.y,
  };
});

kiriko.addEventListener("pointermove", (event) => {
  if (!dragStart) return;

  position = {
    x: dragStart.kirikoX + event.clientX - dragStart.pointerX,
    y: dragStart.kirikoY + event.clientY - dragStart.pointerY,
  };
  updateKiriko();
});

kiriko.addEventListener("pointerup", () => {
  dragStart = null;
});

updateKiriko();
