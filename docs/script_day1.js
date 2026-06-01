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
        "YOUR-NURSING-NOTES-LINK",
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
        "YOUR-VITAL-SIGNS-LINK",
        "[3] Vital Signs"
      );
    }

    // =====================================
    // VITAL SIGNS
    // =====================================

    else if (code === "DROP" && !progress.code3) {

      progress.code3 = true;

      response.innerHTML =
        "✔ Vital Trend Verified → Room Assignment Unlocked";

      unlockModule(
        "mod4",
        "YOUR-ROOM-ASSIGNMENT-LINK",
        "[4] Room Assignment"
      );
    }

    // =====================================
    // ROOM ASSIGNMENT
    // =====================================

    else if (code === "314" && !progress.code4) {

      progress.code4 = true;

      response.innerHTML =
        "✔ Room Verified → Admission Record Unlocked";

      unlockModule(
        "mod5",
        "YOUR-ADMISSION-RECORD-LINK",
        "[5] Admission Record"
      );
    }

    // =====================================
    // ADMISSION RECORD
    // =====================================

    else if (code === "CARDIAC" && !progress.code5) {

      progress.code5 = true;

      response.innerHTML =
        "✔ Diagnosis Verified → Incident Timeline Unlocked";

      unlockModule(
        "mod6",
        "YOUR-INCIDENT-TIMELINE-LINK",
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
