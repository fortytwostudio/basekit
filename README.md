# BaseKit

The FortyTwo Studio front-end starter kit.

This readme will be updated soon, in the meantime there's always our [Basekit Trello board](https://trello.com/b/oh17wuj2/basekit) to check out.

## gulp-twig

Aye I'm using this to compile the main template files in templates into templates/_html for you to view. But for some reason when I watch these files with Gulp (run `gulp watch-twig` for now) it runs three times and is slow as fuck, we're talking 1.5 seconds at longest :O

Gulp-twig requires .twig in extend and include filenames.

## data.json

This is my CMS ;) Have a look through and it may give you ideas for Craft fields, but I've not given it a lot of thought.

## Template Structure

I've tried to replicate what we do with Craft as closely as I can, it seems to work.

- Primary layout file in template root
- Homepage template file in template root
- "Global" includes are in a template root includes directory
- Includes specific to a page/section should go in the directory of that page/section under a partials directory… imo
- Each section in Craft should (more or less) have its own template file, even if it's almost identical to another. I guarantee the client or a designer will change things later on and having their own templates just makes this a bit easier to wrangle. If you have a better way, go with it and explain in another Readme :P
- Sub pages/sections of sections are in their own directories (e.g. vacancies/entry/index.twig) here but thiswas just to create a clean URL structure for frontend demonstrations. You could change this to entry.twig in Craft.

## Layout template

In here you'll want to the following for SEO/Social:

- Title tag: fallback plus editable per-page content
- Description tag: fallback plus editable per-page content
- Facebook / Twitter Cards: One global used everywhere, plus unique editable ones for vacancies
- Google analytics can be a global multi-line text field that the client pastes the entire GA code into (script tags too), aye it goes in head :P