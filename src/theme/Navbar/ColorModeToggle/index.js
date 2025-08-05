"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavbarColorModeToggle;
var react_1 = require("react");
var theme_common_1 = require("@docusaurus/theme-common");
var rx_1 = require("react-icons/rx");
var styles_module_css_1 = require("./styles.module.css");
function NavbarColorModeToggle(_a) {
    var className = _a.className;
    var disableSwitch = (0, theme_common_1.useThemeConfig)().colorMode.disableSwitch;
    var _b = (0, theme_common_1.useColorMode)(), colorMode = _b.colorMode, setColorMode = _b.setColorMode;
    if (disableSwitch) {
        return null;
    }
    var toggleTheme = function () {
        setColorMode(colorMode === 'dark' ? 'light' : 'dark');
    };
    return (<button onClick={toggleTheme} className={"".concat(styles_module_css_1.default.themeToggle, " ").concat(className || '')} aria-label="Toggle theme" title="Toggle theme">
      {colorMode === 'dark' ? (<rx_1.RxSun className={styles_module_css_1.default.icon}/>) : (<rx_1.RxMoon className={styles_module_css_1.default.icon}/>)}
    </button>);
}
