export const render = (categories, sections, articles) => {
  let categoryList = $("#category-list");

  let html = "";

  categories.forEach((category, i) => {
    html += '<li class="category-item">';
    html +=
      '<span class="category-item__title">' +
      category.name +
      '<i class="material-icons expand-icon">expand_more</i></span>';
    html += '<ul class="section-list">';

    sections.forEach((section, i) => {
      if (section.category_id !== category.id) return;

      html += '<li class="section-item">';
      html +=
        '<span class="section-item__title">' +
        section.name +
        '<i class="material-icons expand-icon">expand_more</i></span>';
      html += '<ul class="article-list">';

      articles.forEach((article, i) => {
        if (article.section_id !== section.id) return;

        html += '<li class="article-item">';
        html +=
          '<a class="article-item__title article-item__link" href="' +
          article.html_url +
          '">' +
          article.name +
          "</a>";
        html += "</li>";
      });

      html += "</ul>";
      html += "</li>";
    });

    html += "</ul>";
    html += "</li>";
  });

  categoryList.append(html);

  $(".category-item__title").click(function() {
    let clickedCategory = $(this).siblings(".section-list");
    let visibleCategory = clickedCategory.is(":visible");

    // Skjul alle andre kategorier
    $(".category-item .section-list, .category-item .article-list").slideUp(
      "fast"
    );
    $(".category-item__title").removeClass("open");

    if (visibleCategory) {
      clickedCategory.slideUp("fast");
      $(this).removeClass("open");
    } else {
      clickedCategory.slideDown("fast");
      $(this).addClass("open");
    }
  });
  $(".section-item__title").click(function() {
    let clickedSection = $(this).siblings(".article-list");
    let visibleSection = clickedSection.is(":visible");

    // Skjul alle andre sektioner
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
