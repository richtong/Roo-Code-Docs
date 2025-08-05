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
exports.default = CopyPageContent;
var react_1 = require("react");
var fa6_1 = require("react-icons/fa6");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var styles_module_css_1 = require("./styles.module.css");
function CopyPageContent() {
    var _this = this;
    var _a = (0, react_1.useState)(false), copied = _a[0], setCopied = _a[1];
    var _b = (0, client_1.useDoc)(), metadata = _b.metadata, frontMatter = _b.frontMatter;
    var convertHtmlToMarkdown = function (element) {
        var _a;
        var result = '';
        for (var _i = 0, _b = Array.from(element.childNodes); _i < _b.length; _i++) {
            var node = _b[_i];
            if (node.nodeType === Node.TEXT_NODE) {
                result += node.textContent || '';
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                var elem = node;
                var tagName = elem.tagName.toLowerCase();
                switch (tagName) {
                    case 'h1':
                        result += "# ".concat(elem.textContent, "\n\n");
                        break;
                    case 'h2':
                        result += "## ".concat(elem.textContent, "\n\n");
                        break;
                    case 'h3':
                        result += "### ".concat(elem.textContent, "\n\n");
                        break;
                    case 'h4':
                        result += "#### ".concat(elem.textContent, "\n\n");
                        break;
                    case 'h5':
                        result += "##### ".concat(elem.textContent, "\n\n");
                        break;
                    case 'h6':
                        result += "###### ".concat(elem.textContent, "\n\n");
                        break;
                    case 'p':
                        result += "".concat(elem.textContent, "\n\n");
                        break;
                    case 'code':
                        if (((_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'pre') {
                            result += "```\n".concat(elem.textContent, "\n```\n\n");
                        }
                        else {
                            result += "`".concat(elem.textContent, "`");
                        }
                        break;
                    case 'pre':
                        // Skip processing children since we handle code blocks above
                        break;
                    case 'strong':
                    case 'b':
                        result += "**".concat(elem.textContent, "**");
                        break;
                    case 'em':
                    case 'i':
                        result += "*".concat(elem.textContent, "*");
                        break;
                    case 'ul':
                    case 'ol':
                        result += convertListToMarkdown(elem, tagName === 'ol');
                        break;
                    case 'li':
                        // Lists are handled by their parent ul/ol
                        break;
                    case 'a': {
                        var href = elem.getAttribute('href');
                        if (href) {
                            result += "[".concat(elem.textContent, "](").concat(href, ")");
                        }
                        else {
                            result += elem.textContent;
                        }
                        break;
                    }
                    case 'blockquote': {
                        var lines = (elem.textContent || '').split('\n');
                        result += lines.map(function (line) { return "> ".concat(line); }).join('\n') + '\n\n';
                        break;
                    }
                    default:
                        result += convertHtmlToMarkdown(elem);
                        break;
                }
            }
        }
        return result;
    };
    var convertListToMarkdown = function (listElement, isOrdered) {
        var result = '';
        var items = listElement.querySelectorAll(':scope > li');
        items.forEach(function (item, index) {
            var marker = isOrdered ? "".concat(index + 1, ". ") : '- ';
            result += "".concat(marker).concat(item.textContent, "\n");
        });
        return result + '\n';
    };
    var copyToClipboard = function () { return __awaiter(_this, void 0, void 0, function () {
        var markdownElement, content_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    markdownElement = document.querySelector('.markdown');
                    if (!markdownElement) {
                        throw new Error('Could not find page content');
                    }
                    content_1 = '';
                    // Add front matter if it exists
                    if (Object.keys(frontMatter).length > 0) {
                        content_1 += '---\n';
                        Object.entries(frontMatter).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            content_1 += "".concat(key, ": ").concat(value, "\n");
                        });
                        content_1 += '---\n\n';
                    }
                    // Add title if not already in content
                    if (metadata.title && !markdownElement.querySelector('h1')) {
                        content_1 += "# ".concat(metadata.title, "\n\n");
                    }
                    // Convert the HTML content to markdown
                    content_1 += convertHtmlToMarkdown(markdownElement);
                    return [4 /*yield*/, navigator.clipboard.writeText(content_1.trim())];
                case 1:
                    _a.sent();
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy page content: ', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<button className={styles_module_css_1.default.copyButton} onClick={copyToClipboard} title={copied ? 'Copied!' : 'Copy page content'} aria-label={copied ? 'Page content copied to clipboard' : 'Copy page content to clipboard'}>
      {copied ? (<>
          <fa6_1.FaCheck className={styles_module_css_1.default.icon}/>
          <span>Copied!</span>
        </>) : (<>
          <fa6_1.FaCopy className={styles_module_css_1.default.icon}/>
          <span>Copy Page</span>
        </>)}
    </button>);
}
