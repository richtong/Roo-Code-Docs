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
exports.default = DefaultNavbarItemDesktop;
var react_1 = require("react");
var clsx_1 = require("clsx");
var NavbarNavLink_1 = require("@theme/NavbarItem/NavbarNavLink");
function DefaultNavbarItemDesktop(_a) {
    var className = _a.className, _b = _a.isDropdownItem, isDropdownItem = _b === void 0 ? false : _b, props = __rest(_a, ["className", "isDropdownItem"]);
    var element = (<NavbarNavLink_1.default className={(0, clsx_1.default)(isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link', className)} isDropdownLink={isDropdownItem} {...props}/>);
    if (isDropdownItem) {
        return <li>{element}</li>;
    }
    return element;
}
