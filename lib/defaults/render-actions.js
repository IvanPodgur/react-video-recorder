"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _button = _interopRequireDefault(require("./button"));

var _recordButton = _interopRequireDefault(require("./record-button"));

var _stopButton = _interopRequireDefault(require("./stop-button"));

var _timer = _interopRequireDefault(require("./timer"));

var _countdown = _interopRequireDefault(require("./countdown"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ActionsWrapper = _styledComponents["default"].div.withConfig({
  displayName: "render-actions__ActionsWrapper",
  componentId: "dp6lnv-0"
})([
  "position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:center;padding-top:75px;padding-bottom:30px;"
]);

var _default = function _default(_ref) {
  var isVideoInputSupported = _ref.isVideoInputSupported,
    isInlineRecordingSupported = _ref.isInlineRecordingSupported,
    thereWasAnError = _ref.thereWasAnError,
    isRecording = _ref.isRecording,
    isCameraOn = _ref.isCameraOn,
    streamIsReady = _ref.streamIsReady,
    isConnecting = _ref.isConnecting,
    isRunningCountdown = _ref.isRunningCountdown,
    countdownTime = _ref.countdownTime,
    timeLimit = _ref.timeLimit,
    isReplayingVideo = _ref.isReplayingVideo,
    onTurnOnCamera = _ref.onTurnOnCamera,
    onTurnOffCamera = _ref.onTurnOffCamera,
    onOpenVideoInput = _ref.onOpenVideoInput,
    onStartRecording = _ref.onStartRecording,
    onStopRecording = _ref.onStopRecording,
    onStopReplaying = _ref.onStopReplaying,
    attemptsLeft = _ref.attemptsLeft,
    isTest = _ref.isTest,
    onConfirm = _ref.onConfirm;

  var renderContent = function renderContent() {
    var shouldUseVideoInput =
      !isInlineRecordingSupported && isVideoInputSupported;

    if (
      (!isInlineRecordingSupported && !isVideoInputSupported) ||
      thereWasAnError ||
      isConnecting ||
      isRunningCountdown
    ) {
      return null;
    }

    if (isTest && isReplayingVideo) {
      return _react["default"].createElement(
        "div",
        null,
        _react["default"].createElement(
          _button["default"],
          {
            onClick: onStopReplaying,
            "data-qa": "start-replaying"
          },
          "Test video recording"
        ),
        _react["default"].createElement(
          _button["default"],
          {
            onClick: onConfirm,
            "data-qa": "start-replaying"
          },
          "Finish practice"
        )
      );
    }

    if (isReplayingVideo && attemptsLeft > 0) {
      return _react["default"].createElement(
        "div",
        null,
        _react["default"].createElement(
          _button["default"],
          {
            onClick: onStopReplaying,
            "data-qa": "start-replaying"
          },
          "Re-record the response"
        ),
        _react["default"].createElement(
          _button["default"],
          {
            onClick: onConfirm,
            "data-qa": "start-replaying"
          },
          "Next Question"
        )
      );
    }

    if (isReplayingVideo && attemptsLeft == 0) {
      return _react["default"].createElement(
        "div",
        null,
        _react["default"].createElement(
          _button["default"],
          {
            onClick: onConfirm,
            "data-qa": "start-replaying"
          },
          "Next Question"
        )
      );
    }

    if (isRecording) {
      return _react["default"].createElement(_stopButton["default"], {
        onClick: onStopRecording,
        "data-qa": "stop-recording"
      });
    }

    if (isCameraOn && streamIsReady) {
      return _react["default"].createElement(_recordButton["default"], {
        onClick: onStartRecording,
        "data-qa": "start-recording",
        attemptsLeft: attemptsLeft,
        isTest: isTest
      });
    }

    return shouldUseVideoInput
      ? _react["default"].createElement(
          _button["default"],
          {
            onClick: onOpenVideoInput,
            "data-qa": "open-input"
          },
          "Record a video"
        )
      : _react["default"].createElement(
          _button["default"],
          {
            onClick: onTurnOnCamera,
            "data-qa": "turn-on-camera"
          },
          "Continue"
        );
  };

  return _react["default"].createElement(
    "div",
    null,
    isRecording &&
      _react["default"].createElement(_timer["default"], {
        timeLimit: timeLimit
      }),
    isRunningCountdown &&
      _react["default"].createElement(_countdown["default"], {
        countdownTime: countdownTime
      }),
    _react["default"].createElement(ActionsWrapper, null, renderContent())
  );
};

exports["default"] = _default;
