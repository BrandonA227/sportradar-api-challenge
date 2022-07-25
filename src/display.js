import NHL from "./nhl";
import { convertJsonToCsv } from "./utils";

(() => {
  const typeTags = document.querySelectorAll(".type-selector > li");
  const idLabel = document.querySelector(".id-container > label");
  const idInput = document.getElementById("id-input");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");

  let idType = "Player";

  const getAndFilterNhlData = async (id, year) => {
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

    let filteredData = {};
    if (!data || typeof data === "string") {
      return data;
    } else {
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
        filteredData.firstGameOfSeasonDate = firstGameData.date;
        filteredData.firstGameOfSeasonOpponet =
          firstGameData.games[0].teams.away.team.id !== id
            ? firstGameData.games[0].teams.away.team.name
            : firstGameData.games[0].teams.home.team.name;
      }
    }

    return filteredData;
  };

  const downloadCSV = async () => {
    const data = await getAndFilterNhlData(
      idInput.value,
      seasonYearInput.value
    );
    if (data && typeof data[0] !== "string") {
    }
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
