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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZVRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcGVuaGFnZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGljbGVzIiwiYXJ0aWNsZXMiLCJuZXh0UGFnZSIsImNiIiwidXJsIiwid2luZG93IiwiSTE4biIsImxvY2FsZSIsIiQiLCJhamF4IiwiY29udGV4dCIsImRvY3VtZW50IiwiYm9keSIsImRvbmUiLCJkYXRhIiwiY29uY2F0IiwibmV4dF9wYWdlIiwiZ2V0U2VjdGlvbnMiLCJzZWN0aW9ucyIsImdldENhdGVnb3JpZXMiLCJjYXRlZ29yaWVzIiwicmVuZGVyIiwiY2F0ZWdvcnlMaXN0IiwiaHRtbCIsImZvckVhY2giLCJjYXRlZ29yeSIsImkiLCJuYW1lIiwic2VjdGlvbiIsImNhdGVnb3J5X2lkIiwiaWQiLCJhcnRpY2xlIiwic2VjdGlvbl9pZCIsImh0bWxfdXJsIiwiYXBwZW5kIiwiY2xpY2siLCJjbGlja2VkQ2F0ZWdvcnkiLCJzaWJsaW5ncyIsInZpc2libGVDYXRlZ29yeSIsImlzIiwic2xpZGVVcCIsInJlbW92ZUNsYXNzIiwic2xpZGVEb3duIiwiYWRkQ2xhc3MiLCJjbGlja2VkU2VjdGlvbiIsInZpc2libGVTZWN0aW9uIiwicmVhZHkiLCJlIiwicHJldmVudERlZmF1bHQiLCJvcGVuIiwiaHJlZiIsIiRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEiLCIkY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scyIsIm9uZSIsInNob3ciLCJ2YWwiLCIkc2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlciIsIiRyZXF1ZXN0Q29tbWVudEZpZWxkcyIsIiRyZXF1ZXN0Q29tbWVudFN1Ym1pdCIsIm9uIiwiaGlkZSIsImZvY3VzIiwiJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24iLCIkcmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94IiwiJHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uIiwiYXR0ciIsInByb3AiLCJjbG9zZXN0Iiwic3VibWl0IiwiJHJlcXVlc3RDb21tZW50VGV4dGFyZWEiLCJ0ZXh0Iiwic2VhcmNoIiwid2hpY2giLCJsb2NhdGlvbiIsInBhcmFtIiwicXVlcnkiLCJzdGF0dXMiLCJvcmdhbml6YXRpb25faWQiLCJzdG9wUHJvcGFnYXRpb24iLCJtZW51IiwiZ2V0RWxlbWVudEJ5SWQiLCJpc0V4cGFuZGVkIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJmb3JtIiwiY2F0ZWdvcmllc0FyciIsInNlY3Rpb25zQXJyIiwiYXJ0aWNsZXNBcnIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtB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RUFBYUYsUUFBYixFQUF1QmpCLFFBQXZCLENBQU47QUFDRCxPQUhVLENBQVg7QUFJRCxLQU5VLENBQVg7QUFPRCxHQVRZLENBQWI7QUFVRCxDQWZELEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBnZXRBcnRpY2xlcyA9IChhcnRpY2xlcywgbmV4dFBhZ2UsIGNiKSA9PiB7XG4gIGNvbnN0IHVybCA9XG4gICAgbmV4dFBhZ2UgIT09IG51bGxcbiAgICAgID8gbmV4dFBhZ2VcbiAgICAgIDogYC9hcGkvdjIvaGVscF9jZW50ZXIvJHt3aW5kb3cuSTE4bi5sb2NhbGV9L2FydGljbGVzLmpzb24/cGVyX3BhZ2U9MTAwYDtcblxuICByZXR1cm4gJC5hamF4KHtcbiAgICB1cmw6IHVybCxcbiAgICBjb250ZXh0OiBkb2N1bWVudC5ib2R5XG4gIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICghZGF0YSkgcmV0dXJuO1xuICAgIGFydGljbGVzID0gYXJ0aWNsZXMuY29uY2F0KGRhdGEuYXJ0aWNsZXMpO1xuXG4gICAgaWYgKGRhdGEubmV4dF9wYWdlICE9PSBudWxsKVxuICAgICAgcmV0dXJuIGdldEFydGljbGVzKGFydGljbGVzLCBkYXRhLm5leHRfcGFnZSwgY2IpO1xuXG4gICAgY2IoYXJ0aWNsZXMpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTZWN0aW9ucyA9IChzZWN0aW9ucywgbmV4dFBhZ2UsIGNiKSA9PiB7XG4gIGNvbnN0IHVybCA9XG4gICAgbmV4dFBhZ2UgIT09IG51bGxcbiAgICAgID8gbmV4dFBhZ2VcbiAgICAgIDogYC9hcGkvdjIvaGVscF9jZW50ZXIvJHt3aW5kb3cuSTE4bi5sb2NhbGV9L3NlY3Rpb25zLmpzb24/cGVyX3BhZ2U9MTAwYDtcblxuICAkLmFqYXgoe1xuICAgIHVybDogdXJsLFxuICAgIGNvbnRleHQ6IGRvY3VtZW50LmJvZHlcbiAgfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgc2VjdGlvbnMgPSBzZWN0aW9ucy5jb25jYXQoZGF0YS5zZWN0aW9ucyk7XG5cbiAgICBpZiAoZGF0YS5uZXh0X3BhZ2UgIT09IG51bGwpXG4gICAgICByZXR1cm4gZ2V0U2VjdGlvbnMoc2VjdGlvbnMsIGRhdGEubmV4dF9wYWdlLCBjYik7XG5cbiAgICBjYihzZWN0aW9ucyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENhdGVnb3JpZXMgPSAoY2F0ZWdvcmllcywgbmV4dFBhZ2UsIGNiKSA9PiB7XG4gIGNvbnN0IHVybCA9XG4gICAgbmV4dFBhZ2UgIT09IG51bGxcbiAgICAgID8gbmV4dFBhZ2VcbiAgICAgIDogYC9hcGkvdjIvaGVscF9jZW50ZXIvJHt3aW5kb3cuSTE4bi5sb2NhbGV9L2NhdGVnb3JpZXMuanNvbj9wZXJfcGFnZT0xMDBgO1xuXG4gICQuYWpheCh7XG4gICAgdXJsOiB1cmwsXG4gICAgY29udGV4dDogZG9jdW1lbnQuYm9keVxuICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVybjtcbiAgICBjYXRlZ29yaWVzID0gY2F0ZWdvcmllcy5jb25jYXQoZGF0YS5jYXRlZ29yaWVzKTtcblxuICAgIGlmIChkYXRhLm5leHRfcGFnZSAhPT0gbnVsbClcbiAgICAgIHJldHVybiBnZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXMsIGRhdGEubmV4dF9wYWdlLCBjYik7XG5cbiAgICBjYihjYXRlZ29yaWVzKTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHJlbmRlciA9IChjYXRlZ29yaWVzLCBzZWN0aW9ucywgYXJ0aWNsZXMpID0+IHtcbiAgbGV0IGNhdGVnb3J5TGlzdCA9ICQoXCIjY2F0ZWdvcnktbGlzdFwiKTtcblxuICBsZXQgaHRtbCA9IFwiXCI7XG5cbiAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSwgaSkgPT4ge1xuICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cImNhdGVnb3J5LWl0ZW1cIj4nO1xuICAgIGh0bWwgKz1cbiAgICAgICc8c3BhbiBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3RpdGxlXCI+JyArXG4gICAgICBjYXRlZ29yeS5uYW1lICtcbiAgICAgICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGV4cGFuZC1pY29uXCI+ZXhwYW5kX21vcmU8L2k+PC9zcGFuPic7XG4gICAgaHRtbCArPSAnPHVsIGNsYXNzPVwic2VjdGlvbi1saXN0XCI+JztcblxuICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24sIGkpID0+IHtcbiAgICAgIGlmIChzZWN0aW9uLmNhdGVnb3J5X2lkICE9PSBjYXRlZ29yeS5pZCkgcmV0dXJuO1xuXG4gICAgICBodG1sICs9ICc8bGkgY2xhc3M9XCJzZWN0aW9uLWl0ZW1cIj4nO1xuICAgICAgaHRtbCArPVxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJzZWN0aW9uLWl0ZW1fX3RpdGxlXCI+JyArXG4gICAgICAgIHNlY3Rpb24ubmFtZSArXG4gICAgICAgICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGV4cGFuZC1pY29uXCI+ZXhwYW5kX21vcmU8L2k+PC9zcGFuPic7XG4gICAgICBodG1sICs9ICc8dWwgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIj4nO1xuXG4gICAgICBhcnRpY2xlcy5mb3JFYWNoKChhcnRpY2xlLCBpKSA9PiB7XG4gICAgICAgIGlmIChhcnRpY2xlLnNlY3Rpb25faWQgIT09IHNlY3Rpb24uaWQpIHJldHVybjtcblxuICAgICAgICBodG1sICs9ICc8bGkgY2xhc3M9XCJhcnRpY2xlLWl0ZW1cIj4nO1xuICAgICAgICBodG1sICs9XG4gICAgICAgICAgJzxhIGNsYXNzPVwiYXJ0aWNsZS1pdGVtX190aXRsZSBhcnRpY2xlLWl0ZW1fX2xpbmtcIiBocmVmPVwiJyArXG4gICAgICAgICAgYXJ0aWNsZS5odG1sX3VybCArXG4gICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgIGFydGljbGUubmFtZSArXG4gICAgICAgICAgXCI8L2E+XCI7XG4gICAgICAgIGh0bWwgKz0gXCI8L2xpPlwiO1xuICAgICAgfSk7XG5cbiAgICAgIGh0bWwgKz0gXCI8L3VsPlwiO1xuICAgICAgaHRtbCArPSBcIjwvbGk+XCI7XG4gICAgfSk7XG5cbiAgICBodG1sICs9IFwiPC91bD5cIjtcbiAgICBodG1sICs9IFwiPC9saT5cIjtcbiAgfSk7XG5cbiAgY2F0ZWdvcnlMaXN0LmFwcGVuZChodG1sKTtcblxuICAkKFwiLmNhdGVnb3J5LWl0ZW1fX3RpdGxlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGxldCBjbGlja2VkQ2F0ZWdvcnkgPSAkKHRoaXMpLnNpYmxpbmdzKFwiLnNlY3Rpb24tbGlzdFwiKTtcbiAgICBsZXQgdmlzaWJsZUNhdGVnb3J5ID0gY2xpY2tlZENhdGVnb3J5LmlzKFwiOnZpc2libGVcIik7XG5cbiAgICAvLyBTa2p1bCBhbGxlIGFuZHJlIGthdGVnb3JpZXJcbiAgICAkKFwiLmNhdGVnb3J5LWl0ZW0gLnNlY3Rpb24tbGlzdCwgLmNhdGVnb3J5LWl0ZW0gLmFydGljbGUtbGlzdFwiKS5zbGlkZVVwKFxuICAgICAgXCJmYXN0XCJcbiAgICApO1xuICAgICQoXCIuY2F0ZWdvcnktaXRlbV9fdGl0bGVcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuXG4gICAgaWYgKHZpc2libGVDYXRlZ29yeSkge1xuICAgICAgY2xpY2tlZENhdGVnb3J5LnNsaWRlVXAoXCJmYXN0XCIpO1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsaWNrZWRDYXRlZ29yeS5zbGlkZURvd24oXCJmYXN0XCIpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgfVxuICB9KTtcbiAgJChcIi5zZWN0aW9uLWl0ZW1fX3RpdGxlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGxldCBjbGlja2VkU2VjdGlvbiA9ICQodGhpcykuc2libGluZ3MoXCIuYXJ0aWNsZS1saXN0XCIpO1xuICAgIGxldCB2aXNpYmxlU2VjdGlvbiA9IGNsaWNrZWRTZWN0aW9uLmlzKFwiOnZpc2libGVcIik7XG5cbiAgICAvLyBTa2p1bCBhbGxlIGFuZHJlIHNla3Rpb25lclxuICAgICQoXCIuc2VjdGlvbi1pdGVtIC5hcnRpY2xlLWxpc3RcIikuc2xpZGVVcChcImZhc3RcIik7XG4gICAgJChcIi5zZWN0aW9uLWl0ZW1fX3RpdGxlXCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcblxuICAgIGlmICh2aXNpYmxlU2VjdGlvbikge1xuICAgICAgY2xpY2tlZFNlY3Rpb24uc2xpZGVVcChcImZhc3RcIik7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xpY2tlZFNlY3Rpb24uc2xpZGVEb3duKFwiZmFzdFwiKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiLy8vLy8vLy8vLyBDT1BFTkhBR0VOIFRIRU1FIEpBVkFTQ1JJUFQgLy8vLy8vLy8vL1xuXG4vKlxuICogalF1ZXJ5IHYxLjkuMSBpbmNsdWRlZFxuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAvLyBzb2NpYWwgc2hhcmUgcG9wdXBzXG4gICQoXCIuc2hhcmUgYVwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwgXCJcIiwgXCJoZWlnaHQgPSA1MDAsIHdpZHRoID0gNTAwXCIpO1xuICB9KTtcblxuICAvLyBzaG93IGZvcm0gY29udHJvbHMgd2hlbiB0aGUgdGV4dGFyZWEgcmVjZWl2ZXMgZm9jdXMgb3IgYmFja2J1dHRvbiBpcyB1c2VkIGFuZCB2YWx1ZSBleGlzdHNcbiAgdmFyICRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEgPSAkKFwiLmNvbW1lbnQtY29udGFpbmVyIHRleHRhcmVhXCIpLFxuICAgICRjb21tZW50Q29udGFpbmVyRm9ybUNvbnRyb2xzID0gJChcIi5jb21tZW50LWZvcm0tY29udHJvbHMsIC5jb21tZW50LWNjc1wiKTtcblxuICAkY29tbWVudENvbnRhaW5lclRleHRhcmVhLm9uZShcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICRjb21tZW50Q29udGFpbmVyRm9ybUNvbnRyb2xzLnNob3coKTtcbiAgfSk7XG5cbiAgaWYgKCRjb21tZW50Q29udGFpbmVyVGV4dGFyZWEudmFsKCkgIT09IFwiXCIpIHtcbiAgICAkY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scy5zaG93KCk7XG4gIH1cblxuICAvLyBFeHBhbmQgUmVxdWVzdCBjb21tZW50IGZvcm0gd2hlbiBBZGQgdG8gY29udmVyc2F0aW9uIGlzIGNsaWNrZWRcbiAgdmFyICRzaG93UmVxdWVzdENvbW1lbnRDb250YWluZXJUcmlnZ2VyID0gJChcbiAgICAgIFwiLnJlcXVlc3QtY29udGFpbmVyIC5jb21tZW50LWNvbnRhaW5lciAuY29tbWVudC1zaG93LWNvbnRhaW5lclwiXG4gICAgKSxcbiAgICAkcmVxdWVzdENvbW1lbnRGaWVsZHMgPSAkKFxuICAgICAgXCIucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIC5jb21tZW50LWZpZWxkc1wiXG4gICAgKSxcbiAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXQgPSAkKFxuICAgICAgXCIucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIC5yZXF1ZXN0LXN1Ym1pdC1jb21tZW50XCJcbiAgICApO1xuXG4gICRzaG93UmVxdWVzdENvbW1lbnRDb250YWluZXJUcmlnZ2VyLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgJHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIuaGlkZSgpO1xuICAgICRyZXF1ZXN0Q29tbWVudEZpZWxkcy5zaG93KCk7XG4gICAgJHJlcXVlc3RDb21tZW50U3VibWl0LnNob3coKTtcbiAgICAkY29tbWVudENvbnRhaW5lclRleHRhcmVhLmZvY3VzKCk7XG4gIH0pO1xuXG4gIC8vIE1hcmsgYXMgc29sdmVkIGJ1dHRvblxuICB2YXIgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24gPSAkKFxuICAgICAgXCIucmVxdWVzdC1jb250YWluZXIgLm1hcmstYXMtc29sdmVkOm5vdChbZGF0YS1kaXNhYmxlZF0pXCJcbiAgICApLFxuICAgICRyZXF1ZXN0TWFya0FzU29sdmVkQ2hlY2tib3ggPSAkKFxuICAgICAgXCIucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIGlucHV0W3R5cGU9Y2hlY2tib3hdXCJcbiAgICApLFxuICAgICRyZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbiA9ICQoXG4gICAgICBcIi5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1zdWJtaXRdXCJcbiAgICApO1xuXG4gICRyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRDaGVja2JveC5hdHRyKFwiY2hlY2tlZFwiLCB0cnVlKTtcbiAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICQodGhpcylcbiAgICAgIC5hdHRyKFwiZGF0YS1kaXNhYmxlZFwiLCB0cnVlKVxuICAgICAgLmNsb3Nlc3QoXCJmb3JtXCIpXG4gICAgICAuc3VibWl0KCk7XG4gIH0pO1xuXG4gIC8vIENoYW5nZSBNYXJrIGFzIHNvbHZlZCB0ZXh0IGFjY29yZGluZyB0byB3aGV0aGVyIGNvbW1lbnQgaXMgZmlsbGVkXG4gIHZhciAkcmVxdWVzdENvbW1lbnRUZXh0YXJlYSA9ICQoXG4gICAgXCIucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIHRleHRhcmVhXCJcbiAgKTtcblxuICAkcmVxdWVzdENvbW1lbnRUZXh0YXJlYS5vbihcImtleXVwXCIsIGZ1bmN0aW9uKCkge1xuICAgIGlmICgkcmVxdWVzdENvbW1lbnRUZXh0YXJlYS52YWwoKSAhPT0gXCJcIikge1xuICAgICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24udGV4dChcbiAgICAgICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24uZGF0YShcInNvbHZlLWFuZC1zdWJtaXQtdHJhbnNsYXRpb25cIilcbiAgICAgICk7XG4gICAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24udGV4dChcbiAgICAgICAgJHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24uZGF0YShcInNvbHZlLXRyYW5zbGF0aW9uXCIpXG4gICAgICApO1xuICAgICAgJHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIERpc2FibGUgc3VibWl0IGJ1dHRvbiBpZiB0ZXh0YXJlYSBpcyBlbXB0eVxuICBpZiAoJHJlcXVlc3RDb21tZW50VGV4dGFyZWEudmFsKCkgPT09IFwiXCIpIHtcbiAgICAkcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICB9XG5cbiAgLy8gU3VibWl0IHJlcXVlc3RzIGZpbHRlciBmb3JtIGluIHRoZSByZXF1ZXN0IGxpc3QgcGFnZVxuICAkKFwiI3JlcXVlc3Qtc3RhdHVzLXNlbGVjdCwgI3JlcXVlc3Qtb3JnYW5pemF0aW9uLXNlbGVjdFwiKS5vbihcbiAgICBcImNoYW5nZVwiLFxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgc2VhcmNoKCk7XG4gICAgfVxuICApO1xuXG4gIC8vIFN1Ym1pdCByZXF1ZXN0cyBmaWx0ZXIgZm9ybSBpbiB0aGUgcmVxdWVzdCBsaXN0IHBhZ2VcbiAgJChcIiNxdWljay1zZWFyY2hcIikub24oXCJrZXlwcmVzc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICBzZWFyY2goKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNlYXJjaCgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uc2VhcmNoID0gJC5wYXJhbSh7XG4gICAgICBxdWVyeTogJChcIiNxdWljay1zZWFyY2hcIikudmFsKCksXG4gICAgICBzdGF0dXM6ICQoXCIjcmVxdWVzdC1zdGF0dXMtc2VsZWN0XCIpLnZhbCgpLFxuICAgICAgb3JnYW5pemF0aW9uX2lkOiAkKFwiI3JlcXVlc3Qtb3JnYW5pemF0aW9uLXNlbGVjdFwiKS52YWwoKVxuICAgIH0pO1xuICB9XG5cbiAgJChcIi5oZWFkZXIgLmljb24tbWVudVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHZhciBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyLW5hdlwiKTtcbiAgICB2YXIgaXNFeHBhbmRlZCA9IG1lbnUuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsICFpc0V4cGFuZGVkKTtcbiAgfSk7XG5cbiAgaWYgKCQoXCIjdXNlci1uYXZcIikuY2hpbGRyZW4oKS5sZW5ndGggPT09IDApIHtcbiAgICAkKFwiLmhlYWRlciAuaWNvbi1tZW51XCIpLmhpZGUoKTtcbiAgfVxuXG4gIC8vIFN1Ym1pdCBvcmdhbml6YXRpb24gZm9ybSBpbiB0aGUgcmVxdWVzdCBwYWdlXG4gICQoXCIjcmVxdWVzdC1vcmdhbml6YXRpb24gc2VsZWN0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgfSk7XG5cbiAgLy8gVG9nZ2xlcyBleHBhbmRlZCBhcmlhIHRvIGNvbGxhcHNpYmxlIGVsZW1lbnRzXG4gICQoXCIuY29sbGFwc2libGUtbmF2LCAuY29sbGFwc2libGUtc2lkZWJhclwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHZhciBpc0V4cGFuZGVkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpID09PSBcInRydWVcIjtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgIWlzRXhwYW5kZWQpO1xuICB9KTtcbn0pO1xuXG4vLy8vLy8vLy8vIENPUEVOSEFHRU4gVEhFTUUgSkFWQVNDUklQVCBFTkQgLy8vLy8vLy8vL1xuIiwiaW1wb3J0IGNvcGVuaGFnZW4gZnJvbSBcIi4vY29wZW5oYWdlblwiO1xuaW1wb3J0IHsgZ2V0Q2F0ZWdvcmllcywgZ2V0U2VjdGlvbnMsIGdldEFydGljbGVzIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9hcnRpY2xlVHJlZVwiO1xuXG4kKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgY2F0ZWdvcmllcyA9IFtdO1xuICBsZXQgc2VjdGlvbnMgPSBbXTtcbiAgbGV0IGFydGljbGVzID0gW107XG5cbiAgZ2V0Q2F0ZWdvcmllcyhbXSwgbnVsbCwgY2F0ZWdvcmllc0FyciA9PiB7XG4gICAgY2F0ZWdvcmllcyA9IGNhdGVnb3JpZXNBcnI7XG4gICAgZ2V0U2VjdGlvbnMoW10sIG51bGwsIHNlY3Rpb25zQXJyID0+IHtcbiAgICAgIHNlY3Rpb25zID0gc2VjdGlvbnNBcnI7XG4gICAgICBnZXRBcnRpY2xlcyhbXSwgbnVsbCwgYXJ0aWNsZXNBcnIgPT4ge1xuICAgICAgICBhcnRpY2xlcyA9IGFydGljbGVzQXJyO1xuICAgICAgICByZW5kZXIoY2F0ZWdvcmllcywgc2VjdGlvbnMsIGFydGljbGVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==