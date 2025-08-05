"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FooterLayout;
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var SocialIcons_1 = require("@site/src/components/SocialIcons");
function FooterLayout(_a) {
    var style = _a.style, links = _a.links, logo = _a.logo, copyright = _a.copyright;
    return (<footer className={(0, clsx_1.default)(theme_common_1.ThemeClassNames.layout.footer.container, 'footer', {
            'footer--dark': style === 'dark',
        })}>
      <div className="container container-fluid">
        <div className="footer__main">
          <div className="footer__brand">
            {logo && <div className="footer__logo-container">{logo}</div>}
            <div className="footer__tagline">
              Empowering developers to build better software faster with AI-powered tools and insights.
            </div>
            <div className="footer__social-icons">
              <SocialIcons_1.default />
            </div>
          </div>
          <div className="footer__links-wrapper">
            {links}
          </div>
        </div>
        {copyright && (<div className="footer__bottom">
            {copyright}
          </div>)}
      </div>
    </footer>);
}
