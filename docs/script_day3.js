document.addEventListener("DOMContentLoaded", function () {

  console.log("Code Blue Day 3 Loaded");

  const team = localStorage.getItem("teamName") || "UNKNOWN";
  const teamEl = document.getElementById("teamDisplay");

  if (teamEl) {
    teamEl.innerHTML = `> Team: ${team}`;
  }

  let progress = {
    code1: false,
    code2: false,
    code3: false,
    code4: false
  };

  function updateProgress() {
    const count = Object.values(progress).filter(v => v).length;
    const progressEl = document.getElementById("progress");

    if (progressEl) {
      progressEl.innerHTML = `Progress: ${count} / 4 Evidence Verified`;
    }
  }

  function unlockModule(id, link, label) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("locked");
    el.innerHTML = `<a href="${link}" target="_blank">${label}</a>`;
  }

  window.checkCode = function () {
    const inputEl = document.getElementById("codeInput");
    const response = document.getElementById("response");

    if (!inputEl || !response) return;

    const code = inputEl.value.trim().toUpperCase();

    console.log("INPUT:", code);

    if (code === "WARNING" && !progress.code1) {
      progress.code1 = true;
      response.innerHTML = "✔ Warning Flag Verified → Escalation Records Unlocked";
      unlockModule("mod2", "YOUR-ALERT-LOGS-LINK", "[2] Alert Logs");
    }

    else if (code === "MISSED" && !progress.code2) {
      progress.code2 = true;
      response.innerHTML = "✔ Missed Escalation Verified → Review Committee Unlocked";
      unlockModule("mod3", "YOUR-ESCALATION-RECORDS-LINK", "[3] Escalation Records");
    }

    else if (code === "MULTIPLE" && !progress.code3) {
      progress.code3 = true;
      response.innerHTML = "✔ Multiple Opportunities Verified → Final Summary Unlocked";
      unlockModule("mod4", "YOUR-REVIEW-COMMITTEE-LINK", "[4] Review Committee");
    }

    else if (code === "MONITOR" && !progress.code4) {
      progress.code4 = true;
      response.innerHTML = "✔ Monitoring Instruction Verified → Final Summary Available";
      unlockModule("mod5", "YOUR-FINAL-SUMMARY-LINK", "[5] Final Summary");
    }

    else if (code === "EARLY WARNING MISSED") {
      if (
        progress.code1 &&
        progress.code2 &&
        progress.code3 &&
        progress.code4
      ) {
        response.innerHTML = "⚠ ROOT CAUSE CONFIRMED...";
        localStorage.setItem("day3Complete", "true");
        localStorage.setItem("day3Result", "EARLY WARNING MISSED");

        setTimeout(() => {
          window.location.href = "puzzles/day3_end.html";
        }, 1500);
      } else {
        response.innerHTML = "✖ INCOMPLETE DATA. MORE EVIDENCE REQUIRED.";
      }
    }

    else {
      response.innerHTML = "✖ INVALID OR ALREADY USED CODE";
    }

    inputEl.value = "";
    updateProgress();
  };

  updateProgress();
});
