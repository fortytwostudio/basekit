# Basekit

Version 2.0.0

Basekit is a "frontend toolkit" of sorts used by the dev team at FortyTwo Studio. It's formed over many years to suit the way we work and aims to speed up development time and reduce the amount of repetitive tasks so we can focus on the details of a project.

Currently Basekit has a unique layout model based on `inline-block` and the `bk-layout` data attribute. As of September 2018 we are going to start moving towards replacing this with flex box and CSS grid layout.

## First things first:

Basekit should go in your web root alongside other non-public files, it will compile CSS, JS and HTML (if required) to the public directory which can be configured in the package.json file.

### NPM/Yarn

I recommend using [Yarn](https://github.com/yarnpkg/yarn) to install and manage packages.

Install gulp-cli globally first then run `$ yarn` within your project root directory, this will install all the relevant packages.

### Gulp

Run `$ gulp` from this directory to start compiling Sass, JS and Twig to the public directory. You can also run `$ gulp watch-sass` if you're only working with stylesheets and don't need Twig or JS to be watched. Running `$ gulp js` or `$ gulp twig` will run those tasks individually.

### /demo

By default Twig files compiled to HTML in the public/demo/ directory. We use this when building static prototypes or static builds prior to moving into a CMS such as Craft.

### data.json

Data stored here can be used within Twig templates and in Sass if you wish, however this may be deprecate soon in favour of holding data within the package.json file.
