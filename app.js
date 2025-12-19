const socket = io();
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, 2, 0, Math.PI * 2);
  ctx.fill();
  socket.emit("draw", {x: e.offsetX, y: e.offsetY});
}

socket.on("draw", data => {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(data.x, data.y, 2, 0, Math.PI * 2);
  ctx.fill();
});

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit("clear");
}

socket.on("clear", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// نمونه فانکشن هوش مصنوعی ساده
function generateShape() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  ctx.fillStyle = "#6A9955";
  ctx.fillRect(x, y, 50, 50);
  socket.emit("drawShape", {x, y});
}

socket.on("drawShape", data => {
  ctx.fillStyle = "#6A9955";
  ctx.fillRect(data.x, data.y, 50, 50);
});
