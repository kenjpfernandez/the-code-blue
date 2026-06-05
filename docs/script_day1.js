document.addEventListener("DOMContentLoaded", function () {

  console.log("Code Blue Day 1 Loaded");

  // ===== TEAM DISPLAY =====
  const team = localStorage.getItem("teamName") || "UNKNOWN";
  const teamEl = document.getElementById("teamDisplay");

  if (teamEl) {
    teamEl.innerHTML = `> Team: ${team}`;
  }

  // ===== PROGRESS TRACKING =====
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
      progressEl.innerHTML =
        `Progress: ${count} / 5 Evidence Verified`;
    }
  }

  // ===== MODULE UNLOCKER =====
  function unlockModule(id, link, label) {

    const el = document.getElementById(id);

    if (!el) return;

    el.classList.remove("locked");

    el.innerHTML =
      `<a href="${link}" target="_blank">${label}</a>`;
  }

  // ===== MAIN CODE SYSTEM =====
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

      response.innerHTML =
        "✔ Admission Time Verified → Nursing Notes Unlocked";

      unlockModule(
        "mod2",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgBu1ogMrJH9QozJe4ZRav0fAdgMtM3IZJ462VRLyzbrrHI?e=XqOQvt",
        "[2] Nursing Notes"
      );
    }

    // =====================================
    // NURSING NOTES
    // =====================================

    else if (code === "WEAKNESS" && !progress.code2) {

      progress.code2 = true;

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

        response.innerHTML =
          "⚠ CODE BLUE TIMELINE CONFIRMED...";

        setTimeout(() => {

          window.location.href =
            "puzzles/day1_end.html";

        }, 1500);

      } else {

        response.innerHTML =
          "✖ INCOMPLETE DATA. MORE EVIDENCE REQUIRED.";
      }
    }

    // =====================================
    // INVALID
    // =====================================

    else {

      response.innerHTML =
        "✖ INVALID OR ALREADY USED CODE";
    }

    inputEl.value = "";

    updateProgress();
  };

  updateProgress();

});
