"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MDXContent;
var react_1 = require("react");
var react_2 = require("@mdx-js/react");
var MDXComponents_1 = require("@theme/MDXComponents");
function MDXContent(_a) {
    var children = _a.children;
    return <react_2.MDXProvider components={MDXComponents_1.default}>{children}</react_2.MDXProvider>;
}
