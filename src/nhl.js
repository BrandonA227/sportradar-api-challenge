import { getRequest } from "./utils";

export default class NHL {
  static #NHL_API_URL = "https://statsapi.web.nhl.com/api/v1/";

  static getPlayerData(id) {
    const PLAYER_URL = `people/${id}`;
    const fullUrl = NHL.#NHL_API_URL + PLAYER_URL;
    return getRequest(fullUrl);
  }

  static getPlayerSeasonData(id, year) {
    const PLAYER_URL = `people/${id}/stats?stats=statsSingleSeason&season=${year}`;
    const fullUrl = NHL.#NHL_API_URL + PLAYER_URL;
    return getRequest(fullUrl);
  }

  static getTeamSeasonStats(id, year) {
    const TEAM_URL = `teams/${id}?expand=team.stats&season=${year}`;
    const fullUrl = NHL.#NHL_API_URL + TEAM_URL;
    return getRequest(fullUrl);
  }

  static getTeamGamesPlayed(id, year) {
    const TEAM_URL = `schedule?season=${year}&teamId=${id}&gameType=R`;
    const fullUrl = NHL.#NHL_API_URL + TEAM_URL;
    return getRequest(fullUrl);
  }
}
