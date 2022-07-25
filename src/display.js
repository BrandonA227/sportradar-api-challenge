import NHL from "./nhl";

(() => {
  const typeTags = document.querySelectorAll(".type-selector > li");
  const idLabel = document.querySelector(".id-container > label");
  const idInput = document.getElementById("id-input");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");

  let idType = "Player";

  const downloadCSV = async () => {
    console.log(
      await NHL.getTeamGamesPlayed(idInput.value, seasonYearInput.value)
    );
  };

  const changeIdTag = (e) => {
    typeTags.forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
    idLabel.textContent = e.target.textContent + " ID";
    idType = e.target.textContent;
  };

  const _init = (() => {
    submitBtn.addEventListener("click", downloadCSV);
    typeTags.forEach((element) => {
      element.addEventListener("click", changeIdTag);
    });
  })();
})();
