let ticks = [];

function addTick(num) {
  ticks.push(num);

  if (ticks.length > 100) {
    ticks.shift(); // keep only last 100 ticks
  }

  analyze();
  updateUI();
}

function analyze() {
  let over = 0;
  let under = 0;

  ticks.forEach(n => {
    if (n >= 6) over++;
    else under++;
  });

  let overP = (over / ticks.length) * 100;
  let underP = (under / ticks.length) * 100;

  window.analysis = { overP, underP };

  generateSignal(overP, underP);
}

function generateSignal(over, under) {
  let signal = "WAIT";

  if (over > 65) signal = "🟢 HIGH OVER ACTIVITY";
  else if (under > 65) signal = "🔴 HIGH UNDER ACTIVITY";
  else signal = "🟡 NO CLEAR PATTERN";

  document.getElementById("signal").innerText = signal;
}

function updateUI() {
  document.getElementById("ticks").innerText =
    ticks.slice(-20).join(", ");

  if (window.analysis) {
    document.getElementById("over").innerText =
      window.analysis.overP.toFixed(1);

    document.getElementById("under").innerText =
      window.analysis.underP.toFixed(1);
  }
}

function start() {
  setInterval(() => {
    let random = Math.floor(Math.random() * 10);
    addTick(random);
  }, 700);
}
