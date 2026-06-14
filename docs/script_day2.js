document.addEventListener("DOMContentLoaded", function () {

  const unlock = GAME_SCHEDULE.day2Unlock.getTime();

  if (Date.now() < unlock) {
    blockAccess(unlock);
    return;
  }

  console.log("Code Blue Day 2 Loaded");

  // rest of your code...
});

  // ==========================
  // AUDIO
  // ==========================

  const sounds = {
    login: new Audio("./assets/login_beep.mp3"),
    unlock: new Audio("./assets/unlock.mp3"),
    warning: new Audio("./assets/warning.mp3"),
    archive: new Audio("./assets/archive.mp3")
  };

  sounds.login.volume = 0.5;
  sounds.unlock.volume = 0.5;
  sounds.warning.volume = 0.6;
  sounds.archive.volume = 0.6;

  function playSound(sound) {
    if (!sound) return;

    try {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    } catch (err) {
      console.log("Audio playback blocked or unavailable:", err);
    }
  }

  // Optional: unlock browser audio after first user click
  document.addEventListener("click", () => {
    Object.values(sounds).forEach(sound => {
      try {
        sound.play()
          .then(() => {
            sound.pause();
            sound.currentTime = 0;
          })
          .catch(() => {});
      } catch (err) {
        // ignore
      }
    });
  }, { once: true });

  // ==========================
  // TEAM DISPLAY
  // ==========================

  const team = localStorage.getItem("teamName") || "UNKNOWN";
  const teamEl = document.getElementById("teamDisplay");

  if (teamEl) {
    teamEl.innerHTML = `> Team: ${team}`;
  }

  // ==========================
  // PROGRESS TRACKING
  // ==========================

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

  // ==========================
  // MODULE UNLOCKER
  // ==========================

  function unlockModule(id, link, label) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("locked");
    el.innerHTML = `<a href="${link}" target="_blank">${label}</a>`;
  }

  // ==========================
  // MAIN CODE SYSTEM
  // ==========================

  window.checkCode = function () {
    const inputEl = document.getElementById("codeInput");
    const response = document.getElementById("response");

    if (!inputEl || !response) return;

    const code = inputEl.value.trim().toUpperCase();
    console.log("INPUT:", code);

    // =====================================
    // MEDICATION RECORDS
    // =====================================

    if (code === "MED-A12" && !progress.code1) {
      progress.code1 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Medication Verified → Pharmacy Logs Unlocked";

      unlockModule(
        "mod2",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgADqzzzuinuQ5HK9inKxqKBATU0yW4KTpZxNo0STcW50y8?e=QDSbMQ",
        "[2] Pharmacy Logs"
      );
    }

    // =====================================
    // PHARMACY LOGS
    // =====================================

    else if (code === "OVERRIDE" && !progress.code2) {
      progress.code2 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Override Confirmed → Physician Orders Unlocked";

      unlockModule(
        "mod3",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgCAr7jROrWMR7XOyLCInwX_AUhN4lGbYvxv2856xYUgVlo?e=KWr7Zq",
        "[3] Physician Orders"
      );
    }

    // =====================================
    // PHYSICIAN ORDERS
    // =====================================

    else if (code === "INTERACTION" && !progress.code3) {
      progress.code3 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Interaction Flagged → Lab Results Unlocked";

      unlockModule(
        "mod4",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgC8_DPQDpHoTpbP_b8Zu8EMAb889QZk416M3JswQUWbxik?e=CAGvVh",
        "[4] Lab Results"
      );
    }

    // =====================================
    // LAB RESULTS
    // =====================================

    else if (code === "POTASSIUM" && !progress.code4) {
      progress.code4 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Critical Lab Value Verified → Dispensing History Unlocked";

      unlockModule(
        "mod5",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgCqj8W-WvdnSJbujA35XaIqAXhR6NlQcjmS4olfrATnAj4?e=r87SSg",
        "[5] Dispensing History"
      );
    }

    // =====================================
    // FINAL ANSWER
    // =====================================

    else if (code === "MEDICATION INTERACTION") {
      if (
        progress.code1 &&
        progress.code2 &&
        progress.code3 &&
        progress.code4
      ) {
        response.innerHTML = "⚠ ROOT CAUSE CONFIRMED...";
        playSound(sounds.warning);

        setTimeout(() => {
          window.location.href = "puzzles/day2_end.html";
        }, 1500);
      } else {
        response.innerHTML = "✖ INCOMPLETE DATA. MORE EVIDENCE REQUIRED.";
      }
    }

    // =====================================
    // INVALID
    // =====================================

    else {
      response.innerHTML = "✖ INVALID OR ALREADY USED CODE";
    }

    inputEl.value = "";
    updateProgress();
  };

  updateProgress();

});

function blockAccess(unlockTime) {

  function render() {

    const remaining =
      unlockTime - Date.now();

    if (remaining <= 0) {

      location.reload();

      return;

    }

    const h =
      Math.floor(remaining / 3600000);

    const m =
      Math.floor((remaining % 3600000) / 60000);

    const s =
      Math.floor((remaining % 60000) / 1000);

    document.body.innerHTML = `
      <div class="terminal">

        <h1>ACCESS RESTRICTED</h1>

        <p>> Next phase unavailable.</p>

        <p>> Unlock in:</p>

        <h2>${h}h ${m}m ${s}s</h2>

      </div>
    `;
  }

  render();

  setInterval(render, 1000);

}
