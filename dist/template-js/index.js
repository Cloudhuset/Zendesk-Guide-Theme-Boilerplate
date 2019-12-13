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
  var url = nextPage !== null ? nextPage : "/api/v2/help_center/".concat(window.I18n.locale, "/articles.json?per_page=100");
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
  var url = nextPage !== null ? nextPage : "/api/v2/help_center/".concat(window.I18n.locale, "/sections.json?per_page=100");
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
  var url = nextPage !== null ? nextPage : "/api/v2/help_center/".concat(window.I18n.locale, "/categories.json?per_page=100");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZVRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcGVuaGFnZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGljbGVzIiwiYXJ0aWNsZXMiLCJuZXh0UGFnZSIsImNiIiwidXJsIiwid2luZG93IiwiSTE4biIsImxvY2FsZSIsIiQiLCJhamF4IiwiY29udGV4dCIsImRvY3VtZW50IiwiYm9keSIsImRvbmUiLCJkYXRhIiwiY29uY2F0IiwibmV4dF9wYWdlIiwiZ2V0U2VjdGlvbnMiLCJzZWN0aW9ucyIsImdldENhdGVnb3JpZXMiLCJjYXRlZ29yaWVzIiwicmVuZGVyIiwiY2F0ZWdvcnlMaXN0IiwiaHRtbCIsImZvckVhY2giLCJjYXRlZ29yeSIsImkiLCJuYW1lIiwic2VjdGlvbiIsImNhdGVnb3J5X2lkIiwiaWQiLCJhcnRpY2xlIiwic2VjdGlvbl9pZCIsImh0bWxfdXJsIiwiYXBwZW5kIiwiY2xpY2siLCJjbGlja2VkQ2F0ZWdvcnkiLCJzaWJsaW5ncyIsInZpc2libGVDYXRlZ29yeSIsImlzIiwic2xpZGVVcCIsInJlbW92ZUNsYXNzIiwic2xpZGVEb3duIiwiYWRkQ2xhc3MiLCJjbGlja2VkU2VjdGlvbiIsInZpc2libGVTZWN0aW9uIiwicmVhZHkiLCJlIiwicHJldmVudERlZmF1bHQiLCJvcGVuIiwiaHJlZiIsIiRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEiLCIkY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scyIsIm9uZSIsInNob3ciLCJ2YWwiLCIkc2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlciIsIiRyZXF1ZXN0Q29tbWVudEZpZWxkcyIsIiRyZXF1ZXN0Q29tbWVudFN1Ym1pdCIsIm9uIiwiaGlkZSIsImZvY3VzIiwiJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24iLCIkcmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94IiwiJHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uIiwiYXR0ciIsInByb3AiLCJjbG9zZXN0Iiwic3VibWl0IiwiJHJlcXVlc3RDb21tZW50VGV4dGFyZWEiLCJ0ZXh0Iiwic2VhcmNoIiwid2hpY2giLCJsb2NhdGlvbiIsInBhcmFtIiwicXVlcnkiLCJzdGF0dXMiLCJvcmdhbml6YXRpb25faWQiLCJzdG9wUHJvcGFnYXRpb24iLCJtZW51IiwiZ2V0RWxlbWVudEJ5SWQiLCJpc0V4cGFuZGVkIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJmb3JtIiwiY2F0ZWdvcmllc0FyciIsInNlY3Rpb25zQXJyIiwiYXJ0aWNsZXNBcnIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtB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RUFBYUYsUUFBYixFQUF1QmpCLFFBQXZCLENBQU47QUFDRCxPQUhVLENBQVg7QUFJRCxLQU5VLENBQVg7QUFPRCxHQVRZLENBQWI7QUFVRCxDQWZELEUiLCJmaWxlIjoiLi90ZW1wbGF0ZS1qcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IGdldEFydGljbGVzID0gKGFydGljbGVzLCBuZXh0UGFnZSwgY2IpID0+IHtcbiAgY29uc3QgdXJsID1cbiAgICBuZXh0UGFnZSAhPT0gbnVsbFxuICAgICAgPyBuZXh0UGFnZVxuICAgICAgOiBgL2FwaS92Mi9oZWxwX2NlbnRlci8ke3dpbmRvdy5JMThuLmxvY2FsZX0vYXJ0aWNsZXMuanNvbj9wZXJfcGFnZT0xMDBgO1xuXG4gIHJldHVybiAkLmFqYXgoe1xuICAgIHVybDogdXJsLFxuICAgIGNvbnRleHQ6IGRvY3VtZW50LmJvZHlcbiAgfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgYXJ0aWNsZXMgPSBhcnRpY2xlcy5jb25jYXQoZGF0YS5hcnRpY2xlcyk7XG5cbiAgICBpZiAoZGF0YS5uZXh0X3BhZ2UgIT09IG51bGwpXG4gICAgICByZXR1cm4gZ2V0QXJ0aWNsZXMoYXJ0aWNsZXMsIGRhdGEubmV4dF9wYWdlLCBjYik7XG5cbiAgICBjYihhcnRpY2xlcyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFNlY3Rpb25zID0gKHNlY3Rpb25zLCBuZXh0UGFnZSwgY2IpID0+IHtcbiAgY29uc3QgdXJsID1cbiAgICBuZXh0UGFnZSAhPT0gbnVsbFxuICAgICAgPyBuZXh0UGFnZVxuICAgICAgOiBgL2FwaS92Mi9oZWxwX2NlbnRlci8ke3dpbmRvdy5JMThuLmxvY2FsZX0vc2VjdGlvbnMuanNvbj9wZXJfcGFnZT0xMDBgO1xuXG4gICQuYWpheCh7XG4gICAgdXJsOiB1cmwsXG4gICAgY29udGV4dDogZG9jdW1lbnQuYm9keVxuICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVybjtcbiAgICBzZWN0aW9ucyA9IHNlY3Rpb25zLmNvbmNhdChkYXRhLnNlY3Rpb25zKTtcblxuICAgIGlmIChkYXRhLm5leHRfcGFnZSAhPT0gbnVsbClcbiAgICAgIHJldHVybiBnZXRTZWN0aW9ucyhzZWN0aW9ucywgZGF0YS5uZXh0X3BhZ2UsIGNiKTtcblxuICAgIGNiKHNlY3Rpb25zKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllcyA9IChjYXRlZ29yaWVzLCBuZXh0UGFnZSwgY2IpID0+IHtcbiAgY29uc3QgdXJsID1cbiAgICBuZXh0UGFnZSAhPT0gbnVsbFxuICAgICAgPyBuZXh0UGFnZVxuICAgICAgOiBgL2FwaS92Mi9oZWxwX2NlbnRlci8ke3dpbmRvdy5JMThuLmxvY2FsZX0vY2F0ZWdvcmllcy5qc29uP3Blcl9wYWdlPTEwMGA7XG5cbiAgJC5hamF4KHtcbiAgICB1cmw6IHVybCxcbiAgICBjb250ZXh0OiBkb2N1bWVudC5ib2R5XG4gIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICghZGF0YSkgcmV0dXJuO1xuICAgIGNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzLmNvbmNhdChkYXRhLmNhdGVnb3JpZXMpO1xuXG4gICAgaWYgKGRhdGEubmV4dF9wYWdlICE9PSBudWxsKVxuICAgICAgcmV0dXJuIGdldENhdGVnb3JpZXMoY2F0ZWdvcmllcywgZGF0YS5uZXh0X3BhZ2UsIGNiKTtcblxuICAgIGNiKGNhdGVnb3JpZXMpO1xuICB9KTtcbn07XG4iLCJleHBvcnQgY29uc3QgcmVuZGVyID0gKGNhdGVnb3JpZXMsIHNlY3Rpb25zLCBhcnRpY2xlcykgPT4ge1xuICBsZXQgY2F0ZWdvcnlMaXN0ID0gJChcIiNjYXRlZ29yeS1saXN0XCIpO1xuXG4gIGxldCBodG1sID0gXCJcIjtcblxuICBjYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5LCBpKSA9PiB7XG4gICAgaHRtbCArPSAnPGxpIGNsYXNzPVwiY2F0ZWdvcnktaXRlbVwiPic7XG4gICAgaHRtbCArPVxuICAgICAgJzxzcGFuIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdGl0bGVcIj4nICtcbiAgICAgIGNhdGVnb3J5Lm5hbWUgK1xuICAgICAgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZXhwYW5kLWljb25cIj5leHBhbmRfbW9yZTwvaT48L3NwYW4+JztcbiAgICBodG1sICs9ICc8dWwgY2xhc3M9XCJzZWN0aW9uLWxpc3RcIj4nO1xuXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbiwgaSkgPT4ge1xuICAgICAgaWYgKHNlY3Rpb24uY2F0ZWdvcnlfaWQgIT09IGNhdGVnb3J5LmlkKSByZXR1cm47XG5cbiAgICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cInNlY3Rpb24taXRlbVwiPic7XG4gICAgICBodG1sICs9XG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNlY3Rpb24taXRlbV9fdGl0bGVcIj4nICtcbiAgICAgICAgc2VjdGlvbi5uYW1lICtcbiAgICAgICAgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZXhwYW5kLWljb25cIj5leHBhbmRfbW9yZTwvaT48L3NwYW4+JztcbiAgICAgIGh0bWwgKz0gJzx1bCBjbGFzcz1cImFydGljbGUtbGlzdFwiPic7XG5cbiAgICAgIGFydGljbGVzLmZvckVhY2goKGFydGljbGUsIGkpID0+IHtcbiAgICAgICAgaWYgKGFydGljbGUuc2VjdGlvbl9pZCAhPT0gc2VjdGlvbi5pZCkgcmV0dXJuO1xuXG4gICAgICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cImFydGljbGUtaXRlbVwiPic7XG4gICAgICAgIGh0bWwgKz1cbiAgICAgICAgICAnPGEgY2xhc3M9XCJhcnRpY2xlLWl0ZW1fX3RpdGxlIGFydGljbGUtaXRlbV9fbGlua1wiIGhyZWY9XCInICtcbiAgICAgICAgICBhcnRpY2xlLmh0bWxfdXJsICtcbiAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgYXJ0aWNsZS5uYW1lICtcbiAgICAgICAgICBcIjwvYT5cIjtcbiAgICAgICAgaHRtbCArPSBcIjwvbGk+XCI7XG4gICAgICB9KTtcblxuICAgICAgaHRtbCArPSBcIjwvdWw+XCI7XG4gICAgICBodG1sICs9IFwiPC9saT5cIjtcbiAgICB9KTtcblxuICAgIGh0bWwgKz0gXCI8L3VsPlwiO1xuICAgIGh0bWwgKz0gXCI8L2xpPlwiO1xuICB9KTtcblxuICBjYXRlZ29yeUxpc3QuYXBwZW5kKGh0bWwpO1xuXG4gICQoXCIuY2F0ZWdvcnktaXRlbV9fdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNsaWNrZWRDYXRlZ29yeSA9ICQodGhpcykuc2libGluZ3MoXCIuc2VjdGlvbi1saXN0XCIpO1xuICAgIGxldCB2aXNpYmxlQ2F0ZWdvcnkgPSBjbGlja2VkQ2F0ZWdvcnkuaXMoXCI6dmlzaWJsZVwiKTtcblxuICAgIC8vIFNranVsIGFsbGUgYW5kcmUga2F0ZWdvcmllclxuICAgICQoXCIuY2F0ZWdvcnktaXRlbSAuc2VjdGlvbi1saXN0LCAuY2F0ZWdvcnktaXRlbSAuYXJ0aWNsZS1saXN0XCIpLnNsaWRlVXAoXG4gICAgICBcImZhc3RcIlxuICAgICk7XG4gICAgJChcIi5jYXRlZ29yeS1pdGVtX190aXRsZVwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG5cbiAgICBpZiAodmlzaWJsZUNhdGVnb3J5KSB7XG4gICAgICBjbGlja2VkQ2F0ZWdvcnkuc2xpZGVVcChcImZhc3RcIik7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xpY2tlZENhdGVnb3J5LnNsaWRlRG93bihcImZhc3RcIik7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICB9XG4gIH0pO1xuICAkKFwiLnNlY3Rpb24taXRlbV9fdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNsaWNrZWRTZWN0aW9uID0gJCh0aGlzKS5zaWJsaW5ncyhcIi5hcnRpY2xlLWxpc3RcIik7XG4gICAgbGV0IHZpc2libGVTZWN0aW9uID0gY2xpY2tlZFNlY3Rpb24uaXMoXCI6dmlzaWJsZVwiKTtcblxuICAgIC8vIFNranVsIGFsbGUgYW5kcmUgc2VrdGlvbmVyXG4gICAgJChcIi5zZWN0aW9uLWl0ZW0gLmFydGljbGUtbGlzdFwiKS5zbGlkZVVwKFwiZmFzdFwiKTtcbiAgICAkKFwiLnNlY3Rpb24taXRlbV9fdGl0bGVcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuXG4gICAgaWYgKHZpc2libGVTZWN0aW9uKSB7XG4gICAgICBjbGlja2VkU2VjdGlvbi5zbGlkZVVwKFwiZmFzdFwiKTtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGlja2VkU2VjdGlvbi5zbGlkZURvd24oXCJmYXN0XCIpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgfVxuICB9KTtcbn07XG4iLCIvLy8vLy8vLy8vIENPUEVOSEFHRU4gVEhFTUUgSkFWQVNDUklQVCAvLy8vLy8vLy8vXG5cbi8qXG4gKiBqUXVlcnkgdjEuOS4xIGluY2x1ZGVkXG4gKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIC8vIHNvY2lhbCBzaGFyZSBwb3B1cHNcbiAgJChcIi5zaGFyZSBhXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCBcIlwiLCBcImhlaWdodCA9IDUwMCwgd2lkdGggPSA1MDBcIik7XG4gIH0pO1xuXG4gIC8vIHNob3cgZm9ybSBjb250cm9scyB3aGVuIHRoZSB0ZXh0YXJlYSByZWNlaXZlcyBmb2N1cyBvciBiYWNrYnV0dG9uIGlzIHVzZWQgYW5kIHZhbHVlIGV4aXN0c1xuICB2YXIgJGNvbW1lbnRDb250YWluZXJUZXh0YXJlYSA9ICQoXCIuY29tbWVudC1jb250YWluZXIgdGV4dGFyZWFcIiksXG4gICAgJGNvbW1lbnRDb250YWluZXJGb3JtQ29udHJvbHMgPSAkKFwiLmNvbW1lbnQtZm9ybS1jb250cm9scywgLmNvbW1lbnQtY2NzXCIpO1xuXG4gICRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEub25lKFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgJGNvbW1lbnRDb250YWluZXJGb3JtQ29udHJvbHMuc2hvdygpO1xuICB9KTtcblxuICBpZiAoJGNvbW1lbnRDb250YWluZXJUZXh0YXJlYS52YWwoKSAhPT0gXCJcIikge1xuICAgICRjb21tZW50Q29udGFpbmVyRm9ybUNvbnRyb2xzLnNob3coKTtcbiAgfVxuXG4gIC8vIEV4cGFuZCBSZXF1ZXN0IGNvbW1lbnQgZm9ybSB3aGVuIEFkZCB0byBjb252ZXJzYXRpb24gaXMgY2xpY2tlZFxuICB2YXIgJHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIgPSAkKFxuICAgICAgXCIucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIC5jb21tZW50LXNob3ctY29udGFpbmVyXCJcbiAgICApLFxuICAgICRyZXF1ZXN0Q29tbWVudEZpZWxkcyA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLmNvbW1lbnQtZmllbGRzXCJcbiAgICApLFxuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdCA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLnJlcXVlc3Qtc3VibWl0LWNvbW1lbnRcIlxuICAgICk7XG5cbiAgJHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAkc2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlci5oaWRlKCk7XG4gICAgJHJlcXVlc3RDb21tZW50RmllbGRzLnNob3coKTtcbiAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXQuc2hvdygpO1xuICAgICRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEuZm9jdXMoKTtcbiAgfSk7XG5cbiAgLy8gTWFyayBhcyBzb2x2ZWQgYnV0dG9uXG4gIHZhciAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbiA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAubWFyay1hcy1zb2x2ZWQ6bm90KFtkYXRhLWRpc2FibGVkXSlcIlxuICAgICksXG4gICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRDaGVja2JveCA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1jaGVja2JveF1cIlxuICAgICksXG4gICAgJHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uID0gJChcbiAgICAgIFwiLnJlcXVlc3QtY29udGFpbmVyIC5jb21tZW50LWNvbnRhaW5lciBpbnB1dFt0eXBlPXN1Ym1pdF1cIlxuICAgICk7XG5cbiAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24ub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94LmF0dHIoXCJjaGVja2VkXCIsIHRydWUpO1xuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgJCh0aGlzKVxuICAgICAgLmF0dHIoXCJkYXRhLWRpc2FibGVkXCIsIHRydWUpXG4gICAgICAuY2xvc2VzdChcImZvcm1cIilcbiAgICAgIC5zdWJtaXQoKTtcbiAgfSk7XG5cbiAgLy8gQ2hhbmdlIE1hcmsgYXMgc29sdmVkIHRleHQgYWNjb3JkaW5nIHRvIHdoZXRoZXIgY29tbWVudCBpcyBmaWxsZWRcbiAgdmFyICRyZXF1ZXN0Q29tbWVudFRleHRhcmVhID0gJChcbiAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgdGV4dGFyZWFcIlxuICApO1xuXG4gICRyZXF1ZXN0Q29tbWVudFRleHRhcmVhLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCRyZXF1ZXN0Q29tbWVudFRleHRhcmVhLnZhbCgpICE9PSBcIlwiKSB7XG4gICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi50ZXh0KFxuICAgICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5kYXRhKFwic29sdmUtYW5kLXN1Ym1pdC10cmFuc2xhdGlvblwiKVxuICAgICAgKTtcbiAgICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi50ZXh0KFxuICAgICAgICAkcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5kYXRhKFwic29sdmUtdHJhbnNsYXRpb25cIilcbiAgICAgICk7XG4gICAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gRGlzYWJsZSBzdWJtaXQgYnV0dG9uIGlmIHRleHRhcmVhIGlzIGVtcHR5XG4gIGlmICgkcmVxdWVzdENvbW1lbnRUZXh0YXJlYS52YWwoKSA9PT0gXCJcIikge1xuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gIH1cblxuICAvLyBTdWJtaXQgcmVxdWVzdHMgZmlsdGVyIGZvcm0gaW4gdGhlIHJlcXVlc3QgbGlzdCBwYWdlXG4gICQoXCIjcmVxdWVzdC1zdGF0dXMtc2VsZWN0LCAjcmVxdWVzdC1vcmdhbml6YXRpb24tc2VsZWN0XCIpLm9uKFxuICAgIFwiY2hhbmdlXCIsXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICBzZWFyY2goKTtcbiAgICB9XG4gICk7XG5cbiAgLy8gU3VibWl0IHJlcXVlc3RzIGZpbHRlciBmb3JtIGluIHRoZSByZXF1ZXN0IGxpc3QgcGFnZVxuICAkKFwiI3F1aWNrLXNlYXJjaFwiKS5vbihcImtleXByZXNzXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgIHNlYXJjaCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2VhcmNoKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggPSAkLnBhcmFtKHtcbiAgICAgIHF1ZXJ5OiAkKFwiI3F1aWNrLXNlYXJjaFwiKS52YWwoKSxcbiAgICAgIHN0YXR1czogJChcIiNyZXF1ZXN0LXN0YXR1cy1zZWxlY3RcIikudmFsKCksXG4gICAgICBvcmdhbml6YXRpb25faWQ6ICQoXCIjcmVxdWVzdC1vcmdhbml6YXRpb24tc2VsZWN0XCIpLnZhbCgpXG4gICAgfSk7XG4gIH1cblxuICAkKFwiLmhlYWRlciAuaWNvbi1tZW51XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXItbmF2XCIpO1xuICAgIHZhciBpc0V4cGFuZGVkID0gbWVudS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpID09PSBcInRydWVcIjtcbiAgICBtZW51LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgIWlzRXhwYW5kZWQpO1xuICB9KTtcblxuICBpZiAoJChcIiN1c2VyLW5hdlwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xuICAgICQoXCIuaGVhZGVyIC5pY29uLW1lbnVcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gU3VibWl0IG9yZ2FuaXphdGlvbiBmb3JtIGluIHRoZSByZXF1ZXN0IHBhZ2VcbiAgJChcIiNyZXF1ZXN0LW9yZ2FuaXphdGlvbiBzZWxlY3RcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICB9KTtcblxuICAvLyBUb2dnbGVzIGV4cGFuZGVkIGFyaWEgdG8gY29sbGFwc2libGUgZWxlbWVudHNcbiAgJChcIi5jb2xsYXBzaWJsZS1uYXYsIC5jb2xsYXBzaWJsZS1zaWRlYmFyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIGlzRXhwYW5kZWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT09IFwidHJ1ZVwiO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCAhaXNFeHBhbmRlZCk7XG4gIH0pO1xufSk7XG5cbi8vLy8vLy8vLy8gQ09QRU5IQUdFTiBUSEVNRSBKQVZBU0NSSVBUIEVORCAvLy8vLy8vLy8vXG4iLCJpbXBvcnQgY29wZW5oYWdlbiBmcm9tIFwiLi9jb3BlbmhhZ2VuXCI7XG5pbXBvcnQgeyBnZXRDYXRlZ29yaWVzLCBnZXRTZWN0aW9ucywgZ2V0QXJ0aWNsZXMgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL2FydGljbGVUcmVlXCI7XG5cbiQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgZnVuY3Rpb24oKSB7XG4gIGxldCBjYXRlZ29yaWVzID0gW107XG4gIGxldCBzZWN0aW9ucyA9IFtdO1xuICBsZXQgYXJ0aWNsZXMgPSBbXTtcblxuICBnZXRDYXRlZ29yaWVzKFtdLCBudWxsLCBjYXRlZ29yaWVzQXJyID0+IHtcbiAgICBjYXRlZ29yaWVzID0gY2F0ZWdvcmllc0FycjtcbiAgICBnZXRTZWN0aW9ucyhbXSwgbnVsbCwgc2VjdGlvbnNBcnIgPT4ge1xuICAgICAgc2VjdGlvbnMgPSBzZWN0aW9uc0FycjtcbiAgICAgIGdldEFydGljbGVzKFtdLCBudWxsLCBhcnRpY2xlc0FyciA9PiB7XG4gICAgICAgIGFydGljbGVzID0gYXJ0aWNsZXNBcnI7XG4gICAgICAgIHJlbmRlcihjYXRlZ29yaWVzLCBzZWN0aW9ucywgYXJ0aWNsZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9