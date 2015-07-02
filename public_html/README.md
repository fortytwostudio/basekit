# Basekit

<dl>
    <dt>Author:</dt>
    <dd>ryan@eqdesign.co.uk</dd>
</dl>

Basekit is a collection of front-end files and techniques used to build EQ Design web projects as of mid-late 2015.

Before continuing, you should have a sound understanding of CSS specificity [1], Sass syntax [2], and BEM-like class naming [3].

You would also benefit from an understanding of Utility Classes [4] and the ITCSS methodology [5] that I aim to follow.

1. https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
2. http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html
3. http://cssguidelin.es/#bem-like-naming
4. http://davidtheclark.com/on-utility-classes/
5. https://www.youtube.com/watch?v=1OKZOV-iLj4

## Coding Style

Do not break these rules:

- Use soft-tabs with a two space indent.
- Put a space after `:` in Sass/CSS property declarations.
- Put line breaks between Sass/CSS rulesets.
- Always nest Sass selectors.
- Put spaces before `{` in rule declarations.
- Place closing braces `}` of declaration blocks on a new line.
- Use BEM-like class naming for modules/components.
- Use HEX or rgba colours.
- Use `//` for Sass comment blocks (instead of `/* */`).
- Do not use zero value units (`margin: 0;` not `margin: 0px;`).
- Be explicit, avoid unnecessary shorthand declarations (write `margin-bottom: 20px;` instead of `margin: 0 0 20px;`).

## TBC…