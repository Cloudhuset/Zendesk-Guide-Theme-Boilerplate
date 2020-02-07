/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/*! exports provided: getArticles, getSections, getCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArticles", function() { return getArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSections", function() { return getSections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCategories", function() { return getCategories; });
var getArticles = function getArticles(articles, nextPage, cb) {
  var locale = $('html').attr('lang').toLowerCase();
  var url = nextPage !== null ? nextPage : "/api/v2/help_center/".concat(locale, "/articles.json?per_page=100");
  return $.ajax({
    url: url,
    context: document.body
  }).done(function (data) {
    if (!data) return;
    articles = articles.concat(data.articles);
    if (data.next_page !== null) return getArticles(articles, data.next_page, cb);
    cb(articles);
  });
};
var getSections = function getSections(sections, nextPage, cb) {
  var locale = $('html').attr('lang').toLowerCase();
  var url = nextPage !== null ? nextPage : "/api/v2/help_center/".concat(locale, "/sections.json?per_page=100");
  $.ajax({
    url: url,
    context: document.body
  }).done(function (data) {
    if (!data) return;
    sections = sections.concat(data.sections);
    if (data.next_page !== null) return getSections(sections, data.next_page, cb);
    cb(sections);
  });
};
var getCategories = function getCategories(categories, nextPage, cb) {
  var url = nextPage !== null ? nextPage : "/api/v2/help_center/".concat(locale, "/categories.json?per_page=100");
  $.ajax({
    url: url,
    context: document.body
  }).done(function (data) {
    if (!data) return;
    categories = categories.concat(data.categories);
    if (data.next_page !== null) return getCategories(categories, data.next_page, cb);
    cb(categories);
  });
};

/***/ }),

/***/ "./src/js/articleTree.js":
/*!*******************************!*\
  !*** ./src/js/articleTree.js ***!
  \*******************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
var render = function render(categories, sections, articles) {
  var categoryList = $("#category-list");
  var html = "";
  categories.forEach(function (category, i) {
    html += '<li class="category-item">';
    html += '<span class="category-item__title">' + category.name + '<i class="material-icons expand-icon">expand_more</i></span>';
    html += '<ul class="section-list">';
    sections.forEach(function (section, i) {
      if (section.category_id !== category.id) return;
      html += '<li class="section-item">';
      html += '<span class="section-item__title">' + section.name + '<i class="material-icons expand-icon">expand_more</i></span>';
      html += '<ul class="article-list">';
      articles.forEach(function (article, i) {
        if (article.section_id !== section.id) return;
        html += '<li class="article-item">';
        html += '<a class="article-item__title article-item__link" href="' + article.html_url + '">' + article.name + "</a>";
        html += "</li>";
      });
      html += "</ul>";
      html += "</li>";
    });
    html += "</ul>";
    html += "</li>";
  });
  categoryList.append(html);
  $(".category-item__title").click(function () {
    var clickedCategory = $(this).siblings(".section-list");
    var visibleCategory = clickedCategory.is(":visible"); // Skjul alle andre kategorier

    $(".category-item .section-list, .category-item .article-list").slideUp("fast");
    $(".category-item__title").removeClass("open");

    if (visibleCategory) {
      clickedCategory.slideUp("fast");
      $(this).removeClass("open");
    } else {
      clickedCategory.slideDown("fast");
      $(this).addClass("open");
    }
  });
  $(".section-item__title").click(function () {
    var clickedSection = $(this).siblings(".article-list");
    var visibleSection = clickedSection.is(":visible"); // Skjul alle andre sektioner

    $(".section-item .article-list").slideUp("fast");
    $(".section-item__title").removeClass("open");

    if (visibleSection) {
      clickedSection.slideUp("fast");
      $(this).removeClass("open");
    } else {
      clickedSection.slideDown("fast");
      $(this).addClass("open");
    }
  });
};

/***/ }),

/***/ "./src/js/copenhagen.js":
/*!******************************!*\
  !*** ./src/js/copenhagen.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

////////// COPENHAGEN THEME JAVASCRIPT //////////

/*
 * jQuery v1.9.1 included
 */
