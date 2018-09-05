# Basekit

The FortyTwo Studio frontend toolkit.

## Things you'll want to look at / consider first:

Basekit should go in the public web directory, i.e. /website/public/--basekit-files--

### NPM/Yarn

Use Yarn not NPM… if you want.

Install gulp-cli globally first then gulp within the project directory. I always forget to do that 🙄

### gulpfile.js

Open this and update the browserSync host and proxy addresses to whatever your local environment address is.

Run `gulp` from this directory to start compiling Twig templates into demo for static development. If you need the reference directory (i.e. Basekit's current documentation), run `gulp refbuild` to have it compile to the `demo/reference` directory. You'll probably have to open and edit one of the reference files to get gulp to compile. Sorry.

### /demo

Won't exist until you run `gulp` and then edit one of the Twig templates, go for `_layout.twig`. Once this is compiled you can got go your local env /demo (e.g. http://basekit.dev:3000/demo/). The `:3000` is required for browserSync to work but isn't needed to view anything.

### /templates

Do your frontend templates here, it compiles to “/demo/” and it's what you'd show the client before moving to a Craft or final build.

### data.json

Data stored here can be used within the Twig templates and in Sass if you wish.

---

## Other directory structure and file stuff

### /css

“Basekit” is here, I'll explain how to actually get up and going with that shit below.

### /dl

Just assets for the reference stuff, I'm an idiot and shouldn't have put it here like this.

### /fonts

Local “web fonts” can get stuck in here, no need to be anywhere else but I strongly advise using Fonts.com, Google Fonts, or Typekit instead.

### /imgs

Placeholder images and UI shit go here, it's pretty straightforward really. If you're building a Craft site on the other hand, uploaded assets do _not_ go here, they go in S3 or an “assets” directory.

### /js

Stick it all in here. Basekit's Gulp config has a weak attempt at compiling and minifying JS into one basekit.js file but it's not always required.

### /reference

This is basically documentation of sorts and as mentioned above it compiles to “/demo/reference/” so the designers can have a look at how things work. lol.

### .gitignore

C'mon now.

### /sass-lint.yml

Config for Sass linting which I have hooked up with Atom to let me know when I'm doing stupid shit (obviously it doesn't catch much though).

### CNAME

That's for Github and http://basekit.fortytwo.studio

### index.html

This can be deleted or kept, doesn't matter since you'll overwrite or replace it at some point. Just now it'll point to the demo directory (which you'll need to compile).

## Basekit itself…

Basekit is in a bit of a messy transition period in which I'm trying to work out an optimal way for others to override variables without digging into the `/core`. So keep that in mind, it's nae perfect by any means. Speak to me if you need to know _anything_ at all.

Here's how I work…

### /core

I try not to screw with anything in “/core” as that's all fairly robust over years of development. Files in there should have variables at the top of them which you can override in “basekit.scss” itself, you should be able to see this demonstrated already.

Core attempts to be somewhat global across projects.

### /project

This is anything that is specific to the project or isn't worth having in “/core” because it will almost certainly get directly customised or edited in some way. Add new Sass for projects here too. *However* things in here tend to make their way into “/core” if that makes sense after a while.

Project attempts to be specific to the project itself.

### basekit.scss and basekit-ref.scss

Both of these compile to their .css file, obviously. `basekit-ref.scss` is specific to the reference stuff and the main basekit file is used for three things:

1. Variable overrides
2. Imports
3. Other CSS junk I can't decide where to stick but should probably be in its own file (think shame.css)
