var glob = require("glob-fs")({ gitignore: true });
var files = glob.readdirSync("./dist/assets/cat-icon_*.*");

var category_icons = {};

for (var i = 0; i < files.length; i++) {
  var filePath = files[i];
  var fileName = filePath.replace("dist/assets/", "");
  var catId = /cat-icon_(\d+)\..+/.exec(fileName)[1];

  category_icons[catId] = fileName;
}

module.exports = category_icons;
