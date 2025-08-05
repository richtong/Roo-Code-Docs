"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Codicon;
var react_1 = require("react");
require("@vscode/codicons/dist/codicon.css");
function Codicon(_a) {
    var name = _a.name;
    return (<i className={"codicon codicon-".concat(name)} aria-hidden="true"/>);
}
