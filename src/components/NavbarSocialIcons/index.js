"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavbarSocialIcons;
var react_1 = require("react");
var fa6_1 = require("react-icons/fa6");
var constants_1 = require("@site/src/constants");
var styles_module_css_1 = require("./styles.module.css");
function NavbarSocialIcons() {
    var socialLinks = [
        {
            href: constants_1.REDDIT_URL,
            icon: fa6_1.FaReddit,
            label: 'Reddit',
        },
        {
            href: constants_1.DISCORD_URL,
            icon: fa6_1.FaDiscord,
            label: 'Discord',
        },
    ];
    return (<div className={styles_module_css_1.default.socialIcons}>
      {socialLinks.map(function (_a) {
            var href = _a.href, Icon = _a.icon, label = _a.label;
            return (<a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles_module_css_1.default.socialLink} title={label} aria-label={label}>
          <Icon />
        </a>);
        })}
    </div>);
}
