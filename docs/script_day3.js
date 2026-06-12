document.addEventListener("DOMContentLoaded", function () {

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
    el.innerHTML = `<a href="${link}" target="_blank">${label}</a>`;
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
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgBUTj3gEQnAQa0oIBlEOWyUARtygrbdrnWuSudOTuFtfuw?e=88nIHN",
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
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDBQaAlkmtqS6We9e-xH7BPAYflbNdEVtMe6FW_rnaiqTw?e=pgJdix",
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
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDFUmt928uiRrPw803uwi4BAbkQyUCFldX-5QBS7MupqIY?e=RnxFYC",
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
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDxHDdGNQmuRa7N6AvE4OecAR5IK8WPCu0qI7AF3uXTQoI?e=TpzphO",
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
