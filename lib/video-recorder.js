"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _unsupportedView = _interopRequireDefault(require("./defaults/unsupported-view"));

var _errorView = _interopRequireDefault(require("./defaults/error-view"));

var _disconnectedView = _interopRequireDefault(require("./defaults/disconnected-view"));

var _loadingView = _interopRequireDefault(require("./defaults/loading-view"));

var _renderActions = _interopRequireDefault(require("./defaults/render-actions"));

var _getVideoInfo = _interopRequireWildcard(require("./get-video-info"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// data shows up on some browsers
// approx every 2 seconds
var chunkSizeInMS = 250;
var dataCheckInterval = 2000 / chunkSizeInMS;
var MIME_TYPES = ["video/webm;codecs=vp8", "video/webm;codecs=h264", "video/webm;codecs=vp9", "video/webm"];
var CONSTRAINTS = {
  audio: true,
  video: true
};

var Wrapper = _styledComponents["default"].div.withConfig({
  displayName: "video-recorder__Wrapper",
  componentId: "sc-7k20rv-0"
})(["position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden;min-height:300px;background-color:#000;color:white;box-sizing:border-box;*{box-sizing:inherit;}"]);

var CameraView = _styledComponents["default"].div.withConfig({
  displayName: "video-recorder__CameraView",
  componentId: "sc-7k20rv-1"
})(["width:100%;height:100%;"]);

var Video = _styledComponents["default"].video.withConfig({
  displayName: "video-recorder__Video",
  componentId: "sc-7k20rv-2"
})(["position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:100%;min-width:100%;", ";"], function (props) {
  return props.onClick && "cursor: pointer;";
});

var VideoRecorder =
/*#__PURE__*/
function (_Component) {
  _inherits(VideoRecorder, _Component);

  function VideoRecorder(props) {
    var _this;

    _classCallCheck(this, VideoRecorder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoRecorder).call(this, props));
    _this.state = {
      isRecording: false,
      isCameraOn: false,
      isConnecting: false,
      isReplayingVideo: false,
      isReplayVideoMuted: true,
      thereWasAnError: false,
      streamIsReady: false,
      isInlineRecordingSupported: null,
      isVideoInputSupported: null,
      stream: undefined
    };
    _this.handleSuccess = _this.handleSuccess.bind(_assertThisInitialized(_this));
    _this.turnOnCamera = _this.turnOnCamera.bind(_assertThisInitialized(_this));
    _this.turnOffCamera = _this.turnOffCamera.bind(_assertThisInitialized(_this));
    _this.handleError = _this.handleError.bind(_assertThisInitialized(_this));
    _this.handleStartRecording = _this.handleStartRecording.bind(_assertThisInitialized(_this));
    _this.handleStopRecording = _this.handleStopRecording.bind(_assertThisInitialized(_this));
    _this.handleDataAvailable = _this.handleDataAvailable.bind(_assertThisInitialized(_this));
    _this.handleStop = _this.handleStop.bind(_assertThisInitialized(_this));
    _this.handleStopReplaying = _this.handleStopReplaying.bind(_assertThisInitialized(_this));
    _this.renderCameraView = _this.renderCameraView.bind(_assertThisInitialized(_this));
    _this.handleVideoSelected = _this.handleVideoSelected.bind(_assertThisInitialized(_this));
    _this.handleOpenVideoInput = _this.handleOpenVideoInput.bind(_assertThisInitialized(_this));
    _this.handleConfirm = _this.handleConfirm.bind(_assertThisInitialized(_this));
    _this.timeSinceInactivity = 0;
    return _this;
  }

  _createClass(VideoRecorder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var isInlineRecordingSupported = !!window.MediaSource && !!window.MediaRecorder && !!navigator.mediaDevices;
      var isVideoInputSupported = document.createElement("input").capture !== undefined;

      if (isInlineRecordingSupported) {
        this.mediaSource = new window.MediaSource();
      }

      this.setState({
        isInlineRecordingSupported: isInlineRecordingSupported,
        isVideoInputSupported: isVideoInputSupported
      }, function () {
        if (_this2.state.isInlineRecordingSupported && _this2.props.isOnInitially) {
          _this2.turnOnCamera();
        } else if (_this2.state.isVideoInputSupported && _this2.props.isOnInitially) {
          _this2.handleOpenVideoInput();
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      if (this.replayVideo && this.state.isReplayingVideo && !prevState.isReplayingVideo) {
        this.replayVideo.addEventListener("loadedmetadata", function () {
          var playPromise = _this3.replayVideo.play();

          if (playPromise) {
            playPromise["catch"](function (err) {
              if (err.name === "NotAllowedError") {
                console.warn(err);
                return;
              }

              throw err;
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.turnOffCamera();
    }
  }, {
    key: "turnOnCamera",
    value: function turnOnCamera() {
      if (this.props.onTurnOnCamera) {
        this.props.onTurnOnCamera();
      }

      this.setState({
        isConnecting: true,
        isReplayingVideo: false,
        thereWasAnError: false
      });
      navigator.mediaDevices.getUserMedia(CONSTRAINTS).then(this.handleSuccess)["catch"](this.handleError);
    }
  }, {
    key: "turnOffCamera",
    value: function turnOffCamera() {
      if (this.props.onTurnOffCamera) {
        this.props.onTurnOffCamera();
      }

      this.stream && this.stream.getTracks().forEach(function (stream) {
        return stream.stop();
      });
      this.setState({
        isCameraOn: false
      });
      clearInterval(this.inactivityTimer);
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(stream) {
      var _this4 = this;

      this.stream = stream;
      this.setState({
        isCameraOn: true,
        stream: stream
      });

      if (window.URL) {
        this.cameraVideo.srcObject = stream;
      } else {
        this.cameraVideo.src = stream;
      } // there is probably a better way
      // but this makes sure the start recording button
      // gives the steam a couple seconds to be ready
      // --- Ideally there would be a property to checkk....


      setTimeout(function () {
        _this4.setState({
          isConnecting: false,
          streamIsReady: true
        });
      }, 200);
    }
  }, {
    key: "handleError",
    value: function handleError(err) {
      var onError = this.props.onError;
      console.error("Captured error", err);
      clearTimeout(this.timeLimitTimeout);

      if (onError) {
        onError(err);
      }

      this.setState({
        isConnecting: this.state.isConnecting && false,
        isRecording: false,
        thereWasAnError: true
      });

      if (this.state.isCameraOn) {
        this.turnOffCamera();
      }
    }
  }, {
    key: "onDataIssue",
    value: function onDataIssue(event) {
      console.error("Couldn't get data from event", event);
      this.handleError(new Error("Couldn't get data from event"));
      return false;
    }
  }, {
    key: "getMimeType",
    value: function getMimeType() {
      if (this.props.mimeType) {
        return this.props.mimeType;
      }

      var mimeType = MIME_TYPES.find(window.MediaRecorder.isTypeSupported);
      return mimeType || "";
    }
  }, {
    key: "isDataHealthOK",
    value: function isDataHealthOK(event) {
      if (!event.data) return this.onDataIssue(event); // in some browsers (FF/S), data only shows up
      // after a certain amount of time ~everyt 2 seconds

      var blobCount = this.recordedBlobs.length;

      if (blobCount > dataCheckInterval && blobCount % dataCheckInterval === 0) {
        var blob = new window.Blob(this.recordedBlobs, {
          type: this.getMimeType()
        });
        if (blob.size <= 0) return this.onDataIssue(event);
      }

      return true;
    }
  }, {
    key: "handleDataAvailable",
    value: function handleDataAvailable(event) {
      if (this.isDataHealthOK(event)) {
        this.recordedBlobs.push(event.data);
      }
    }
  }, {
    key: "handleStopRecording",
    value: function handleStopRecording() {
      if (this.props.onStopRecording) {
        this.props.onStopRecording();
      }

      if (!this.mediaRecorder) {
        this.handleError(new Error("Couldn't get mediaRecorder"));
        return;
      }

      this.mediaRecorder.stop();
    }
  }, {
    key: "handleStartRecording",
    value: function handleStartRecording() {
      var _this5 = this;

      if (this.props.onStartRecording) {
        this.props.onStartRecording();
      }

      this.setState({
        isRunningCountdown: true,
        isReplayingVideo: false
      });
      setTimeout(function () {
        return _this5.startRecording();
      }, this.props.countdownTime);
    }
  }, {
    key: "startRecording",
    value: function startRecording() {
      var _this6 = this;

      (0, _getVideoInfo.captureThumb)(this.cameraVideo).then(function (thumbnail) {
        _this6.thumbnail = thumbnail;
        _this6.recordedBlobs = [];
        var options = {
          mimeType: _this6.getMimeType()
        };

        try {
          _this6.setState({
            isRunningCountdown: false,
            isRecording: true
          });

          _this6.startedAt = new Date().getTime();
          _this6.mediaRecorder = new window.MediaRecorder(_this6.stream, options);
          _this6.mediaRecorder.onstop = _this6.handleStop;
          _this6.mediaRecorder.onerror = _this6.handleError;
          _this6.mediaRecorder.ondataavailable = _this6.handleDataAvailable;

          _this6.mediaRecorder.start(chunkSizeInMS); // collect 10ms of data


          var timeLimit = _this6.props.timeLimit;

          if (timeLimit) {
            _this6.timeLimitTimeout = setTimeout(function () {
              _this6.handleStopRecording();
            }, timeLimit);
          } // mediaRecorder.ondataavailable should be called every 10ms,
          // as that's what we're passing to mediaRecorder.start() above


          setTimeout(function () {
            if (_this6.recordedBlobs.length === 0) {
              console.error("Method mediaRecorder.ondataavailable wasn't called after 500ms");

              _this6.handleError(new Error("Method mediaRecorder.ondataavailable wasn't called after 500ms"));
            }
          }, 500);
        } catch (err) {
          console.error("Couldn't create MediaRecorder", err, options);

          _this6.handleError(err);
        }
      });
    }
  }, {
    key: "handleStop",
    value: function handleStop(event) {
      var endedAt = new Date().getTime();

      if (!this.recordedBlobs || this.recordedBlobs.length <= 0) {
        console.error("Couldn't get recordedBlobs", event);
        this.handleError(new Error("Couldn't get recordedBlobs"));
        return;
      }

      clearTimeout(this.timeLimitTimeout);
      var videoBlob = new window.Blob(this.recordedBlobs, {
        type: this.getMimeType()
      }); // const videoBlob = new window.Blob(this.recordedBlobs)

      var thumbnailBlob = this.thumbnail;
      var startedAt = this.startedAt;
      var duration = endedAt - startedAt; // if this gets executed to soon, the last chunk of data is lost on FF

      this.mediaRecorder.ondataavailable = null;
      this.setState({
        isRecording: false,
        isReplayingVideo: true,
        isReplayVideoMuted: true,
        videoBlob: videoBlob,
        videoUrl: window.URL.createObjectURL(videoBlob)
      });
      this.turnOffCamera();
      this.props.onRecordingComplete(videoBlob, startedAt, thumbnailBlob, duration);
    }
  }, {
    key: "handleVideoSelected",
    value: function handleVideoSelected(e) {
      var _this7 = this;

      var files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) return;
      var startedAt = new Date().getTime();
      var video = files[0];
      var extension = video.type === "video/quicktime" ? "mov" : undefined;
      (0, _getVideoInfo["default"])(video).then(function (_ref) {
        var duration = _ref.duration,
            thumbnail = _ref.thumbnail;

        _this7.setState({
          isRecording: false,
          isReplayingVideo: true,
          isReplayVideoMuted: true,
          videoBlob: video,
          videoUrl: window.URL.createObjectURL(video)
        });

        _this7.props.onRecordingComplete(video, startedAt, thumbnail, duration, extension);
      })["catch"](function (err) {
        _this7.handleError(err);
      });
    }
  }, {
    key: "handleOpenVideoInput",
    value: function handleOpenVideoInput() {
      if (this.props.onOpenVideoInput) {
        this.props.onOpenVideoInput();
      }

      this.videoInput.click();
    }
  }, {
    key: "handleStopReplaying",
    value: function handleStopReplaying() {
      if (this.props.onStopReplaying) {
        this.props.onStopReplaying();
      }

      this.setState({
        isReplayingVideo: false
      });

      if (this.state.isInlineRecordingSupported && this.props.isOnInitially) {
        this.turnOnCamera();
      } else if (this.state.isVideoInputSupported && this.props.isOnInitially) {
        this.handleOpenVideoInput();
      }
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm() {
      if (this.props.onConfirm) {
        this.props.onConfirm();
      }

      this.setState({
        isReplayingVideo: false
      });

      if (this.state.isInlineRecordingSupported && this.props.isOnInitially) {
        this.turnOnCamera();
      } else if (this.state.isVideoInputSupported && this.props.isOnInitially) {
        this.handleOpenVideoInput();
      }
    }
  }, {
    key: "renderCameraView",
    value: function renderCameraView() {
      var _this8 = this;

      var _this$props = this.props,
          renderDisconnectedView = _this$props.renderDisconnectedView,
          renderVideoInputView = _this$props.renderVideoInputView,
          renderUnsupportedView = _this$props.renderUnsupportedView,
          renderErrorView = _this$props.renderErrorView,
          renderLoadingView = _this$props.renderLoadingView;
      var _this$state = this.state,
          isVideoInputSupported = _this$state.isVideoInputSupported,
          isReplayingVideo = _this$state.isReplayingVideo,
          isInlineRecordingSupported = _this$state.isInlineRecordingSupported,
          thereWasAnError = _this$state.thereWasAnError,
          isCameraOn = _this$state.isCameraOn,
          isConnecting = _this$state.isConnecting,
          isReplayVideoMuted = _this$state.isReplayVideoMuted;
      var shouldUseVideoInput = !isInlineRecordingSupported && isVideoInputSupported;
      var videoInput = shouldUseVideoInput ? _react["default"].createElement("input", {
        ref: function ref(el) {
          return _this8.videoInput = el;
        },
        type: "file",
        accept: "video/*",
        capture: "user",
        style: {
          display: "none"
        },
        onChange: this.handleVideoSelected
      }) : null;

      if (isReplayingVideo) {
        return _react["default"].createElement(CameraView, {
          key: "replay"
        }, _react["default"].createElement(Video, {
          ref: function ref(el) {
            return _this8.replayVideo = el;
          },
          src: this.state.videoUrl,
          loop: true,
          muted: isReplayVideoMuted,
          playsInline: true,
          autoPlay: true,
          onClick: function onClick() {
            if (_this8.replayVideo.paused) {
              _this8.replayVideo.play();
            }

            _this8.setState({
              isReplayVideoMuted: !_this8.replayVideo.muted
            });
          }
        }), videoInput);
      }

      if (shouldUseVideoInput) {
        return renderVideoInputView({
          videoInput: videoInput
        });
      }

      if (!isInlineRecordingSupported) {
        return renderUnsupportedView();
      }

      if (thereWasAnError) {
        return renderErrorView();
      }

      if (isCameraOn) {
        return _react["default"].createElement(CameraView, {
          key: "camera"
        }, _react["default"].createElement(Video, {
          ref: function ref(el) {
            return _this8.cameraVideo = el;
          },
          autoPlay: true,
          muted: true
        }));
      }

      if (isConnecting) {
        return renderLoadingView();
      }

      return renderDisconnectedView();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          isVideoInputSupported = _this$state2.isVideoInputSupported,
          isInlineRecordingSupported = _this$state2.isInlineRecordingSupported,
          thereWasAnError = _this$state2.thereWasAnError,
          isRecording = _this$state2.isRecording,
          isCameraOn = _this$state2.isCameraOn,
          streamIsReady = _this$state2.streamIsReady,
          isConnecting = _this$state2.isConnecting,
          isRunningCountdown = _this$state2.isRunningCountdown,
          isReplayingVideo = _this$state2.isReplayingVideo,
          isReplayVideoMuted = _this$state2.isReplayVideoMuted;
      var _this$props2 = this.props,
          countdownTime = _this$props2.countdownTime,
          timeLimit = _this$props2.timeLimit,
          renderActions = _this$props2.renderActions;
      return _react["default"].createElement(Wrapper, null, this.renderCameraView(), renderActions({
        isVideoInputSupported: isVideoInputSupported,
        isInlineRecordingSupported: isInlineRecordingSupported,
        thereWasAnError: thereWasAnError,
        isRecording: isRecording,
        isCameraOn: isCameraOn,
        streamIsReady: streamIsReady,
        isConnecting: isConnecting,
        isRunningCountdown: isRunningCountdown,
        isReplayingVideo: isReplayingVideo,
        isReplayVideoMuted: isReplayVideoMuted,
        countdownTime: countdownTime,
        timeLimit: timeLimit,
        onTurnOnCamera: this.turnOnCamera,
        onTurnOffCamera: this.turnOffCamera,
        onOpenVideoInput: this.handleOpenVideoInput,
        onStartRecording: this.handleStartRecording,
        onStopRecording: this.handleStopRecording,
        onStopReplaying: this.handleStopReplaying,
        onConfirm: this.handleConfirm
      }));
    }
  }]);

  return VideoRecorder;
}(_react.Component);

exports["default"] = VideoRecorder;

_defineProperty(VideoRecorder, "propTypes", {
  /** Wether or not to start the camera initially */
  isOnInitially: _propTypes["default"].bool,

  /** Pass this if you want to force a specific mime-type for the video */
  mimeType: _propTypes["default"].string,

  /** How much time to wait until it starts recording (in ms) */
  countdownTime: _propTypes["default"].number,

  /** Use this if you want to set a time limit for the video (in ms) */
  timeLimit: _propTypes["default"].number,
  renderDisconnectedView: _propTypes["default"].func,
  renderVideoInputView: _propTypes["default"].func,
  renderUnsupportedView: _propTypes["default"].func,
  renderErrorView: _propTypes["default"].func,
  renderLoadingView: _propTypes["default"].func,
  renderActions: _propTypes["default"].func,
  onTurnOnCamera: _propTypes["default"].func,
  onTurnOffCamera: _propTypes["default"].func,
  onStartRecording: _propTypes["default"].func,
  onStopRecording: _propTypes["default"].func,
  onRecordingComplete: _propTypes["default"].func,
  onOpenVideoInput: _propTypes["default"].func,
  onStopReplaying: _propTypes["default"].func,
  onConfirm: _propTypes["default"].func,
  onError: _propTypes["default"].func
});

_defineProperty(VideoRecorder, "defaultProps", {
  renderUnsupportedView: function renderUnsupportedView() {
    return _react["default"].createElement(_unsupportedView["default"], null);
  },
  renderErrorView: function renderErrorView() {
    return _react["default"].createElement(_errorView["default"], null);
  },
  renderVideoInputView: function renderVideoInputView(_ref2) {
    var videoInput = _ref2.videoInput;
    return _react["default"].createElement(_react.Fragment, null, videoInput);
  },
  renderDisconnectedView: function renderDisconnectedView() {
    return _react["default"].createElement(_disconnectedView["default"], null);
  },
  renderLoadingView: function renderLoadingView() {
    return _react["default"].createElement(_loadingView["default"], null);
  },
  renderActions: _renderActions["default"],
  countdownTime: 3000
});