# Basekit

Basekit is a "frontend toolkit" of sorts used by the developers at [FortyTwo Studio](https://www.fortytwo.studio). It has come about over many years to suit the way we work and aims to speed up development time by keeping things DRY.

Currently Basekit has a unique layout model based on `inline-block` and the `data-bk-layout` attribute. As of September 2018 we are going to start moving towards replacing this with flex box and CSS grid layout.

## First things first:

Basekit should go in your web root alongside other non-public files, it will compile CSS, JS and HTML (if required) to the public directory which can be configured in the package.json file.

Basekit uses [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). Remember to run `$ git submodule init` and `$ git submodule update` once you've pulled down this repo to make sure the submodules are also included and up to date.

### NPM/Yarn

Using [Yarn](https://github.com/yarnpkg/yarn) to install and manage packages.

Install gulp-cli globally first then run `$ yarn` within your project root directory, this will install all the relevant packages.

### Gulp

Run `$ gulp` from this directory to start compiling Sass to the public directory.

### NPM Scripts

Basekit includes support for compiling the Sass/CSS via NPM scripts, take a look in the package.json. It's currently incomplete but faster than Gulp.
