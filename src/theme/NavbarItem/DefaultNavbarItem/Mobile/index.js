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
exports.default = DefaultNavbarItemMobile;
var react_1 = require("react");
var clsx_1 = require("clsx");
var NavbarNavLink_1 = require("@theme/NavbarItem/NavbarNavLink");
function DefaultNavbarItemMobile(_a) {
    var className = _a.className, _isDropdownItem = _a.isDropdownItem, props = __rest(_a, ["className", "isDropdownItem"]);
    return (<li className="menu__list-item">
      <NavbarNavLink_1.default className={(0, clsx_1.default)('menu__link', className)} {...props}/>
    </li>);
}
