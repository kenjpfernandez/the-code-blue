const sounds = {
  login: new Audio("assets/login_beep.mp3"),
  unlock: new Audio("assets/unlock.mp3"),
  warning: new Audio("assets/warning.mp3"),
  archive: new Audio("assets/archive.mp3")
};

sounds.login.volume = 0.5;
sounds.unlock.volume = 0.5;
sounds.warning.volume = 0.6;
sounds.archive.volume = 0.6;

document.addEventListener("click", () => {

  Object.values(sounds).forEach(sound => {

    sound.play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
      })
      .catch(() => {});

  });

}, { once: true });

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

    const raw = inputEl.value.trim().toUpperCase();
    const code = raw.replace(/[^A-Z0-9]/g, "");

    console.log("INPUT:", raw);

    if (code === "DETERIORATION" && !progress.code1) {
      progress.code1 = true;
      response.innerHTML = "✔ Clinical Deterioration Verified → Alert Logs Unlocked";
      unlockModule(
        "mod2",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgBUTj3gEQnAQa0oIBlEOWyUAf_GjnH9mUufXZjCbwuR5GI?e=OYRxVV",
        "[2] Alert Logs"
      );
    }

    else if (code === "WARNING" && !progress.code2) {
      progress.code2 = true;
      response.innerHTML = "✔ Warning Verified → Escalation Records Unlocked";
      unlockModule(
        "mod3",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDBQaAlkmtqS6We9e-xH7BPAeUXB5Cg-hdDIv0qdkGdPl0?e=KtY5e3",
        "[3] Escalation Records"
      );
    }

    else if (code === "DELAY" && !progress.code3) {
      progress.code3 = true;
      response.innerHTML = "✔ Delay Verified → Review Committee Unlocked";
      unlockModule(
        "mod4",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDFUmt928uiRrPw803uwi4BAXZsRN_C-o874u7CVHZ_Ktw?e=HPhhal",
        "[4] Review Committee"
      );
    }

    else if (code === "MULTIPLE" && !progress.code4) {
      progress.code4 = true;
      response.innerHTML = "✔ Multiple Opportunities Verified → Final RCA Unlocked";
      unlockModule(
        "mod5",
        "https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDxHDdGNQmuRa7N6AvE4OecAanOkV9CmHQBZZGHRyxjXlE?e=qjRceD",
        "[5] Final RCA"
      );
    }

    else if (code === "ESCALATIONDELAY") {
      if (
        progress.code1 &&
        progress.code2 &&
        progress.code3 &&
        progress.code4
      ) {
        response.innerHTML = "⚠ ROOT CAUSE ANALYSIS COMPLETE...";

        localStorage.setItem("day3Complete", "true");
        localStorage.setItem("day3Result", "ESCALATION DELAY");

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
