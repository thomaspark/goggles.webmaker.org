var sanitize = require("htmlsanitizer");

// Whitelist for HTML5 elements
var ALLOWED_TAGS = [
    "!doctype",
    "html",
    "base",
    "body",
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    //"command",
    //"datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    //"embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1","h2","h3","h4","h5","h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "keygen",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "map",
    "mark",
    "menu",
    "meta",
    "meter",
    "nav",
    //"noscript",
    //"object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "s",
    "samp",
    //"script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    //"track",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
];

// Whitelist for HTML5 element attributes.
var ALLOWED_ATTRS = {
  "*": ["class", "id", "lang", "style", "tabindex", "title", "disabled"],
  "a": ["href", "target"],
  "audio": ["controls", "autoplay", "preload", "loop", "src"],
  "base": ["href", "target"],
  "button": ["name", "type", "value"],
  "canvas": ["width", "height"],
  //"embed": ["height","src","type","width"],
  "iframe": ["src", "width", "height", "allowfullscreen"],
  "img": ["src", "width", "height", "alt"],
  "input": ["type","checked","min","max","maxlength","name","placeholder","pattern",
            "readonly","required","step","value"],
  "link": ["href", "rel", "type", "crossorigin", "media"],
  "menu": ["type", "label"],
  "meta": ["charset", "name", "content"],
  "meter": ["value","min","max","low","high","optimum"],
  //"object": ["data","height","width","name","type"],
  "optgroup": ["label"],
  "option": ["label", "selected", "value"],
  "output": ["for","name"],
  "param": ["name", "value"],
  "progress": ["max","value"],
  "q": ["cite"],
  "source": ["src","type","media"],
  //"script": ["type", "src"],
  "style": ["type","media","scoped"],
  "textarea": ["cols","name","maxlength","readonly","placeholder","required","rows",
               "selectionDirection","selectionStart","selectionEnd","wrap"],
  "th": ["colspan","rowspan"],
  "td": ["rowspan"],
  "time": ["datetime","pubdate"],
  //"track": ["default","kind","label","src","srclang"],
  "video": ["controls", "autoplay", "preload", "loop", "mediaGroup", "src",
            "poster", "muted", "width", "height"]
};

// Whitelist for CSS properties
var ALLOWED_STYLES = [
  "align-content",
  "align-items",
  "align-self",
  "animation",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-timing-function",
  "auto",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "border",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-decoration-break",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "clear",
  "clip",
  "clip-path",
  "color",
  "columns",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "content",
  "counter-increment",
  "counter-reset",
  "cursor",
  "direction",
  "display",
  "empty-cells",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "font",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-variant-ligatures",
  "font-weight",
  "height",
  "hyphens",
  "icon",
  "image-rendering",
  "image-resolution",
  "image-orientation",
  "ime-mode",
  "inherit",
  "initial",
  "justify-content",
  "left",
  "letter-spacing",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "margin-top",
  "marks",
  "mask",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "padding-top",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "perspective",
  "perspective-origin",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "right",
  "table-layout",
  "tab-size",
  "text-align",
  "text-align-last",
  "text-combine-horizontal",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-indent",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "text-underline-position",
  "top",
  "touch-action",
  "transform",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "unicode-bidi",
  "vertical-align",
  "visibility",
  "white-space",
  "widows",
  "width",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "z-index",
  "zoom"
];

/**
 * Sanitize to-publish data by running it through a RESTful Bleach endpoint
 */
exports.bleachData = function(endpoint) {
  // Sanitize some HTML code by running it through Bleach
  return function(req, res, next) {
    sanitize({
      endpoint: endpoint,
      text: req.body.html,
      tags: ALLOWED_TAGS,
      attributes: ALLOWED_ATTRS,
      styles: ALLOWED_STYLES,
      strip: false,
      strip_comments: false,
      parse_as_fragment: false
    }, function(err, sanitizedData) {
      req.body.sanitizedHTML = sanitizedData;
      next(err);
    });
  };
};