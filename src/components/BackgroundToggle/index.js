"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundToggle = BackgroundToggle;
var react_1 = require("react");
var styles_module_css_1 = require("./styles.module.css");
function BackgroundToggle() {
    var _a = (0, react_1.useState)(true), isEnabled = _a[0], setIsEnabled = _a[1];
    (0, react_1.useEffect)(function () {
        // Load saved preference
        var savedPreference = localStorage.getItem('animatedBackgroundEnabled');
        if (savedPreference !== null) {
            setIsEnabled(savedPreference === 'true');
        }
    }, []);
    var handleToggle = function () {
        var newValue = !isEnabled;
        setIsEnabled(newValue);
        localStorage.setItem('animatedBackgroundEnabled', String(newValue));
        // Reload the page to apply changes
        window.location.reload();
    };
    return (<button className={styles_module_css_1.default.toggleButton} onClick={handleToggle} title={isEnabled ? 'Disable animated background' : 'Enable animated background'} aria-label={isEnabled ? 'Disable animated background' : 'Enable animated background'}>
      {isEnabled ? '🎨' : '🚫'}
    </button>);
}
