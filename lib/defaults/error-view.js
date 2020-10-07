"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = function _default() {
  return _react["default"].createElement(
    "div",
    null,
    "Oh snap! Your browser failed to record your video.",
    _react["default"].createElement("br", null),
    _react["default"].createElement("br", null),
    "For the best performance we recommend using Google Chrome.",
    _react["default"].createElement("br", null),
    "Please make sure you allow the browser to use camera and microphone.",
    _react["default"].createElement("br", null)
  );
};

exports["default"] = _default;
