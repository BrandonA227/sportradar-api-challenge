import NHL from "./nhl";

(() => {
  const idInput = document.getElementById("id-input");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");

  const downloadCSV = async () => {
    console.log(
      await NHL.getTeamGamesPlayed(idInput.value, seasonYearInput.value)
    );
  };

  const _init = (() => {
    submitBtn.addEventListener("click", downloadCSV);
  })();
})();
