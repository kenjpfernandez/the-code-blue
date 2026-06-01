function login() {
  const userEl = document.getElementById("username");
  const passEl = document.getElementById("password");
  const response = document.getElementById("loginResponse");

  if (!userEl || !passEl) return;

  const user = userEl.value;
  const pass = passEl.value;

  if(user === "iciu_agent" && pass === "directive72") {
    window.location.href = "terminal.html";
  } else {
    if (response) response.innerHTML = "ACCESS DENIED";
  }
}

// ===== SAFE INIT =====
document.addEventListener("DOMContentLoaded", function () {

  const team = localStorage.getItem("teamName") || "UNKNOWN";
  const teamEl = document.getElementById("teamDisplay");
  if (teamEl) {
    teamEl.innerHTML = `> Team: ${team}`;
  }

  let progress = {
    code1: false,
    code2: false,
    code3: false
  };

  function updateProgress() {
    const el = document.getElementById("progress");
    if (!el) return;

    const count = Object.values(progress).filter(v => v).length;
    el.innerHTML = `Progress: ${count} / 3 Evidence Verified`;
  }

  document.querySelector("button").addEventListener("click", function () {

    const code = document.getElementById("codeInput").value.trim().toUpperCase();
    const response = document.getElementById("response");

    if(code === "0412") {
      response.innerHTML = "✔ Calendar Unlocked";
      document.getElementById("mod2").innerHTML =
        `<a href="https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgD1SblGIzxNQ6TZ1Foftn-cAcBh_9Al9knRBjzr4f9mEYg?e=rMkUvk" target="_blank">[2] Calendar System</a>`;
    }

    else if(code === "19:00") {
      response.innerHTML = "✔ Finance Unlocked";
      document.getElementById("mod3").innerHTML =
        `<a href="https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDgTUmNrPITSrHUUBdY9iJSAQYPRUNoMTiKlcXH1S1AHBs?e=ibavv5" target="_blank">[3] Financial Records</a>`;
    }

    else if(code === "ACCT-7781") {
      response.innerHTML = "✔ HR Unlocked";
      document.getElementById("mod4").innerHTML =
        `<a href="https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDJIhaZCRjAQJWyCGulDOH9Aa3V19mCeqF7ehQZgKj4VDI?e=28teRV" target="_blank">[4] HR Database</a>`;
    }

    else if(code === "SILENTDIRECTIVE") {
      window.location.href = "puzzles/day1_end.html";
    }

    else {
      response.innerHTML = "✖ INVALID CODE";
    }

    document.getElementById("codeInput").value = "";
    updateProgress();
  });

});
