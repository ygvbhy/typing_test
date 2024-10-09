import "./style.css";

const text = document.getElementById("text");
const textarea = document.getElementById("typing");
const wpm = document.getElementById("wpm"); // 부모 d-none
const cpm = document.getElementById("cpm"); // 부모 d-none
const errors = document.getElementById("errors");
const timer = document.getElementById("timer");
const accuracy = document.getElementById("accuracy");
const restart = document.getElementById("restart");

const testText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsum vero, eius suscipit atque fugit quam iste alias qui maxime quo repellendus fugiat laboriosam vel asperiores et officia sapiente laudantium.";
const startText = "누르면 시작합니다.";
const endText = "다시 시작하려면 다시 시작을 클릭하세요.";
let interval;

text.innerText = startText;
let errorCount = 0;
textarea.addEventListener("focus", () => {
  if (interval) return;

  let sGroup = "";
  testText.split("").forEach((s) => {
    sGroup += `<span>${s}</span>`;
  });
  text.innerHTML = sGroup;
  startTimer();
});

const compareText = (inputText) => {
  const spans = text.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (inputText[index] === undefined) {
      span.classList.remove("text-success", "text-danger");
    } else if (inputText[index] === span.textContent) {
      span.classList.add("text-success");
      span.classList.remove("text-danger");
    } else {
      span.classList.add("text-danger");
      span.classList.remove("text-success");
    }
  });

  const dangerCount = document.querySelectorAll(".text-danger");
  errors.innerText = dangerCount.length;
  errorCount = dangerCount.length;

  const totalText = testText.length;
  accuracy.innerText =
    Math.floor(((totalText - dangerCount.length) / totalText) * 100) + "%";
};
textarea.addEventListener("input", (e) => {
  const inputText = e.target.value;
  compareText(inputText);
});

restart.onclick = () => {
  timer.innerText = "20s";
  errors.innerText = "0";
  accuracy.innerText = "100%";
  wpm.innerText = "0";
  cpm.innerText = "0";
  text.innerText = startText;
  wpm.parentElement.classList.add("d-none");
  cpm.parentElement.classList.add("d-none");
  restart.parentElement.classList.add("d-none");
  textarea.value = "";
  textarea.disabled = false;
  interval = undefined;
};

const endTyping = () => {
  clearInterval(interval);
  text.innerText = endText;
  wpm.parentElement.classList.remove("d-none");
  cpm.parentElement.classList.remove("d-none");
  restart.parentElement.classList.remove("d-none");
  errors.innerText = errorCount;
  textarea.disabled = true;
  cpm.innerText = Math.floor(textarea.value.length / (20 / 60));
  wpm.innerText = Math.floor(textarea.value.length / 5 / (20 / 60));
};

const startTimer = () => {
  let time = 20;
  interval = setInterval(() => {
    time--;
    timer.innerText = time + "s";
    if (time === 0) {
      endTyping();
    }
  }, 1000);
};
