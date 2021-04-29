"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.__esModule = true;
exports.MailTo = void 0;
var React = __importStar(require("react"));
var react_final_form_1 = require("react-final-form");
var domain_1 = require("../../../domain");
function useResolvedValue() {
    var _a, _b, _c, _d;
    var value = domain_1.useEditorValue().value;
    if (value && value.startsWith('mailto:')) {
        var url = new URL(value);
        return {
            recipient: url.pathname,
            subject: (_a = url.searchParams.get('subject')) !== null && _a !== void 0 ? _a : undefined,
            cc: (_b = url.searchParams.get('cc')) !== null && _b !== void 0 ? _b : undefined,
            bcc: (_c = url.searchParams.get('bcc')) !== null && _c !== void 0 ? _c : undefined,
            body: (_d = url.searchParams.get('body')) !== null && _d !== void 0 ? _d : undefined
        };
    }
    return null;
}
function convert(mailToLink) {
    var url = new URL("mailto:" + mailToLink.recipient);
    if (mailToLink.subject) {
        url.searchParams.set('subject', mailToLink.subject);
    }
    if (mailToLink.cc) {
        url.searchParams.set('cc', mailToLink.cc);
    }
    if (mailToLink.bcc) {
        url.searchParams.set('bcc', mailToLink.bcc);
    }
    if (mailToLink.body) {
        url.searchParams.set('body', mailToLink.body);
    }
    return url.toString();
}
exports.MailTo = new (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'Sitegeist.Archaeopteryx:MailTo';
        _this.isSuitableFor = function (props) {
            var _a;
            return Boolean((_a = props.link) === null || _a === void 0 ? void 0 : _a.uri.startsWith('mailto:'));
        };
        _this.getIcon = function () { return (React.createElement("div", null, "MAILTO")); };
        _this.getTitle = function () { return 'MAILTO'; };
        _this.getPreview = function (props) { return (React.createElement("div", null, "MAILTO PREVIEW")); };
        _this.getEditor = function () {
            var resolvedValue = useResolvedValue();
            var update = domain_1.useEditorTransactions().update;
            var handleSubmit = React.useCallback(function (values) {
                update(convert(values));
            }, []);
            return (React.createElement(react_final_form_1.Form, { initialValues: resolvedValue, onSubmit: handleSubmit }, function (_a) {
                var handleSubmit = _a.handleSubmit, rest = __rest(_a, ["handleSubmit"]);
                return (React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement(react_final_form_1.Field, { name: "recipient", validate: function (value) {
                            if (!value) {
                                return 'recipient is required';
                            }
                        } }, function (_a) {
                        var input = _a.input, meta = _a.meta;
                        return (React.createElement("div", null,
                            React.createElement("label", null,
                                "Recipient:",
                                React.createElement("input", __assign({ type: "text" }, input))),
                            meta.error));
                    }),
                    React.createElement(react_final_form_1.Field, { name: "cc" }, function (_a) {
                        var input = _a.input, meta = _a.meta;
                        return (React.createElement("div", null,
                            React.createElement("label", null,
                                "CC:",
                                React.createElement("input", __assign({ type: "text" }, input))),
                            meta.error));
                    }),
                    React.createElement(react_final_form_1.Field, { name: "bcc" }, function (_a) {
                        var input = _a.input, meta = _a.meta;
                        return (React.createElement("div", null,
                            React.createElement("label", null,
                                "BCC:",
                                React.createElement("input", __assign({ type: "text" }, input))),
                            meta.error));
                    }),
                    React.createElement(react_final_form_1.Field, { name: "body" }, function (_a) {
                        var input = _a.input, meta = _a.meta;
                        return (React.createElement("div", null,
                            React.createElement("label", null,
                                "Body:",
                                React.createElement("textarea", __assign({}, input))),
                            meta.error));
                    }),
                    React.createElement("button", { type: "submit" }, "Apply")));
            }));
        };
        return _this;
    }
    return class_1;
}(domain_1.LinkType));
//# sourceMappingURL=MailTo.js.map