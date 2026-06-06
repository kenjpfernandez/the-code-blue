document.addEventListener("DOMContentLoaded", function () {

  console.log("Code Blue Day 2 Loaded");

  const team = localStorage.getItem("teamName") || "UNKNOWN";
  const teamEl = document.getElementById("teamDisplay");

  if (teamEl) {
    teamEl.innerHTML = `> Team: ${team}`;
  }

  let progress = {
    code1: false,
    code2: false,
    code3: false,
    code4: false,
    code5: false
  };

  function updateProgress() {
    const count = Object.values(progress).filter(v => v).length;
    const progressEl = document.getElementById("progress");

    if (progressEl) {
      progressEl.innerHTML = `Progress: ${count} / 5 Evidence Verified`;
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

    if (code === "MED-A12" && !progress.code1) {
      progress.code1 = true;
      response.innerHTML = "✔ Medication Verified → Pharmacy Logs Unlocked";
      unlockModule("mod2", "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgADqzzzuinuQ5HK9inKxqKBATU0yW4KTpZxNo0STcW50y8?e=QDSbMQ", "[2] Pharmacy Logs");
    }

    else if (code === "OVERRIDE" && !progress.code2) {
      progress.code2 = true;
      response.innerHTML = "✔ Override Confirmed → Physician Orders Unlocked";
      unlockModule("mod3", "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgCAr7jROrWMR7XOyLCInwX_AUhN4lGbYvxv2856xYUgVlo?e=KWr7Zq", "[3] Physician Orders");
    }

    else if (code === "INTERACTION" && !progress.code3) {
      progress.code3 = true;
      response.innerHTML = "✔ Interaction Flagged → Lab Results Unlocked";
      unlockModule("mod4", "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgC8_DPQDpHoTpbP_b8Zu8EMAb889QZk416M3JswQUWbxik?e=CAGvVh", "[4] Lab Results");
    }

    else if (code === "POTASSIUM" && !progress.code4) {
      progress.code4 = true;
      response.innerHTML = "✔ Critical Lab Value Verified → Dispensing History Unlocked";
      unlockModule("mod5", "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgCqj8W-WvdnSJbujA35XaIqAXhR6NlQcjmS4olfrATnAj4?e=r87SSg", "[5] Dispensing History");
    }

    else if (code === "TIMING" && !progress.code5) {
      progress.code5 = true;
      response.innerHTML = "✔ Timeline Verified → Final Root Cause Available";
    }

    else if (code === "MEDICATION INTERACTION") {
      if (
        progress.code1 &&
        progress.code2 &&
        progress.code3 &&
        progress.code4 &&
        progress.code5
      ) {
        response.innerHTML = "⚠ ROOT CAUSE CONFIRMED...";
        setTimeout(() => {
          window.location.href = "puzzles/day2_end.html";
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
