# Basekit

Version 2.1.0

Basekit is a "frontend toolkit" of sorts used by the dev team at FortyTwo Studio. It's formed over many years to suit the way we work and aims to speed up development time and reduce the amount of repetitive tasks so we can focus on the details of a project.

Currently Basekit has a unique layout model based on `inline-block` and the `bk-layout` data attribute. As of September 2018 we are going to start moving towards replacing this with flex box and CSS grid layout.

## First things first:

Basekit should go in your web root alongside other non-public files, it will compile CSS, JS and HTML (if required) to the public directory which can be configured in the package.json file.

### NPM/Yarn

I recommend using [Yarn](https://github.com/yarnpkg/yarn) to install and manage packages.

Install gulp-cli globally first then run `$ yarn` within your project root directory, this will install all the relevant packages.

### Gulp

Run `$ gulp` from this directory to start compiling Sass, JS and Twig to the public directory. You can also run `$ gulp watch-sass` if you're only working with stylesheets.
