"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocItemContent;
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var Heading_1 = require("@theme/Heading");
var MDXContent_1 = require("@theme/MDXContent");
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
    var _a = (0, client_1.useDoc)(), metadata = _a.metadata, frontMatter = _a.frontMatter, contentTitle = _a.contentTitle;
    var shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
    if (!shouldRender) {
        return null;
    }
    return metadata.title;
}
function DocItemContent(_a) {
    var children = _a.children;
    var syntheticTitle = useSyntheticTitle();
    return (<div className={(0, clsx_1.default)(theme_common_1.ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (<header>
          <Heading_1.default as="h1">{syntheticTitle}</Heading_1.default>
        </header>)}
      <MDXContent_1.default>{children}</MDXContent_1.default>
    </div>);
}
