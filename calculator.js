const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expr = "";

function updateDisplay(value) {
  display.value = value;
}

function appendValue(v) {
  // prevent double operators like ++ or ** (but allow * after number only)
  const ops = "+-*/";
  const last = expr.slice(-1);

  if (ops.includes(v)) {
    if (!expr) return; // can't start with operator
    if (ops.includes(last)) {
      expr = expr.slice(0, -1) + v; // replace operator
      updateDisplay(expr);
      return;
    }
  }

  // only one dot per number chunk
  if (v === ".") {
    const parts = expr.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
  }

  expr += v;
  updateDisplay(expr);
}

function clearAll() {
  expr = "";
  updateDisplay("");
}

function evaluateExpr() {
  if (!expr) return;

  // basic safe filter (only digits, operators, dot, spaces)
  if (!/^[0-9+\-*/. ]+$/.test(expr)) {
    updateDisplay("Error");
    expr = "";
    return;
  }

  try {
    // evaluate
    const result = Function(`"use strict"; return (${expr})`)();
    expr = String(result);
    updateDisplay(expr);
  } catch (e) {
    updateDisplay("Error");
    expr = "";
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === "clear") return clearAll();
    if (action === "equals") return evaluateExpr();
    if (value) return appendValue(value);
  });
});

// keyboard support
document.addEventListener("keydown", (e) => {
  const k = e.key;

  if ((k >= "0" && k <= "9") || k === "." || ["+", "-", "*", "/"].includes(k)) {
    appendValue(k);
    return;
  }
  if (k === "Enter" || k === "=") {
    e.preventDefault();
    evaluateExpr();
    return;
  }
  if (k === "Backspace") {
    expr = expr.slice(0, -1);
    updateDisplay(expr);
    return;
  }
  if (k === "Escape") {
    clearAll();
  }
});