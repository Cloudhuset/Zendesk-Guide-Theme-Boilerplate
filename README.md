# Zendesk Guide Theme Boilerplate
This is a boilerplate theme for the new Zendesk Guide, that precompiles the template, style and script files, so you can do various things, that isn't possible when working directly with Zendesks theme editor.

## How to's

### First run
Please add a file called `.local.env` and `.production.env` to store your environment specific variables. By default these files are gitignored. If you wish to you can track them by removing `.*.env` from .gitignore.

### Include a partial
* Place the partial in src/partials
* Insert `<include src="your-partial-name.hbs"></include>` in a template file
* After compilation the include tag will be replaced with the contents of your partial file

### Insert environment specific data
If you are developing the theme in a local environment, and moving it to another help center when it is production-ready, then you might sometimes need to remember to change some id's or other stuff that changes per environment. Not anymore!

* In /config.js you insert the variables that you want to use in your templates.
* The key that you write is the one that you will refer to from template and sass files, and the value is the one that will be compiled into the template.
* When running gulp you can pass an environment: `gulp build --env local`. This will set the environment to 'local' and the .local.env file will be used to load environment specific data into Node's process.env object. This is already set up as scripts in package.json, so you can just `npm run build-dev` (or `yarn build-dev`) or `npm run build-production`.

### Insert config variable in a template file
Inside any of the template files you can insert the value of a variable from the config file by writing `{{{% variable_name %}}}`. That will simply compile to the value of the variable.

### Insert config variable in sass
All the config variables are also available in sass. You can simply refer to any of the variables as you would with normal sass variables, e.g. `color: $primary-color`. If you want to use a variable as the name of a class or id you can do it like this: `.#{$variable_name} { color: green }` or `##{$variable_name} { color: red }`.

### Use Zendesk settings variable in sass
When using the zendesk theme editor to write css, you can insert settings variables, and Zendesk will compile their values. However when trying to use one of these values when precompiling our theme, node-sass will try to compile a variable that doesn't exist. So we have to escape these variables. We can do this using the sass unquote() function. Example: `background-image: url(unquote("$homepage_background_image"));`

### Using control structures inside templates (if/else, switch, loops)
To use control structures in the template files, please refer to the posthtml-expressions documentation at https://github.com/posthtml/posthtml-expressions

### Theme preview using ZAT (Zendesk App Tools)
To preview the theme while developing you can use ZAT. Please refer to the following article on how to install ZAT: https://help.zendesk.com/hc/en-us/articles/229489288  
Once installed you can run `zat theme preview` from inside the dist folder

### Compiling and packaging (zip)
To compile for production and make a zip file run `npm run package`.