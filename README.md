# Zendesk Guide Theme Boilerplate
This is a boilerplate theme for Zendesk Guide, that precompiles the template files, so you can do various things, that isn't possible when working directly with Zendesks theme editor.

## How to's

### Include a partial
* Place the partial in src/partials
* Insert `<include src="your-partial-name.hbs"></include>` in a template file
* After compilation the include tag will be replaced with the contents of your partial file

### Insert environment specific data
If you are developing the theme in a local environment, and moving it to another help center when it is production-ready, then you might sometimes need to remember to change some id's or other stuff that changes per environment. Not anymore!

* In /config.js you insert the variables that you want to use in your templates, inside the "variables" object.
* The key that you write is the one that you will refer to from template files, and the value is the one that will be compiled into the template.
* When running gulp you can pass an environment: `gulp build-templates --env local`. This will set the environment to 'local' and the .local.env file will be used to load environment specific data into Node's process.env object.