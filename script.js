const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// const ctx = canvas.getCotext('2d');
const c = canvas.getContext("2d");

// function animate() {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, innerWidth, innerHeight);
//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2);
//   c.strokeStyle = "black";
//   c.stroke();
//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }
//   x = x + dx;
//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }
//   y = y + dy;
// }
// animate();

const mouse = { x: undefined, y: undefined };
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
const maxRadius = 50;
const minRadius = 10;

const colorArray = ["#0f0f0e", "#f8f8f7", "#c5a94e", "#e51712", "#661014"];

const Circle = function (x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    //c.strokeStyle = "black";
    c.fillStyle = this.color;
    //c.stroke();
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x = this.x + this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y = this.y + this.dy;
    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius = this.radius + 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius = this.radius - 1;
    }
    this.draw();
  };
};

//const circle1 = new Circle(x, y, dx, dy, radius);
let circles = [];
function init() {
  circles = [];
  for (let i = 0; i < 25; i++) {
    let radius = Math.random() * 10 + 1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 10;

    circles.push(new Circle(x, y, dx, dy, radius));
  }
}
function animateMe() {
  requestAnimationFrame(animateMe);
  c.clearRect(0, 0, innerWidth, innerHeight);
  //   for (i = 0; i < circles.length; i++) {
  //     circles[i].update();
  //   }
  circles.forEach(function (circle) {
    circle.update();
  });
}
animateMe();
init();
