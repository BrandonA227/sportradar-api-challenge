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
  const playerIdInput = document.getElementById("player-id");
  const seasonYearInput = document.getElementById("season-year");
  const submitBtn = document.querySelector(".download-csv-btn");

  const downloadCSV = async () => {
    console.log(
      await _nhl__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerSeasonData(playerIdInput.value, seasonYearInput.value)
    );
  };

  const _init = (() => {
    submitBtn.addEventListener("click", downloadCSV);
  })();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDOztBQUV0QjtBQUNmOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUcsd0NBQXdDLEtBQUs7QUFDakY7QUFDQSxXQUFXLGtEQUFVO0FBQ3JCO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQSxtQ0FBbUMsY0FBYztBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053Qjs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksZ0VBQXVCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlLy4vc3JjL25obC5qcyIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2UvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3BvcnRyYWRhci1hcGktY2hhbGxlbmdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9zcG9ydHJhZGFyLWFwaS1jaGFsbGVuZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Nwb3J0cmFkYXItYXBpLWNoYWxsZW5nZS8uL3NyYy9kaXNwbGF5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFJlcXVlc3QgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOSEwge1xuICBzdGF0aWMgI05ITF9BUElfVVJMID0gXCJodHRwczovL3N0YXRzYXBpLndlYi5uaGwuY29tL2FwaS92MS9cIjtcblxuICBzdGF0aWMgZ2V0UGxheWVyRGF0YShpZCkge1xuICAgIGNvbnN0IFBMQVlFUl9VUkwgPSBgcGVvcGxlLyR7aWR9YDtcbiAgICBjb25zdCBmdWxsVXJsID0gTkhMLiNOSExfQVBJX1VSTCArIFBMQVlFUl9VUkw7XG4gICAgcmV0dXJuIGdldFJlcXVlc3QoZnVsbFVybCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0UGxheWVyU2Vhc29uRGF0YShpZCwgeWVhcikge1xuICAgIGNvbnN0IFBMQVlFUl9VUkwgPSBgcGVvcGxlLyR7aWR9L3N0YXRzP3N0YXRzPXN0YXRzU2luZ2xlU2Vhc29uJnNlYXNvbj0ke3llYXJ9YDtcbiAgICBjb25zdCBmdWxsVXJsID0gTkhMLiNOSExfQVBJX1VSTCArIFBMQVlFUl9VUkw7XG4gICAgcmV0dXJuIGdldFJlcXVlc3QoZnVsbFVybCk7XG4gIH1cbn1cbiIsImFzeW5jIGZ1bmN0aW9uIGdldFJlcXVlc3QodXJsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7IG1vZGU6IFwiY29yc1wiIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPD0gMjk5KSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgcmVzO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldFJlcXVlc3QsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBOSEwgZnJvbSBcIi4vbmhsXCI7XG5cbigoKSA9PiB7XG4gIGNvbnN0IHBsYXllcklkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1pZFwiKTtcbiAgY29uc3Qgc2Vhc29uWWVhcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFzb24teWVhclwiKTtcbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3dubG9hZC1jc3YtYnRuXCIpO1xuXG4gIGNvbnN0IGRvd25sb2FkQ1NWID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYXdhaXQgTkhMLmdldFBsYXllclNlYXNvbkRhdGEocGxheWVySWRJbnB1dC52YWx1ZSwgc2Vhc29uWWVhcklucHV0LnZhbHVlKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgX2luaXQgPSAoKCkgPT4ge1xuICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZG93bmxvYWRDU1YpO1xuICB9KSgpO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==