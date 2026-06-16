document.addEventListener("DOMContentLoaded", function () {

  console.log("Code Blue Day 1 Loaded");

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
    // PATIENT CHART
    // =====================================

    if (code === "0800" && !progress.code1) {
      progress.code1 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Admission Time Verified → Symptom Notes Unlocked";

      unlockModule(
        "mod2",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgBu1ogMrJH9QozJe4ZRav0fAdgMtM3IZJ462VRLyzbrrHI?e=XqOQvt",
        "[2] Symptom Notes"
      );
    }

    // =====================================
    // SYMPTOM NOTES
    // =====================================

    else if (code === "WEAKNESS" && !progress.code2) {
      progress.code2 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Symptom Pattern Verified → Vital Signs Unlocked";

      unlockModule(
        "mod3",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDZ7cMafoy7RJ1VAYJ7EenhAXJ9bFgGKylc5-q_AmKne0I?e=IXnUcI",
        "[3] Vital Signs"
      );
    }

    // =====================================
    // VITAL SIGNS
    // =====================================

    else if (code === "DECLINE" && !progress.code3) {
      progress.code3 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Vital Trend Verified → Room Assignment Unlocked";

      unlockModule(
        "mod4",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgC9T8wOtdYCSKsIVz1HL4zVAQRpqDc_V0yS2EfjIBA8D7w?e=EAMmsg",
        "[4] Room Assignment"
      );
    }

    // =====================================
    // ROOM ASSIGNMENT
    // =====================================

    else if (code === "EASTWING" && !progress.code4) {
      progress.code4 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Ward Location Verified → Admission Record Unlocked";

      unlockModule(
        "mod5",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgA9wH4rIUuiSolmfr-1o9ByAdngOzaistfuE668Gctp3xk?e=YGXWH2",
        "[5] Admission Record"
      );
    }

    // =====================================
    // ADMISSION RECORD
    // =====================================

    else if (code === "ACUTECP" && !progress.code5) {
      progress.code5 = true;
      playSound(sounds.unlock);

      response.innerHTML =
        "✔ Admission Diagnosis Verified → Incident Timeline Unlocked";

      unlockModule(
        "mod6",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgAzeHiqYtF4QZLGlWgLIH8zAbhZpA8w8Bb_61H8pEHDkBY?e=S1CqyjK",
        "[6] Incident Timeline"
      );
    }

    // =====================================
    // FINAL ANSWER
    // =====================================

    else if (code === "1047") {
      if (
        progress.code1 &&
        progress.code2 &&
        progress.code3 &&
        progress.code4 &&
        progress.code5
      ) {
        response.innerHTML = "⚠ CODE BLUE TIMELINE CONFIRMED...";
        playSound(sounds.warning);

        setTimeout(() => {
          window.location.href = "puzzles/day1_end.html";
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
