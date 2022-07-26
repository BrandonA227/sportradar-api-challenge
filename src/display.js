import NHL from "./nhl";
import { convertJsonToCsv } from "./utils";

(() => {
  const typeTags = document.querySelectorAll(".type-selector > li");
  const idLabel = document.querySelector(".id-container > label");
  const idInput = document.getElementById("id-input");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");
  const formInput = document.querySelectorAll("input");
  const errorMessage = document.querySelector(".error-message");

  let idType = "Player";

  const verifyRequestData = (data) => {
    displayError("");
    let errorDisplayed = false;
    if (!data) {
      displayError("There was an error. Try again later.");
      return false;
    }
    let isValid = true;
    data.forEach((val) => {
      if (typeof val === "string") {
        isValid = false;
        if (val !== "Internal Server Error") {
          errorDisplayed = true;
          displayError(val);
        }
      }
    });
    if (!errorDisplayed && !isValid) {
      displayError("Internal Server Error");
    }
    return isValid;
  };

  const getNhlData = async (id, year) => {
    const typeOfData = idType.toLowerCase();
    let data;
    if (typeOfData === "player") {
      data = await Promise.all([
        NHL.getPlayerData(id),
        NHL.getPlayerSeasonData(id, year),
      ]);
    } else if (typeOfData === "team") {
      data = await Promise.all([
        NHL.getTeamSeasonStats(id, year),
        NHL.getTeamGamesPlayed(id, year),
      ]);
    }
    return data;
  };

  const displayError = (message) => {
    errorMessage.textContent = message;
  };

  const download = (filename, text) => {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isValidInput = () => {
    let isValid = true;
    formInput.forEach((ele) => {
      if (ele.validity.valueMissing) {
        isValid = false;
      }
    });
    return isValid;
  };

  const filterNhlData = (data) => {
    let filteredData = {};
    const typeOfData = idType.toLowerCase();
    if (typeOfData === "player") {
      const playerData = data[0].people[0];
      const playerStatsData = data[1].stats[0].splits[0].stat;
      filteredData.id = playerData.id;
      filteredData.fullName = playerData.fullName;
      filteredData.currentTeam = playerData.currentTeam.name;
      filteredData.currentAge = playerData.currentAge;
      filteredData.primaryNumber = Number(playerData.primaryNumber);
      filteredData.playerPosition = playerData.primaryPosition.name;
      filteredData.isRookie = playerData.rookie;
      filteredData.assists = playerStatsData.assists;
      filteredData.goals = playerStatsData.goals;
      filteredData.games = playerStatsData.games;
      filteredData.hits = playerStatsData.hits;
      filteredData.points = playerStatsData.points;
    } else if (typeOfData === "team") {
      const teamData = data[0].teams[0].teamStats[0].splits[0];
      const firstGameData = data[1].dates[0];
      filteredData.id = teamData.team.id;
      filteredData.teamName = teamData.team.name;
      filteredData.teamVenueName = data[0].teams[0].venue.name;
      filteredData.gamesPlayed = teamData.stat.gamesPlayed;
      filteredData.wins = teamData.stat.wins;
      filteredData.losses = teamData.stat.losses;
      filteredData.points = teamData.stat.pts;
      filteredData.goalsPerGame = teamData.stat.goalsPerGame;
      filteredData.firstGameDate = firstGameData.date;
      filteredData.firstGameOpponetName =
        firstGameData.games[0].teams.away.team.id !== id
          ? firstGameData.games[0].teams.away.team.name
          : firstGameData.games[0].teams.home.team.name;
    }
    return filteredData;
  };

  const downloadCSV = async () => {
    if (isValidInput()) {
      let data = await getNhlData(idInput.value, seasonYearInput.value);
      if (verifyRequestData(data)) {
        const filteredData = filterNhlData(data);
        const csvData = convertJsonToCsv(filteredData);
        download("nhl_data.csv", csvData);
      }
    } else {
      displayError("Both fields are required.");
    }
  };

  const changeIdTag = (e) => {
    typeTags.forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
    idLabel.textContent = e.target.textContent + " ID";
    idType = e.target.textContent;
  };

  const limitChar = (e) => {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const _init = (() => {
    submitBtn.addEventListener("click", downloadCSV);
    typeTags.forEach((element) => {
      element.addEventListener("click", changeIdTag);
    });
    formInput.forEach((element) => {
      element.addEventListener("input", limitChar);
    });
  })();
})();
