"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Button = _styledComponents["default"].button.withConfig({
  displayName: "button__Button",
  componentId: "hkteey-0"
})(
  [
    "background:",
    ";color:",
    ";border-radius:4px;padding:11px 12px;border:solid;border-width:2px;border-color:#a3a3a3;margin:5px;font-size:15px;font-weight:bold;outline:none;cursor:pointer;:hover{background:#eee;}"
  ],
  function(props) {
    return props.backgroundColor;
  },
  function(props) {
    return props.color;
  }
);

Button.defaultProps = {
  color: "black",
  backgroundColor: "white"
};
var _default = Button;
exports["default"] = _default;
