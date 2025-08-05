"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavbarNavLink;
var react_1 = require("react");
var Link_1 = require("@docusaurus/Link");
var useBaseUrl_1 = require("@docusaurus/useBaseUrl");
var theme_common_1 = require("@docusaurus/theme-common");
function NavbarNavLink(_a) {
    var activeBasePath = _a.activeBasePath, activeBaseRegex = _a.activeBaseRegex, to = _a.to, href = _a.href, label = _a.label, html = _a.html, _isDropdownLink = _a.isDropdownLink, prependBaseUrlToHref = _a.prependBaseUrlToHref, props = __rest(_a, ["activeBasePath", "activeBaseRegex", "to", "href", "label", "html", "isDropdownLink", "prependBaseUrlToHref"]);
    // TODO all this seems hacky
    // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
    var toUrl = (0, useBaseUrl_1.default)(to);
    var activeBaseUrl = (0, useBaseUrl_1.default)(activeBasePath);
    var normalizedHref = (0, useBaseUrl_1.default)(href, { forcePrependBaseUrl: true });
    // Link content is set through html XOR label
    var linkContentProps = html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : {
            children: label,
        };
    if (href) {
        return (<Link_1.default href={prependBaseUrlToHref ? normalizedHref : href} {...props} {...linkContentProps}/>);
    }
    return (<Link_1.default to={toUrl} isNavLink {...((activeBasePath || activeBaseRegex) && {
        isActive: function (_match, location) {
            return activeBaseRegex
                ? (0, theme_common_1.isRegexpStringMatch)(activeBaseRegex, location.pathname)
                : location.pathname.startsWith(activeBaseUrl);
        },
    })} {...props} {...linkContentProps}/>);
}
