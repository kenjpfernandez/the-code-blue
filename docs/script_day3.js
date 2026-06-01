document.addEventListener("DOMContentLoaded", function () {

  console.log("Day 3 script loaded");

  // ===== TEAM DISPLAY =====

  const team = localStorage.getItem("teamName") || "UNKNOWN";
  const teamEl = document.getElementById("teamDisplay");

  if (teamEl) {
    teamEl.innerHTML = `> Team: ${team}`;
  }

  // ===== BUTTON HANDLING (FIXED) =====

  const btn = document.querySelector("button");
  const inputEl = document.getElementById("codeInput");

  if (!btn || !inputEl) {
    console.error("Missing button or input");
    return;
  }

  // 🔥 IMPORTANT: remove any previous bindings
  btn.onclick = handleSubmit;

  // Enter key support
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });

});


// ===== MAIN SUBMIT FUNCTION =====
function handleSubmit() {

  console.log("Submit triggered");

  const inputEl = document.getElementById("codeInput");
  const response = document.getElementById("response");
  const btn = document.querySelector("button");

  if (!inputEl || !response || !btn) {
    console.error("Missing elements");
    return;
  }

  const code = inputEl.value.trim().toUpperCase();
  console.log("Input received:", code);

  let resultType = null;

  if (code === "EXEC-04") {
    resultType = "individual";
  }
  else if (code === "APPROVEDALL") {
    resultType = "collective";
  }
  else if (code === "SYSTEMBREACH") {
    resultType = "system";
  }
  else {
    response.innerHTML = "✖ INVALID CONCLUSION";
    return;
  }

  // 🔥 Disable input immediately
  inputEl.disabled = true;
  btn.disabled = true;

  // 🔥 Cinematic system response
  response.innerHTML = "> Processing conclusion...";

  setTimeout(() => {
    response.innerHTML += "<br>> Validating evidence...";
  }, 1000);

  setTimeout(() => {
    response.innerHTML += "<br>> Finalizing decision...";
  }, 2000);

  setTimeout(() => {
    win(resultType);
  }, 3000);
}


// ===== WIN HANDLER =====
function win(type) {

  console.log("Winning path:", type);

  localStorage.setItem("day3Complete", "true");
  localStorage.setItem("day3Result", type);

  let target = "";

  if (type === "individual") {
    target = "puzzles/day3_individual.html";
  }
  else if (type === "collective") {
    target = "puzzles/day3_collective.html";
  }
  else if (type === "system") {
    target = "puzzles/day3_system.html";
  }

  // slight delay already handled above
  window.location.href = target;
}
