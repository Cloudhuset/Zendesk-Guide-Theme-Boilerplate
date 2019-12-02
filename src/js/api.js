export const getArticles = (articles, nextPage, cb) => {
  const url =
    nextPage !== null
      ? nextPage
      : `/api/v2/help_center/${window.I18n.locale}/articles.json?per_page=100`;

  return $.ajax({
    url: url,
    context: document.body
  }).done(function(data) {
    if (!data) return;
    articles = articles.concat(data.articles);

    if (data.next_page !== null)
      return getArticles(articles, data.next_page, cb);

    cb(articles);
  });
};

export const getSections = (sections, nextPage, cb) => {
  const url =
    nextPage !== null
      ? nextPage
      : `/api/v2/help_center/${window.I18n.locale}/sections.json?per_page=100`;

  $.ajax({
    url: url,
    context: document.body
  }).done(function(data) {
    if (!data) return;
    sections = sections.concat(data.sections);

    if (data.next_page !== null)
      return getSections(sections, data.next_page, cb);

    cb(sections);
  });
};

export const getCategories = (categories, nextPage, cb) => {
  const url =
    nextPage !== null
      ? nextPage
      : `/api/v2/help_center/${window.I18n.locale}/categories.json?per_page=100`;

  $.ajax({
    url: url,
    context: document.body
  }).done(function(data) {
    if (!data) return;
    categories = categories.concat(data.categories);

    if (data.next_page !== null)
      return getCategories(categories, data.next_page, cb);

    cb(categories);
  });
};
