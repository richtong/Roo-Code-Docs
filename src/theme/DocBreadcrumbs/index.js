"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocBreadcrumbs;
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var internal_1 = require("@docusaurus/theme-common/internal");
var Link_1 = require("@docusaurus/Link");
var Translate_1 = require("@docusaurus/Translate");
var Home_1 = require("@theme/DocBreadcrumbs/Items/Home");
var StructuredData_1 = require("@theme/DocBreadcrumbs/StructuredData");
var CopyPageURL_1 = require("@site/src/components/CopyPageURL");
var styles_module_css_1 = require("./styles.module.css");
// TODO move to design system folder
function BreadcrumbsItemLink(_a) {
    var children = _a.children, href = _a.href, isLast = _a.isLast;
    var className = 'breadcrumbs__link';
    if (isLast) {
        return <span className={className}>{children}</span>;
    }
    return href ? (<Link_1.default className={className} href={href}>
      <span>{children}</span>
    </Link_1.default>) : (<span className={className}>{children}</span>);
}
// TODO move to design system folder
function BreadcrumbsItem(_a) {
    var children = _a.children, active = _a.active;
    return (<li className={(0, clsx_1.default)('breadcrumbs__item', {
            'breadcrumbs__item--active': active,
        })}>
      {children}
    </li>);
}
function DocBreadcrumbs() {
    var breadcrumbs = (0, client_1.useSidebarBreadcrumbs)();
    var homePageRoute = (0, internal_1.useHomePageRoute)();
    if (!breadcrumbs) {
        return null;
    }
    return (<>
      <StructuredData_1.default breadcrumbs={breadcrumbs}/>
      <nav className={(0, clsx_1.default)(theme_common_1.ThemeClassNames.docs.docBreadcrumbs, styles_module_css_1.default.breadcrumbsContainer)} aria-label={(0, Translate_1.translate)({
            id: 'theme.docs.breadcrumbs.navAriaLabel',
            message: 'Breadcrumbs',
            description: 'The ARIA label for the breadcrumbs',
        })}>
        <div className={styles_module_css_1.default.breadcrumbsWrapper}>
          <ul className="breadcrumbs">
            {homePageRoute && <Home_1.default />}
            {breadcrumbs.map(function (item, idx) {
            var isLast = idx === breadcrumbs.length - 1;
            var href = item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (<BreadcrumbsItem key={idx} active={isLast}>
                  <BreadcrumbsItemLink href={href} isLast={isLast}>
                    {item.label}
                  </BreadcrumbsItemLink>
                </BreadcrumbsItem>);
        })}
          </ul>
          <CopyPageURL_1.default />
        </div>
      </nav>
    </>);
}
