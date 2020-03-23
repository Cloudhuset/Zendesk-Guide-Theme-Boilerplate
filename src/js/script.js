import _copenhagen from "./copenhagen";
import _dropdowns from './dropdowns'
import { getCategories, getSections, getArticles } from "./api";
import { render } from "./articleTree";

$(document).on("ready", function() {
  let categories = [];
  let sections = [];
  let articles = [];

  getCategories([], null, categoriesArr => {
    categories = categoriesArr;
    getSections([], null, sectionsArr => {
      sections = sectionsArr;
      getArticles([], null, articlesArr => {
        articles = articlesArr;
        render(categories, sections, articles);
      });
    });
  });
});
