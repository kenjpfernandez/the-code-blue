document.addEventListener("DOMContentLoaded", function () {

  console.log("Day 2 loaded");

  // ===== NORMAL GAME =====

  const team = localStorage.getItem("teamName") || "UNKNOWN";
  document.getElementById("teamDisplay").innerHTML = `> Team: ${team}`;

  let progress = {
    code1: false,
    code2: false,
    code3: false
  };

  function updateProgress() {
    const count = Object.values(progress).filter(v => v).length;
    document.getElementById("progress").innerHTML =
      `Progress: ${count} / 3 Evidence Verified`;
  }

  document.querySelector("button").addEventListener("click", function () {

    const code = document.getElementById("codeInput").value.trim().toUpperCase();
    const response = document.getElementById("response");

    if(code === "0315") {
      progress.code1 = true;
      response.innerHTML = "✔ Calendar Unlocked";
      document.getElementById("mod2").innerHTML =
        `<a href="https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDQ1U8qkmbyQZxzf2eDxqYuAT6XdExumNP13Vs0uRa25rs?e=6KQXkV" target="_blank">[2] Calendar</a>`;
    }

    else if(code === "18:45") {
      progress.code2 = true;
      response.innerHTML = "✔ Finance Unlocked";
      document.getElementById("mod3").innerHTML =
        `<a href="https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgDic3qH6l9pQLqSJjVKAcNYAa8JzqpRAYK2Xyygo0pyHyw?e=GUKTb3" target="_blank">[3] Finance</a>`;
    }

    else if(code === "ACCT-9913") {
      progress.code3 = true;
      response.innerHTML = "✔ HR Unlocked";
      document.getElementById("mod4").innerHTML =
        `<a href="https://thermofisher-my.sharepoint.com/:f:/p/kennethjay_fernandez/IgCeSvYrR43bQ7svjnIitYKAAd45Hwl_mbLJQyAHwriqWYY?e=YYVySp" target="_blank">[4] HR</a>`;
    }

    else if(code === "TRUSTNOTHING") {

      if(progress.code1 && progress.code2 && progress.code3) {
        response.innerHTML = "⚠ SYSTEM OVERRIDE...";
        setTimeout(() => {
          window.location.href = "puzzles/day2_end.html";
        }, 1500);
      } else {
        response.innerHTML = "✖ INCOMPLETE DATA";
      }
    }

    else {
      response.innerHTML = "✖ INVALID CODE";
    }

    document.getElementById("codeInput").value = "";
    updateProgress();
  });

});