$(document).ready(function () {
  // social share popups
  $(".share a").click(function (e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  }); // show form controls when the textarea receives focus or backbutton is used and value exists

  var $commentContainerTextarea = $(".comment-container textarea"),
      $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");
  $commentContainerTextarea.one("focus", function () {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  } // Expand Request comment form when Add to conversation is clicked


  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
      $requestCommentFields = $(".request-container .comment-container .comment-fields"),
      $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");
  $showRequestCommentContainerTrigger.on("click", function () {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  }); // Mark as solved button

  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
      $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
      $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");
  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  }); // Change Mark as solved text according to whether comment is filled

  var $requestCommentTextarea = $(".request-container .comment-container textarea");
  $requestCommentTextarea.on("keyup", function () {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  }); // Disable submit button if textarea is empty

  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  } // Submit requests filter form in the request list page


  $("#request-status-select, #request-organization-select").on("change", function () {
    search();
  }); // Submit requests filter form in the request list page

  $("#quick-search").on("keypress", function (e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function (e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  } // Submit organization form in the request page


  $("#request-organization select").on("change", function () {
    this.form.submit();
  }); // Toggles expanded aria to collapsible elements

  $(".collapsible-nav, .collapsible-sidebar").on("click", function (e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });
}); ////////// COPENHAGEN THEME JAVASCRIPT END //////////

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _copenhagen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./copenhagen */ "./src/js/copenhagen.js");
/* harmony import */ var _copenhagen__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_copenhagen__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/js/api.js");
/* harmony import */ var _articleTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./articleTree */ "./src/js/articleTree.js");



