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
    const res = await fetch(url, { mode: "cors" });
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
  console.log(csv);
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
      const playerData = data[0]?.people[0];
      const playerStatsData = data[1]?.stats[0]?.splits[0]?.stat;
      filteredData.id = playerData?.id;
      filteredData.fullName = playerData?.fullName;
      filteredData.currentTeam = playerData?.currentTeam?.name;
      filteredData.currentAge = playerData?.currentAge;
      filteredData.primaryNumber = Number(playerData?.primaryNumber);
      filteredData.playerPosition = playerData?.primaryPosition.name;
      filteredData.isRookie = playerData?.rookie;
      filteredData.assists = playerStatsData?.assists;
      filteredData.goals = playerStatsData?.goals;
      filteredData.games = playerStatsData?.games;
      filteredData.hits = playerStatsData?.hits;
      filteredData.points = playerStatsData?.points;
    } else if (typeOfData === "team") {
      const teamData = data[0]?.teams[0]?.teamStats[0]?.splits[0];
      const firstGameData = data[1]?.dates[0];
      filteredData.id = teamData?.team?.id;
      filteredData.teamName = teamData?.team.name;
      filteredData.teamVenueName = data[0]?.teams[0]?.venue?.name;
      filteredData.gamesPlayed = teamData?.stat?.gamesPlayed;
      filteredData.wins = teamData?.stat?.wins;
      filteredData.losses = teamData?.stat?.losses;
      filteredData.points = teamData?.stat?.pts;
      filteredData.goalsPerGame = teamData?.stat?.goalsPerGame;
      filteredData.firstGameDate = firstGameData?.date;
      filteredData.firstGameOpponetName =
        firstGameData?.games[0]?.teams?.away?.team?.id !== idType
          ? firstGameData?.games[0]?.teams?.away?.team?.name
          : firstGameData?.games[0]?.teams?.home?.team?.name;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDOztBQUV0QjtBQUNmOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUcsd0NBQXdDLEtBQUs7QUFDakY7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsOEJBQThCLEdBQUcsNEJBQTRCLEtBQUs7QUFDbEU7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0Esd0NBQXdDLEtBQUssVUFBVSxHQUFHO0FBQzFEO0FBQ0EsV0FBVyxrREFBVTtBQUNyQjtBQUNBOzs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNtQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFpQjtBQUN6QixRQUFRLGdFQUF1QjtBQUMvQjtBQUNBLE1BQU07QUFDTjtBQUNBLFFBQVEsK0RBQXNCO0FBQzlCLFFBQVEsK0RBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isd0RBQWdCO0FBQ3hDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS8uL3NyYy9uaGwuanMiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2UvLi9zcmMvZGlzcGxheS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRSZXF1ZXN0IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTkhMIHtcbiAgc3RhdGljICNOSExfQVBJX1VSTCA9IFwiaHR0cHM6Ly9zdGF0c2FwaS53ZWIubmhsLmNvbS9hcGkvdjEvXCI7XG5cbiAgc3RhdGljIGdldFBsYXllckRhdGEoaWQpIHtcbiAgICBjb25zdCBQTEFZRVJfVVJMID0gYHBlb3BsZS8ke2lkfWA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBQTEFZRVJfVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG5cbiAgc3RhdGljIGdldFBsYXllclNlYXNvbkRhdGEoaWQsIHllYXIpIHtcbiAgICBjb25zdCBQTEFZRVJfVVJMID0gYHBlb3BsZS8ke2lkfS9zdGF0cz9zdGF0cz1zdGF0c1NpbmdsZVNlYXNvbiZzZWFzb249JHt5ZWFyfWA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBQTEFZRVJfVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG5cbiAgc3RhdGljIGdldFRlYW1TZWFzb25TdGF0cyhpZCwgeWVhcikge1xuICAgIGNvbnN0IFRFQU1fVVJMID0gYHRlYW1zLyR7aWR9P2V4cGFuZD10ZWFtLnN0YXRzJnNlYXNvbj0ke3llYXJ9YDtcbiAgICBjb25zdCBmdWxsVXJsID0gTkhMLiNOSExfQVBJX1VSTCArIFRFQU1fVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG5cbiAgc3RhdGljIGdldFRlYW1HYW1lc1BsYXllZChpZCwgeWVhcikge1xuICAgIGNvbnN0IFRFQU1fVVJMID0gYHNjaGVkdWxlP3NlYXNvbj0ke3llYXJ9JnRlYW1JZD0ke2lkfSZnYW1lVHlwZT1SYDtcbiAgICBjb25zdCBmdWxsVXJsID0gTkhMLiNOSExfQVBJX1VSTCArIFRFQU1fVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG59XG4iLCJhc3luYyBmdW5jdGlvbiBnZXRSZXF1ZXN0KHVybCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8PSAyOTkpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyByZXM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJvci5zdGF0dXNUZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRKc29uVG9Dc3Yob2JqKSB7XG4gIGNvbnN0IGhlYWRlciA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGNvbnN0IGNzdiA9IFtcbiAgICBoZWFkZXIuam9pbihcIixcIiksXG4gICAgaGVhZGVyLm1hcCgoZmllbGROYW1lKSA9PiBKU09OLnN0cmluZ2lmeShvYmpbZmllbGROYW1lXSkpLmpvaW4oXCIsXCIpLFxuICBdLmpvaW4oXCJcXHJcXG5cIik7XG4gIGNvbnNvbGUubG9nKGNzdik7XG4gIHJldHVybiBjc3Y7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSZXF1ZXN0LFxuICBjb252ZXJ0SnNvblRvQ3N2LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTkhMIGZyb20gXCIuL25obFwiO1xuaW1wb3J0IHsgY29udmVydEpzb25Ub0NzdiB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbigoKSA9PiB7XG4gIGNvbnN0IHR5cGVUYWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50eXBlLXNlbGVjdG9yID4gbGlcIik7XG4gIGNvbnN0IGlkTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlkLWNvbnRhaW5lciA+IGxhYmVsXCIpO1xuICBjb25zdCBpZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZC1pbnB1dFwiKTtcbiAgY29uc3Qgc2Vhc29uWWVhcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFzb24teWVhclwiKTtcbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3dubG9hZC1jc3YtYnRuXCIpO1xuICBjb25zdCBmb3JtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3ItbWVzc2FnZVwiKTtcblxuICBsZXQgaWRUeXBlID0gXCJQbGF5ZXJcIjtcblxuICBjb25zdCB2ZXJpZnlSZXF1ZXN0RGF0YSA9IChkYXRhKSA9PiB7XG4gICAgZGlzcGxheUVycm9yKFwiXCIpO1xuICAgIGxldCBlcnJvckRpc3BsYXllZCA9IGZhbHNlO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgZGlzcGxheUVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yLiBUcnkgYWdhaW4gbGF0ZXIuXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgZGF0YS5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZhbCAhPT0gXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIikge1xuICAgICAgICAgIGVycm9yRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgICBkaXNwbGF5RXJyb3IodmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZXJyb3JEaXNwbGF5ZWQgJiYgIWlzVmFsaWQpIHtcbiAgICAgIGRpc3BsYXlFcnJvcihcIkludGVybmFsIFNlcnZlciBFcnJvclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmhsRGF0YSA9IGFzeW5jIChpZCwgeWVhcikgPT4ge1xuICAgIGNvbnN0IHR5cGVPZkRhdGEgPSBpZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAodHlwZU9mRGF0YSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgZGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgTkhMLmdldFBsYXllckRhdGEoaWQpLFxuICAgICAgICBOSEwuZ2V0UGxheWVyU2Vhc29uRGF0YShpZCwgeWVhciksXG4gICAgICBdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZkRhdGEgPT09IFwidGVhbVwiKSB7XG4gICAgICBkYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBOSEwuZ2V0VGVhbVNlYXNvblN0YXRzKGlkLCB5ZWFyKSxcbiAgICAgICAgTkhMLmdldFRlYW1HYW1lc1BsYXllZChpZCwgeWVhciksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheUVycm9yID0gKG1lc3NhZ2UpID0+IHtcbiAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICB9O1xuXG4gIGNvbnN0IGRvd25sb2FkID0gKGZpbGVuYW1lLCB0ZXh0KSA9PiB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgIFwiaHJlZlwiLFxuICAgICAgXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KVxuICAgICk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBmaWxlbmFtZSk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkSW5wdXQgPSAoKSA9PiB7XG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGZvcm1JbnB1dC5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgIGlmIChlbGUudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJOaGxEYXRhID0gKGRhdGEpID0+IHtcbiAgICBsZXQgZmlsdGVyZWREYXRhID0ge307XG4gICAgY29uc3QgdHlwZU9mRGF0YSA9IGlkVHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0eXBlT2ZEYXRhID09PSBcInBsYXllclwiKSB7XG4gICAgICBjb25zdCBwbGF5ZXJEYXRhID0gZGF0YVswXT8ucGVvcGxlWzBdO1xuICAgICAgY29uc3QgcGxheWVyU3RhdHNEYXRhID0gZGF0YVsxXT8uc3RhdHNbMF0/LnNwbGl0c1swXT8uc3RhdDtcbiAgICAgIGZpbHRlcmVkRGF0YS5pZCA9IHBsYXllckRhdGE/LmlkO1xuICAgICAgZmlsdGVyZWREYXRhLmZ1bGxOYW1lID0gcGxheWVyRGF0YT8uZnVsbE5hbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuY3VycmVudFRlYW0gPSBwbGF5ZXJEYXRhPy5jdXJyZW50VGVhbT8ubmFtZTtcbiAgICAgIGZpbHRlcmVkRGF0YS5jdXJyZW50QWdlID0gcGxheWVyRGF0YT8uY3VycmVudEFnZTtcbiAgICAgIGZpbHRlcmVkRGF0YS5wcmltYXJ5TnVtYmVyID0gTnVtYmVyKHBsYXllckRhdGE/LnByaW1hcnlOdW1iZXIpO1xuICAgICAgZmlsdGVyZWREYXRhLnBsYXllclBvc2l0aW9uID0gcGxheWVyRGF0YT8ucHJpbWFyeVBvc2l0aW9uLm5hbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuaXNSb29raWUgPSBwbGF5ZXJEYXRhPy5yb29raWU7XG4gICAgICBmaWx0ZXJlZERhdGEuYXNzaXN0cyA9IHBsYXllclN0YXRzRGF0YT8uYXNzaXN0cztcbiAgICAgIGZpbHRlcmVkRGF0YS5nb2FscyA9IHBsYXllclN0YXRzRGF0YT8uZ29hbHM7XG4gICAgICBmaWx0ZXJlZERhdGEuZ2FtZXMgPSBwbGF5ZXJTdGF0c0RhdGE/LmdhbWVzO1xuICAgICAgZmlsdGVyZWREYXRhLmhpdHMgPSBwbGF5ZXJTdGF0c0RhdGE/LmhpdHM7XG4gICAgICBmaWx0ZXJlZERhdGEucG9pbnRzID0gcGxheWVyU3RhdHNEYXRhPy5wb2ludHM7XG4gICAgfSBlbHNlIGlmICh0eXBlT2ZEYXRhID09PSBcInRlYW1cIikge1xuICAgICAgY29uc3QgdGVhbURhdGEgPSBkYXRhWzBdPy50ZWFtc1swXT8udGVhbVN0YXRzWzBdPy5zcGxpdHNbMF07XG4gICAgICBjb25zdCBmaXJzdEdhbWVEYXRhID0gZGF0YVsxXT8uZGF0ZXNbMF07XG4gICAgICBmaWx0ZXJlZERhdGEuaWQgPSB0ZWFtRGF0YT8udGVhbT8uaWQ7XG4gICAgICBmaWx0ZXJlZERhdGEudGVhbU5hbWUgPSB0ZWFtRGF0YT8udGVhbS5uYW1lO1xuICAgICAgZmlsdGVyZWREYXRhLnRlYW1WZW51ZU5hbWUgPSBkYXRhWzBdPy50ZWFtc1swXT8udmVudWU/Lm5hbWU7XG4gICAgICBmaWx0ZXJlZERhdGEuZ2FtZXNQbGF5ZWQgPSB0ZWFtRGF0YT8uc3RhdD8uZ2FtZXNQbGF5ZWQ7XG4gICAgICBmaWx0ZXJlZERhdGEud2lucyA9IHRlYW1EYXRhPy5zdGF0Py53aW5zO1xuICAgICAgZmlsdGVyZWREYXRhLmxvc3NlcyA9IHRlYW1EYXRhPy5zdGF0Py5sb3NzZXM7XG4gICAgICBmaWx0ZXJlZERhdGEucG9pbnRzID0gdGVhbURhdGE/LnN0YXQ/LnB0cztcbiAgICAgIGZpbHRlcmVkRGF0YS5nb2Fsc1BlckdhbWUgPSB0ZWFtRGF0YT8uc3RhdD8uZ29hbHNQZXJHYW1lO1xuICAgICAgZmlsdGVyZWREYXRhLmZpcnN0R2FtZURhdGUgPSBmaXJzdEdhbWVEYXRhPy5kYXRlO1xuICAgICAgZmlsdGVyZWREYXRhLmZpcnN0R2FtZU9wcG9uZXROYW1lID1cbiAgICAgICAgZmlyc3RHYW1lRGF0YT8uZ2FtZXNbMF0/LnRlYW1zPy5hd2F5Py50ZWFtPy5pZCAhPT0gaWRUeXBlXG4gICAgICAgICAgPyBmaXJzdEdhbWVEYXRhPy5nYW1lc1swXT8udGVhbXM/LmF3YXk/LnRlYW0/Lm5hbWVcbiAgICAgICAgICA6IGZpcnN0R2FtZURhdGE/LmdhbWVzWzBdPy50ZWFtcz8uaG9tZT8udGVhbT8ubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkRGF0YTtcbiAgfTtcblxuICBjb25zdCBkb3dubG9hZENTViA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoaXNWYWxpZElucHV0KCkpIHtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0TmhsRGF0YShpZElucHV0LnZhbHVlLCBzZWFzb25ZZWFySW5wdXQudmFsdWUpO1xuICAgICAgaWYgKHZlcmlmeVJlcXVlc3REYXRhKGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGZpbHRlck5obERhdGEoZGF0YSk7XG4gICAgICAgIGNvbnN0IGNzdkRhdGEgPSBjb252ZXJ0SnNvblRvQ3N2KGZpbHRlcmVkRGF0YSk7XG4gICAgICAgIGRvd25sb2FkKFwibmhsX2RhdGEuY3N2XCIsIGNzdkRhdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5RXJyb3IoXCJCb3RoIGZpZWxkcyBhcmUgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGFuZ2VJZFRhZyA9IChlKSA9PiB7XG4gICAgdHlwZVRhZ3MuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlkTGFiZWwudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudCArIFwiIElEXCI7XG4gICAgaWRUeXBlID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gIH07XG5cbiAgY29uc3QgbGltaXRDaGFyID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLnNsaWNlKDAsIGUudGFyZ2V0Lm1heExlbmd0aCk7XG4gIH07XG5cbiAgY29uc3QgX2luaXQgPSAoKCkgPT4ge1xuICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZG93bmxvYWRDU1YpO1xuICAgIHR5cGVUYWdzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZUlkVGFnKTtcbiAgICB9KTtcbiAgICBmb3JtSW5wdXQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgbGltaXRDaGFyKTtcbiAgICB9KTtcbiAgfSkoKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=