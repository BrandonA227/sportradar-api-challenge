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

  let idType = "Player";

  const getAndFilterNhlData = async (id, year) => {
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

  const downloadCSV = async () => {
    const data = await getAndFilterNhlData(
      idInput.value,
      seasonYearInput.value
    );
    if (data && typeof data[0] !== "string") {
      const csvData = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.convertJsonToCsv)(data);
      download("nhl_data.csv", csvData);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDOztBQUV0QjtBQUNmOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUcsd0NBQXdDLEtBQUs7QUFDakY7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsOEJBQThCLEdBQUcsNEJBQTRCLEtBQUs7QUFDbEU7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0Esd0NBQXdDLEtBQUssVUFBVSxHQUFHO0FBQzFEO0FBQ0EsV0FBVyxrREFBVTtBQUNyQjtBQUNBOzs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDbUI7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBaUI7QUFDekIsUUFBUSxnRUFBdUI7QUFDL0I7QUFDQSxNQUFNO0FBQ047QUFDQSxRQUFRLCtEQUFzQjtBQUM5QixRQUFRLCtEQUFzQjtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3REFBZ0I7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS8uL3NyYy9uaGwuanMiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2UvLi9zcmMvZGlzcGxheS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRSZXF1ZXN0IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTkhMIHtcbiAgc3RhdGljICNOSExfQVBJX1VSTCA9IFwiaHR0cHM6Ly9zdGF0c2FwaS53ZWIubmhsLmNvbS9hcGkvdjEvXCI7XG5cbiAgc3RhdGljIGdldFBsYXllckRhdGEoaWQpIHtcbiAgICBjb25zdCBQTEFZRVJfVVJMID0gYHBlb3BsZS8ke2lkfWA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBQTEFZRVJfVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG5cbiAgc3RhdGljIGdldFBsYXllclNlYXNvbkRhdGEoaWQsIHllYXIpIHtcbiAgICBjb25zdCBQTEFZRVJfVVJMID0gYHBlb3BsZS8ke2lkfS9zdGF0cz9zdGF0cz1zdGF0c1NpbmdsZVNlYXNvbiZzZWFzb249JHt5ZWFyfWA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBQTEFZRVJfVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG5cbiAgc3RhdGljIGdldFRlYW1TZWFzb25TdGF0cyhpZCwgeWVhcikge1xuICAgIGNvbnN0IFRFQU1fVVJMID0gYHRlYW1zLyR7aWR9P2V4cGFuZD10ZWFtLnN0YXRzJnNlYXNvbj0ke3llYXJ9YDtcbiAgICBjb25zdCBmdWxsVXJsID0gTkhMLiNOSExfQVBJX1VSTCArIFRFQU1fVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG5cbiAgc3RhdGljIGdldFRlYW1HYW1lc1BsYXllZChpZCwgeWVhcikge1xuICAgIGNvbnN0IFRFQU1fVVJMID0gYHNjaGVkdWxlP3NlYXNvbj0ke3llYXJ9JnRlYW1JZD0ke2lkfSZnYW1lVHlwZT1SYDtcbiAgICBjb25zdCBmdWxsVXJsID0gTkhMLiNOSExfQVBJX1VSTCArIFRFQU1fVVJMO1xuICAgIHJldHVybiBnZXRSZXF1ZXN0KGZ1bGxVcmwpO1xuICB9XG59XG4iLCJhc3luYyBmdW5jdGlvbiBnZXRSZXF1ZXN0KHVybCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDw9IDI5OSkge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHJlcztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yLnN0YXR1c1RleHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29udmVydEpzb25Ub0NzdihvYmopIHtcbiAgY29uc3QgaGVhZGVyID0gT2JqZWN0LmtleXMob2JqKTtcbiAgY29uc3QgY3N2ID0gW1xuICAgIGhlYWRlci5qb2luKFwiLFwiKSxcbiAgICBoZWFkZXIubWFwKChmaWVsZE5hbWUpID0+IEpTT04uc3RyaW5naWZ5KG9ialtmaWVsZE5hbWVdKSkuam9pbihcIixcIiksXG4gIF0uam9pbihcIlxcclxcblwiKTtcbiAgcmV0dXJuIGNzdjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldFJlcXVlc3QsXG4gIGNvbnZlcnRKc29uVG9Dc3YsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBOSEwgZnJvbSBcIi4vbmhsXCI7XG5pbXBvcnQgeyBjb252ZXJ0SnNvblRvQ3N2IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuKCgpID0+IHtcbiAgY29uc3QgdHlwZVRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnR5cGUtc2VsZWN0b3IgPiBsaVwiKTtcbiAgY29uc3QgaWRMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWQtY29udGFpbmVyID4gbGFiZWxcIik7XG4gIGNvbnN0IGlkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkLWlucHV0XCIpO1xuICBjb25zdCBzZWFzb25ZZWFySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXNvbi15ZWFyXCIpO1xuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvd25sb2FkLWNzdi1idG5cIik7XG5cbiAgbGV0IGlkVHlwZSA9IFwiUGxheWVyXCI7XG5cbiAgY29uc3QgZ2V0QW5kRmlsdGVyTmhsRGF0YSA9IGFzeW5jIChpZCwgeWVhcikgPT4ge1xuICAgIGNvbnN0IHR5cGVPZkRhdGEgPSBpZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAodHlwZU9mRGF0YSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgZGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgTkhMLmdldFBsYXllckRhdGEoaWQpLFxuICAgICAgICBOSEwuZ2V0UGxheWVyU2Vhc29uRGF0YShpZCwgeWVhciksXG4gICAgICBdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZkRhdGEgPT09IFwidGVhbVwiKSB7XG4gICAgICBkYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBOSEwuZ2V0VGVhbVNlYXNvblN0YXRzKGlkLCB5ZWFyKSxcbiAgICAgICAgTkhMLmdldFRlYW1HYW1lc1BsYXllZChpZCwgeWVhciksXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0ge307XG4gICAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVPZkRhdGEgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgY29uc3QgcGxheWVyRGF0YSA9IGRhdGFbMF0ucGVvcGxlWzBdO1xuICAgICAgICBjb25zdCBwbGF5ZXJTdGF0c0RhdGEgPSBkYXRhWzFdLnN0YXRzWzBdLnNwbGl0c1swXS5zdGF0O1xuICAgICAgICBmaWx0ZXJlZERhdGEuaWQgPSBwbGF5ZXJEYXRhLmlkO1xuICAgICAgICBmaWx0ZXJlZERhdGEuZnVsbE5hbWUgPSBwbGF5ZXJEYXRhLmZ1bGxOYW1lO1xuICAgICAgICBmaWx0ZXJlZERhdGEuY3VycmVudFRlYW0gPSBwbGF5ZXJEYXRhLmN1cnJlbnRUZWFtLm5hbWU7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5jdXJyZW50QWdlID0gcGxheWVyRGF0YS5jdXJyZW50QWdlO1xuICAgICAgICBmaWx0ZXJlZERhdGEucHJpbWFyeU51bWJlciA9IE51bWJlcihwbGF5ZXJEYXRhLnByaW1hcnlOdW1iZXIpO1xuICAgICAgICBmaWx0ZXJlZERhdGEucGxheWVyUG9zaXRpb24gPSBwbGF5ZXJEYXRhLnByaW1hcnlQb3NpdGlvbi5uYW1lO1xuICAgICAgICBmaWx0ZXJlZERhdGEuaXNSb29raWUgPSBwbGF5ZXJEYXRhLnJvb2tpZTtcbiAgICAgICAgZmlsdGVyZWREYXRhLmFzc2lzdHMgPSBwbGF5ZXJTdGF0c0RhdGEuYXNzaXN0cztcbiAgICAgICAgZmlsdGVyZWREYXRhLmdvYWxzID0gcGxheWVyU3RhdHNEYXRhLmdvYWxzO1xuICAgICAgICBmaWx0ZXJlZERhdGEuZ2FtZXMgPSBwbGF5ZXJTdGF0c0RhdGEuZ2FtZXM7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5oaXRzID0gcGxheWVyU3RhdHNEYXRhLmhpdHM7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5wb2ludHMgPSBwbGF5ZXJTdGF0c0RhdGEucG9pbnRzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlT2ZEYXRhID09PSBcInRlYW1cIikge1xuICAgICAgICBjb25zdCB0ZWFtRGF0YSA9IGRhdGFbMF0udGVhbXNbMF0udGVhbVN0YXRzWzBdLnNwbGl0c1swXTtcbiAgICAgICAgY29uc3QgZmlyc3RHYW1lRGF0YSA9IGRhdGFbMV0uZGF0ZXNbMF07XG4gICAgICAgIGZpbHRlcmVkRGF0YS5pZCA9IHRlYW1EYXRhLnRlYW0uaWQ7XG4gICAgICAgIGZpbHRlcmVkRGF0YS50ZWFtTmFtZSA9IHRlYW1EYXRhLnRlYW0ubmFtZTtcbiAgICAgICAgZmlsdGVyZWREYXRhLnRlYW1WZW51ZU5hbWUgPSBkYXRhWzBdLnRlYW1zWzBdLnZlbnVlLm5hbWU7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5nYW1lc1BsYXllZCA9IHRlYW1EYXRhLnN0YXQuZ2FtZXNQbGF5ZWQ7XG4gICAgICAgIGZpbHRlcmVkRGF0YS53aW5zID0gdGVhbURhdGEuc3RhdC53aW5zO1xuICAgICAgICBmaWx0ZXJlZERhdGEubG9zc2VzID0gdGVhbURhdGEuc3RhdC5sb3NzZXM7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5wb2ludHMgPSB0ZWFtRGF0YS5zdGF0LnB0cztcbiAgICAgICAgZmlsdGVyZWREYXRhLmdvYWxzUGVyR2FtZSA9IHRlYW1EYXRhLnN0YXQuZ29hbHNQZXJHYW1lO1xuICAgICAgICBmaWx0ZXJlZERhdGEuZmlyc3RHYW1lT2ZTZWFzb25EYXRlID0gZmlyc3RHYW1lRGF0YS5kYXRlO1xuICAgICAgICBmaWx0ZXJlZERhdGEuZmlyc3RHYW1lT2ZTZWFzb25PcHBvbmV0ID1cbiAgICAgICAgICBmaXJzdEdhbWVEYXRhLmdhbWVzWzBdLnRlYW1zLmF3YXkudGVhbS5pZCAhPT0gaWRcbiAgICAgICAgICAgID8gZmlyc3RHYW1lRGF0YS5nYW1lc1swXS50ZWFtcy5hd2F5LnRlYW0ubmFtZVxuICAgICAgICAgICAgOiBmaXJzdEdhbWVEYXRhLmdhbWVzWzBdLnRlYW1zLmhvbWUudGVhbS5uYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJlZERhdGE7XG4gIH07XG5cbiAgY29uc3QgZG93bmxvYWQgPSAoZmlsZW5hbWUsIHRleHQpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgXCJocmVmXCIsXG4gICAgICBcImRhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LFwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpXG4gICAgKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIGZpbGVuYW1lKTtcblxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICBlbGVtZW50LmNsaWNrKCk7XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICB9O1xuXG4gIGNvbnN0IGRvd25sb2FkQ1NWID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRBbmRGaWx0ZXJOaGxEYXRhKFxuICAgICAgaWRJbnB1dC52YWx1ZSxcbiAgICAgIHNlYXNvblllYXJJbnB1dC52YWx1ZVxuICAgICk7XG4gICAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGFbMF0gIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGNzdkRhdGEgPSBjb252ZXJ0SnNvblRvQ3N2KGRhdGEpO1xuICAgICAgZG93bmxvYWQoXCJuaGxfZGF0YS5jc3ZcIiwgY3N2RGF0YSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoYW5nZUlkVGFnID0gKGUpID0+IHtcbiAgICB0eXBlVGFncy5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgaWRMYWJlbC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50ICsgXCIgSURcIjtcbiAgICBpZFR5cGUgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcbiAgfTtcblxuICBjb25zdCBfaW5pdCA9ICgoKSA9PiB7XG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkb3dubG9hZENTVik7XG4gICAgdHlwZVRhZ3MuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlSWRUYWcpO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==