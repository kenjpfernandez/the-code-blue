document.addEventListener("DOMContentLoaded", function () {

  const unlock = GAME_SCHEDULE?.day3Unlock?.getTime();

  if (!unlock) {
    console.error("day3Unlock is missing from game_schedule.js");
    return;
  }

  if (Date.now() < unlock) {
    blockAccess(unlock);
    return;
  }

  console.log("Code Blue Day 3 Loaded");

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
    el.innerHTML = `<a href="${link}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }

  // ==========================
  // MAIN CODE SYSTEM
  // ==========================

  window.checkCode = function () {
    const inputEl = document.getElementById("codeInput");
    const response = document.getElementById("response");

    if (!inputEl || !response) return;

    const raw = inputEl.value.trim().toUpperCase();
    const code = raw.replace(/[^A-Z0-9]/g, "");

    console.log("INPUT:", raw);

    // =====================================
    // NURSING OBSERVATION
    // =====================================

    if (code === "DETERIORATION" && !progress.code1) {
      progress.code1 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Clinical Deterioration Verified → Alert Logs Unlocked";

      unlockModule(
        "mod2",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgBUTj3gEQnAQa0oIBlEOWyUAf_GjnH9mUufXZjCbwuR5GI?e=I7orh2",
        "[2] Alert Logs"
      );
    }

    // =====================================
    // ALERT LOGS
    // =====================================

    else if (code === "WARNING" && !progress.code2) {
      progress.code2 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Warning Verified → Escalation Records Unlocked";

      unlockModule(
        "mod3",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDBQaAlkmtqS6We9e-xH7BPAeUXB5Cg-hdDIv0qdkGdPl0?e=p6W9ZG",
        "[3] Escalation Records"
      );
    }

    // =====================================
    // ESCALATION RECORDS
    // =====================================

    else if (code === "DELAY" && !progress.code3) {
      progress.code3 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Delay Verified → Review Committee Unlocked";

      unlockModule(
        "mod4",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDFUmt928uiRrPw803uwi4BAXZsRN_C-o874u7CVHZ_Ktw?e=CDuJYc",
        "[4] Review Committee"
      );
    }

    // =====================================
    // REVIEW COMMITTEE
    // =====================================

    else if (code === "MULTIPLE" && !progress.code4) {
      progress.code4 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Multiple Opportunities Verified → Final RCA Unlocked";

      unlockModule(
        "mod5",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDxHDdGNQmuRa7N6AvE4OecAanOkV9CmHQBZZGHRyxjXlE?e=X8DcQm",
        "[5] Final RCA"
      );
    }

    // =====================================
    // FINAL ANSWER
    // =====================================

    else if (code === "ESCALATIONDELAY") {
      if (
        progress.code1 &&
        progress.code2 &&
        progress.code3 &&
        progress.code4
      ) {
        response.innerHTML = "⚠ ROOT CAUSE ANALYSIS COMPLETE...";
        playSound(sounds.warning);

        localStorage.setItem("day3Complete", "true");
        localStorage.setItem("day3Result", "ESCALATION DELAY");

        setTimeout(() => {
          window.location.href = "puzzles/day3_end.html";
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
    const remaining = unlockTime - Date.now();

    if (remaining <= 0) {
      location.reload();
      return;
    }

    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);

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
