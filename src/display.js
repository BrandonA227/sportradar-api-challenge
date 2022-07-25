import NHL from "./nhl";

(() => {
  const playerIdInput = document.getElementById("player-id");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");

  const downloadCSV = async () => {
    console.log(
      await NHL.getPlayerSeasonData(playerIdInput.value, seasonYearInput.value)
    );
  };

  const _init = (() => {
    submitBtn.addEventListener("click", downloadCSV);
  })();
})();
