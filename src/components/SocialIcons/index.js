"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fa6_1 = require("react-icons/fa6");
var constants_1 = require("../../constants");
var SocialIcons = function () {
    var socialLinks = [
        {
            href: constants_1.GITHUB_MAIN_REPO_URL,
            icon: fa6_1.FaGithub,
            label: 'GitHub'
        },
        {
            href: constants_1.DISCORD_URL,
            icon: fa6_1.FaDiscord,
            label: 'Discord'
        },
        {
            href: constants_1.REDDIT_URL,
            icon: fa6_1.FaReddit,
            label: 'Reddit'
        },
        {
            href: constants_1.TWITTER_URL,
            icon: fa6_1.FaXTwitter,
            label: 'X (Twitter)'
        },
        {
            href: constants_1.LINKEDIN_URL,
            icon: fa6_1.FaLinkedin,
            label: 'LinkedIn'
        },
        {
            href: constants_1.TIKTOK_URL,
            icon: fa6_1.FaTiktok,
            label: 'TikTok'
        },
        {
            href: constants_1.BLUESKY_URL,
            icon: fa6_1.FaBluesky,
            label: 'Bluesky'
        },
    ];
    return (<div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
      {socialLinks.map(function (_a) {
            var href = _a.href, Icon = _a.icon, label = _a.label;
            return (<a key={label} href={href} aria-label={label} className="footer__link-item" style={{
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                }} onMouseEnter={function (e) {
                    e.currentTarget.style.opacity = '0.7';
                }} onMouseLeave={function (e) {
                    e.currentTarget.style.opacity = '1';
                }}>
          <Icon size={24}/>
        </a>);
        })}
    </div>);
};
exports.default = SocialIcons;
