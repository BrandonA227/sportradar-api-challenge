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
    return error;
  }
}

module.exports = {
  getRequest,
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


(() => {
  const typeTags = document.querySelectorAll(".type-selector > li");
  const idLabel = document.querySelector(".id-container > label");
  const idInput = document.getElementById("id-input");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");

  let idType = "Player";

  const downloadCSV = async () => {
    console.log(
      await _nhl__WEBPACK_IMPORTED_MODULE_0__["default"].getTeamGamesPlayed(idInput.value, seasonYearInput.value)
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDOztBQUV0QjtBQUNmOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUcsd0NBQXdDLEtBQUs7QUFDakY7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsOEJBQThCLEdBQUcsNEJBQTRCLEtBQUs7QUFDbEU7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0Esd0NBQXdDLEtBQUssVUFBVSxHQUFHO0FBQzFEO0FBQ0EsV0FBVyxrREFBVTtBQUNyQjtBQUNBOzs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSwrREFBc0I7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2UvLi9zcmMvbmhsLmpzIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlLy4vc3JjL2Rpc3BsYXkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UmVxdWVzdCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ITCB7XG4gIHN0YXRpYyAjTkhMX0FQSV9VUkwgPSBcImh0dHBzOi8vc3RhdHNhcGkud2ViLm5obC5jb20vYXBpL3YxL1wiO1xuXG4gIHN0YXRpYyBnZXRQbGF5ZXJEYXRhKGlkKSB7XG4gICAgY29uc3QgUExBWUVSX1VSTCA9IGBwZW9wbGUvJHtpZH1gO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBOSEwuI05ITF9BUElfVVJMICsgUExBWUVSX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQbGF5ZXJTZWFzb25EYXRhKGlkLCB5ZWFyKSB7XG4gICAgY29uc3QgUExBWUVSX1VSTCA9IGBwZW9wbGUvJHtpZH0vc3RhdHM/c3RhdHM9c3RhdHNTaW5nbGVTZWFzb24mc2Vhc29uPSR7eWVhcn1gO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBOSEwuI05ITF9BUElfVVJMICsgUExBWUVSX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUZWFtU2Vhc29uU3RhdHMoaWQsIHllYXIpIHtcbiAgICBjb25zdCBURUFNX1VSTCA9IGB0ZWFtcy8ke2lkfT9leHBhbmQ9dGVhbS5zdGF0cyZzZWFzb249JHt5ZWFyfWA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBURUFNX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUZWFtR2FtZXNQbGF5ZWQoaWQsIHllYXIpIHtcbiAgICBjb25zdCBURUFNX1VSTCA9IGBzY2hlZHVsZT9zZWFzb249JHt5ZWFyfSZ0ZWFtSWQ9JHtpZH0mZ2FtZVR5cGU9UmA7XG4gICAgY29uc3QgZnVsbFVybCA9IE5ITC4jTkhMX0FQSV9VUkwgKyBURUFNX1VSTDtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdChmdWxsVXJsKTtcbiAgfVxufVxuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0UmVxdWVzdCh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogXCJjb3JzXCIgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8PSAyOTkpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyByZXM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0UmVxdWVzdCxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IE5ITCBmcm9tIFwiLi9uaGxcIjtcblxuKCgpID0+IHtcbiAgY29uc3QgdHlwZVRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnR5cGUtc2VsZWN0b3IgPiBsaVwiKTtcbiAgY29uc3QgaWRMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWQtY29udGFpbmVyID4gbGFiZWxcIik7XG4gIGNvbnN0IGlkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkLWlucHV0XCIpO1xuICBjb25zdCBzZWFzb25ZZWFySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXNvbi15ZWFyXCIpO1xuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvd25sb2FkLWNzdi1idG5cIik7XG5cbiAgbGV0IGlkVHlwZSA9IFwiUGxheWVyXCI7XG5cbiAgY29uc3QgZG93bmxvYWRDU1YgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBhd2FpdCBOSEwuZ2V0VGVhbUdhbWVzUGxheWVkKGlkSW5wdXQudmFsdWUsIHNlYXNvblllYXJJbnB1dC52YWx1ZSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZUlkVGFnID0gKGUpID0+IHtcbiAgICB0eXBlVGFncy5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgaWRMYWJlbC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50ICsgXCIgSURcIjtcbiAgICBpZFR5cGUgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcbiAgfTtcblxuICBjb25zdCBfaW5pdCA9ICgoKSA9PiB7XG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkb3dubG9hZENTVik7XG4gICAgdHlwZVRhZ3MuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlSWRUYWcpO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==