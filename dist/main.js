/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/nhl.js":
/*!********************!*\
  !*** ./src/nhl.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NHL)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);


class NHL {
  static #NHL_API_URL = "https://statsapi.web.nhl.com/api/v1/";

  static getPlayerData(id) {
    const PLAYER_URL = `people/${id}`;
    const fullUrl = NHL.#NHL_API_URL + PLAYER_URL;
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRequest)(fullUrl);
  }

  static getPlayerSeasonData(id, year) {
    const PLAYER_URL = `people/${id}/stats?stats=statsSingleSeason&season=${year}`;
    const fullUrl = NHL.#NHL_API_URL + PLAYER_URL;
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRequest)(fullUrl);
  }

  static getTeamSeasonStats(id, year) {
    const TEAM_URL = `teams/${id}?expand=team.stats&season=${year}`;
    const fullUrl = NHL.#NHL_API_URL + TEAM_URL;
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRequest)(fullUrl);
  }

  static getTeamGamesPlayed(id, year) {
    const TEAM_URL = `schedule?season=${year}&teamId=${id}&gameType=R`;
    const fullUrl = NHL.#NHL_API_URL + TEAM_URL;
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRequest)(fullUrl);
  }
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

async function getRequest(url) {
  try {
    const res = await fetch(url, { mode: "cors" }).catch((err) => {
      return err;
    });
    if (res.status >= 200 && res.status <= 299) {
      return res.json();
    } else {
      throw res;
    }
  } catch (error) {
    return error.statusText;
  }
}

function convertJsonToCsv(obj) {
  const header = Object.keys(obj);
  const csv = [
    header.join(","),
    header.map((fieldName) => JSON.stringify(obj[fieldName])).join(","),
  ].join("\r\n");
  return csv;
}

module.exports = {
  getRequest,
  convertJsonToCsv,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nhl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nhl */ "./src/nhl.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_1__);



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
        _nhl__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerData(id),
        _nhl__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerSeasonData(id, year),
      ]);
    } else if (typeOfData === "team") {
      data = await Promise.all([
        _nhl__WEBPACK_IMPORTED_MODULE_0__["default"].getTeamSeasonStats(id, year),
        _nhl__WEBPACK_IMPORTED_MODULE_0__["default"].getTeamGamesPlayed(id, year),
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
        firstGameData.games[0].teams.away.team.id !== idType
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
        const csvData = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.convertJsonToCsv)(filteredData);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDOztBQUV0QjtBQUNmOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUcsd0NBQXdDLEtBQUs7QUFDakY7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsOEJBQThCLEdBQUcsNEJBQTRCLEtBQUs7QUFDbEU7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0Esd0NBQXdDLEtBQUssVUFBVSxHQUFHO0FBQzFEO0FBQ0EsV0FBVyxrREFBVTtBQUNyQjtBQUNBOzs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDbUI7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBaUI7QUFDekIsUUFBUSxnRUFBdUI7QUFDL0I7QUFDQSxNQUFNO0FBQ047QUFDQSxRQUFRLCtEQUFzQjtBQUM5QixRQUFRLCtEQUFzQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdEQUFnQjtBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2UvLi9zcmMvbmhsLmpzIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlLy4vc3JjL2Rpc3BsYXkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UmVxdWVzdCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ITCB7XG4gIHN0YXRpYyAjTkhMX0FQSV9VUkwgPSBcImh0dHBzOi8vc3RhdHNhcGkud2ViLm5obC5jb20vYXBpL3YxL1wiO1xuXG4gIHN0YXRpYyBnZXRQbGF5ZXJEYXRhKGlkKSB7XG4gICAgY29uc3QgUExBWUVSX1VSTCA9IGBwZW9wbGUvJHtpZH1gO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBOSEwuI05ITF9BUElfVVJMICsgUExBWUVSX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQbGF5ZXJTZWFzb25EYXRhKGlkLCB5ZWFyKSB7XG4gICAgY29uc3QgUExBWUVSX1VSTCA9IGBwZW9wbGUvJHtpZH0vc3RhdHM/c3RhdHM9c3RhdHNTaW5nbGVTZWFzb24mc2Vhc29uPSR7eWVhcn1gO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBOSEwuI05ITF9BUElfVVJMICsgUExBWUVSX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUZWFtU2Vhc29uU3RhdHMoaWQsIHllYXIpIHtcbiAgICBjb25zdCBURUFNX1VSTCA9IGB0ZWFtcy8ke2lkfT9leHBhbmQ9dGVhbS5zdGF0cyZzZWFzb249JHt5ZWFyfWA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBURUFNX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUZWFtR2FtZXNQbGF5ZWQoaWQsIHllYXIpIHtcbiAgICBjb25zdCBURUFNX1VSTCA9IGBzY2hlZHVsZT9zZWFzb249JHt5ZWFyfSZ0ZWFtSWQ9JHtpZH0mZ2FtZVR5cGU9UmA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBURUFNX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxufVxuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0UmVxdWVzdCh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogXCJjb3JzXCIgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8PSAyOTkpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyByZXM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJvci5zdGF0dXNUZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRKc29uVG9Dc3Yob2JqKSB7XG4gIGNvbnN0IGhlYWRlciA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGNvbnN0IGNzdiA9IFtcbiAgICBoZWFkZXIuam9pbihcIixcIiksXG4gICAgaGVhZGVyLm1hcCgoZmllbGROYW1lKSA9PiBKU09OLnN0cmluZ2lmeShvYmpbZmllbGROYW1lXSkpLmpvaW4oXCIsXCIpLFxuICBdLmpvaW4oXCJcXHJcXG5cIik7XG4gIHJldHVybiBjc3Y7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSZXF1ZXN0LFxuICBjb252ZXJ0SnNvblRvQ3N2LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTkhMIGZyb20gXCIuL25obFwiO1xuaW1wb3J0IHsgY29udmVydEpzb25Ub0NzdiB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbigoKSA9PiB7XG4gIGNvbnN0IHR5cGVUYWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50eXBlLXNlbGVjdG9yID4gbGlcIik7XG4gIGNvbnN0IGlkTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlkLWNvbnRhaW5lciA+IGxhYmVsXCIpO1xuICBjb25zdCBpZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZC1pbnB1dFwiKTtcbiAgY29uc3Qgc2Vhc29uWWVhcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFzb24teWVhclwiKTtcbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3dubG9hZC1jc3YtYnRuXCIpO1xuICBjb25zdCBmb3JtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3ItbWVzc2FnZVwiKTtcblxuICBsZXQgaWRUeXBlID0gXCJQbGF5ZXJcIjtcblxuICBjb25zdCB2ZXJpZnlSZXF1ZXN0RGF0YSA9IChkYXRhKSA9PiB7XG4gICAgZGlzcGxheUVycm9yKFwiXCIpO1xuICAgIGxldCBlcnJvckRpc3BsYXllZCA9IGZhbHNlO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgZGlzcGxheUVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yLiBUcnkgYWdhaW4gbGF0ZXIuXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgZGF0YS5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZhbCAhPT0gXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIikge1xuICAgICAgICAgIGVycm9yRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgICBkaXNwbGF5RXJyb3IodmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZXJyb3JEaXNwbGF5ZWQgJiYgIWlzVmFsaWQpIHtcbiAgICAgIGRpc3BsYXlFcnJvcihcIkludGVybmFsIFNlcnZlciBFcnJvclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmhsRGF0YSA9IGFzeW5jIChpZCwgeWVhcikgPT4ge1xuICAgIGNvbnN0IHR5cGVPZkRhdGEgPSBpZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAodHlwZU9mRGF0YSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgZGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgTkhMLmdldFBsYXllckRhdGEoaWQpLFxuICAgICAgICBOSEwuZ2V0UGxheWVyU2Vhc29uRGF0YShpZCwgeWVhciksXG4gICAgICBdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZkRhdGEgPT09IFwidGVhbVwiKSB7XG4gICAgICBkYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBOSEwuZ2V0VGVhbVNlYXNvblN0YXRzKGlkLCB5ZWFyKSxcbiAgICAgICAgTkhMLmdldFRlYW1HYW1lc1BsYXllZChpZCwgeWVhciksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheUVycm9yID0gKG1lc3NhZ2UpID0+IHtcbiAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICB9O1xuXG4gIGNvbnN0IGRvd25sb2FkID0gKGZpbGVuYW1lLCB0ZXh0KSA9PiB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgIFwiaHJlZlwiLFxuICAgICAgXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KVxuICAgICk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBmaWxlbmFtZSk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkSW5wdXQgPSAoKSA9PiB7XG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGZvcm1JbnB1dC5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgIGlmIChlbGUudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJOaGxEYXRhID0gKGRhdGEpID0+IHtcbiAgICBsZXQgZmlsdGVyZWREYXRhID0ge307XG4gICAgY29uc3QgdHlwZU9mRGF0YSA9IGlkVHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0eXBlT2ZEYXRhID09PSBcInBsYXllclwiKSB7XG4gICAgICBjb25zdCBwbGF5ZXJEYXRhID0gZGF0YVswXS5wZW9wbGVbMF07XG4gICAgICBjb25zdCBwbGF5ZXJTdGF0c0RhdGEgPSBkYXRhWzFdLnN0YXRzWzBdLnNwbGl0c1swXS5zdGF0O1xuICAgICAgZmlsdGVyZWREYXRhLmlkID0gcGxheWVyRGF0YS5pZDtcbiAgICAgIGZpbHRlcmVkRGF0YS5mdWxsTmFtZSA9IHBsYXllckRhdGEuZnVsbE5hbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuY3VycmVudFRlYW0gPSBwbGF5ZXJEYXRhLmN1cnJlbnRUZWFtLm5hbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuY3VycmVudEFnZSA9IHBsYXllckRhdGEuY3VycmVudEFnZTtcbiAgICAgIGZpbHRlcmVkRGF0YS5wcmltYXJ5TnVtYmVyID0gTnVtYmVyKHBsYXllckRhdGEucHJpbWFyeU51bWJlcik7XG4gICAgICBmaWx0ZXJlZERhdGEucGxheWVyUG9zaXRpb24gPSBwbGF5ZXJEYXRhLnByaW1hcnlQb3NpdGlvbi5uYW1lO1xuICAgICAgZmlsdGVyZWREYXRhLmlzUm9va2llID0gcGxheWVyRGF0YS5yb29raWU7XG4gICAgICBmaWx0ZXJlZERhdGEuYXNzaXN0cyA9IHBsYXllclN0YXRzRGF0YS5hc3Npc3RzO1xuICAgICAgZmlsdGVyZWREYXRhLmdvYWxzID0gcGxheWVyU3RhdHNEYXRhLmdvYWxzO1xuICAgICAgZmlsdGVyZWREYXRhLmdhbWVzID0gcGxheWVyU3RhdHNEYXRhLmdhbWVzO1xuICAgICAgZmlsdGVyZWREYXRhLmhpdHMgPSBwbGF5ZXJTdGF0c0RhdGEuaGl0cztcbiAgICAgIGZpbHRlcmVkRGF0YS5wb2ludHMgPSBwbGF5ZXJTdGF0c0RhdGEucG9pbnRzO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mRGF0YSA9PT0gXCJ0ZWFtXCIpIHtcbiAgICAgIGNvbnN0IHRlYW1EYXRhID0gZGF0YVswXS50ZWFtc1swXS50ZWFtU3RhdHNbMF0uc3BsaXRzWzBdO1xuICAgICAgY29uc3QgZmlyc3RHYW1lRGF0YSA9IGRhdGFbMV0uZGF0ZXNbMF07XG4gICAgICBmaWx0ZXJlZERhdGEuaWQgPSB0ZWFtRGF0YS50ZWFtLmlkO1xuICAgICAgZmlsdGVyZWREYXRhLnRlYW1OYW1lID0gdGVhbURhdGEudGVhbS5uYW1lO1xuICAgICAgZmlsdGVyZWREYXRhLnRlYW1WZW51ZU5hbWUgPSBkYXRhWzBdLnRlYW1zWzBdLnZlbnVlLm5hbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuZ2FtZXNQbGF5ZWQgPSB0ZWFtRGF0YS5zdGF0LmdhbWVzUGxheWVkO1xuICAgICAgZmlsdGVyZWREYXRhLndpbnMgPSB0ZWFtRGF0YS5zdGF0LndpbnM7XG4gICAgICBmaWx0ZXJlZERhdGEubG9zc2VzID0gdGVhbURhdGEuc3RhdC5sb3NzZXM7XG4gICAgICBmaWx0ZXJlZERhdGEucG9pbnRzID0gdGVhbURhdGEuc3RhdC5wdHM7XG4gICAgICBmaWx0ZXJlZERhdGEuZ29hbHNQZXJHYW1lID0gdGVhbURhdGEuc3RhdC5nb2Fsc1BlckdhbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuZmlyc3RHYW1lRGF0ZSA9IGZpcnN0R2FtZURhdGEuZGF0ZTtcbiAgICAgIGZpbHRlcmVkRGF0YS5maXJzdEdhbWVPcHBvbmV0TmFtZSA9XG4gICAgICAgIGZpcnN0R2FtZURhdGEuZ2FtZXNbMF0udGVhbXMuYXdheS50ZWFtLmlkICE9PSBpZFR5cGVcbiAgICAgICAgICA/IGZpcnN0R2FtZURhdGEuZ2FtZXNbMF0udGVhbXMuYXdheS50ZWFtLm5hbWVcbiAgICAgICAgICA6IGZpcnN0R2FtZURhdGEuZ2FtZXNbMF0udGVhbXMuaG9tZS50ZWFtLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJlZERhdGE7XG4gIH07XG5cbiAgY29uc3QgZG93bmxvYWRDU1YgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGlzVmFsaWRJbnB1dCgpKSB7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldE5obERhdGEoaWRJbnB1dC52YWx1ZSwgc2Vhc29uWWVhcklucHV0LnZhbHVlKTtcbiAgICAgIGlmICh2ZXJpZnlSZXF1ZXN0RGF0YShkYXRhKSkge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJOaGxEYXRhKGRhdGEpO1xuICAgICAgICBjb25zdCBjc3ZEYXRhID0gY29udmVydEpzb25Ub0NzdihmaWx0ZXJlZERhdGEpO1xuICAgICAgICBkb3dubG9hZChcIm5obF9kYXRhLmNzdlwiLCBjc3ZEYXRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheUVycm9yKFwiQm90aCBmaWVsZHMgYXJlIHJlcXVpcmVkLlwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlSWRUYWcgPSAoZSkgPT4ge1xuICAgIHR5cGVUYWdzLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZExhYmVsLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQgKyBcIiBJRFwiO1xuICAgIGlkVHlwZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICB9O1xuXG4gIGNvbnN0IGxpbWl0Q2hhciA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC52YWx1ZS5zbGljZSgwLCBlLnRhcmdldC5tYXhMZW5ndGgpO1xuICB9O1xuXG4gIGNvbnN0IF9pbml0ID0gKCgpID0+IHtcbiAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRvd25sb2FkQ1NWKTtcbiAgICB0eXBlVGFncy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VJZFRhZyk7XG4gICAgfSk7XG4gICAgZm9ybUlucHV0LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGxpbWl0Q2hhcik7XG4gICAgfSk7XG4gIH0pKCk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9