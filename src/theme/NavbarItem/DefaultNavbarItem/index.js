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
exports.default = DefaultNavbarItem;
var react_1 = require("react");
var Mobile_1 = require("@theme/NavbarItem/DefaultNavbarItem/Mobile");
var Desktop_1 = require("@theme/NavbarItem/DefaultNavbarItem/Desktop");
function DefaultNavbarItem(_a) {
    var _b;
    var _c = _a.mobile, mobile = _c === void 0 ? false : _c, _position = _a.position, // Need to destructure position from props so that it doesn't get passed on.
    props = __rest(_a, ["mobile", "position"]);
    var Comp = mobile ? Mobile_1.default : Desktop_1.default;
    return (<Comp {...props} activeClassName={(_b = props.activeClassName) !== null && _b !== void 0 ? _b : (mobile ? 'menu__link--active' : 'navbar__link--active')}/>);
}
