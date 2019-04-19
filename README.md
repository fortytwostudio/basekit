# Basekit

Basekit is a "frontend toolkit" of sorts used by the developers at [FortyTwo Studio](https://www.fortytwo.studio). It has come about over many years to suit the way we work and aims to speed up development time.

Currently Basekit has a unique layout model based on flex box and the `data-bk-layout` attribute.

## First things first:

Basekit uses [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). Remember to run `$ git submodule init` and `$ git submodule update` once you've pulled down this repo to make sure the submodules are also included and up to date.

Basekit should go above the public web directory alongside other non-public files, it will compile CSS to the public assets directory but as of a recent update it does not compile JS.

### NPM/Yarn

Using [Yarn](https://github.com/yarnpkg/yarn) to install and manage packages.

Install gulp-cli globally first then run `$ yarn` within your project root directory, this will install all the relevant packages.

### Gulp

Run `$ gulp` from this directory to start compiling Sass to CSS.

### NPM Scripts

Basekit includes very rough support for compiling the Sass/CSS via NPM scripts, take a look in the package.json. It's currently needing some work but faster than Gulp.
