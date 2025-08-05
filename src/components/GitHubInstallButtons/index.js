"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GitHubInstallButtons;
var react_1 = require("react");
var rx_1 = require("react-icons/rx");
var vsc_1 = require("react-icons/vsc");
var constants_1 = require("@site/src/constants");
var styles_module_css_1 = require("./styles.module.css");
// Number formatting function
function formatNumber(num) {
    var truncated = Math.floor((num / 1000) * 10) / 10;
    return truncated.toFixed(1) + "k";
}
// GitHub Stars API
function getGitHubStars() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.github.com/repos/RooCodeInc/Roo-Code")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (typeof data.stargazers_count !== "number") {
                        console.error("GitHub API: Invalid stargazers count");
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, formatNumber(data.stargazers_count)];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching GitHub stars:", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// VS Code Downloads API
function getVSCodeDownloads() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, statistics, installStat, error_2;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json;api-version=7.1-preview.1",
                            },
                            body: JSON.stringify({
                                filters: [
                                    {
                                        criteria: [
                                            {
                                                filterType: 7,
                                                value: "RooVeterinaryInc.roo-cline",
                                            },
                                        ],
                                    },
                                ],
                                flags: 914,
                            }),
                        })];
                case 1:
                    res = _e.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _e.sent();
                    statistics = (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.results) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.statistics;
                    if (!statistics) {
                        console.error("VSCode API: Missing statistics in response");
                        return [2 /*return*/, null];
                    }
                    installStat = statistics.find(function (stat) { return stat.statisticName === "install"; });
                    if (!installStat) {
                        console.error("VSCode API: Install count not found");
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, formatNumber(installStat.value)];
                case 3:
                    error_2 = _e.sent();
                    console.error("Error fetching VSCode downloads:", error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function GitHubInstallButtons() {
    var _a = (0, react_1.useState)("15.4k"), stars = _a[0], setStars = _a[1];
    var _b = (0, react_1.useState)("574.1k"), downloads = _b[0], setDownloads = _b[1];
    (0, react_1.useEffect)(function () {
        // Fetch live data
        getGitHubStars().then(function (count) {
            if (count)
                setStars(count);
        });
        getVSCodeDownloads().then(function (count) {
            if (count)
                setDownloads(count);
        });
    }, []);
    return (<div className={styles_module_css_1.default.container}>
      {/* GitHub Button */}
      <a href={constants_1.GITHUB_MAIN_REPO_URL} target="_blank" rel="noopener noreferrer" className={styles_module_css_1.default.githubButton} title="GitHub Repository">
        <rx_1.RxGithubLogo className={styles_module_css_1.default.icon}/>
        {stars && <span>{stars}</span>}
      </a>

      {/* Install Button */}
      <a href={constants_1.VSCODE_MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" className={styles_module_css_1.default.installButton} title="Install VS Code Extension">
        <vsc_1.VscVscode className={styles_module_css_1.default.icon}/>
        <span>
          Install <span className={styles_module_css_1.default.separator}>&middot;</span>
        </span>
        {downloads && <span>{downloads}</span>}
      </a>
    </div>);
}