$(document).on("ready", function () {
  var categories = [];
  var sections = [];
  var articles = [];
  Object(_api__WEBPACK_IMPORTED_MODULE_1__["getCategories"])([], null, function (categoriesArr) {
    categories = categoriesArr;
    Object(_api__WEBPACK_IMPORTED_MODULE_1__["getSections"])([], null, function (sectionsArr) {
      sections = sectionsArr;
      Object(_api__WEBPACK_IMPORTED_MODULE_1__["getArticles"])([], null, function (articlesArr) {
        articles = articlesArr;
        Object(_articleTree__WEBPACK_IMPORTED_MODULE_2__["render"])(categories, sections, articles);
      });
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZVRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcGVuaGFnZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGljbGVzIiwiYXJ0aWNsZXMiLCJuZXh0UGFnZSIsImNiIiwibG9jYWxlIiwiJCIsImF0dHIiLCJ0b0xvd2VyQ2FzZSIsInVybCIsImFqYXgiLCJjb250ZXh0IiwiZG9jdW1lbnQiLCJib2R5IiwiZG9uZSIsImRhdGEiLCJjb25jYXQiLCJuZXh0X3BhZ2UiLCJnZXRTZWN0aW9ucyIsInNlY3Rpb25zIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJyZW5kZXIiLCJjYXRlZ29yeUxpc3QiLCJodG1sIiwiZm9yRWFjaCIsImNhdGVnb3J5IiwiaSIsIm5hbWUiLCJzZWN0aW9uIiwiY2F0ZWdvcnlfaWQiLCJpZCIsImFydGljbGUiLCJzZWN0aW9uX2lkIiwiaHRtbF91cmwiLCJhcHBlbmQiLCJjbGljayIsImNsaWNrZWRDYXRlZ29yeSIsInNpYmxpbmdzIiwidmlzaWJsZUNhdGVnb3J5IiwiaXMiLCJzbGlkZVVwIiwicmVtb3ZlQ2xhc3MiLCJzbGlkZURvd24iLCJhZGRDbGFzcyIsImNsaWNrZWRTZWN0aW9uIiwidmlzaWJsZVNlY3Rpb24iLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsIm9wZW4iLCJocmVmIiwiJGNvbW1lbnRDb250YWluZXJUZXh0YXJlYSIsIiRjb21tZW50Q29udGFpbmVyRm9ybUNvbnRyb2xzIiwib25lIiwic2hvdyIsInZhbCIsIiRzaG93UmVxdWVzdENvbW1lbnRDb250YWluZXJUcmlnZ2VyIiwiJHJlcXVlc3RDb21tZW50RmllbGRzIiwiJHJlcXVlc3RDb21tZW50U3VibWl0Iiwib24iLCJoaWRlIiwiZm9jdXMiLCIkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbiIsIiRyZXF1ZXN0TWFya0FzU29sdmVkQ2hlY2tib3giLCIkcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24iLCJwcm9wIiwiY2xvc2VzdCIsInN1Ym1pdCIsIiRyZXF1ZXN0Q29tbWVudFRleHRhcmVhIiwidGV4dCIsInNlYXJjaCIsIndoaWNoIiwibG9jYXRpb24iLCJwYXJhbSIsInF1ZXJ5Iiwic3RhdHVzIiwib3JnYW5pemF0aW9uX2lkIiwic3RvcFByb3BhZ2F0aW9uIiwibWVudSIsImdldEVsZW1lbnRCeUlkIiwiaXNFeHBhbmRlZCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZm9ybSIsImNhdGVnb3JpZXNBcnIiLCJzZWN0aW9uc0FyciIsImFydGljbGVzQXJyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZB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O0FBQ0F4Riw4REFBVyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsVUFBQXlGLFdBQVcsRUFBSTtBQUNuQ3hGLGdCQUFRLEdBQUd3RixXQUFYO0FBQ0FwRSxtRUFBTSxDQUFDRCxVQUFELEVBQWFGLFFBQWIsRUFBdUJqQixRQUF2QixDQUFOO0FBQ0QsT0FIVSxDQUFYO0FBSUQsS0FOVSxDQUFYO0FBT0QsR0FUWSxDQUFiO0FBVUQsQ0FmRCxFIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgY29uc3QgZ2V0QXJ0aWNsZXMgPSAoYXJ0aWNsZXMsIG5leHRQYWdlLCBjYikgPT4ge1xuICB2YXIgbG9jYWxlID0gJCgnaHRtbCcpLmF0dHIoJ2xhbmcnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGNvbnN0IHVybCA9XG4gICAgbmV4dFBhZ2UgIT09IG51bGxcbiAgICAgID8gbmV4dFBhZ2VcbiAgICAgIDogYC9hcGkvdjIvaGVscF9jZW50ZXIvJHtsb2NhbGV9L2FydGljbGVzLmpzb24/cGVyX3BhZ2U9MTAwYDtcblxuICByZXR1cm4gJC5hamF4KHtcbiAgICB1cmw6IHVybCxcbiAgICBjb250ZXh0OiBkb2N1bWVudC5ib2R5XG4gIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICghZGF0YSkgcmV0dXJuO1xuICAgIGFydGljbGVzID0gYXJ0aWNsZXMuY29uY2F0KGRhdGEuYXJ0aWNsZXMpO1xuXG4gICAgaWYgKGRhdGEubmV4dF9wYWdlICE9PSBudWxsKVxuICAgICAgcmV0dXJuIGdldEFydGljbGVzKGFydGljbGVzLCBkYXRhLm5leHRfcGFnZSwgY2IpO1xuXG4gICAgY2IoYXJ0aWNsZXMpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTZWN0aW9ucyA9IChzZWN0aW9ucywgbmV4dFBhZ2UsIGNiKSA9PiB7XG4gIHZhciBsb2NhbGUgPSAkKCdodG1sJykuYXR0cignbGFuZycpLnRvTG93ZXJDYXNlKCk7XG5cbiAgY29uc3QgdXJsID1cbiAgICBuZXh0UGFnZSAhPT0gbnVsbFxuICAgICAgPyBuZXh0UGFnZVxuICAgICAgOiBgL2FwaS92Mi9oZWxwX2NlbnRlci8ke2xvY2FsZX0vc2VjdGlvbnMuanNvbj9wZXJfcGFnZT0xMDBgO1xuXG4gICQuYWpheCh7XG4gICAgdXJsOiB1cmwsXG4gICAgY29udGV4dDogZG9jdW1lbnQuYm9keVxuICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVybjtcbiAgICBzZWN0aW9ucyA9IHNlY3Rpb25zLmNvbmNhdChkYXRhLnNlY3Rpb25zKTtcblxuICAgIGlmIChkYXRhLm5leHRfcGFnZSAhPT0gbnVsbClcbiAgICAgIHJldHVybiBnZXRTZWN0aW9ucyhzZWN0aW9ucywgZGF0YS5uZXh0X3BhZ2UsIGNiKTtcblxuICAgIGNiKHNlY3Rpb25zKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllcyA9IChjYXRlZ29yaWVzLCBuZXh0UGFnZSwgY2IpID0+IHtcbiAgY29uc3QgdXJsID1cbiAgICBuZXh0UGFnZSAhPT0gbnVsbFxuICAgICAgPyBuZXh0UGFnZVxuICAgICAgOiBgL2FwaS92Mi9oZWxwX2NlbnRlci8ke2xvY2FsZX0vY2F0ZWdvcmllcy5qc29uP3Blcl9wYWdlPTEwMGA7XG5cbiAgJC5hamF4KHtcbiAgICB1cmw6IHVybCxcbiAgICBjb250ZXh0OiBkb2N1bWVudC5ib2R5XG4gIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICghZGF0YSkgcmV0dXJuO1xuICAgIGNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzLmNvbmNhdChkYXRhLmNhdGVnb3JpZXMpO1xuXG4gICAgaWYgKGRhdGEubmV4dF9wYWdlICE9PSBudWxsKVxuICAgICAgcmV0dXJuIGdldENhdGVnb3JpZXMoY2F0ZWdvcmllcywgZGF0YS5uZXh0X3BhZ2UsIGNiKTtcblxuICAgIGNiKGNhdGVnb3JpZXMpO1xuICB9KTtcbn07XG4iLCJleHBvcnQgY29uc3QgcmVuZGVyID0gKGNhdGVnb3JpZXMsIHNlY3Rpb25zLCBhcnRpY2xlcykgPT4ge1xuICBsZXQgY2F0ZWdvcnlMaXN0ID0gJChcIiNjYXRlZ29yeS1saXN0XCIpO1xuXG4gIGxldCBodG1sID0gXCJcIjtcblxuICBjYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5LCBpKSA9PiB7XG4gICAgaHRtbCArPSAnPGxpIGNsYXNzPVwiY2F0ZWdvcnktaXRlbVwiPic7XG4gICAgaHRtbCArPVxuICAgICAgJzxzcGFuIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdGl0bGVcIj4nICtcbiAgICAgIGNhdGVnb3J5Lm5hbWUgK1xuICAgICAgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZXhwYW5kLWljb25cIj5leHBhbmRfbW9yZTwvaT48L3NwYW4+JztcbiAgICBodG1sICs9ICc8dWwgY2xhc3M9XCJzZWN0aW9uLWxpc3RcIj4nO1xuXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbiwgaSkgPT4ge1xuICAgICAgaWYgKHNlY3Rpb24uY2F0ZWdvcnlfaWQgIT09IGNhdGVnb3J5LmlkKSByZXR1cm47XG5cbiAgICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cInNlY3Rpb24taXRlbVwiPic7XG4gICAgICBodG1sICs9XG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNlY3Rpb24taXRlbV9fdGl0bGVcIj4nICtcbiAgICAgICAgc2VjdGlvbi5uYW1lICtcbiAgICAgICAgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZXhwYW5kLWljb25cIj5leHBhbmRfbW9yZTwvaT48L3NwYW4+JztcbiAgICAgIGh0bWwgKz0gJzx1bCBjbGFzcz1cImFydGljbGUtbGlzdFwiPic7XG5cbiAgICAgIGFydGljbGVzLmZvckVhY2goKGFydGljbGUsIGkpID0+IHtcbiAgICAgICAgaWYgKGFydGljbGUuc2VjdGlvbl9pZCAhPT0gc2VjdGlvbi5pZCkgcmV0dXJuO1xuXG4gICAgICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cImFydGljbGUtaXRlbVwiPic7XG4gICAgICAgIGh0bWwgKz1cbiAgICAgICAgICAnPGEgY2xhc3M9XCJhcnRpY2xlLWl0ZW1fX3RpdGxlIGFydGljbGUtaXRlbV9fbGlua1wiIGhyZWY9XCInICtcbiAgICAgICAgICBhcnRpY2xlLmh0bWxfdXJsICtcbiAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgYXJ0aWNsZS5uYW1lICtcbiAgICAgICAgICBcIjwvYT5cIjtcbiAgICAgICAgaHRtbCArPSBcIjwvbGk+XCI7XG4gICAgICB9KTtcblxuICAgICAgaHRtbCArPSBcIjwvdWw+XCI7XG4gICAgICBodG1sICs9IFwiPC9saT5cIjtcbiAgICB9KTtcblxuICAgIGh0bWwgKz0gXCI8L3VsPlwiO1xuICAgIGh0bWwgKz0gXCI8L2xpPlwiO1xuICB9KTtcblxuICBjYXRlZ29yeUxpc3QuYXBwZW5kKGh0bWwpO1xuXG4gICQoXCIuY2F0ZWdvcnktaXRlbV9fdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNsaWNrZWRDYXRlZ29yeSA9ICQodGhpcykuc2libGluZ3MoXCIuc2VjdGlvbi1saXN0XCIpO1xuICAgIGxldCB2aXNpYmxlQ2F0ZWdvcnkgPSBjbGlja2VkQ2F0ZWdvcnkuaXMoXCI6dmlzaWJsZVwiKTtcblxuICAgIC8vIFNranVsIGFsbGUgYW5kcmUga2F0ZWdvcmllclxuICAgICQoXCIuY2F0ZWdvcnktaXRlbSAuc2VjdGlvbi1saXN0LCAuY2F0ZWdvcnktaXRlbSAuYXJ0aWNsZS1saXN0XCIpLnNsaWRlVXAoXG4gICAgICBcImZhc3RcIlxuICAgICk7XG4gICAgJChcIi5jYXRlZ29yeS1pdGVtX190aXRsZVwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG5cbiAgICBpZiAodmlzaWJsZUNhdGVnb3J5KSB7XG4gICAgICBjbGlja2VkQ2F0ZWdvcnkuc2xpZGVVcChcImZhc3RcIik7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xpY2tlZENhdGVnb3J5LnNsaWRlRG93bihcImZhc3RcIik7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICB9XG4gIH0pO1xuICAkKFwiLnNlY3Rpb24taXRlbV9fdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNsaWNrZWRTZWN0aW9uID0gJCh0aGlzKS5zaWJsaW5ncyhcIi5hcnRpY2xlLWxpc3RcIik7XG4gICAgbGV0IHZpc2libGVTZWN0aW9uID0gY2xpY2tlZFNlY3Rpb24uaXMoXCI6dmlzaWJsZVwiKTtcblxuICAgIC8vIFNranVsIGFsbGUgYW5kcmUgc2VrdGlvbmVyXG4gICAgJChcIi5zZWN0aW9uLWl0ZW0gLmFydGljbGUtbGlzdFwiKS5zbGlkZVVwKFwiZmFzdFwiKTtcbiAgICAkKFwiLnNlY3Rpb24taXRlbV9fdGl0bGVcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuXG4gICAgaWYgKHZpc2libGVTZWN0aW9uKSB7XG4gICAgICBjbGlja2VkU2VjdGlvbi5zbGlkZVVwKFwiZmFzdFwiKTtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGlja2VkU2VjdGlvbi5zbGlkZURvd24oXCJmYXN0XCIpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgfVxuICB9KTtcbn07XG4iLCIvLy8vLy8vLy8vIENPUEVOSEFHRU4gVEhFTUUgSkFWQVNDUklQVCAvLy8vLy8vLy8vXG5cbi8qXG4gKiBqUXVlcnkgdjEuOS4xIGluY2x1ZGVkXG4gKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIC8vIHNvY2lhbCBzaGFyZSBwb3B1cHNcbiAgJChcIi5zaGFyZSBhXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCBcIlwiLCBcImhlaWdodCA9IDUwMCwgd2lkdGggPSA1MDBcIik7XG4gIH0pO1xuXG4gIC8vIHNob3cgZm9ybSBjb250cm9scyB3aGVuIHRoZSB0ZXh0YXJlYSByZWNlaXZlcyBmb2N1cyBvciBiYWNrYnV0dG9uIGlzIHVzZWQgYW5kIHZhbHVlIGV4aXN0c1xuICB2YXIgJGNvbW1lbnRDb250YWluZXJUZXh0YXJlYSA9ICQoXCIuY29tbWVudC1jb250YWluZXIgdGV4dGFyZWFcIiksXG4gICAgJGNvbW1lbnRDb250YWluZXJGb3JtQ29udHJvbHMgPSAkKFwiLmNvbW1lbnQtZm9ybS1jb250cm9scywgLmNvbW1lbnQtY2NzXCIpO1xuXG4gICRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEub25lKFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgJGNvbW1lbnRDb250YWluZXJGb3JtQ29udHJvbHMuc2hvdygpO1xuICB9KTtcblxuICBpZiAoJGNvbW1lbnRDb250YWluZXJUZXh0YXJlYS52YWwoKSAhPT0gXCJcIikge1xuICAgICRjb21tZW50Q29udGFpbmVyRm9ybUNvbnRyb2xzLnNob3coKTtcbiAgfVxuXG4gIC8vIEV4cGFuZCBSZXF1ZXN0IGNvbW1lbnQgZm9ybSB3aGVuIEFkZCB0byBjb252ZXJzYXRpb24gaXMgY2xpY2tlZFxuICB2YXIgJHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIgPSAkKFxuICAgICAgXCIucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIC5jb21tZW50LXNob3ctY29udGFpbmVyXCJcbiAgICApLFxuICAgICRyZXF1ZXN0Q29tbWVudEZpZWxkcyA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLmNvbW1lbnQtZmllbGRzXCJcbiAgICApLFxuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdCA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLnJlcXVlc3Qtc3VibWl0LWNvbW1lbnRcIlxuICAgICk7XG5cbiAgJHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAkc2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlci5oaWRlKCk7XG4gICAgJHJlcXVlc3RDb21tZW50RmllbGRzLnNob3coKTtcbiAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXQuc2hvdygpO1xuICAgICRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEuZm9jdXMoKTtcbiAgfSk7XG5cbiAgLy8gTWFyayBhcyBzb2x2ZWQgYnV0dG9uXG4gIHZhciAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbiA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAubWFyay1hcy1zb2x2ZWQ6bm90KFtkYXRhLWRpc2FibGVkXSlcIlxuICAgICksXG4gICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRDaGVja2JveCA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1jaGVja2JveF1cIlxuICAgICksXG4gICAgJHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uID0gJChcbiAgICAgIFwiLnJlcXVlc3QtY29udGFpbmVyIC5jb21tZW50LWNvbnRhaW5lciBpbnB1dFt0eXBlPXN1Ym1pdF1cIlxuICAgICk7XG5cbiAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24ub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94LmF0dHIoXCJjaGVja2VkXCIsIHRydWUpO1xuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgJCh0aGlzKVxuICAgICAgLmF0dHIoXCJkYXRhLWRpc2FibGVkXCIsIHRydWUpXG4gICAgICAuY2xvc2VzdChcImZvcm1cIilcbiAgICAgIC5zdWJtaXQoKTtcbiAgfSk7XG5cbiAgLy8gQ2hhbmdlIE1hcmsgYXMgc29sdmVkIHRleHQgYWNjb3JkaW5nIHRvIHdoZXRoZXIgY29tbWVudCBpcyBmaWxsZWRcbiAgdmFyICRyZXF1ZXN0Q29tbWVudFRleHRhcmVhID0gJChcbiAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgdGV4dGFyZWFcIlxuICApO1xuXG4gICRyZXF1ZXN0Q29tbWVudFRleHRhcmVhLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCRyZXF1ZXN0Q29tbWVudFRleHRhcmVhLnZhbCgpICE9PSBcIlwiKSB7XG4gICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi50ZXh0KFxuICAgICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5kYXRhKFwic29sdmUtYW5kLXN1Ym1pdC10cmFuc2xhdGlvblwiKVxuICAgICAgKTtcbiAgICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi50ZXh0KFxuICAgICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5kYXRhKFwic29sdmUtdHJhbnNsYXRpb25cIilcbiAgICAgICk7XG4gICAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gRGlzYWJsZSBzdWJtaXQgYnV0dG9uIGlmIHRleHRhcmVhIGlzIGVtcHR5XG4gIGlmICgkcmVxdWVzdENvbW1lbnRUZXh0YXJlYS52YWwoKSA9PT0gXCJcIikge1xuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gIH1cblxuICAvLyBTdWJtaXQgcmVxdWVzdHMgZmlsdGVyIGZvcm0gaW4gdGhlIHJlcXVlc3QgbGlzdCBwYWdlXG4gICQoXCIjcmVxdWVzdC1zdGF0dXMtc2VsZWN0LCAjcmVxdWVzdC1vcmdhbml6YXRpb24tc2VsZWN0XCIpLm9uKFxuICAgIFwiY2hhbmdlXCIsXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICBzZWFyY2goKTtcbiAgICB9XG4gICk7XG5cbiAgLy8gU3VibWl0IHJlcXVlc3RzIGZpbHRlciBmb3JtIGluIHRoZSByZXF1ZXN0IGxpc3QgcGFnZVxuICAkKFwiI3F1aWNrLXNlYXJjaFwiKS5vbihcImtleXByZXNzXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgIHNlYXJjaCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2VhcmNoKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggPSAkLnBhcmFtKHtcbiAgICAgIHF1ZXJ5OiAkKFwiI3F1aWNrLXNlYXJjaFwiKS52YWwoKSxcbiAgICAgIHN0YXR1czogJChcIiNyZXF1ZXN0LXN0YXR1cy1zZWxlY3RcIikudmFsKCksXG4gICAgICBvcmdhbml6YXRpb25faWQ6ICQoXCIjcmVxdWVzdC1vcmdhbml6YXRpb24tc2VsZWN0XCIpLnZhbCgpXG4gICAgfSk7XG4gIH1cblxuICAkKFwiLmhlYWRlciAuaWNvbi1tZW51XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXItbmF2XCIpO1xuICAgIHZhciBpc0V4cGFuZGVkID0gbWVudS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpID09PSBcInRydWVcIjtcbiAgICBtZW51LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgIWlzRXhwYW5kZWQpO1xuICB9KTtcblxuICBpZiAoJChcIiN1c2VyLW5hdlwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xuICAgICQoXCIuaGVhZGVyIC5pY29uLW1lbnVcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gU3VibWl0IG9yZ2FuaXphdGlvbiBmb3JtIGluIHRoZSByZXF1ZXN0IHBhZ2VcbiAgJChcIiNyZXF1ZXN0LW9yZ2FuaXphdGlvbiBzZWxlY3RcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICB9KTtcblxuICAvLyBUb2dnbGVzIGV4cGFuZGVkIGFyaWEgdG8gY29sbGFwc2libGUgZWxlbWVudHNcbiAgJChcIi5jb2xsYXBzaWJsZS1uYXYsIC5jb2xsYXBzaWJsZS1zaWRlYmFyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIGlzRXhwYW5kZWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT09IFwidHJ1ZVwiO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCAhaXNFeHBhbmRlZCk7XG4gIH0pO1xufSk7XG5cbi8vLy8vLy8vLy8gQ09QRU5IQUdFTiBUSEVNRSBKQVZBU0NSSVBUIEVORCAvLy8vLy8vLy8vXG4iLCJpbXBvcnQgY29wZW5oYWdlbiBmcm9tIFwiLi9jb3BlbmhhZ2VuXCI7XG5pbXBvcnQgeyBnZXRDYXRlZ29yaWVzLCBnZXRTZWN0aW9ucywgZ2V0QXJ0aWNsZXMgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL2FydGljbGVUcmVlXCI7XG5cbiQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgZnVuY3Rpb24oKSB7XG4gIGxldCBjYXRlZ29yaWVzID0gW107XG4gIGxldCBzZWN0aW9ucyA9IFtdO1xuICBsZXQgYXJ0aWNsZXMgPSBbXTtcblxuICBnZXRDYXRlZ29yaWVzKFtdLCBudWxsLCBjYXRlZ29yaWVzQXJyID0+IHtcbiAgICBjYXRlZ29yaWVzID0gY2F0ZWdvcmllc0FycjtcbiAgICBnZXRTZWN0aW9ucyhbXSwgbnVsbCwgc2VjdGlvbnNBcnIgPT4ge1xuICAgICAgc2VjdGlvbnMgPSBzZWN0aW9uc0FycjtcbiAgICAgIGdldEFydGljbGVzKFtdLCBudWxsLCBhcnRpY2xlc0FyciA9PiB7XG4gICAgICAgIGFydGljbGVzID0gYXJ0aWNsZXNBcnI7XG4gICAgICAgIHJlbmRlcihjYXRlZ29yaWVzLCBzZWN0aW9ucywgYXJ0aWNsZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9